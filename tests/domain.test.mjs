import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateSavings,institutionalEmail} from '../src/lib/calculations.mjs';
import {seedDemo,demoAction} from '../src/lib/demo.mjs';
test('Savings compares equal trips, allows a more expensive alternative and handles zero baseline',()=>{
 assert.deepEqual(calculateSavings({currentCost:8,sharedCost:5,tripsPerDay:2,daysPerWeek:5}),{trips:40,currentMonthly:320,sharedMonthly:200,difference:120,percent:38});
 assert.equal(calculateSavings({currentCost:4,sharedCost:8,tripsPerDay:1,daysPerWeek:3}).difference,-48);
 assert.equal(calculateSavings({currentCost:0,sharedCost:0,tripsPerDay:1,daysPerWeek:1}).percent,0);
 for(const cost of [-1,NaN,Infinity])assert.throws(()=>calculateSavings({currentCost:cost,sharedCost:5,tripsPerDay:2,daysPerWeek:5}));
 assert.throws(()=>calculateSavings({currentCost:8,sharedCost:5,tripsPerDay:1.5,daysPerWeek:5}));
});
test('Institutional address checks reject lookalike and public domains without claiming affiliation',()=>{
 assert.equal(institutionalEmail('mateo@upc.edu.pe'),true);
 assert.equal(institutionalEmail('mateo@aloe.ulima.edu.pe'),true);
 for(const email of ['x@gmail.com','x@upc.edu.pe.evil.com','x@edu.pe','x@fakeupn.pe','a@b'])assert.equal(institutionalEmail(email),false);
});
test('Demo request is pending, accept consumes once and cancel releases once',()=>{
 let d=seedDemo();d=demoAction(d,'mateo-demo','request_seat',{p_ride_id:'ruta-demo-1'});const b=d.bookings[0];assert.equal(d.rides[0].seats_available,2);
 d=demoAction(d,'ana-demo','respond_booking',{p_booking_id:b.id,p_accept:true});d=demoAction(d,'ana-demo','respond_booking',{p_booking_id:b.id,p_accept:true});assert.equal(d.rides[0].seats_available,1);
 assert.throws(()=>demoAction(d,'joaquin-demo','cancel_booking',{p_booking_id:b.id}));
 d=demoAction(d,'mateo-demo','cancel_booking',{p_booking_id:b.id});d=demoAction(d,'mateo-demo','cancel_booking',{p_booking_id:b.id});assert.equal(d.rides[0].seats_available,2);
});
test('Demo requires two independent starts and two arrivals before reviewing',()=>{
 let d=seedDemo();d=demoAction(d,'mateo-demo','request_seat',{p_ride_id:'ruta-demo-1'});const id=d.bookings[0].id;d=demoAction(d,'ana-demo','respond_booking',{p_booking_id:id,p_accept:true});
 assert.throws(()=>demoAction(d,'mateo-demo','submit_review',{p_booking_id:id,p_rating:5}));
 d=demoAction(d,'ana-demo','confirm_trip',{p_booking_id:id,p_phase:'start'});assert.throws(()=>demoAction(d,'ana-demo','confirm_trip',{p_booking_id:id,p_phase:'end'}));
 d=demoAction(d,'mateo-demo','confirm_trip',{p_booking_id:id,p_phase:'start'});d=demoAction(d,'mateo-demo','confirm_trip',{p_booking_id:id,p_phase:'end'});assert.equal(d.bookings[0].status,'accepted');
 d=demoAction(d,'ana-demo','confirm_trip',{p_booking_id:id,p_phase:'end'});assert.equal(d.bookings[0].status,'completed');
 d=demoAction(d,'ana-demo','submit_review',{p_booking_id:id,p_rating:4});d=demoAction(d,'ana-demo','submit_review',{p_booking_id:id,p_rating:2});assert.equal(d.reviews.length,1);assert.equal(d.reviews[0].rating,4);
});
