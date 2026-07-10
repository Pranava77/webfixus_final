import * as THREE from "three";

/* Fluid metaballs shader that follows the mouse. Rendered inside a canvas
   layered behind the footer content; fades in on hover, out on leave. */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_hover;

  float sdCircle(vec2 p, float r) { return length(p) - r; }

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float droplets(vec2 p, vec2 m, float t) {
    /* Small glass droplets tightly clustered around the cursor */
    vec2 b1 = m + vec2(cos(t) * 0.06, sin(t * 1.3) * 0.05);
    vec2 b2 = m + vec2(cos(t * 1.4 + 2.0) * 0.07, sin(t) * 0.06);
    vec2 b3 = m + vec2(sin(t * 0.9) * 0.055, cos(t * 1.1) * 0.065);
    float d = sdCircle(p - b1, 0.045);
    d = smin(d, sdCircle(p - b2, 0.038), 0.05);
    d = smin(d, sdCircle(p - b3, 0.034), 0.05);
    return d;
  }

  void main() {
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 p = (vUv - 0.5) * aspect;
    vec2 m = (u_mouse - 0.5) * aspect;
    float t = u_time * 0.35;

    float d = droplets(p, m, t);

    /* Central-difference gradient → fake surface normal (2D) */
    float eps = 0.0025;
    float dx = droplets(p + vec2(eps, 0.0), m, t) - droplets(p - vec2(eps, 0.0), m, t);
    float dy = droplets(p + vec2(0.0, eps), m, t) - droplets(p - vec2(0.0, eps), m, t);
    vec2 n = normalize(vec2(dx, dy) + 1e-5);

    float inside = smoothstep(0.004, -0.02, d);
    float rim = smoothstep(0.012, 0.0, abs(d));

    /* Light coming from upper-left, in surface-normal space */
    vec2 L = normalize(vec2(-0.6, 0.7));
    float lambert = clamp(dot(-n, L), 0.0, 1.0);
    float spec = pow(lambert, 20.0);

    /* Glass tint — cool mint interior, brighter highlight */
    vec3 tint = vec3(0.827, 0.894, 0.804);
    vec3 shade = vec3(0.55, 0.70, 0.62);
    vec3 col = mix(shade, tint, lambert * 0.55 + 0.45);
    col += vec3(1.0) * spec * 0.9;
    col += rim * vec3(0.85, 1.0, 0.92) * 0.5;

    float alpha = (inside * 0.55 + rim * 0.65) * u_hover;
    alpha = clamp(alpha, 0.0, 0.85);

    gl_FragColor = vec4(col, alpha);
  }
`;

function initFooterFluid() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  /* Skip WebGL on reduced-motion machines */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "footer-fluid-canvas";
  canvas.setAttribute("aria-hidden", "true");
  footer.prepend(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_resolution: { value: new THREE.Vector2(1, 1) },
    u_hover: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  const state = {
    hoverTarget: 0,
    hoverCurrent: 0,
    mouseTarget: new THREE.Vector2(0.5, 0.5),
    running: false,
  };

  const resize = () => {
    const rect = footer.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    renderer.setSize(w, h, false);
    uniforms.u_resolution.value.set(w, h);
  };

  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(footer);

  const clock = new THREE.Clock();

  const tick = () => {
    if (!state.running && state.hoverCurrent < 0.001) {
      renderer.clear();
      return;
    }
    const dt = Math.min(clock.getDelta(), 0.05);
    uniforms.u_time.value += dt;

    /* Ease hover + mouse toward targets for organic motion */
    state.hoverCurrent += (state.hoverTarget - state.hoverCurrent) * Math.min(1, dt * 6);
    uniforms.u_hover.value = state.hoverCurrent;

    uniforms.u_mouse.value.x += (state.mouseTarget.x - uniforms.u_mouse.value.x) * Math.min(1, dt * 8);
    uniforms.u_mouse.value.y += (state.mouseTarget.y - uniforms.u_mouse.value.y) * Math.min(1, dt * 8);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  const start = () => {
    if (state.running) return;
    state.running = true;
    clock.start();
    requestAnimationFrame(tick);
  };

  footer.addEventListener("mouseenter", () => {
    state.hoverTarget = 1;
    start();
  });

  footer.addEventListener("mouseleave", () => {
    state.hoverTarget = 0;
    /* Let tick keep running until fade-out completes, then it self-stops */
    setTimeout(() => {
      if (state.hoverTarget === 0) state.running = false;
    }, 600);
  });

  footer.addEventListener("mousemove", (e) => {
    const rect = footer.getBoundingClientRect();
    state.mouseTarget.x = (e.clientX - rect.left) / rect.width;
    state.mouseTarget.y = 1 - (e.clientY - rect.top) / rect.height;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFooterFluid);
} else {
  initFooterFluid();
}
