import api from "../api.tsx";
import { useState, useEffect } from "react";

// Lazy load SVG icons usando importação dinâmica
const loadIcon = (iconName: string) => {
  const iconPaths: Record<string,any> = {
    seguranca: () => <svg  viewBox="0 0 36 36" fill="none" stroke="#5abf80" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4 L30 9 L30 19 C30 25 24 30 18 32 C12 30 6 25 6 19 L6 9 Z"/><circle cx="18" cy="18" r="5"/><line x1="18" y1="13" x2="18" y2="11"/><line x1="18" y1="23" x2="18" y2="25"/><line x1="13" y1="18" x2="11" y2="18"/><line x1="23" y1="18" x2="25" y2="18"/></svg>,
    mobilidade: () => <svg  viewBox="0 0 36 36" fill="none" stroke="#d4b840" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="12" width="26" height="14" rx="3"/><line x1="5" y1="18" x2="31" y2="18"/><line x1="14" y1="12" x2="14" y2="26"/><circle cx="11" cy="28" r="2"/><circle cx="25" cy="28" r="2"/></svg>,
    saude: () => <svg viewBox="0 0 36 36" fill="none" stroke="#c46060" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 30 C18 30 6 22 6 14 C6 9 10 6 14 6 C16 6 18 8 18 8 C18 8 20 6 22 6 C26 6 30 9 30 14 C30 22 18 30 18 30Z"/><line x1="18" y1="14" x2="18" y2="22"/><line x1="14" y1="18" x2="22" y2="18"/></svg>,
    ordenamento: () => <svg  viewBox="0 0 36 36" fill="none" stroke="#4ecdc4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5 L32 15 L32 31 L4 31 L4 15 Z"/><rect x="13" y="21" width="10" height="10"/><polyline points="4,15 18,5 32,15"/></svg>,
    meioAmbiente: () => <svg viewBox="0 0 36 36" fill="none" stroke="#c4b840" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="18,3 24,13 12,13"/><polygon points="18,9 25,21 11,21"/><line x1="18" y1="21" x2="18" y2="27"/><polygon points="8,8 13,17 3,17"/><line x1="8" y1="17" x2="8" y2="22"/><polygon points="28,8 33,17 23,17"/><line x1="28" y1="17" x2="28" y2="22"/><line x1="2" y1="27" x2="34" y2="27"/></svg>,
    instituicoes: () => <svg viewBox="0 0 36 36" fill="none" stroke="#E05A2B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="31" x2="32" y2="31"/><rect x="10" y="18" width="5" height="13"/><rect x="21" y="18" width="5" height="13"/><rect x="13" y="9" width="10" height="9"/><polyline points="4,18 18,6 32,18"/></svg>,
    emprego: () => <svg viewBox="0 0 36 36" fill="none" stroke="#d4594c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,26 12,16 18,20 28,8"/><polyline points="24,8 28,8 28,12"/><line x1="4" y1="30" x2="32" y2="30"/></svg>,
    educacao: () => <svg viewBox="0 0 36 36" fill="none" stroke="#4a7fd4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14 L18 7 L32 14 L18 21 Z"/><path d="M26 17.5 L26 25 C26 25 22 28 18 28 C14 28 10 25 10 25 L10 17.5"/><line x1="32" y1="14" x2="32" y2="22"/></svg>,
    conectividade: () => <svg  viewBox="0 0 36 36" fill="none" stroke="#6080c4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13 C10 7 26 7 32 13"/><path d="M8 18 C12 13 24 13 28 18"/><path d="M12 23 C14 20 22 20 24 23"/><circle cx="18" cy="29" r="2" fill="#6080c4" stroke="none"/></svg>,
  };
  
  return iconPaths[iconName]().props;
};

// Carrega todos os ícones de forma lazy

const loadAllIconsDimensions = () => {
  const [
    logoEmprego,
    logoMeioAmbiente,
    logoEducacao,
    logoMobilidade,
    logoOrdenamento,
    logoSegurança,
    logoSaude,
    logoConectividade,
    logoInstituicoes,
  ] = ([
    loadIcon('emprego'),
    loadIcon('meioAmbiente'),
    loadIcon('educacao'),
    loadIcon('mobilidade'),
    loadIcon('ordenamento'),
    loadIcon('seguranca'),
    loadIcon('saude'),
    loadIcon('conectividade'),
    loadIcon('instituicoes'),
  ]);

  return [
    logoEmprego.default,
    logoMeioAmbiente.default,
    logoEducacao.default,
    logoMobilidade.default,
    logoOrdenamento.default,
    logoSegurança.default,
    logoSaude.default,
    logoConectividade.default,
    logoInstituicoes.default,
  ];
};

const loadAllIcons = () => {
  const [
    logoConectividade,
    logoOrdenamento,
    logoEducacao,
    logoMeioAmbiente,
    logoSegurança,
    logoSaude,
    logoEmprego,
    logoInstituicoes,
    logoMobilidade,
  ] = ([
    loadIcon('conectividade'),
    loadIcon('ordenamento'),
    loadIcon('educacao'),
    loadIcon('meioAmbiente'),
    loadIcon('seguranca'),
    loadIcon('saude'),
    loadIcon('emprego'),
    loadIcon('instituicoes'),
    loadIcon('mobilidade'),
  ]);

  /*
  return {
    dimensoesColumn1Array: [
      logoConectividade,
      logoOrdenamento,
      logoEducacao,
    ],
    dimensoesColumn2Array: [
      logoMeioAmbiente,
      logoSegurança,
      logoSaude,
    ],
    dimensoesColumn3Array: [
      logoEmprego,
      logoInstituicoes,
      logoMobilidade,
    ],
  };
  */
 return {
    dimensoesColumn1Array: [
      logoEmprego,
      logoMeioAmbiente,
      logoEducacao,
      logoOrdenamento,
      
    ],
    dimensoesColumn2Array: [
      logoMobilidade,
      logoOrdenamento,
      logoSegurança,
    ],
    dimensoesColumn3Array: [
      logoSaude,
      logoConectividade,
      logoInstituicoes,
    ],
  };
};
/*
const dimensaoCoresArray: string[] = [
  "dark-blue-d", // Confiança, proteção
  "green-light-d", // Movimento, fluidez
  "blue-d", // Saúde, equilíbrio
  "dark-green-d", // Planejamento, controle
  "green-d", // Natural, estável (também se aplica bem)
  "dark-red-d", // Autoridade, seriedade
  "red-d", // Ação, urgência, energia
  "orange-d", // Estímulo, criatividade
  "yellow-d", // Comunicação, otimismo
];*/
/*
const dimensaoCoresArray: string[] = [
		"#3a52a8",
		"#148f77",
		"#1B4F9B",
		"#148f77",
		"#1e8449",
		"#922b21",
		"#c0392b",
		"#d35400",
		"#b7950b"
	]
*/
const dimensaoCoresArray: string[] = [
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

const GetAllConst = () => {
  const [dimensoesColumn1, setDimensoesColumn1] = useState<Record<string, string>>({});
  const [dimensoesColumn2, setDimensoesColumn2] = useState<Record<string, string>>({});
  const [dimensoesColumn3, setDimensoesColumn3] = useState<Record<string, string>>({});
  const [dimensoesCores123, setdimensoesCores123] = useState<Record<string, string>>({});
  const [dimensaoAumentaIcone, setDimensaoAumentaIcone] = useState<Record<string, boolean>>({});
  const [dimensoesList, setDimensoesList] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  //const url = '/dimensoes/';
  const url = '/dimensoes/teste';

  useEffect(() => {
    const puxarDimensoes = async () => {
      const dimensoesList: string[] = [];
        await api.get(url).then((response) => {
        response.data.dimensoes.forEach((dimensao:string, index:number) => {
          dimensoesList.push(dimensao)
        })
      })
      setDimensoesList(dimensoesList)
      }
      try {
        puxarDimensoes()
    // seu código
  } catch (e) {
    console.error(e); // Verifique se há erros sendo engolidos
  }
    
  },[])
  
  useEffect(() => {
      const { dimensoesColumn1Array, dimensoesColumn2Array, dimensoesColumn3Array } = loadAllIcons();
      const tempDimensoesColumn1: Record<string, string> = {};
      const tempDimensoesColumn2: Record<string, string> = {};
      const tempDimensoesColumn3: Record<string, string> = {};
      const tempdimensoesCores123: Record<string, string> = {};
      const tempDimensaoAumentaIcone: Record<string, boolean> = {};

      for (let index = 0; index < dimensoesList.length; index++) {
        //console.log('dimensao',dimensoesList[index], 'cor',dimensoesColumn1Array[index])
        if(index < 3){
          tempDimensoesColumn1[dimensoesList[index]] = dimensoesColumn1Array[index];
        }
        else if(index >= 3 && index <= 5) {
          tempDimensoesColumn2[dimensoesList[index]] = dimensoesColumn2Array[index - 3];
        }
        else {
          tempDimensoesColumn3[dimensoesList[index]] = dimensoesColumn3Array[index - 6];
        }
        tempdimensoesCores123[dimensoesList[index]] = dimensaoCoresArray[index];
        tempDimensaoAumentaIcone[dimensoesList[index]] =
          dimensoesList[index] === 'Mobilidade' || dimensoesList[index] === 'Educação' ? true : false;
      }
      
      setDimensoesColumn1(tempDimensoesColumn1);
      setDimensoesColumn2(tempDimensoesColumn2);
      setDimensoesColumn3(tempDimensoesColumn3);
      setdimensoesCores123(tempdimensoesCores123);
      setDimensaoAumentaIcone(tempDimensaoAumentaIcone);
      setIsLoaded(true);
    },[dimensoesList])
  return {
    dimensoesColumn1,
    dimensoesColumn2,
    dimensoesColumn3,
    dimensoesCores123,
    dimensaoAumentaIcone,
    isLoaded,
    setIsLoaded
  };
};


export default {
  //dimensoesColumn2,
  //dimensoesColumn1,
  //dimensoesColumn12,
  //dimensaoCores,
  //dimensaoAumentaIcone,
  // Add the new arrays to the export
  //dimensoesColumn1Array,
  //dimensoesColumn2Array,
  //dimensoesColumn12Array,
  //dimensaoCoresArray,
  //dimensaoAumentaIconeArray,
  loadAllIconsDimensions,
  GetAllConst
};
