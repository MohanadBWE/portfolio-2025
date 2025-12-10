'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function ParticleBrain() {
    const { viewport, mouse } = useThree();
    const count = 4000;
    const ref = useRef<THREE.Points>(null);

    // Initial particle data
    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // Sphere formation initially
            const r = 4 + Math.random() * 2;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);

            // Neon Gradient Colors
            color.setHSL(0.4 + Math.random() * 0.2, 1, 0.5); // Green/Blue range
            col[i * 3] = color.r;
            col[i * 3 + 1] = color.g;
            col[i * 3 + 2] = color.b;
        }
        return [pos, col];
    }, []);

    // Scroll state
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(window.scrollY / total);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation Loop
    useFrame((state) => {
        if (!ref.current) return;

        const time = state.clock.elapsedTime;
        const positionsContext = ref.current.geometry.attributes.position.array as Float32Array;

        // Interaction Logic
        // Mouse in world space (approximate at z=0)
        const mx = (mouse.x * viewport.width) / 2;
        const my = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // Base position (Morphing Logic)
            // 1. Sphere (Hero) -> 2. Plane (Experience) -> 3. Helix (Skills)

            let tx = positions[ix];
            let ty = positions[iy];
            let tz = positions[iz];

            if (scrollProgress > 0.1 && scrollProgress < 0.5) {
                // Morph to Plane/Wave
                tx = (i % 100 - 50) * 0.5; // Grid X
                ty = (Math.floor(i / 100) - 20) * 0.5; // Grid Y
                tz = Math.sin(tx * 0.2 + time) * 2; // Wave Z
            } else if (scrollProgress >= 0.5) {
                // Morph to Helix/Tunnel
                const angle = i * 0.1 + time * 0.2;
                const radius = 5 + Math.sin(i * 0.01) * 2;
                tx = Math.cos(angle) * radius;
                ty = (i % 200) * 0.1 - 10; // Vertical stack
                tz = Math.sin(angle) * radius;
            }

            // MOUSE REPULSION
            // Calculate distance to mouse
            const dx = mx - tx;
            const dy = my - ty;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // If close, push away
            if (dist < 3) {
                const force = (3 - dist) * 2;
                tx -= (dx / dist) * force;
                ty -= (dy / dist) * force;
                // Also push in Z for 3D ripple
                tz -= force * 2;
            }

            // KINETIC GHOST (For Mobile/Living Feel)
            // A virtual cursor that wanders and keeps the field alive
            const ghostX = Math.sin(time * 0.5) * (viewport.width * 0.3);
            const ghostY = Math.cos(time * 0.3) * (viewport.height * 0.3);

            const gdx = ghostX - tx;
            const gdy = ghostY - ty;
            const gdist = Math.sqrt(gdx * gdx + gdy * gdy);

            if (gdist < 4) {
                const gforce = (4 - gdist) * 0.5; // Softer ambient force
                tx -= (gdx / gdist) * gforce;
                ty -= (gdy / gdist) * gforce;
                tz -= gforce;
            }

            // Lerp current position to target for smooth transition
            positionsContext[ix] += (tx - positionsContext[ix]) * 0.05;
            positionsContext[iy] += (ty - positionsContext[iy]) * 0.05;
            positionsContext[iz] += (tz - positionsContext[iz]) * 0.05;
        }

        ref.current.geometry.attributes.position.needsUpdate = true;

        // Global Rotation
        ref.current.rotation.y = time * 0.05;
    });

    return (
        <Points ref={ref} positions={positions} colors={colors} stride={3}>
            <PointMaterial
                transparent
                vertexColors
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export default function InteractiveBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 12], fov: 60 }} gl={{ antialias: false, alpha: false }} dpr={[1, 2]}>
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 10, 30]} />
                <ParticleBrain />
            </Canvas>
        </div>
    );
}
