import { FC, useEffect } from "react";
import './dimensoes-section.css'
interface DimensaoCardProps {
    titulo: string
    icone: any;
    url: string,
    cor: string,
}

const DimensaoCard: FC<DimensaoCardProps> = ({ titulo, icone, url, cor }) => {
    return (
        <a href={`/${url}`} className="dim-card" style={{ borderLeftColor: cor, color: cor, textDecoration: "none" }}>
            {icone !== undefined && 
            <svg
									viewBox={(icone as any).viewBox}                   // Aumenta o ícone se for ativo
									stroke={(icone as any).stroke}
									fill={(icone as any).fill}
									strokeWidth={(icone as any)["stroke-width"]}
									strokeLinecap={(icone as any)["stroke-linecap"]}
									strokeLinejoin={(icone as any)["stroke-linejoin"]}
									width="36" // icon um tamanho padrão
									height="36">
									{(icone as any).children}
								</svg>}
            <div className="dim-name">{titulo}</div>
            <div className="dim-arrow">↗</div>
        </a>
        
    );
}

export default DimensaoCard;