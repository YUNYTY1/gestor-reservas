import React from 'react';

function Image({
  src,
  alt = "Image",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.onerror = null; // evita loop infinito
        e.target.src = "/images/no_image.png"; // ruta correcta en public
      }}
      {...props}
    />
  );
}

export default Image;
