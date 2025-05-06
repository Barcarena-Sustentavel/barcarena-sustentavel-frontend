import React, { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchIndicador, postIndicador } from "./crudIndicador.tsx";
import api from "../../../../api.tsx";
import { GraficosIndicador } from "../../../../interfaces/indicador_interface.tsx";
import "../../css/createIndicador.css";
import { GraficoComponent } from "./components/Grafico.tsx";
import dimensoes from "../../../../utils/const.tsx";
import "../../css/dimensaoPage.css";

//array com gráficos a serem inseridos
//const arrayIndicadorResponse: GraficosIndicador[] = []

export const CreateIndicador: FC<{
  dimensao: string | undefined;
  indicadorNome: string | undefined;
}> = ({ dimensao, indicadorNome }) => {
  console.log(indicadorNome);
  const navigate = useNavigate();
  const arrayIndicadorResponse: GraficosIndicador[] = useMemo(() => [], []);
  const [indicadorAntigo, setIndicadorAntigo] = useState<string>("");
  const [patch, setPatch] = useState(false);
  const [indicador, setIndicador] = useState<string>(
    indicadorNome !== undefined ? indicadorNome : "",
  );
  const {
      dimensoesColumn1,
      dimensoesColumn2,
      dimensoesCores12,
      } = dimensoes.GetAllConst();
  const dimensoesColumn12 = {
        ...dimensoesColumn1,
        ...dimensoesColumn2,
      };
  const url = `admin/dimensoes/${dimensao}/indicador/${indicador}/`;
  console.log(url);
  const chaveValorGraficos: { [key: string]: string } = useMemo(
    () => ({
      "Selecione um tipo de gráfico": "",
      Linha: "line",
      "Linha Suave": "spline",
      "Linha Com Coluna": "xy",
      Dispersão: "scatter",
      Coluna: "column",
      Barra: "bar",
      Bolha: "bubble",
      "Mapa de Calor": "heatmap",
      Pizza:"pie"
    }),
    [],
  );
  const [graficoNode, setGraficoNode] = useState<React.ReactElement[]>([
    <GraficoComponent
      chaveValorGraficos={chaveValorGraficos}
      grafico={undefined}
      arrayIndicadorResponse={arrayIndicadorResponse}
    />,
  ]);

  useEffect(() => {
    if (indicadorNome != undefined) {
      setPatch(true);
      api
        .get(url)
        .then((response) => {
          setIndicadorAntigo(response.data.nome);
          arrayIndicadorResponse.length = 0;
          //console.log(arrayIndicadorResponse);
          const newGraficoNodes = response.data.graficos.map(
            (grafico: any, index: number) => {
              const graficoPatch: GraficosIndicador = {
                id: grafico.id,
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
                  arrayIndicadorResponse={arrayIndicadorResponse}
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
  }, [url, chaveValorGraficos, indicadorNome]);

  //Função para adicionar um novo gráfico
  const addGrafico = (e: React.MouseEvent) => {
    e.preventDefault();
    setGraficoNode([
      ...graficoNode,
      <GraficoComponent
        chaveValorGraficos={chaveValorGraficos}
        grafico={undefined}
        arrayIndicadorResponse={arrayIndicadorResponse}
      />,
    ]);
  };

  return (
    <div className="create-indicador-container">
      <div
        style={{
          backgroundColor: `var(--${dimensoesCores12[dimensao!]})`,
        }}
        className="admin-header-dimensao-page"
      >
        <div className="admin-header-dimensao-page-space">
          <div
            style={{
              maskImage: `url(${dimensoesColumn12[dimensao!]})`,
            }}
            className="dimensao-button-header"
          ></div>
          <h1 className="admin-header-dimensao-page">{dimensao}</h1>
        </div>
      </div>
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
              setIndicador(e.target.value);
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
              //console.log(arrayIndicadorResponse)
              patchIndicador(
                dimensao,
                indicadorAntigo,
                indicador,
                arrayIndicadorResponse,
              );
              navigate(`/admin/dimensao/${dimensao}/`);
            } else {
              postIndicador(dimensao, indicador, arrayIndicadorResponse);
              navigate(`/admin/dimensao/${dimensao}/`);
            }
          }}
        >
          {patch === false ? "Criar Indicador" : "Modificar Indicador"}
        </button>
      </form>
    </div>
  );
};
