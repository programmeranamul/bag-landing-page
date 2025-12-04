import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

export function Model({ data, ...props }) {
  const { nodes, materials } = useGLTF("/bag.glb");

  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  // 2. 🔥 CLONE the Nodes/Materials ONCE
  // This ensures we work with a unique, mutable copy that won't be shared.
  const clonedNodes = useMemo(() => {
    // We traverse the original nodes and clone the meshes and their materials.
    const freshNodes = {};
    for (const key in nodes) {
      const node = nodes[key];
      if (node.isMesh) {
        // Clone the mesh object itself (including geometry)
        freshNodes[key] = node.clone();
        // Crucially, clone the material too, if it exists
        if (node.material) {
          freshNodes[key].material = node.material.clone();
        }
      } else {
        // Keep other objects (groups, cameras, etc.)
        freshNodes[key] = node.clone(); // Clone groups for safety
      }
    }
    return freshNodes;
  }, [nodes]);
  // Dependency on the original nodes object: only runs on initial load.

  // 3. Prepare the target color map
  const colorMap = useMemo(() => {
    if (!data?.itemList) return {};
    return Object.fromEntries(
      Object.entries(data.itemList).map(([name, item]) => [
        name,
        new THREE.Color(item.color).convertSRGBToLinear(),
      ])
    );
  }, [data]);

  // 4. Animation Effect (Now works on the Cloned Nodes)
  useEffect(() => {
    // Traverse the CLONED nodes
    for (const meshName in clonedNodes) {
      const element = clonedNodes[meshName];

      // Check if the element is a mesh AND if we have color data for it
      if (element.isMesh && element.material && colorMap[element.name]) {
        const targetColor = colorMap[element.name];

        if (element.material.color) {
          gsap.to(element.material.color, {
            r: targetColor.r,
            g: targetColor.g,
            b: targetColor.b,
            ease: "power3.inOut",
            duration: 0.8,
            onComplete: () => {
              // Optional: You can force an update after animation, but GSAP usually handles it.
              // element.material.version++;
            },
          });
        }
      }
    }
  }, [colorMap, clonedNodes]); // Reruns when data changes

  // 5. Render the Cloned Nodes (replace original `nodes` references)

  // NOTE: You must update the geometry and material references in your JSX
  // to point to the clonedNodes.
  const getMeshProps = (name) => ({
    geometry: clonedNodes[name].geometry,
    material: clonedNodes[name].material,
  });

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <group position={[-3.71, 26.419, 21.143]} scale={0.227}>
        <group
          position={[20.25, 42.677, 13.591]}
          rotation={[-1.574, 0.049, 0.114]}
          scale={0.821}
        >
          {/* Use geometry/material from clonedNodes for 'metal' */}
          <mesh
            castShadow
            receiveShadow
            {...getMeshProps("metal")}
            position={[-1.787, 0.408, 17.861]}
            rotation={[0.573, -0.109, -1.635]}
            scale={1.944}
          />
        </group>
        {/* Use geometry/material from clonedNodes for 'bag' */}
        <mesh
          castShadow
          receiveShadow
          {...getMeshProps("bag")}
          position={[-133.113, 4.691, -154.308]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        {/* Use geometry/material from clonedNodes for 'strap' */}
        <mesh
          castShadow
          receiveShadow
          {...getMeshProps("strap")}
          position={[50.739, 6.33, -302.821]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      {/* 'shadow_plane' mesh uses the material from the original 'materials' object. 
          If you don't need to change its color, this is fine. 
          Otherwise, you'd need to clone it too. */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shadow_plane.geometry}
        material={materials.Material}
        scale={54.265}
      />
    </group>
  );
}

useGLTF.preload("/bag.glb");
