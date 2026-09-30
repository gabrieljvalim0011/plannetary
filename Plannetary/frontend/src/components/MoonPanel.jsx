import React, { useEffect, useMemo, useState } from 'react';
import Moon3D from './Moon3D.jsx';
import MoonCalendar from './MoonCalendar.jsx';
import MoonPhenomena from './MoonPhenomena.jsx';
import MoonMissions from './MoonMissions.jsx';
import { getMoonOrbitalEvents, formatEventDate } from '../astronomy/orbitalEvents.js';
import { phaseLabels } from '../hooks/useMoonPhase.js';

function formatAge(age) {
  if (!Number.isFinite(age)) return '—';
  return `${age.toFixed(2).replace('.', ',')} dias`;
}

function isNow(event) {
  return event && Math.abs(new Date(event.at).getTime() - Date.now()) < 30 * 60 * 1000;
}

export default function MoonPanel({ phase, onClose }) {
  const livePhase = phase?.phase || 'phase-full';
  const label = phase?.label || phaseLabels[livePhase] || 'Fase lunar';
  const illumination = Number.isFinite(phase?.illumination) ? phase.illumination : null;
  const [previewPhase, setPreviewPhase] = useState(livePhase);
  const [previewPhenomenon, setPreviewPhenomenon] = useState(null);
  const orbital = useMemo(() => getMoonOrbitalEvents(new Date()), []);
  const cycle = 29.530588853;
  const cycleProgress = Number.isFinite(phase?.age)
    ? Math.min(100, Math.max(0, (phase.age / cycle) * 100))
    : null;

  useEffect(() => {
    setPreviewPhase(livePhase);
    setPreviewPhenomenon(null);
  }, [livePhase]);

  function handlePhaseSelect(nextPhase) {
    setPreviewPhase(nextPhase);
    setPreviewPhenomenon(null);
  }

  function handlePhenomenonSelect(type) {
    setPreviewPhenomenon(type);
    if (type) setPreviewPhase('phase-full');
  }

  function handleMoonSurfaceClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.moon-screen-header, .moon-screen-content, .moon-screen-lower, .moon-missions')) return;
    onClose?.();
  }

  const isPreviewingPhase = !previewPhenomenon && previewPhase !== livePhase;
  const visualLabel = previewPhenomenon
    ? ({ super: 'Superlua', micro: 'Microlua', blood: 'Eclipse lunar', solar: 'Eclipse solar', blue: 'Lua azul' }[previewPhenomenon] || 'Fenômeno lunar')
    : (phaseLabels[previewPhase] || label);

  return (
    <section className="moon-screen" aria-label="Exploração da Lua" onClick={handleMoonSurfaceClick}>
      <div className="moon-screen-atmosphere" aria-hidden="true" />
      <div className="moon-screen-inner">
        <header className="moon-screen-header">
          <button type="button" className="moon-back" onClick={onClose}>
            <span aria-hidden="true">←</span>
            Voltar ao Sistema Solar
          </button>
          <div className="moon-screen-path">
            <span>LUA</span><span aria-hidden="true">/</span><strong>EXPLORAÇÃO LUNAR</strong>
          </div>
        </header>

        <div className="moon-screen-content">
          <section className="moon-screen-visual" aria-label="Modelo visual interativo da Lua">
            <div className="moon-visual-stage">
              <div className="moon-screen-orbit" aria-hidden="true">
                <div className="moon-screen-orbit-track" />
                <div className="moon-screen-orbit-dot" style={cycleProgress == null ? undefined : { '--moon-progress': `${cycleProgress}%` }} />
              </div>
              <Moon3D phase={previewPhase} phenomenon={previewPhenomenon} size="clamp(210px, 25vw, 350px)" />
            </div>
            <div className="moon-screen-visual-caption">
              <span>{previewPhenomenon ? 'FENÔMENO EM FOCO' : isPreviewingPhase ? 'PRÉ-VISUALIZAÇÃO' : 'FASE ATUAL'}</span>
              <strong>{visualLabel}</strong>
              <small>
                {previewPhenomenon
                  ? 'Clique em outro fenômeno ou fase para trocar a visualização.'
                  : illumination == null
                    ? 'Selecione uma fase para explorar a iluminação.'
                    : `${illumination.toFixed(1).replace('.', ',')}% iluminada no momento`}
              </small>
              {(previewPhenomenon || isPreviewingPhase) ? (
                <button type="button" className="moon-preview-reset" onClick={() => { setPreviewPhenomenon(null); setPreviewPhase(livePhase); }}>
                  Voltar para a Lua atual
                </button>
              ) : null}
            </div>
          </section>

          <section className="moon-screen-copy">
            <div className="moon-screen-kicker">CICLO LUNAR</div>
            <h1>A Lua</h1>
            <p className="moon-screen-intro">
              Uma visão dedicada às fases, ao ciclo e aos principais fenômenos orbitais da Lua, sem sobrecarregar a tela principal do Sistema Solar.
            </p>

            <div className="moon-screen-facts">
              <div><span>IDADE NO CICLO</span><strong>{formatAge(phase?.age)}</strong></div>
              <div><span>DURAÇÃO DO CICLO</span><strong>29,53 dias</strong><small>mês sinódico</small></div>
              <div><span>DISTÂNCIA MÉDIA</span><strong>384.400 km</strong><small>média orbital</small></div>
              <div><span>PERÍODO ORBITAL</span><strong>27,32 dias</strong><small>mês sideral</small></div>
            </div>

            <div className="moon-screen-events">
              <div className="moon-screen-section-label">PRÓXIMOS EVENTOS ORBITAIS</div>
              <div className="moon-screen-event-grid">
                <article className="moon-screen-event">
                  <span>PERIGEU</span>
                  <strong>{isNow(orbital.perigee) ? 'acontecendo agora' : orbital.perigeeCountdown}</strong>
                  <small>{orbital.perigee ? `${formatEventDate(orbital.perigee.at)} UTC · ${orbital.perigee.distanceKm.toLocaleString('pt-BR')} km` : 'sem próximo evento'}</small>
                </article>
                <article className="moon-screen-event">
                  <span>APOGEU</span>
                  <strong>{isNow(orbital.apogee) ? 'acontecendo agora' : orbital.apogeeCountdown}</strong>
                  <small>{orbital.apogee ? `${formatEventDate(orbital.apogee.at)} UTC · ${orbital.apogee.distanceKm.toLocaleString('pt-BR')} km` : 'sem próximo evento'}</small>
                </article>
              </div>
            </div>

            <p className="moon-screen-note">
              Perigeu é o ponto mais próximo da Terra; apogeu é o mais distante. Os horários dos eventos orbitais são apresentados em UTC.
            </p>
          </section>
        </div>

        <div className="moon-screen-lower">
          <MoonCalendar phase={phase} selectedPhase={previewPhase} onSelectPhase={handlePhaseSelect} />
          <MoonPhenomena selectedType={previewPhenomenon} onSelect={handlePhenomenonSelect} />
        </div>

        <MoonMissions />
      </div>
    </section>
  );
}
