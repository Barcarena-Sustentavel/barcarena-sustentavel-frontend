import React from 'react';
import './submenu-dimensao.css';
import dimensoes from '../../../utils/const.tsx'; // Ajuste o caminho conforme necessário
import { useLocation } from 'react-router-dom';

interface SubmenuDimensaoProps {
  dimensaoAtiva: string;
}

const SubmenuDimensao: React.FC<SubmenuDimensaoProps> = ({ dimensaoAtiva }) => {
    const location = useLocation();
    const activeDimensionFromPath = decodeURIComponent(location.pathname.split('/')[1]);
    console.log(activeDimensionFromPath)
    // Combina as duas colunas em um único objeto
    const todasDimensoes = { ...dimensoes.dimensoesColumn1, ...dimensoes.dimensoesColumn2 };

    return (
        <div 
        className="submenu-dimensao d-flex flex-column align-items-center"
        style={{ 
            backgroundColor: `var(--${dimensoes.dimensaoCores[dimensaoAtiva || activeDimensionFromPath] || 'default-color'})` 
        }}
        >
        <div className="cards-row d-flex flex-row justify-content-center flex-wrap">
            {Object.entries(todasDimensoes).map(([nomeDimensao, icon]) => {
            const isAtiva = nomeDimensao === (dimensaoAtiva || activeDimensionFromPath);
            const cor = dimensoes.dimensaoCores[nomeDimensao] || 'default-color';
            const aumentaIcone = dimensoes.dimensaoAumentaIcone[nomeDimensao] || false;
            
            return (
                <a
                key={nomeDimensao}
                className={`submenu-dimensao-item m-2 p-3 d-flex flex-column justify-content-between align-items-center ${
                    isAtiva ? 'selected' : ''
                }`}
                href={`/${nomeDimensao}`}
                style={{
                    backgroundColor: `var(--${cor})`,
                    color: '#fff'
                }}
                >
                <div 
                    className={`icon-color-submenu-dimensao ${aumentaIcone ? 'increase' : ''}`}
                    style={{
                    maskImage: `url(${icon})`,
                    WebkitMaskImage: `url(${icon})`,
                    backgroundColor: 'white'
                    }}
                />
                <p className="label-dimensao">{nomeDimensao}</p>
                </a>
            );
            })}
        </div>

        <div className="label d-flex flex-row align-items-center mt-3">
            <div
            className={`label-icon-dimensao icon-color-submenu-dimensao ${
                dimensoes.dimensaoAumentaIcone[dimensaoAtiva || activeDimensionFromPath] ? 'increase' : ''
            }`}
            style={{
                maskImage: `url(${todasDimensoes[dimensaoAtiva || activeDimensionFromPath]})`,
                WebkitMaskImage: `url(${todasDimensoes[dimensaoAtiva || activeDimensionFromPath]})`,
                backgroundColor: 'white'
            }}
            />
            <p className="label-dimensao mb-2 ml-5">{dimensaoAtiva || activeDimensionFromPath}</p>
        </div>
        </div>
    );
};

export default SubmenuDimensao;