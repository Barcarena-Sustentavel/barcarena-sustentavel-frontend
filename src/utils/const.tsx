import api from "../api.tsx";
import { useState, useEffect } from "react";

// Lazy load SVG icons usando importação dinâmica
const loadIcon = (iconName: string) => {
  const iconPaths: Record<string, () => Promise<any>> = {
    seguranca: () => import("@assets/images/icons/seguranca2.svg"),
    mobilidade: () => import("@assets/images/icons/mobilidade2.svg"),
    saude: () => import("@assets/images/icons/saude2.svg"),
    ordenamento: () => import("@assets/images/icons/ordenamento_territorial2.svg"),
    meioAmbiente: () => import("@assets/images/icons/meio_ambiente2.svg"),
    instituicoes: () => import("@assets/images/icons/instituicoes2.svg"),
    emprego: () => import("@assets/images/icons/emprego2.svg"),
    educacao: () => import("@assets/images/icons/educacao2.svg"),
    conectividade: () => import("@assets/images/icons/conectividade2.svg"),
  };

  return iconPaths[iconName]?.() || Promise.reject(`Icon ${iconName} not found`);
};

// Carrega todos os ícones de forma lazy
const loadAllIcons = async () => {
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
  ] = await Promise.all([
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

  return {
    dimensoesColumn1Array: [
      logoConectividade.default,
      logoOrdenamento.default,
      logoEducacao.default,
    ],
    dimensoesColumn2Array: [
      logoMeioAmbiente.default,
      logoSegurança.default,
      logoSaude.default,
    ],
    dimensoesColumn3Array: [
      logoEmprego.default,
      logoInstituicoes.default,
      logoMobilidade.default,
    ],
  };
};

// Original Record
// const dimensoesColumn1: Record<string, any> = {
//   Segurança: logoSegurança,
//   Mobilidade: logoMobilidade,
//   Saúde: logoSaude,
//   "Ordenamento Territorial": logoOrdenamento,
//   "Meio Ambiente": logoMeioAmbiente,
// };

// Original Record
// const dimensoesColumn2: Record<string, any> = {
//   Instituições: logoInstituicoes,
//   Emprego: logoEmprego,
//   Educação: logoEducacao,
//   Conectividade: logoConectividade,
// };

// Original Record
// const dimensoesColumn12: Record<string, any> = Object.assign(
//   {},
//   dimensoesColumn1,
//   dimensoesColumn2,
// );

// Original Record
// const dimensaoCores: Record<string, string> = {
//   Segurança: "dark-blue-d", // Confiança, proteção
//   Mobilidade: "green-light-d", // Movimento, fluidez
//   Saúde: "blue-d", // Saúde, equilíbrio
//   "Ordenamento Territorial": "dark-green-d", // Planejamento, controle
//   "Meio Ambiente": "green-d", // Natural, estável (também se aplica bem)
//   Instituições: "dark-red-d", // Autoridade, seriedade
//   Emprego: "red-d", // Ação, urgência, energia
//   Educação: "orange-d", // Estímulo, criatividade
//   Conectividade: "yellow-d", // Comunicação, otimismo
// };
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
];

// Original Record
// const dimensaoAumentaIcone: Record<string, boolean> = {
//   Segurança: false,
//   Mobilidade: true,
//   Saúde: false,
//   "Ordenamento Territorial": false,
//   "Meio Ambiente": false,
//   Instituições: false,
//   Emprego: false,
//   Educação: true,
//   Conectividade: false,
// };
const dimensaoAumentaIconeArray: boolean[] = [
  false, // Segurança
  true,  // Mobilidade
  false, // Saúde
  false, // Ordenamento Territorial
  false, // Meio Ambiente
  false, // Instituições
  false, // Emprego
  true,  // Educação
  false, // Conectividade
];

const GetAllConst = () => {
  const [dimensoesColumn1, setDimensoesColumn1] = useState<Record<string, string>>({});
  const [dimensoesColumn2, setDimensoesColumn2] = useState<Record<string, string>>({});
  const [dimensoesColumn3, setDimensoesColumn3] = useState<Record<string, string>>({});
  const [dimensoesCores123, setdimensoesCores123] = useState<Record<string, string>>({});
  const [dimensaoAumentaIcone, setDimensaoAumentaIcone] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const url = '/dimensoes/';

  useEffect(() => {
    // Carrega os ícones e os dados da API em paralelo
    Promise.all([
      loadAllIcons(),
      api.get(url)
    ]).then(([icons, response]) => {
      const { dimensoesColumn1Array, dimensoesColumn2Array, dimensoesColumn3Array } = icons;
      const dimensoesList = response.data.dimensoes;

      const tempDimensoesColumn1: Record<string, string> = {};
      const tempDimensoesColumn2: Record<string, string> = {};
      const tempDimensoesColumn3: Record<string, string> = {};
      const tempdimensoesCores123: Record<string, string> = {};
      const tempDimensaoAumentaIcone: Record<string, boolean> = {};

      for (let index = 0; index < dimensoesList.length; index++) {
        if(index < 3){
          tempDimensoesColumn1[dimensoesList[index]] = dimensoesColumn1Array[index];
        }
        else if(index >= 3 && index <= 5) {
          tempDimensoesColumn2[dimensoesList[index]] = dimensoesColumn2Array[index - 3];
        }
        else {
          console.log(index-6)
          tempDimensoesColumn3[dimensoesList[index]] = dimensoesColumn3Array[index - 6];
        }
        tempdimensoesCores123[dimensoesList[index]] = dimensaoCoresArray[index];
        tempDimensaoAumentaIcone[dimensoesList[index]] =
          dimensoesList[index] === 'Mobilidade' || dimensoesList[index] === 'Educação' ? true : false;
      }

      console.log(tempDimensoesColumn1);
      console.log(tempDimensoesColumn2);
      console.log(tempDimensoesColumn3);

      setDimensoesColumn1(tempDimensoesColumn1);
      setDimensoesColumn2(tempDimensoesColumn2);
      setDimensoesColumn3(tempDimensoesColumn3);
      setdimensoesCores123(tempdimensoesCores123);
      setDimensaoAumentaIcone(tempDimensaoAumentaIcone);
      setIsLoaded(true);
    }).catch(error => {
      console.error('Erro ao carregar ícones ou dados:', error);
    });
  },[])

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
  GetAllConst
};
