"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function MonogramMesh({ isMobile }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(time * 0.4) * 0.15;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, 
      state.pointer.y * 0.3, 
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, 
      state.pointer.x * 0.3, 
      0.1
    );
  });

  const baseScale = isMobile ? 0.75 : 1.1;

  return (
    <group ref={meshRef} scale={[baseScale, baseScale, baseScale]}>
      <mesh position={[-0.55, 0, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.24, 2.4, 0.35]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.2} />
      </mesh>
      <mesh position={[0.55, 0, 0]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[0.24, 2.4, 0.35]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.05, 0.12]} rotation={[0, 0.35, 0.15]}>
        <boxGeometry args={[1.4, 0.24, 0.28]} />
        <meshStandardMaterial color="#cccccc" roughness={0.2} metalness={0.4} />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL] = useState(() => {
    try {
      const canvas = document.createElement("canvas");
      const glContext = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return !!(glContext && glContext instanceof WebGLRenderingContext);
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    // 1. Check viewport dimensions
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 🛡️ THE FIX: If the browser's sandbox blocks WebGL, return a clean empty container.
  // This lets the beautiful looping background video carry the UI visual workload without breaking the console.
  if (!hasWebGL) {
    return (
      <div className="w-full h-[40vh] md:h-full flex items-center justify-center">
        {/* Keeping a minimal hidden element so layout positioning rules don't collapse */}
        <div className="opacity-0 pointer-events-none">WebGL Content Bypassed</div>
      </div>
    );
  }

  // Only render the Three.js Canvas if WebGL support is explicitly verified as true
  return (
    <div className="w-full h-[40vh] md:h-full relative cursor-grab active:cursor-grabbing">
      <Canvas 
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false         
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            console.warn("VRAM Refresh Triggered.");
          }, false);
        }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 6, 4]} intensity={1.8} />
        <pointLight position={[-4, -4, -4]} intensity={0.6} />
        <Center>
          <MonogramMesh isMobile={isMobile} />
        </Center>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}