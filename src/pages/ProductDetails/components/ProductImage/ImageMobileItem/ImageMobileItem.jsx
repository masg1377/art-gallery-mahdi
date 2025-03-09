import React, { useState } from "react";

export const ImageMobileItem = ({ selectedProduct }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Track mouse position for image movement

  const handleMouseMove = (e) => {
    // Get the bounding rectangle of the image container
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();

    // Calculate the mouse position relative to the image container, used for the image movement
    const x = -((e.clientX - left) / width - 0.5) * 50; 
    const y = -((e.clientY - top) / height - 0.5) * 50;

    // Update the position state based on mouse movement
    setPosition({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove} // Trigger mouse move to calculate new image position
      onMouseLeave={() => setPosition({ x: 0, y: 0 })} // Reset image position when mouse leaves
    >
      <img
        src={selectedProduct?.img} // Image source based on selected product
        alt={selectedProduct.name} // Alt text using product name
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`, // Moves image based on mouse position
        }}
      />
    </div>
  );
};
