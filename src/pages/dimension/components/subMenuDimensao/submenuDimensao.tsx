import React, { useState } from "react";
import "./style.css";
import dimensoes from "../../../../utils/const.tsx" // Ajuste o caminho conforme necessário
import { useLocation } from "react-router-dom";
import { getArtigoDimensao } from "../../../../services/crudArtigo.tsx";
import Location from "../../../../components/layout/location/location.tsx";
interface SubmenuDimensaoProps {
	dimensaoAtiva: string;
}
const DimensaoItem: React.FC<{icon:any, dimensao:string, isAtiva:boolean, cor:string}> = ({icon, dimensao, isAtiva, cor}) => {
	const [isHovering, setIsHovering] = useState<boolean>(false)
	const dimensaoAtiva = isAtiva
	const corItem = cor
	const nomeDimensao = dimensao
	const icone = icon
		return (
							<a
								key={nomeDimensao}
								className={"submenu-dimensao-item" + (dimensaoAtiva ? " active" : "")}
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}
								href={`/${nomeDimensao}`}
								style={{
									borderBottomColor: dimensaoAtiva || isHovering ? `${corItem}` : ""
								}}>
								<div className={isAtiva ? "submenu-dimensao-svg submenu-dimensao-svg-ativo" : "submenu-dimensao-svg"} style={{ backgroundColor: `${corItem}` }}>
									{ icone !== undefined && <svg
										viewBox={(icone as any).viewBox}                   // Aumenta o ícone se for ativo
										stroke="white"  //{(icon as any).stroke}
										fill={(icone as any).fill}
										strokeWidth={(icone as any)["stroke-width"]}
										strokeLinecap={(icone as any)["stroke-linecap"]}
										strokeLinejoin={(icone as any)["stroke-linejoin"]}
										width="36" // icon um tamanho padrão
										height="36">
										{(icone as any).children}
									</svg>}
								</div>
								<p>{nomeDimensao}</p>
							</a>
						);
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
	const todasDimensoes = {
		...dimensoesColumn1,
		...dimensoesColumn2,
		...dimensoesColumn3,
	};
	const dimensoesValor = Object.keys(todasDimensoes)
	//Diminuir a redundância de dimensoes chaves e ordem
	const dimensoesChavesOrdem = [
		"emprego",
		"meioAmbiente",
		"educacao",
		"mobilidade",
		"ordenamento",
		"seguranca",
		"saude",
		"conectividade",
		"instituicoes",]
	let dimensoesChaveValor:Record<string,string> = {}
	dimensoesChavesOrdem.map((_,index:number) => {
		dimensoesChaveValor[dimensoesChavesOrdem[index]] = dimensoesValor[index] 
	}) 
	/*
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
	];*/
	const dimensaoCores = [
		"#c0392b",
		"#27ae60",
		"#1B4F9B",
		"#b7950b",
		"#148f77",
		"#1e8449",
		"#922b21",
		"#3a52a8",
		"#d35400"
	]
	const icone = todasDimensoes[dimensaoAtiva || activeDimensionFromPath];
	return (
		<div>
			<div className="submenu-dimensao-wrap">
				<div
					className="submenu-dimensao"
				>
					{dimensoesChavesOrdem.map((_,index:number) =>{
						const nomeDimensaoChave:string = dimensoesChavesOrdem[index]
						const nomeDimensaoValor = dimensoesChaveValor[nomeDimensaoChave as string]
						const isAtiva =
							nomeDimensaoValor === (dimensaoAtiva || activeDimensionFromPath);
						const cor = dimensaoCores[index]
						const icon = todasDimensoes[nomeDimensaoValor]	
						return(<DimensaoItem icon={icon} dimensao={nomeDimensaoValor as string} isAtiva={isAtiva} cor={cor} />)
					}) 
					}
				</div>
			</div>
			<div
				className="submenu-dimensao-hero"
				style={{ backgroundColor:`${dimensoesCores123[dimensaoAtiva || activeDimensionFromPath]}` /*`var(--${dimensoesCores123[dimensaoAtiva || activeDimensionFromPath]})`*/ }}>
				<div className="submenu-dimensao-hero-dentro">
					<div className="submenu-dimensao-hero-svg" >
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
