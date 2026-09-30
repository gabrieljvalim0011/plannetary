import React, { lazy, memo, Suspense } from 'react';

const Planet3D = lazy(() => import('./Planet3D.jsx'));

function PlanetHero({ planet, onDetails }) {
  return (
    <div className="planet-scene" style={{ '--planet-accent': planet.accent, '--planet-glow': planet.glow }}>
      <div className="planet-haze" aria-hidden="true" />
      <div className="planet-horizon" aria-hidden="true" />

      <Suspense fallback={<img className="planet-3d-fallback-inline" src={planet.imageUrl} alt={`${planet.name} — imagem de referência`} fetchPriority="high" decoding="async" />}>
        <Planet3D planet={planet} />
      </Suspense>

      <div className="planet-hero-title">
        <span className="planet-position">PLANETA 0{planet.positionFromSun} · {planet.type.toUpperCase()}</span>
        <h1>{planet.name}</h1>
        <p className="planet-subtitle">{planet.subtitle}</p>
        <p className="planet-summary">{planet.summary}</p>
        <button className="details-link" type="button" onClick={onDetails}>Explorar detalhes <span>›</span></button>
      </div>

      <div className="planet-credit">Modelo 3D · dados científicos: NASA</div>
    </div>
  );
}

export default memo(PlanetHero);
