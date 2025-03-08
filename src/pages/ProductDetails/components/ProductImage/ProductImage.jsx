import "./ProductImage.css";
import Tilt from "react-parallax-tilt";

import React from "react";
import useWindowDimensions from "../../../../helpers/windowHelper";
import { ImageMobileItem } from "./ImageMobileItem/ImageMobileItem";

export const ProductImage = ({ selectedProduct }) => {
  const { width } = useWindowDimensions();

  return (
    <Tilt
      tiltEnable={false}
      scale={1.15}
      transitionSpeed={1000}
      className="product-details-image"
    >
      {width < 768 ? (
        <ImageMobileItem selectedProduct={selectedProduct} />
      ) : (
        <img src={selectedProduct?.img} alt={selectedProduct.name} />
      )}
    </Tilt>
  );
};
