"use client";

import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Variant } from "@/components/product/useProductState";

interface ShoeModelProps {
    variant?: Variant;
    scale?: number;
    autoRotate?: boolean;
}

export function ShoeModel({ variant = "Skywave", scale = 1, autoRotate = false }: ShoeModelProps) {
    const ref = useRef<THREE.Group>(null);

    const { scene } = useGLTF("/shoe.glb");

    const colors = {
        Skywave: new THREE.Color("#0ea5e9"),
        Midnight: new THREE.Color("#171717"),
        Volt: new THREE.Color("#a3e635"),
    };

    useEffect(() => {
        if (scene) {
            const box = new THREE.Box3().setFromObject(scene);
            const size = new THREE.Vector3();
            box.getSize(size);

            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
                const targetSize = 2;
                const scaleFactor = targetSize / maxDim;
                scene.scale.setScalar(scaleFactor);
            }

            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    if (mesh.material) {
                        const m = mesh.material as THREE.MeshStandardMaterial;
                        m.color.set(colors[variant]);
                    }
                }
            });
        }
    }, [scene, variant]);

    useFrame((state) => {
        if (!ref.current) return;

        if (autoRotate) {
            ref.current.rotation.y += 0.005;
            ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group ref={ref} dispose={null} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload("/shoe.glb");
