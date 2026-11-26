'use client';
import * as Accordion from '@radix-ui/react-accordion';
import {ChevronDown} from 'lucide-react';

const questions=[
 ['¿UniRide ya ofrece viajes reales?','No. UniRide es un proyecto académico y sus pantallas representan escenarios de prueba. No opera transporte.'],
 ['¿Cómo se confirma una reserva?','Envías una solicitud de asiento y, dentro del flujo propuesto, la reserva se confirma cuando el conductor la acepta.'],
 ['¿Qué puede hacer el asistente Ruti?','Ruti orienta sobre las funciones del prototipo, preguntas frecuentes y alternativas de movilidad; no sustituye información verificada ni servicios de emergencia.'],
 ['¿Puedo descargar la aplicación?','Por ahora puedes abrir el prototipo de Figma y la demostración web. UniRide todavía no está publicada en Google Play ni en App Store.']
];
export function AgencyFAQ(){return <Accordion.Root type="single" collapsible defaultValue="0" className="agency-accordion">
 {questions.map(([question,answer],i)=><Accordion.Item key={question} value={String(i)} className="agency-accordion-item">
  <Accordion.Header><Accordion.Trigger className="agency-accordion-trigger">{question}<ChevronDown size={19} aria-hidden="true"/></Accordion.Trigger></Accordion.Header>
  <Accordion.Content className="agency-accordion-content"><p className="agency-accordion-text">{answer}</p></Accordion.Content>
 </Accordion.Item>)}
 </Accordion.Root>;}

