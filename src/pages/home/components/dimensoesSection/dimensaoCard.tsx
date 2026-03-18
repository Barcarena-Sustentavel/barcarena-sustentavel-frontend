import { FC, useEffect } from "react";

interface DimensaoCardProps {
    titulo: string
    icone: React.FC<{ className?: string }>;
    url: string,
    cor: string,
}

const DimensaoCard: FC<DimensaoCardProps> = ({ titulo, icone, url, cor }) => {

    const Icone = icone;

    useEffect(() => {
        console.log(icone);
    }, []);

    return (
        <a href={`/${url}`} className="dim-card" style={{ borderLeftColor: cor, color: cor, textDecoration: "none" }}>
            {Icone && <Icone className="dim-icon" />}
            <div className="dim-name">{titulo}</div>
            <div className="dim-arrow">↗</div>
        </a>
        
    );
}

export default DimensaoCard;