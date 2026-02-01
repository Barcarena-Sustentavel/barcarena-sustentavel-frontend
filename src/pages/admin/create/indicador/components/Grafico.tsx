import React, { FC, useState, useEffect } from "react";
import { GraficosIndicador } from "../../../../../interfaces/indicador_interface.tsx";
import { Form, Alert } from "react-bootstrap";
import { DashboardComponentPreview } from "./dashboard/dashboard.tsx";
import Papa from 'papaparse'; // Importação do Papa Parse
import "./components.css";

interface GraficoComponentProps {
  chaveValorGraficos: { [key: string]: string };
  grafico: GraficosIndicador;
  setDeleteArray: React.Dispatch<React.SetStateAction<GraficosIndicador[]>>;
  graficosData: GraficosIndicador[];
  setGraficosData: React.Dispatch<React.SetStateAction<GraficosIndicador[]>>;
  onDelete?: () => void;
}

export const GraficoComponent: FC<GraficoComponentProps> = ({
  chaveValorGraficos,
  grafico,
  setDeleteArray,
  graficosData,
  setGraficosData,
  onDelete,
}) => {
  const [errorTitulo, setErrorTitulo] = useState<string | null>(null);
  const [errorArquivo, setErrorArquivo] = useState<string[]>([]);
  const [errorTipo, setErrorTipo] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const graficoResponse:GraficosIndicador= grafico
  const [tituloGrafico, setTituloGrafico] = useState<string>(graficoResponse.tituloGrafico || "");
  const [descricaoGrafico, setDescricaoGrafico] = useState<string>(graficoResponse.descricaoGrafico || "");
  const [arquivo, setArquivo] = useState<File | string | null>(graficoResponse.arquivo || null);
  const [tipoGrafico, setTipoGrafico] = useState<string>(graficoResponse.tipoGrafico || "");


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    if (e.target.checked) {
      setDeleteArray((prev) => [...prev, graficoResponse]);
    } else {
      setDeleteArray((prev) =>
        prev.filter((item) => item.id !== graficoResponse.id),
      );
    }
  };
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      const shouldDelete = window.confirm("Deseja deletar este gráfico?");
      if (shouldDelete) {
        setDeleteArray((prev) => [...prev, graficoResponse]);
      }
    }
  };
  const sanitizarCSV = (csv:File) => {
    const regexVirgulas = /\,/
    const regexPonto = /\./
    Papa.parse(csv, {
        header: true, // Transforma cada linha em um objeto usando o cabeçalho como chave
        worker:false,
        skipEmptyLines: true, // Ignora linhas vazias
        transformHeader: (header) => {
          if(regexVirgulas.test(header)){
            const newHeader = header.replace(regexVirgulas, " ")
            return newHeader
          }
          return header
        },
        complete: (results) => {
          const regexCaracteresEspeciais = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/??~]/g
          const regexTextoDesnecessario = /[a-zA-Z]/
          let campos = results.meta.fields
          console.log(campos)
          const resultados:any[] = results.data
          if(tipoGrafico === 'Tabela'){
            setArquivo(csv);
            graficoResponse.arquivo = csv
          }
          else{
            let msgsErro:string[] = [] 
            resultados.map((coluna:any,index) => {
              console.log(coluna,index)
              const colunasChaves = Object.keys(coluna)
              colunasChaves.map(chave =>{
                console.log(coluna[chave])
                //Verifica a presença de caracteres especiais
                if(regexCaracteresEspeciais.test(coluna[chave])){
                  msgsErro.push(`Foi detectada a presença de caracteres especiais na coluna "${chave}", por favor remova-os para prosseguir`)
                }
                //Verifica se há texto desnecessário nas outras colunas que não seja a primeira 
                if((regexTextoDesnecessario.test(coluna[chave])) && colunasChaves.indexOf(chave) > 0){                  
                  /*msgsErro.push(`Foi detectada a presença de texto desnecessário na coluna"${chave}"
                                \npara inserir uma visualização que possa acomodar este tipo de formato
                                \nselecione a opção "Tabela" em "Tipo de Gráfico"
                                \n,caso deseje continuar com o formato atual por favor retire o texto desnecessário`)*/
                    msgsErro.push(`O tipo de gráfico atual não acomoda colunas com texto além da primeira coluna
                                  \npara continuar mude o tipo de gráfico para "Tabela" na aba "Tipo de Gráfico", ou
                                  \nretire o texto desnecessário na coluna "${chave}"`)
                }
                if(/"" | " "/.test(coluna[chave])){
                  msgsErro.push(`Foi detectada a presença de dados faltantes na coluna ${chave}
                                \npara continuar por favor insira um valor no lugar do dado faltante,
                                \nou elimine a linha com o dado faltante`)
                }
                //Retira todas as vírgulas
                if(regexVirgulas.test(coluna[chave])){
                  //Divide o valor a partir das virgulas
                  const dividirValor:string[] = coluna[chave].split(",")
                  let novoValor:string = ""
                  dividirValor.map((str,index) => {
                    const stringSemPonto = regexPonto.test(str) ? str.replace(regexPonto, "") : str
                    //verifica se está no último index,se sim adiciona o ponto
                    if(index === dividirValor.length - 1){
                      novoValor += "."
                      novoValor += stringSemPonto
                    }
                    //se insere até chegar no ponto
                    else{
                      novoValor += stringSemPonto
                    }
                  })
                  resultados[index][coluna][chave] = novoValor
                }
              })
            })
            if(msgsErro.length > 0){
              setErrorArquivo(msgsErro)
              return
            }
            setErrorArquivo([])
            setArquivo(csv);
            graficoResponse.arquivo = csv
          }
        },
        error: (error) => {
          console.error("Erro ao ler o arquivo:", error.message);
        }
      });
  }
useEffect(() => {
  setGraficosData(prevState => {
              const newState = prevState
              prevState.forEach((g:GraficosIndicador, index:number) => {
                if(g.id === graficoResponse.id){
                  newState[index] = graficoResponse
                }
              })
              return newState
            })
},[tituloGrafico, descricaoGrafico, arquivo, tipoGrafico])
  return (
    <div>
      <div className="form-group">
        <label htmlFor="tituloGrafico">Título do gráfico</label>
        <input
          type="text"
          id="tituloGrafico"
          name="tituloGrafico"
          placeholder="Título do gráfico"
          value={tituloGrafico}
          onChange={(e) => {
            //Guarda o valor atual do tituloGrafico para ser atualizado no array de graficosData
            const valorAtual = e.target.value
            //Após guardar o valor atual, atualiza o estado do campo de texto
            setTituloGrafico(valorAtual)
            graficoResponse.tituloGrafico = valorAtual
          }}
        />
        {errorTitulo && (
          <Alert variant="danger" className="mt-2">
            {errorTitulo}
          </Alert>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="csvGrafico">Dados do gráfico</label>
        {typeof(graficoResponse.arquivo) === "string" ? (
          <div>
            <p>{`Arquivo atual: ${graficoResponse.arquivo.split('/').pop()}`}</p>
          </div>
        ):(
          <div>
            <p>{`Arquivo atual: ${graficoResponse.arquivo.name}`}</p>
          </div>
        ) }
        <input
          id="csvGrafico"
          name="csvGrafico"
          type="file"
          accept=".csv"
          onChange={(e) => {
            const arquivoAtual = e.target.files?.[0] || null
            if (/(\.csv$)/.test(arquivoAtual!.name)){
                sanitizarCSV(arquivoAtual as File)
                //setArquivo(arquivoAtual);
                //graficoResponse.arquivo = arquivoAtual as File
            }
            else{
              setErrorArquivo(prev => [...prev, "Somente arquivos de extensão '.csv' são permitidos"])
            }
          }}
        />
        {errorArquivo.length > 0&& (
          errorArquivo.map(msg => <Alert variant="danger" className="mt-2">
            {msg}
          </Alert>)
          
        )}
      </div>

      <div className="form-group">
        <label htmlFor="descricaoGrafico">Descrição do gráfico</label>
        <input
          type="text"
          id="descricaoGrafico"
          name="descricaoGrafico"
          value={descricaoGrafico}
          onChange={(e) => {
            const valorAtual = e.target.value
            setDescricaoGrafico(e.target.value)
            graficoResponse.descricaoGrafico = valorAtual
          }}
          placeholder="Descrição do gráfico"
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipoGrafico">Tipo de Gráfico</label>
        <Form.Select
          className="form-select"
          aria-label="Tipo de gráfico"
          value={tipoGrafico}
          onChange={(e) => {
            const valorAtual = e.target.value
            setTipoGrafico(valorAtual)
            graficoResponse.tipoGrafico = valorAtual
          }}
        >
          {Object.keys(chaveValorGraficos).map((key) => (
            <option
              key={chaveValorGraficos[key]}
              value={chaveValorGraficos[key]}
            >
              {key}
            </option>
          ))}
        </Form.Select>
        {errorTipo && (
          <Alert variant="danger" className="mt-2">
            {errorTipo}
          </Alert>
        )}
        <p>
          <b>Pré-visualização</b>
        </p>
        {graficoResponse.tipoGrafico && (
          <div style={{ width: "50%", height: "50%", margin: "0 auto" }}>
            <DashboardComponentPreview
              tipoGrafico={graficoResponse.tipoGrafico}
            />
          </div>
        )}
      </div>

      <div className="atualizar">
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          🗑️ Deletar
        </button>

        <label className="checkbox-container">
          <p>Deletar em Lote</p>
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
};
