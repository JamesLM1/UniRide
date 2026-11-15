# UniRide

Web React / Next.js para el proyecto académico de movilidad universitaria en Lima.
Referencia de composición: Cobrapp. Textos, marca, ilustración del recorrido y funciones adaptados a UniRide.

## Iniciar en Antigravity

Requisitos: Node 24, npm. Abre esta carpeta en el editor.

```sh
npm ci
npm run dev
```

Abre http://localhost:3000. `npm run build` compila producción; `npm start` la sirve.

## Lo implementado

- Landing con escenas fijadas al scroll, módulos de color, tarjetas con inclinación, contadores, carrusel y tema claro/oscuro/sistema.
- Blog editorial, Planes con estimador, Contacto con recibo en vivo, Nosotros y Descargas con tres accesos QR.
- Marcos unificados con relación física 71.9:150 y pantalla 1206:2622 del iPhone 18 Pro, sin estirar la interfaz.
- Explorador de ocho campus, mapa OpenStreetMap, enlaces Google Maps y recordatorio iCalendar de la salida.
- Calculadora en tres pasos con estimaciones ingresadas por el usuario.
- Checklist local descargable, impresión/PDF desde el navegador y formulario opcional.
- Los 12 artículos del Blogger, con imágenes originales, categorías, autores y enlaces al original.
- Cuenta, perfil, publicación y búsqueda de rutas, solicitudes y aceptación de plazas.
- Cancelación que libera una plaza una sola vez, confirmación de inicio/final por ambas personas y valoración posterior.
- Demo aislada en almacenamiento local, con cambio entre pasajero y conductora. No escribe en Supabase.
- Chat flotante con guía disponible y adaptador de OpenAI en servidor, con base de conocimiento del proyecto.
- SEO con HTML prerenderizado, metadatos, canonical, Open Graph, sitemap, robots y JSON-LD en artículos.
- Captación de interés privada en Supabase con consentimiento independiente para novedades.

## Base de datos

Proyecto dedicado: `bcbpanoliodybgmofrap`. No utiliza ni modifica MiBazarPE.
Las cuatro migraciones de `supabase/migrations` crean tablas, RPC y controles de acceso.
La configuración cliente usa exclusivamente la clave **publishable**, que puede ser pública. La seguridad depende de RLS y permisos, no de ocultar esa clave.

No hay clave `service_role` en el código o en el navegador. Las escrituras pasan por RPC que validan identidad, perfil, estado y capacidad bajo bloqueo de fila. Las reservas no se aceptan desde el cliente mediante actualizaciones directas.

## IA y correo

Sin `OPENAI_API_KEY`, el chat identifica sus respuestas como **guía del proyecto**, no como IA. Para habilitar IA, configura esa clave solo en el entorno servidor y vuelve a desplegar. El modelo se configura con `OPENAI_MODEL` (por defecto `gpt-4.1-mini`). Las consultas de IA requieren una sesión; hay límites por usuario de 8/minuto y 80/día. Los mensajes no se guardan por la aplicación; la petición al proveedor lleva `store:false`.

La base de conocimiento está en `src/lib/knowledge.ts` y `articles.ts`. Es fundamentación con contenido curado, no un modelo afinado. No accede a reservas ni ejecuta operaciones. Un prompt no garantiza eliminar inyección; por eso no recibe herramientas, secretos o datos personales.

Supabase Auth requiere confirmar el correo. El SMTP por defecto de Supabase restringe los destinatarios y el volumen. Para registros públicos configura un SMTP transaccional y las URL permitidas del proyecto. No desactives la confirmación como atajo. Los correos del dominio institucional se validan por formato; eso no certifica afiliación.

## Publicación y Google

`netlify.toml` prepara Next.js para el adaptador oficial de Netlify. La fuente puede subirse sin `.env.local`, `node_modules` ni `.next`; Netlify debe compilarla. El dominio de producción se obtiene de la variable `URL` de Netlify, salvo que se defina `NEXT_PUBLIC_SITE_URL`.

Para Search Console se requiere una URL pública y verificar la propiedad con la cuenta autorizada. Se admite `GOOGLE_SITE_VERIFICATION` como etiqueta meta. Después presenta `/sitemap.xml`. La indexación y la posición en resultados dependen de Google y no se garantizan. Google Ads es un canal de pago distinto; no hay campañas ni gasto publicitario activados.

`NEXT_PUBLIC_GA_ID` es opcional. Analytics solo se carga al aceptar la medición. La captura de formularios funciona sin Analytics.

## Comprobaciones

```sh
npm test
npm run build
```

`tests/database.integration.sql` prueba RLS, propiedad, aceptación/cancelación idempotente, capacidad, confirmaciones, valoraciones, cuota de chat y privacidad de leads. Crea cuentas sintéticas dentro de una transacción y termina con ROLLBACK; no envía mensajes ni deja cuentas o viajes de prueba.

## Alcance honesto

Es un prototipo académico, no un operador comercial. No hay pagos, conductores verificados, alianzas institucionales, garantía de seguridad, puntualidad, disponibilidad o reemplazo automático. No se inventan descargas, usuarios, testimonios ni métricas. El aporte de cada ruta es una propuesta del conductor.
