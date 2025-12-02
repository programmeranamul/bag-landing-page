"use client";

import React, { Suspense } from "react";
import SwatchWrapper from "./SwatchWrapper";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Environment,
  EnvironmentMap,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Model } from "./Model";

function MyCanvas({ data, swatchData, handleSwatchClick }) {
  const bag = useGLTF("/bag.glb");
  console.log("bag in canvas", bag);
  return (
    <div className="order-1 lg:order-2 relative h-3/5 lg:h-full w-full lg:w-1/2">
      <Canvas>
        <OrbitControls />
        <Environment preset="city" background={false} />
        <Suspense fallback={null}>
          <Model position={[0, -2.5, 0]} scale={0.065} />
        </Suspense>

        {/* <primitive object={bag.scene} position={[0, -30, 0]} scale={0.30} /> */}
      </Canvas>
      <SwatchWrapper
        activeData={data}
        swatchData={swatchData}
        handleSwatchClick={handleSwatchClick}
      />
    </div>
  );
}

export default MyCanvas;
