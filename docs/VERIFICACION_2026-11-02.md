# Revisión integrada del 2 de noviembre

Referencia visual: https://cobrapp.co/. Se revisaron las páginas Inicio, Blog, Nosotros, Planes, Contacto y Descargas en Chrome y los estados de scroll de la portada en 390 × 844. Se conservan las fuentes Archivo, sus ejes variables, papel/cuadrícula, colores, recibos, jerarquía, orden de secciones y navegación. El contenido se adapta a movilidad universitaria.

## Cambios de esta revisión

- La línea de tiempo horizontal se sustituyó por el trazado vertical de la referencia, con tarjetas y marcador que avanza al hacer scroll.
- El apartado del problema se reconstruyó como un cuaderno con cuatro renglones y una calculadora de cinta a la derecha.
- El recorrido separa introducción y escenario fijado; también cambia de módulo y color en celular al hacer scroll.
- Un marco compartido usa proporción física 71.9:150 y pantalla 1206:2622. Fuente: https://www.apple.com/iphone-18-pro/specs/. Se identifica como iPhone 18 Pro, no como un modelo base supuesto.
- Planes, Contacto y Descargas se corrigieron para seguir sus composiciones originales: cálculo impreso, ficha de consulta y teléfono sobre tres tarjetas con QR.
- El nombre escrito en Contacto actualiza la ficha solo en la vista local, sin envío previo.
- Blog incluye 12 artículos originales y portadas locales. Se comprobó filtro Plan B y lectura del storytelling con canonical al Blogger original.

## Comprobaciones

- TypeScript sin errores.
- Nueve pruebas de dominio y movilidad correctas.
- Compilación de producción y generación estática de 47 páginas correctas antes de la última revisión de subpáginas; se repite la compilación integrada al cerrar esta entrega.
- Cambio Mensual → Trimestral del estimador: 5 × 40 × 3 = S/ 600.00.
- Menú móvil, cambio de módulo por scroll y relación de aspecto del teléfono comprobados en navegador.
- Pruebas transaccionales de base de datos y contacto documentadas en tests/*.integration.sql; terminan en ROLLBACK.

No se certifica equivalencia pixel a pixel universal ni la totalidad de combinaciones de navegadores y tamaños. La portada tiene versiones ES/PT/EN; los artículos y las páginas del proyecto están en español.

## Activaciones externas

Siguen pendientes la clave de OpenAI, SMTP para registro público y la publicación/propiedad final de Search Console. Las integraciones verificadas de movilidad están detalladas en INTEGRACIONES_MOVILIDAD.md. No hay acceso autorizado a APIs privadas de tarifas o reservas de Uber, DiDi o Yango.
