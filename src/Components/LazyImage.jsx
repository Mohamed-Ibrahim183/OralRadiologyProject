import { LazyLoadImage } from "react-lazy-load-image-component";

import React from "react";

const LazyImage = ({ src, alt }) => {
  return <LazyLoadImage src={src} alt={alt} effect="blur" threshold={500} />;
};

export default LazyImage;
