import React, { useEffect, useRef, useState } from 'react';

const DURATION_MS = 3100;
const FADE_MS = 650;
const PARTICLE_COUNT = 132;

function seeded(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function CosmicIntro() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!context) return undefined;

    let width = 0;
    let height = 0;
    let start = performance.now();
    const random = seeded(0xB16B00B5);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = random() * Math.PI * 2;
      const speed = 0.25 + Math.pow(random(), 1.7) * 1.65;
      const size = 0.45 + random() * 2.2;
      const cool = random() > 0.16;
      return {
        angle,
        speed,
        size,
        alpha: 0.24 + random() * 0.7,
        cool,
        offset: (random() - 0.5) * 0.18,
      };
    });

    const stars = Array.from({ length: 64 }, () => ({
      x: random(),
      y: random(),
      size: 0.35 + random() * 1.4,
      alpha: 0.1 + random() * 0.5,
    }));

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const t = reducedMotion ? 1 : progress;
      const expansion = easeOutCubic(Math.min(t / 0.78, 1));
      const fade = reducedMotion ? 1 : Math.max(0, 1 - Math.max(0, t - 0.72) / 0.28);
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.hypot(width, height) * 0.62;

      context.clearRect(0, 0, width, height);
      context.fillStyle = '#000109';
      context.fillRect(0, 0, width, height);

      const glowRadius = Math.max(32, 42 + expansion * Math.min(width, height) * 0.34);
      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
      glow.addColorStop(0, `rgba(245,250,255,${0.96 * fade})`);
      glow.addColorStop(0.06, `rgba(160,205,255,${0.94 * fade})`);
      glow.addColorStop(0.22, `rgba(72,132,255,${0.42 * fade})`);
      glow.addColorStop(0.58, `rgba(36,73,170,${0.10 * fade})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = glow;
      context.fillRect(cx - glowRadius, cy - glowRadius, glowRadius * 2, glowRadius * 2);

      if (!reducedMotion) {
        const ringRadius = Math.max(24, expansion * maxRadius * 0.72);
        const ringAlpha = (1 - Math.min(progress / 0.88, 1)) * 0.34;
        context.beginPath();
        context.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(130,190,255,${ringAlpha})`;
        context.lineWidth = Math.max(1, Math.min(3, width / 650));
        context.stroke();
      }

      const burstScale = 4 + expansion * Math.min(width, height) * 0.62;
      particles.forEach((particle) => {
        const radial = Math.max(0, burstScale * particle.speed);
        const wobble = Math.sin((progress * 5) + particle.offset * 20) * (1 + expansion * 2);
        const x = cx + Math.cos(particle.angle) * radial + Math.cos(particle.angle + Math.PI / 2) * wobble;
        const y = cy + Math.sin(particle.angle) * radial + Math.sin(particle.angle + Math.PI / 2) * wobble;
        const particleFade = Math.max(0, 1 - (radial / (maxRadius * 1.05)));
        const alpha = particle.alpha * particleFade * fade;
        if (alpha <= 0) return;
        context.beginPath();
        context.arc(x, y, particle.size * (0.65 + expansion * 0.8), 0, Math.PI * 2);
        context.fillStyle = particle.cool
          ? `rgba(123,184,255,${alpha})`
          : `rgba(241,248,255,${alpha})`;
        context.fill();
      });

      const starFade = Math.max(0, (progress - 0.4) / 0.45);
      if (starFade > 0) {
        stars.forEach((star) => {
          context.beginPath();
          context.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
          context.fillStyle = `rgba(132,185,255,${star.alpha * starFade * 0.7})`;
          context.fill();
        });
      }

      if (!reducedMotion && progress < 1) {
        frameRef.current = requestAnimationFrame(draw);
      }
    }

    resize();
    draw(performance.now());
    window.addEventListener('resize', resize);

    const finishTimer = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => setVisible(false), FADE_MS);
    }, DURATION_MS - (reducedMotion ? 120 : 0));

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.clearTimeout(finishTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`cosmic-intro ${exiting ? 'is-exiting' : ''}`} aria-label="Abrindo o Plannetary">
      <canvas ref={canvasRef} className="cosmic-intro-canvas" aria-hidden="true" />
      <div className="cosmic-intro-brand">
        <span className="cosmic-intro-brand-name">PLANNETARY</span>
        <span className="cosmic-intro-brand-line" />
        <span className="cosmic-intro-brand-subtitle">EXPLORE THE SOLAR SYSTEM</span>
      </div>
    </div>
  );
}
