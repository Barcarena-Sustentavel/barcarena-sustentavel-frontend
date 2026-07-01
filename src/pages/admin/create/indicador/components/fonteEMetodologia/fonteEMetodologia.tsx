import React, { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export const FonteMetodologia: FC<{
	referencias: string[];
	referenciasAtuais: { id: number; nome: string; stored: boolean }[];
	setReferencias: React.Dispatch<
		React.SetStateAction<
			{
				id: number;
				nome: string;
				stored: boolean;
			}[]
		>
	>;
	setDeletarFonte: React.Dispatch<
		React.SetStateAction<{ id: number; nome: string, stored: boolean }[]>
	>;
}> = ({ referencias, referenciasAtuais, setReferencias, setDeletarFonte }) => {
	const [mouseOver, setMouseOver] = useState<boolean>(false);
	const adicionarNovaFonte = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setReferencias((prev: { id: number; nome: string; stored: boolean }[]) => [
			...prev,
			{ id: prev.length, nome: "", stored: false },
		]);
	};
	return (
		<div>
			{referenciasAtuais.length > 0 &&
				referenciasAtuais.map((referencia, index) => (
					<div style={{ marginBottom: "10px" }} key={referencia.id}>
						<FormsFonteMetodologia
							referencias={referencias}
							referenciaAtual={referencia}
							setReferencias={setReferencias}
							setDeletarFonte={setDeletarFonte}
						/>
					</div>
				))}
			<div
				className="botaoNovaFonte"
				style={{ marginBottom: "10px", width: mouseOver ? "40%" : "12%" }}>
				<button onClick={adicionarNovaFonte}> + </button>
				<span
					onMouseEnter={() => setMouseOver(true)}
					style={mouseOver ? { display: "none" } : {}}>
					{" "}
					i{" "}
				</span>
				{mouseOver && (
					<p onMouseLeave={() => setMouseOver(false)}>
						O botão "+" permite adicionar adicionar mais de uma referência para
						o indicador
					</p>
				)}
			</div>
		</div>
	);
};

const FormsFonteMetodologia: FC<{
	referencias: string[];
	referenciaAtual: { id: number; nome: string, stored: boolean };
	setReferencias: React.Dispatch<
		React.SetStateAction<
			{
				id: number;
				nome: string;
				stored: boolean;
			}[]
		>
	>;
	setDeletarFonte: React.Dispatch<
		React.SetStateAction<{ id: number; nome: string, stored: boolean }[]>
	>;
}> = ({ referencias, referenciaAtual, setReferencias, setDeletarFonte }) => {
	return (
		<div className="selectFonteMetodologia">
			<Form.Select
				defaultValue={referenciaAtual.nome}
				//onBlur={(e) => setReferencia((prev) => [...prev, e.target.value])}
				onChange={(e) =>
					setReferencias((prev: { id: number; nome: string; stored: boolean }[]) => {
						//Se prev não estiver vazio adiciona nova referencia com id novo e nome da referencia
						if (prev.length > 0) {
							return prev.map((referencia, index) => {
								if (referencia.id === referenciaAtual.id) {
									// Retorna um novo objeto com o nome atualizado (mantendo a imutabilidade)
									return { ...referencia, nome: e.target.value, stored:false };
								}
								// Retorna os outros itens sem alteração
								return referencia;
							});
							//return [...prev, { id: prev.length, nome: e.target.value }];
						}
						//Se prev estiver vazio, adicionar nova referencia com id 0 e nome da referencia
						return [{ id: 0, nome: e.target.value, stored:false }];
					})
				}
				name="referencias">
				<option value="">Escolha a sua Fonte de Dados</option>
				{referencias.map((referencia) => (
					<option key={referencia} value={referencia} title={referencia}>
						{referencia.length > 80
							? referencia.slice(0, 80) + "…"
							: referencia}
					</option>
				))}
			</Form.Select>
			{referenciaAtual.id !== 0 ? (
				<input
					type="checkbox"
					id={`check-${referenciaAtual.id}`}
					onChange={(e) => {
						e.target.checked
							? setDeletarFonte((prev) => [...prev, referenciaAtual])
							: setDeletarFonte((prev) =>
									prev.filter((fonte) => fonte.id !== referenciaAtual.id),
								);
					}}
				/>
			) : (
				<input
					type="checkbox"
					id={`check-${referenciaAtual.id}`}
					style={{ opacity: "0" }}
				/>
			)}
		</div>
	);
};
