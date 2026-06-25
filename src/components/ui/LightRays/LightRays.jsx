import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';
import './LightRays.css';

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uOrigin;
  uniform vec3 uColor;
  uniform float uSpeed;
  uniform float uSpread;
  uniform float uLength;
  uniform float uDistortion;
  uniform float uNoiseAmount;
  uniform float uFadeDistance;
  uniform int uPulsating;

  varying vec2 vUv;

  // 2D Noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 pos = st - uOrigin;
    
    // Account for aspect ratio to keep rays uniform
    float aspect = uResolution.x / uResolution.y;
    pos.x *= aspect;

    // Distort coordinates with noise
    vec2 noisePos = pos + vec2(0.0, uTime * uSpeed * 0.1);
    float n = snoise(noisePos * 2.0) * uDistortion;
    pos += n;
    
    // Angle and distance from origin
    float angle = atan(pos.y, pos.x);
    float dist = length(pos);
    
    // Base ray generation using noise on the angle - spread increased massively for softness
    float rayNoise = snoise(vec2(angle * uSpread * 2.0, uTime * uSpeed));
    // Super soft interpolation instead of sharp beams
    float rays = smoothstep(0.1, 0.9, rayNoise * 0.5 + 0.5);
    
    // Distance attenuation
    float attenuation = exp(-dist * (1.0 / uLength) * uFadeDistance);
    
    // Combine
    float intensity = rays * attenuation;
    
    if(uPulsating == 1) {
        intensity *= (sin(uTime * uSpeed * 5.0) * 0.1 + 0.9);
    }
    
    // Apply noise texture
    intensity += snoise(st * 100.0) * uNoiseAmount;
    
    // Ensure it doesn't drop below zero and clamps
    intensity = clamp(intensity, 0.0, 1.0);
    
    vec3 col = uColor * intensity;
    
    // Pre-multiplied alpha blend output
    gl_FragColor = vec4(col, intensity);
  }
`;

function getOrigin(originString) {
  switch (originString) {
    case 'top-left': return [0.0, 1.0];
    case 'top-center': return [0.5, 1.0];
    case 'top-right': return [1.0, 1.0];
    case 'center': return [0.5, 0.5];
    case 'bottom-center': return [0.5, 0.0];
    default: return [0.5, 1.0];
  }
}

export const LightRays = ({
  raysOrigin = "top-center",
  raysColor = "#ECE8DE",
  raysSpeed = 0.08,
  lightSpread = 0.8,
  rayLength = 1.2,
  pulsating = false,
  fadeDistance = 2.0,
  saturation = 0.15,
  followMouse = false,
  mouseInfluence = 0,
  noiseAmount = 0.015,
  distortion = 0.005,
  className = "",
  style = {},
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const programRef = useRef(null);
  const rendererRef = useRef(null);
  const isVisibleRef = useRef(false);
  const timeRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const renderer = new Renderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio, 2), // Cap DPR for performance
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    // Set clear color to transparent
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        uOrigin: { value: getOrigin(raysOrigin) },
        uColor: { value: new Color(raysColor) },
        uSpeed: { value: raysSpeed },
        uSpread: { value: lightSpread },
        uLength: { value: rayLength },
        uDistortion: { value: distortion },
        uNoiseAmount: { value: noiseAmount },
        uFadeDistance: { value: fadeDistance },
        uPulsating: { value: pulsating ? 1 : 0 },
      },
      transparent: true,
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    // Handle Resize
    const resize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      rendererRef.current.setSize(clientWidth, clientHeight);
      program.uniforms.uResolution.value = [clientWidth, clientHeight];
    };
    window.addEventListener('resize', resize);
    resize();

    // Render loop
    let lastTime = performance.now();
    const render = (t) => {
      if (isVisibleRef.current) {
        const delta = (t - lastTime) * 0.001;
        timeRef.current += delta;
        program.uniforms.uTime.value = timeRef.current;
        renderer.render({ scene: mesh });
      }
      lastTime = t;
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    // Intersection Observer for performance (pause when off-screen)
    const io = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', resize);
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    distortion,
    noiseAmount,
  ]);

  return (
    <div ref={containerRef} className={`light-rays-container ${className}`} style={{
      opacity: 0.035,
      mixBlendMode: 'screen',
      pointerEvents: 'none',
      ...style
    }}>
      <canvas ref={canvasRef} className="light-rays-canvas" />
    </div>
  );
};

export default LightRays;
