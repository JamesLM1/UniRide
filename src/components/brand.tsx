import Link from 'next/link';

export function Brand({
  light = false,
  mark = true,
  logoOnly = false,
}: {
  light?: boolean;
  mark?: boolean;
  logoOnly?: boolean;
}) {
  return (
    <Link
      href="/"
      className={'brand ' + (light ? 'light ' : '') + (logoOnly ? 'brand-logo-only' : '')}
      aria-label="UniRide, inicio"
    >
      {logoOnly ? (
        <img
          src="/images/uniride-marca.svg"
          alt=""
          aria-hidden="true"
          className="brand-logo-img"
          width={55}
          height={45}
        />
      ) : (
        <>
          {mark && (
            <span className="brand-emblem">
              <img
                src="/images/uniride-marca.svg"
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
              />
            </span>
          )}
          <span className="brand-wordmark">Uni<span>Ride</span></span>
        </>
      )}
    </Link>
  );
}
