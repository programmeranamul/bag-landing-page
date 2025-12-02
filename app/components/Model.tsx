import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/bag.glb')
  console.log("model", materials)
  return (
    <group {...props} dispose={null}>
      <group position={[-3.71, 26.419, 21.143]} scale={0.227}>
        <group position={[20.25, 42.677, 13.591]} rotation={[-1.574, 0.049, 0.114]} scale={0.821}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.metal.geometry}
            material={materials.base_Metal}
            position={[-1.787, 0.408, 17.861]}
            rotation={[0.573, -0.109, -1.635]}
            scale={1.944}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bag.geometry}
          material={materials.Bag_Matte}
          position={[-133.113, 4.691, -154.308]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.strap.geometry}
          material={materials.Leather}
          position={[50.739, 6.33, -302.821]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.shadow_plane.geometry}
        material={materials.Material}
        scale={54.265}
      />
    </group>
  )
}

useGLTF.preload('/bag.glb')