# Integraciones de movilidad de UniRide

Revisión: 1 de noviembre de 2026. La página `/explorar` conserva los colores, tipografía y componentes de la referencia Cobrapp, sin introducir un diseño de Uber.

## Implementado y utilizable

| Servicio o capacidad | Uso en UniRide | Datos que recibe | Límite real |
| --- | --- | --- | --- |
| OpenStreetMap, mapa web embebido | Mapa interactivo con controles de zoom y desplazamiento de la zona del campus seleccionado | Zona pública del campus; no GPS del visitante | Marcadores aproximados de referencia, no puertas de ingreso verificadas. Servicio externo sin disponibilidad garantizada. |
| Google Maps URLs | Enlace con origen público, campus y modo de transporte (`transit`, `driving`, `walking`) | Los dos lugares públicos elegidos, al abrir el enlace | Las rutas y condiciones se consultan en Google Maps. No hay precio, tráfico o ETA propios. Esta modalidad oficial no requiere API key. |
| Calendario iCalendar `.ics` | Descarga local de la salida prevista y aviso 30 minutos antes | Ningún servidor recibe el archivo al generarlo | El usuario importa el archivo en su calendario. El evento no representa una reserva, y no calcula una duración. Hora de Lima UTC−5, exportada a UTC. |
| Web Share API / Clipboard API | Resumen compartible bajo una acción del usuario; copia o cuadro manual como alternativa | Solo la aplicación/contacto que el usuario elige | No envía mensajes automáticamente, no accede a contactos ni comparte ubicación en vivo. |
| Lista previa a la salida | Confirmar traslado, revisar punto y guardar alternativa | Estado solo en memoria de esta página | No guarda una solicitud ni modifica reservas. |

El planificador no solicita ubicación del dispositivo ni datos personales. Los orígenes son cuatro puntos públicos de Lima y los destinos ocho campus. Las coordenadas incluidas únicamente centran **zonas aproximadas**; los enlaces de indicaciones usan nombres completos del lugar y ciudad para que el usuario confirme el acceso. No se guardan consultas en Supabase.

El iframe incluye y complementa la atribución `© OpenStreetMap contributors · ODbL`. No se descargan lotes de mapas, no se guardan tiles para uso offline y no se implementan llamadas de geocodificación por cada tecla. El mapa externo se carga de forma diferida.

## Qué se verificó de Uber, DiDi y Yango

No es posible identificar todas las conexiones internas de una aplicación mediante sus capturas de pantalla. Se revisó la documentación pública de sus proveedores.

| Proveedor | Evidencia pública | Decisión de implementación |
| --- | --- | --- |
| Uber | La introducción de Riders API declara que el acceso requiere aprobación de Uber y contacto con Business Development. Los enlaces de solicitud y los permisos no equivalen a acceso libre a precios o reservas. | No presentar una API de tarifas ni reservas activa sin autorización. La experiencia de revisar origen/destino sí se aplica en el planificador de UniRide. |
| DiDi | El repositorio oficial `didi/didi-ride-skill`, README en inglés, declara servicio en China continental y no fuera de China. | No instalar este MCP para un proyecto en Lima ni afirmar disponibilidad de su API en Perú. Se mantiene la coordinación clara de estados de UniRide. |
| Yango | Su documentación de socios permite widgets y API para información del viaje. La API exige una clave solicitada a `integration-support@yango.com`. | No fabricar una clave ni usar la clave de ejemplo documental. No hay precios ni pedidos integrados de Yango en esta versión. |

No se añadieron cuentas, contratos, cargos, solicitudes de viajes reales ni afirmaciones de alianza. Un lanzamiento con APIs comerciales de mapas/rutas puede implementarse después de configurar credenciales, cuotas y condiciones del proveedor elegido.

## Fuentes primarias consultadas

- Google Maps URLs: <https://developers.google.com/maps/documentation/urls/get-started>.
- Licencia y atribución de OpenStreetMap: <https://www.openstreetmap.org/copyright>.
- Política de tiles: <https://operations.osmfoundation.org/policies/tiles/>.
- Uber Riders API: <https://developer.uber.com/docs/riders/introduction>.
- Uber deep links: <https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction>.
- DiDi oficial, cobertura: <https://github.com/didi/didi-ride-skill/blob/main/README.en.md>.
- Yango, widgets e integración: <https://yango.com/en_int/partner-program/documentation/>.
- iCalendar RFC 5545: <https://www.rfc-editor.org/rfc/rfc5545>.

## Comprobaciones

`tests/mobility.test.mjs` comprueba los parámetros de navegación, el marcador del destino elegido, interpretación de Lima independientemente de la zona horaria del equipo, fechas imposibles o pasadas, escape y plegado UTF-8 de iCalendar y claridad del resumen compartido. La comparación visual y prueba de controles en navegador pertenecen a la revisión integrada del proyecto.

No se realizaron solicitudes de reserva o cotización a los proveedores competidores. Las consultas de red adicionales de geocodificación y política del demo de rutas quedaron interrumpidas; por ello no se añadió OSRM ni una supuesta ruta/ETA local verificada.
