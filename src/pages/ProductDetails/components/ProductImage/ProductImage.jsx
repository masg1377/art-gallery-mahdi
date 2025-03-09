import "./ProductImage.css"; // Import CSS for styling
import Tilt from "react-parallax-tilt"; // Import Tilt component for parallax effect

import React from "react";
import useWindowDimensions from "../../../../helpers/windowHelper"; // Custom hook to get window dimensions
import { ImageMobileItem } from "./ImageMobileItem/ImageMobileItem"; // Import mobile view component

export const ProductImage = ({ selectedProduct }) => {
  const { width } = useWindowDimensions(); // Get current window width

  return (
    <Tilt
      tiltEnable={false} // Disable tilt effect
      scale={1.15} // Set zoom scale on hover
      transitionSpeed={1000} // Speed of the zoom transition
      className="product-details-image" // Apply custom CSS class
    >
      {/* Conditional rendering based on screen size */}
      {width < 768 ? (
        // Show mobile version of the image if width is smaller than 768px
        <ImageMobileItem selectedProduct={selectedProduct} />
      ) : (
        // Show regular image for larger screens
        <img src={selectedProduct?.img} alt={selectedProduct.name} />
      )}
    </Tilt>
  );
};
