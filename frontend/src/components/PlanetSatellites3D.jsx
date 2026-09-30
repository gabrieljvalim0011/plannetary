import React, { useEffect, useRef } from 'react';

function makeFallbackTexture(THREE, satellite) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const base = satellite.color || '#9da0a4';
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, base);
  grad.addColorStop(0.5, base);
  grad.addColorStop(1, '#303238');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let seed = satellite.name.length * 97 + satellite.orbit * 31;
  const rng = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const craterCount = satellite.irregular ? 30 : 44;
  for (let i = 0; i < craterCount; i += 1) {
    const x = rng() * canvas.width;
    const y = rng() * canvas.height;
    const r = 1 + rng() * 6;
    ctx.fillStyle = `rgba(20,22,25,${0.07 + rng() * 0.18})`;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.55 + rng() * 0.5), rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  if (satellite.icy) {
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = '#f2f5f6';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 6; i += 1) {
      ctx.beginPath();
      const y = rng() * canvas.height;
      ctx.moveTo(0, y);
      ctx.quadraticCurveTo(canvas.width * 0.35, y + (rng() - 0.5) * 20, canvas.width, y + (rng() - 0.5) * 20);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  return texture;
}

function irregularize(geometry, satellite) {
  if (!satellite.irregular) return;
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const scale = 0.91 + 0.16 * Math.sin(i * 12.9898 + satellite.name.length);
    position.setXYZ(i, x * scale, y * (0.9 + 0.08 * Math.cos(i)), z * (1.05 + 0.05 * Math.sin(i * 0.7)));
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
}

function configureTexture(THREE, texture, renderer) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
}

export default function PlanetSatellites3D({ planet, satellites = [], selectedId = null, onSelectMoon }) {
  const hostRef = useRef(null);
  const selectedRef = useRef(selectedId);
  const dragRef = useRef({ active: false, moved: false, pointerId: null, lastX: 0, lastY: 0 });

  useEffect(() => {
    selectedRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    async function boot() {
      const host = hostRef.current;
      if (!host || !satellites.length) return;
      const THREE = await import('three');
      if (cancelled || !host.isConnected) return;

      const canvas = document.createElement('canvas');
      host.replaceChildren(canvas);
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: width > 760, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 760 ? 1 : 1.15));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.95;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 30);
      camera.position.set(0, 4.45, 7.55);
      camera.lookAt(0, 0, 0);

      const root = new THREE.Group();
      root.rotation.x = THREE.MathUtils.degToRad(-5);
      root.rotation.y = THREE.MathUtils.degToRad(-12);
      scene.add(root);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 24),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(planet.accent || '#8d96a3'), roughness: 0.9, metalness: 0 }),
      );
      root.add(core);

      if (planet.id === 'saturno') {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.18, 1.74, 64, 1),
          new THREE.MeshBasicMaterial({ color: 0xbcae91, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false }),
        );
        ring.rotation.x = THREE.MathUtils.degToRad(68);
        root.add(ring);
      }

      const animated = [];
      satellites.forEach((satellite, index) => {
        const orbit = new THREE.Mesh(
          new THREE.RingGeometry(satellite.orbit - 0.006, satellite.orbit + 0.006, 64),
          new THREE.MeshBasicMaterial({ color: 0x8b9bb5, transparent: true, opacity: 0.13, side: THREE.DoubleSide, depthWrite: false }),
        );
        orbit.rotation.x = THREE.MathUtils.degToRad(68 + (index % 2) * 5);
        root.add(orbit);

        const pivot = new THREE.Group();
        root.add(pivot);
        const geometry = new THREE.SphereGeometry(satellite.radius, 16, 12);
        irregularize(geometry, satellite);
        const fallbackTexture = makeFallbackTexture(THREE, satellite);
        let activeTexture = fallbackTexture;
        const material = new THREE.MeshStandardMaterial({
          map: activeTexture,
          roughness: satellite.roughness ?? 0.94,
          metalness: 0,
          bumpMap: satellite.rocky ? activeTexture : undefined,
          bumpScale: satellite.rocky ? 0.014 : 0,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(satellite.orbit, 0, 0);
        mesh.userData.satelliteId = satellite.id;
        pivot.add(mesh);

        THREE.Cache.enabled = true;
        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin('anonymous');
        if (satellite.textureUrl) {
          textureLoader.load(satellite.textureUrl, (remoteTexture) => {
            if (cancelled) {
              remoteTexture.dispose();
              return;
            }
            configureTexture(THREE, remoteTexture, renderer);
            material.map = remoteTexture;
            material.bumpMap = satellite.rocky ? remoteTexture : undefined;
            material.bumpScale = satellite.rocky ? 0.014 : 0;
            material.needsUpdate = true;
            activeTexture.dispose();
            activeTexture = remoteTexture;
          }, undefined, () => {});
        }

        animated.push({ pivot, mesh, satellite, textureRef: () => activeTexture });
      });

      const ambient = new THREE.HemisphereLight(0x8ea8d0, 0x02030a, 0.45);
      scene.add(ambient);
      const key = new THREE.DirectionalLight(0xffffff, 2.5);
      key.position.set(-4.2, 3.8, 6.2);
      scene.add(key);
      const rim = new THREE.DirectionalLight(planet.accent || 0x7fa7ff, 0.55);
      rim.position.set(4, -2, -4);
      scene.add(rim);

      const clock = new THREE.Clock();
      let raf = 0;
      let running = false;
      let visible = true;
      const render = () => {
        if (cancelled) { running = false; return; }
        if (!visible || document.visibilityState === 'hidden') { running = false; return; }
        const delta = Math.min(clock.getDelta(), 0.05);
        animated.forEach(({ pivot, mesh, satellite }) => {
          pivot.rotation.y += delta * satellite.speed * 0.2;
          mesh.rotation.y += delta * 0.12;
          const selectedScale = selectedRef.current === satellite.id ? 1.24 : 1;
          if (mesh.scale.x !== selectedScale) mesh.scale.setScalar(selectedScale);
        });
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      const startRender = () => {
        if (running || cancelled || !visible || document.visibilityState === 'hidden') return;
        running = true;
        clock.start();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      const stopRender = () => {
        if (!running) return;
        running = false;
        cancelAnimationFrame(raf);
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

      const drag = dragRef.current;

      const onPointerDown = (event) => {
        if (event.button != null && event.button !== 0) return;
        drag.active = true;
        drag.moved = false;
        drag.pointerId = event.pointerId;
        drag.lastX = event.clientX;
        drag.lastY = event.clientY;
        canvas.setPointerCapture?.(event.pointerId);
        canvas.style.cursor = 'grabbing';
      };

      const onPointerMove = (event) => {
        if (!drag.active || drag.pointerId !== event.pointerId) return;
        const dx = event.clientX - drag.lastX;
        const dy = event.clientY - drag.lastY;
        drag.lastX = event.clientX;
        drag.lastY = event.clientY;

        if (Math.abs(dx) + Math.abs(dy) > 2) drag.moved = true;

        root.rotation.y += dx * 0.008;
        root.rotation.x = THREE.MathUtils.clamp(root.rotation.x + dy * 0.005, THREE.MathUtils.degToRad(-34), THREE.MathUtils.degToRad(26));
      };

      const onPointerUp = (event) => {
        if (drag.pointerId !== event.pointerId) return;

        const wasDragged = drag.moved;
        drag.active = false;
        drag.pointerId = null;
        canvas.style.cursor = 'grab';
        canvas.releasePointerCapture?.(event.pointerId);

        if (wasDragged) return;

        const rect = canvas.getBoundingClientRect();
        const pointer = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(animated.map((item) => item.mesh), false);
        if (hits[0]?.object?.userData?.satelliteId) onSelectMoon?.(hits[0].object.userData.satelliteId);
      };

      const onPointerCancel = (event) => {
        if (drag.pointerId !== event.pointerId) return;
        drag.active = false;
        drag.moved = false;
        drag.pointerId = null;
        canvas.style.cursor = 'grab';
      };

      canvas.addEventListener('pointerdown', onPointerDown);
      canvas.addEventListener('pointermove', onPointerMove);
      canvas.addEventListener('pointerup', onPointerUp);
      canvas.addEventListener('pointercancel', onPointerCancel);

      const resize = () => {
        const nextWidth = Math.max(1, host.clientWidth);
        const nextHeight = Math.max(1, host.clientHeight);
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(nextWidth, nextHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 760 ? 1 : 1.15));
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      cleanup = () => {
        stopRender();
        observer.disconnect();
        document.removeEventListener('visibilitychange', onVisibilityChange);
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerup', onPointerUp);
        canvas.removeEventListener('pointercancel', onPointerCancel);
        resizeObserver.disconnect();
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
            else object.material.dispose();
          }
        });
        animated.forEach(({ textureRef }) => textureRef()?.dispose());
        renderer.dispose();
        host.replaceChildren();
      };
    }

    boot().catch(() => {});
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [planet.accent, planet.id, satellites]);

  if (!satellites.length) return null;

  return <div ref={hostRef} className="planet-satellites-3d" role="img" aria-label={`Visualização 3D esquemática das luas de ${planet.name}`} />;
}
