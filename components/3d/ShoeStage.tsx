"use client";

import React, { useRef, useEffect, useMemo, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cn } from "@/lib/utils";

export type ViewerMode = "hero" | "scrolly" | "product" | "thumb";

export interface ShoeStageRef {
    model: THREE.Group | null;
    camera: THREE.Camera;
    scene: THREE.Scene;
    controls?: OrbitControlsImpl | null;
}

interface ShoeStageProps {
    mode?: ViewerMode;
    variant?: string;
    className?: string;
    glbPath?: string;
    scrollProgress?: number;
    children?: React.ReactNode;
}

const StageInner = forwardRef<ShoeStageRef, {
    mode: ViewerMode;
    variant: string;
    glbPath: string;
    scrollProgress: number;
    onLoaded?: (model: THREE.Object3D) => void;
}>(({ mode, variant, glbPath, scrollProgress = 0, onLoaded }, ref) => {
    const { scene } = useGLTF(glbPath);
    const localRef = useRef<THREE.Group>(null);
    const { camera, scene: threeScene } = useThree();
    const controlsRef = useRef<OrbitControlsImpl>(null);

    useImperativeHandle(ref, () => ({
        model: localRef.current,
        camera: camera,
        scene: threeScene,
        controls: controlsRef.current
    }));

    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
        const colors: Record<string, string> = {
            Skywave: "#0ea5e9",
            Midnight: "#1e293b",
            Volt: "#a3e635",
        };
        const c = new THREE.Color(colors[variant] || "#ffffff");

        clonedScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.name.toLowerCase().includes("shoe") || mesh.name.toLowerCase().includes("upper")) {
                    (mesh.material as THREE.MeshStandardMaterial).color = c;
                }
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
    }, [variant, clonedScene]);

    useEffect(() => {
        if (!localRef.current) return;

        const box = new THREE.Box3().setFromObject(localRef.current);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        localRef.current.position.x = -center.x;
        localRef.current.position.y = -center.y;
        localRef.current.position.z = -center.z;

        const radius = Math.max(size.x, size.y, size.z);

        let factor = 2.1;
        if (mode === "scrolly") factor = 2.4;
        if (mode === "product") factor = 4.5;
        if (mode === "thumb") factor = 2.6;

        const distance = radius * factor;
        const standardPos = new THREE.Vector3(distance * 0.9, distance * 0.55, distance * 1.1);

        camera.position.copy(standardPos);
        camera.near = Math.max(radius / 100, 0.01);
        camera.far = radius * 50;

        if (camera instanceof THREE.PerspectiveCamera) {
            camera.fov = 45;
            camera.updateProjectionMatrix();
        }

        camera.lookAt(0, 0, 0);

        if (onLoaded) onLoaded(localRef.current);

    }, [clonedScene, mode, onLoaded, camera]);

    useFrame((state, delta) => {
        if (mode === "hero" && localRef.current) {
            localRef.current.rotation.y += delta * 0.2;
            localRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
        }
    });

    const controlsConfig = useMemo(() => {
        if (mode === "product") {
            return { enabled: true, minDist: 0, maxDist: 100, zoom: true };
        }
        return { enabled: false, minDist: 0, maxDist: 0, zoom: false };
    }, [mode]);

    return (
        <>
            <primitive object={clonedScene} ref={localRef} />
            {controlsConfig.enabled && (
                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={controlsConfig.zoom}
                    dampingFactor={0.05}
                    minDistance={3}
                    maxDistance={15}
                />
            )}
        </>
    );
});
StageInner.displayName = "StageInner";


export const ShoeStage = forwardRef<ShoeStageRef, ShoeStageProps>(({
    mode = "hero",
    variant = "Skywave",
    className,
    glbPath = "/shoe.glb",
    scrollProgress = 0,
    children
}, ref) => {

    return (
        <div className={cn("relative w-full h-full", className)}>
            <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
                style={{ pointerEvents: mode === "scrolly" ? "none" : "auto" }}
            >
                <hemisphereLight intensity={0.5} groundColor="#333" />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <spotLight position={[-5, 5, 0]} intensity={0.5} angle={0.5} />
                <Environment preset="city" />

                <group>
                    <StageInner
                        ref={ref}
                        mode={mode}
                        variant={variant}
                        glbPath={glbPath}
                        scrollProgress={scrollProgress}
                    />
                    {children}
                </group>

                <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            </Canvas>
        </div>
    );
});
ShoeStage.displayName = "ShoeStage";
