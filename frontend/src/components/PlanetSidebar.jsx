import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

function PlanetSidebar({ activeSection = 'planets', onSectionChange }) {
  return (
    <aside className="orbit-sidebar" aria-label="Navegação do Plannetary">
      <div className="plannetary-wordmark">Plannetary<span>✦</span></div>
      <button
        className={`side-icon ${activeSection === 'planets' ? 'active' : ''}`}
        type="button"
        aria-label="Planetas"
        title="Planetas"
        aria-pressed={activeSection === 'planets'}
        onClick={() => onSectionChange?.('planets')}
      >◌</button>
      <button
        className={`side-icon ${activeSection === 'moon' ? 'active' : ''}`}
        type="button"
        aria-label="Lua"
        title="Lua"
        aria-pressed={activeSection === 'moon'}
        onClick={() => onSectionChange?.(activeSection === 'moon' ? 'planets' : 'moon')}
      >☾</button>
      <button
        className={`side-icon ${activeSection === 'missions' ? 'active' : ''}`}
        type="button"
        aria-label="Missões"
        title="Missões"
        aria-pressed={activeSection === 'missions'}
        onClick={() => onSectionChange?.(activeSection === 'missions' ? 'planets' : 'missions')}
      >🚀</button>
    </aside>
  );
}

export default memo(PlanetSidebar);

const RAIL_MIN_OFFSET = -4;
const RAIL_MAX_OFFSET = 3;
const RAIL_DEBOUNCE_MS = 190;

function wrapIndex(index, length) {
  if (!length) return 0;
  return ((index % length) + length) % length;
}

function getShortestOffset(index, selectedIndex, length) {
  if (!length) return 0;
  let offset = index - selectedIndex;
  const half = Math.floor(length / 2);
  if (offset > half) offset -= length;
  if (offset < -half) offset += length;
  return offset;
}

function normalizeRailOffset(offset, length) {
  if (length <= 1) return 0;
  let result = offset;
  while (result < RAIL_MIN_OFFSET) result += length;
  while (result > RAIL_MAX_OFFSET) result -= length;
  return result;
}

function createRailOffsets(planets, selectedIndex) {
  const offsets = {};
  planets.forEach((planet, index) => {
    offsets[planet.id] = normalizeRailOffset(getShortestOffset(index, selectedIndex, planets.length), planets.length);
  });
  return offsets;
}

function shiftRailOffsets(currentOffsets, direction, planetsLength) {
  const nextOffsets = {};
  Object.entries(currentOffsets).forEach(([planetId, offset]) => {
    nextOffsets[planetId] = normalizeRailOffset(offset - direction, planetsLength);
  });
  return nextOffsets;
}

function selectByOffset(currentOffsets, selectedPlanetId, targetPlanetId, shift, planetsLength) {
  if (!targetPlanetId || selectedPlanetId === targetPlanetId) return currentOffsets;
  const nextOffsets = {};
  Object.entries(currentOffsets).forEach(([planetId, offset]) => {
    nextOffsets[planetId] = normalizeRailOffset(offset - shift, planetsLength);
  });
  return nextOffsets;
}

function PlanetRailView({ planets, selectedPlanetId, onSelect }) {
  const lockRef = useRef(false);
  const stageRef = useRef(null);
  const currentIndexRef = useRef(0);
  const lastHandledIdRef = useRef(selectedPlanetId);
  const [railOffsets, setRailOffsets] = useState(() => {
    const initialIndex = Math.max(0, planets.findIndex((planet) => planet.id === selectedPlanetId));
    currentIndexRef.current = initialIndex;
    return createRailOffsets(planets, initialIndex);
  });

  const railOffsetsRef = useRef(railOffsets);
  useEffect(() => {
    railOffsetsRef.current = railOffsets;
  }, [railOffsets]);

  const selectedIndex = useMemo(() => {
    const index = planets.findIndex((planet) => planet.id === selectedPlanetId);
    return index >= 0 ? index : 0;
  }, [planets, selectedPlanetId]);

  useEffect(() => {
    if (!planets.length) return;
    if (lastHandledIdRef.current === selectedPlanetId) return;

    currentIndexRef.current = selectedIndex;
    lastHandledIdRef.current = selectedPlanetId;
    setRailOffsets(createRailOffsets(planets, selectedIndex));
  }, [planets, selectedIndex, selectedPlanetId]);

  useEffect(() => {
    if (window.innerWidth > 860 || !stageRef.current) return;
    const selected = stageRef.current.querySelector('#planet-rail-loop-' + selectedPlanetId);
    selected?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [selectedPlanetId]);

  const moveSelection = useCallback((direction) => {
    if (planets.length < 2) return;

    const currentIndex = currentIndexRef.current;
    const nextIndex = wrapIndex(currentIndex + direction, planets.length);
    const nextPlanet = planets[nextIndex];

    currentIndexRef.current = nextIndex;
    lastHandledIdRef.current = nextPlanet.id;
    setRailOffsets((offsets) => shiftRailOffsets(offsets, direction, planets.length));
    onSelect(nextPlanet.id);
  }, [onSelect, planets]);

  const handleWheel = useCallback((event) => {
    if (window.innerWidth <= 860 || Math.abs(event.deltaY) < 1) return;
    event.preventDefault();
    event.stopPropagation();
    if (lockRef.current) return;

    lockRef.current = true;
    moveSelection(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      lockRef.current = false;
    }, RAIL_DEBOUNCE_MS);
  }, [moveSelection]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      moveSelection(1);
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      moveSelection(-1);
    }
  }, [moveSelection]);

  const handlePlanetClick = useCallback((planet, relativeOffset) => {
    if (relativeOffset === 0) return;

    const targetIndex = planets.findIndex((item) => item.id === planet.id);
    if (targetIndex < 0) return;

    currentIndexRef.current = targetIndex;
    lastHandledIdRef.current = planet.id;
    setRailOffsets((currentOffsets) => selectByOffset(
      currentOffsets,
      selectedPlanetId,
      planet.id,
      relativeOffset,
      planets.length,
    ));
    onSelect(planet.id);
  }, [onSelect, planets, selectedPlanetId]);

  return (
    <aside className="planet-rail-loop" aria-label="Selecione um planeta">
      <svg className="planet-rail-loop-arc" viewBox="0 0 120 520" aria-hidden="true" focusable="false">
        <path d="M 63 38 C 50 104, 45 196, 45 260 C 45 324, 50 416, 63 482" />
      </svg>
      <div
        ref={stageRef}
        className="planet-rail-loop-stage"
        role="listbox"
        tabIndex={0}
        aria-label="Planetas do Sistema Solar"
        aria-activedescendant={`planet-rail-loop-${selectedPlanetId}`}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
      >
        {planets.map((planet) => {
          const relativeIndex = railOffsets[planet.id] ?? 0;
          const selected = planet.id === selectedPlanetId;
          const distance = Math.abs(relativeIndex);
          const y = relativeIndex * 64;
          const normalizedY = Math.min(1, Math.abs(y) / 224);
          const curve = Math.sqrt(Math.max(0, 1 - normalizedY * normalizedY));
          const x = 45 + 36 * (1 - curve);
          const scale = selected ? 1.12 : Math.max(0.82, 0.98 - distance * 0.035);
          const opacity = selected ? 1 : Math.max(0.52, 0.82 - distance * 0.055);
          const selectorImageUrl = planet.selectorImageUrl || planet.imageUrl;

          return (
            <button
              key={planet.id}
              id={`planet-rail-loop-${planet.id}`}
              type="button"
              role="option"
              className={`planet-orb-loop ${selected ? 'is-selected' : ''} ${planet.id === 'saturno' ? 'is-saturn' : ''} ${planet.id === 'netuno' ? 'is-netuno' : ''}`}
              onClick={() => handlePlanetClick(planet, relativeIndex)}
              aria-label={`Explorar ${planet.name}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              style={{
                '--rail-loop-x': `${x}px`,
                '--rail-loop-y': `${y}px`,
                '--rail-loop-scale': scale,
                '--rail-loop-opacity': opacity,
                '--planet-glow': planet.glow,
              }}
            >
              <span className={`planet-orb-loop-image planet-image-${planet.id}`}>
                <img
                  src={selectorImageUrl}
                  alt=""
                  loading={selected ? 'eager' : 'lazy'}
                  fetchPriority={selected ? 'high' : 'auto'}
                  decoding="async"
                  width="58"
                  height="58"
                  onError={(event) => {
                    const target = event.currentTarget;
                    if (target.dataset.fallbackApplied) return;
                    if (planet.id === 'saturno') {
                      target.dataset.fallbackApplied = 'true';
                      target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Saturn_transparent.png/330px-Saturn_transparent.png';
                    } else if (planet.id === 'terra') {
                      target.dataset.fallbackApplied = 'true';
                      target.src = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Earth_Western_Hemisphere_transparent_background.png/250px-Earth_Western_Hemisphere_transparent_background.png';
                    }
                  }}
                />
              </span>
              <span className="planet-orb-loop-name">{planet.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export const PlanetRail = memo(PlanetRailView);
