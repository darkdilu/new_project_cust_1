import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import GLTFViewer from "../ProductScreen2/3d_model";

import NavBar from "../../common/NavBar";

// ... (materialType, buttonType, and materialImages2 remain unchanged)

export default function ProductScreen3() {
  const [showMaterials, setShowMaterials] = useState(false);
  const [showButtonTypes, setShowButtonTypes] = useState(false);
  const [material, setMaterial] = useState("none");
  const [button, setButton] = useState("bg-black");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [modalStyle, setModalStyle] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  // ... (fetchMaterialImages function remains unchanged)

  function handleMaterialClick(material, event) {
    setMaterial(material);
    setCurrentImages(materialImages[material] || []);
    const buttonRect = event.target.getBoundingClientRect();
    setModalStyle({
      top: buttonRect.bottom + window.scrollY - 370,
      left: buttonRect.left + window.scrollX,
    });
    setModalIsOpen(true);
  }

  function handleImageClick(image) {
    setSelectedImage(image);
    closeModal(); // Close modal after selecting an image
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <NavBar />
      <div className="w-full flex flex-col gap-5 justify-center items-center mt-10 px-2 py-10 md:p-10">
        <div className="py-5 px-10 md:p-5 bg-gray-800 rounded-lg" style={{ width: '1100px', height: '450px' }}>
          <GLTFViewer url="http://localhost:3000/api/gltf/get_gltf/crop_top.gltf" textureUrl={selectedImage} />
        </div>
        <div className="bg-zinc-800 w-full py-5 p-2 md:p-5 rounded-t-3xl ">
          <div className="flex flex-col md:flex-row gap-5 justify-between md:items-center">
            <div className="flex gap-3 md:ms-5">
              <button
                onClick={handleMaterials}
                className="flex justify-between items-center text-sm bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link"
              >
                <span>MATERIALS</span>
                <span className="md:text-xl">
                  <IoMdArrowDropdown />
                </span>
              </button>
              <button
                onClick={handleButtonType}
                className="flex justify-between items-center text-sm bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link"
              >
                <span>BUTTON TYPE</span>
                <span className="text-xl">
                  <IoMdArrowDropdown />
                </span>
              </button>
            </div>
            <div className="flex gap-3 me-5">
              <button className="bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link">
                PREVIOUS
              </button>
              <button className="bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link">
                BUY
              </button>
            </div>
          </div>
          {showMaterials && (
            <div className="p-5 grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {materialType.map((x) => (
                <button
                  key={x.id}
                  onClick={(e) => handleMaterialClick(x.material, e)}
                  className="bg-neutral-900 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link"
                >
                  {x.material.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          {showButtonTypes && (
            <div className="p-5 grid gap-2 grid-cols-3 md:grid-cols-6">
              {buttonType.map((x) => (
                <div
                  key={x.id}
                  onClick={() => setButton(x.color)}
                  className={`${x.color} w-10 h-10 rounded-full m-3 cursor-pointer hover:w-11`}
                ></div>
              ))}
            </div>
          )}

          <h1 className="p-5 text-zinc-200">Material Selected: {material}</h1>
          <h1 className="px-5 text-zinc-200 flex gap-2 items-center">
            Button : <div className={`w-5 h-5 rounded-full ${button}`}></div>
          </h1>
        </div>
        {modalIsOpen && (
          <div
            className="fixed z-50 p-5 bg-white rounded shadow-lg"
            style={{ top: modalStyle.top, left: modalStyle.left }}
          >
            <h2>{material.toUpperCase()} Images</h2>
            <div className="grid gap-2 grid-cols-3 lg:grid-cols-4 mt-3">
              {currentImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${material}-${index}`}
                  className="w-12 h-12 cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
            <br />
            <button
              onClick={closeModal}
              className="bg-neutral-500 text-zinc-200 p-2 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}
