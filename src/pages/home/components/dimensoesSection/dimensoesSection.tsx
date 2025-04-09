import React, { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './dimensoes-section.css';
import dimensoes  from '../../../../utils/const.tsx';
import DimensionLinkButton from './dimensionLinkButton.tsx';

const DimensoesSection: FC = () => {
  const dimensoesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for dimension items when they come into view
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

    const dimensionItems = document.querySelectorAll('.dimensao-item');
    dimensionItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      dimensionItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [dimensoes.dimensoesColumn1, dimensoes.dimensoesColumn2]);

  // Calculate half of the list for two-column layout
  //const halfLength = Math.ceil(Object.keys(dimensoes).length / 2);
  //const firstColumnItems = Object.keys(dimensoes).slice(0, halfLength);
  //const secondColumnItems = Object.keys(dimensoes).slice(halfLength);

  return (
    <div id="dimensoesPai">
      <h2 className="text-center pt-3">Escolha uma dimensão</h2>

      <div id="dimensoes" className="d-flex flex-wrap px-md-5 py-1" ref={dimensoesRef}>
        {/* First column */}
        <div className="col-md-6 d-flex flex-column px-md-5">
          {Object.entries(dimensoes.dimensoesColumn1).map(([item, value]) => (
            <DimensionLinkButton to={`/${item}`} color={dimensoes.dimensaoCores[item]} key={item} increaseIcon={dimensoes.dimensaoAumentaIcone[item]}>
              <div className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
                <div
                  className="icon-color"
                  style={{ maskImage: `url(${value})`,
                  WebkitMaskImage: `url(${value})`, // defina a cor aqui se quiser
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain', }}
                />
              </div>
            </DimensionLinkButton>
          ))}
        </div>

        {/* Second column */}
        <div className="col-md-6 d-flex flex-column px-md-5">
          {Object.entries(dimensoes.dimensoesColumn2).map(([item, value]) => (
            <DimensionLinkButton to={`/${item}`} color={dimensoes.dimensaoCores[item]} key={item} increaseIcon={dimensoes.dimensaoAumentaIcone[item]}>
              <div className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
                <div
                  className="icon-color"
                  style={{ maskImage: `url(${value})`,
                  WebkitMaskImage: `url(${value})`, // defina a cor aqui se quiser
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain', }}
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
