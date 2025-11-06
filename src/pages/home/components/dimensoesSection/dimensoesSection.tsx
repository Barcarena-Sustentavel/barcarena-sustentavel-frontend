import React, { FC, useEffect, useRef } from 'react';
import './dimensoes-section.css';
import dimensoes from '../../../../utils/const.tsx';
import DimensionLinkButton from './dimensionLinkButton.tsx';

const DimensoesSection: FC = () => {
  const dimensoesRef = useRef<HTMLDivElement>(null);
  const {
    dimensoesColumn1,
    dimensoesColumn2,
    dimensoesColumn3,
    dimensoesCores123,
    dimensaoAumentaIcone,
    isLoaded,
  } = dimensoes.GetAllConst();
  const dimensoesColumn12 ={...dimensoesColumn1, ...dimensoesColumn2}
  useEffect(() => {
    console.log("reload")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      const dimensionItems = document.querySelectorAll('.dimensao-item');
      dimensionItems.forEach((item) => {
        observer.observe(item);
      });
    }, 500);

    return () => {
      const dimensionItems = document.querySelectorAll('.dimensao-item');
      dimensionItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  },[]);

  return (
    <div id="dimensoesPai">
      <h2 className="text-center pt-3">Escolha uma dimensão</h2>

      <div id="dimensoes" className="d-flex flex-wrap px-md-5 py-1"  ref={dimensoesRef}>
        {/* First column */}
        <div className="col-30 d-flex flex-column px-md-5" style={{marginLeft: "auto"}}>
          {/*isLoaded &&*/ Object.entries(dimensoesColumn1).map(([item, value]) => (
            <DimensionLinkButton 
              to={`/${item}`} 
              color={dimensoesCores123[item]} 
              key={item} 
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
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
          {/*isLoaded &&*/ Object.entries(dimensoesColumn2).map(([item, value]) => (
            <DimensionLinkButton 
              to={`/${item}`} 
              color={dimensoesCores123[item]} 
              key={item} 
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
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
          {/*isLoaded &&*/ Object.entries(dimensoesColumn3).map(([item, value]) => (
            <DimensionLinkButton 
              to={`/${item}`} 
              color={dimensoesCores123[item]} 
              key={item} 
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
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
    </div>
  );
};

export default DimensoesSection;
