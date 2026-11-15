'use client';

import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,CarFront,Check,ChevronDown,Clock3,Download,Quote,GraduationCap,MapPin,Monitor,RotateCcw,Route,Users,Wallet} from 'lucide-react';
import {articles,faqs} from '@/lib/articles';
import styles from './bottom-sections.module.css';

type Locale='es'|'en'|'pt';
type Copy={
  casesLabel:string;casesHeading:string;casesIntro:string;cases:{title:string;text:string;link:string;href:string}[];
  comparisonLabel:string;comparisonHeading:string;comparisonIntro:string;comparisonCaption:string;comparisonHeaders:[string,string,string,string];comparisonRows:[string,string,string,string][];comparisonNote:string;
  numbersLabel:string;numbersHeading:string;numberLabels:[string,string,string];numbersNote:string;
  storiesLabel:string;storiesHeading:string;storiesIntro:string;stories:{name:string;text:string;tag:string;href:string}[];
  faqLabel:string;faqHeading:string;faqIntro:string;
  closingLabel:string;closingIntro:string;closingWeb:string;closingGuide:string;closingDemo:string;closingNote:string;qrGuide:string;qrDemo:string;qrLocal:string;paperLabel:string;paperRows:[string,string][];paperStatus:[string,string,string,string];paperFooter:string;repeat:string;
};

const copy:Record<Locale,Copy>={
  es:{
    casesLabel:'CASOS DE USO',casesHeading:'¿Quién comparte el camino con UniRide?',casesIntro:'Distintas rutinas. Una necesidad en común: organizar el traslado a la universidad.',
    cases:[
      {title:'Estudiante sin movilidad propia',text:'Busca una ruta por distrito y campus. Revisa salida, aporte y punto de encuentro antes de solicitar un asiento.',link:'Encontrar una ruta',href:'/funciones/buscar-rutas'},
      {title:'Universitario con auto',text:'Publica un recorrido que ya realizarás y ofrece tus asientos disponibles con los acuerdos a la vista.',link:'Compartir mi ruta',href:'/funciones/publicar-rutas'},
      {title:'Estudias y también trabajas',text:'Tener el horario y la confirmación en un lugar ayuda a revisar cómo encaja el traslado en tu rutina.',link:'Planificar el trayecto',href:'/blog/llegar-puntual-universidad'},
      {title:'Un presupuesto que cuidar',text:'Compara tus gastos habituales con otra alternativa usando el mismo número de trayectos.',link:'Calcular mis gastos',href:'/calculadora'},
      {title:'Cambió el plan de la mañana',text:'Una cancelación exige decidir otra vez. Guarda un checklist para evaluar opciones y avisar a tiempo.',link:'Preparar mi plan B',href:'/guia'},
      {title:'Tu primer viaje compartido',text:'Conoce cómo funcionan las solicitudes, qué revisar antes de subir y cuándo queda aceptada una plaza.',link:'Revisar cómo funciona',href:'/como-funciona'},
    ],
    comparisonLabel:'COMPARATIVA',comparisonHeading:'Frente a cómo coordinas hoy',comparisonIntro:'Los mensajes son útiles para conversar. UniRide añade un lugar donde revisar la ruta, la solicitud y las confirmaciones.',comparisonCaption:'Qué puedes organizar en cada herramienta',comparisonHeaders:['Función','UniRide','Mensajes sueltos','Apuntes'],
    comparisonRows:[
      ['Buscar por distrito y campus','✓','Revisar conversaciones','Revisión manual'],
      ['Consultar horario y aporte','✓','Si se acuerda','Si lo anotas'],
      ['Solicitud con un estado visible','✓','Seguimiento manual','Anotación manual'],
      ['Confirmar inicio y final','✓','Mensajes separados','Anotación manual'],
      ['Cancelar y liberar la plaza','✓','Actualizar acuerdos','Actualizar anotación'],
      ['Checklist del plan B','✓','Por cuenta propia','Por cuenta propia'],
      ['Comparar gastos del traslado','✓','Cuenta aparte','Cuenta aparte'],
      ['Explorar sin registrar datos','Demo','Depende del canal','Sí'],
    ],comparisonNote:'Comparación de organización, no de garantías de seguridad o puntualidad. UniRide es un prototipo académico.',
    numbersLabel:'LO QUE TIENES A MANO',numbersHeading:'Recursos concretos para tu próxima ruta',numberLabels:['guías educativas para el camino','puntos en tu checklist del plan B','pasos para comparar tus gastos'],numbersNote:'Estas cifras describen el contenido de la web. No son descargas, usuarios ni resultados de una campaña.',
    storiesLabel:'HISTORIAS EN RUTA',storiesHeading:'Así se vive el camino a clases',storiesIntro:'Tres historias ficticias que ilustran retos cotidianos de la movilidad universitaria.',stories:[
      {name:'Mateo',text:'Me cancelaron el viaje justo antes de exponer. Comparé cuánto tardaría por otra ruta y avisé a mi grupo antes de salir.',tag:'Cancelaciones imprevistas',href:'/blog/cancelaron-tu-viaje-plan-b-lima'},
      {name:'Ana',text:'Cuando comparto mi ruta, indico la hora de salida, cuánto aporta cada persona y cuántos asientos quedan. Así todos saben qué esperar.',tag:'Viajes compartidos',href:'/funciones/publicar-rutas'},
      {name:'Lucía',text:'Una ruta parecía más barata hasta que sumé el segundo pasaje. Ahora comparo el costo de todo el trayecto antes de elegir.',tag:'Presupuesto del viaje',href:'/calculadora'},
    ],
    
    faqLabel:'DUDAS FRECUENTES',faqHeading:'Preguntas frecuentes',faqIntro:'Ocho respuestas para conocer el proyecto antes de coordinar. Si necesitas otra orientación, abre la guía flotante.',
    closingLabel:'DEL MENSAJE AL ACUERDO',closingIntro:'Explora la web, compara tus gastos o guarda un plan B para cuando cambie el traslado.',closingWeb:'Abrir versión web',closingGuide:'Descargar mi plan B',closingDemo:'Explorar la demo',closingNote:'UniRide es un proyecto académico. No garantiza disponibilidad, seguridad, puntualidad ni reemplazos automáticos.',qrGuide:'TU PLAN B',qrDemo:'DEMO WEB',qrLocal:'En local, los QR apuntan a este equipo. Se actualizan con el dominio al publicar.',paperLabel:'RUTA DE EJEMPLO',paperRows:[['Origen','San Miguel'],['Destino','Campus UPC'],['Salida','07:30'],['Aporte ficticio','S/ 5.00']],paperStatus:['Por revisar','Ruta revisada','Acuerdos revisados','Ejemplo completo'],paperFooter:'Simulación visual · no genera reservas',repeat:'Repetir la confirmación de ejemplo',
  },
  en:{
    casesLabel:'USE CASES',casesHeading:'Who shares the journey with UniRide?',casesIntro:'Different routines. One shared need: planning the trip to university.',
    cases:[
      {title:'Students without their own car',text:'Search by district and campus. Check departure, contribution and meeting point before requesting a seat.',link:'Find a route',href:'/funciones/buscar-rutas'},
      {title:'Students who drive',text:'Publish a journey you already plan to make and offer available seats with clear arrangements.',link:'Share my route',href:'/funciones/publicar-rutas'},
      {title:'Combining study and work',text:'Keeping the departure and confirmation in one place helps you check how the trip fits your day.',link:'Plan the journey',href:'/blog/llegar-puntual-universidad'},
      {title:'Looking after your budget',text:'Compare your usual spending with an alternative using the same number of trips.',link:'Compare my spending',href:'/calculadora'},
      {title:'A change of morning plans',text:'A cancellation means deciding again. Save a checklist to evaluate options and notify others.',link:'Prepare my plan B',href:'/guia'},
      {title:'Your first shared journey',text:'Learn how requests work, what to check before boarding and when a seat is accepted.',link:'See how it works',href:'/como-funciona'},
    ],comparisonLabel:'COMPARISON',comparisonHeading:'Compared with how you coordinate today',comparisonIntro:'Messages are useful for conversations. UniRide adds one place to check a route, request and confirmations.',comparisonCaption:'What each tool helps you organize',comparisonHeaders:['Function','UniRide','Separate messages','Notes'],comparisonRows:[['Search by district and campus','✓','Review conversations','Manual review'],['Check departure and contribution','✓','If agreed','If written down'],['A request with a visible status','✓','Manual follow-up','Manual notes'],['Confirm start and arrival','✓','Separate messages','Manual notes'],['Cancel and release a seat','✓','Update arrangements','Update notes'],['Plan B checklist','✓','Prepare your own','Prepare your own'],['Compare transport spending','✓','Separate calculation','Separate calculation'],['Explore without personal data','Demo','Depends on the channel','Yes']],comparisonNote:'This compares organization, not safety or punctuality guarantees. UniRide is an academic prototype.',
    numbersLabel:'RESOURCES AT HAND',numbersHeading:'Practical resources for your next journey',numberLabels:['educational guides for the journey','items in your plan B checklist','steps to compare your spending'],numbersNote:'These numbers describe the website content. They are not downloads, users or campaign results.',
    storiesLabel:'STORIES ALONG THE WAY',storiesHeading:'What getting to class can look like',storiesIntro:'Three fictional stories about the everyday challenges of commuting to campus.',stories:[
      {name:'Mateo',text:'My ride was cancelled just before a presentation. I checked how long another route would take and told my group before leaving.',tag:'Unexpected cancellations',href:'/blog/cancelaron-tu-viaje-plan-b-lima'},
      {name:'Ana',text:'When I share a ride, I post the departure time, the cost per person and the seats left. Everyone knows what to expect.',tag:'Shared rides',href:'/funciones/publicar-rutas'},
      {name:'Lucía',text:'One route looked cheaper until I added the second fare. Now I compare the full cost before deciding.',tag:'Travel budget',href:'/calculadora'},
    ],
    
    faqLabel:'COMMON QUESTIONS',faqHeading:'Frequently asked questions',faqIntro:'Eight answers about the project before coordinating. Open the floating guide for further orientation.',closingLabel:'FROM MESSAGES TO ARRANGEMENTS',closingIntro:'Explore the web app, compare spending or save a plan B for an unexpected change.',closingWeb:'Open web app',closingGuide:'Download my plan B',closingDemo:'Explore the demo',closingNote:'UniRide is an academic project. Availability, safety, punctuality and automatic replacements are not guaranteed.',qrGuide:'YOUR PLAN B',qrDemo:'WEB DEMO',qrLocal:'In local development, QR codes point to this computer. They use the public domain after deployment.',paperLabel:'EXAMPLE ROUTE',paperRows:[['Origin','San Miguel'],['Destination','UPC campus'],['Departure','07:30'],['Example contribution','S/ 5.00']],paperStatus:['To review','Route reviewed','Arrangements reviewed','Example complete'],paperFooter:'Visual simulation · no reservations are made',repeat:'Replay the example confirmation',
  },
  pt:{
    casesLabel:'CASOS DE USO',casesHeading:'Quem compartilha o caminho com a UniRide?',casesIntro:'Rotinas diferentes. Uma necessidade em comum: organizar o trajeto até a universidade.',cases:[
      {title:'Estudante sem carro próprio',text:'Busque por distrito e campus. Confira saída, contribuição e ponto de encontro antes de solicitar uma vaga.',link:'Encontrar uma rota',href:'/funciones/buscar-rutas'},
      {title:'Universitário com carro',text:'Publique um trajeto que já pretende fazer e ofereça as vagas disponíveis com os acordos à vista.',link:'Compartilhar minha rota',href:'/funciones/publicar-rutas'},
      {title:'Estudo e trabalho na rotina',text:'Ter horário e confirmação em um lugar ajuda a conferir como o deslocamento se encaixa no seu dia.',link:'Planejar o trajeto',href:'/blog/llegar-puntual-universidad'},
      {title:'Um orçamento para cuidar',text:'Compare seus gastos habituais com outra alternativa usando o mesmo número de trajetos.',link:'Comparar meus gastos',href:'/calculadora'},
      {title:'O plano da manhã mudou',text:'Um cancelamento exige uma nova decisão. Guarde um checklist para avaliar opções e avisar a tempo.',link:'Preparar meu plano B',href:'/guia'},
      {title:'Sua primeira viagem compartilhada',text:'Saiba como funcionam os pedidos, o que conferir antes de embarcar e quando uma vaga é aceita.',link:'Ver como funciona',href:'/como-funciona'},
    ],comparisonLabel:'COMPARAÇÃO',comparisonHeading:'Em relação a como você combina hoje',comparisonIntro:'Mensagens são úteis para conversar. A UniRide acrescenta um lugar para conferir a rota, o pedido e as confirmações.',comparisonCaption:'O que cada ferramenta ajuda a organizar',comparisonHeaders:['Função','UniRide','Mensagens separadas','Anotações'],comparisonRows:[['Buscar por distrito e campus','✓','Revisar conversas','Revisão manual'],['Consultar horário e contribuição','✓','Se combinado','Se anotado'],['Pedido com estado visível','✓','Acompanhamento manual','Anotação manual'],['Confirmar início e chegada','✓','Mensagens separadas','Anotação manual'],['Cancelar e liberar a vaga','✓','Atualizar os acordos','Atualizar anotações'],['Checklist do plano B','✓','Por conta própria','Por conta própria'],['Comparar gastos de transporte','✓','Cálculo separado','Cálculo separado'],['Explorar sem dados pessoais','Demo','Depende do canal','Sim']],comparisonNote:'Compara organização, não garantias de segurança ou pontualidade. A UniRide é um protótipo acadêmico.',
    numbersLabel:'RECURSOS À MÃO',numbersHeading:'Recursos concretos para seu próximo trajeto',numberLabels:['guias educativas para o caminho','itens no checklist do plano B','etapas para comparar os gastos'],numbersNote:'Estes números descrevem o conteúdo do site. Não são downloads, usuários ou resultados de campanha.',storiesLabel:'HISTÓRIAS NO CAMINHO',storiesHeading:'Como é o caminho até a aula',storiesIntro:'Três histórias fictícias sobre os desafios do dia a dia para chegar ao campus.',stories:[
      {name:'Mateo',text:'Cancelaram minha viagem bem antes de uma apresentação. Comparei o tempo por outra rota e avisei meu grupo antes de sair.',tag:'Cancelamentos imprevistos',href:'/blog/cancelaron-tu-viaje-plan-b-lima'},
      {name:'Ana',text:'Quando compartilho uma rota, informo o horário de saída, o valor por pessoa e as vagas disponíveis. Assim todos sabem o que esperar.',tag:'Viagens compartilhadas',href:'/funciones/publicar-rutas'},
      {name:'Lucía',text:'Uma rota parecia mais barata até eu somar a segunda passagem. Agora comparo o custo total antes de escolher.',tag:'Orçamento do trajeto',href:'/calculadora'},
    ],faqLabel:'DÚVIDAS FREQUENTES',faqHeading:'Perguntas frequentes',faqIntro:'Oito respostas para conhecer o projeto antes de combinar. Abra o guia flutuante para outras orientações.',closingLabel:'DA MENSAGEM AO ACORDO',closingIntro:'Explore a web, compare os gastos ou guarde um plano B para quando o deslocamento mudar.',closingWeb:'Abrir versão web',closingGuide:'Baixar meu plano B',closingDemo:'Explorar a demo',closingNote:'A UniRide é um projeto acadêmico. Não garante disponibilidade, segurança, pontualidade ou substituições automáticas.',qrGuide:'SEU PLANO B',qrDemo:'DEMO WEB',qrLocal:'No ambiente local, os QR apontam para este computador. Usam o domínio público depois da publicação.',paperLabel:'ROTA DE EXEMPLO',paperRows:[['Origem','San Miguel'],['Destino','Campus UPC'],['Saída','07:30'],['Contribuição fictícia','S/ 5.00']],paperStatus:['Para revisar','Rota revisada','Acordos revisados','Exemplo completo'],paperFooter:'Simulação visual · não gera reservas',repeat:'Repetir a confirmação de exemplo',
  },
};

const caseIcons=[GraduationCap,CarFront,Clock3,Wallet,Route,Users];

function Count({target,label}:{target:number;label:string}){
  const ref=useRef<HTMLDivElement>(null);const[value,setValue]=useState(target);
  useEffect(()=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const node=ref.current;if(!node)return;let frame=0;let started=false;setValue(0);
    const observer=new IntersectionObserver(entries=>{if(started||!entries.some(e=>e.isIntersecting))return;started=true;const start=performance.now();const tick=(now:number)=>{const p=Math.min((now-start)/1200,1);setValue(Math.round(target*(1-Math.pow(1-p,3))));if(p<1)frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);observer.disconnect();},{threshold:.5});
    observer.observe(node);return()=>{observer.disconnect();cancelAnimationFrame(frame);};
  },[target]);
  return <div ref={ref} className={styles.number} data-number><strong aria-label={String(target)}>{value}</strong><span>{label}</span></div>;
}

function StoryCards({c, locale}:{c:Copy;locale:Locale}) {
  const resourceLabel = {es:'Ver recurso', en:'View resource', pt:'Ver recurso'}[locale];
  return <div className={styles.testimonialsGrid} data-reveal>
    {c.stories.map(story => (
      <article key={story.name} className={styles.testimonialCard} data-tilt>
        <Quote className={styles.testimonialQuoteIcon} size={26} aria-hidden="true"/>
        <blockquote>“{story.text}”</blockquote>
        <div className={styles.testimonialPerson}>
          <span className={styles.testimonialAvatar} aria-hidden="true">{story.name[0]}</span>
          <div><strong>{story.name}</strong><small>{story.tag}</small></div>
          <Link href={story.href} aria-label={resourceLabel + ' · ' + story.tag}><ArrowUpRight size={16} aria-hidden="true"/></Link>
        </div>
      </article>
    ))}
  </div>;
}

const translatedFAQs:Record<'en'|'pt',{q:string;a:string}[]>={
  en:[
    {q:'What is UniRide?',a:'UniRide is an academic university-mobility prototype in Lima. It proposes coordinating shared journeys by publishing a route, requesting a seat and confirming the trip. It is not a transport operator and does not guarantee availability.'},
    {q:'How do I reserve a seat?',a:'Create an account, complete your profile and find a route. Send a request and wait for the driver to accept it. A seat is confirmed when the request is marked accepted; sending a request does not reserve a seat.'},
    {q:'What if my journey is cancelled?',a:'Check whether it is a cancellation or a delay. Compare an alternative by time, cost and meeting point. Notify your team or teacher and use your plan B. The guide explains how to prepare one.'},
    {q:'Does UniRide guarantee safety or verify drivers?',a:'No. This academic prototype does not verify documents or backgrounds. Review profiles and arrangements, check vehicle details before boarding and choose a public meeting point. A confirmed email is not a safety certification.'},
    {q:'How much does it cost? Can I pay here?',a:'The driver proposes the contribution for each route. The prototype does not process payments, charge commissions or offer subscriptions. Review any arrangements made outside the platform beforehand.'},
    {q:'Is there a downloadable app?',a:'The project currently works as a mobile-friendly website. No official application has been published in app stores. You can explore the demo without registering personal data.'},
    {q:'What information is stored?',a:'The account uses your email for authentication. The profile stores name, university, district and role. Routes and requests require sign-in and have per-user access controls. Do not publish home addresses or documents in meeting-point fields.'},
    {q:'Can the chatbot check my reservations?',a:'The assistant explains the project and its guides. It cannot access other people’s reservations or personal information and does not change your account. Check your requests in My journeys.'},
  ],
  pt:[
    {q:'O que é a UniRide?',a:'A UniRide é um protótipo acadêmico de mobilidade universitária em Lima. Propõe organizar viagens compartilhadas: publicar uma rota, solicitar uma vaga e confirmar o trajeto. Não é uma operadora de transporte e não garante disponibilidade.'},
    {q:'Como reservo uma vaga?',a:'Crie uma conta, complete o perfil e busque uma rota. Envie um pedido e espere a aceitação do motorista. A vaga é confirmada quando o pedido aparece como aceito; enviar o pedido não reserva um lugar.'},
    {q:'O que fazer se minha viagem for cancelada?',a:'Confirme se é cancelamento ou atraso. Compare uma alternativa por tempo, custo e ponto de encontro. Avise seu grupo ou professor e ative seu plano B. O guia explica como prepará-lo.'},
    {q:'A UniRide garante segurança ou verifica motoristas?',a:'Não. O protótipo acadêmico não verifica documentos ou antecedentes. Revise o perfil e os acordos, confira os dados do veículo antes de embarcar e escolha um encontro público. Um e-mail confirmado não certifica segurança.'},
    {q:'Quanto custa? Posso pagar aqui?',a:'O motorista propõe a contribuição de cada rota. O protótipo não processa pagamentos, cobra comissões ou oferece assinaturas. Confira antes as condições de qualquer combinação fora da plataforma.'},
    {q:'Existe um aplicativo para baixar?',a:'Por enquanto, o projeto funciona como um site adaptável ao celular. Não há aplicativo oficial publicado nas lojas. A demo pode ser explorada sem registrar dados pessoais.'},
    {q:'Quais dados são guardados?',a:'A conta usa seu e-mail para autenticação. O perfil guarda nome, universidade, distrito e papel. Rotas e pedidos exigem login e possuem controles de acesso por usuário. Não publique endereços residenciais ou documentos nos pontos de encontro.'},
    {q:'O chatbot consulta minhas reservas?',a:'O assistente orienta sobre o projeto e seus guias. Não acessa reservas ou dados de outras pessoas e não altera a conta. Confira seus pedidos na seção Minhas viagens.'},
  ],
};

function ClosingPaper({c}:{c:Copy}){
  const ref=useRef<HTMLDivElement>(null);const[visible,setVisible]=useState(false);const[phase,setPhase]=useState(3);const[cycle,setCycle]=useState(0);
  useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setVisible(true);observer.disconnect();}},{threshold:.45});observer.observe(node);return()=>observer.disconnect();},[]);
  useEffect(()=>{if(!visible)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){setPhase(3);return;}setPhase(0);const timers=[1,2,3].map((n)=>setTimeout(()=>setPhase(n),n*650));return()=>timers.forEach(clearTimeout);},[visible,cycle]);
  return <div ref={ref} className={styles.closingVisual}><div className={styles.paperStack}><div className={styles.routePaper}><span className={styles.paperTape}/><div className={styles.paperHeading}><span>UNIRIDE</span><Route size={19}/></div><span className={styles.paperKicker}>{c.paperLabel}</span><dl>{c.paperRows.map(([label,value],i)=><div key={label} className={phase>i-1?styles.rowReady:''}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className={styles.paperPerforation}/><div className={styles.paperCheck}><span className={phase===3?styles.completeStatus:''}>{phase===3?<Check size={20}/>:<Clock3 size={19}/>}</span><div><b>{Math.min(phase,3)} / 3</b><small>{c.paperStatus[phase]}</small></div></div><div className={styles.paperBarcode}/><p>{c.paperFooter}</p></div><div className={styles.paperBehind}/><span className={styles.routeToken}><MapPin size={24}/></span></div><button className={styles.repeatButton} onClick={()=>setCycle(n=>n+1)}><RotateCcw size={13}/>{c.repeat}</button></div>;
}

export function BottomSections({locale='es'}:{locale?:Locale}){
  const c=copy[locale];const questions=locale==='es'?faqs:translatedFAQs[locale];
  return <>
    <section id="casos-de-uso" className={'r-section r-alt '+styles.casesSection}><div className="container"><div className="r-heading" data-reveal><div className="eyebrow">{c.casesLabel}</div><h2>{c.casesHeading}</h2><p className={styles.srOnly}>{c.casesIntro}</p></div><div className={styles.casesGrid}>{c.cases.map((item,i)=>{const Icon=caseIcons[i];return <article className={styles.caseCard} key={item.title} data-reveal data-tilt><Icon className={styles.caseIcon} size={29} strokeWidth={1.6}/><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href} className="r-link">{item.link} <ArrowRight size={14}/></Link></article>;})}</div></div></section>
    <section className={'r-section '+styles.comparisonSection}><div className="container"><div className="r-heading" data-reveal><div className="eyebrow">{c.comparisonLabel}</div><h2>{c.comparisonHeading}</h2><p>{c.comparisonIntro}</p></div><div className={styles.tableScroll} tabIndex={0} role="region" aria-label={c.comparisonCaption}><table className={styles.comparisonTable}><caption>{c.comparisonCaption}</caption><thead><tr>{c.comparisonHeaders.map((h,i)=><th scope="col" key={h} className={i===1?styles.highlightColumn:''}>{h}</th>)}</tr></thead><tbody>{c.comparisonRows.map(row=><tr key={row[0]}>{row.map((cell,i)=>i===0?<th scope="row" key={cell}>{cell}</th>:<td key={i} className={i===1?styles.highlightColumn:''}>{cell==='✓'?<Check size={20} aria-label={locale==='es'?'Incluido':locale==='pt'?'Incluído':'Included'}/>:cell}</td>)}</tr>)}</tbody></table></div><p className={styles.comparisonFootnote}>{c.comparisonNote}</p></div></section>
    <section className={'r-section '+styles.numbersSection} data-numbers><div className="container"><div className="r-heading" data-reveal><div className="eyebrow">{c.numbersLabel}</div><h2>{c.numbersHeading}</h2></div><div className={styles.numbersGrid}><Count target={articles.length} label={c.numberLabels[0]}/><Count target={6} label={c.numberLabels[1]}/><Count target={3} label={c.numberLabels[2]}/></div><p className={styles.srOnly}>{c.numbersNote}</p></div></section>
    <section id="testimonios" className={'r-section '+styles.storiesSection} aria-labelledby="testimonials-title">
      <div className="container">
        <div className={styles.testimonialHeading} data-reveal>
          <span>{c.storiesLabel}</span>
          <h2 id="testimonials-title">{c.storiesHeading}</h2>
          <p>{c.storiesIntro}</p>
        </div>
        <StoryCards c={c} locale={locale}/>
      </div>
    </section>
    <section id="preguntas-frecuentes" className={'r-section '+styles.faqSection}><div className="container"><div className="r-heading" data-reveal><div className="eyebrow">{c.faqLabel}</div><h2>{c.faqHeading}</h2><p>{c.faqIntro}</p></div><div className={styles.faqList}>{questions.map((f,i)=><details name="uniride-home-faq" key={f.q} className={styles.faqItem}><summary><h3>{f.q}</h3><ChevronDown size={21}/></summary><div className={styles.faqAnswer}><p>{f.a}</p>{i===2&&<Link className="r-link" href="/guia">{locale==='es'?'Abrir la guía del plan B':locale==='pt'?'Abrir o guia do plano B':'Open the plan B guide'}<ArrowUpRight size={14}/></Link>}</div></details>)}</div></div></section>
  </>;
}
