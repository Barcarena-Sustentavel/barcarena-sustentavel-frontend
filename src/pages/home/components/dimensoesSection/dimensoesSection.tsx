import React, { FC, useEffect, useRef, useCallback, useState } from "react";
import "./dimensoes-section.css";
import consts from "../../../../utils/const.tsx";
import DimensionLinkButton from "./dimensionLinkButton.tsx";
import DimensaoCard from "./dimensaoCard.tsx";
import SlideArtigos from "../slideArtigos/slideArtigosl.tsx";
import api from "../../../../api.tsx"
import RelatoriosCarousel from "../carrossel/RelatoriosCarousel.tsx";

export const DimensoesSection: FC = () => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	// const {
	//   dimensoesColumn1,
	//   dimensoesColumn2,
	//   dimensoesColumn3,
	//   isLoaded,
	//   setIsLoaded
	// } = dimensoes.GetAllConst();
	// const dimensoesColumn123 ={...dimensoesColumn1, ...dimensoesColumn2, ...dimensoesColumn3}
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

	// const {
	// 	dimensoesColumn1,
	// 	dimensoesColumn2,
	// 	dimensoesColumn3,
	// 	dimensoesCores123,
	// 	dimensaoAumentaIcone,
	// 	isLoaded,
	// 	setIsLoaded,
	// } = consts.GetAllConst();
	// const dimensoesColumn123 = {
	// 	...dimensoesColumn1,
	// 	...dimensoesColumn2,
	// 	...dimensoesColumn3,
	// };

	// const testConsts = consts.GetAllConst();

	// const todasAsCores = { ...dimensoesCores123 };
	// //console.log(dimensoesCores123)
	// //const [isOpen, setIsOpen] = useState(false);
	// // Callback ref para observar cada elemento assim que é montado
	// const dimensionItemRef = useCallback((node: HTMLDivElement | null) => {
	// 	if (node && observerRef.current) {
	// 		observerRef.current.observe(node);
	// 	}
	// }, []);
	useEffect(() => {
		// setIsLoaded(true)

		// Criar o observer uma vez
		// observerRef.current = new IntersectionObserver(
		//   (entries) => {
		//     entries.forEach((entry) => {
		//       if (entry.isIntersecting) {
		//         entry.target.classNameList.add('animate-in');
		//       }
		//     });
		//   },
		//   { threshold: 0.1 }
		// );
		const url = "/dimensoes";
		const getIconesDimensoes = async () =>
		{await api.get(url).then( response => {
			const titulos: string[] = response.data.dimensoes;

			const mapa: Record<string, string> = {};
			titulos.forEach(titulo => {
			mapa[tituloParaChave(titulo)] = titulo;
			});

			setDimensoesTitulo(mapa);
			}
		);
		const loaded = consts.loadAllIconsDimensions();
		setIcones(loaded);}
		// return () => {
		// 	// Cleanup: desconectar o observer
		// 	if (observerRef.current) {
		// 		observerRef.current.disconnect();
		// 	}
		// };
		getIconesDimensoes()
	}, []);

	useEffect(() => {
		console.log(icones);
	}, [icones])

	//test consts
	// useEffect(() => {
	// 	console.log(testConsts);
	// }, [testConsts]);

	//if (!icones) return <div className="spinner-border" />
	if (!dimensoesTitulo) return <p>Carregando...</p>;
	if (!icones || !dimensoesTitulo) return <div className="spinner-border" />;

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
					{dimensoesOrdem.map((item) => (
					<DimensaoCard
						key={item}
						titulo={dimensoesTitulo![item]}
						icone={icones![item]}
						url={dimensoesTitulo![item]}
						cor={dimensoesCores[item]}
					/>
					))}
				</div>
			</section>

			<RelatoriosCarousel dimensoesTitulo={dimensoesTitulo} />
		</>

	);
};
