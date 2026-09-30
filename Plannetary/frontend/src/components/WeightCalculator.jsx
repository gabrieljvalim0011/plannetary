import React, { useEffect, useState } from 'react';
import CalculatorCard from './CalculatorCard.jsx';
import NumberAdjuster from './NumberAdjuster.jsx';
import { planets } from '../data/planets.js';

const LB = 2.20462;
const format = (value) => value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

export default function WeightCalculator({ onHistory }) {
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('kg');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const calculate = ({ register = true } = {}) => {
    const input = Number(value);
    if (!Number.isFinite(input) || input <= 0 || value.trim() === '') {
      setError('Digite um peso maior que zero.');
      return false;
    }

    setError('');
    const kilograms = unit === 'lb' ? input / LB : input;
    const outputFactor = unit === 'lb' ? LB : 1;
    setResults(planets.map((planet) => ({
      ...planet,
      result: kilograms * planet.gravity * outputFactor,
    })));

    if (register) onHistory(`Peso consultado: ${format(input)} ${unit.toUpperCase()}`);
    return true;
  };

  useEffect(() => {
    if (value !== '') calculate({ register: false });
  }, [unit]);

  return (
    <CalculatorCard title="Seu peso" description="Compare seu peso em outros planetas." icon="⚖️">
      <label htmlFor="weight-input">Peso atual</label>
      <div className="number-field">
        <input
          id="weight-input"
          type="number"
          min="0"
          step="any"
          placeholder="Ex.: 70"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <NumberAdjuster value={value} onChange={setValue} step={1} label="peso" />
      </div>

      <div className="unit-selector" role="group" aria-label="Unidade de peso">
        <label><input type="radio" checked={unit === 'kg'} onChange={() => setUnit('kg')} /> kg</label>
        <label><input type="radio" checked={unit === 'lb'} onChange={() => setUnit('lb')} /> lb</label>
      </div>

      <button className="primary-button" type="button" onClick={() => calculate()}>Calcular peso</button>
      <p className="error" role="alert">{error}</p>
      <div className="results" aria-live="polite">
        {results.map((planet) => (
          <div className="result-row" key={planet.id}>
            <span>{planet.name}</span>
            <strong>{format(planet.result)} {unit}</strong>
          </div>
        ))}
      </div>
    </CalculatorCard>
  );
}
