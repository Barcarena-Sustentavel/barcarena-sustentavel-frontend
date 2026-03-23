import React, { useState } from "react";
import "./submenu-dimensao.css";
import dimensoes from "../../../utils/const.tsx"; // Ajuste o caminho conforme necessário
import { useLocation } from "react-router-dom";
import { getArtigoDimensao } from "../../admin/create/artigo/crudArtigo.tsx";
import Location from "../../../components/layout/location/location.tsx";
interface SubmenuDimensaoProps {
	dimensaoAtiva: string;
}
const DimensaoItem: React.FC<{icon:any, dimensao:string, isAtiva:boolean, cor:string}> = ({icon, dimensao, isAtiva, cor}) => {
	const [isHovering, setIsHovering] = useState<boolean>(false)
	const dimensaoAtiva = isAtiva
	const corItem = cor
	const nomeDimensao = dimensao
	const icone = icon
	console.log(icone)
		return (
							<a
								key={nomeDimensao}
								className={"submenu-dimensao-item" + (dimensaoAtiva ? " active" : "")}
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}
								href={`/${nomeDimensao}`}
								style={{
									borderBottomColor: dimensaoAtiva || isHovering ? `var(--${corItem})` : ""
								}}>
								<div className={isAtiva ? "submenu-dimensao-svg submenu-dimensao-svg-ativo" : "submenu-dimensao-svg"} style={{ backgroundColor: `var(--${corItem})` }}>
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
	const dimensoesChaves = ["conectividade",
							 "ordenamento",
							 "educacao",
							 "meioAmbiente",
							 "seguranca",
							 "saude",
							 "emprego",
							 "instituicoes",
							 "mobilidade"]
	let dimensoesChaveValor:Record<string,string> = {}
	dimensoesChaves.map((_,index:number) => {
		dimensoesChaveValor[dimensoesChaves[index]] = dimensoesValor[index] 
	}) 
	console.log(dimensoesChaveValor)
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
	const icone = todasDimensoes[dimensaoAtiva || activeDimensionFromPath];
	console.log(todasDimensoes)
	return (
		<div>
			<div className="submenu-dimensao-wrap">
				<div
					className="submenu-dimensao"
				>
					{dimensoesOrdem.map((_,index:number) =>{
						const nomeDimensaoChave:string = dimensoesOrdem[index]
						const nomeDimensaoValor = dimensoesChaveValor[nomeDimensaoChave as string]
						const isAtiva =
							nomeDimensaoValor === (dimensaoAtiva || activeDimensionFromPath);
						const cor = dimensoesCores123[nomeDimensaoValor] || "default-color";
						const icon = todasDimensoes[nomeDimensaoValor]	
						console.log(icon)					
						return(<DimensaoItem icon={icon} dimensao={nomeDimensaoValor as string} isAtiva={isAtiva} cor={cor} />)
						//return( <div></div> )
					}) 
					}
				</div>
			</div>
			<Location parentName={dimensaoAtiva} />
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
