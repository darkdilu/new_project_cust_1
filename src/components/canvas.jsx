import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import image from '../../public/material2.jpg';

const GLTFViewer = ({ url }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => {
        const blob = new Blob([data], { type: 'model/gltf+json' });
        const objectUrl = URL.createObjectURL(blob);
        console.log(objectUrl);
        setModel(objectUrl);
      })
      .catch(error => console.error('Error fetching the GLTF model:', error));
  }, [url]);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {model && <Model url={model} scale={[5, 5, 5]} position={[0, -6, 0]} />}
      <OrbitControls />
    </Canvas>
  );
};

const Model = ({ url, scale, position }) => {
  const ref = useRef();
  const { scene, nodes, materials } = useGLTF(url);
  const texture = useTexture(image);

  useEffect(() => {
    if (scene) {
      let targetMesh = null;

      // Traverse the scene to find the specific mesh
      scene.traverse((child) => {
        if (child.isMesh) {
          // Check if this mesh has the desired geometry and material
          if (child.geometry === nodes.Pattern_24855.geometry && child.material === materials.Cotton_Canvas_FRONT_2656) {
            targetMesh = child;
          }
        }
      });

      // Log the found mesh and apply the new material
      if (targetMesh) {
        console.log('Target Mesh found:', targetMesh);
        targetMesh.material = new MeshStandardMaterial({
          map: texture,
        });
      }
    }
  }, [scene, nodes, materials, texture]);

  return <primitive object={scene} ref={ref} scale={scale} position={position} />;
};

export default GLTFViewer;
