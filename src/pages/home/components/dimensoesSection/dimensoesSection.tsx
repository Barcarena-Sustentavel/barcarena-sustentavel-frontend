import React, { FC, useEffect, useState, useContext } from "react";
import "./style.css";
import { ConstContext, ConstContextType } from "../../../../context/const/script/ConstContext.ts";
import DimensaoCard from "./components/dimensaoCard/dimensaoCard.tsx";
import RelatoriosCarousel from "../carrossel/RelatoriosCarousel.tsx";

export const DimensoesSection: FC = () => {
	const { dimensoes, dimensoesIcones } =
		useContext<ConstContextType>(ConstContext);
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
	const dimensoesCoresPInicial: Record<string, string> = {
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
		['Economia', 'emprego'],
		['Meio Ambiente', 'meioAmbiente'],
		['Educa', 'educacao'],
		['Mobilidade', 'mobilidade'],
		['Ordenamento', 'ordenamento'],
		['Seguran', 'seguranca'],
		['Saúde', 'saude'],
		['Conectividade', 'conectividade'],
		['Institui', 'instituicoes'],
	];

	const tituloParaChave = (titulo: string): string => {
		const match = keywordParaChave.find(([keyword]) =>
			titulo.toLowerCase().includes(keyword.toLowerCase())
		);
		return match ? match[1] : titulo.toLowerCase();
	};

	useEffect(() => {
		const mapa: Record<string, string> = {};
		dimensoes.forEach(titulo => {
			mapa[tituloParaChave(titulo)] = titulo;
		});
		setDimensoesTitulo(mapa);

	}, []);

	if ( !dimensoesTitulo || dimensoes.length === 0) return <div className="spinner-border" />;
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
					{dimensoesOrdem.map((item) => {
						return (<DimensaoCard
							key={item}
							titulo={dimensoesTitulo![item]}
							icone={dimensoesIcones[dimensoesTitulo[item]] as any}
							url={dimensoesTitulo![item]}
							cor={dimensoesCoresPInicial[item]}
						/>)
					}
					)}
				</div>
			</section>

			<RelatoriosCarousel dimensoesTitulo={dimensoesTitulo} />
		</>

	);
};
