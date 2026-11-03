import s from './team-section.module.css';

const team=[
  {name:'James Lucas Moreto',crop:'490 6 266 265'},
  {name:'Oscar Enrique Valderrama Bautista',crop:'215 6 266 265'},
  {name:'Alex Oswaldo Villarroel Antonio',crop:'1353 5 201 267'},
  {name:'Samir Aarón Vivar Guadalupe',crop:'783 6 264 265'},
  {name:'Jhon Cesar Avendaño Vila',crop:'1073 10 254 260'},
  {name:'Jairo Jalil Antonino Rodriguez Espinoza',crop:'7 6 200 265'}
];

export function TeamSection(){return <section className={s.section} aria-labelledby="equipo"><div className={'container '+s.inner}><div className={s.heading}><p>Detrás de cada ruta</p><h2 id="equipo">El equipo detrás de <span>UniRide</span></h2><p>Seis compañeros de la UPC, una propuesta para transformar la movilidad universitaria.</p></div><ul className={s.grid}>{team.map(member=><li key={member.name} data-about-reveal><article className={s.member}><div className={s.portrait}><svg viewBox={member.crop} preserveAspectRatio="xMidYMid slice" role="img" aria-label={'Fotografía de '+member.name}><image href="/images/team-collage.png" width="1560" height="344"/></svg></div><h3>{member.name}</h3><p>Equipo UniRide</p></article></li>)}</ul><div className={s.closing}><p>Conectamos tu ruta. <span>Compartimos el viaje.</span></p><span>Technical Sales &amp; Marketing · UPC</span></div></div></section>}
