import React, { useState, useEffect, useRef } from "react";
import { ConstContext } from "../script/ConstContext.ts";
import api from "../../../adapters/api.tsx";
import { dimensaoCoresArray } from "../script/cores.ts";
import { carregarTodosOsIcones } from "../script/icone.tsx";
const ConstProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listaDimensoes, setListaDimensoes] = useState<string[]>([]);
  const icones = carregarTodosOsIcones();
  const [dimensoesCores, setdimensoesCores] = useState<Record<string, string>>({});
  const [dimensoesIcones, setDimensoesIcones] = useState<Record<string, string>>({});
  const url = '/dimensoes/';
  useEffect(() => {
    const puxarDimensoes = async () => {
      const dimensoesList: string[] = [];
      await api.get(url).then((response) => {
        response.data.dimensoes.forEach((dimensao: string, index: number) => {
          dimensoesList.push(dimensao)
        })
      })
      //listaDimensoes.current = dimensoesList;
      setListaDimensoes(dimensoesList);
    }
    try {
      puxarDimensoes()
      // seu código
    } catch (e) {
      console.error(e); // Verifique se há erros sendo engolidos
    }
  }, [])

  useEffect(() => {

    if (listaDimensoes.length === 0) return;

    const tempDimensoesIcones: Record<string, string> = {}
    const tempDimensoesCores: Record<string, string> = {}
    const atualListaDimensoes = listaDimensoes //listaDimensoes.current;
    atualListaDimensoes.forEach((dimensao: string, index: number) => {
      tempDimensoesIcones[dimensao] = icones[index]
      tempDimensoesCores[dimensao] = dimensaoCoresArray[index]
    })
    setDimensoesIcones(tempDimensoesIcones);
    setdimensoesCores(tempDimensoesCores);
  }, [listaDimensoes])

  const autorizarRenderizacao = (): boolean => {
    const autorizacao: boolean = (
      listaDimensoes.length === 0
      && Object.keys(dimensoesCores).length === 0
      && Object.keys(dimensoesIcones).length === 0) ? true : false;
    return autorizacao;
  }

  if (autorizarRenderizacao()) return

  return (
    <ConstContext.Provider
      value={{ dimensoes: listaDimensoes, dimensoesIcones, dimensoesCores }}
    >
      {children}
    </ConstContext.Provider>
  );
};

export default ConstProvider;
