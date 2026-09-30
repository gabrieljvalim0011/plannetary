import React from 'react';
import NumberAdjuster from './NumberAdjuster.jsx';

export default function CalculatorCard({ title, description, icon, children }) {
  return (
    <article className="calculator-card">
      <div className="card-heading">
        <span className="card-icon" aria-hidden="true">{icon}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

export { NumberAdjuster };
