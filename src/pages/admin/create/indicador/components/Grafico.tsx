import React, { FC, useState, useEffect } from "react";
import { GraficosIndicador } from "../../../../../interfaces/indicador_interface.tsx";
import { Form, Alert } from "react-bootstrap";
import { DashboardComponentPreview } from "./dashboard/dashboard.tsx";
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
  const [errorArquivo, setErrorArquivo] = useState<string | null>(null);
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
          onChange={(e) => {
            const arquivoAtual = e.target.files?.[0] || null
            setArquivo(arquivoAtual);
            graficoResponse.arquivo = arquivoAtual as File
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
