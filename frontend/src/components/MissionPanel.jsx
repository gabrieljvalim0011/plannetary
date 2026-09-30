import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });
  const zoomPointersRef = useRef(new Map());
  const zoomGestureRef = useRef({ mode: 'none', startDistance: 0, startScale: 1, lastX: 0, lastY: 0 });

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

  useEffect(() => {
    setImageIndex(0);
    setZoomOpen(false);
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
    zoomPointersRef.current.clear();
  }, [selectedMissionId]);

  useEffect(() => {
    if (!zoomOpen) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape') setZoomOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [zoomOpen]);

  function resetZoom() {
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
  }

  function closeZoom() {
    setZoomOpen(false);
    resetZoom();
    zoomPointersRef.current.clear();
  }

  function handleZoomWheel(event) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.18 : 0.18;
    setZoomScale((current) => Math.min(4, Math.max(1, current + delta)));
  }

  function getPointerDistance() {
    const pointers = Array.from(zoomPointersRef.current.values());
    if (pointers.length < 2) return 0;
    const a = pointers[0];
    const b = pointers[1];
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  function handleZoomPointerDown(event) {
    event.stopPropagation();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    zoomPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (zoomPointersRef.current.size === 2) {
      zoomGestureRef.current = {
        mode: 'pinch',
        startDistance: getPointerDistance(),
        startScale: zoomScale,
        lastX: event.clientX,
        lastY: event.clientY,
      };
      return;
    }

    if (zoomScale > 1) {
      zoomGestureRef.current = {
        mode: 'pan',
        startDistance: 0,
        startScale: zoomScale,
        lastX: event.clientX,
        lastY: event.clientY,
      };
    }
  }

  function handleZoomPointerMove(event) {
    if (!zoomPointersRef.current.has(event.pointerId)) return;
    zoomPointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (zoomPointersRef.current.size >= 2) {
      const gesture = zoomGestureRef.current;
      const distance = getPointerDistance();
      if (!gesture.startDistance || !distance) return;
      const nextScale = Math.min(4, Math.max(1, gesture.startScale * (distance / gesture.startDistance)));
      setZoomScale(nextScale);
      if (nextScale <= 1.02) setZoomOffset({ x: 0, y: 0 });
      return;
    }

    if (zoomGestureRef.current.mode !== 'pan' || zoomScale <= 1) return;
    const gesture = zoomGestureRef.current;
    const dx = event.clientX - gesture.lastX;
    const dy = event.clientY - gesture.lastY;
    gesture.lastX = event.clientX;
    gesture.lastY = event.clientY;
    setZoomOffset((current) => ({
      x: current.x + dx,
      y: current.y + dy,
    }));
  }

  function handleZoomPointerUp(event) {
    zoomPointersRef.current.delete(event.pointerId);
    if (zoomPointersRef.current.size < 2) {
      zoomGestureRef.current.mode = zoomScale > 1 ? 'pan' : 'none';
      zoomGestureRef.current.startDistance = 0;
    }
  }

  function handleZoomDoubleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (zoomScale > 1) resetZoom();
    else setZoomScale(2);
  }

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
              {selectedImage ? (
                <button
                  type="button"
                  className="mission-image-zoom-trigger"
                  onClick={(event) => { event.stopPropagation(); resetZoom(); setZoomOpen(true); }}
                  aria-label={'Ampliar imagem da missão ' + selectedMission.name}
                  title="Ampliar imagem"
                >
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(event) => { event.currentTarget.style.opacity = '0'; }}
                  />
                  <span className="mission-image-zoom-hint" aria-hidden="true">⤢</span>
                </button>
              ) : <div className="mission-image-placeholder"><span>Imagem da missão</span><strong>Consulte a fonte oficial para o acervo visual disponível.</strong></div>}
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
            {zoomOpen && selectedImage ? (
              <div
                className="mission-image-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label={'Imagem ampliada da missão ' + selectedMission.name}
                onClick={(event) => {
                  if (event.target === event.currentTarget) closeZoom();
                }}
              >
                <button
                  type="button"
                  className="mission-image-lightbox-close"
                  onClick={(event) => { event.stopPropagation(); closeZoom(); }}
                  aria-label="Fechar imagem ampliada"
                >×</button>
                <div
                  className="mission-image-lightbox-frame"
                  onClick={(event) => event.stopPropagation()}
                  onWheel={handleZoomWheel}
                  onPointerDown={handleZoomPointerDown}
                  onPointerMove={handleZoomPointerMove}
                  onPointerUp={handleZoomPointerUp}
                  onPointerCancel={handleZoomPointerUp}
                  onDoubleClick={handleZoomDoubleClick}
                >
                  <img
                    className="mission-image-lightbox-image"
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    decoding="async"
                    draggable="false"
                    style={{
                      transform: 'translate3d(-50%, -50%, 0) translate3d(' + zoomOffset.x + 'px, ' + zoomOffset.y + 'px, 0) scale(' + zoomScale + ')',
                    }}
                  />
                  <div className="mission-image-lightbox-caption">
                    <strong>{selectedMission.name}</strong>
                    <span>{selectedImage.credit || selectedMission.imageCredit || 'Fonte oficial'}</span>
                  </div>
                  <span className="mission-image-lightbox-zoom-label" aria-hidden="true">
                    {zoomScale > 1.01 ? Math.round(zoomScale * 100) + '%' : 'Toque duas vezes para ampliar'}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
