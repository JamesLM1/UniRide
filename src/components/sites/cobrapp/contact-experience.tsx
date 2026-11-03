'use client';
import Link from 'next/link';
import {useState} from 'react';
import {BookOpen,Calculator,Mail,MapPin} from 'lucide-react';
import {ContactForm,type ContactDraft} from './contact-form';
import {ThermalReceipt} from './thermal-receipt';
import styles from './subpages.module.css';

export function ContactExperience(){
 const[draft,setDraft]=useState<ContactDraft>({name:'',email:'',phone:'',role:'interested',message:''});
 const roles:Record<string,string>={interested:'Interesado',passenger:'Pasajero',driver:'Conductor',support:'Consulta'};
 return <main id="contenido" className={'replica-page '+styles.page}>
  <div className="container reference-subpage-top"><nav className="reference-subpage-crumb" aria-label="Migas de pan"><Link href="/">Inicio</Link><span>›</span><span>Contacto</span></nav>
   <div className="reference-subpage-hero contact-reference-hero"><div className="reference-subpage-copy"><p className="eyebrow">CONTACTO</p><h1>Resolvemos<br/>tus dudas.<br/><span>Ponte en contacto</span></h1><p className="reference-subpage-lead">Cuéntanos qué necesitas conocer sobre UniRide. Nuestro equipo podrá revisar tu consulta.</p></div>
    <ThermalReceipt title="CONTACTO UNIRIDE" rows={[{label:'Nombre',value:draft.name||'Tu nombre'},{label:'Correo',value:draft.email||'tu@correo.com'},{label:'Teléfono',value:draft.phone||'Opcional'},{label:'Tipo',value:roles[draft.role]||'Interesado'}]} message={draft.message} footnote="Vista previa local. Se registra al enviar el formulario."/>
   </div>
  </div>
  <section className={'container '+styles.section+' contact-reference-section'}><div className={styles.contactGrid}>
   <div className={styles.contactInfo}><h2 className={styles.subheading}>Información de contacto</h2><ul className="reference-contact-rows">
    {[{Icon:Mail,title:'Consultas al equipo',text:'Escribe tu pregunta en el formulario. Tu mensaje se guarda de forma privada.',href:'#consulta'},
      {Icon:BookOpen,title:'Blog de la comunidad',text:'Doce guías de movilidad para organizar tu siguiente salida.',href:'/blog'},
      {Icon:Calculator,title:'Guía y calculadora',text:'Prepara un plan B y compara tus gastos de transporte.',href:'/calculadora'},
      {Icon:MapPin,title:'Lima, Perú',text:'Proyecto académico de movilidad universitaria colaborativa.',href:'/nosotros'}].map(({Icon,title,text,href},i)=><li key={title}><span className="contact-row-number">0{i+1}</span><div><h3><Icon size={17}/><Link href={href}>{title}</Link></h3><p>{text}</p></div></li>)}
   </ul><p className={styles.privacyNote}>También puedes consultar <Link href="/como-funciona">cómo funciona UniRide</Link> o abrir la guía flotante.</p></div>
   <div id="consulta"><ContactForm onDraftChange={setDraft}/></div>
  </div></section>
 </main>;
}
