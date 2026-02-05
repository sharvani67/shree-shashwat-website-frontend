import React, { useRef, useState } from 'react';

const ZoomImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  const containerRef = useRef(null);

  const calculatePosition = (clientX, clientY) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseMove = (e) => {
    calculatePosition(e.pageX, e.pageY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      calculatePosition(touch.clientX, touch.clientY);
    }
  };

  const handleClick = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick} // Tap to zoom on mobile
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => {
        setIsZoomed(false);
        setBackgroundPosition('center');
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        backgroundImage: isZoomed ? `url(${src})` : 'none',
        backgroundSize: isZoomed ? '200%' : 'contain',
        backgroundPosition: isZoomed ? backgroundPosition : 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {!isZoomed && (
        <img
          src={src}
          alt={alt}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
            borderRadius: '8px',
            display: 'block',
          }}
        />
      )}
    </div>
  );
};

export default ZoomImage;
