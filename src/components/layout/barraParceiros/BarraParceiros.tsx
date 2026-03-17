import React from 'react';

import fundohydroImg from '@assets/images/icons/SELO Fundo Hydro-09.png';
import ibsImg from '@assets/images/icons/iniciativaBarcarena.png';
import ufpaImg from '@assets/images/icons/logoUFPA.png';
import "./BarraParceiros.css"

const BarraParceiros: React.FC = () => {
  return (
    <div className="partners-bar">
        <div className="partners-inner">
            <div className="partner-group">
            <span className="partner-label">Contato</span>
            <a href="/cdn-cgi/l/email-protection#b8ded9d4dddbd7d6d7cbdbd7f8decdd6dcd7d0c1dccad796d7cadf" style={{ fontSize: '0.88rem', color: '#1B4F9B', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B4F9B" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                faleconosco&#64;fundohydro.org
            </a>
            </div>
            <div className="partner-group">
            <span className="partner-label">Realização</span>
            <div className="partner-logos">
                <a href="https://fundohydro.org/inicio" target="_blank" rel="noopener">
                <img src={fundohydroImg} alt="Hydro · ALBRAS · Fundo Hydro" style={{ height: '40px', width: 'auto', objectFit: 'contain' }}/>
                </a>
            </div>
            </div>
            <div className="partner-group">
            <span className="partner-label">Apoio</span>
            <div className="partner-logos">
                <a href="https://www.barcarenasustentavel.org/" target="_blank" rel="noopener" title="Iniciativa Barcarena Sustentável">
                <img src={ibsImg} alt="Iniciativa Barcarena Sustentável" style={{ height: '44px', width: 'auto', objectFit: 'contain' }}/>
                </a>
            </div>
            </div>
            <div className="partner-group">
            <span className="partner-label">Execução</span>
            <div className="partner-logos">
                <a href="https://ufpa.br/" target="_blank" rel="noopener" title="UFPA">
                <img src={ufpaImg} alt="UFPA" style={{ height: '52px', width: 'auto', objectFit: 'contain' }}/>
                </a>
            </div>
            </div>
        </div>
        </div>
  );
};

export default BarraParceiros;