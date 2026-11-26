import test from 'node:test';
import assert from 'node:assert/strict';
import {webinarEvent,webinarTimeParts} from '../src/lib/webinar-event.mjs';

test('Webinar demo uses a fixed Lima instant and counts down independently of reload time',()=>{
  const target=Date.parse(webinarEvent.startsAt);
  assert.equal(target,Date.UTC(2026,11,11,0,0,0));
  const before=Date.parse('2026-12-09T17:58:57-05:00');
  assert.deepEqual(webinarTimeParts(target-before).map(p=>p.value),[1,1,1,3]);
  assert.deepEqual(webinarTimeParts(target-(before+1000)).map(p=>p.value),[1,1,1,2]);
});

test('Countdown never displays negative units when the target is reached or past',()=>{
  assert.deepEqual(webinarTimeParts(0).map(p=>p.value),[0,0,0,0]);
  assert.deepEqual(webinarTimeParts(-86401000).map(p=>p.value),[0,0,0,0]);
  assert.deepEqual(webinarTimeParts(1).map(p=>p.value),[0,0,0,1]);
});
