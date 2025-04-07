import React, { useState, useEffect } from 'react';
import logo2 from "../../../assets/images/icons/Logo2.png";
import logoNoLabel from "../../../assets/images/icons/LogoNoLabel.png";
import logoMinimalist from "../../../assets/images/icons/LogoMinimalist.png";

// Tipos das props (TypeScript)
type LogoProps = {
  forceVersion?: 'full' | 'no-label' | 'minimalist';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;  // Nova prop opcional
};

function Logo({ forceVersion, className, style, onClick }: LogoProps) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getLogoSource = () => {
    if (forceVersion) {
      switch (forceVersion) {
        case 'minimalist':
          return logoMinimalist;
        case 'no-label':
          return logoNoLabel;
        case 'full':
        default:
          return logo2;
      }
    }
    
    if (windowSize.width < 768) {
      return logoMinimalist;
    } else if (windowSize.width < 992) {
      return logoNoLabel;
    } else {
      return logo2;
    }
  };

  return (
    <img 
      src={getLogoSource()} 
      alt="Logo" 
      className={className}
      style={{ 
        maxHeight: 'auto', 
        maxWidth: getLogoSource() != logoMinimalist ? "70%" : "40%",
        ...style,
        cursor: onClick ? 'pointer' : undefined // Mostra cursor pointer apenas se tiver onClick
      }}
      onClick={onClick} // onClick só será usado se for fornecido
    />
  );
}

export default Logo;