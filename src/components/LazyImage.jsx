import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(entry.target);
        }
      });
    });

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={imgRef} className={className}>
      {imageSrc ? (
        <img src={imageSrc} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-pink-100 to-purple-100 animate-pulse" />
      )}
    </div>
  );
};

export default LazyImage;