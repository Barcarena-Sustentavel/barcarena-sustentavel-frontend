import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import './dimensoes-section.css';
import dimensoes from '../../../../utils/const.tsx';
import DimensionLinkButton from './dimensionLinkButton.tsx';

const DimensoesSection: FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const {
    dimensoesColumn1,
    dimensoesColumn2,
    dimensoesColumn3,
    dimensoesCores123,
    dimensaoAumentaIcone,
    isLoaded,
    setIsLoaded
  } = dimensoes.GetAllConst();
  const dimensoesColumn123 ={...dimensoesColumn1, ...dimensoesColumn2, dimensoesColumn3}
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true)

    // Criar o observer uma vez
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      // Cleanup: desconectar o observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  },[]);

  // Callback ref para observar cada elemento assim que é montado
  const dimensionItemRef = useCallback((node: HTMLDivElement | null) => {
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);

  return (
    <div id="dimensoesPai">
      <h2 className="text-center pt-3">Escolha uma dimensão</h2>

      <div id="dimensoes" className="d-flex flex-wrap px-md-5 py-1">
        {/* First column */}
        <div className="col-30 d-flex flex-column px-md-5" style={{marginLeft: "auto"}}>
          {isLoaded && Object.entries(dimensoesColumn1).map(([item, value]) => (
            <DimensionLinkButton
              to={`/${item}`}
              color={dimensoesCores123[item]}
              key={item}
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div ref={dimensionItemRef} className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
                <div
                  className="icon-color"
                  style={{
                    maskImage: `url(${value})`,
                    WebkitMaskImage: `url(${value})`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                  }}
                />
              </div>
            </DimensionLinkButton>
          ))}
        </div>

        {/* Second column */}
        <div className="col-30 d-flex flex-column px-md-5">
          {isLoaded && Object.entries(dimensoesColumn2).map(([item, value]) => (
            <DimensionLinkButton
              to={`/${item}`}
              color={dimensoesCores123[item]}
              key={item}
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div ref={dimensionItemRef} className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
                <div
                  className="icon-color"
                  style={{
                    maskImage: `url(${value})`,
                    WebkitMaskImage: `url(${value})`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                  }}
                />
              </div>
            </DimensionLinkButton>
          ))}
        </div>

        <div className="col-30 d-flex flex-column px-md-5" style={{marginRight: "auto"}}>
          {isLoaded && Object.entries(dimensoesColumn3).map(([item, value]) => (
            <DimensionLinkButton
              to={`/${item}`}
              color={dimensoesCores123[item]}
              key={item}
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div ref={dimensionItemRef} className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
                <div
                  className="icon-color"
                  style={{
                    maskImage: `url(${value})`,
                    WebkitMaskImage: `url(${value})`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                  }}
                />
              </div>
            </DimensionLinkButton>
          ))}
        </div>
      </div>
      <div id="dimensoesDropdown">
        <button 
        className="dropdown-button" 
        onClick={() => setIsOpen(!isOpen)}
        >
        <h2>Escolha uma Dimensão</h2>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
        </button>
        {isOpen && isLoaded && Object.entries(dimensoesColumn123).map(([item, value]) => (
            <DimensionLinkButton
              to={`/${item}`}
              color={dimensoesCores123[item]}
              key={item}
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div ref={dimensionItemRef} className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
                <div
                  className="icon-color"
                  style={{
                    maskImage: `url(${value})`,
                    WebkitMaskImage: `url(${value})`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                  }}
                />
              </div>
            </DimensionLinkButton>
          ))}
      </div>
    </div>
  );
};

export default DimensoesSection;
