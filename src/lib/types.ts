export type Profile={id:string;name:string;university:string;district:string;role:'passenger'|'driver'|'both'};
export type Driver={id:string;display_name:string;university:string;rating:number|null;review_count:number};
export type Ride={id:string;driver_id:string;origin_district:string;destination_campus:string;meeting_point:string;departure_at:string;seats:number;seats_available:number;price:number;status:'open'|'in_progress'|'completed'|'cancelled';created_at:string;driver?:Driver};
export type Booking={id:string;ride_id:string;passenger_id:string;status:'pending'|'accepted'|'cancelled'|'completed';price_snapshot:number;created_at:string};
export type Confirmation={booking_id:string;user_id:string;started_at:string;ended_at:string|null};
export type Review={id:string;booking_id:string;author_id:string;subject_id:string;rating:number};
export type AppData={profiles:Profile[];rides:Ride[];bookings:Booking[];confirmations:Confirmation[];reviews:Review[]};
