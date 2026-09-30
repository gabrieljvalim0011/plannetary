import React, { memo, useMemo } from 'react';

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function Starfield() {
  const stars = useMemo(() => {
    const random = seeded(0x51a7f00d);
    return Array.from({ length: 80 }, (_, index) => ({
      id: index,
      x: (random() * 100).toFixed(2),
      y: (random() * 100).toFixed(2),
      size: (0.7 + random() * 1.7).toFixed(2),
      opacity: (0.34 + random() * 0.62).toFixed(2),
      twinkle: (3.4 + random() * 5.4).toFixed(2),
      delay: (-random() * 8).toFixed(2),
      cool: random() > 0.28,
      animated: index < 28,
    }));
  }, []);

  const glows = [
    { x: 11, y: 18, size: 24, opacity: 0.18 },
    { x: 77, y: 12, size: 34, opacity: 0.14 },
    { x: 88, y: 68, size: 28, opacity: 0.13 },
    { x: 26, y: 76, size: 30, opacity: 0.11 },
  ];

  return (
    <div className="starfield" aria-hidden="true">
      <div className="starfield-glow-layer">
        {glows.map((glow, index) => (
          <span
            key={`glow-${index}`}
            className="star-glow"
            style={{
              left: `${glow.x}%`,
              top: `${glow.y}%`,
              width: glow.size,
              height: glow.size,
              opacity: glow.opacity,
            }}
          />
        ))}
      </div>
      <div className="starfield-stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className={`star ${star.cool ? 'is-cool' : 'is-warm'} ${star.animated ? 'is-animated' : 'is-static'}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.twinkle}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(Starfield);
