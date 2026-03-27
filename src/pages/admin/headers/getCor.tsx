export const getCor = (dimensao: string) => {
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

    return dimensoesCores[tituloParaChave(dimensao)];
};