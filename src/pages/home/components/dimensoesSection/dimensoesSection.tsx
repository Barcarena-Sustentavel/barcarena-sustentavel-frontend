import React, { FC, useEffect, useRef, useCallback, useState } from "react";
import "./dimensoes-section.css";
import consts from "../../../../utils/const.tsx";
import DimensionLinkButton from "./dimensionLinkButton.tsx";
import DimensaoCard from "./dimensaoCard.tsx";
import SlideArtigos from "../slideArtigos/slideArtigosl.tsx";

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
	const [icones, setIcones] = useState<Record<string, string> | null>(null);
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
	const dimensoesUrl: Record<string, string> = {
		emprego: "Economia e Mercado de Trabalho",
		meioAmbiente: "Meio Ambiente e Saneamento",
		educacao: "Educação, Cultura e Lazer",
		mobilidade: "Mobilidade",
		ordenamento: "Ordenamento Territorial",
		seguranca: "Segurança",
		saude: "Saúde",
		conectividade: "Conectividade",
		instituicoes: "Instituições",
	};
	const dimensoesTitulo: Record<string, string> = {
		emprego: "Economia e Mercado de Trabalho",
		meioAmbiente: "Meio Ambiente e Saneamento",
		educacao: "Educação, Cultura, Esporte e Lazer",
		mobilidade: "Mobilidade",
		ordenamento: "Ordenamento Territorial e Habitação",
		seguranca: "Segurança",
		saude: "Saúde",
		conectividade: "Conectividade",
		instituicoes: "Instituições Locais",
	};
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

	const {
		dimensoesColumn1,
		dimensoesColumn2,
		dimensoesColumn3,
		dimensoesCores123,
		dimensaoAumentaIcone,
		isLoaded,
		setIsLoaded,
	} = consts.GetAllConst();
	const dimensoesColumn123 = {
		...dimensoesColumn1,
		...dimensoesColumn2,
		...dimensoesColumn3,
	};
	const todasAsCores = { ...dimensoesCores123 };
	//console.log(dimensoesCores123)
	//const [isOpen, setIsOpen] = useState(false);
	// Callback ref para observar cada elemento assim que é montado
	const dimensionItemRef = useCallback((node: HTMLDivElement | null) => {
		if (node && observerRef.current) {
			observerRef.current.observe(node);
		}
	}, []);
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
		consts.loadAllIconsDimensions().then((loaded) => {
			setIcones({
				emprego: loaded[0],
				meioAmbiente: loaded[1],
				educacao: loaded[2],
				mobilidade: loaded[3],
				ordenamento: loaded[4],
				seguranca: loaded[5],
				saude: loaded[6],
				conectividade: loaded[7],
				instituicoes: loaded[8],
			});
		});

		return () => {
			// Cleanup: desconectar o observer
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	if (!icones) return <div className="spinner-border" />;

	return (
		<section className="dimensions" id="dimensoes">
			<div className="sec-header">
				<div className="sec-eyebrow">Áreas de Monitoramento</div>
				<h2 className="sec-title">Escolha uma Dimensão</h2>
				<p className="sec-sub">
					Acesse indicadores detalhados por área temática
				</p>
			</div>
			{/*<div id="dimensoesPai">
				<div className="w-75 mx-auto pt-5 escolhe">
					<h2>Escolha uma dimensão</h2>
				</div>

				<div id="dimensoes" className="px-md-5 py-1">
					<div className="col-30 d-flex flex-column">
						{isLoaded &&
							Object.entries(dimensoesColumn1).map(([item, value]) => {
								const objectValue: any = value;
								return (
									<DimensionLinkButton
										to={`/${item}`}
										color={todasAsCores[item]}
										key={item}
										increaseIcon={dimensaoAumentaIcone[item]}>
										<div
											ref={dimensionItemRef}
											className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
											<p>{item}</p>
											<svg
												viewBox={objectValue.viewBox}
												stroke={objectValue.stroke}
												fill={objectValue.fill}
												strokeWidth={objectValue["stroke-width"]}
												strokeLinecap={objectValue["stroke-linecap"]}
												strokeLinejoin={objectValue["stroke-linejoin"]}
												width="36" // Defina um tamanho padrão
												height="36">
												{objectValue.children}
											</svg>
										</div>
									</DimensionLinkButton>
								);
							})}
					</div>

					<div className="col-30 d-flex flex-column">
						{isLoaded &&
							Object.entries(dimensoesColumn2).map(([item, value]) => {
								const objectValue: any = value;
								return (
									<DimensionLinkButton
										to={`/${item}`}
										color={todasAsCores[item]}
										key={item}
										increaseIcon={dimensaoAumentaIcone[item]}>
										<div
											ref={dimensionItemRef}
											className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
											<p>{item}</p>
											<svg
												viewBox={objectValue.viewBox}
												stroke={objectValue.stroke}
												fill={objectValue.fill}
												strokeWidth={objectValue["stroke-width"]}
												strokeLinecap={objectValue["stroke-linecap"]}
												strokeLinejoin={objectValue["stroke-linejoin"]}
												width="36" // Defina um tamanho padrão
												height="36">
												{objectValue.children}
											</svg>
										</div>
									</DimensionLinkButton>
								);
							})}
					</div>

					<div className="col-30 d-flex flex-column">
						{isLoaded &&
							Object.entries(dimensoesColumn3).map(([item, value]) => {
								const objectValue: any = value;
								return (
									<DimensionLinkButton
										to={`/${item}`}
										color={todasAsCores[item]}
										key={item}
										increaseIcon={dimensaoAumentaIcone[item]}>
										<div
											ref={dimensionItemRef}
											className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
											<p>{item}</p>
											<svg
												viewBox={objectValue.viewBox}
												stroke={objectValue.stroke}
												fill={objectValue.fill}
												strokeWidth={objectValue["stroke-width"]}
												strokeLinecap={objectValue["stroke-linecap"]}
												strokeLinejoin={objectValue["stroke-linejoin"]}
												width="36" // Defina um tamanho padrão
												height="36">
												{objectValue.children}
											</svg>
										</div>
									</DimensionLinkButton>
								);
							})}
					</div>
				</div>
				<div id="dimensoesDropdown">
					<button
						className="dropdown-button"
						onClick={() => setIsOpen(!isOpen)}>
						<span className={`arrow ${isOpen ? "up" : "down"}`}>
							<h2>Escolha uma Dimensão</h2>▼
						</span>
					</button>
					<div
						className="d-flex flex-column px-md-5"
						style={{ marginRight: "auto" }}>
						{isOpen &&
							isLoaded &&
							Object.entries(dimensoesColumn123).map(([item, value]) => (
								<DimensionLinkButton
									to={`/${item}`}
									color={todasAsCores[item]}
									key={item}
									increaseIcon={dimensaoAumentaIcone[item]}>
									<div
										ref={dimensionItemRef}
										className="dimensao-item d-flex flex-row align-items-center justify-content-between my-2">
										<p>{item}</p>
										<div
											className="icon-color"
											style={{
												maskImage: `url(${value})`,
												WebkitMaskImage: `url(${value})`,
												maskRepeat: "no-repeat",
												WebkitMaskRepeat: "no-repeat",
												maskSize: "contain",
												WebkitMaskSize: "contain",
											}}
										/>
									</div>
								</DimensionLinkButton>
							))}
					</div>
				</div>
				
			</div>*/}

			<div className="dim-grid">
				{dimensoesOrdem.map((item) => (
					<DimensaoCard
						key={item}
						titulo={dimensoesTitulo[item]}
						icone={icones[item]}
						url={dimensoesUrl[item]}
						cor={dimensoesCores[item]}
					/>
				))}
			</div>
      <SlideArtigos
					dimensoesList={dimensoesColumn123}
					dimensoesCores={todasAsCores}
				/>
		</section>
	);
};
