import React, { FC, useEffect, useState } from "react";
import { patchIndicador, postIndicador } from "./crudIndicador.tsx";
import { Form } from "react-bootstrap";
import api from "../../../../api.tsx";
import { GraficosIndicador } from "../../../../interfaces/indicador_interface.tsx";
import "../../css/createIndicador.css";

interface GraficoComponentProps {
  chaveValorGraficos: { [key: string]: string };
  grafico: GraficosIndicador | undefined;
}
let arrayIndicadorResponse: GraficosIndicador[] = [];

export const CreateIndicador: FC</*CreateIndicadorProps*/ {
  dimensao: string | undefined;
  indicadorNome: string | undefined;
}> = ({ dimensao, indicadorNome }) => {
  //console.log(indicadorNome)
  const [indicadorAntigo, setIndicadorAntigo] = useState<string>("");
  const [patch, setPatch] = useState(false);
  const [indicador, setIndicador] = useState<string>("");
  const url = `admin/dimensoes/${dimensao}/indicador/${indicadorNome}/`;
  const chaveValorGraficos: { [key: string]: string } = {
    "Selecione um tipo de gráfico": "",
    Linha: "line",
    "Linha Suave": "spline",
    Área: "area",
    "Área Suave": "areaspline",
    Dispersão: "scatter",
    Coluna: "column",
    Barra: "bar",
    Bolha: "bubble",
    "Intervalo de Área": "arearange",
    "Intervalo de Coluna": "columnrange",
    "Diagrama de Caixa": "boxplot",
    "Mapa de Calor": "heatmap",
    Cascata: "waterfall",
    Funil: "funnel",
    Pirâmide: "pyramid",
    "Mapa de Árvore": "treemap",
    "Grafo de Rede": "networkgraph",
    "Linha do Tempo": "timeline",
  };
  const [graficoNode, setGraficoNode] = useState<React.ReactElement[]>([
    <GraficoComponent
      chaveValorGraficos={chaveValorGraficos}
      grafico={undefined}
    />,
  ]);

  useEffect(() => {
    if (indicadorNome != undefined) {
      setPatch(true);
      //const graficosPatchLista:GraficosIndicador[] = []

      api
        .get(url)
        .then((response) => {
          console.log(response.data);
          setIndicador(response.data.nome);

          const newGraficoNodes = response.data.graficos.map(
            (grafico: any, index: number) => {
              const graficoPatch: GraficosIndicador = {
                arquivo: grafico.path,
                descricaoGrafico: grafico.descricaoGrafico,
                tituloGrafico: grafico.tituloGrafico,
                tipoGrafico: grafico.tipoGrafico,
              };
              // Return a new component with the initial data
              return (
                <GraficoComponent
                  key={index}
                  chaveValorGraficos={chaveValorGraficos}
                  grafico={graficoPatch}
                />
              );
            },
          );

          // Update the state with the new components
          setGraficoNode(newGraficoNodes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [patch, url, indicadorNome]);

  //Função para adicionar um novo gráfico
  const addGrafico = (e: React.MouseEvent) => {
    e.preventDefault();
    setGraficoNode([
      ...graficoNode,
      <GraficoComponent
        chaveValorGraficos={chaveValorGraficos}
        grafico={undefined}
      />,
    ]);
  };

  return (
    <div className="create-indicador-container">
      <h2 className="create-indicador-title">
        {patch === false ? "Criar Novo Indicador" : "Modificar Indicador"}
      </h2>
      <form className="create-indicador-form">
        <div className="form-group">
          <label htmlFor="nomeIndicador">Nome do Indicador</label>
          <input
            type="text"
            placeholder="Nome do Indicador"
            id="idIndicador"
            name="nomeIndicador"
            value={indicador}
            onChange={(e) => {
              if (patch === true) {
                setIndicadorAntigo(indicador);
                setIndicador(e.target.value);
              } else {
                setIndicador(e.target.value);
              }
            }}
          />
        </div>

        <h3>Gráficos</h3>
        <div id="graficos">
          {graficoNode.map((grafico, index) => (
            <div key={index} className="grafico-component">
              <h3>Gráfico {index + 1}</h3>
              {grafico}
            </div>
          ))}
        </div>
        <button className="btn btn-add btn-primary" onClick={addGrafico}>
          <span>+</span> Adicionar Gráfico
        </button>

        <button
          type="button"
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            if (patch === true) {
              patchIndicador(
                dimensao,
                indicadorAntigo,
                indicador,
                arrayIndicadorResponse,
              );
            } else {
              postIndicador(dimensao, indicador, arrayIndicadorResponse);
            }
          }}
        >
          {patch === false ? "Criar Indicador" : "Modificar Indicador"}
        </button>
      </form>
    </div>
  );
};

const GraficoComponent: FC<GraficoComponentProps> = ({
  chaveValorGraficos,
  grafico,
}) => {
  const [graficoAdicionado, setGraficoAdicionado] = useState<boolean>(false);
  const [newIndicadorResponse, setNewIndicadorResponse] =
    useState<GraficosIndicador>(
      grafico === undefined
        ? {
            arquivo: new File([], ""),
            descricaoGrafico: "",
            tituloGrafico: "",
            tipoGrafico: "",
          }
        : grafico,
    );
  const [cacheIndicadorResponse, setCacheIndicadorResponse] = useState<
    GraficosIndicador | undefined
  >(undefined);

  return (
    <div>
      <div className="form-group">
        <label htmlFor="tituloGrafico">Título do gráfico</label>
        <input
          type="text"
          id="tituloGrafico"
          name="tituloGrafico"
          placeholder="Título do gráfico"
          value={
            newIndicadorResponse.tituloGrafico !== ""
              ? newIndicadorResponse.tituloGrafico
              : ""
          }
          onChange={(e) =>
            setNewIndicadorResponse((prevState) => ({
              ...prevState,
              tituloGrafico: e.target.value,
            }))
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="csvGrafico">Dados do gráfico</label>
        {newIndicadorResponse.arquivo !== "" && (
          <div>
            <p>{`Arquivo atual: ${newIndicadorResponse.arquivo}`}</p>
          </div>
        )}
        <input
          required
          id="csvGrafico"
          name="csvGrafico"
          type="file"
          onChange={(e) => {
            setNewIndicadorResponse((prevState) => ({
              ...prevState,
              arquivo: e.target.files![0],
            }));
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="descricaoGrafico">Descrição do gráfico</label>
        <input
          type="text"
          id="descricaoGrafico"
          name="descricaoGrafico"
          value={
            newIndicadorResponse.descricaoGrafico !== ""
              ? newIndicadorResponse.descricaoGrafico
              : ""
          }
          onChange={(e) =>
            setNewIndicadorResponse((prevState) => ({
              ...prevState,
              descricaoGrafico: e.target.value,
            }))
          }
          placeholder="Descrição do gráfico"
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipoGrafico">Tipo de Gráfico</label>
        <Form.Select
          className="form-select"
          aria-label="Tipo de gráfico"
          value={
            newIndicadorResponse.tipoGrafico !== ""
              ? newIndicadorResponse.tipoGrafico
              : ""
          }
          onChange={(e) =>
            setNewIndicadorResponse((prevState) => ({
              ...prevState,
              tipoGrafico: e.target.value,
            }))
          }
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
      </div>

      <button
        type="button"
        className={`btn ${graficoAdicionado ? "btn-success" : "btn-apply"}`}
        onClick={() => {
          if (graficoAdicionado === true) {
            arrayIndicadorResponse.map((indicador) => {
              if (indicador === cacheIndicadorResponse) {
                indicador = newIndicadorResponse;
                setCacheIndicadorResponse(newIndicadorResponse);
                setGraficoAdicionado(true);
                return;
              }
            });
            console.log(arrayIndicadorResponse);
          } else {
            setCacheIndicadorResponse(newIndicadorResponse);
            arrayIndicadorResponse.push(newIndicadorResponse);
            console.log(arrayIndicadorResponse);
            setGraficoAdicionado(true);
          }
        }}
      >
        {graficoAdicionado ? "Atualizar" : "Aplicar"}
      </button>
    </div>
  );
};
