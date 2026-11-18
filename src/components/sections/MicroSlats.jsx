'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './MicroSlats.css';

const PRESETS = {
  swell:  { scale: 1.5,  speed: 0.6, direction: 250, chop: 0.55, stretch: 0,    glint: 0.7,  contrast: 1.25, perspective: 0.55, fog: 0.55 },
  tide:   { scale: 1.3,  speed: 0.5, direction: 262, chop: 0.2,  stretch: 0.12, glint: 0.45, contrast: 1.1,  perspective: 0.5,  fog: 0.4  },
  storm:  { scale: 0.55, speed: 1.6, direction: 236, chop: 1,    stretch: 0.3,  glint: 1.3,  contrast: 1.8,  perspective: 0.8,  fog: 0.35 },
  signal: { scale: 0.85, speed: 1.2, direction: 180, chop: 0.6,  stretch: 0.85, glint: 0.25, contrast: 1.2,  perspective: 0,    fog: 0    },
};

function parseColor(value) {
  try {
    const hex = (value || '#000000').replace('#', '');
    const expand = (s) => (s.length === 1 ? s + s : s);
    const r = parseInt(expand(hex[0]) + (hex[1] && hex.length === 3 ? '' : ''), 16);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16) / 255,
        parseInt(hex[1] + hex[1], 16) / 255,
        parseInt(hex[2] + hex[2], 16) / 255,
      ];
    }
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  } catch {
    return [0, 0, 0];
  }
}

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  uResolution;
uniform vec2  uPointer;
uniform float uTime;
uniform float uIntro;
uniform vec3  uColor;
uniform vec3  uGlintColor;
uniform vec3  uBackgroundColor;
uniform vec2  uSlatSize;
uniform float uGap;
uniform float uRoundness;
uniform float uInteractive;
uniform float uCursorStrength;
uniform float uCursorSize;
uniform float uChop;
uniform float uStretch;
uniform float uGlint;
uniform float uContrast;
uniform float uPerspective;
uniform float uFog;
uniform float uScale;
uniform float uSpeed;
uniform float uDirection;
uniform float uLean;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float roundedRect(vec2 p, vec2 halfSize, float radius) {
  vec2 q = abs(p) - halfSize + radius;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 screen = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);

  float ang = radians(uDirection);
  vec2 dir = vec2(cos(ang), sin(ang));

  vec2 p = screen;
  p.y *= mix(1.0, 0.65, uPerspective);
  p.x += p.y * uLean * 0.5;

  float wave = 0.0;
  wave += sin(dot(p, dir) * 4.0 * uScale + uTime * uSpeed) * 0.5;
  wave += sin(dot(p, vec2(-dir.y, dir.x)) * 6.0 * uScale + uTime * uSpeed * 0.7) * 0.3;
  wave += sin(dot(p, dir) * 9.0 * uScale + uTime * uSpeed * 1.3) * 0.2;
  p.y += wave * uChop * 0.06;
  p.x += sin(p.y * 8.0 * uScale + uTime * uSpeed * 1.5) * uStretch * 0.02;

  float cursorInfluence = 0.0;
  if (uInteractive > 0.5) {
    float dist = length(p - pointer) / (uCursorSize / uResolution.y);
    cursorInfluence = exp(-dist * dist * 2.0) * uCursorStrength;
    vec2 away = p - pointer;
    p += normalize(away + 0.0001) * cursorInfluence * 0.15;
  }

  vec2 slat = uSlatSize / uResolution.y;
  float gap = uGap / uResolution.y;
  vec2 cellStep = slat + gap;
  vec2 cellId = floor(p / cellStep);
  vec2 cellPos = mod(p, cellStep) - cellStep * 0.5;

  vec2 halfSize = slat * 0.5;
  float rad = uRoundness * min(halfSize.x, halfSize.y);
  float dist = roundedRect(cellPos, halfSize, rad);
  float mask = smoothstep(0.002, 0.0, dist);

  float rnd = hash(cellId);

  vec3 col = uColor;
  float depth = 0.5 + 0.5 * sin(cellId.x * 0.2 + cellId.y * 0.15 + uTime * uSpeed * 0.5);
  col = mix(col * (1.0 / uContrast), col * uContrast, depth);

  float glintPhase = cellId.x * 0.3 + cellId.y * 0.4 + uTime * uSpeed * 1.5;
  float glint = pow(max(0.0, sin(glintPhase)), 18.0) * uGlint;
  col = mix(col, uGlintColor, glint);

  col += uGlintColor * cursorInfluence * 0.6;

  float cellIntro = smoothstep(0.0, 1.0, uIntro * 1.5 - rnd * 0.5);
  float introMask = min(uIntro, cellIntro);

  float vig = 1.0 - smoothstep(0.4, 1.0, length(uv - 0.5)) * uFog;

  vec3 finalCol = mix(uBackgroundColor, col, mask * introMask * vig);
  gl_FragColor = vec4(finalCol, 1.0);
}
`;

export default function MicroSlats({
  preset = 'swell',
  color = '#A855F7',
  glintColor = '#ffffff',
  backgroundColor = '#120f17',
  slatWidth = 10,
  slatHeight = 25,
  gap = 3,
  roundness = 0.75,
  interactive = false,
  cursorStrength = 1,
  cursorSize = 40,
  swirl = 0,
  trail = 1.4,
  lean = 0,
  intro = false,
  scale,
  speed,
  direction,
  chop,
  stretch,
  glint,
  contrast,
  perspective,
  fog,
  introDuration = 1.5,
  paused = false,
  className = '',
  style,
}) {
  const containerRef = useRef(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const p = PRESETS[preset] || PRESETS.swell;

    const renderer = new Renderer({
      alpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const dpr = renderer.dpr;

    const uniforms = {
      uResolution:       { value: [1, 1] },
      uPointer:          { value: [0.5, 0.5] },
      uTime:             { value: 0 },
      uIntro:            { value: 0 },
      uColor:            { value: parseColor(color) },
      uGlintColor:       { value: parseColor(glintColor) },
      uBackgroundColor:  { value: parseColor(backgroundColor) },
      uSlatSize:         { value: [slatWidth * dpr, slatHeight * dpr] },
      uGap:              { value: gap * dpr },
      uRoundness:        { value: roundness },
      uInteractive:      { value: interactive ? 1 : 0 },
      uCursorStrength:   { value: cursorStrength },
      uCursorSize:       { value: cursorSize },
      uChop:             { value: chop ?? p.chop },
      uStretch:          { value: stretch ?? p.stretch },
      uGlint:            { value: glint ?? p.glint },
      uContrast:         { value: contrast ?? p.contrast },
      uPerspective:      { value: perspective ?? p.perspective },
      uFog:              { value: fog ?? p.fog },
      uScale:            { value: scale ?? p.scale },
      uSpeed:            { value: speed ?? p.speed },
      uDirection:        { value: direction ?? p.direction },
      uLean:             { value: lean },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, { vertex: VERT, fragment: FRAG, uniforms });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      renderer.setSize(w, h);
      uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let tx = 0.5;
    let ty = 0.5;
    let px = 0.5;
    let py = 0.5;
    const onMove = (e) => {
      const r = container.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = 1 - (e.clientY - r.top) / r.height;
    };
    if (interactive) {
      container.addEventListener('pointermove', onMove, { passive: true });
    }

    let raf = 0;
    let last = performance.now();
    let t = 0;
    let introT = 0;
    const introDur = Math.max(0.1, introDuration);

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) t += dt * (speed ?? p.speed);
      if (intro && introT < introDur) introT = Math.min(introDur, introT + dt);

      px += (tx - px) * 0.15;
      py += (ty - py) * 0.15;

      uniforms.uPointer.value = [px, py];
      uniforms.uTime.value = t;
      uniforms.uIntro.value = intro ? introT / introDur : 1;

      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener('pointermove', onMove);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [
    preset, color, glintColor, backgroundColor,
    slatWidth, slatHeight, gap, roundness,
    interactive, cursorStrength, cursorSize, swirl, trail, lean,
    intro, scale, speed, direction, chop, stretch,
    glint, contrast, perspective, fog, introDuration,
  ]);

  return (
    <div
      ref={containerRef}
      className={`micro-slats ${className}`.trim()}
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', ...style }}
    />
  );
}