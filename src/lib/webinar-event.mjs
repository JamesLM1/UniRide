// Fecha fija para demostrar el contador del prototipo; no es una convocatoria confirmada.
export const webinarEvent = {
  startsAt: '2026-12-10T19:00:00-05:00',
  dateLabel: 'Jueves 10 de diciembre de 2026',
  timeLabel: '7:00 p. m. · Perú',
  note: 'Fecha de demostración del prototipo. La convocatoria real está por confirmar.'
};

export function webinarTimeParts(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return [
    {name:'Días',value:Math.floor(seconds/86400)},
    {name:'Horas',value:Math.floor(seconds/3600)%24},
    {name:'Minutos',value:Math.floor(seconds/60)%60},
    {name:'Segundos',value:seconds%60}
  ];
}
