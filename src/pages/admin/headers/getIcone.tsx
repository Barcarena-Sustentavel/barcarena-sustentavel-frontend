import { FC } from "react";

export const getIcone = (dimensao: string, cor: string) => {

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

    const iconPaths: Record<string, FC<{ className?: string }>> = {
        seguranca: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 4 L30 9 L30 19 C30 25 24 30 18 32 C12 30 6 25 6 19 L6 9 Z"/>
            <circle cx="18" cy="18" r="5"/>
            <line x1="18" y1="13" x2="18" y2="11"/>
            <line x1="18" y1="23" x2="18" y2="25"/>
            <line x1="13" y1="18" x2="11" y2="18"/>
            <line x1="23" y1="18" x2="25" y2="18"/>
            </svg>
        ),
        mobilidade: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="12" width="26" height="14" rx="3"/>
            <line x1="5" y1="18" x2="31" y2="18"/>
            <line x1="14" y1="12" x2="14" y2="26"/>
            <circle cx="11" cy="28" r="2"/>
            <circle cx="25" cy="28" r="2"/>
            </svg>
        ),
        saude: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 30 C18 30 6 22 6 14 C6 9 10 6 14 6 C16 6 18 8 18 8 C18 8 20 6 22 6 C26 6 30 9 30 14 C30 22 18 30 18 30Z"/>
            <line x1="18" y1="14" x2="18" y2="22"/>
            <line x1="14" y1="18" x2="22" y2="18"/>
            </svg>
        ),
        ordenamento: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 5 L32 15 L32 31 L4 31 L4 15 Z"/>
            <rect x="13" y="21" width="10" height="10"/>
            <polyline points="4,15 18,5 32,15"/>
            </svg>
        ),
        meioAmbiente: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="18,3 24,13 12,13"/>
            <polygon points="18,9 25,21 11,21"/>
            <line x1="18" y1="21" x2="18" y2="27"/>
            <polygon points="8,8 13,17 3,17"/>
            <line x1="8" y1="17" x2="8" y2="22"/>
            <polygon points="28,8 33,17 23,17"/>
            <line x1="28" y1="17" x2="28" y2="22"/>
            <line x1="2" y1="27" x2="34" y2="27"/>
            </svg>
        ),
        instituicoes: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="31" x2="32" y2="31"/>
            <rect x="10" y="18" width="5" height="13"/>
            <rect x="21" y="18" width="5" height="13"/>
            <rect x="13" y="9" width="10" height="9"/>
            <polyline points="4,18 18,6 32,18"/>
            </svg>
        ),
        emprego: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4,26 12,16 18,20 28,8"/>
            <polyline points="24,8 28,8 28,12"/>
            <line x1="4" y1="30" x2="32" y2="30"/>
            </svg>
        ),
        educacao: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14 L18 7 L32 14 L18 21 Z"/>
            <path d="M26 17.5 L26 25 C26 25 22 28 18 28 C14 28 10 25 10 25 L10 17.5"/>
            <line x1="32" y1="14" x2="32" y2="22"/>
            </svg>
        ),
        conectividade: ({ className }) => (
            <svg className={className} viewBox="0 0 36 36" fill="none" stroke={cor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 13 C10 7 26 7 32 13"/>
            <path d="M8 18 C12 13 24 13 28 18"/>
            <path d="M12 23 C14 20 22 20 24 23"/>
            <circle cx="18" cy="29" r="2" fill="#6080c4" stroke="none"/>
            </svg>
        ),
        };

    
    const Icon = iconPaths[tituloParaChave(dimensao)]; // extrai o componente

    // JSX exige variável com letra maiúscula
    return <Icon className="dimensao-icon" />;
};