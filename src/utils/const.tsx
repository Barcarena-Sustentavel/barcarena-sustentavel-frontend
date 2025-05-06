import logoSegurança from "@assets/images/icons/seguranca2.svg";
import logoMobilidade from "@assets/images/icons/mobilidade2.svg";
import logoSaude from "@assets/images/icons/saude2.svg";
import logoOrdenamento from "@assets/images/icons/ordenamento_territorial2.svg";
import logoMeioAmbiente from "@assets/images/icons/meio_ambiente2.svg";
import logoInstituicoes from "@assets/images/icons/instituicoes2.svg";
import logoEmprego from "@assets/images/icons/emprego2.svg";
import logoEducacao from "@assets/images/icons/educacao2.svg";
import logoConectividade from "@assets/images/icons/conectividade2.svg";
import api from "../api.tsx";
import { useState, useEffect } from "react";
// Original Record
// const dimensoesColumn1: Record<string, any> = {
//   Segurança: logoSegurança,
//   Mobilidade: logoMobilidade,
//   Saúde: logoSaude,
//   "Ordenamento Territorial": logoOrdenamento,
//   "Meio Ambiente": logoMeioAmbiente,
// };
const dimensoesColumn1Array: any[] = [
  logoConectividade,
  logoOrdenamento,
  logoEducacao,
  logoMeioAmbiente,
  logoSegurança,
];

// Original Record
// const dimensoesColumn2: Record<string, any> = {
//   Instituições: logoInstituicoes,
//   Emprego: logoEmprego,
//   Educação: logoEducacao,
//   Conectividade: logoConectividade,
// };
const dimensoesColumn2Array: any[] = [
  logoSaude,
  logoEmprego,
  logoInstituicoes,
  logoMobilidade,
];

// Original Record
// const dimensoesColumn12: Record<string, any> = Object.assign(
//   {},
//   dimensoesColumn1,
//   dimensoesColumn2,
// );
const dimensoesColumn12Array: any[] = [
  ...dimensoesColumn1Array,
  ...dimensoesColumn2Array,
];

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
  const [dimensoesCores12, setDimensoesCores12] = useState<Record<string, string>>({});
  const [dimensaoAumentaIcone, setDimensaoAumentaIcone] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const url = '/dimensoes/';

  useEffect(() => {
    api.get(url).then((response) => {
      const dimensoesList = response.data.dimensoes;
            const tempDimensoesColumn1: Record<string, string> = {};
            const tempDimensoesColumn2: Record<string, string> = {};
            const tempDimensoesCores12: Record<string, string> = {};
            const tempDimensaoAumentaIcone: Record<string, boolean> = {};
       for (let index = 0; index < dimensoesList.length; index++) {
              if(index < 5){
                tempDimensoesColumn1[dimensoesList[index]] = dimensoesColumn1Array[index];
              } else {
                tempDimensoesColumn2[dimensoesList[index]] = dimensoesColumn2Array[index - 5];
              }
              tempDimensoesCores12[dimensoesList[index]] = dimensaoCoresArray[index];
              tempDimensaoAumentaIcone[dimensoesList[index]] = 
                dimensoesList[index] === 'Mobilidade' || dimensoesList[index] === 'Educação' ? true : false;
            }

            setDimensoesColumn1(tempDimensoesColumn1);
            setDimensoesColumn2(tempDimensoesColumn2);
            setDimensoesCores12(tempDimensoesCores12);
            setDimensaoAumentaIcone(tempDimensaoAumentaIcone);
            setIsLoaded(true);
    });
  },[])
  return {
    dimensoesColumn1,
    dimensoesColumn2,
    dimensoesCores12,
    dimensaoAumentaIcone,
    isLoaded,
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
