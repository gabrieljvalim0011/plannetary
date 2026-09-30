import React from 'react';

export default function History({ history, onClear }) {
  return (
    <section className="history-section">
      <div className="history-top">
        <div>
          <span className="eyebrow">REGISTROS</span>
          <h2>Histórico de consultas</h2>
        </div>
        <button className="danger-button" type="button" onClick={onClear}>🗑️ Limpar</button>
      </div>
      <div className="history-list">
        {history.length === 0 ? (
          <p className="empty">Nenhuma consulta realizada ainda.</p>
        ) : (
          history.map((item, index) => <p key={`${item.date}-${index}`}>{item.text} <small>— {item.date}</small></p>)
        )}
      </div>
    </section>
  );
}
