"use client";

import React, { Suspense } from "react";
import SwatchWrapper from "./SwatchWrapper";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Model } from "./Model";
import * as THREE from "three";

function MyCanvas({ data, swatchData, handleSwatchClick }) {
  return (
    <div className="order-1 lg:order-2 relative h-3/5 lg:h-full w-full lg:w-1/2">
      <Canvas
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          antialias: true,
          alpha: true,
        }}
      >
        <OrbitControls />
        <Environment files="/default.hdr" background={false} />
        <Suspense fallback={null}>
          <Model data={data} position={[0, -2.2, 0]} scale={0.05} />
        </Suspense>
      </Canvas>
      <SwatchWrapper
        activeData={data}
        swatchData={swatchData}
        handleSwatchClick={handleSwatchClick}
      />
      <div className="highlight w-2/5 h-1/2 bg-[#D7B172] absolute inset-x-40 top-0 -z-10 rounded-br-full rounded-bl-full md:inset-x-60  lg:inset-x-40"></div>
    </div>
  );
}

export default MyCanvas;
