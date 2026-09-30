import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard.jsx';
import NumberAdjuster from './NumberAdjuster.jsx';
import { planets } from '../data/planets.js';

const format = (value) => value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

export default function AgeCalculator({ onHistory }) {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  function calculate() {
    const input = Number(value);
    if (!Number.isFinite(input) || input <= 0 || value.trim() === '') {
      setError('Digite uma idade maior que zero.');
      return;
    }

    setError('');
    setResults(planets.map((planet) => ({ ...planet, result: input / planet.year })));
    onHistory(`Idade consultada: ${format(input)} anos`);
  }

  return (
    <CalculatorCard title="Sua idade" description="Veja quantos anos você teria em cada planeta." icon="🪐">
      <label htmlFor="age-input">Idade atual em anos</label>
      <div className="number-field">
        <input
          id="age-input"
          type="number"
          min="0"
          step="any"
          placeholder="Ex.: 19"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <NumberAdjuster value={value} onChange={setValue} step={1} label="idade" />
      </div>

      <button className="primary-button age-button" type="button" onClick={calculate}>Calcular idade</button>
      <p className="error" role="alert">{error}</p>
      <div className="results" aria-live="polite">
        {results.map((planet) => (
          <div className="result-row" key={planet.id}>
            <span>{planet.name}</span>
            <strong>{format(planet.result)} anos</strong>
          </div>
        ))}
      </div>
    </CalculatorCard>
  );
}
