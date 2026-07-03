import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial, Ring, TorusKnot, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Scene() {
  const group = useRef();
  const mouse = useRef([0, 0]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    group.current.rotation.y += 0.005;
    // Follow mouse slightly
    group.current.rotation.x += (mouse.current[1] - group.current.rotation.x) * 0.02;
    group.current.rotation.y += (mouse.current[0] - group.current.rotation.y) * 0.02;
  });

  React.useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current[0] = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current[1] = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const color = '#00ffaa';

  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
      
      {/* Central glowing torus knot */}
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={0.8}>
        <TorusKnot args={[1.2, 0.4, 128, 16]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.8}
            distort={0.4}
            speed={2}
          />
        </TorusKnot>
      </Float>

      {/* Orbiting rings */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 2.5;
        return (
          <group key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * 0.5, Math.sin(angle) * radius]}>
            <Float speed={0.8 + i * 0.2} rotationIntensity={0.5}>
              <Ring args={[0.3, 0.5, 64]} rotation={[0, 0, angle]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.7} />
              </Ring>
            </Float>
          </group>
        );
      })}

      {/* Floating small spheres */}
      {Array.from({ length: 30 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 3 + Math.random() * 2;
        return (
          <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.2} floatIntensity={0.5}>
            <Sphere args={[0.08, 8, 8]} position={[
              r * Math.sin(phi) * Math.cos(theta),
              r * Math.sin(phi) * Math.sin(theta),
              r * Math.cos(phi)
            ]}>
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </Sphere>
          </Float>
        );
      })}

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.5} />
    </group>
  );
}

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <Scene />
        <fog attach="fog" args={['#030308', 5, 15]} />
      </Canvas>
    </div>
  );
}