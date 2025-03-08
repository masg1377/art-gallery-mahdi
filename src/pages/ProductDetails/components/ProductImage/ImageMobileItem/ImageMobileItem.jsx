import React, { useState } from "react";

export const ImageMobileItem = ({ selectedProduct }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { width, height, left, top } =
      e.currentTarget.getBoundingClientRect();
    const x = -((e.clientX - left) / width - 0.5) * 50;
    const y = -((e.clientY - top) / height - 0.5) * 50;

    setPosition({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      <img
        src={selectedProduct?.img}
        alt={selectedProduct.name}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`, // Moves image
        }}
      />
    </div>
  );
};