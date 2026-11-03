import {faqs,articles} from './articles';
import {guideAnswer} from './guide.mjs';
export function faqAnswer(message:string){return guideAnswer(message);}
export const knowledge=JSON.stringify({scope:'UniRide: prototipo académico en Lima. No es servicio operativo, ni operador de transporte. No pagos, app en tiendas, conductores verificados, alianzas, métricas o testimonios reales. No se garantiza puntualidad, disponibilidad, seguridad o sustitución de cancelaciones. Perfil y universidad autodeclarados, correo confirmado no certifica afiliación. Para GPT se necesita sesión. FAQ abierta. No reservas ni datos personales en esta base.',faqs,articles:articles.map(a=>({title:a.title,url:'/blog/'+a.slug,content:a.sections}))});
