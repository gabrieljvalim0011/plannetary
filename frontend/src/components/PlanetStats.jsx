import React, { memo } from 'react';

function Stat({ label, value }) {
  return (
    <div className="scene-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PlanetStats({ planet }) {
  return (
    <div className="scene-stats" aria-label={`Resumo de ${planet.name}`}>
      <Stat label="Temperatura média" value={planet.temperature.display} />
      <Stat label="Distância do Sol" value={planet.distanceFromSun.display} />
      <Stat label="Gravidade" value={`${planet.gravity.value} ${planet.gravity.unit}`} />
      <Stat label="Ano planetário" value={`${planet.orbitalPeriodEarthDays.toLocaleString('pt-BR')} dias`} />
    </div>
  );
}

export default memo(PlanetStats);
