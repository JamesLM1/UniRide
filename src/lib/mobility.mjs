/** Public place names only. Map centres are district reference areas, not campus entrances. */
export const origins = [
  {id:'plaza-norte',name:'Plaza Norte · Independencia',query:'Centro Comercial Plaza Norte, Independencia, Lima, Perú',lat:-12.006,lon:-77.061},
  {id:'plaza-san-miguel',name:'Plaza San Miguel · San Miguel',query:'Centro Comercial Plaza San Miguel, Lima, Perú',lat:-12.077,lon:-77.083},
  {id:'plaza-mayor',name:'Plaza Mayor · Cercado de Lima',query:'Plaza Mayor de Lima, Perú',lat:-12.046,lon:-77.03},
  {id:'parque-kennedy',name:'Parque Kennedy · Miraflores',query:'Parque Kennedy, Miraflores, Lima, Perú',lat:-12.121,lon:-77.03},
];
export const destinations = [
  {id:'upc-monterrico',name:'UPC · Monterrico',query:'UPC Campus Monterrico, Santiago de Surco, Lima, Perú',lat:-12.105,lon:-76.963},
  {id:'upc-san-miguel',name:'UPC · San Miguel',query:'UPC Campus San Miguel, Lima, Perú',lat:-12.077,lon:-77.093},
  {id:'upc-san-isidro',name:'UPC · San Isidro',query:'UPC Campus San Isidro, Lima, Perú',lat:-12.096,lon:-77.036},
  {id:'unmsm',name:'UNMSM · Ciudad Universitaria',query:'Universidad Nacional Mayor de San Marcos, Ciudad Universitaria, Lima, Perú',lat:-12.058,lon:-77.084},
  {id:'pucp',name:'PUCP · San Miguel',query:'Pontificia Universidad Católica del Perú, San Miguel, Lima, Perú',lat:-12.069,lon:-77.08},
  {id:'uni',name:'UNI · Rímac',query:'Universidad Nacional de Ingeniería, Rímac, Lima, Perú',lat:-12.019,lon:-77.049},
  {id:'ulima',name:'Universidad de Lima · Surco',query:'Universidad de Lima, Santiago de Surco, Lima, Perú',lat:-12.085,lon:-76.972},
  {id:'usil',name:'USIL · La Molina',query:'Universidad San Ignacio de Loyola, La Molina, Lima, Perú',lat:-12.073,lon:-76.956},
];
export function mapsDirections(origin,destination,mode='transit') {
  if(!origin?.query||!destination?.query)throw new Error('Elige origen y destino.');
  if(!['transit','driving','walking'].includes(mode))throw new Error('Medio de transporte no válido.');
  const url=new URL('https://www.google.com/maps/dir/');
  url.search=new URLSearchParams({api:'1',origin:origin.query,destination:destination.query,travelmode:mode}).toString();
  return url.toString();
}
export function mapEmbed(destination) {
  if(!Number.isFinite(destination?.lat)||!Number.isFinite(destination?.lon))throw new Error('Zona no válida.');
  const {lat,lon}=destination;
  const params=new URLSearchParams({bbox:[lon-.016,lat-.012,lon+.016,lat+.012].join(','),layer:'mapnik',marker:[lat,lon].join(',')});
  return 'https://www.openstreetmap.org/export/embed.html?'+params;
}
export function routeSummary(origin,destination,departure='',mode='transit') {
  const date=departure?parseLimaDeparture(departure):null;
  const when=date?new Intl.DateTimeFormat('es-PE',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Lima'}).format(date)+' (hora de Lima)':'por coordinar';
  return ['Mi plan de traslado · UniRide',origin.name+' → '+destination.name,'Salida prevista: '+when,'Revisar recorrido: '+mapsDirections(origin,destination,mode),'Este plan no es una reserva ni una ubicación en vivo. Confirma el traslado y el punto de encuentro.'].join('\n');
}
export function parseLimaDeparture(value) {
  if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value))throw new Error('Elige una fecha y hora válidas.');
  const date=new Date(value+':00-05:00');
  if(!Number.isFinite(date.getTime()))throw new Error('Fecha no válida.');
  // Reject normalized dates such as February 31.
  if(new Date(date.getTime()-5*60*60*1000).toISOString().slice(0,16)!==value)throw new Error('Fecha no válida.');
  return date;
}
const utcStamp=date=>date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
const escapeICS=value=>String(value).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
function foldICSLine(line){const encoder=new TextEncoder();const output=[];let part='';let bytes=0;for(const character of line){const size=encoder.encode(character).length;if(bytes+size>75){output.push(part);part=' ';bytes=1;}part+=character;bytes+=size;}output.push(part);return output.join('\r\n');}
export function calendarPlan(origin,destination,departure,now=new Date(),mode='transit') {
  const start=parseLimaDeparture(departure);
  if(start.getTime()<=now.getTime())throw new Error('Elige una salida futura.');
  const uid='uniride-'+origin.id+'-'+destination.id+'-'+start.getTime()+'@uniride.academico';
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//UniRide//Planificador académico//ES','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+utcStamp(now),'DTSTART:'+utcStamp(start),'SUMMARY:'+escapeICS('Salida prevista · '+destination.name),'LOCATION:'+escapeICS(origin.name),'DESCRIPTION:'+escapeICS(routeSummary(origin,destination,departure,mode)),'URL:'+mapsDirections(origin,destination,mode),'BEGIN:VALARM','TRIGGER:-PT30M','ACTION:DISPLAY','DESCRIPTION:Confirma tu traslado y revisa tu plan B.','END:VALARM','END:VEVENT','END:VCALENDAR',''].map(foldICSLine).join('\r\n');
}
