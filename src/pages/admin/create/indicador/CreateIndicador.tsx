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
  const { dimensoesColumn1, dimensoesColumn2, dimensoesCores12 } =
    dimensoes.GetAllConst();
  const dimensoesColumn12 = {
    ...dimensoesColumn1,
    ...dimensoesColumn2,
  };
  const url = `admin/dimensoes/${dimensao}/indicador/${indicador}/`;
  const [errorIndicador, setErrorIndicador] = useState<string | null>(null);
  const [msgsErrorGrafico, setMsgsErrorGrafico] = useState<Array<string>>([]);
  const [deleteArray, setDeleteArray] = useState<Array<GraficosIndicador>>([]);
  const [graficosData, setGraficosData] = useState<GraficosIndicador[]>([]);
  const [nextId, setNextId] = useState(1);

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
      Pizza: "pie",
      Tabela: "tabela",
    }),
    [],
  );

  const handleDeleteGrafico = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (deleteArray.length === 0) {
      alert("Selecione pelo menos um gráfico para deletar");
      return;
    }

    // Deletar gráficos da API (apenas os que existem no backend)
    deleteArray.forEach((grafico) => {
      if (grafico.id && grafico.id > 0 && indicadorNome && dimensao) {
        const url = `/admin/dimensoes/${dimensao}/indicador/${indicadorNome}/anexos/${grafico.id}/`;
        api
          .delete(url)
          .catch((error) => console.error("Erro ao deletar:", error));
      }
    });

    // Remover gráficos do estado local
    setGraficosData((prev) =>
      prev.filter(
        (grafico) =>
          !deleteArray.some(
            (deletedGrafico) =>
              deletedGrafico.id === grafico.id &&
              deletedGrafico.tituloGrafico === grafico.tituloGrafico,
          ),
      ),
    );

    // Limpar array de deleção
    setDeleteArray([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgsErrorGrafico([]);
    indicador && setErrorIndicador(null);

    // Verificar se todos os gráficos estão preenchidos corretamente
    const graficosComErro = graficosData.filter(
      (grafico) =>
        !grafico.tituloGrafico ||
        !grafico.tipoGrafico ||
        (grafico.id &&
          grafico.id <= 0 &&
          (!grafico.arquivo || grafico.arquivo.size === 0)),
    );

    if (graficosComErro.length > 0) {
      setMsgsErrorGrafico([
        "Preencha todos os campos obrigatórios dos gráficos.",
      ]);
      return;
    }

    if (!indicador) {
      setErrorIndicador("O campo de nome do indicador é obrigatório.");
      return;
    }

    // Atualizar arrayIndicadorResponse com os dados atuais
    arrayIndicadorResponse.length = 0;
    graficosData.forEach((grafico) => {
      arrayIndicadorResponse.push(grafico);
    });

    if (patch === true) {
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
      setPatch(true);
      api
        .get(url)
        .then((response) => {
          setIndicadorAntigo(response.data.nome);
          arrayIndicadorResponse.length = 0;

          const graficosFromApi: GraficosIndicador[] =
            response.data.graficos.map((grafico: any) => ({
              id: grafico.id,
              arquivo: grafico.path,
              descricaoGrafico: grafico.descricaoGrafico,
              tituloGrafico: grafico.tituloGrafico,
              tipoGrafico: grafico.tipoGrafico,
            }));

          setGraficosData(graficosFromApi);

          // Configurar nextId baseado no maior ID da API
          const maxId = graficosFromApi.reduce(
            (max, grafico) => Math.max(max, grafico.id || 0),
            0,
          );
          setNextId(maxId + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url, indicadorNome, arrayIndicadorResponse]);

  const addGrafico = (e: React.MouseEvent) => {
    e.preventDefault();

    const novoGrafico: GraficosIndicador = {
      id: -nextId, // ID negativo para novos gráficos
      arquivo: new File([], ""),
      descricaoGrafico: "",
      tituloGrafico: "",
      tipoGrafico: "",
    };

    setGraficosData((prev) => [...prev, novoGrafico]);
    setNextId((prev) => prev + 1);
  };

  const updateGrafico = (index: number, updatedGrafico: GraficosIndicador) => {
    setGraficosData((prev) =>
      prev.map((grafico, i) => (i === index ? updatedGrafico : grafico)),
    );
  };

  const deleteSingleGrafico = (grafico: GraficosIndicador) => {
    // Deletar da API se for um gráfico existente
    if (grafico.id && grafico.id > 0 && indicadorNome && dimensao) {
      console.log(grafico.id);
      const url = `/admin/dimensoes/${dimensao}/indicador/${indicadorNome}/anexos/${grafico.id}/`;
      api
        .delete(url)
        .catch((error) => console.error("Erro ao deletar:", error));
    }

    // Remover do estado local
    setGraficosData((prev) => prev.filter((g) => g.id !== grafico.id));

    // Remover do array de deleção se estiver lá
    setDeleteArray((prev) => prev.filter((g) => g.id !== grafico.id));
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
          {errorIndicador && (
            <Alert variant="danger" className="mt-2">
              {errorIndicador}
            </Alert>
          )}
        </div>

        <h3>Gráficos</h3>
        <div id="graficos">
          {graficosData.map((grafico, index) => (
            <div
              key={grafico.id || `new-${index}`}
              className="grafico-component"
            >
              <h3>Gráfico {index + 1}</h3>
              <GraficoComponent
                chaveValorGraficos={chaveValorGraficos}
                grafico={grafico}
                arrayIndicadorResponse={arrayIndicadorResponse}
                setDeleteArray={setDeleteArray}
                onUpdate={(updatedGrafico) =>
                  updateGrafico(index, updatedGrafico)
                }
                onDelete={() => deleteSingleGrafico(grafico)}
              />
            </div>
          ))}

          {msgsErrorGrafico.length > 0 &&
            msgsErrorGrafico.map((mensagem, index) => (
              <Alert key={index} variant="danger" className="mt-2">
                {mensagem}
              </Alert>
            ))}
        </div>

        <button className="btn btn-add btn-primary" onClick={addGrafico}>
          <span>+</span> Adicionar Gráfico
        </button>

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/dimensao/${dimensao}/`)}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            {patch === false ? "Criar Indicador" : "Modificar Indicador"}
          </button>

          <button
            type="button"
            onClick={handleDeleteGrafico}
            disabled={deleteArray.length === 0}
          >
            Deletar Gráficos Selecionados ({deleteArray.length})
          </button>
        </div>
      </form>
    </div>
  );
};
/*import React, { FC, useEffect, useMemo, useState } from "react";
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
  //Indicadores a serem mandados
  const arrayIndicadorResponse: GraficosIndicador[] = useMemo(() => [], []);
  const [indicadorAntigo, setIndicadorAntigo] = useState<string>("");
  const [patch, setPatch] = useState(false);
  const [indicador, setIndicador] = useState<string>(
    indicadorNome !== undefined ? indicadorNome : "",
  );
  const { dimensoesColumn1, dimensoesColumn2, dimensoesCores12 } =
    dimensoes.GetAllConst();
  const dimensoesColumn12 = {
    ...dimensoesColumn1,
    ...dimensoesColumn2,
  };
  const url = `admin/dimensoes/${dimensao}/indicador/${indicador}/`;
  const [errorIndicador, setErrorIndicador] = useState<string | null>(null);
  const [msgsErrorGrafico, setMsgsErrorGrafico] = useState<Array<string>>([]);
  const [deleteArray, setDeleteArray] = useState<Array<GraficosIndicador>>([]);
  //Array utilizado para guardar o último estado anterior do array de deleção
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
      Pizza: "pie",
      Tabela: "tabela",
    }),
    [],
  );

  // const [graficoNode, setGraficoNode] = useState<React.ReactElement[]>([
  //   <GraficoComponent
  //     chaveValorGraficos={chaveValorGraficos}
  //     grafico={undefined}
  //     arrayIndicadorResponse={arrayIndicadorResponse}
  //     setDeleteArray={setDeleteArray}
  //   />,
  // ]);
  const [graficosData, setGraficosData] = useState<GraficosIndicador[]>([]);
  const [nextId, setNextId] = useState(1); // Para novos gráficos
  const handleDeleteGrafico = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    graficoNode.map((graficoDelete, index) => {
      console.log(graficoDelete);
      console.log(graficoNode);
      if (graficoDelete.props.grafico !== undefined) {
        if (graficoDelete.props.grafico.id !== null) {
          const url = `/api/admin/dimensoes/${dimensao}/indicador/${indicadorNome}/anexos/${graficoDelete.props.grafico.id}/`;

          fetch(url, { method: "DELETE" })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro na requisição: " + response.statusText);
              }
            })
            .catch((error) => {
              console.error("Houve um problema com a operação fetch:", error);
            });
          setGraficoNode((prev) =>
            prev.filter((prev) => prev !== graficoDelete),
          );
        } else {
          setGraficoNode((prev) =>
            prev.filter((prev) => prev !== graficoDelete),
          );
        }
      } else {
        setGraficoNode((prev) => prev.filter((prev) => prev !== graficoDelete));
        setDeleteArray((prev) =>
          prev.filter((prev) => prev !== deleteArray[index]),
        );
      }
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgsErrorGrafico([]);
    indicador && setErrorIndicador(null);
    graficoNode.map(async (grafico, index) => {
      index += 1;
      if (grafico.props.graficoPronto === false) {
        setMsgsErrorGrafico((prev) => [
          ...prev,
          "Preencha todos os campos obrigatórios do gráfico " + index + ".",
        ]);
        console.log("erro aq");
      }
    });

    if (!indicador) {
      setErrorIndicador("O campo de nome do indicador é obrigatório.");
      console.log("erro aq");
      return;
    }
    if (patch === true) {
      console.log(arrayIndicadorResponse);
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
                  setDeleteArray={setDeleteArray}
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
  }, [url, chaveValorGraficos, indicadorNome, arrayIndicadorResponse, patch]);

  //Função para adicionar um novo gráfico
  const addGrafico = (e: React.MouseEvent) => {
    e.preventDefault();
    setGraficoNode([
      ...graficoNode,
      <GraficoComponent
        chaveValorGraficos={chaveValorGraficos}
        grafico={undefined}
        arrayIndicadorResponse={arrayIndicadorResponse}
        setDeleteArray={setDeleteArray}
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
          {errorIndicador && (
            <Alert variant="danger" className="mt-2">
              {errorIndicador}
            </Alert>
          )}
        </div>

        <h3>Gráficos</h3>
        <div id="graficos">
          {graficoNode.map((grafico, index) => (
            <div key={index} className="grafico-component">
              <h3>Gráfico {index + 1}</h3>
              {grafico}
            </div>
          ))}

          {msgsErrorGrafico.length > 0 &&
            msgsErrorGrafico.map((mensagem) => (
              <Alert variant="danger" className="mt-2">
                {mensagem}
              </Alert>
            ))}
        </div>
        <button className="btn btn-add btn-primary" onClick={addGrafico}>
          <span>+</span> Adicionar Gráfico
        </button>
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/dimensao/${dimensao}/`)}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {patch === false ? "Criar Indicador" : "Modificar Indicador"}
          </button>
          <button type="button" onClick={(e) => handleDeleteGrafico(e)}>
            Deletar Gráficos
          </button>
        </div>
      </form>
    </div>
  );
};*/
