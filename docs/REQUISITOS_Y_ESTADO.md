# Requisitos y evidencia de la entrega

Fuentes leídas: laboratorios 2, 3, 4, 5, 6, 7 y 8, Trabajo Parcial y la nueva versión de 60 páginas Technical Sales and Marketing Trabajo Parcial.pdf (01/11/2026). Se priorizaron las versiones recientes de los archivos. El concepto visual y logo se extrajeron de la página 17 del Trabajo Parcial. Las dos grabaciones fueron procesadas en la sesión de Gemini del usuario para extraer los apartados de clase; las marcas de minuto siguientes son aproximadas y se deben contrastar si se usa una cita literal en la exposición.

## Lo que pide la clase y cómo se adaptó

| Requisito | Fuente | Evidencia implementada |
|---|---|---|
| Web/landing real, preferentemente Blogger; alternativa con trabajo de indexación | Audio parte 1, alrededor de 06:21 y 20:34; parte 2 | Web React propia, Blogger conservado y enlazado; SEO técnico y publicación independiente |
| Navegación, páginas y artículos clasificados | Audio parte 1, aproximadamente 06:44–13:00 | Navegación pública, blog con los doce artículos originales del equipo y páginas legibles |
| Título, beneficio, CTA superior, imagen principal y CTA final | Audio parte 2, aproximadamente 22:08–23:23 | Portada con producto ilustrativo, CTA, secciones de valor y CTA final |
| Lead magnet gratuito: calculadora, guía u otro recurso adecuado al proyecto | Audio parte 2, aproximadamente 12:24–13:00; lab 5 | Calculadora de gastos y checklist descargable |
| Experiencia UX/UI por etapas y resultado final | Audio parte 2, aproximadamente 24:31–29:14 | Tres pasos de la calculadora, desglose del resultado, descarga y captación opcional |
| Nombre y correo / captación de leads | Audio parte 2, aproximadamente 01:50–05:50 | Formulario opcional que guarda una solicitud privada en Supabase; consentimiento de novedades separado |
| Dos emails maquetados | Audio parte 2, aproximadamente 31:42–33:02; lab 8 | `/entrega`: entrega de valor y recordatorio; no envíos reales |
| Una maqueta Google Ads por alumno | Audio parte 2, aproximadamente 35:21–36:15; lab 8 | `/entrega`: anuncio de James con tema cancelaciones, URL, títulos y descripciones |
| Maqueta social por alumno | Audio parte 2, aproximadamente 38:11–39:26; lab 8 | `/entrega`: creatividad de James adaptada a Instagram |
| Storytelling TOFU y blog | Lab 8 | Artículo «¿Te cancelaron el viaje…?» con Mateo, detonante, tensión, resolución y cierre circular; Blogger original enlazado |
| Funciones del MVP | Lab 4, página 4 | Perfiles, rutas, solicitudes, confirmaciones, cancelación y valoración |

El ejemplo Nutrimind Kids pertenece a la explicación docente; no es el producto de este equipo.

## Decisiones necesarias

- No se inventaron testimonios para completar la sección mencionada por la profesora. Se pueden añadir cuando existan pruebas con consentimiento y comentarios reales.
- No se copiaron las cifras, reseñas, servicios, condiciones comerciales ni módulos de cobranza de Cobrapp. Se adaptó su composición a movilidad universitaria.
- Los objetivos de descargas, pasajeros o conductores de los laboratorios son metas, no métricas del prototipo.
- Las propuestas comerciales tienen precios contradictorios entre laboratorios. La web no activa suscripciones, pagos ni comisiones.
- Search Console, Analytics y chatbot no aparecen como requisitos explícitos en esas dos grabaciones. SEO e indexación se implementan por el objetivo de publicar la web; el chatbot se añade por pedido de James.
- La afirmación de clase sobre indexación automática no implica que Google garantice indexación inmediata o una posición. Hace falta una URL pública accesible, propiedad verificada cuando corresponda y seguimiento.

## Referencias técnicas verificadas

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Search Console: https://support.google.com/webmasters/answer/9128668
- Supabase SSR: https://supabase.com/docs/guides/auth/server-side/creating-a-client
- Supabase SMTP: https://supabase.com/docs/guides/auth/auth-smtp
- Supabase grants/Data API: https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically
- OpenAI Responses: https://developers.openai.com/api/reference/resources/responses/methods/create
- Netlify Next.js: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/

## Pendientes externos que no deben presentarse como terminados

- Clave de proveedor para activar respuestas generadas por IA. Mientras falte, la guía funciona y se identifica correctamente.
- SMTP transaccional y URLs autorizadas de Auth para registros de alumnos fuera del equipo administrador.
- Verificación de propiedad e indexación en Google sobre la URL pública final.
- Datos o testimonios reales de validación de usuarios, si la profesora exige esa evidencia.

## Documento actualizado de 60 páginas

La versión nueva incorpora una encuesta exploratoria de 30 participantes por conveniencia, cinco valores (seguridad, confianza, colaboración, accesibilidad, innovación sostenible) y metas de 800 pasajeros/80 conductores en tres meses. Se tratan como evidencia académica/metas, no como usuarios reales del prototipo. El planteamiento menciona SSO, matching IA, pagos y reasignación automática; estas propuestas no equivalen a integraciones habilitadas ni autorizaciones de terceros. El alcance ejecutable se documenta por separado.
