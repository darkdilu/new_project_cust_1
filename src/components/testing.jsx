import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';
import Shirt from '../../public/Binu_model'; // Adjust import path if needed
import style from './testing.module.css';
import image1 from '../../public/material1.avif';
import image2 from '../../public/material2.jpg';
import image3 from '../../public/material3.jpg';
import image4 from '../../public/material4.jpg'
import image5 from '../../public/material6.jpg';
import image6 from '../../public/material7.jpg'
const shirtParts = [
  {
    name: "Front",
    images: [
      { src: image1, price: "₹50" },
      { src: image2, price: "₹55" },
      { src: image3, price: "₹57" },
    ],
  },
  {
    name: "Back",
    images: [
      { src: image3, price: "₹45" },
      { src: image6, price: "₹55" },
      { src: image5, price: "₹85" },
    ],
  },
  {
    name: "Right Hand",
    images: [
      { src: image1, price: "₹60" },
      { src: image3, price: "₹65" },
      { src: image4, price: "₹95" },
    ],
  },
  {
    name: "Left Hand",
    images: [
      { src: image2, price: "₹70" },
      { src: image1, price: "₹55" },
      { src: image6, price: "₹55" },
      { src: image4, price: "₹35" },
    ],
  },
];

const Testing = () => {
  // State to track selected image and price for each part
  const [selectedImages, setSelectedImages] = useState({
    Front: { src: image1, price: 0 },
    Back: { src: null, price: 0 },
    "Right Hand": { src: null, price: 0 },
    "Left Hand": { src: null, price: 0 },
  });

  // State to track the total price
  const [totalPrice, setTotalPrice] = useState(0);

  // State to track selected part
  const [partSelected, setPartSelected] = useState('');

  // Update total price whenever selectedImages change
  useEffect(() => {
    const price = Object.values(selectedImages).reduce((sum, { price }) => sum + (price || 0), 0);
    setTotalPrice(price);
  }, [selectedImages]);

  const handlePartSelect = (partName) => {
    setPartSelected(partName);
    // Reset image to default if part is selected
    setSelectedImages(prev => ({
      ...prev,
      [partName]: prev[partName] || { src: shirtParts.find(part => part.name === partName)?.images[0]?.src || null, price: 0 },
    }));
  };

  const handleImageSelect = (partName, imageData) => {
    // Update image and price for the selected part
    setSelectedImages(prev => ({
      ...prev,
      [partName]: { src: imageData.src, price: parseInt(imageData.price.replace('₹', ''), 10) || 0 },
    }));
  };

  return (
    <div className={style.canvas}>
      <Canvas>
        <PresentationControls speed={4} global polar={[0.4, 0, 0]}>
          <ambientLight />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Shirt selectedImages={selectedImages}selectedPart={partSelected}/>
        </PresentationControls>
      </Canvas>
      <div className={style.partSelector}>
        {shirtParts.map(part => (
          <React.Fragment key={part.name}>
            <b>/</b>&nbsp;&nbsp;
            <b onClick={() => handlePartSelect(part.name)}>
              {part.name}
            </b>&nbsp;&nbsp;
          </React.Fragment>
        ))}
      </div>
      {partSelected && (
        <div className={style.partDetails}>
          <h2>{partSelected}</h2>
          <div className={style.imageGallery}>
            {shirtParts.find(part => part.name === partSelected)?.images.map((img, index) => (
              <div key={index} className={style.imageContainer}>
                <img
                  src={img.src}
                  alt={partSelected}
                  onClick={() => handleImageSelect(partSelected, img)}
                  style={{ border: selectedImages[partSelected]?.src === img.src ? '2px solid red' : 'none' }}
                />
                <p>Price: {img.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={style.totalPrice}>
        <h3>Total Price: ₹{totalPrice}</h3>
      </div>
    </div>
  );
};

export default Testing;
