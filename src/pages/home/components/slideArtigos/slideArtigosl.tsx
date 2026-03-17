import { FC, useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import bannerPublicacoes from "../../../../assets/images/carousel/bannerPublicacoes.jpg";
import "./slideArtigos.css";
import api from "../../../../api.tsx";

const SlideArtigos: FC<{
	dimensoesList: Record<string, any>;
	dimensoesCores: Record<string, string>;
}> = ({ dimensoesList, dimensoesCores }) => {
	const svgs = dimensoesList;
	const cores = dimensoesCores;
	const dimensoesArray = Object.keys(dimensoesList);

	const [slideArtigos, setSlideArtigos] = useState<any[]>([]);
	const baixarArtigo = (categoria: string) => {
		api.get(`/admin/dimensoes/${categoria}/artigoDimensao`).then((response) => {
			const blob = new Blob([response.data], { type: "application/pdf" });
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `artigo_${categoria}.pdf`);
			document.body.appendChild(link);
			link.click();
			link.parentNode?.removeChild(link);
		});
	};
	useEffect(() => {
		//console.log("dimensoesArray", dimensoesArray);
		if (slideArtigos.length > 0) {
			return;
		}
		const novoSlideArtigos: any[] = [];
		let umSlide: any[] = [];
		for (let i = 0; i < dimensoesArray.length; i += 3) {
			umSlide.push({
				categoria: dimensoesArray[i],
				nome: `Relatório sobre ${dimensoesArray[i]} - Barcarena 2024`,
				icone: svgs[dimensoesArray[i]],
				cor: cores[dimensoesArray[i]],
			});
			umSlide.push({
				categoria: dimensoesArray[i + 1],
				nome: `Relatório sobre ${dimensoesArray[i + 1]} - Barcarena 2024`,
				icone: svgs[dimensoesArray[i + 1]],
				cor: cores[dimensoesArray[i + 1]],
			});
			umSlide.push({
				categoria: dimensoesArray[i + 2],
				nome: `Relatório sobre ${dimensoesArray[i + 2]} - Barcarena 2024`,
				icone: svgs[dimensoesArray[i + 2]],
				cor: cores[dimensoesArray[i + 2]],
			});
			novoSlideArtigos.push(umSlide);
			umSlide = [];
		}
		setSlideArtigos(novoSlideArtigos);
	}, [dimensoesArray]);
	//console.log("slideArtigos", slideArtigos);
	return (
		<div id="publicacoes">
			<div className="text-center mb-4 publicacoes-header">
				<h3>PUBLICAÇÕES RECENTES</h3>
				<h1>Relatórios & Pesquisas</h1>
				<p>Baixe um artigo curto sobre uma das dimensões</p>
			</div>
			<div
				id="publicacoesBackGround"
				style={{
					backgroundImage: `url(${bannerPublicacoes})`,
				}}>
				<div
					className="publicacoes-section"
					style={{
						zIndex: 1,
						width: "100%",
						position: "relative",
						padding: "0 70px",
					}}>
					<Carousel fade interval={5000} className="shadow-sm">
						{slideArtigos.map((artigos, index) => (
							<Carousel.Item>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										gap: "20px",
										padding: "20px",
									}}>
									<div className="publicacoes-carousel">
										<div className="publicacoes-icone-wrapper">
											<svg
												viewBox={artigos[0].icone.viewBox}
												stroke={artigos[0].icone.stroke}
												fill={artigos[0].icone.fill}
												strokeWidth={artigos[0].icone["stroke-width"]}
												strokeLinecap={artigos[0].icone["stroke-linecap"]}
												strokeLinejoin={artigos[0].icone["stroke-linejoin"]}
												width="36" // Defina um tamanho padrão
												height="36">
												{artigos[0].icone.children}
											</svg>
										</div>
										<div className="publicacoes-content">
											<p
												className="publicacoes-categoria"
												style={{ color: `var(--${artigos[0].cor})` }}>
												{artigos[0].categoria}
											</p>
											<h3>{artigos[0].nome}</h3>
											<div className="publicacoes-footer">
												<hr className="publicacoes-divider" />
												<button
													onClick={() => baixarArtigo(artigos[0].categoria)}
													className="publicacoes-botao">
													<svg
														viewBox="0 0 12 12"
														fill="none"
														stroke="currentColor"
														stroke-width="1.6"
														stroke-linecap="round"
														stroke-linejoin="round"
														>
														<line x1="6" y1="1" x2="6" y2="8"></line>
														<polyline points="3,5 6,8 9,5"></polyline>
														<line x1="1" y1="11" x2="11" y2="11"></line>
													</svg>
													BAIXAR PDF
												</button>
											</div>
										</div>
									</div>
									<div className="publicacoes-carousel">
										<div className="publicacoes-icone-wrapper">
											<svg
												viewBox={artigos[1].icone.viewBox}
												stroke={artigos[1].icone.stroke}
												fill={artigos[1].icone.fill}
												strokeWidth={artigos[1].icone["stroke-width"]}
												strokeLinecap={artigos[1].icone["stroke-linecap"]}
												strokeLinejoin={artigos[1].icone["stroke-linejoin"]}
												width="36" // Defina um tamanho padrão
												height="36">
												{artigos[1].icone.children}
											</svg>
										</div>
										<div className="publicacoes-content">
											<p
												className="publicacoes-categoria"
												style={{ color: `var(--${artigos[1].cor})` }}>
												{artigos[1].categoria}
											</p>
											<h3>{artigos[1].nome}</h3>
											<div className="publicacoes-footer">
												<hr className="publicacoes-divider" />
												<button
													onClick={() => baixarArtigo(artigos[1].categoria)}
													className="publicacoes-botao">
													<svg
														viewBox="0 0 12 12"
														fill="none"
														stroke="currentColor"
														stroke-width="1.6"
														stroke-linecap="round"
														stroke-linejoin="round"
														>
														<line x1="6" y1="1" x2="6" y2="8"></line>
														<polyline points="3,5 6,8 9,5"></polyline>
														<line x1="1" y1="11" x2="11" y2="11"></line>
													</svg>
													BAIXAR PDF
												</button>
											</div>
										</div>
									</div>
									<div className="publicacoes-carousel">
										<div className="publicacoes-icone-wrapper">
											<svg
												viewBox={artigos[2].icone.viewBox}
												stroke={artigos[2].icone.stroke}
												fill={artigos[2].icone.fill}
												strokeWidth={artigos[2].icone["stroke-width"]}
												strokeLinecap={artigos[2].icone["stroke-linecap"]}
												strokeLinejoin={artigos[2].icone["stroke-linejoin"]}
												width="36" // Defina um tamanho padrão
												height="36">
												{artigos[2].icone.children}
											</svg>
										</div>
										<div className="publicacoes-content">
											<p
												className="publicacoes-categoria"
												style={{ color: `var(--${artigos[2].cor})` }}>
												{artigos[2].categoria}
											</p>
											<h3>{artigos[2].nome}</h3>
											<div className="publicacoes-footer">
												<hr className="publicacoes-divider" />
												<button
													onClick={() => baixarArtigo(artigos[2].categoria)}
													className="publicacoes-botao">
													<svg
														viewBox="0 0 12 12"
														fill="none"
														stroke="currentColor"
														stroke-width="1.6"
														stroke-linecap="round"
														stroke-linejoin="round"
														>
														<line x1="6" y1="1" x2="6" y2="8"></line>
														<polyline points="3,5 6,8 9,5"></polyline>
														<line x1="1" y1="11" x2="11" y2="11"></line>
													</svg>
													BAIXAR PDF
												</button>
											</div>
										</div>
									</div>
								</div>
							</Carousel.Item>
						))}
					</Carousel>
				</div>
				<div
					className="publicacoes-section-mobile"
					style={{
						zIndex: 1,
						width: "100%",
						position: "relative",
					}}>
					<Carousel fade interval={5000} className="shadow-sm">
						{slideArtigos.map((artigos, index) => (
							artigos.map((artigo: any) => (
							<Carousel.Item>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										gap: "20px",
										padding: "20px",
									}}>
									<div className="publicacoes-carousel">
										<div className="publicacoes-icone-wrapper">
											<svg
												viewBox={artigo.icone.viewBox}
												stroke={artigo.icone.stroke}
												fill={artigo.icone.fill}
												strokeWidth={artigo.icone["stroke-width"]}
												strokeLinecap={artigo.icone["stroke-linecap"]}
												strokeLinejoin={artigo.icone["stroke-linejoin"]}
												width="36" // Defina um tamanho padrão
												height="36">
												{artigo.icone.children}
											</svg>
										</div>
										<div className="publicacoes-content">
											<p
												className="publicacoes-categoria"
												style={{ color: `var(--${artigo.cor})` }}>
												{artigo.categoria}
											</p>
											<h3>{artigo.nome}</h3>
											<div className="publicacoes-footer">
												<hr className="publicacoes-divider" />
												<button
													onClick={() => baixarArtigo(artigo.categoria)}
													className="publicacoes-botao">
													<svg
														viewBox="0 0 12 12"
														fill="none"
														stroke="currentColor"
														stroke-width="1.6"
														stroke-linecap="round"
														stroke-linejoin="round"
														>
														<line x1="6" y1="1" x2="6" y2="8"></line>
														<polyline points="3,5 6,8 9,5"></polyline>
														<line x1="1" y1="11" x2="11" y2="11"></line>
													</svg>
													BAIXAR PDF
												</button>
											</div>
										</div>
									</div>
								</div>
							</Carousel.Item>))
							
						))}
					</Carousel>
				</div>
				
			</div>
		</div>
	);
};
export default SlideArtigos;
