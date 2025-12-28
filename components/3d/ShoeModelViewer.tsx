"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, ContactShadows, Center } from "@react-three/drei";
import { ShoeModel } from "./ShoeModel";
import { cn } from "@/lib/utils";
import { Variant } from "@/components/product/useProductState";

interface ShoeModelViewerProps {
    variant: Variant;
    preset?: "home" | "product";
    className?: string;
    onInteract?: () => void;
    children?: React.ReactNode;
}

export function ShoeModelViewer({
    variant,
    preset = "home",
    className,
    onInteract,
    children
}: ShoeModelViewerProps) {
    const isHome = preset === "home";

    const config = {
        home: {
            cameraPosition: [0, 0, 4] as [number, number, number],
            fov: 45,
            autoRotate: true,
            enableZoom: false,
            scale: 1.4,
            float: true,
            floatIntensity: 1,
            shadowOpacity: 0.5,
        },
        product: {
            cameraPosition: [0, 0, 5] as [number, number, number],
            fov: 40,
            autoRotate: false,
            enableZoom: true,
            scale: 1.1,
            float: false,
            floatIntensity: 0,
            shadowOpacity: 0.4,
        }
    }[preset];

    return (
        <div className={cn("relative w-full h-full min-h-[300px]", className)}>
            <Canvas
                camera={{ position: config.cameraPosition, fov: config.fov }}
                className="w-full h-full"
                dpr={[1, 2]}
                onCreated={(state) => {
                    state.camera.lookAt(0, 0, 0);
                }}
            >
                <ambientLight intensity={isHome ? 0.5 : 0.7} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={isHome ? 1 : 1.2}
                />

                <Environment preset="city" />

                <group>
                    {config.float ? (
                        <Float
                            speed={2}
                            rotationIntensity={0.5}
                            floatIntensity={config.floatIntensity}
                            floatingRange={[-0.1, 0.1]}
                        >
                            <ModelWithSize variant={variant} scale={config.scale} />
                        </Float>
                    ) : (
                        <ModelWithSize variant={variant} scale={config.scale} />
                    )}

                    {children}
                </group>

                <OrbitControls
                    enableZoom={config.enableZoom}
                    autoRotate={config.autoRotate}
                    autoRotateSpeed={1.5}
                    minDistance={3}
                    maxDistance={8}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    makeDefault
                    onStart={onInteract}
                />

                <ContactShadows
                    position={[0, -1.2, 0]}
                    opacity={config.shadowOpacity}
                    scale={10}
                    blur={2.5}
                    far={4}
                />
            </Canvas>
        </div>
    );
}

function ModelWithSize({ variant, scale }: { variant: Variant, scale: number }) {
    return (
        <Center>
            <ShoeModel variant={variant} scale={scale} />
        </Center>
    );
}
