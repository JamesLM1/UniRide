'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="contenido" className="container empty-page"><h1>No pudimos completar la ruta.</h1><p>Ocurrió un problema al cargar esta vista. Intenta nuevamente.</p><button className="button" onClick={reset}>Volver a intentar</button></main>}
