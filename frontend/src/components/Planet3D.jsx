import React, { useEffect, useRef, useState } from 'react';

const PLANET_VISUALS = {
  mercurio: { base: '#9c9992', atmosphere: false, rotation: 0.16, roughness: 0.96, bump: 0.07, axialTilt: 2 },
  venus: { base: '#c9ad79', atmosphere: true, atmosphereColor: '#d7a96f', atmosphereIntensity: 0.22, rotation: 0.28, roughness: 0.93, axialTilt: 177.4 },
  terra: { base: '#4d78b8', atmosphere: true, atmosphereColor: '#6eb3ff', atmosphereIntensity: 0.17, rotation: 0.22, roughness: 0.72, axialTilt: 23.4 },
  marte: { base: '#b45e3d', atmosphere: true, atmosphereColor: '#d07b59', atmosphereIntensity: 0.09, rotation: 0.19, roughness: 0.94, bump: 0.06, axialTilt: 25.2 },
  jupiter: { base: '#c9a47c', rotation: 0.38, roughness: 0.84, axialTilt: 3.1 },
  saturno: { base: '#cdbd98', rings: true, rotation: 0.31, roughness: 0.86, axialTilt: 26.7 },
  urano: { base: '#7cbaca', atmosphere: true, atmosphereColor: '#72d5e5', atmosphereIntensity: 0.18, rotation: 0.28, roughness: 0.8, axialTilt: 97.8 },
  netuno: { base: '#3d65bc', atmosphere: true, atmosphereColor: '#4f82e9', atmosphereIntensity: 0.19, rotation: 0.2, roughness: 0.82, axialTilt: 28.3 },
};


const PLANET_3D_TEXTURES = {
  mercurio: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/mercury/preview.webp?w=1024',
  venus: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/venus/preview.webp?w=1024',
  // Earth uses the equirectangular atmosphere/true-color texture from the Three.js planet set;
  // the other planetary textures in this map are served by NASA Science assets.
  terra: 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg',
  marte: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/mars/preview.webp?w=1024',
  jupiter: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/jupiter/preview.webp?w=1024',
  saturno: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/saturn/preview.webp?w=1024',
  urano: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/uranus/preview.webp?w=1024',
  netuno: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/3d/resources/image/neptune/preview.webp?w=1024',
};


const fallbackCanvasCache = new Map();

const seedById = {
  mercurio: 17,
  venus: 29,
  terra: 41,
  marte: 53,
  jupiter: 71,
  saturno: 83,
  urano: 97,
  netuno: 113,
};

function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  const normalized = value.length === 3 ? value.split('').map((v) => v + v).join('') : value;
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function shade(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const mix = amount >= 0 ? 255 : 0;
  const p = Math.abs(amount);
  return `rgb(${Math.round(r + (mix - r) * p)}, ${Math.round(g + (mix - g) * p)}, ${Math.round(b + (mix - b) * p)})`;
}

function drawNoise(ctx, width, height, rng, amount = 16, tint = null) {
  const image = ctx.createImageData(width, height);
  const data = image.data;
  const tintRgb = tint ? hexToRgb(tint) : null;
  for (let i = 0; i < data.length; i += 4) {
    const n = (rng() - 0.5) * amount;
    data[i] = tintRgb ? Math.max(0, Math.min(255, tintRgb.r + n)) : Math.max(0, Math.min(255, 128 + n));
    data[i + 1] = tintRgb ? Math.max(0, Math.min(255, tintRgb.g + n)) : Math.max(0, Math.min(255, 128 + n));
    data[i + 2] = tintRgb ? Math.max(0, Math.min(255, tintRgb.b + n)) : Math.max(0, Math.min(255, 128 + n));
    data[i + 3] = 255;
  }
  ctx.globalAlpha = 0.1;
  ctx.globalCompositeOperation = 'soft-light';
  ctx.putImageData(image, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
}

function drawTerrestrialTexture(id) {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const rng = seeded(seedById[id] || 31);
  const visual = PLANET_VISUALS[id];
  const base = visual.base;

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, shade(base, 0.18));
  gradient.addColorStop(0.48, base);
  gradient.addColorStop(1, shade(base, -0.18));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  if (id === 'terra') {
    ctx.fillStyle = '#24543d';
    for (let i = 0; i < 32; i += 1) {
      const x = rng() * width;
      const y = 26 + rng() * (height - 52);
      const rx = 9 + rng() * 30;
      const ry = 4 + rng() * 15;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, rng() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
      if (rng() > 0.55) {
        ctx.beginPath();
        ctx.ellipse(x + rx * 0.6, y + ry * 0.4, rx * 0.45, ry * 0.65, rng() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = '#f2f7ff';
    ctx.lineWidth = 3;
    for (let y = 24; y < height; y += 42) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 16) {
        const cloudY = y + Math.sin(x * 0.03 + y) * 7;
        if (x === 0) ctx.moveTo(x, cloudY);
        else ctx.lineTo(x, cloudY);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  } else if (id === 'marte' || id === 'mercurio') {
    const craterColor = id === 'marte' ? 'rgba(70,31,22,.36)' : 'rgba(52,50,47,.44)';
    ctx.fillStyle = craterColor;
    for (let i = 0; i < 130; i += 1) {
      const x = rng() * width;
      const y = rng() * height;
      const r = 0.7 + rng() * 7;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.42;
      ctx.strokeStyle = 'rgba(255,255,255,.18)';
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    if (id === 'marte') {
      const cap = ctx.createLinearGradient(0, 0, 0, 38);
      cap.addColorStop(0, 'rgba(245,236,225,.9)');
      cap.addColorStop(1, 'rgba(245,236,225,0)');
      ctx.fillStyle = cap;
      ctx.fillRect(0, 0, width, 28);
    }
  } else if (id === 'venus') {
    for (let i = 0; i < 15; i += 1) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,236,184,${0.09 + rng() * 0.12})`;
      ctx.lineWidth = 5 + rng() * 13;
      const y = rng() * height;
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(width * 0.25, y - 26, width * 0.6, y + 28, width, y + 8);
      ctx.stroke();
    }
  }

  drawNoise(ctx, width, height, rng, 22, base);
  return canvas;
}

function drawGasTexture(id) {
  const width = 768;
  const height = 384;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const rng = seeded(seedById[id] || 101);
  const visual = PLANET_VISUALS[id];

  const bands = id === 'jupiter' ? 16 : id === 'saturno' ? 12 : 8;
  for (let i = 0; i < bands; i += 1) {
    const y = (i / bands) * height;
    const bandHeight = height / bands + 4;
    const t = i / Math.max(1, bands - 1);
    const light = id === 'jupiter'
      ? (i % 2 === 0 ? 0.13 : -0.05)
      : id === 'saturno'
        ? (i % 2 === 0 ? 0.10 : -0.04)
        : 0.05 * Math.sin(t * Math.PI * 2);
    ctx.fillStyle = shade(visual.base, light);
    ctx.fillRect(0, y, width, bandHeight);
    ctx.globalAlpha = 0.26;
    ctx.strokeStyle = id === 'jupiter' ? 'rgba(94,67,45,.75)' : 'rgba(255,255,255,.3)';
    ctx.lineWidth = 2 + rng() * 4;
    for (let x = -40; x < width + 40; x += 38) {
      ctx.beginPath();
      ctx.moveTo(x, y + bandHeight * 0.48);
      ctx.quadraticCurveTo(x + 18, y + bandHeight * 0.32 + Math.sin(i + x) * 3, x + 42, y + bandHeight * 0.55);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  if (id === 'jupiter') {
    ctx.fillStyle = '#b56548';
    ctx.globalAlpha = 0.88;
    ctx.beginPath();
    ctx.ellipse(width * 0.69, height * 0.60, 54, 30, -0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.28;
    ctx.strokeStyle = '#edbda0';
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  if (id === 'saturno') {
    ctx.fillStyle = 'rgba(255,255,255,.24)';
    for (let i = 0; i < 18; i += 1) {
      ctx.beginPath();
      ctx.ellipse(rng() * width, rng() * height, 14 + rng() * 30, 3 + rng() * 7, rng() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  drawNoise(ctx, width, height, rng, 15, visual.base);
  return canvas;
}

function drawTexture(id) {
  if (fallbackCanvasCache.has(id)) return fallbackCanvasCache.get(id);
  const canvas = id === 'jupiter' || id === 'saturno' || id === 'urano' || id === 'netuno'
    ? drawGasTexture(id)
    : drawTerrestrialTexture(id);
  fallbackCanvasCache.set(id, canvas);
  return canvas;
}

function createRenderer(THREE, canvas, width, height) {
  const mobile = width < 700;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !mobile && width >= 760,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.35));
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  return renderer;
}

function makeSaturnRingMaterial(THREE, innerRadius, outerRadius, tone, opacity, seed = 1) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uInner: { value: innerRadius },
      uOuter: { value: outerRadius },
      uTone: { value: new THREE.Color(tone) },
      uOpacity: { value: opacity },
      uSeed: { value: seed },
    },
    vertexShader: `
      varying vec3 vRingPosition;
      void main() {
        vRingPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vRingPosition;
      uniform float uInner;
      uniform float uOuter;
      uniform vec3 uTone;
      uniform float uOpacity;
      uniform float uSeed;

      float hash(float n) {
        return fract(sin(n * 12.9898 + uSeed * 78.233) * 43758.5453);
      }

      float smoothBand(float value, float center, float width) {
        float d = abs(value - center);
        return 1.0 - smoothstep(width, width * 1.85, d);
      }

      void main() {
        float radius = length(vRingPosition.xy);
        float angle = atan(vRingPosition.y, vRingPosition.x);
        float t = clamp((radius - uInner) / max(0.0001, uOuter - uInner), 0.0, 1.0);

        // Layered granular structure: broad density + very fine particle-scale variation.
        float broad = 0.84
          + 0.10 * sin(t * 31.0 + uSeed)
          + 0.045 * sin(t * 71.0 - uSeed * 1.4);
        float fine = 0.70
          + 0.14 * sin(t * 245.0 + uSeed * 1.3)
          + 0.085 * sin(t * 615.0 - uSeed * 2.2)
          + 0.045 * sin(t * 1120.0 + angle * 12.0);

        // Faint azimuthal streaking breaks the mathematically perfect look of a procedural disk.
        float streak = 0.965 + 0.035 * sin(angle * 180.0 + t * 95.0 + uSeed * 6.0);
        float grains = mix(0.82, 1.0, hash(floor(t * 880.0) + floor((angle + 3.14159) * 36.0)));

        // Major density structures: Cassini Division plus smaller Encke/Keeler-like gaps.
        float cassini = 1.0 - 0.965 * smoothBand(t, 0.535, 0.014);
        float encke = 1.0 - 0.62 * smoothBand(t, 0.845, 0.0055);
        float keeler = 1.0 - 0.34 * smoothBand(t, 0.885, 0.0035);
        float innerGap = 1.0 - 0.34 * smoothBand(t, 0.13, 0.006);
        float edgeFade = smoothstep(0.018, 0.085, t) * (1.0 - smoothstep(0.955, 1.0, t));

        float alpha = uOpacity * broad * fine * streak * grains * cassini * encke * keeler * innerGap * edgeFade;
        vec3 color = uTone * (0.88 + 0.16 * broad + 0.06 * fine);
        color += vec3(0.045, 0.035, 0.02) * (1.0 - broad);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    depthTest: true,
    toneMapped: true,
  });
}


function createPlanetAtmosphereMaterial(THREE, color, intensity = 0.14) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
    },
    vertexShader: `
      varying float vFresnel;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
        vec3 viewDirection = normalize(cameraPosition - worldPosition.xyz);
        vFresnel = pow(1.0 - abs(dot(worldNormal, viewDirection)), 2.6);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying float vFresnel;
      void main() {
        float edge = smoothstep(0.04, 0.92, vFresnel);
        float alpha = edge * uIntensity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: true,
  });
}

function createSaturnRings(THREE) {
  const ringGroup = new THREE.Group();
  ringGroup.rotation.x = THREE.MathUtils.degToRad(66);

  // Multiple narrow annuli create the layered appearance of the A/B/C rings
  // without requiring a large external texture asset.
  const layers = [
    // C ring — darker and more translucent.
    [1.49, 1.61, '#736956', 0.30, 1.2],
    // B ring — the densest, brightest portion of the system.
    [1.62, 1.88, '#d4c8ab', 0.76, 2.1],
    [1.89, 1.99, '#b7a98c', 0.56, 2.7],
    // A ring — slightly cooler and more transparent.
    [2.01, 2.19, '#cbbd9f', 0.66, 3.4],
    [2.20, 2.38, '#d6c9ab', 0.60, 4.0],
    [2.40, 2.53, '#aa9c80', 0.42, 4.7],
  ];

  layers.forEach(([inner, outer, tone, opacity, seed]) => {
    const geometry = new THREE.RingGeometry(inner, outer, 128, 4);
    const material = makeSaturnRingMaterial(THREE, inner, outer, tone, opacity, seed);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = 2;
    ringGroup.add(mesh);
  });

  // A very thin F-ring-like accent gives the silhouette a cleaner, more detailed edge.
  const fRing = new THREE.Mesh(
    new THREE.RingGeometry(2.54, 2.575, 160, 1),
    new THREE.MeshBasicMaterial({
      color: 0xd9ccb0,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  fRing.renderOrder = 2;
  ringGroup.add(fRing);

  // Soft inner shadow keeps the ring system visually anchored to Saturn.
  const innerShadow = new THREE.Mesh(
    new THREE.RingGeometry(1.43, 1.56, 160, 1),
    new THREE.MeshBasicMaterial({
      color: 0x1a1712,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  innerShadow.renderOrder = 3;
  ringGroup.add(innerShadow);

  return ringGroup;
}

function Planet3D({ planet, className = '', label = 'Modelo 3D interativo', compact = false }) {
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    async function boot() {
      if (!hostRef.current) return;
      const THREE = await import('three');
      const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');
      if (cancelled || !hostRef.current) return;

      const host = hostRef.current;
      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      host.replaceChildren(canvas);

      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      let renderer;
      try {
        renderer = createRenderer(THREE, canvas, width, height);
      } catch {
        setFailed(true);
        return;
      }

      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const cameraFov = compact ? 31 : 32;
      const camera = new THREE.PerspectiveCamera(cameraFov, width / height, 0.1, 40);

      const visual = PLANET_VISUALS[planet.id] || PLANET_VISUALS.terra;
      // Keep every initial view deliberately wide. Zooming in is constrained by
      // the actual rendered radius so the body stays inside the frame instead
      // of growing through the canvas edges.
      const effectiveRadius = visual.rings ? 2.18 : 1.42;
      const verticalHalfFov = THREE.MathUtils.degToRad(cameraFov / 2);
      const aspect = Math.max(0.35, width / Math.max(1, height));
      const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * aspect);
      const verticalFit = effectiveRadius / Math.tan(verticalHalfFov);
      const horizontalFit = effectiveRadius / Math.tan(horizontalHalfFov);
      const safeMinDistance = Math.max(verticalFit, horizontalFit) * 1.12;
      const initialDistance = Math.max(safeMinDistance + (compact ? 3.4 : 4.6), safeMinDistance * 1.78);

      camera.position.set(0, 0.06, initialDistance);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.075;
      controls.enablePan = false;
      controls.minDistance = safeMinDistance;
      controls.maxDistance = Math.max(initialDistance + 6.5, safeMinDistance + 8.5);
      controls.rotateSpeed = 0.5;
      controls.zoomSpeed = 0.58;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.42;
      const fallbackCanvas = drawTexture(planet.id);
      const fallbackTexture = new THREE.CanvasTexture(fallbackCanvas);
      fallbackTexture.colorSpace = THREE.SRGBColorSpace;
      fallbackTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 2);
      let activeTexture = fallbackTexture;

      const geometry = new THREE.SphereGeometry(1.42, compact ? 56 : 72, compact ? 38 : 48);
      // Earth uses a diffuse/rough surface response instead of the previous glossy
      // physical-plastic look. The NASA true-color equirectangular map carries the
      // continent/ocean detail; lighting now supplies the spherical shading.
      const MaterialClass = THREE.MeshStandardMaterial;
      const material = new MaterialClass({
        map: activeTexture,
        // Keep the NASA true-color Earth map untinted; applying a blue base color
        // multiplied the texture and washed out the continents in the 3D material.
        color: 0xffffff,
        roughness: planet.id === 'terra' ? 0.82 : visual.roughness,
        metalness: 0,
        bumpMap: visual.bump ? activeTexture : undefined,
        bumpScale: visual.bump ? Math.min(visual.bump, 0.05) : 0,
      });

      THREE.Cache.enabled = true;
      const textureLoader = new THREE.TextureLoader();
      textureLoader.setCrossOrigin('anonymous');
      const textureUrl = PLANET_3D_TEXTURES[planet.id];
      if (textureUrl) {
        textureLoader.load(textureUrl, (remoteTexture) => {
          if (cancelled) {
            remoteTexture.dispose();
            return;
          }
          remoteTexture.colorSpace = THREE.SRGBColorSpace;
          remoteTexture.wrapS = THREE.RepeatWrapping;
          remoteTexture.wrapT = THREE.ClampToEdgeWrapping;
          remoteTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 3);
          material.map = remoteTexture;
          material.bumpMap = visual.bump ? remoteTexture : undefined;
          material.bumpScale = visual.bump ? Math.min(visual.bump, 0.05) : 0;
          material.needsUpdate = true;
          activeTexture.dispose();
          activeTexture = remoteTexture;
        }, undefined, () => {});
      }

      // The selected Earth atmosphere texture already carries the global surface/cloud detail.
      const planetMesh = new THREE.Mesh(geometry, material);
      planetMesh.rotation.z = THREE.MathUtils.degToRad(visual.axialTilt || 0);
      if (planet.id === 'venus') planetMesh.rotation.z = THREE.MathUtils.degToRad(177.4);
      scene.add(planetMesh);

      if (visual.rings) {
        planetMesh.add(createSaturnRings(THREE));
      }

      if (visual.atmosphere) {
        const atmosphereGeo = new THREE.SphereGeometry(1.515, compact ? 42 : 56, compact ? 28 : 36);
        const atmosphereMat = createPlanetAtmosphereMaterial(
          THREE,
          visual.atmosphereColor,
          visual.atmosphereIntensity ?? 0.14,
        );
        planetMesh.add(new THREE.Mesh(atmosphereGeo, atmosphereMat));
      }

      // A Blue Marble diffuse map already contains the global cloud cover.
      // A second procedural cloud sphere created visible streak/triangle artifacts
      // over the Earth, so the extra layer is intentionally disabled.

      const isEarth = planet.id === 'terra';
      const ambient = new THREE.HemisphereLight(0xb8caff, 0x07101d, isEarth ? 1.05 : 0.72);
      scene.add(ambient);

      // Put the main light slightly above and toward the viewer so Earth's
      // continents remain readable instead of leaving most of the globe in shadow.
      const key = new THREE.DirectionalLight(0xffffff, isEarth ? 3.45 : 2.8);
      key.position.set(-2.2, 2.8, 5.6);
      scene.add(key);

      const fill = new THREE.DirectionalLight(0x89aaff, isEarth ? 1.05 : 0.42);
      fill.position.set(4.8, 0.6, 3.2);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(planet.accent ? new THREE.Color(planet.accent) : 0x7da6ff, isEarth ? 0.48 : 0.72);
      rim.position.set(4.2, -1.4, -3.2);
      scene.add(rim);

      const clock = new THREE.Clock();
      let raf = 0;
      let running = false;
      let visible = true;
      const render = () => {
        if (cancelled) {
          running = false;
          return;
        }
        if (!visible || document.visibilityState === 'hidden') {
          running = false;
          return;
        }
        const delta = Math.min(clock.getDelta(), 0.05);
        planetMesh.rotation.y += delta * visual.rotation * 0.38;
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
        if (visible) startRender();
        else stopRender();
      }, { threshold: 0.02 });
      observer.observe(host);
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') stopRender();
        else startRender();
      };
      document.addEventListener('visibilitychange', onVisibilityChange);
      startRender();

      const resize = () => {
        if (!host.isConnected) return;
        const nextWidth = Math.max(1, host.clientWidth);
        const nextHeight = Math.max(1, host.clientHeight);
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        const nextAspect = Math.max(0.35, nextWidth / nextHeight);
        const nextVerticalFit = effectiveRadius / Math.tan(verticalHalfFov);
        const nextHorizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * nextAspect);
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
        geometry.dispose();
        material.dispose();
        activeTexture.dispose();
        scene.traverse((object) => {
          if (object.geometry && object.geometry !== geometry) object.geometry.dispose();
          if (object.material && object.material !== material) {
            if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose());
            else object.material.dispose();
          }
        });
        renderer.dispose();
        host.replaceChildren();
      };
    }

    boot().catch(() => setFailed(true));
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [compact, planet.id, planet.accent, planet.glow, planet.imageUrl]);

  return (
    <div
      ref={hostRef}
      className={`planet-3d-stage ${className}`}
      role="img"
      aria-label={`${label}: ${planet.name}`}
    >
      {failed ? (
        <img className="planet-3d-fallback" src={planet.imageUrl} alt={`${planet.name} — imagem de referência`} decoding="async" />
      ) : null}
      <span className="planet-3d-hint">Arraste para girar</span>
    </div>
  );
}

export default Planet3D;
