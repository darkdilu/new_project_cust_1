import { Canvas } from "@react-three/fiber";

import Shirt from '../../public/New_tshirt10'
import { ContactShadows, OrbitControls, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";
import Background from "three/src/renderers/common/Background.js";



function Canvas2() {

  
  
    return ( <>
   <div style={{ backgroundColor: 'green'}}>
    <Canvas  camera={{ position: [-10, 0, -10], fov: 55 } } 
    
    

    >
       
         <PresentationControls
        speed={1.5}
        global
        polar={[-0.1, Math.PI / 4]}
        rotation={[Math.PI / 8, Math.PI / 4, 0]}
      ></PresentationControls>
     
          <ambientLight/>
    <pointLight position={[10, 10, 10]} intensity={1.5} />

    <ContactShadows
      resolution={2048}
      position={[0, 4, 5]}
      opacity={10}
      scale={10}
      blur={2}
      far={0.8}
    />
    <Suspense fallback={null}>
    
<Shirt />

      

      </Suspense>


      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls  />
    </Canvas>
    
    </div>
    </> );
}

export default Canvas2;