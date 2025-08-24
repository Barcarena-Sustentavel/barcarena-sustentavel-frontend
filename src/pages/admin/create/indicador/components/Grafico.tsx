import React, { FC, useState } from "react";
import { GraficosIndicador } from "../../../../../interfaces/indicador_interface.tsx";
import { Form, Alert } from "react-bootstrap";
import { DashboardComponentPreview } from "./dashboard/dashboard.tsx";
import "./components.css";
interface GraficoComponentProps {
  chaveValorGraficos: { [key: string]: string };
  grafico: GraficosIndicador | undefined;
  arrayIndicadorResponse: GraficosIndicador[];
  setDeleteArray: React.Dispatch<React.SetStateAction<GraficosIndicador[]>>;
}
export const GraficoComponent: FC<GraficoComponentProps> = ({
  chaveValorGraficos,
  grafico,
  arrayIndicadorResponse,
  setDeleteArray,
}) => {
  //verifica se o grafico já foi adicionado para ser modificado ou não
  const [graficoAdicionado, setGraficoAdicionado] = useState<boolean>(
    grafico !== undefined ? true : false,
  );
  const [errorTitulo, setErrorTitulo] = useState<string | null>(null);
  const [errorArquivo, setErrorArquivo] = useState<string | null>(null);
  const [errorTipo, setErrorTipo] = useState<string | null>(null);
  const [modified, setModified] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [newIndicadorResponse, setNewIndicadorResponse] =
    useState<GraficosIndicador>(
      grafico === undefined
        ? {
            id: null,
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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    const novo_grafico_delete: GraficosIndicador = {
      id: grafico?.id || null,
      arquivo: grafico?.arquivo || new File([], ""),
      descricaoGrafico: grafico?.descricaoGrafico || "",
      tituloGrafico: grafico?.tituloGrafico || "",
      tipoGrafico: grafico?.tipoGrafico || "",
    };
    if (e.target.checked) {
      setDeleteArray((prev) => [...prev, novo_grafico_delete]);
    } else {
      setDeleteArray((prev) =>
        prev.filter(
          (item) => item.tituloGrafico !== novo_grafico_delete.tituloGrafico,
        ),
      );
    }
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="tituloGrafico">Título do gráfico</label>
        <input
          type="text"
          id="tituloGrafico"
          name="tituloGrafico"
          placeholder="Título do gráfico"
          value={newIndicadorResponse.tituloGrafico}
          onChange={(e) => {
            setNewIndicadorResponse((prevState) => ({
              ...prevState,
              tituloGrafico: e.target.value,
            }));
          }} //}
        />
        {errorTitulo && (
          <Alert variant="danger" className="mt-2">
            {errorTitulo}
          </Alert>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="csvGrafico">Dados do gráfico</label>
        {newIndicadorResponse.arquivo.name !== "" && (
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
        {errorArquivo && (
          <Alert variant="danger" className="mt-2">
            {errorArquivo}
          </Alert>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="descricaoGrafico">Descrição do gráfico</label>
        <input
          type="text"
          id="descricaoGrafico"
          name="descricaoGrafico"
          value={newIndicadorResponse.descricaoGrafico}
          onChange={(e) => {
            setNewIndicadorResponse((prevState) => ({
              ...prevState,
              descricaoGrafico: e.target.value,
            }));
          }}
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
          onChange={(e) => {
            setNewIndicadorResponse((prevState) => ({
              ...prevState,
              tipoGrafico: e.target.value,
            }));
          }}
        >
          <div></div>
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
        {newIndicadorResponse.tipoGrafico !== "" && (
          <div style={{ width: "50%", height: "50%", margin: "0 auto" }}>
            <DashboardComponentPreview
              tipoGrafico={newIndicadorResponse.tipoGrafico}
            />
          </div>
        )}
      </div>

      <div className="atualizar">
        <button
          type="button"
          className={`btn ${graficoAdicionado ? "btn-success" : "btn-apply"}`}
          onClick={() => {
            newIndicadorResponse.arquivo.size > 0 && setErrorArquivo(null);
            newIndicadorResponse.tituloGrafico && setErrorTitulo(null);
            newIndicadorResponse.tipoGrafico && setErrorTipo(null);

            if (
              newIndicadorResponse.arquivo.size === 0 ||
              !newIndicadorResponse.tituloGrafico ||
              !newIndicadorResponse.tipoGrafico
            ) {
              //setGraficoPronto(false);
              if (newIndicadorResponse.arquivo.size === 0) {
                setErrorArquivo("O arquivo é obrigatório");
              }
              if (!newIndicadorResponse.tituloGrafico) {
                setErrorTitulo("O título é obrigatório");
              }
              if (!newIndicadorResponse.tipoGrafico) {
                setErrorTipo("Escolha por favor o tipo do gráfico");
              }
              return;
            }
            if (graficoAdicionado === true) {
              arrayIndicadorResponse.map((indicador) => {
                if (indicador === cacheIndicadorResponse) {
                  indicador = newIndicadorResponse;
                  setCacheIndicadorResponse(newIndicadorResponse);

                  return;
                }
              });
              if (modified === false) {
                arrayIndicadorResponse.push(newIndicadorResponse);
                console.log(arrayIndicadorResponse);
                setModified(true);
              } else {
                arrayIndicadorResponse.map((array) => {
                  if (array === newIndicadorResponse) {
                    const index = arrayIndicadorResponse.indexOf(array);
                    arrayIndicadorResponse[index] = newIndicadorResponse;
                  }
                });
              }
              return;
            } else {
              setCacheIndicadorResponse(newIndicadorResponse);
              arrayIndicadorResponse.push(newIndicadorResponse);
              setGraficoAdicionado(true);
            }
          }}
        >
          {graficoAdicionado ? "Atualizar" : "Aplicar"}
        </button>
        <label className="checkbox-container">
          <p>Deletar Gráfico</p>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e)}
          ></input>
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
};
