import React from 'react';
import "./conhecaProjetoSection.css"

const ConhecaProjetoSection: React.FC = () => {
  return (
    <section className="conheca-section">

      {/* Elementos decorativos de folhas */}
      <div className="conheca-deco" aria-hidden="true">

        {/* Folha grande arredondada — canto inferior esquerdo */}
        <svg className="deco-leaf-1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,10 C140,10 180,40 190,80 C200,120 185,165 155,180 C125,195 80,190 50,170 C20,150 5,115 10,80 C15,45 60,10 100,10Z"/>
          <path d="M100,10 L100,185" stroke="#8DC63F" strokeWidth="3" fill="none" opacity="0.5"/>
          <path d="M100,40 Q130,60 145,90" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.4"/>
          <path d="M100,40 Q70,60 55,90" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.4"/>
          <path d="M100,80 Q135,95 148,125" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.4"/>
          <path d="M100,80 Q65,95 52,125" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.4"/>
          <path d="M100,120 Q125,130 132,155" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.35"/>
          <path d="M100,120 Q75,130 68,155" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.35"/>
        </svg>

        {/* Galho com folhas — topo esquerdo */}
        <svg className="deco-branch" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,240 C60,200 100,160 150,120 C200,80 260,50 340,20" stroke="#8DC63F" strokeWidth="4" fill="none" opacity="0.6"/>
          <path d="M90,175 C70,145 55,120 80,100 C105,80 130,100 120,130 C110,155 95,168 90,175Z"/>
          <path d="M90,175 C100,145 108,120 95,100" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.5"/>
          <path d="M160,130 C145,100 138,72 165,58 C192,44 210,68 198,96 C186,122 168,126 160,130Z"/>
          <path d="M160,130 C168,100 172,74 162,58" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.5"/>
          <path d="M230,90 C218,62 215,36 240,24 C265,12 282,36 268,62 C254,86 236,88 230,90Z"/>
          <path d="M230,90 C238,63 240,38 234,24" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.5"/>
          <path d="M300,55 C292,38 292,22 308,16 C324,10 334,26 324,42 C316,54 304,54 300,55Z"/>
        </svg>

        {/* Folha tropical longa — canto direito */}
        <svg className="deco-tropical" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,5 C125,30 165,70 175,120 C185,170 170,230 140,270 C120,295 100,300 100,300 C100,300 80,295 60,270 C30,230 15,170 25,120 C35,70 75,30 100,5Z"/>
          <path d="M100,5 L100,295" stroke="#8DC63F" strokeWidth="3" fill="none" opacity="0.45"/>
          <path d="M100,40 Q145,70 158,110" stroke="#8DC63F" strokeWidth="1.8" fill="none" opacity="0.4"/>
          <path d="M100,40 Q55,70 42,110" stroke="#8DC63F" strokeWidth="1.8" fill="none" opacity="0.4"/>
          <path d="M100,100 Q148,125 158,165" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.38"/>
          <path d="M100,100 Q52,125 42,165" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.38"/>
          <path d="M100,165 Q138,185 142,215" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.32"/>
          <path d="M100,165 Q62,185 58,215" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.32"/>
          <path d="M100,220 Q122,235 124,255" stroke="#8DC63F" strokeWidth="1" fill="none" opacity="0.28"/>
          <path d="M100,220 Q78,235 76,255" stroke="#8DC63F" strokeWidth="1" fill="none" opacity="0.28"/>
        </svg>

        {/* Folha média — topo direito */}
        <svg className="deco-leaf-2" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <path d="M80,8 C110,8 145,30 152,62 C159,94 144,132 118,148 C92,164 55,158 32,138 C9,118 4,84 14,57 C24,30 50,8 80,8Z"/>
          <path d="M80,8 L80,148" stroke="#8DC63F" strokeWidth="2.5" fill="none" opacity="0.45"/>
          <path d="M80,35 Q108,52 116,78" stroke="#8DC63F" strokeWidth="1.4" fill="none" opacity="0.4"/>
          <path d="M80,35 Q52,52 44,78" stroke="#8DC63F" strokeWidth="1.4" fill="none" opacity="0.4"/>
          <path d="M80,75 Q110,88 116,110" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.35"/>
          <path d="M80,75 Q50,88 44,110" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.35"/>
        </svg>

        {/* Folha pequena — centro */}
        <svg className="deco-leaf-3" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M60,5 C82,5 108,22 114,46 C120,70 108,100 88,112 C68,124 42,118 24,100 C6,82 4,56 14,36 C24,16 38,5 60,5Z"/>
          <path d="M60,5 L60,112" stroke="#8DC63F" strokeWidth="2" fill="none" opacity="0.4"/>
          <path d="M60,28 Q80,42 86,62" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.35"/>
          <path d="M60,28 Q40,42 34,62" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.35"/>
        </svg>

        {/* Folha fina pontuda — centro direito */}
        <svg className="deco-slim" viewBox="0 0 80 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,2 C55,30 68,70 70,105 C72,140 62,175 40,198 C18,175 8,140 10,105 C12,70 25,30 40,2Z"/>
          <path d="M40,2 L40,198" stroke="#8DC63F" strokeWidth="2" fill="none" opacity="0.45"/>
          <path d="M40,40 Q60,60 64,88" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.38"/>
          <path d="M40,40 Q20,60 16,88" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.38"/>
          <path d="M40,95 Q60,112 62,138" stroke="#8DC63F" strokeWidth="1" fill="none" opacity="0.32"/>
          <path d="M40,95 Q20,112 18,138" stroke="#8DC63F" strokeWidth="1" fill="none" opacity="0.32"/>
          <path d="M40,148 Q52,160 52,178" stroke="#8DC63F" strokeWidth="0.8" fill="none" opacity="0.28"/>
          <path d="M40,148 Q28,160 28,178" stroke="#8DC63F" strokeWidth="0.8" fill="none" opacity="0.28"/>
        </svg>

        {/* Folha redonda — centro inferior */}
        <svg className="deco-round" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="52"/>
          <path d="M60,8 L60,112" stroke="#8DC63F" strokeWidth="2" fill="none" opacity="0.4"/>
          <path d="M60,30 Q88,45 94,68" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.35"/>
          <path d="M60,30 Q32,45 26,68" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.35"/>
          <path d="M60,65 Q85,76 88,95" stroke="#8DC63F" strokeWidth="1" fill="none" opacity="0.3"/>
          <path d="M60,65 Q35,76 32,95" stroke="#8DC63F" strokeWidth="1" fill="none" opacity="0.3"/>
        </svg>

        {/* Galho secundário — inferior direito */}
        <svg className="deco-branch2" viewBox="0 0 360 260" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,240 C60,200 100,160 150,120 C200,80 260,50 340,20" stroke="#8DC63F" strokeWidth="3.5" fill="none" opacity="0.55"/>
          <path d="M85,182 C65,152 50,126 75,106 C100,86 124,106 114,136 C104,160 90,172 85,182Z"/>
          <path d="M85,182 C95,152 103,126 90,106" stroke="#8DC63F" strokeWidth="1.3" fill="none" opacity="0.5"/>
          <path d="M158,136 C143,106 136,78 163,64 C190,50 208,74 196,102 C184,128 166,132 158,136Z"/>
          <path d="M158,136 C166,106 170,80 160,64" stroke="#8DC63F" strokeWidth="1.3" fill="none" opacity="0.5"/>
          <path d="M228,96 C216,68 213,42 238,30 C263,18 280,42 266,68 C252,92 234,94 228,96Z"/>
          <path d="M295,60 C287,43 287,27 303,21 C319,15 329,31 319,47 C311,59 299,59 295,60Z"/>
        </svg>

        {/* Folha longa estreita — canto superior direito */}
        <svg className="deco-narrow" viewBox="0 0 70 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M35,2 C48,25 58,65 58,100 C58,135 48,175 35,198 C22,175 12,135 12,100 C12,65 22,25 35,2Z"/>
          <path d="M35,2 L35,198" stroke="#8DC63F" strokeWidth="1.8" fill="none" opacity="0.45"/>
          <path d="M35,35 Q52,55 55,82" stroke="#8DC63F" strokeWidth="1.1" fill="none" opacity="0.38"/>
          <path d="M35,35 Q18,55 15,82" stroke="#8DC63F" strokeWidth="1.1" fill="none" opacity="0.38"/>
          <path d="M35,95 Q53,110 54,135" stroke="#8DC63F" strokeWidth="0.9" fill="none" opacity="0.32"/>
          <path d="M35,95 Q17,110 16,135" stroke="#8DC63F" strokeWidth="0.9" fill="none" opacity="0.32"/>
        </svg>

        {/* Trio de folhinhas — esquerda centro */}
        <svg className="deco-trio" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
          <path d="M30,120 C10,95 5,65 20,48 C35,31 58,38 62,62 C66,86 48,108 30,120Z"/>
          <path d="M30,120 C38,95 42,68 32,50" stroke="#8DC63F" strokeWidth="1.2" fill="none" opacity="0.42"/>
          <path d="M70,130 C52,105 48,72 62,52 C76,32 100,38 104,65 C108,90 90,115 70,130Z"/>
          <path d="M70,130 C78,105 82,75 72,54" stroke="#8DC63F" strokeWidth="1.3" fill="none" opacity="0.44"/>
          <path d="M108,118 C92,94 90,65 104,50 C118,35 138,44 138,68 C138,90 122,108 108,118Z"/>
          <path d="M108,118 C114,94 116,68 108,52" stroke="#8DC63F" strokeWidth="1.1" fill="none" opacity="0.42"/>
          <path d="M50,135 C58,120 65,105 70,90 C75,105 82,120 90,135" stroke="#8DC63F" strokeWidth="1.5" fill="none" opacity="0.4"/>
        </svg>

      </div>

      {/* Top bar */}
      <div className="conheca-top-bar"></div>

      <div className="conheca-inner">

        {/* Left: text */}
        <div className="conheca-text">
          <h2 className="conheca-eyebrow">Conheça o Projeto</h2>
          <p className="conheca-body">
            O <strong>ODSB</strong> é uma plataforma de informações sobre Barcarena voltada ao
            acompanhamento do desenvolvimento sustentável do município. O sistema integra dados de
            fontes públicas e institucionais confiáveis. A proposta é oferecer mapas interativos,
            dashboards e boletins periódicos que permitam monitorar o cenário municipal, identificar
            relações entre indicadores e apoiar análises mais amplas sobre a dinâmica do
            desenvolvimento local. Um instrumento de planejamento, pesquisa e apoio à tomada de
            decisão, contribuindo tanto para iniciativas como o Fundo Hydro e a Iniciativa Barcarena
            Sustentável quanto para ações do poder público e da sociedade civil.
          </p>
          <a href="sobre.html" className="btn-prim conheca-btn">Conheça o Projeto</a>
        </div>

        {/* Right: YouTube embed */}
        <div className="conheca-video">
          <div className="conheca-video-wrap">
            <iframe
              src="https://www.youtube.com/embed/91rEujWOTfo"
              title="ODSB — Conheça o projeto"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

      </div>

    </section>
  );
};

export default ConhecaProjetoSection;