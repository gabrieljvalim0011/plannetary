import React, { lazy, memo, Suspense, useEffect, useMemo, useState } from 'react';
import { planetPhenomena } from '../astronomy/planetPhenomena';
import { naturalSatellitesByPlanet } from '../data/naturalSatellites';

const Planet3D = lazy(() => import('./Planet3D.jsx'));
const PlanetSatellites3D = lazy(() => import('./PlanetSatellites3D.jsx'));

const movementRows = (planet) => [
  ['Rotação', `${planet.rotationPeriodHours.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} h`, 'tempo sideral aproximado'],
  ['Dia solar', `${planet.solarDayHours.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} h`, 'ciclo aparente do Sol no céu'],
  ['Ano', `${planet.orbitalPeriodEarthDays.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} dias`, 'período de translação'],
];

const profileRows = (planet) => [
  ['Tipo', planet.type],
  ['Diâmetro', `${planet.diameterKm.toLocaleString('pt-BR')} km`],
  ['Gravidade', `${planet.gravity.value} ${planet.gravity.unit}`],
  ['Temperatura média', planet.temperature.display],
  ['Distância do Sol', planet.distanceFromSun.display],
  ['Órbita', `${planet.distanceFromSun.au.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} UA`],
];

function PlanetExperience({ planet, planets, onSelectPlanet, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
      if (event.key === 'ArrowRight') {
        const index = planets.findIndex((item) => item.id === planet.id);
        onSelectPlanet?.(planets[(index + 1) % planets.length]?.id);
      }
      if (event.key === 'ArrowLeft') {
        const index = planets.findIndex((item) => item.id === planet.id);
        onSelectPlanet?.(planets[(index - 1 + planets.length) % planets.length]?.id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [planet.id, planets, onClose, onSelectPlanet]);

  const movement = useMemo(() => movementRows(planet), [planet]);
  const profile = useMemo(() => profileRows(planet), [planet]);
  const currentIndex = planets.findIndex((item) => item.id === planet.id);
  const advanced = planet.advanced;
  const phenomena = planetPhenomena[planet.id] || [];
  const [activePhenomenon, setActivePhenomenon] = useState(0);

  useEffect(() => {
    setActivePhenomenon(0);
  }, [planet.id]);

  const selectedPhenomenon = phenomena[activePhenomenon] || phenomena[0] || null;
  const satelliteSystem = naturalSatellitesByPlanet[planet.id] || { count: 0, countLabel: 'Nenhuma lua conhecida', source: 'https://science.nasa.gov/solar-system/solar-system-facts/', sourceLabel: 'NASA — fatos do Sistema Solar', satellites: [] };
  const [activeSatelliteId, setActiveSatelliteId] = useState(satelliteSystem.satellites[0]?.id || null);

  useEffect(() => {
    setActiveSatelliteId(satelliteSystem.satellites[0]?.id || null);
  }, [planet.id]);

  const activeSatellite = satelliteSystem.satellites.find((satellite) => satellite.id === activeSatelliteId) || satelliteSystem.satellites[0] || null;

  return (
    <section className="planet-experience" role="dialog" aria-modal="true" aria-label={`Exploração de ${planet.name}`}>
      <div className="planet-experience-backdrop" aria-hidden="true">
        <img src={planet.imageUrl} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="planet-experience-sheen" aria-hidden="true" />

      <div className="planet-experience-inner">
        <header className="planet-experience-header">
          <button type="button" className="planet-experience-back" onClick={onClose}>
            <span aria-hidden="true">←</span>
            Voltar ao Sistema Solar
          </button>
          <div className="planet-experience-path">
            <span>SISTEMA SOLAR</span><span aria-hidden="true">/</span><strong>EXPLORAÇÃO PLANETÁRIA</strong>
          </div>
          <span className="planet-experience-index">0{planet.positionFromSun} / {String(planets.length).padStart(2, '0')}</span>
        </header>

        <nav className="planet-experience-nav" aria-label="Navegar entre planetas">
          {planets.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === planet.id ? 'is-active' : ''}
              onClick={() => onSelectPlanet?.(item.id)}
              aria-current={item.id === planet.id ? 'page' : undefined}
            >
              <img src={item.imageUrl} alt="" width="28" height="28" loading="lazy" decoding="async" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <main className="planet-experience-content" key={planet.id}>
          <section className="planet-experience-hero">
            <div className="planet-experience-hero-copy">
              <span className="planet-position">PLANETA 0{planet.positionFromSun} · {planet.type.toUpperCase()}</span>
              <h1>{planet.name}</h1>
              <p className="planet-experience-subtitle">{planet.subtitle}</p>
              <p className="planet-experience-summary">{planet.summary}</p>
              <div className="planet-experience-source-line">
                <span>Modelo 3D · textura de referência: NASA / JPL</span>
                <a href={planet.factSource} target="_blank" rel="noreferrer">Fonte científica ↗</a>
              </div>
            </div>
            <div className="planet-experience-hero-media">
              <div className={`planet-experience-planet ${planet.id === 'saturno' ? 'is-saturn' : ''}`}>
                <Suspense fallback={<img src={planet.imageUrl} alt={`${planet.name} — imagem de referência`} fetchPriority="high" decoding="async" />}>
                  <Planet3D planet={planet} compact label={`Modelo 3D de ${planet.name}`} />
                </Suspense>
              </div>
            </div>
          </section>

          <section className="planet-experience-grid">
            <article className="planet-experience-card planet-experience-overview">
              <span className="planet-experience-label">VISÃO DO PLANETA</span>
              <h2>O que define {planet.name}</h2>
              <p>{planet.description}</p>
              <a href={planet.factSource} target="_blank" rel="noreferrer">Fonte científica ↗</a>
            </article>

            <article className="planet-experience-card">
              <span className="planet-experience-label">PERFIL</span>
              <div className="planet-experience-data-grid">
                {profile.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </article>



            <article className="planet-experience-card planet-experience-wide planet-experience-advanced">
              <div className="planet-experience-card-heading">
                <div>
                  <span className="planet-experience-label">DADOS ASTRONÔMICOS AVANÇADOS</span>
                  <h2>Mais detalhes sobre {planet.name}</h2>
                </div>
                <span className="planet-experience-accent" aria-hidden="true" />
              </div>
              <div className="planet-experience-advanced-grid">
                <div><span>Inclinação axial</span><strong>{advanced.axialTiltDeg.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}°</strong></div>
                <div><span>Densidade média</span><strong>{advanced.density.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} g/cm³</strong></div>
                <div><span>Velocidade de escape</span><strong>{advanced.escapeVelocityKms.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} km/s</strong></div>
                <div><span>Anéis</span><strong>{advanced.rings}</strong></div>
              </div>
              <div className="planet-experience-advanced-copy">
                <div><span>Atmosfera</span><p>{advanced.atmosphere}</p></div>
                <div><span>Estrutura e composição</span><p>{advanced.composition}</p></div>
                <div><span>Campo magnético</span><p>{advanced.magnetism}</p></div>
              </div>
            </article>
            <article className="planet-experience-card planet-experience-wide planet-experience-satellites">
              <div className="planet-experience-card-heading">
                <div>
                  <span className="planet-experience-label">SATÉLITES NATURAIS</span>
                  <h2>O sistema de luas de {planet.name}</h2>
                  <p className="planet-experience-card-intro">Explore algumas das luas mais conhecidas que orbitam {planet.name}. A visualização é esquemática e não está em escala.</p>
                </div>
                <span className="planet-experience-satellite-count">{satelliteSystem.countLabel}</span>
              </div>

              {satelliteSystem.satellites.length ? (
                <div className="planet-satellites-layout">
                  <div className="planet-satellites-stage">
                    <Suspense fallback={<div className="satellite-3d-loading">Preparando sistema de luas…</div>}>
                      <PlanetSatellites3D
                        planet={planet}
                        satellites={satelliteSystem.satellites}
                        selectedId={activeSatelliteId}
                        onSelectMoon={setActiveSatelliteId}
                      />
                    </Suspense>
                  </div>
                  <div className="planet-satellites-list" role="tablist" aria-label={`Satélites em destaque de ${planet.name}`}>
                    {satelliteSystem.satellites.map((satellite) => (
                      <button
                        key={satellite.id}
                        type="button"
                        className={satellite.id === activeSatelliteId ? 'is-active' : ''}
                        onClick={() => setActiveSatelliteId(satellite.id)}
                        role="tab"
                        aria-selected={satellite.id === activeSatelliteId}
                      >
                        <span className="planet-satellite-dot" style={{ background: satellite.color }} aria-hidden="true" />
                        <span><strong>{satellite.name}</strong><small>{satellite.retrograde ? 'Órbita retrógrada' : 'Satélite em destaque'}</small></span>
                      </button>
                    ))}
                    {activeSatellite && (
                      <div className="planet-satellite-detail">
                        <span>Em destaque</span>
                        <strong>{activeSatellite.name}</strong>
                        <small>{activeSatellite.retrograde ? 'Seu movimento orbital ao redor do planeta é retrógrado.' : `Uma representação simplificada do satélite no sistema de ${planet.name}.`}</small>
                      </div>
                    )}
                    <a href={satelliteSystem.source} target="_blank" rel="noreferrer">{satelliteSystem.sourceLabel} ↗</a>
                  </div>
                </div>
              ) : (
                <div className="planet-no-satellites">
                  <span className="planet-no-satellites-orbit" aria-hidden="true" />
                  <div>
                    <strong>{planet.name} não possui satélites naturais conhecidos.</strong>
                    <p>Mercúrio e Vênus são os únicos planetas do Sistema Solar sem luas conhecidas.</p>
                  </div>
                  <a href={satelliteSystem.source} target="_blank" rel="noreferrer">Fonte científica ↗</a>
                </div>
              )}
            </article>

            <article className="planet-experience-card planet-experience-wide planet-experience-phenomena">
              <div className="planet-experience-card-heading">
                <div>
                  <span className="planet-experience-label">FENÔMENOS PLANETÁRIOS</span>
                  <h2>Eventos que marcam a órbita de {planet.name}</h2>
                  <p className="planet-experience-card-intro">Explore configurações orbitais e alinhamentos que ajudam a entender como {planet.name} aparece e se movimenta no céu.</p>
                </div>
                <span className="planet-experience-accent" aria-hidden="true" />
              </div>
              <div className="planet-phenomena-layout">
                <div className="planet-phenomena-list" role="tablist" aria-label={`Fenômenos de ${planet.name}`}>
                  {phenomena.map((phenomenon, index) => (
                    <button
                      key={`${phenomenon.title}-${index}`}
                      type="button"
                      className={index === activePhenomenon ? 'is-active' : ''}
                      onClick={() => setActivePhenomenon(index)}
                      role="tab"
                      aria-selected={index === activePhenomenon}
                    >
                      <span className="planet-phenomena-symbol" aria-hidden="true">{phenomenon.symbol}</span>
                      <span>
                        <strong>{phenomenon.title}</strong>
                        <small>{phenomenon.type}</small>
                      </span>
                    </button>
                  ))}
                </div>
                {selectedPhenomenon && (
                  <div className="planet-phenomenon-detail" role="tabpanel">
                    <span className="planet-experience-label">{selectedPhenomenon.type}</span>
                    <div className="planet-phenomenon-visual" aria-hidden="true">
                      <span className="planet-phenomenon-orbit" />
                      <span className="planet-phenomenon-dot planet-phenomenon-sun" />
                      <span className="planet-phenomenon-dot planet-phenomenon-body" />
                    </div>
                    <h3>{selectedPhenomenon.title}</h3>
                    <p>{selectedPhenomenon.description}</p>
                    <span className="planet-phenomenon-cycle">{selectedPhenomenon.cycle}</span>
                    <a href={selectedPhenomenon.source} target="_blank" rel="noreferrer">Fonte astronômica ↗</a>
                  </div>
                )}
              </div>
            </article>

            <article className="planet-experience-card planet-experience-wide">
              <div className="planet-experience-card-heading">
                <div>
                  <span className="planet-experience-label">MOVIMENTO</span>
                  <h2>Como {planet.name} se move</h2>
                </div>
                <span className="planet-experience-accent" aria-hidden="true" />
              </div>
              <div className="planet-experience-movement-grid">
                {movement.map(([label, value, note]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{note}</small>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </main>

        <footer className="planet-experience-footer">
          <span>Use ← → para navegar entre planetas</span>
          <div>
            <button type="button" onClick={() => onSelectPlanet?.(planets[(currentIndex - 1 + planets.length) % planets.length]?.id)}>← Anterior</button>
            <button type="button" onClick={() => onSelectPlanet?.(planets[(currentIndex + 1) % planets.length]?.id)}>Próximo →</button>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default memo(PlanetExperience);
