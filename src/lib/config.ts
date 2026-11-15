import {resolveSiteURL} from './site-url.mjs';
export const siteURL = resolveSiteURL(process.env);
export const brand = { name:'UniRide', slogan:'Conectamos tu ruta, compartimos el viaje.', blog:'https://uniride-movilidad-universitaria.blogspot.com/' };
export const districts = ['Ate','Barranco','Breña','Callao','Carabayllo','Cercado de Lima','Chorrillos','Comas','El Agustino','Independencia','Jesús María','La Molina','La Victoria','Lince','Los Olivos','Magdalena del Mar','Miraflores','Pueblo Libre','Puente Piedra','Rímac','San Borja','San Isidro','San Juan de Lurigancho','San Juan de Miraflores','San Luis','San Martín de Porres','San Miguel','Santa Anita','Santiago de Surco','Surquillo','Villa El Salvador','Villa María del Triunfo'];
export const campuses = ['UPC · Monterrico','UPC · San Isidro','UPC · San Miguel','UPC · Villa','UNMSM · Ciudad Universitaria','PUCP · San Miguel','Universidad de Lima · Surco','UNI · Rímac','USIL · La Molina','Otra universidad'];
export const universities = ['UPC','UNMSM','PUCP','Universidad de Lima','UNI','USIL','UTP','UPN','USMP','Otra universidad'];
