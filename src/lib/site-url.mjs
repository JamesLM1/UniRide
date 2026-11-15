/** One canonical origin for metadata, sitemap, links and QR codes. */
export function resolveSiteURL(environment = {}) {
  const configured = environment.NEXT_PUBLIC_SITE_URL || environment.URL;
  const vercelHost = environment.VERCEL_PROJECT_PRODUCTION_URL || environment.VERCEL_URL;
  const value = configured || (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000');
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('La URL pública de UniRide debe ser una dirección HTTP(S) sin credenciales.');
  }
  if (environment.VERCEL && (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.protocol !== 'https:')) {
    throw new Error('Configura NEXT_PUBLIC_SITE_URL con la URL HTTPS pública antes de desplegar UniRide.');
  }
  return url.origin;
}
