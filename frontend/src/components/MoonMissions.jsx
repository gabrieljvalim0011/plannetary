import React, { useEffect, useMemo, useState } from 'react';
import { moonMissionFilters, moonMissions } from '../astronomy/moonMissionCatalog.js';

function stateLabel(state) {
  if (state === 'future') return 'FUTURA';
  if (state === 'active') return 'ATIVA';
  return 'HISTÓRICA';
}

export default function MoonMissions() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(moonMissions[0]?.id || '');

  const visibleMissions = useMemo(
    () => moonMissions.filter((mission) => filter === 'all' || mission.program === filter),
    [filter],
  );

  const selectedMission =
    visibleMissions.find((mission) => mission.id === selectedId)
    || visibleMissions[0]
    || moonMissions[0];

  useEffect(() => {
    if (!visibleMissions.some((mission) => mission.id === selectedId)) {
      setSelectedId(visibleMissions[0]?.id || '');
    }
  }, [selectedId, visibleMissions]);

  useEffect(() => {
    if (!open) return undefined;
    const targets = visibleMissions
      .filter((mission) => mission.imageUrl && mission.id !== selectedMission?.id)
      .slice(0, 3);
    const warm = () => {
      targets.forEach((mission) => {
        const image = new Image();
        image.decoding = 'async';
        image.fetchPriority = 'low';
        image.src = mission.imageUrl;
      });
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(warm, { timeout: 900 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(warm, 120);
    return () => window.clearTimeout(id);
  }, [open, visibleMissions, selectedMission?.id]);

  return (
    <section className={`moon-missions ${open ? 'is-open' : ''}`} aria-label="Missões lunares">
      <button
        type="button"
        className="moon-missions-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="moon-missions-content"
      >
        <span>
          <small>EXPLORAÇÃO LUNAR</small>
          <strong>Missões à Lua</strong>
        </span>
        <span className="moon-missions-toggle-meta">
          <em>{moonMissions.length} missões catalogadas</em>
          <b>{open ? '−' : '+'}</b>
        </span>
      </button>

      {open ? (
        <div id="moon-missions-content" className="moon-missions-content">
          <div className="moon-missions-intro">
            <div>
              <span>CATÁLOGO LUNAR</span>
              <strong>Da Apollo à Artemis, da Luna às missões robóticas.</strong>
            </div>
            <small>
              Uma seleção curada para acompanhar marcos históricos, missões recentes e exploração lunar em andamento.
            </small>
          </div>

          <div className="moon-missions-filters" role="tablist" aria-label="Filtrar missões lunares">
            {moonMissionFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className={`moon-mission-filter ${filter === item.id ? 'is-active' : ''}`}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="moon-missions-layout">
            <aside className="moon-mission-list" aria-label="Catálogo de missões">
              {visibleMissions.map((mission) => (
                <button
                  key={mission.id}
                  type="button"
                  className={`moon-mission-list-item ${selectedMission?.id === mission.id ? 'is-selected' : ''}`}
                  onClick={() => setSelectedId(mission.id)}
                  aria-pressed={selectedMission?.id === mission.id}
                >
                  <span className={`moon-mission-list-code is-${mission.state}`}>{mission.code}</span>
                  <span className="moon-mission-list-copy">
                    <strong>{mission.name}</strong>
                    <small>{mission.status}</small>
                  </span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </aside>

            {selectedMission ? (
              <article className="moon-mission-detail">
                <div className={`moon-mission-visual ${selectedMission.imageUrl ? 'has-image' : 'is-empty'}`}>
                  {selectedMission.imageUrl ? (
                    <img
                      className="moon-mission-visual-image"
                      src={selectedMission.imageUrl}
                      alt={selectedMission.imageAlt || selectedMission.name}
                      width="960"
                      height="960"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  ) : (
                    <div className="moon-mission-visual-image" aria-hidden="true" />
                  )}
                  <div className="moon-mission-visual-glow" aria-hidden="true" />
                  <div className="moon-mission-visual-mark">
                    <span>{selectedMission.programLabel}</span>
                    <strong>{selectedMission.code}</strong>
                    <small>{selectedMission.imageKind === 'concept' ? 'Conceito artístico' : selectedMission.imageKind === 'replica' ? 'Réplica / artefato' : selectedMission.type}</small>
                  </div>
                  <div className="moon-mission-visual-caption">
                    <span>{stateLabel(selectedMission.state)}</span>
                    <strong>{selectedMission.name}</strong>
                    <small>{selectedMission.location}</small>
                  </div>
                </div>

                <div className="moon-mission-copy">
                  <div className={`moon-mission-status is-${selectedMission.state}`}>
                    <span />
                    {selectedMission.status}
                  </div>
                  <p className="moon-mission-kicker">{selectedMission.type}</p>
                  <h3>{selectedMission.name}</h3>
                  <p className="moon-mission-objective">{selectedMission.objective}</p>
                  {selectedMission.note ? <p className="moon-mission-objective moon-mission-note">{selectedMission.note}</p> : null}

                  <div className="moon-mission-meta">
                    <span>{selectedMission.target}</span>
                    <span aria-hidden="true">•</span>
                    <span>{selectedMission.partners}</span>
                  </div>

                  <div className="moon-mission-facts">
                    <div><span>Destino</span><strong>{selectedMission.target}</strong></div>
                    <div><span>Agência / parceria</span><strong>{selectedMission.partners}</strong></div>
                    <div><span>Espaçonave</span><strong>{selectedMission.spacecraft}</strong></div>
                    <div><span>Lançamento</span><strong>{selectedMission.launch}</strong></div>
                    <div><span>Instrumentos</span><strong>{selectedMission.instruments}</strong></div>
                    <div><span>Marco</span><strong>{selectedMission.milestone}</strong></div>
                  </div>

                  <div className="moon-mission-info-grid">
                    <section>
                      <span>Sobre a missão</span>
                      <p>{selectedMission.overview}</p>
                    </section>
                    <section>
                      <span>Objetivos científicos</span>
                      <ul>{selectedMission.science?.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                    <section>
                      <span>Destaques</span>
                      <ul>{selectedMission.highlights?.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                    <section>
                      <span>Linha do tempo</span>
                      <ul className="moon-mission-timeline">{selectedMission.timeline?.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  </div>

                  <div className="moon-mission-footer">
                    <a href={selectedMission.sourceUrl} target="_blank" rel="noreferrer">
                      Fonte oficial ↗
                    </a>
                    <span>{selectedMission.sourceLabel}{selectedMission.imageUrl ? ` · Imagem: ${selectedMission.imageCredit}` : ''}</span>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
