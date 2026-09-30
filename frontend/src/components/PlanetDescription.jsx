import React, { memo } from 'react';

function PlanetDescription({ planet, open, onClose }) {
  if (!open) return null;
  return (
    <aside className="details-panel" role="dialog" aria-label={`Detalhes de ${planet.name}`}>
      <div className="details-panel-header">
        <div>
          <span className="planet-position">FICHA DE EXPLORAÇÃO</span>
          <h2>{planet.name}</h2>
        </div>
        <div className="details-panel-actions"><span className="details-type">{planet.type}</span></div>
      </div>
      <p>{planet.description}</p>
      <div className="details-columns">
        <div><span>Rotação</span><strong>{planet.rotationPeriodHours.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} h</strong></div>
        <div><span>Órbita</span><strong>{planet.orbitalPeriodEarthDays.toLocaleString('pt-BR')} dias</strong></div>
        <div><span>Distância</span><strong>{planet.distanceFromSun.display}</strong></div>
        <div><span>Gravidade</span><strong>{planet.gravity.value} {planet.gravity.unit}</strong></div>
      </div>
      <a className="source-link" href={planet.factSource} target="_blank" rel="noreferrer">Abrir fonte científica ↗</a>
    </aside>
  );
}

export default memo(PlanetDescription);
