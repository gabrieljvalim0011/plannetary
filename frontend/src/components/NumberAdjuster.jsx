import React from 'react';

export default function NumberAdjuster({ value, onChange, step = 1, min = 0, label }) {
  function change(direction) {
    const current = value === '' ? 0 : Number(value);
    const next = Math.max(min, current + (direction === 'up' ? step : -step));
    onChange(String(Number(next.toFixed(10))));
  }

  return (
    <div className="number-adjuster" aria-label={`Ajustar ${label}`}>
      <button type="button" onClick={() => change('up')} aria-label={`Aumentar ${label}`} title={`Aumentar ${label}`}>⌃</button>
      <button type="button" onClick={() => change('down')} aria-label={`Diminuir ${label}`} title={`Diminuir ${label}`}>⌄</button>
    </div>
  );
}
