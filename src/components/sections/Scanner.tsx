/* eslint-disable */
// @ts-nocheck
'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Scanner.css';

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  uResolution;
uniform vec2  uMouse;
uniform vec2  uPingPos;
uniform float uPingTime;
uniform float uTime;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform float uSpeed;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uTrail;
uniform float uRipple;
uniform float uBandDensity;
uniform float uGlow;
uniform float uVertical;
uniform float uColorSpread;
uniform float uScanline;
uniform float uScanlineIntensity;
uniform float uReverse;
uniform float uScale;
uniform float uFrequency;
uniform float uLineWidth;
uniform float uBrightness;
uniform float uVignette;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform float uMouseStrength;
uniform float uMouseRadius;
uniform float uIntro;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 uvCentered = uv - 0.5;
  vec2 uva = uvCentered * vec2(aspect, 1.0);
  vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0);
  vec2 ping  = (uPingPos - 0.5) * vec2(aspect, 1.0);

  // ── Mouse repel warp ────────────────────────────────────────
  float mDist = length(uva - mouse);
  float mInfl = smoothstep(uMouseRadius, 0.0, mDist) * uMouseStrength;
  vec2 away = normalize(uva - mouse + vec2(0.0001));
  vec2 warpedUV = uv + (away * mInfl * 0.12) * vec2(1.0 / aspect, 1.0);

  // ── Scan coordinate (vertical or horizontal) ────────────────
  float scanCoord = mix(warpedUV.x, warpedUV.y, uVertical);

  // ── Bands ───────────────────────────────────────────────────
  float bandPhase  = scanCoord * uBandDensity * uFrequency * 0.1 - uTime * uSpeed;
  float band       = sin(bandPhase * 6.28318) * 0.5 + 0.5;
  float bandSharp  = pow(band, 2.5);

  // ── Sweep line ──────────────────────────────────────────────
  float sweepDir = uReverse > 0.5 ? -1.0 : 1.0;
  float sweepPos = fract(uTime * uSweepSpeed * sweepDir + 0.5);
  float sweepDist = abs(scanCoord - sweepPos);
  float sweep = smoothstep(uSweepWidth * 0.15, 0.0, sweepDist);
  sweep = pow(sweep, 1.5);

  // ── Trail behind sweep ──────────────────────────────────────
  float trailDist = fract(scanCoord - sweepPos + 1.0);
  float trailGlow = smoothstep(0.0, 0.4, trailDist)
                  * smoothstep(0.5, 0.0, trailDist)
                  * uTrail;

  // ── Click ping ──────────────────────────────────────────────
  float pingAge = uTime - uPingTime;
  float pingRing = 0.0;
  if (pingAge > 0.0 && pingAge < 1.5) {
    float pingDist = distance(uva, ping);
    float pingRadius = pingAge * 0.9;
    pingRing = smoothstep(0.03, 0.0, abs(pingDist - pingRadius))
             * (1.0 - pingAge / 1.5);
  }

  // ── Color composition ───────────────────────────────────────
  vec3 col = mix(uColor1, uColor2, band);
  col = mix(col, uColor3, bandSharp * uColorSpread);
  col += uColor3 * sweep * 1.8;
  col += uColor2 * trailGlow * 0.4;
  col += uColor2 * mInfl * 0.7;
  col += uColor3 * pingRing * 1.2;
  col += uColor2 * bandSharp * uGlow * 0.5;

  // ── Scanlines ───────────────────────────────────────────────
  if (uScanline > 0.5) {
    float sl = sin(gl_FragCoord.y * 2.0) * 0.5 + 0.5;
    col *= mix(1.0, sl, uScanlineIntensity);
  }

  // ── Grain ───────────────────────────────────────────────────
  if (uGrain > 0.5) {
    float g = hash(gl_FragCoord.xy + uTime) - 0.5;
    col += g * uGrainIntensity;
  }

  // ── Vignette ────────────────────────────────────────────────
  float vig = 1.0 - smoothstep(0.35, 0.95, length(uvCentered)) * uVignette;
  col *= vig;

  // ── Post ────────────────────────────────────────────────────
  col *= uBrightness;
  col *= uOpacity;
  col *= uIntro;

  gl_FragColor = vec4(col, 1.0);
}
`;

function parseColor(value, fallback = [0.5, 0.5, 0.5]) {
  if (!value) return fallback;
  const s = String(value).trim();
  if (s.startsWith('#')) {
    const h = s.slice(1);
    if (h.length === 3) {
      return [
        parseInt(h[0] + h[0], 16) / 255,
        parseInt(h[1] + h[1], 16) / 255,
        parseInt(h[2] + h[2], 16) / 255,
      ];
    }
    if (h.length === 6) {
      return [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
      ];
    }
  }
  const m = s.match(/[\d.]+/g);
  if (m && m.length >= 3) {
    return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
  }
  return fallback;
}

export interface ScannerProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  sweepSpeed?: number;
  sweepWidth?: number;
  trail?: number;
  ripple?: number;
  bandDensity?: number;
  glow?: number;
  scanDirection?: 'vertical' | 'horizontal';
  colorSpread?: number;
  scanline?: boolean;
  scanlineIntensity?: number;
  mouseInteraction?: boolean;
  clickEffect?: 'none' | 'ping';
  reverse?: boolean;
  scale?: number;
  frequency?: number;
  lineWidth?: number;
  brightness?: number;
  vignette?: number;
  grain?: boolean;
  grainIntensity?: number;
  opacity?: number;
  mouseMode?: 'repel' | 'attract';
  mouseRadius?: number;
  mouseStrength?: number;
  intro?: boolean;
  introDuration?: number;
  lightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Scanner({
  color1 = '#5227FF',
  color2 = '#FF9FFC',
  color3 = '#FFFFFF',
  speed = 0.5,
  sweepSpeed = 0.25,
  sweepWidth = 1.6,
  trail = 0.5,
  ripple = 0.22,
  bandDensity = 11,
  glow = 0.6,
  scanDirection = 'vertical',
  colorSpread = 0.7,
  scanline = false,
  scanlineIntensity = 0.5,
  mouseInteraction = false,
  clickEffect = 'ping',
  reverse = false,
  scale = 1.5,
  frequency = 2,
  lineWidth = 1.2,
  brightness = 1,
  vignette = 0.3,
  grain = false,
  grainIntensity = 0.04,
  opacity = 1,
  mouseMode = 'repel',
  mouseRadius = 0.5,
  mouseStrength = 0.7,
  intro = false,
  introDuration = 1.5,
  lightMode = false,
  className = '',
  style,
}: ScannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const uniforms = {
      uResolution:       { value: [1, 1] },
      uMouse:            { value: [0.5, 0.5] },
      uPingPos:          { value: [0.5, 0.5] },
      uPingTime:         { value: -10 },
      uTime:             { value: 0 },
      uColor1:           { value: parseColor(color1) },
      uColor2:           { value: parseColor(color2) },
      uColor3:           { value: parseColor(color3) },
      uSpeed:            { value: speed },
      uSweepSpeed:       { value: sweepSpeed },
      uSweepWidth:       { value: sweepWidth },
      uTrail:            { value: trail },
      uRipple:           { value: ripple },
      uBandDensity:      { value: bandDensity },
      uGlow:             { value: glow },
      uVertical:         { value: scanDirection === 'vertical' ? 1 : 0 },
      uColorSpread:      { value: colorSpread },
      uScanline:         { value: scanline ? 1 : 0 },
      uScanlineIntensity:{ value: scanlineIntensity },
      uReverse:          { value: reverse ? 1 : 0 },
      uScale:            { value: scale },
      uFrequency:        { value: frequency },
      uLineWidth:        { value: lineWidth },
      uBrightness:       { value: brightness },
      uVignette:         { value: vignette },
      uGrain:            { value: grain ? 1 : 0 },
      uGrainIntensity:   { value: grainIntensity },
      uOpacity:          { value: opacity },
      uMouseStrength:    { value: mouseStrength },
      uMouseRadius:      { value: mouseRadius },
      uIntro:            { value: intro ? 0 : 1 },
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

    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    let t = 0;
    let introT = 0;
    const introDur = Math.max(0.1, introDuration);

    const setTarget = (clientX: number, clientY: number) => {
      const r = container.getBoundingClientRect();
      targetX = (clientX - r.left) / r.width;
      targetY = 1 - (clientY - r.top) / r.height;
    };

    const onMove = (e: PointerEvent) => {
      setTarget(e.clientX, e.clientY);
    };
    const onClick = (e: MouseEvent) => {
      if (clickEffect !== 'ping') return;
      const r = container.getBoundingClientRect();
      uniforms.uPingPos.value = [
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      ];
      uniforms.uPingTime.value = t;
    };
    const onLeave = () => {
      targetX = 0.5;
      targetY = 0.5;
    };

    if (mouseInteraction) {
      container.addEventListener('pointermove', onMove, { passive: true });
      container.addEventListener('click', onClick);
      container.addEventListener('pointerleave', onLeave);
    }

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      t += dt;
      if (intro && introT < introDur) introT = Math.min(introDur, introT + dt);

      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      uniforms.uTime.value = t;
      uniforms.uMouse.value = [currentX, currentY];
      uniforms.uIntro.value = intro ? introT / introDur : 1;

      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (mouseInteraction) {
        container.removeEventListener('pointermove', onMove);
        container.removeEventListener('click', onClick);
        container.removeEventListener('pointerleave', onLeave);
      }
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [
    color1, color2, color3,
    speed, sweepSpeed, sweepWidth, trail, ripple, bandDensity, glow,
    scanDirection, colorSpread, scanline, scanlineIntensity,
    mouseInteraction, clickEffect, reverse, scale, frequency, lineWidth,
    brightness, vignette, grain, grainIntensity, opacity,
    mouseMode, mouseRadius, mouseStrength, intro, introDuration, lightMode,
  ]);

  return (
    <div
      ref={containerRef}
      className={`scanner ${className}`.trim()}
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', ...style }}
    />
  );
}