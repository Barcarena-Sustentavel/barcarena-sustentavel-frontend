import { FC, useEffect } from "react";

interface DimensaoCardProps {
    titulo: string
    icone: string, 
    url: string,
    cor: string,
}

const DimensaoCard: FC<DimensaoCardProps> = ({ titulo, icone, url, cor }) => {

    // const absoluteUrl = `${window.location.origin}${icone}`;
    // const absoluteUrl = "@assets/images/icons/conectividade2.svg";

    useEffect(() => {
        console.log(icone);
    }, []);

    return (
        <a href={`/${url}`} className="dim-card" style={{ borderLeftColor: cor, color: cor, textDecoration: "none" }}>
            <div className="dim-icon"
            style={{
                maskImage: `url(${icone})`,
                WebkitMaskImage: `url(${icone})`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                backgroundColor: cor,
            }}
            >
            </div>
            <div className="dim-name">{titulo}</div>
            <div className="dim-arrow">↗</div>
        </a>
        
    );
}

export default DimensaoCard;