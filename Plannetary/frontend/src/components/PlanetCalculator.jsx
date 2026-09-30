import React, { memo, useMemo, useState } from 'react';
import NumberAdjuster from './NumberAdjuster.jsx';

const LB = 2.20462;
const formatWeight = (value) => value.toLocaleString('pt-BR', { maximumFractionDigits: 1 });

const formatPlanetaryAge = (value) => {
  if (!Number.isFinite(value) || value < 0) return '—';

  const totalMonths = Math.round(value * 12);
  if (totalMonths === 0) return 'menos de 1 mês';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`);

  return parts.join(' e ');
};

function PlanetCalculator({ planet }) {
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [unit, setUnit] = useState('kg');

  const weightResult = useMemo(() => {
    const value = Number(weight);
    if (!Number.isFinite(value) || value <= 0) return null;
    const kg = unit === 'lb' ? value / LB : value;
    const resultKg = kg * (planet.gravity.value / 9.80665);
    return unit === 'lb' ? resultKg * LB : resultKg;
  }, [weight, unit, planet]);

  const ageResult = useMemo(() => {
    const value = Number(age);
    if (!Number.isFinite(value) || value <= 0) return null;
    return value * (365.25 / planet.orbitalPeriodEarthDays);
  }, [age, planet]);

  return (
    <section className="planet-calculator" aria-label={`Calculadoras para ${planet.name}`}>
      <div className="calc-pill-card">
        <h3>Seu peso {planet.name === 'Terra' ? 'na Terra' : `em ${planet.name}`}</h3>
        <div className="calc-inline">
          <div className="calc-input-wrap">
            <input type="number" min="0" step="any" value={weight} onChange={(e) => setWeight(e.target.value)} aria-label="Seu peso" autoComplete="off" inputMode="decimal" />
            <NumberAdjuster value={weight} onChange={setWeight} step={1} label="peso" />
          </div>
          <div className="unit-selector compact" role="group" aria-label="Unidade">
            <label><input type="radio" checked={unit === 'kg'} onChange={() => setUnit('kg')} /> kg</label>
            <label><input type="radio" checked={unit === 'lb'} onChange={() => setUnit('lb')} /> lb</label>
          </div>
          <div className="calc-result"><strong>{weightResult === null ? '—' : `${formatWeight(weightResult)} ${unit}`}</strong><span>na superfície</span></div>
        </div>
      </div>

      <div className="calc-pill-card age-card">
        <h3>Sua idade {planet.name === 'Terra' ? 'na Terra' : `em ${planet.name}`}</h3>
        <div className="calc-inline">
          <div className="calc-input-wrap">
            <input type="number" min="0" step="any" value={age} onChange={(e) => setAge(e.target.value)} aria-label="Sua idade" autoComplete="off" inputMode="numeric" />
            <NumberAdjuster value={age} onChange={setAge} step={1} label="idade" />
          </div>
          <div className="calc-result"><strong>{ageResult === null ? '—' : formatPlanetaryAge(ageResult)}</strong><span>{planet.name === 'Terra' ? 'no calendário da Terra' : `no calendário de ${planet.name}`}</span></div>
        </div>
      </div>
    </section>
  );
}

export default memo(PlanetCalculator);
