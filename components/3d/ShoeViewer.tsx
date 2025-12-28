"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { cn } from "@/lib/utils";

export type ViewerMode = "homeHero" | "product" | "galleryThumb" | "modal" | "homeScrolly";
export type ViewPreset = "front34" | "side" | "top" | "heel" | "sole" | "detail";

export interface ShoeViewerApi {
    model: THREE.Group | null;
    camera: THREE.Camera;
    scene: THREE.Scene;
    radius: number;
    controls: any;
}

interface ShoeViewerProps {
    mode: ViewerMode;
    glbPath?: string;
    view?: ViewPreset;
    className?: string;
    onReady?: (api: ShoeViewerApi) => void;
    active?: boolean;
}

const ViewerInner = ({
    mode,
    glbPath,
    view,
    onReady,
    active
}: {
    mode: ViewerMode;
    glbPath: string;
    view?: ViewPreset;
    onReady?: (api: ShoeViewerApi) => void;
    active?: boolean
}) => {
    const { scene } = useGLTF(glbPath) as any;
    const { camera, scene: threeScene, invalidate } = useThree();
    const modelRef = useRef<THREE.Group>(null);
    const controlsRef = useRef<any>(null);
    const [radius, setRadius] = useState(0);

    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
        if (!modelRef.current) return;
        const root = modelRef.current;

        root.position.set(0, 0, 0);
        root.rotation.set(0, 0, 0);
        root.scale.set(1, 1, 1);
        root.updateMatrixWorld();

        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        root.position.sub(center);

        const r = Math.max(size.x, size.y, size.z) / 2;
        setRadius(r);

        if (onReady) {
            onReady({
                model: root,
                camera,
                scene: threeScene,
                radius: r,
                controls: controlsRef.current,
            });
        }
    }, [clonedScene, onReady, camera, threeScene]);

    useEffect(() => {
        if (radius === 0) return;

        let multiplier = 3.0;
        if (mode === "homeHero") multiplier = 3.0;
        if (mode === "homeScrolly") multiplier = 3.2;
        if (mode === "product") multiplier = 3.8;
        if (mode === "galleryThumb") multiplier = 4.2;
        if (mode === "modal") multiplier = 3.4;

        const dist = radius * multiplier;
        const defaultPos = new THREE.Vector3(dist * 0.9, dist * 0.5, dist * 1.1);

        if (view && mode !== "homeScrolly") {
            if (view === "front34") defaultPos.set(dist * 0.9, dist * 0.5, dist * 1.1);
            if (view === "side") defaultPos.set(dist, 0, 0);
            if (view === "top") defaultPos.set(0, dist, 0);
            if (view === "heel") defaultPos.set(-dist, 0.5 * radius, -dist * 0.5).setLength(dist);
            if (view === "sole") defaultPos.set(0, -dist, 0);
            if (view === "detail") defaultPos.set(dist * 0.5, dist * 0.3, dist * 0.5);
        }

        // Apply posisi kamera awal
        if (mode !== "homeScrolly") {
            camera.position.copy(defaultPos);
            camera.lookAt(0, 0, 0);
        } else {
            camera.position.set(dist * 0.9, dist * 0.5, dist * 1.1);
            camera.lookAt(0, 0, 0);
        }

        camera.updateProjectionMatrix();

        if (controlsRef.current) {
            const ctrl = controlsRef.current;
            const allowOrbit = mode === "product" || mode === "modal";
            ctrl.enabled = allowOrbit;
            
            if (allowOrbit) {
                ctrl.target.set(0, 0, 0);
                ctrl.minDistance = radius * 2.0;
                ctrl.maxDistance = radius * 6.0;
                ctrl.enablePan = false;
                ctrl.enableDamping = true;
                ctrl.dampingFactor = 0.05;
            }
            ctrl.update();
        }
        
        invalidate();
    }, [radius, mode, view, camera, invalidate]);

    useFrame((state, delta) => {
        if (mode === "homeHero" && modelRef.current && active) {
            modelRef.current.rotation.y += delta * 0.15;
        }
    });

    useMemo(() => {
        const c = new THREE.Color("#0ea5e9"); 
        clonedScene.traverse((child: any) => {
            if (child.isMesh) {
                child.castShadow = false; 
                child.receiveShadow = false;
                
                if (child.name.toLowerCase().includes("upper") || child.name.toLowerCase().includes("shoe")) {
                    if (child.material) {
                        child.material = child.material.clone();
                        child.material.color = c;
                    }
                }
            }
        });
    }, [clonedScene]);

    return (
        <>
            <primitive ref={modelRef} object={clonedScene} />
            <Environment preset="city" />

            <hemisphereLight intensity={0.6} groundColor="#111" />
            <directionalLight position={[5, 10, 5]} intensity={1.5} />

            <ContactShadows
                position={[0, -radius * 0.6 || -0.2, 0]}
                opacity={0.4}
                scale={10}
                blur={2.5}
                far={4}
                frames={1} 
                resolution={512} 
            />

            <OrbitControls
                ref={controlsRef}
                makeDefault
                enabled={false}
            />
        </>
    );
};

export function ShoeViewer({
    mode,
    glbPath = "/shoe.glb",
    view,
    className,
    onReady,
    active = true
}: ShoeViewerProps) {

    const isAnimationHeavy = mode === "homeScrolly" || mode === "homeHero";
    const frameloop = active && isAnimationHeavy ? "always" : "demand";

    // CSS Classes
    const defaultSizing = useMemo(() => {
        if (mode === "homeHero") return "h-[520px] lg:h-[70vh] w-full";
        if (mode === "product") return "aspect-square h-[360px] md:h-[440px] lg:h-[520px] w-full";
        if (mode === "galleryThumb") return "h-[220px] w-full";
        if (mode === "modal") return "h-[50vh] md:h-[60vh] w-full";
        if (mode === "homeScrolly") return "h-full w-full";
        return "h-full w-full";
    }, [mode]);

    return (
        <div className={cn("relative overflow-hidden", className || defaultSizing)}>
            <Canvas
                frameloop={frameloop}
                dpr={[1, 1.5]} 
                shadows={false}
                gl={{
                    powerPreference: "high-performance",
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.0,
                }}
                camera={{ fov: 45 }}
                style={{ pointerEvents: (mode === "product" || mode === "modal") ? "auto" : "none" }}
            >
                <ViewerInner
                    mode={mode}
                    glbPath={glbPath}
                    view={view}
                    onReady={onReady}
                    active={active}
                />
            </Canvas>
        </div>
    );
}
