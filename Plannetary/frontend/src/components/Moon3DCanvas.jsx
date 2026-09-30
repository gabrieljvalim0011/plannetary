import React, { useEffect, useRef, useState } from 'react';

const PHASE_ANGLES = {
  'phase-new': Math.PI,
  'phase-crescent': Math.PI * 0.75,
  'phase-quarter': Math.PI * 0.5,
  'phase-gibbous': Math.PI * 0.25,
  'phase-full': 0,
  'phase-waning-gibbous': -Math.PI * 0.25,
  'phase-waning-quarter': -Math.PI * 0.5,
  'phase-waning-crescent': -Math.PI * 0.75,
};

const PHASE_NAMES = {
  'phase-new': 'Lua nova',
  'phase-crescent': 'Lua crescente',
  'phase-quarter': 'Quarto crescente',
  'phase-gibbous': 'Gibosa crescente',
  'phase-full': 'Lua cheia',
  'phase-waning-gibbous': 'Gibosa minguante',
  'phase-waning-quarter': 'Quarto minguante',
  'phase-waning-crescent': 'Lua minguante',
};

function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const moonCanvasCache = new WeakMap();

function makeMoonTexture(THREE) {
  const cachedCanvas = moonCanvasCache.get(THREE);
  if (cachedCanvas) {
    const cachedTexture = new THREE.CanvasTexture(cachedCanvas);
    cachedTexture.colorSpace = THREE.SRGBColorSpace;
    cachedTexture.anisotropy = Math.min(2, 2);
    return cachedTexture;
  }
  const width = 768;
  const height = 384;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const rng = seeded(211);
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#a6a9ac');
  gradient.addColorStop(0.5, '#777b7f');
  gradient.addColorStop(1, '#5b5f64');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 300; i += 1) {
    const x = rng() * width;
    const y = rng() * height;
    const r = 0.8 + rng() * 9;
    ctx.fillStyle = `rgba(${45 + rng() * 20},${46 + rng() * 20},${49 + rng() * 20},${0.22 + rng() * 0.36})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    if (r > 4) {
      ctx.strokeStyle = 'rgba(242,244,246,.14)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  moonCanvasCache.set(THREE, canvas);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  return texture;
}

export default function Moon3DCanvas({ phase = 'phase-full', phenomenon = null, size = 'clamp(210px, 25vw, 350px)' }) {
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    async function boot() {
      const host = hostRef.current;
      if (!host) return;
      const THREE = await import('three');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
      if (cancelled || !host.isConnected) return;
      const canvas = document.createElement('canvas');
      host.replaceChildren(canvas);
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: width > 760, powerPreference: 'high-performance' });
      } catch {
        setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 650 ? 1 : 1.35));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      const scene = new THREE.Scene();
      const cameraFov = 28;
      const camera = new THREE.PerspectiveCamera(cameraFov, width / height, 0.1, 40);

      // Match the planetary 3D framing: start deliberately wide so the Moon
      // never competes with the information around the visual stage. The
      // closest zoom is calculated from the actual rendered effect radius, so
      // the sphere/corona stays entirely inside the viewport instead of being
      // cropped at the edges.
      const effectiveRadius = phenomenon === 'solar' ? 2.08 : phenomenon ? 1.58 : 1.42;
      const verticalHalfFov = THREE.MathUtils.degToRad(cameraFov / 2);
      const aspect = Math.max(0.35, width / Math.max(1, height));
      const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * aspect);
      const verticalFit = effectiveRadius / Math.tan(verticalHalfFov);
      const horizontalFit = effectiveRadius / Math.tan(horizontalHalfFov);
      const safeMinDistance = Math.max(verticalFit, horizontalFit) * 1.12;
      const initialDistance = Math.max(safeMinDistance + 3.2, safeMinDistance * 1.62);

      camera.position.set(0, 0.04, initialDistance);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.075;
      controls.enablePan = false;
      controls.minDistance = safeMinDistance;
      controls.maxDistance = Math.max(initialDistance + 5.5, safeMinDistance + 7.0);
      controls.rotateSpeed = 0.48;
      controls.zoomSpeed = 0.56;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;

      const moonTexture = makeMoonTexture(THREE);
      const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture, roughness: 1, metalness: 0, bumpMap: moonTexture, bumpScale: 0.035 });
      const moon = new THREE.Mesh(new THREE.SphereGeometry(1.42, 48, 36), moonMaterial);
      scene.add(moon);

      const ambient = new THREE.HemisphereLight(0x98a6c0, 0x02030a, 0.28);
      scene.add(ambient);
      const key = new THREE.DirectionalLight(0xffffff, phenomenon === 'blood' ? 1.9 : 3.2);
      const angle = PHASE_ANGLES[phase] ?? 0;
      key.position.set(Math.sin(angle) * 4.2, 1.0, Math.cos(angle) * 4.2);
      scene.add(key);

      let effectMesh = null;
      if (phenomenon === 'solar') {
        const corona = new THREE.Mesh(
          new THREE.RingGeometry(1.62, 2.08, 64),
          new THREE.MeshBasicMaterial({ color: 0xffd66d, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }),
        );
        corona.position.z = -0.02;
        scene.add(corona);
        effectMesh = corona;
      } else if (phenomenon === 'blood') {
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(1.52, 36, 24),
          new THREE.MeshBasicMaterial({ color: 0x8e2c2c, transparent: true, opacity: 0.17, side: THREE.BackSide, depthWrite: false }),
        );
        scene.add(halo);
        effectMesh = halo;
      } else if (phenomenon === 'blue') {
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(1.52, 36, 24),
          new THREE.MeshBasicMaterial({ color: 0x4d7ff0, transparent: true, opacity: 0.18, side: THREE.BackSide, depthWrite: false }),
        );
        scene.add(halo);
        effectMesh = halo;
      }

      const clock = new THREE.Clock();
      let raf = 0;
      let running = false;
      let visible = true;
      const render = () => {
        if (cancelled) { running = false; return; }
        if (!visible || document.visibilityState === 'hidden') { running = false; return; }
        const delta = Math.min(clock.getDelta(), 0.05);
        moon.rotation.y += delta * 0.09;
        if (effectMesh) effectMesh.rotation.z -= delta * 0.025;
        controls.update();
        renderer.render(scene, camera);
        raf = window.requestAnimationFrame(render);
      };
      const startRender = () => {
        if (running || cancelled || !visible || document.visibilityState === 'hidden') return;
        running = true;
        clock.start();
        renderer.render(scene, camera);
        raf = window.requestAnimationFrame(render);
      };
      const stopRender = () => {
        if (!running) return;
        running = false;
        window.cancelAnimationFrame(raf);
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startRender(); else stopRender();
      }, { threshold: 0.02 });
      observer.observe(host);
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') stopRender();
        else startRender();
      };
      document.addEventListener('visibilitychange', onVisibilityChange);
      startRender();

      const resize = () => {
        const nextWidth = Math.max(1, host.clientWidth);
        const nextHeight = Math.max(1, host.clientHeight);
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();

        const nextAspect = Math.max(0.35, nextWidth / nextHeight);
        const nextHorizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * nextAspect);
        const nextVerticalFit = effectiveRadius / Math.tan(verticalHalfFov);
        const nextHorizontalFit = effectiveRadius / Math.tan(nextHorizontalHalfFov);
        const nextSafeMinDistance = Math.max(nextVerticalFit, nextHorizontalFit) * 1.12;
        controls.minDistance = nextSafeMinDistance;
        if (controls.getDistance() < nextSafeMinDistance) {
          const direction = camera.position.clone().sub(controls.target).normalize();
          camera.position.copy(controls.target).add(direction.multiplyScalar(nextSafeMinDistance));
        }

        renderer.setSize(nextWidth, nextHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, nextWidth < 700 ? 1 : 1.35));
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      cleanup = () => {
        stopRender();
        observer.disconnect();
        document.removeEventListener('visibilitychange', onVisibilityChange);
        resizeObserver.disconnect();
        controls.dispose();
        moon.geometry.dispose();
        moonMaterial.dispose();
        moonTexture.dispose();
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose());
            else object.material.dispose();
          }
        });
        renderer.dispose();
        host.replaceChildren();
      };
    }

    boot().catch(() => setFailed(true));
    return () => { cancelled = true; cleanup(); };
  }, [phase, phenomenon]);

  const phaseName = PHASE_NAMES[phase] || PHASE_NAMES['phase-full'];
  return (
    <div ref={hostRef} className={`moon-3d-webgl ${failed ? 'is-fallback' : ''}`} style={{ '--moon-size': size }} role="img" aria-label={phenomenon ? `${phenomenon}: ${phaseName}` : phaseName}>
      {failed ? <div className={`moon-3d-fallback-sphere ${phase}`} aria-hidden="true" /> : null}
    </div>
  );
}
