import { FC, useEffect } from "react";
import '../../style.css'
interface DimensaoCardProps {
    titulo: string
    icone: any;
    url: string,
    cor: string,
}

const DimensaoCard: FC<DimensaoCardProps> = ({ titulo, icone, url, cor }) => {
    const ArrowUpRight = ({ size = 18, color = "#FFFFFF" }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M7 17L17 7M17 7H8M17 7V16"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
    )

    const temMapa = (dimensaoNome: string) => {
        const stringLower = dimensaoNome.toLowerCase();
        const dimensoesTrue = ["ordenamento", "segurança", "conectividade"];
        for(const dimensao of dimensoesTrue){
            console.log(dimensao, stringLower);
            if(stringLower.includes(dimensao)){
                return true;
            }
        }
        return false;
    };
    
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
            <div className="dim-name">{titulo} 
                <span className="mapa-placeholder"
                style={{
                        background: `${cor}`,
                        visibility: temMapa(titulo) ? "visible": "hidden",
                    }}
                >Mapa</span>
            </div>
            <div className="dim-arrow"><ArrowUpRight/></div>
        </a>
        
    );
}

export default DimensaoCard;