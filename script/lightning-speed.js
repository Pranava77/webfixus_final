import * as THREE from "three";

// Shared character texture (created once, reused by both instances)
let _sharedCharTexture = null;

function getCharTexture() {
  if (_sharedCharTexture) return _sharedCharTexture;

  const size = 1024;
  const grid = 8;
  const cellSize = size / grid;

  const offscreen = document.createElement("canvas");
  offscreen.width = size;
  offscreen.height = size;
  const ctx = offscreen.getContext("2d");

  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Larger, bolder font for symbols that aren't letterforms
  ctx.font = "bold " + (cellSize * 0.7) + "px serif";

  // 64 symbols: Elder Futhark runes, mathematical, arrows, and ancient glyphs
  const chars = [
    // Elder Futhark runes
    "ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ",
    "ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ",
    "ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ",
    // Mathematical & science symbols
    "∑","∞","∂","∫","∇","∆","∏","√",
    "π","φ","Ω","ψ","λ","μ","θ","α",
    "β","γ","δ","ε","ζ","η","ξ","ρ",
    // Arrows (directional energy)
    "↑","↓","⇑","⇓","⇒","⇐","⇔","⟶",
    // Ancient & mystical glyphs
    "⊕","⊗","⊙","⊘","◈","⟁","⌬","⎊",
  ];

  for (let i = 0; i < 64; i++) {
    const col = i % grid;
    const row = Math.floor(i / grid);
    const x = col * cellSize + cellSize / 2;
    const y = row * cellSize + cellSize / 2;
    ctx.fillText(chars[i], x, y);
  }

  _sharedCharTexture = new THREE.CanvasTexture(offscreen);
  _sharedCharTexture.minFilter = THREE.LinearFilter;
  _sharedCharTexture.magFilter = THREE.LinearFilter;
  return _sharedCharTexture;
}

// ─── Factory ────────────────────────────────────────────────────────────────
function createLightningInstance(canvas, options = {}) {
  const {
    instanceCount = 600,
    color = "#8fa18d",
    // progressRange: the scroll-progress window where the effect is active.
    // [activateAt, peakAt] – below activateAt nothing is shown
    progressRange = [0.4, 0.75],
    // If true, full-opacity ramp starts earlier (used for hero canvas)
    alwaysActive = false,
    fov = 60,
  } = options;

  const container = canvas.parentElement;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    fov,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,        // slightly cheaper – still looks great
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* Size the drawing buffer to the canvas's CSS box (which may be
     smaller than the parent container — e.g. hero canvas is CSS height:60%).
     Pass `false` so three.js does not write inline width/height styles
     that would override our CSS. */
  function applySize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w < 2 || h < 2) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  applySize();

  const gridSize = 8.0;
  const charTexture = getCharTexture();

  const material = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float charIndex;
      attribute float stretchY;
      attribute float customOpacity;

      varying vec2 vUv;
      varying float vOpacity;

      uniform float uGridSize;

      void main() {
        vUv = uv;

        float col = mod(charIndex, uGridSize);
        float row = floor(charIndex / uGridSize);

        vUv.x = (uv.x + col) / uGridSize;
        vUv.y = (uv.y + (uGridSize - 1.0 - row)) / uGridSize;

        vOpacity = customOpacity;

        vec3 localPos = position;
        localPos.y *= stretchY;

        vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(localPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform vec3 uColor;
      uniform float uGlobalOpacity;

      varying vec2 vUv;
      varying float vOpacity;

      void main() {
        vec4 texColor = texture2D(uTexture, vUv);
        float mask = texColor.a;
        if (mask < 0.05) discard;
        gl_FragColor = vec4(uColor, mask * vOpacity * uGlobalOpacity);
      }
    `,
    uniforms: {
      uTexture:       { value: charTexture },
      uColor:         { value: new THREE.Color(color) },
      uGlobalOpacity: { value: 0.0 },
      uGridSize:      { value: gridSize },
    },
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });

  const geometry = new THREE.PlaneGeometry(0.8, 0.8);
  const charIndices    = new Float32Array(instanceCount);
  const stretchesY     = new Float32Array(instanceCount);
  const customOpacities = new Float32Array(instanceCount);

  geometry.setAttribute("charIndex",    new THREE.InstancedBufferAttribute(charIndices, 1));
  geometry.setAttribute("stretchY",     new THREE.InstancedBufferAttribute(stretchesY, 1));
  geometry.setAttribute("customOpacity",new THREE.InstancedBufferAttribute(customOpacities, 1));

  const instancedMesh = new THREE.InstancedMesh(geometry, material, instanceCount);
  scene.add(instancedMesh);

  function getFrustumBounds(z) {
    const h = 2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * (camera.position.z - z);
    return { width: h * camera.aspect, height: h };
  }

  const characterData = [];

  function resetCharacter(i, isInitial = false) {
    const z = -Math.random() * 45;
    const bounds = getFrustumBounds(z);
    characterData[i] = {
      x: (Math.random() - 0.5) * bounds.width,
      y: isInitial
        ? (Math.random() - 0.5) * bounds.height
        : bounds.height / 2 + 2.0,
      z,
      speed: 0.5 + Math.random() * 2.0,
      charIndex: Math.floor(Math.random() * 64),
      opacity: 0.15 + Math.random() * 0.85,
      bounds,
    };
  }

  for (let i = 0; i < instanceCount; i++) resetCharacter(i, true);

  let scrollProgress = 0;
  let scrollVelocity = 0;
  let currentFallSpeed  = 2.0;
  let currentStretch    = 1.0;
  let currentOpacity    = 0.0;

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.1);

    const normVelocity = Math.min(Math.abs(scrollVelocity) / 2000.0, 3.5);

    // Speed & stretch
    const targetFallSpeed = 4.0 + normVelocity * 38.0;
    currentFallSpeed += (targetFallSpeed - currentFallSpeed) * 0.1;

    const targetStretch = 1.0 + normVelocity * 9.0;
    currentStretch += (targetStretch - currentStretch) * 0.1;

    // Opacity – determined by scroll progress window
    let progressFactor = 0;
    const [activateAt, peakAt] = progressRange;
    if (alwaysActive) {
      // Hero canvas: always ready, just scale with velocity
      progressFactor = 1.0;
    } else if (scrollProgress > activateAt) {
      progressFactor = Math.min(1.0, (scrollProgress - activateAt) / (peakAt - activateAt));
    }

    const targetOpacity = progressFactor * (0.05 + Math.min(1.0, normVelocity * 1.5) * 0.9);
    currentOpacity += (targetOpacity - currentOpacity) * 0.06;

    material.uniforms.uGlobalOpacity.value = currentOpacity;
    canvas.style.opacity = currentOpacity > 0.005 ? "1" : "0";

    // Update instances
    const attrChar    = instancedMesh.geometry.attributes.charIndex;
    const attrStretch = instancedMesh.geometry.attributes.stretchY;
    const attrOp      = instancedMesh.geometry.attributes.customOpacity;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < instanceCount; i++) {
      const c = characterData[i];
      c.y -= c.speed * currentFallSpeed * dt;

      if (c.y < -c.bounds.height / 2 - 2) resetCharacter(i, false);

      dummy.position.set(c.x, c.y, c.z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);

      attrChar.setX(i, c.charIndex);
      attrStretch.setX(i, currentStretch);
      attrOp.setX(i, c.opacity);
    }

    attrChar.needsUpdate    = true;
    attrStretch.needsUpdate = true;
    attrOp.needsUpdate      = true;
    instancedMesh.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);

    scrollVelocity += (0 - scrollVelocity) * 0.08;
  }

  animate();

  const onResize = () => applySize();

  window.addEventListener("resize", onResize);

  /* ResizeObserver catches mobile browser-chrome show/hide (which changes
     svh), orientation flips, and any layout reflow — window's resize event
     alone misses these on iOS/Android. */
  const ro = new ResizeObserver(onResize);
  ro.observe(canvas);

  return {
    update(progress, velocity) {
      scrollProgress = progress;
      scrollVelocity = velocity;
    },
    destroy() {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      renderer.dispose();
    },
  };
}

// ─── Initialise both instances ───────────────────────────────────────────────

// 1. Services-section cards canvas (flip-card open area)
const servicesCanvas = document.querySelector("#lightning-canvas");
if (servicesCanvas) {
  const servicesEffect = createLightningInstance(servicesCanvas, {
    instanceCount: 600,
    color: "#8fa18d",
    progressRange: [0.4, 0.75],
    alwaysActive: false,
  });

  window.lightningEffect = {
    update: (progress, velocity) => servicesEffect.update(progress, velocity),
  };
}

// 2. Hero-section canvas (lower half, behind hero cards)
const heroCanvas = document.querySelector("#hero-lightning-canvas");
if (heroCanvas) {
  const heroEffect = createLightningInstance(heroCanvas, {
    instanceCount: 350,       // fewer chars – more subtle
    color: "#99a799",         // slightly lighter sage
    progressRange: [0, 1],    // whole scroll range of hero
    alwaysActive: true,       // visibility purely driven by velocity
    fov: 55,
  });

  window.heroLightningEffect = {
    update: (progress, velocity) => heroEffect.update(progress, velocity),
  };
}
