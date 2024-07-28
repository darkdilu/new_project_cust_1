import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import defaultImage from './material3.jpg'; // Default texture

export default function Model(props) {
  const { nodes } = useGLTF('/binu_model.glb');
  
  // Texture for each part based on selected images
  const textures = {
    Front: useTexture(props.selectedImages.Front.src || defaultImage),
    Back: useTexture(props.selectedImages.Back.src || defaultImage),
    "Right Hand": useTexture(props.selectedImages["Right Hand"].src || defaultImage),
    "Left Hand": useTexture(props.selectedImages["Left Hand"].src || defaultImage),
  };

  return (
    <group {...props} dispose={null} scale={[5, 5, 5]} position={[0, -6, 0]}>
      {/* Left Sleeve */}
      <mesh geometry={nodes.L_Sleeve_Cloth1.geometry}>
        <meshStandardMaterial map={textures["Right Hand"]} />
      </mesh>
      
      {/* Right Sleeve */}
      <mesh geometry={nodes.R_Sleeve_Cloth2.geometry}>
        <meshStandardMaterial map={textures["Left Hand"]} />
      </mesh>

      {/* Front */}
      <mesh geometry={nodes.Mesh.geometry}>
        <meshStandardMaterial map={textures.Front} />
      </mesh>

      {/* Back */}
      <mesh geometry={nodes.Mesh_1.geometry}>
        <meshStandardMaterial map={textures.Back} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/binu_model.glb');
