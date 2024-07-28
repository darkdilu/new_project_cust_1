import React, { useRef } from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import goku from './goku.jpg'

export default function Model(props) {
  const texture = useTexture(goku)
  const { nodes, materials } = useGLTF('/new_tshirt.glb')
  const decalRef = useRef()

  // Mouse position state
  const mouse = { x: 0, y: 0 }

  // Update mouse coordinates on mouse move
  const handleMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 0.5
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 0.5
  }

  // Add event listener for mouse move
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Update decal position based on mouse coordinates
  useFrame(() => {
    if (decalRef.current) {
      decalRef.current.position.x = mouse.x
      decalRef.current.position.y = mouse.y
      decalRef.current.scale.set(1, 1, 1) // You can modify this to dynamically change the scale
    }
  })

  return (
    <group {...props} dispose={null} scale={[7, 7, 7]}>
      <mesh geometry={nodes.T_Shirt_Front.geometry} material={materials.Front_Shader_1} />
      <mesh geometry={nodes.T_Shirt_Back.geometry} material={materials.Back_Shader_2} />
      <mesh geometry={nodes.T_Shirt_Decal_Front1.geometry} material={materials.Decal_shader} position={[0, 0, 0.001]} />
      <mesh geometry={nodes.pCylinder1.geometry} material={materials.R_Sleeve_Shader_Yellow} position={[0.29, 0.014, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={0.051}>
      
      <Decal  position={[-0.3,0.1,-1.5]} rotation={[-1.7,-1,0]} scale={[1.7, 1.7, 1.7]} map={texture} />
      </mesh>
      <mesh geometry={nodes.pCylinder2.geometry} material={materials.L_Sleeve_Shader_Pink} position={[-0.3, 0.02, -0.009]} rotation={[Math.PI / 2, 0, 3.081]} scale={0.051} />
      <mesh geometry={nodes.polySurface1.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface10.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface11.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface12.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface13.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface14.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface15.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface16.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface17.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface18.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface19.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface2.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface20.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface21.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface22.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface23.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface24.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface25.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface26.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface27.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface3.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface4.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface6.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface7.geometry} material={materials.lambert2} />
      <mesh geometry={nodes.polySurface9.geometry} material={materials.lambert2} />
    </group>
  )
}

useGLTF.preload('/new_tshirt.glb')
