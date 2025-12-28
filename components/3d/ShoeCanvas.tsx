"use client";

import React, { useRef, useEffect, useState, useMemo, forwardRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, ContactShadows } from "@react-three/drei";
import { cn } from "@/lib/utils";

export type CanvasMode = "hero" | "product" | "thumb" | "modal" | "scrolly";
export type ViewPreset = "front34" | "side" | "top" | "heel" | "sole" | "detail";

interface ShoeCanvasProps {
    mode: CanvasMode;
    glbPath?: string;
    view?: ViewPreset;
    className?: string;
    interactive?: boolean;
    active?: boolean;
    onCreated?: (state: any) => void;
}

function fitCamera(camera: THREE.PerspectiveCamera, box: THREE.Box3, offset: number, controls?: any) {
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

    cameraZ *= offset;

    const dist = cameraZ;

    return dist;
}

const SceneContent = ({ mode, glbPath, view, active, onReady }: any) => {
    const { scene } = useGLTF(glbPath) as any;
    const { camera, gl, invalidate } = useThree();
    const modelRef = useRef<THREE.Group>(null);
    const controlsRef = useRef<any>(null);

    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useMemo(() => {
        const c = new THREE.Color("#0ea5e9");
        clonedScene.traverse((child: any) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.name.toLowerCase().includes("upper") || child.name.toLowerCase().includes("shoe")) {
                    if (child.material) {
                        child.material = child.material.clone();
                        child.material.color = c;
                    }
                }
            }
        });
    }, [clonedScene]);

    useEffect(() => {
        if (!modelRef.current) return;
        const root = modelRef.current;

        const box = new THREE.Box3().setFromObject(root);
        const center = new THREE.Vector3();
        box.getCenter(center);
        root.position.sub(center);

        box.setFromObject(root);

        let offset = 1.2;
        if (mode === "hero") offset = 1.12;
        if (mode === "scrolly") offset = 1.18;
        if (mode === "product") offset = 1.02;
        if (mode === "thumb") offset = 1.20;
        if (mode === "modal") offset = 1.00;

        if (camera instanceof THREE.PerspectiveCamera) {
            const dist = fitCamera(camera, box, offset);

            let pos = new THREE.Vector3(dist * 0.8, dist * 0.4, dist * 1.0);

            if (view === "side") pos.set(dist * 1.2, 0, 0);
            if (view === "top") pos.set(0, dist * 1.2, 0);
            if (view === "heel") pos.set(-dist * 1.0, dist * 0.2, -dist * 0.5);
            if (view === "sole") pos.set(0, -dist * 1.2, 0); // tricky, might need rotation 
            if (view === "detail") pos.set(dist * 0.5, dist * 0.3, dist * 0.5);

            camera.position.copy(pos);
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();

            if (controlsRef.current) {
                controlsRef.current.target.set(0, 0, 0);
                controlsRef.current.minDistance = dist * 0.5;
                controlsRef.current.maxDistance = dist * 2.0;
                controlsRef.current.update();
            }

            if (onReady) onReady({ camera, model: root, radius: dist });
        }

        invalidate();

    }, [clonedScene, mode, view, camera, invalidate, onReady]);
    useFrame((state, delta) => {

        if (mode === "hero" && active) {
            if (modelRef.current) {
                modelRef.current.rotation.y += delta * 0.1;
                invalidate();
            }
        }

    });

    return (
        <>
            <primitive ref={modelRef} object={clonedScene} />

            <Environment preset="city" />
            <hemisphereLight intensity={0.5} groundColor="#111" />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
            <spotLight position={[-5, 5, 0]} intensity={0.5} angle={0.5} />

            <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />

            {(mode === "product" || mode === "modal") && (
                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    enableDamping
                    enablePan={false}
                />
            )}
        </>
    );
};

export function ShoeCanvas({
    mode,
    glbPath = "/shoe.glb",
    view = "front34",
    className,
    interactive = false,
    active = true,
    onCreated
}: ShoeCanvasProps) {
    const isThumb = mode === "thumb";


    const frameloop = (active) ? "demand" : "never";

    const [dpr, setDpr] = useState(1);
    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        setDpr(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.25));
    }, []);

    const [readyApi, setReadyApi] = useState<any>(null);

    useEffect(() => {
        if (readyApi && onCreated) onCreated(readyApi);
    }, [readyApi, onCreated]);

    return (
        <div className={cn("relative w-full h-full", className)}>
            <Canvas
                frameloop={frameloop}
                dpr={[1, dpr]}
                shadows={false}
                gl={{
                    powerPreference: "high-performance",
                    antialias: mode !== "thumb",
                    toneMapping: THREE.ACESFilmicToneMapping,
                    preserveDrawingBuffer: isThumb
                }}
                camera={{ fov: 45 }}
                onCreated={({ gl, camera, scene }) => {
                    gl.toneMappingExposure = 1.2;
                }}
                style={{ pointerEvents: interactive ? "auto" : "none" }}
            >
                <SceneContent
                    mode={mode}
                    glbPath={glbPath}
                    view={view}
                    active={active}
                    onReady={setReadyApi}
                />
            </Canvas>
        </div>
    );
}
