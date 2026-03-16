import React, { useState } from "react";
import "./submenu-dimensao.css";
import dimensoes from "../../../utils/const.tsx"; // Ajuste o caminho conforme necessário
import { useLocation } from "react-router-dom";
import { getArtigoDimensao } from "../../admin/create/artigo/crudArtigo.tsx";
interface SubmenuDimensaoProps {
	dimensaoAtiva: string;
}

const SubmenuDimensao: React.FC<SubmenuDimensaoProps> = ({ dimensaoAtiva }) => {
	const location = useLocation();
	const activeDimensionFromPath = decodeURIComponent(
		location.pathname.split("/")[1],
	);
	const [isOpen, setIsOpen] = useState(false);
	const {
		dimensoesColumn1,
		dimensoesColumn2,
		dimensoesColumn3,
		dimensoesCores123,
	} = dimensoes.GetAllConst();
	//console.log(dimensoesColumn1, dimensoesColumn2, dimensoesColumn3);
	const todasDimensoes = {
		...dimensoesColumn1,
		...dimensoesColumn2,
		...dimensoesColumn3,
	};
	console.log('todasDimensoes:', todasDimensoes);
	const icone = todasDimensoes[dimensaoAtiva || activeDimensionFromPath];
	console.log('icone:', icone);
	return (
		<div className="submenu-dimensao-wrap">
			<div
				className="submenu-dimensao"
			>
				{Object.entries(todasDimensoes).map(([nomeDimensao, icon]) => {
					console.log('icon:', icon);
					const isAtiva =
						nomeDimensao === (dimensaoAtiva || activeDimensionFromPath);
					//const cor = dimensoes.dimensaoCores[nomeDimensao] || 'default-color';
					const cor = dimensoesCores123[nomeDimensao] || "default-color";
					//const aumentaIcone = dimensoes.dimensaoAumentaIcone[nomeDimensao] || false;
					//const aumentaIcone = dimensaoAumentaIcone[nomeDimensao] || false;

					return (
						<a
							key={nomeDimensao}
							className={"submenu-dimensao-item" + (isAtiva ? " active" : "")}
							//className={`submenu-dimensao-item m-2 p-3 d-flex flex-column justify-content-between align-items-center ${isAtiva ? "selected" : ""}`}
							href={`/${nomeDimensao}`}
							style={{
								//backgroundColor: `var(--${cor})`,
							}}>
							<div className={isAtiva ? "submenu-dimensao-svg submenu-dimensao-svg-ativo" : "submenu-dimensao-svg"} style={{ backgroundColor: `var(--${cor})` }}>
								<svg
									viewBox={(icon as any).viewBox}                   // Aumenta o ícone se for ativo
									stroke="white"  //{(icon as any).stroke}
									fill={(icon as any).fill}
									strokeWidth={(icon as any)["stroke-width"]}
									strokeLinecap={(icon as any)["stroke-linecap"]}
									strokeLinejoin={(icon as any)["stroke-linejoin"]}
									width="36" // icon um tamanho padrão
									height="36">
									{(icon as any).children}
								</svg>
							</div>
							<p>{nomeDimensao}</p>
						</a>
					);
				})}
			</div>
			<div
				className="submenu-dimensao-hero"
				style={{ backgroundColor: `var(--${dimensoesCores123[dimensaoAtiva || activeDimensionFromPath]})` }}>
				<div className="submenu-dimensao-hero-dentro">
					<div className="submenu-dimensao-hero-svg" style={{ backgroundColor: `var(--${dimensoesCores123[dimensaoAtiva || activeDimensionFromPath]})` }}>
						{icone !== undefined && <svg
							viewBox={(icone as any).viewBox}
							stroke="white"  //{(icone as any).stroke}
							fill={(icone as any).fill}
							strokeWidth={(icone as any)["stroke-width"]}
							strokeLinecap={(icone as any)["stroke-linecap"]}
							strokeLinejoin={(icone as any)["stroke-linejoin"]}
							width="36"
							height="36">
							{(icone as any).children}
						</svg>}
					</div>

					<div style={{ flex: '1' }}>
						<p className="submenu-dimensao-hero-titulo"
						>
							{dimensaoAtiva || activeDimensionFromPath}
						</p>
					</div>
					<button
						className="submenu-dimensao-hero-botao"
						onClick={() =>
							getArtigoDimensao(dimensaoAtiva || activeDimensionFromPath)
						}>
						<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="1" x2="6" y2="8"></line><polyline points="3,5 6,8 9,5"></polyline><line x1="1" y1="11" x2="11" y2="11"></line></svg>
						Resumo da dimensão
					</button>
				</div>
			</div>
		</div>
	);
};

export default SubmenuDimensao;
