/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 sleeve_dimension.glb 
*/


import React from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import goku from './7.png'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/sleeve_dimension.glb')

  const texture = useTexture(goku)


  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.pCylinder3.geometry} material={materials.R_decal_mesh_text} position={[0.395, 0.104, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} >

      <Decal  position={[-0.3,0.1,-1.5]} rotation={[-1.7,1,0]} scale={[2.5, 2.5, 2.5]} map={texture} />

      </mesh>
    </group>
  )
}

useGLTF.preload('/sleeve_dimension.glb')
