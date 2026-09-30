import React, { useEffect, useMemo, useState } from 'react';
import PhenomenonIcon from './PhenomenonIcon.jsx';

const EVENTS = [
  {
    name: 'Superlua', type: 'super',
    description: 'Lua cheia que acontece próxima do perigeu, fazendo o disco aparente parecer um pouco maior e mais brilhante.',
    nextAt: '2026-11-24T14:54:00Z', nextLabel: '24 nov. 2026 · 14:54 UTC', secondaryLabel: 'Outra em 24 dez. 2026 · 01:28 UTC',
    sourceLabel: 'NASA — Supermoons', source: 'https://science.nasa.gov/moon/supermoons/',
  },
  {
    name: 'Microlua', type: 'micro',
    description: 'Lua cheia próxima do apogeu, quando a Lua está mais distante da Terra e seu disco aparente fica menor.',
    lastLabel: 'Última em 29 jun. 2026', sourceLabel: 'NASA — Supermoons', source: 'https://science.nasa.gov/moon/supermoons/',
  },
  {
    name: 'Eclipse lunar', type: 'blood',
    description: 'A sombra da Terra atravessa a Lua. Em eclipses totais, a Lua pode adquirir tons avermelhados por causa da luz filtrada pela atmosfera terrestre.',
    nextAt: '2027-02-20T23:12:00Z', nextLabel: '20 fev. 2027 · eclipse penumbral', secondaryLabel: 'Visível do Brasil',
    sourceLabel: 'NASA — Future Eclipses', source: 'https://science.nasa.gov/eclipses/future-eclipses/',
  },
  {
    name: 'Eclipse solar', type: 'solar',
    description: 'A Lua passa entre a Terra e o Sol e bloqueia parte ou toda a luz solar para observadores em determinadas regiões da Terra.',
    sourceLabel: 'NASA — Solar Eclipses', source: 'https://science.nasa.gov/eclipses/',
  },
  {
    name: 'Lua azul', type: 'blue',
    description: 'A segunda Lua cheia dentro de um mesmo mês do calendário. O nome não significa que a Lua fique azul.',
    lastLabel: 'Última em 31 mai. 2026', secondaryLabel: 'Próxima em dezembro de 2028',
    sourceLabel: 'NASA — Blue Moon', source: 'https://science.nasa.gov/solar-system/moon/everything-you-need-to-know-about-the-halloween-boo-moon/',
  },
];

function countdown(target, now) {
  if (!target) return null;
  const delta = new Date(target).getTime() - now;
  if (delta <= 0) return 'aconteceu';
  const minutes = Math.floor(delta / 60000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h ${minutes % 60}min`;
}

export default function MoonPhenomena({ selectedType, onSelect }) {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, [open]);

  const upcoming = useMemo(
    () => EVENTS.filter((event) => event.nextAt && new Date(event.nextAt).getTime() > now).map((event) => event.name),
    [now],
  );

  return (
    <section className="moon-phenomena" aria-label="Fenômenos lunares">
      <button
        className="moon-phenomena-toggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="moon-phenomena-content"
      >
        <span>Fenômenos lunares</span>
        <span>{open ? '−' : '+'}</span>
      </button>

      {open ? (
        <div id="moon-phenomena-content" className="moon-phenomena-panel">
          <div className="moon-phenomena-summary">
            <span>DESTAQUES DO CÉU</span>
            <strong>{upcoming.length} eventos futuros acompanhados</strong>
          </div>

          <div className="moon-phenomena-grid">
            {EVENTS.map((item) => {
              const remaining = countdown(item.nextAt, now);
              const isUpcoming = Boolean(item.nextAt && new Date(item.nextAt).getTime() > now);
              const isSelected = item.type === selectedType;

              return (
                <article key={item.name} className={`moon-phenomenon ${isUpcoming ? 'is-upcoming' : ''} ${isSelected ? 'is-selected' : ''}`}>
                  <button
                    type="button"
                    className="moon-phenomenon-select"
                    onClick={() => onSelect?.(isSelected ? null : item.type)}
                    aria-pressed={isSelected}
                    aria-label={`Visualizar ${item.name}`}
                    title={`Visualizar ${item.name}`}
                  >
                    <div className="moon-phenomenon-icon"><PhenomenonIcon type={item.type} /></div>
                    <div className="moon-phenomenon-select-copy">
                      <strong>{item.name}</strong>
                      <span>{isSelected ? 'visualização ativa' : 'visualizar fenômeno'}</span>
                    </div>
                  </button>

                  <div className="moon-phenomenon-copy">
                    <p>{item.description}</p>
                    {isUpcoming ? <span className="moon-phenomenon-badge">PRÓXIMO</span> : null}
                    {item.nextLabel ? <small className="moon-phenomenon-event">{item.nextLabel}</small> : null}
                    {remaining ? <small className="moon-phenomenon-countdown">{remaining}</small> : null}
                    {item.lastLabel ? <small>{item.lastLabel}</small> : null}
                    {item.secondaryLabel ? <small>{item.secondaryLabel}</small> : null}
                    <a href={item.source} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>{item.sourceLabel} ↗</a>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="moon-phenomena-note">
            Selecione um fenômeno para visualizar uma representação espacial. Perigeu e apogeu continuam detalhados acima, sem repetir seus cards aqui.
          </p>
        </div>
      ) : null}
    </section>
  );
}
