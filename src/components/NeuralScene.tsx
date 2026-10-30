import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion, useWindowSize } from '../hooks/useAnimations';

function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const particleCount = 800;
  const connectionDistance = 2.2;

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const siz = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;

      // Cyan to violet gradient
      const t = Math.random();
      col[i * 3] = THREE.MathUtils.lerp(0, 0.486, t);
      col[i * 3 + 1] = THREE.MathUtils.lerp(0.898, 0.227, t);
      col[i * 3 + 2] = THREE.MathUtils.lerp(1.0, 0.929, t);

      siz[i] = 1.5 + Math.random() * 2;
    }

    return { positions: pos, velocities: vel, colors: col, sizes: siz };
  }, []);

  const linePositions = useMemo(() => new Float32Array(particleCount * 6 * 3), []);
  const lineColors = useMemo(() => new Float32Array(particleCount * 6 * 3), []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    timeRef.current += delta;
    const time = timeRef.current;

    // Mouse tracking
    const pointer = state.pointer;
    mouseRef.current.x += (pointer.x * 2 - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (pointer.y * 2 - mouseRef.current.y) * 0.02;

    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

      // Gentle orbit
      posArr[ix] += velocities[ix] + Math.sin(time * 0.3 + i * 0.01) * 0.001;
      posArr[iy] += velocities[iy] + Math.cos(time * 0.2 + i * 0.01) * 0.001;
      posArr[iz] += velocities[iz] + Math.sin(time * 0.15 + i * 0.02) * 0.001;

      // Mouse influence
      posArr[ix] += mouseRef.current.x * 0.001;
      posArr[iy] += mouseRef.current.y * 0.001;

      // Contain within bounds
      const dist = Math.sqrt(posArr[ix] ** 2 + posArr[iy] ** 2 + posArr[iz] ** 2);
      if (dist > 7) {
        posArr[ix] *= 0.99;
        posArr[iy] *= 0.99;
        posArr[iz] *= 0.99;
      }
      if (dist < 2) {
        posArr[ix] *= 1.01;
        posArr[iy] *= 1.01;
        posArr[iz] *= 1.01;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Build connections
    let lineIdx = 0;
    const maxLines = particleCount * 6;
    for (let i = 0; i < particleCount && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < particleCount && lineIdx < maxLines; j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < connectionDistance) {
          const alpha = 1 - d / connectionDistance;
          const li = lineIdx * 6;

          linePositions[li] = posArr[i * 3];
          linePositions[li + 1] = posArr[i * 3 + 1];
          linePositions[li + 2] = posArr[i * 3 + 2];
          linePositions[li + 3] = posArr[j * 3];
          linePositions[li + 4] = posArr[j * 3 + 1];
          linePositions[li + 5] = posArr[j * 3 + 2];

          const ci = lineIdx * 6;
          lineColors[ci] = 0 * alpha;
          lineColors[ci + 1] = 0.898 * alpha;
          lineColors[ci + 2] = 1.0 * alpha;
          lineColors[ci + 3] = 0.486 * alpha;
          lineColors[ci + 4] = 0.227 * alpha;
          lineColors[ci + 5] = 0.929 * alpha;

          lineIdx++;
        }
      }
    }

    // Clear unused lines
    for (let i = lineIdx * 6; i < linePositions.length; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y += delta * 0.05;
    linesRef.current.rotation.y += delta * 0.05;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

export default function NeuralScene() {
  const reducedMotion = usePrefersReducedMotion();
  const { width } = useWindowSize();
  const isMobile = width < 768;

  if (reducedMotion) {
    return (
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, isMobile ? 12 : 10], fov: 60 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        style={{ pointerEvents: 'auto' }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <NeuralNetwork />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}
