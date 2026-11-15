# Despliegue de UniRide

## Arquitectura elegida

- Vercel: Next.js completo, páginas, API y recursos originales. Node 24; región de funciones `gru1` próxima a Supabase en São Paulo.
- Supabase existente: proyecto `bcbpanoliodybgmofrap`, exclusivo de UniRide. No se recrea la base ni se trasladan datos de MiBazarPE.
- Primera dirección pública: subdominio HTTPS asignado por Vercel. El nombre exacto depende de su disponibilidad; no hay dominio propio comprado.
- Google: propiedad de prefijo de URL en Search Console y envío del sitemap después de verificar una publicación accesible sin iniciar sesión.

## Estado comprobado el 2 de noviembre de 2026

- Base activa; ocho tablas públicas con RLS; cuatro migraciones existentes.
- Security Advisor sin avisos.
- Prueba transaccional de reservas, capacidad, idempotencia, confirmación de ambas partes, reseñas y privacidad: PASS. ROLLBACK al terminar.
- Prueba transaccional de contacto y consentimiento: terminó correctamente y se revirtió.
- 17 pruebas Node correctas; TypeScript correcto.
- `next build` compila y valida tipos, pero el prerenderizado local se interrumpe por EPERM al crear carpetas de `.next` en Windows. El build completo debe verificarse en Vercel; aún no se declara correcto.
- El panel de Auth conserva `http://localhost:3000` y no tiene Redirect URLs. Debe actualizarse con la URL definitiva.
- El panel de Emails indica que usa el proveedor predeterminado y no tiene SMTP propio configurado. El registro público y la recuperación por correo no están validados para destinatarios externos.
- Aún no hay despliegue creado ni propiedad de Search Console registrada durante esta revisión. Vercel solicita al titular una autorización de acceso al equipo.

## Configuración de producción

Definir `NEXT_PUBLIC_SITE_URL` con la URL HTTPS definitiva, sin ruta. Definir `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` con la configuración pública del mismo proyecto. No se necesita `service_role` para la app.

`GOOGLE_SITE_VERIFICATION` contendrá únicamente el valor de verificación entregado por Search Console cuando exista la propiedad. El código ya lo admite como metaetiqueta. No inventar el valor.

El chat funciona como guía sin credenciales de IA. No habilitar gasto en proveedores de IA como requisito del despliegue.

En Supabase, configurar Site URL y permitir exactamente `/auth/callback` y `/auth/callback?next=/actualizar-clave` en la dirección publicada. Conservar el acceso local necesario. No permitir un comodín para todos los proyectos de Vercel. Mantener confirmación por correo y configurar un SMTP autorizado antes de considerar abierto el registro público.

## Publicación y comprobación pendientes

1. Autorizar el acceso al equipo de Vercel y comprobar que el proyecto seleccionado pertenece a James.
2. Crear o reutilizar el proyecto exclusivo de UniRide y definir su URL canónica y variables públicas.
3. Subir únicamente fuentes y recursos, sin `.env.local`, backups, `node_modules` ni `.next`; ejecutar el build completo en Vercel.
4. Verificar portada, navegación, temas, animaciones y adaptación móvil; blog de doce artículos; calculadora, checklist y descargas; chat y contacto; protección de cuenta.
5. Configurar los enlaces de Supabase y SMTP; comprobar registro, confirmación, inicio y recuperación con una cuenta de prueba autorizada.
6. Revisar `/robots.txt`, `/sitemap.xml`, canonical y metadatos con la URL definitiva. Conservar el canonical original de los artículos importados de Blogger.
7. Registrar la propiedad en Search Console, verificarla y enviar `/sitemap.xml`. Distinguir envío aceptado de indexación conseguida; Google determina los tiempos y posiciones.

## Restauración

La base no ha cambiado de esquema. Conservar migraciones y backups locales existentes. En Vercel, conservar el identificador de cada despliegue y usar la promoción o restauración de una versión previamente verificada; no recrear proyectos para corregir un build.
