import React, { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchIndicador, postIndicador } from "./crudIndicador.tsx";
import api from "../../../../api.tsx";
import { GraficosIndicador } from "../../../../interfaces/indicador_interface.tsx";
import "../../css/createIndicador.css";
import { GraficoComponent } from "./components/Grafico.tsx";
import dimensoes from "../../../../utils/const.tsx";
import "../../css/dimensaoPage.css";
import { Alert } from "react-bootstrap";
//array com gráficos a serem inseridos

export const CreateIndicador: FC<{
  dimensao: string | undefined;
  indicadorNome: string | undefined;
}> = ({ dimensao, indicadorNome }) => {
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
  const [errorIndicador, setErrorIndicador] = useState<string | null>(null);
  const [msgsErrorGrafico, setMsgsErrorGrafico] = useState<Array<string>>([]);
  //const [graficoNodeReturn, setGraficoNodeReturn] = useState<boolean>(
  //  false,
  //);
  const [graficoPronto, setGraficoPronto] = useState<boolean>(false);
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
      graficoPronto={graficoPronto}
      setGraficoPronto={setGraficoPronto}
    />,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgsErrorGrafico([])
    indicador && setErrorIndicador(null)
    let graficoNodeReturn = false
     graficoNode.map(async(grafico, index) => {
      index += 1
      if (grafico.props.graficoPronto === false) {
        setMsgsErrorGrafico(prev => [...prev, "Preencha todos os campos obrigatórios do gráfico " + index + "."]);
        graficoNodeReturn = true
        console.log("erro aq")
      }
    });

    if (!indicador){
      setErrorIndicador("O campo de nome do indicador é obrigatório.");
      console.log("erro aq")
      return
    }

    if(graficoNodeReturn){
      graficoNodeReturn = false
      console.log("erro aq")
      return
      }

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
  };

  useEffect(() => {
    if (indicadorNome != undefined) {
      setGraficoPronto(true);
      setPatch(true);
      api
        .get(url)
        .then((response) => {
          setIndicadorAntigo(response.data.nome);
          arrayIndicadorResponse.length = 0;
          const newGraficoNodes = response.data.graficos.map(
            (grafico: any, index: number) => {
              const graficoPatch: GraficosIndicador = {
                id: grafico.id,
                arquivo: grafico.path,
                descricaoGrafico: grafico.descricaoGrafico,
                tituloGrafico: grafico.tituloGrafico,
                tipoGrafico: grafico.tipoGrafico,
              };
              return (
                <GraficoComponent
                  key={index}
                  chaveValorGraficos={chaveValorGraficos}
                  grafico={graficoPatch}
                  arrayIndicadorResponse={arrayIndicadorResponse}
                  graficoPronto={graficoPronto}
                  setGraficoPronto={setGraficoPronto}
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
    setGraficoPronto(false);
    setGraficoNode([
      ...graficoNode,
      <GraficoComponent
        chaveValorGraficos={chaveValorGraficos}
        grafico={undefined}
        arrayIndicadorResponse={arrayIndicadorResponse}
        graficoPronto={graficoPronto}
        setGraficoPronto={setGraficoPronto}
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
          {errorIndicador && <Alert variant="danger" className="mt-2">{errorIndicador}</Alert>}
        </div>

        <h3>Gráficos</h3>
        <div id="graficos">
          {graficoNode.map((grafico, index) => (
            <div key={index} className="grafico-component">
              <h3>Gráfico {index + 1}</h3>
              {grafico}
            </div>
          ))}

        {msgsErrorGrafico.length > 0 && msgsErrorGrafico.map((mensagem) => <Alert variant="danger" className="mt-2">{mensagem}</Alert>) }
        </div>
        <button className="btn btn-add btn-primary" onClick={addGrafico}>
          <span>+</span> Adicionar Gráfico
        </button>
        <div className="d-flex justify-content-between mt-4">

          <button type="button" 
          onClick={() => navigate(`/admin/dimensao/${dimensao}/`)}>
            
          Cancelar
          </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => {
                handleSubmit(e)
              }}
            >

              {patch === false ? "Criar Indicador" : "Modificar Indicador"}
            </button>
        </div>
      </form>
    </div>
  );
};
