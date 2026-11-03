<p align="center">
  <img src="public/images/uniride-symbol.png" alt="Logo de UniRide" width="110" />
</p>

# UniRide

**Conectamos tu ruta, compartimos el viaje.**

UniRide es una aplicación web de movilidad universitaria en Lima. Permite organizar viajes compartidos entre estudiantes, consultar rutas, solicitar un asiento y revisar los acuerdos del recorrido en un mismo lugar.

El proyecto surge de un problema cotidiano: coordinar el traslado a la universidad entre mensajes dispersos, horarios poco claros y cancelaciones de último momento. La propuesta reúne la información del viaje y añade recursos para planificar una alternativa y comparar los gastos de transporte.

Desarrollado como proyecto académico del curso **Technical Sales and Marketing**, de la carrera de Ingeniería de Sistemas de Información en la **Universidad Peruana de Ciencias Aplicadas (UPC)**.

**[Abrir la web](https://uniride-movilidad.vercel.app/)** · **[Probar la demo](https://uniride-movilidad.vercel.app/demo)** · **[Leer el blog](https://uniride-movilidad.vercel.app/blog)**

## ¿Qué problema aborda?

Los estudiantes sin movilidad propia necesitan conocer su ruta, horario, punto de encuentro y costo antes de salir. Cuando estos acuerdos quedan en distintas conversaciones, resulta difícil confirmar si existe una plaza disponible o qué hacer si el viaje se cancela.

UniRide busca apoyar esa organización. El informe académico desarrolla la problemática, el público objetivo, la propuesta de valor y la estrategia de contenidos. Este repositorio contiene la implementación web del prototipo.

## Funcionalidades

| Módulo | Qué permite hacer |
| --- | --- |
| Cuenta y perfil | Registrarse, iniciar sesión y completar un perfil universitario. |
| Rutas compartidas | Publicar un recorrido y consultar opciones por distrito, campus, fecha y plazas. |
| Solicitudes | Enviar una solicitud y revisar si está pendiente, aceptada o cancelada. |
| Gestión de plazas | Reservar una plaza cuando el conductor acepta y liberarla al cancelar. |
| Confirmaciones | Registrar el inicio y la llegada de cada participante. |
| Valoraciones | Valorar la experiencia después de completar el recorrido. |
| Calculadora | Comparar el gasto habitual de transporte con otra alternativa usando datos del usuario. |
| Plan B | Preparar un checklist, conservarlo en el navegador y descargarlo o imprimirlo. |
| Explorador | Consultar destinos universitarios, abrir indicaciones en Google Maps y generar un recordatorio de calendario. |
| Blog | Leer doce artículos del equipo sobre movilidad, seguridad, presupuesto y organización. |
| Contacto | Enviar consultas privadas al proyecto. |
| Asistente | Consultar una guía del proyecto; la integración con IA requiere configuración adicional. |
| Demostración | Explorar un flujo con datos ficticios sin generar reservas reales. |

La web incluye un diseño adaptable al celular, tema claro/oscuro y versiones de la portada en español, inglés y portugués.

## Recorrido principal

1. El conductor publica una ruta con su horario, plazas y aporte propuesto.
2. El pasajero consulta las opciones y envía una solicitud.
3. El conductor acepta la solicitud; en ese momento se reserva la plaza.
4. Cada participante confirma su inicio y su llegada.
5. Al completar las confirmaciones, pueden valorar la experiencia.

La demo utiliza almacenamiento local y perfiles ficticios. Las operaciones de cuentas y rutas reales utilizan Supabase.

## Tecnologías

| Capa | Herramientas |
| --- | --- |
| Aplicación web | Next.js 16, React 19 y TypeScript |
| Interfaz | CSS, GSAP y Lucide React |
| Datos y autenticación | Supabase: PostgreSQL, Auth, RLS y funciones SQL |
| Validación | Zod |
| Mapas y movilidad | OpenStreetMap, enlaces a Google Maps y archivos iCalendar |
| Asistente opcional | OpenAI API desde el servidor |
| Publicación actual | Vercel |
| Pruebas | Test runner de Node.js y scripts de integración SQL |

## Ejecutar en local

Requisitos: **Node.js 24**, npm y un proyecto de Supabase propio si se van a utilizar las funciones conectadas.

```bash
git clone https://github.com/JamesLM1/UniRide.git
cd UniRide
npm ci
```

Crea un archivo `.env.local` tomando `.env.example` como referencia:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu-clave-publicable
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Para trabajar con una instalación independiente, configura las variables de tu propio proyecto. El código original conserva su configuración pública de respaldo; no se deben realizar pruebas de escritura sobre los servicios de producción.

```bash
npm run dev
```

Abre **http://localhost:3000**.

| Comando | Uso |
| --- | --- |
| `npm run dev` | Iniciar el servidor de desarrollo. |
| `npm test` | Ejecutar las pruebas de lógica del proyecto. |
| `npm run build` | Compilar para producción. |
| `npm start` | Servir la compilación de producción. |

## Base de datos y configuración opcional

Las migraciones están en [`supabase/migrations`](supabase/migrations). Deben aplicarse en orden a un proyecto propio antes de utilizar las funciones conectadas. Incluyen perfiles, rutas, reservas, confirmaciones, valoraciones, mensajes y controles de acceso.

Supabase Auth requiere configurar las URL de retorno y el servicio de correo para habilitar el registro de usuarios. La validación del formato del correo institucional no certifica la afiliación del estudiante.

Variables opcionales documentadas en `.env.example`:

| Variable | Propósito |
| --- | --- |
| `OPENAI_API_KEY` | Habilitar el proveedor de IA desde el servidor. Nunca debe exponerse al navegador. |
| `OPENAI_MODEL` | Seleccionar el modelo del asistente. |
| `GOOGLE_SITE_VERIFICATION` | Verificar la propiedad en Google Search Console. |
| `NEXT_PUBLIC_GA_ID` | Configurar la medición, sujeta al consentimiento del usuario. |

Sin una clave de OpenAI, el asistente funciona como guía de preguntas frecuentes del proyecto. No consulta reservas ni ejecuta operaciones sobre ellas.

## Organización del repositorio

| Carpeta | Contenido |
| --- | --- |
| `src/app` | Páginas, rutas de API, autenticación y metadatos. |
| `src/components` | Componentes de la interfaz, formularios y demostraciones. |
| `src/lib` | Lógica de movilidad, cálculos, contenido del blog e integraciones. |
| `public` | Imágenes, fuentes y recursos públicos de la web. |
| `supabase/migrations` | Esquema, funciones SQL y permisos de base de datos. |
| `tests` | Pruebas de lógica y comprobaciones de integración SQL. |
| `scripts` | Utilidades para organizar el contenido y las imágenes del blog. |
| `docs` | Documentación técnica, estado del proyecto y referencias de diseño. |

Consulta [`docs/CONFIGURACION_TECNICA.md`](docs/CONFIGURACION_TECNICA.md) para conocer los detalles técnicos conservados de la implementación original. Algunas notas históricas pueden describir pasos anteriores al despliegue actual.

## Alcance del prototipo

UniRide es un proyecto académico. No opera servicios de transporte, procesa pagos ni verifica antecedentes de conductores. Tampoco garantiza seguridad, puntualidad o disponibilidad de viajes. El aporte lo propone el conductor y debe revisarse antes de solicitar una plaza.

Los planes comerciales y otras propuestas del informe forman parte del planteamiento académico; su presencia en el documento no implica que estén implementados o activados en la web.

El repositorio no incluye `.env.local`, contraseñas, claves privadas, dependencias instaladas ni archivos de compilación. Las políticas RLS y los permisos de la base de datos siguen siendo necesarios aunque la clave publicable del cliente sea visible.

## Equipo

- Jhon Cesar Avendaño Vila
- James Lucas Moreto
- Jairo Jalil Antonino Rodriguez Espinoza
- Oscar Enrique Valderrama Bautista
- Alex Oswaldo Villarroel Antonio
- Samir Aaron Vivar Guadalupe

## Créditos

Los artículos y sus autores se conservan a partir del [Blogger del equipo](https://uniride-movilidad-universitaria.blogspot.com/). La referencia de composición visual utilizada en el desarrollo está documentada en `docs/research/cobrapp`.

La fuente Archivo incluye su licencia en `public/sites/cobrapp/fonts/OFL-Archivo.txt`. Los recursos de terceros conservan sus derechos y licencias correspondientes.
