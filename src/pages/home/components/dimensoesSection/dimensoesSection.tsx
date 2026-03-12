import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import './dimensoes-section.css';
import dimensoes from '../../../../utils/const.tsx';
import DimensionLinkButton from './dimensionLinkButton.tsx';
import SlideArtigos from '../slideArtigos/slideArtigosl.tsx';

export const DimensoesSection: FC = () => {
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
  const dimensoesColumn123 ={...dimensoesColumn1, ...dimensoesColumn2, ...dimensoesColumn3}
  const todasAsCores = {...dimensoesCores123}
  //console.log(dimensoesCores123)
  const [isOpen, setIsOpen] = useState(false);
 // Callback ref para observar cada elemento assim que é montado
  const dimensionItemRef = useCallback((node: HTMLDivElement | null) => {
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);
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

  return (
    <div id="dimensoesPai">
      <div className="w-75 mx-auto pt-5 escolhe">
      <h2>Escolha uma dimensão</h2>
      {/*<p>As dimensões correspondem a todos os aspectos socioeconômicos que dividem os dados da plataforma, para prosseguir, clique em uma dimensão e em seguida clique em um indicador para visualizar os dados.</p>*/}
      </div>
      
      <div id="dimensoes" className="px-md-5 py-1">
        {/* First column */}
        <div className="col-30 d-flex flex-column">
          {isLoaded && Object.entries(dimensoesColumn1).map(([item, value]) => {
            const objectValue:any = value;
            return(
            <DimensionLinkButton
              to={`/${item}`}
              color={todasAsCores[item]}
              key={item}
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div ref={dimensionItemRef} className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
                <svg 
                    viewBox={objectValue.viewBox}
                    stroke={objectValue.stroke}
                    fill={objectValue.fill}
                    strokeWidth={objectValue["stroke-width"]}
                    strokeLinecap={objectValue["stroke-linecap"]}
                    strokeLinejoin={objectValue["stroke-linejoin"]}
                    width="36" // Defina um tamanho padrão
                    height="36"
                  >
                    {objectValue.children}
                  </svg>
              </div> 
            </DimensionLinkButton>
          )})}
        </div>

        {/* Second column */}
        <div className="col-30 d-flex flex-column">
          {isLoaded && Object.entries(dimensoesColumn2).map(([item, value]) => {
            
            const objectValue:any = value;
            return(
            <DimensionLinkButton
              to={`/${item}`}
              color={todasAsCores[item]}
              key={item}
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div ref={dimensionItemRef} className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
                            <svg 
      viewBox={objectValue.viewBox}
      stroke={objectValue.stroke}
      fill={objectValue.fill}
      strokeWidth={objectValue["stroke-width"]}
      strokeLinecap={objectValue["stroke-linecap"]}
      strokeLinejoin={objectValue["stroke-linejoin"]}
      width="36" // Defina um tamanho padrão
      height="36"
    >
      {objectValue.children}
    </svg>
              </div>
            </DimensionLinkButton>
          )})}
        </div>
                
        <div className="col-30 d-flex flex-column">
          {isLoaded && Object.entries(dimensoesColumn3).map(([item, value]) => {
            const objectValue:any = value
            return(
            <DimensionLinkButton
              to={`/${item}`}
              color={todasAsCores[item]}
              key={item}
              increaseIcon={dimensaoAumentaIcone[item]}
            >
              <div ref={dimensionItemRef} className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
                <p>{item}</p>
             <svg 
                    viewBox={objectValue.viewBox}
                    stroke={objectValue.stroke}
                    fill={objectValue.fill}
                    strokeWidth={objectValue["stroke-width"]}
                    strokeLinecap={objectValue["stroke-linecap"]}
                    strokeLinejoin={objectValue["stroke-linejoin"]}
                    width="36" // Defina um tamanho padrão
                    height="36"
                  >
                    {objectValue.children}
                  </svg>
              </div>
            </DimensionLinkButton>
          )})}
        </div>
      </div>
      <div id="dimensoesDropdown">
        <button 
        className="dropdown-button" 
        onClick={() => setIsOpen(!isOpen)}
        >
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}><h2>Escolha uma Dimensão</h2>▼</span>
        </button>
        <div className="d-flex flex-column px-md-5" style={{marginRight: "auto"}}>
        {isOpen && isLoaded && Object.entries(dimensoesColumn123).map(([item, value]) => (
            <DimensionLinkButton
              to={`/${item}`}
              color={todasAsCores[item]}
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
      <SlideArtigos dimensoesList={dimensoesColumn123} dimensoesCores={todasAsCores}/>
    </div>
  );
};
