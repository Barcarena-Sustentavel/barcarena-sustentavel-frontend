import React, { FC, useEffect, useRef, useCallback, useState } from "react";
import "./style.css";
import consts from "../../../../utils/const.tsx";
import DimensionLinkButton from "./components/dimensaoLinkButton/dimensionLinkButton.tsx";
import DimensaoCard from "./components/dimensaoCard/dimensaoCard.tsx";
import SlideArtigos from "../slideArtigos/slideArtigosl.tsx";
import api from "../../../../adapters/api.tsx"
import RelatoriosCarousel from "../carrossel/RelatoriosCarousel.tsx";
import dimensoes from "../../../../utils/const.tsx"

export const DimensoesSection: FC = () => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	 const {
	   dimensoesColumn1,
	   dimensoesColumn2,
	   dimensoesColumn3,
	 } = dimensoes.GetAllConst();
	const dimensoesColumn123 ={...dimensoesColumn1, ...dimensoesColumn2, ...dimensoesColumn3}
	const [isOpen, setIsOpen] = useState(false);
	const [icones, setIcones] = useState<Record<string, React.FC> | null>(null);
	const [dimensoesTitulo, setDimensoesTitulo] = useState<Record<string, string> | null>(null);
	const dimensoesOrdem = [
		"emprego",
		"meioAmbiente",
		"educacao",
		"mobilidade",
		"ordenamento",
		"seguranca",
		"saude",
		"conectividade",
		"instituicoes",
	];
	const dimensoesCores: Record<string, string> = {
		emprego: "#d4594c",
		meioAmbiente: "#c4b840",
		educacao: "#1B4F9B",
		mobilidade: "#d4b840",
		ordenamento: "#4ecdc4",
		seguranca: "#5abf80",
		saude: "#8b3a3a",
		conectividade: "#2c3e7d",
		instituicoes: "#E05A2B",
	};
	const keywordParaChave: Array<[string, string]> = [
		['Economia',      'emprego'],
		['Meio Ambiente', 'meioAmbiente'],
		['Educa',         'educacao'],
		['Mobilidade',    'mobilidade'],
		['Ordenamento',   'ordenamento'],
		['Seguran',       'seguranca'],
		['Saúde',         'saude'],
		['Conectividade', 'conectividade'],
		['Institui',      'instituicoes'],
	];

	const tituloParaChave = (titulo: string): string => {
		const match = keywordParaChave.find(([keyword]) =>
			titulo.toLowerCase().includes(keyword.toLowerCase())
		);
		return match ? match[1] : titulo.toLowerCase();
	};
	
	useEffect(() => {
    const getIconesDimensoes = async () => {
        const response = await api.get("/dimensoes/");
        const titulos: string[] = response.data.dimensoes;

        const mapa: Record<string, string> = {};
        titulos.forEach(titulo => {
            mapa[tituloParaChave(titulo)] = titulo;
        });

        setDimensoesTitulo(mapa);

        const loaded = consts.loadAllIconsDimensions();
        setIcones(loaded);
    };

    getIconesDimensoes();
}, []);


	useEffect(() => {
		//console.log(icones);
	}, [icones])
	if (!icones || !dimensoesTitulo) return <div className="spinner-border" />;
	//console.log(dimensoesColumn123 as any)
	console.log(dimensoesTitulo)
	return (
		<>
			<section className="dimensions" id="dimensoes">
				<div className="sec-header">
					<div className="sec-eyebrow">Áreas de Monitoramento</div>
					<h2 className="sec-title">Escolha uma Dimensão</h2>
					<p className="sec-sub">
					Acesse indicadores detalhados por área temática
					</p>
				</div>
				<div className="dim-grid">
					{dimensoesOrdem.map((item) => 
					{
					return (<DimensaoCard
						key={item}
						titulo={dimensoesTitulo![item]}
						icone={dimensoesColumn123[dimensoesTitulo[item]] as any}
						url={dimensoesTitulo![item]}
						cor={dimensoesCores[item]}
					/>) }
					)}
				</div>
			</section>

			<RelatoriosCarousel dimensoesTitulo={dimensoesTitulo} />
		</>

	);
};
