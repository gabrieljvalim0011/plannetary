import React, { useEffect, useMemo, useState } from 'react';
import { missionCatalog } from '../astronomy/missionCatalog.js';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'active', label: 'Ativas' },
  { id: 'future', label: 'Futuras' },
  { id: 'historical', label: 'Históricas' },
];

function missionImageFallback(mission, index = 0) {
  const image = mission?.gallery?.[index] || mission?.gallery?.[0];
  return image?.src || mission?.imageUrl || null;
}

export default function MissionPanel({ planet, planets = [], selectedPlanetId, onSelectPlanet, onClose }) {
  const allMissions = missionCatalog[planet.id] || [];
  const [filter, setFilter] = useState('all');
  const [selectedMissionId, setSelectedMissionId] = useState(allMissions[0]?.id || 'featured');
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const list = missionCatalog[planet.id] || [];
    setSelectedMissionId(list[0]?.id || 'featured');
    setFilter('all');
    setImageIndex(0);
  }, [planet.id]);

  const visibleMissions = useMemo(() => {
    return allMissions.filter((item) => filter === 'all' || item.category === filter);
  }, [allMissions, filter]);

  const selectedMission = allMissions.find((item) => item.id === selectedMissionId) || visibleMissions[0] || allMissions[0];
  const gallery = useMemo(() => selectedMission?.gallery?.length ? selectedMission.gallery : (selectedMission?.imageUrl ? [{ src: selectedMission.imageUrl, alt: selectedMission.name, credit: selectedMission.imageCredit, kind: 'photo' }] : []), [selectedMission]);
  const selectedImage = gallery[imageIndex] || gallery[0];
  const titleIsLong = (selectedMission?.name?.length || 0) >= 11;

  useEffect(() => setImageIndex(0), [selectedMissionId]);

  if (!selectedMission) return null;

  function handleMissionSurfaceClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.mission-screen-header, .mission-planet-selector, .mission-catalog, .mission-screen-copy, .mission-screen-visual, .mission-gallery')) return;
    onClose?.();
  }

  return (
    <section className="mission-screen" aria-label={`Central de missões de ${planet.name}`} onClick={handleMissionSurfaceClick}>
      <div className="mission-screen-atmosphere" aria-hidden="true" />
      <div className="mission-screen-inner">
        <header className="mission-screen-header">
          <button type="button" className="mission-back" onClick={onClose}>
            <span aria-hidden="true">←</span>
            Voltar aos planetas
          </button>
          <div className="mission-screen-path">
            <span>MISSÕES</span><span aria-hidden="true">/</span><strong>{planet.name}</strong>
          </div>
        </header>

        <nav className="mission-planet-selector" aria-label="Selecionar planeta para explorar missões">
          <span className="mission-selector-label">EXPLORAR MISSÕES</span>
          <div className="mission-selector-track">
            {planets.map((item) => (
              <button key={item.id} type="button" className={`mission-planet-tab ${item.id === selectedPlanetId ? 'is-selected' : ''}`} onClick={() => onSelectPlanet?.(item.id)} aria-current={item.id === selectedPlanetId ? 'page' : undefined} title={`Missões de ${item.name}`}>
                <span className="mission-planet-thumb"><img src={item.imageUrl} alt="" loading="lazy" decoding="async" width="28" height="28" /></span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="mission-catalog" aria-label="Catálogo de missões">
          <div className="mission-filter-group" role="tablist" aria-label="Filtrar missões">
            {FILTERS.map((item) => (
              <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} className={`mission-filter ${filter === item.id ? 'is-active' : ''}`} onClick={() => { setFilter(item.id); const next = (missionCatalog[planet.id] || []).find((m) => item.id === 'all' || m.category === item.id); if (next) setSelectedMissionId(next.id); }}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="mission-list" role="listbox" aria-label={`Missões de ${planet.name}`}>
            {visibleMissions.map((item) => (
              <button key={item.id} type="button" role="option" aria-selected={selectedMissionId === item.id} className={`mission-list-item ${selectedMissionId === item.id ? 'is-selected' : ''}`} onClick={() => setSelectedMissionId(item.id)}>
                <span className="mission-list-dot" aria-hidden="true" />
                <span className="mission-list-copy"><strong>{item.name}</strong><small>{item.status}</small></span>
                <span className="mission-list-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mission-screen-content" key={`${planet.id}-${selectedMission.id}`}>
          <div className="mission-screen-copy">
            <div className="mission-status-line"><span className="mission-live-dot" aria-hidden="true" /><span>{selectedMission.status}</span></div>
            <p className="mission-screen-kicker">{selectedMission.type}</p>
            <h1 className={`mission-screen-title${titleIsLong ? ' is-long' : ''}`}>{selectedMission.name}</h1>
            <p className="mission-screen-location">{selectedMission.location}</p>
            <p className="mission-screen-objective">{selectedMission.objective}</p>

            <div className="mission-meta-line">
              <span>{selectedMission.target}</span><span aria-hidden="true">•</span><span>{selectedMission.partners}</span>
            </div>

            <div className="mission-screen-facts">
              <div><span>Destino</span><strong>{selectedMission.target}</strong></div>
              <div><span>Agência / parceria</span><strong>{selectedMission.partners}</strong></div>
              <div><span>Espaçonave</span><strong>{selectedMission.spacecraft}</strong></div>
              <div><span>Lançamento</span><strong>{selectedMission.launch}</strong></div>
              <div><span>Instrumentos</span><strong>{selectedMission.instruments}</strong></div>
              <div><span>Marco</span><strong>{selectedMission.milestone}</strong></div>
            </div>

            <div className="mission-info-grid">
              <section><span className="mission-section-label">SOBRE A MISSÃO</span><p>{selectedMission.overview}</p></section>
              <section><span className="mission-section-label">OBJETIVOS CIENTÍFICOS</span><ul>{selectedMission.science?.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><span className="mission-section-label">DESTAQUES</span><ul>{selectedMission.highlights?.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section><span className="mission-section-label">LINHA DO TEMPO</span><ul className="mission-timeline">{selectedMission.timeline?.map((item) => <li key={item}>{item}</li>)}</ul></section>
            </div>

            {selectedMission.note ? <div className="mission-screen-note">{selectedMission.note}</div> : null}

            <div className="mission-screen-footer">
              <a href={selectedMission.sourceUrl} target="_blank" rel="noreferrer">Fonte oficial ↗</a>
              <span className="mission-image-credit">Imagem: {selectedImage?.credit || selectedMission.imageCredit || 'fonte oficial'}</span>
            </div>
          </div>

          <div className="mission-media-column">
            <div className={`mission-screen-visual ${selectedImage ? 'has-image' : 'is-empty'}`}>
              <div className="mission-visual-backdrop" aria-hidden="true" />
              {selectedImage ? <img src={selectedImage.src} alt={selectedImage.alt} loading="eager" fetchPriority="high" decoding="async" onError={(event) => { event.currentTarget.style.opacity = '0'; }} /> : <div className="mission-image-placeholder"><span>Imagem da missão</span><strong>Consulte a fonte oficial para o acervo visual disponível.</strong></div>}
              <div className="mission-visual-caption">
                <span>MISSÃO · {planet.name.toUpperCase()}</span>
                <strong>{selectedMission.name}</strong>
                <small className="mission-media-kind">{selectedImage?.kind === 'concept' ? 'CONCEITO ARTÍSTICO' : selectedImage ? 'IMAGEM DA MISSÃO' : 'SEM IMAGEM CARREGADA'}</small>
                {gallery.length > 1 ? <small>{imageIndex + 1} / {gallery.length} imagens</small> : null}
              </div>
            </div>
            {gallery.length > 1 ? (
              <div className="mission-gallery" aria-label="Galeria de imagens da missão" onClick={(event) => event.stopPropagation()}>
                {gallery.map((item, index) => (
                  <button key={`${item.src}-${index}`} type="button" className={`mission-gallery-thumb ${index === imageIndex ? 'is-active' : ''}`} onClick={(event) => { event.stopPropagation(); setImageIndex(index); }} title={`Ver imagem ${index + 1}`}>
                    <img src={item.src} alt="" loading="lazy" decoding="async" width="76" height="56" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
