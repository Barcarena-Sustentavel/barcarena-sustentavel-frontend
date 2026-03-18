import React from 'react';

interface PersonaCardProps {
  area?: string;          
  nome: string;          
  instituicao: string;   
  tag?: string;        
  cardClass?: string;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ area, nome, instituicao, tag, cardClass }) => {
  return (
    <>
      <div className={`colab-card ${cardClass ? cardClass: ""}`}>
            {area && <div className="colab-sub">{area}</div>}
            <div className="colab-name">{nome}</div>
            <div className="colab-info">{instituicao}</div>
            {tag && <span className="colab-badge">{tag}</span>}
    </div>
    </>
  );
};

export default PersonaCard;