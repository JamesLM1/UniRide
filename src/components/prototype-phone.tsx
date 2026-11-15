import Image from 'next/image';

const dimensions = {
  "inicio": [328, 701],
  "programacion": [325, 659],
  "reemplazo": [334, 701],
  "reserva": [338, 688],
  "ruta": [325, 682],
  "viaje-finalizado": [334, 694],
  "viajes": [328, 701]
};

type Screen = keyof typeof dimensions;

export function PrototypePhone({screen, alt, className}: {screen: Screen; alt: string; className: string}) {
  return (
    <Image
      className={`prototype-phone ${className}`}
      src={`/images/prototipo-${screen}.webp`}
      width={dimensions[screen][0]}
      height={dimensions[screen][1]}
      alt={alt}
      unoptimized
    />
  );
}
