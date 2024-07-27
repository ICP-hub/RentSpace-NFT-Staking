import React, { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';

const IMGComp = ({ src, hashVal = "", alt, ind, height, width, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;

    return () => {
      img.onload = null; // Cleanup to avoid potential memory leaks
    };
  }, [src]);

  return (
    <div className={className}>
      {!imageLoaded && (
        <Blurhash
          className={className}
          hash={hashVal.length >= 6 ? hashVal : 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'}
          resolutionX={32}
          resolutionY={32}
          height={height}
          width={width}
          punch={1}
        />
      )}
      {imageLoaded && (
        <img
          className={className}
          key={ind}
          src={src}
          alt={alt}
        
        />
      )}
    </div>
  );
};


export default IMGComp;
