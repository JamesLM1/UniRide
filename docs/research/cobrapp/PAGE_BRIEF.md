# Cobrapp → UniRide: mapa de réplica

Solicitud de James: conservar diseño, paleta, proporciones e interacciones de https://cobrapp.co/; cambiar únicamente marca, contenido y funciones al proyecto UniRide. La versión inicial con fondo azul y bloques simplificados fue rechazada; no es la referencia válida.

Se usa la guía `clone-website` del repositorio MIT JCodesMore/ai-website-cloner-template, descargado en `work/ai-website-cloner-template`. No se pegan bundles de producción ni se inserta la web dentro de un iframe.

## Reglas observadas

- Contenedor 1240 px máximo, con 48 px de margen interno en escritorio. A 1912 px el contenido empieza aproximadamente en x=384.
- Cabecera sticky, 70 px, marca a la izquierda, Inicio/Blog/Planes/Contacto/Nosotros, idioma ES/PT/EN, tema sistema/claro/oscuro y CTA de descarga.
- Fuente real Archivo, normal 400; variaciones de peso alrededor de 600 en navegación/CTA y 750 en título. El título principal mide 60 px, línea 61.2 px, tracking -1.8 px. H2 36 px/1.1.
- Papel claro #f2efe4; tinta #16150f. El modo de sistema oscuro muestra fondo #16150f con cuadrícula 24 px y texto #f2efe4. Menta #82c6bc. Hero con gradiente 118deg #0d3b33 → #1c695b.
- Botones rectangulares, borde de 2 px, sombra desplazada 4 px en menta o papel. No píldoras ni tarjetas redondeadas ajenas al original.
- Hero de dos columnas: texto y métricas, teléfono inclinado, papel de notas y recibo. Al hacer wheel queda fijado; el texto cambia a una frase grande y la composición se acerca. El recibo puede repetir su animación por clic.
- La demo de 3 pasos cambia por scroll, no es simplemente un conjunto de botones. En móvil debe ofrecer desplazamiento/swipe.
- Hay escenas de revelado por scroll, línea de tiempo, seis funciones, tour de módulos fijado por scroll, módulos extra, bloque de uso sin conexión, casos, tabla comparativa, contadores, carrusel móvil con pausa, planes, FAQ y CTA final con QR.

## Mapa de rutas y responsables

| Origen | Destino | Archivo/propietario |
|---|---|---|
| `/` | `/` | Landing y escenas: root; bottom-sections: agente de secciones inferiores |
| `/blog` | `/blog` | Blog ya implementado, conservar contenido de UniRide |
| `/planes` | `/planes` | Planes/participación: agente de páginas |
| `/contacto` | `/contacto` | Contacto privado y RPC: agente de páginas |
| `/nosotros` | `/proyecto` | Proyecto y equipo UniRide, root |
| `/descargas` | `/descargas` | Recursos web y offline: agente de páginas |
| Landings de funciones de cobranza | `/funciones/[slug]` | Funciones reales de movilidad, root |
| Web de cobranza | `/app/rutas`, `/app/publicar`, `/app/solicitudes`, `/app/perfil` | MVP de UniRide ya probado, root |
| Demostración | `/demo` | Estado local ficticio aislado del backend, root |

## Adaptación del contenido

Las pantallas de cobros se reconstruyen como UI editable de rutas, solicitudes y confirmaciones. No se usan el logo, recibos reales, cifras de clientes, testimonios, planes comerciales ni capturas financieras de Cobrapp como contenido de UniRide. Los contadores de UniRide describen recursos existentes (guías, pasos), no usuarios o resultados inventados. Las historias son escenas ficticias identificadas. No hay app publicada en Google Play/App Store: los CTA llevan a la web, la demo y el checklist.

El bloque offline se adapta a guardar el checklist público y sus recursos; las reservas, API y datos de sesión necesitan conexión y no deben quedar cacheados.

## Assets

- Fuente observada: https://cobrapp.co/_astro/fonts/58be840ac4e07877.woff2 → `public/sites/cobrapp/fonts/archivo-source.woff2`.
- Logo de UniRide: extraído como imagen nativa de la página 17 del Trabajo Parcial → `public/images/uniride-original.png`.
- Portada de cancelaciones: imagen del trabajo previo de James → `public/images/plan-b.png`.
- UI de teléfono, recibo, mapas y módulos: componentes React propios, con datos de ejemplo identificados.

## Comprobación pendiente tras integración

Comparar escritorio/móvil en estados inicial, scroll intermedio y final; invertir scroll; revisar tema, menú, idiomas, carouseles, tabs, tabla/estimador, formularios, QR y descargas. Confirmar enlaces y ausencia de overflow. Ejecutar compilación de producción y pruebas de dominio después de unir las secciones.
