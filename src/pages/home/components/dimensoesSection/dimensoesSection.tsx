import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import './dimensoes-section.css';
import dimensoes from '../../../../utils/const.tsx';
import DimensionLinkButton from './dimensionLinkButton.tsx';
import api from '../../../../api.tsx';
import downloadIcon from '../../../../assets/images/icons/download-svgrepo-com.svg';

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
  const dimensoesColumn123 ={...dimensoesColumn1, ...dimensoesColumn2, ...dimensoesColumn3}
  const [isOpen, setIsOpen] = useState(false);
  const [estudos, setNomeEstudos] = useState<string[]>([])
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

  const downloadEstudo = async (estudo:string) =>{
    api.get("/estudos_complementares/arquivo", {params: {estudoComplementarNome: estudo}})
       .then((response) =>{
        const pdfBlob = new Blob([response.data.arquivo_data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(pdfBlob);
        const tempLink = document.createElement('a');
        tempLink.href = url;

        tempLink.setAttribute('download', `${estudo}.pdf`);
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
       })
  }
  useEffect(() => {
    const fetchEstudos = async () => {
      await api.get("/estudos_complementares/",{params:{pagina:"Pagina_inicial"}}).then((response) => {
        const estudosData = response.data.estudos;
        const estudosNomes = estudosData.map((estudo: string) => estudo);
        console.log(estudosNomes);
        setNomeEstudos(estudosNomes);
      }).catch((error) => {
        console.error("Erro ao buscar estudos complementares:", error);
      });
    }
    fetchEstudos();
  },[])
 

  return (
    <div id="dimensoesPai">
      <div className="w-75 mx-auto pt-5">
      <h2>Escolha uma dimensão</h2>
      <p>As dimensões correspondem a todos os aspectos socioeconômicos que dividem os dados da plataforma, para prosseguir, clique em uma dimensão e em seguida clique em um indicador para visualizar os dados.</p>
      </div>
      
      <div id="dimensoes" className="px-md-5 py-1">
        {/* First column */}
        <div className="col-30 d-flex flex-column">
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
        <div className="col-30 d-flex flex-column">
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

        <div className="col-30 d-flex flex-column">
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
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}><h2>Escolha uma Dimensão</h2>▼</span>
        </button>
        <div className="d-flex flex-column px-md-5" style={{marginRight: "auto"}}>
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
      <div className="d-flex flex-column w-75 mx-auto pt-2">
          <div>
          <h2>Estudos Complementares</h2>
          <p>Aqui você pode encontrar e baixar arquivos em pdf referentes aos diversos conhecimentos que fizeram parte do desenvolvimento do Observatório e da plataforma, para prosseguir, escolha um nome e clique no icone ao lado direito </p>
          </div>
          
          <div className="container-fluid px-5">
            <div className="row">
              {estudos.map((estudo, index) => (
                  <div key={index} className="w-1/2 d-flex justify-content-between align-items-center bg-light rounded p-3 h-100">
                    <p className="mb-0">{estudo}</p>
                    <button className="btn btn-link p-0" onClick={() => downloadEstudo(estudo)}> 
                      <img src={downloadIcon} alt="Download" style={{width: '24px', height: '24px'}} />
                    </button>
                  </div>
              ))}
            </div>
          </div>
      </div>  
    </div>
  );
};

export default DimensoesSection;
