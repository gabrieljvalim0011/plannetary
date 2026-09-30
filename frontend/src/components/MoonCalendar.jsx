import React, { useMemo } from 'react';
import MoonIcon from './MoonIcon.jsx';
import { phaseLabels } from '../hooks/useMoonPhase.js';

const PHASES = [
  'phase-new',
  'phase-crescent',
  'phase-quarter',
  'phase-gibbous',
  'phase-full',
  'phase-waning-gibbous',
  'phase-waning-quarter',
  'phase-waning-crescent',
];

const SYNODIC_CYCLE = 29.530588853;
const PHASE_STEP = SYNODIC_CYCLE / 8;
const DAY = 86400000;

function phaseIndex(phase) {
  const index = PHASES.indexOf(phase);
  return index >= 0 ? index : 0;
}

function formatPhaseDate(timestamp) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp)).replace('.', '');
}

function buildUpcoming(phase) {
  const currentIndex = phaseIndex(phase?.phase);
  const nextIndex = (currentIndex + 1) % PHASES.length;
  const nextDelay = Number.isFinite(phase?.daysToNextPhase) ? phase.daysToNextPhase * DAY : PHASE_STEP * DAY;
  const firstTimestamp = Date.now() + Math.max(0, nextDelay);

  return Array.from({ length: 4 }, (_, offset) => {
    const index = (nextIndex + offset) % PHASES.length;
    return {
      phase: PHASES[index],
      timestamp: firstTimestamp + offset * PHASE_STEP * DAY,
    };
  });
}

export default function MoonCalendar({ phase, selectedPhase, onSelectPhase }) {
  const currentIndex = phaseIndex(phase?.phase);
  const previewIndex = phaseIndex(selectedPhase || phase?.phase);
  const upcoming = useMemo(
    () => buildUpcoming(phase),
    [phase?.phase, phase?.daysToNextPhase, phase?.fetchedAt],
  );

  return (
    <section className="moon-calendar" aria-label="Calendário lunar">
      <div className="moon-calendar-heading">
        <div>
          <span>CALENDÁRIO LUNAR</span>
          <strong>O ciclo em oito fases</strong>
        </div>
        {selectedPhase && selectedPhase !== phase?.phase ? (
          <span className="moon-calendar-preview-label">Pré-visualização</span>
        ) : null}
      </div>

      <div className="moon-phase-track" role="list" aria-label="Fases do ciclo lunar">
        {PHASES.map((phaseId, index) => {
          const isCurrent = index === currentIndex;
          const isPreview = index === previewIndex;
          return (
            <button
              key={phaseId}
              type="button"
              className={`moon-phase-step ${isCurrent ? 'is-current' : ''} ${isPreview ? 'is-preview' : ''}`}
              role="listitem"
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`Visualizar ${phaseLabels[phaseId]}`}
              title={`Visualizar ${phaseLabels[phaseId]}`}
              onClick={() => onSelectPhase?.(phaseId)}
            >
              <span className="moon-phase-step-icon" aria-hidden="true">
                <MoonIcon phase={phaseId} size={34} />
              </span>
              <span>{phaseLabels[phaseId]}</span>
            </button>
          );
        })}
      </div>

      <div className="moon-calendar-upcoming">
        <span className="moon-calendar-subheading">PRÓXIMAS MUDANÇAS</span>
        <div className="moon-calendar-upcoming-grid">
          {upcoming.map((item) => (
            <button
              key={`${item.phase}-${item.timestamp}`}
              type="button"
              className={`moon-calendar-upcoming-item ${item.phase === selectedPhase ? 'is-preview' : ''}`}
              onClick={() => onSelectPhase?.(item.phase)}
              title={`Visualizar ${phaseLabels[item.phase]}`}
            >
              <MoonIcon phase={item.phase} size={28} />
              <span>
                <strong>{phaseLabels[item.phase]}</strong>
                <small>{formatPhaseDate(item.timestamp)}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="moon-calendar-note">
        As datas são calculadas a partir da idade do ciclo lunar disponível no momento e servem como referência; a precisão final depende da fonte astronômica ao vivo.
      </p>
    </section>
  );
}
