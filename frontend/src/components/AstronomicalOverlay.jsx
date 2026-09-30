import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { calculateMarsTime, formatJ2000Days, formatMsd } from '../astronomy/marsTime.js';
import { calculatePlanetaryTime } from '../astronomy/planetaryTime.js';
import { missionHighlights } from '../astronomy/missionHighlights.js';
import { getEarthOrbitEvents, formatEventDate } from '../astronomy/orbitalEvents.js';

const INFO = {
  UTC: 'UTC é o relógio de referência usado no mundo para comparar horários. Aqui ele segue o relógio real e atualiza a cada segundo.',
  'Hora no planeta': 'É a hora solar de referência do planeta selecionado. Fora da Terra, o Plannetary usa um modelo de comparação baseado no período do dia solar e em uma convenção ancorada em J2000.0; isso não é um calendário civil oficial.',
  'Data planetária': 'A maioria dos planetas não possui um calendário civil universal. Por isso mostramos o número do dia desde J2000.0 e o progresso do ano orbital como uma convenção clara e rastreável.',
  J2000: 'J2000.0 é uma época astronômica padrão: 1º de janeiro de 2000, 12:00 no sistema de tempo dinâmico usado pelas efemérides. O Plannetary mostra quantos dias se passaram desde essa referência.',
  'Lₛ': 'Lₛ (longitude solar areocêntrica) indica a posição sazonal de Marte em sua órbita. É útil para dizer em qual estação marciana Marte está.',
  'Mars Sol Date': 'Mars Sol Date (MSD) é uma contagem contínua usada para acompanhar o tempo solar em Marte. Um sol é um dia marciano.',
  Gravidade: 'Mostra a gravidade na região equatorial do planeta e também a diferença em relação à gravidade terrestre. Isso explica por que seu peso muda de planeta para planeta.',
  'Dia solar': 'É o intervalo aproximado entre dois meios-dias solares no planeta. Ele é diferente do período de rotação sideral em vários casos.',
  Ano: 'É o tempo que o planeta leva para completar uma órbita ao redor do Sol. Aqui ele é mostrado em dias terrestres para facilitar a comparação.',
};

function DataOrb({ label, value, detail, className = '' }) {
  return (
    <div className={`astro-orb ${className}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail ? <small>{detail}</small> : null}
    </div>
  );
}

function AstronomicalOverlay({ planet, activeSection = 'planets' }) {
  const [now, setNow] = useState(() => new Date());
  const [infoOpen, setInfoOpen] = useState(false);
  const [earthOrbitOpen, setEarthOrbitOpen] = useState(false);
  const infoRef = useRef(null);
  const general = useMemo(() => calculatePlanetaryTime(planet, now), [planet, now]);
  const mars = useMemo(() => (planet.id === 'marte' ? calculateMarsTime(now) : null), [planet, now]);
  const mission = missionHighlights[planet.id] || null;
  const earthOrbit = planet.id === 'terra' ? getEarthOrbitEvents(now) : null;

  useEffect(() => {
    if (activeSection !== 'planets' || document.visibilityState !== 'visible') return undefined;

    let timeoutId = 0;
    let active = true;

    const tick = () => {
      if (!active) return;
      if (document.visibilityState === 'visible') setNow(new Date());
      timeoutId = window.setTimeout(tick, 1000);
    };

    timeoutId = window.setTimeout(tick, 1000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') setNow(new Date());
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [activeSection]);

  useEffect(() => {
    if (!infoOpen) return undefined;
    function handlePointerDown(event) {
      if (infoRef.current && !infoRef.current.contains(event.target)) setInfoOpen(false);
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setInfoOpen(false);
    }
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [infoOpen]);

  return (
    <section className="astronomical-overlay" aria-label={`Dados astronômicos de ${planet.name}`}>
      <div className="astro-heading" ref={infoRef}>
        <span className="eyebrow">DADOS ASTRONÔMICOS</span>
        <button
          className="astro-info"
          type="button"
          aria-label="Explicar os dados astronômicos"
          aria-expanded={infoOpen}
          onClick={() => setInfoOpen((open) => !open)}
        >
          i
        </button>
        {infoOpen ? (
          <div className="astro-info-popover" role="dialog" aria-label="Explicação dos dados astronômicos">
            <div className="astro-info-popover-head">
              <strong>Entenda os dados</strong>
              <button type="button" onClick={() => setInfoOpen(false)} aria-label="Fechar explicações">×</button>
            </div>
            <div className="astro-info-list">
              {Object.entries(INFO).map(([label, explanation]) => (
                <div key={label} className="astro-info-item">
                  <span>{label}</span>
                  <p>{explanation}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="astro-grid planetary-time-grid">
        <DataOrb label="UTC" value={general.utcTimeLabel} detail={`${general.utcDateLabel} · ao vivo`} className="utc" />
        <DataOrb label="Hora no planeta" value={general.localSolarTime} detail="meridiano de referência" />
        <DataOrb label="Data planetária" value={`Dia ${general.planetaryDayLabel}`} detail={`Ano ${general.planetaryYear} · dia ${general.planetaryYearDay}/${general.yearDayCount}`} />
        <DataOrb label="J2000" value={`+${formatJ2000Days(general.deltaJ2000Days)} d`} detail="desde J2000.0" />
      </div>

      <div className="astro-grid planetary-physics-grid">
        <DataOrb label="Gravidade" value={`${planet.gravity.value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m/s²`} detail={`${general.gravityDifferenceLabel} vs. Terra`} />
        <DataOrb label="Dia solar" value={`${planet.solarDayHours.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} h`} detail="duração média" />
        {planet.id === 'marte' ? (
          <DataOrb label="Lₛ" value={mars.lsLabel} detail={mars.season.name} className="season" />
        ) : (
          <DataOrb label="Ano" value={`${planet.orbitalPeriodEarthDays.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} d`} detail="tempo terrestre" />
        )}
        {planet.id === 'marte' ? (
          <DataOrb label="Mars Sol Date" value={formatMsd(mars.msd)} detail={`${mars.ltstLabel} LTST`} />
        ) : (
          <DataOrb label="Seu peso" value={`${general.weightMultiplier.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}×`} detail="comparado à Terra" />
        )}
      </div>

      <p className="astro-calendar-note">{general.calendarNote}</p>

      {mission ? (
        <div className="mission-highlight">
          <div>
            <span>MISSÃO EM DESTAQUE</span>
            <strong>{mission.name}</strong>
            <small>{mission.status} · {mission.location}</small>
            <p>{mission.note}</p>
          </div>
          <a href={mission.sourceUrl} target="_blank" rel="noreferrer">{mission.sourceLabel} ↗</a>
        </div>
      ) : null}

      {earthOrbit ? (
        <div className="earth-orbit-events" aria-label="Eventos da órbita da Terra">
          <button
            type="button"
            className="earth-orbit-toggle"
            onClick={() => setEarthOrbitOpen((open) => !open)}
            aria-expanded={earthOrbitOpen}
          >
            <span>Órbita da Terra</span>
            <span>{earthOrbitOpen ? '−' : '+'}</span>
          </button>
          {earthOrbitOpen ? (
            <div className="earth-orbit-panel">
              <article className="earth-orbit-event">
                <span>PERIÉLIO</span>
                <strong>{earthOrbit.perihelion ? earthOrbit.perihelionCountdown : '—'}</strong>
                <small>{earthOrbit.perihelion ? `${formatEventDate(earthOrbit.perihelion.at)} UTC` : 'sem próximo evento no calendário atual'}</small>
                <em>Terra mais próxima do Sol</em>
              </article>
              <article className="earth-orbit-event">
                <span>AFÉLIO</span>
                <strong>{earthOrbit.aphelion ? earthOrbit.aphelionCountdown : '—'}</strong>
                <small>{earthOrbit.aphelion ? `${formatEventDate(earthOrbit.aphelion.at)} UTC` : 'sem próximo evento no calendário atual'}</small>
                <em>Terra mais distante do Sol</em>
              </article>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export default memo(AstronomicalOverlay);
