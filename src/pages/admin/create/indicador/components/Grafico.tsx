import React, { FC, useState, useEffect } from "react";
import { GraficosIndicador } from "../../../../../interfaces/indicador_interface.tsx";
import { Form, Alert } from "react-bootstrap";
import { DashboardComponentPreview } from "./dashboard/dashboard.tsx";
import "./components.css";

interface GraficoComponentProps {
  chaveValorGraficos: { [key: string]: string };
  grafico: GraficosIndicador;
  //arrayIndicadorResponse: GraficosIndicador[];
  setDeleteArray: React.Dispatch<React.SetStateAction<GraficosIndicador[]>>;
  graficosData: GraficosIndicador[];
  setGraficosData: React.Dispatch<React.SetStateAction<GraficosIndicador[]>>;
  //onUpdate?: (grafico: GraficosIndicador) => void;
  onDelete?: () => void;
}

export const GraficoComponent: FC<GraficoComponentProps> = ({
  chaveValorGraficos,
  grafico,
  //arrayIndicadorResponse,
  setDeleteArray,
  graficosData,
  setGraficosData,
  //onUpdate,
  onDelete,
}) => {
  const [graficoAdicionado, setGraficoAdicionado] = useState<boolean>(
    grafico.id !== undefined && grafico.id! > 0,
  );
  const [errorTitulo, setErrorTitulo] = useState<string | null>(null);
  const [errorArquivo, setErrorArquivo] = useState<string | null>(null);
  const [errorTipo, setErrorTipo] = useState<string | null>(null);
  const [modified, setModified] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  //const [newIndicadorResponse, setNewIndicadorResponse] = useState<GraficosIndicador>(grafico);
  const newIndicadorResponse:GraficosIndicador= grafico
  const [tituloGrafico, setTituloGrafico] = useState<string>(newIndicadorResponse.tituloGrafico || "");
  const [descricaoGrafico, setDescricaoGrafico] = useState<string>(newIndicadorResponse.descricaoGrafico || "");
  const [arquivo, setArquivo] = useState<File | string | null>(newIndicadorResponse.arquivo || null);
  const [tipoGrafico, setTipoGrafico] = useState<string>(newIndicadorResponse.tipoGrafico || "");
  useEffect(() => {
    //setNewIndicadorResponse(grafico);
    setGraficoAdicionado(grafico.id !== undefined && grafico.id! > 0);
  }, [grafico]);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    if (e.target.checked) {
      setDeleteArray((prev) => [...prev, newIndicadorResponse]);
    } else {
      setDeleteArray((prev) =>
        prev.filter((item) => item.id !== newIndicadorResponse.id),
      );
    }
  };
/*
  const handleApply = () => {
    // Validar campos
    let hasError = false;

    if (!newIndicadorResponse.tituloGrafico) {
      setErrorTitulo("O título é obrigatório");
      hasError = true;
    } else {
      setErrorTitulo(null);
    }

    if (
      (typeof(newIndicadorResponse.arquivo) === "object") &&
      (!newIndicadorResponse.id || newIndicadorResponse.id <= 0) &&
      (!newIndicadorResponse.arquivo || newIndicadorResponse.arquivo.size === 0)
    ) {
      setErrorArquivo("O arquivo é obrigatório para novos gráficos");
      hasError = true;
    } else {
      setErrorArquivo(null);
    }

    if (!newIndicadorResponse.tipoGrafico) {
      setErrorTipo("Escolha por favor o tipo do gráfico");
      hasError = true;
    } else {
      setErrorTipo(null);
    }

    if (hasError) return;

    // Atualizar ou adicionar ao array de resposta
    if (graficoAdicionado) {
      // Atualizar gráfico existente
      const index = graficosData.findIndex(//arrayIndicadorResponse.findIndex(
        (item) => item.id === newIndicadorResponse.id,
      );
      if (index !== -1) {
        //arrayIndicadorResponse[index] = newIndicadorResponse;
        const graficosDataUpdate = graficosData
        graficosDataUpdate[index] = newIndicadorResponse
        setGraficosData(graficosDataUpdate)
        
        //setGraficosData()
      } else {
        //arrayIndicadorResponse.push(newIndicadorResponse);
        setGraficosData((prev) => [...prev, newIndicadorResponse])
      }
      setModified(true);
    } else {
      // Adicionar novo gráfico
      //arrayIndicadorResponse.push(newIndicadorResponse);
      setGraficosData((prev) => [...prev, newIndicadorResponse])
      setGraficoAdicionado(true);
    }

    // Notificar componente pai sobre a atualização
    //if (onUpdate) {
    //  onUpdate(newIndicadorResponse);
    //}
  };
*/
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      const shouldDelete = window.confirm("Deseja deletar este gráfico?");
      if (shouldDelete) {
        setDeleteArray((prev) => [...prev, newIndicadorResponse]);
      }
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
          //value={newIndicadorResponse.tituloGrafico}
          value={tituloGrafico}
          onChange={(e) => {
            //setNewIndicadorResponse((prevState) => ({
            //   ...prevState,
            //   tituloGrafico: e.target.value,
            // }));
            setTituloGrafico(e.target.value)
            const newArrayIndicadorResponse:GraficosIndicador[] = graficosData
            console.log('newArrayIndicadorResponse',graficosData)
            newArrayIndicadorResponse.map((g, index) => {
              console.log('g.tituloGrafico',g.tituloGrafico)
              console.log('grafico.tituloGrafico',grafico.tituloGrafico)
              if(g.tituloGrafico === grafico.tituloGrafico){
                console.log('atualizando')
                newArrayIndicadorResponse[index].tituloGrafico = tituloGrafico
                setGraficosData(newArrayIndicadorResponse)
                console.log(graficosData)
                return
              }
            })
            // const graficoAntigo:GraficosIndicador | undefined = newArrayIndicadorResponse.find((g) => g.tituloGrafico === grafico.tituloGrafico)
            // console.log('graficoAntigo',graficoAntigo)
            // if (graficoAntigo){
            //   graficoAntigo.tituloGrafico = tituloGrafico //newIndicadorResponse.tituloGrafico
            //   console.log('graficoAntigo',graficoAntigo)
            //   newArrayIndicadorResponse.map((g, index) => {
            //     if (g === grafico){
            //       newArrayIndicadorResponse[index] = graficoAntigo
            //       console.log('novoArray',newArrayIndicadorResponse)
            //       setGraficosData(newArrayIndicadorResponse)
            //       return
            //     }
            //   })
            // }
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
        {/* {newIndicadorResponse.arquivo &&
          newIndicadorResponse.arquivo !== "" && (
            <div>
              <p>{`Arquivo atual: ${newIndicadorResponse.arquivo.split('/')}`}</p>
            </div>
          )} */}
        {typeof(newIndicadorResponse.arquivo) === "string" ? (
          <div>
            <p>{`Arquivo atual: ${newIndicadorResponse.arquivo.split('/').pop()}`}</p>
          </div>
        ):(
          <div>
            <p>{`Arquivo atual: ${newIndicadorResponse.arquivo.name}`}</p>
          </div>
        ) }
        <input
          id="csvGrafico"
          name="csvGrafico"
          type="file"
          onChange={(e) => {
            setArquivo(e.target.files?.[0] || null);
            const newArrayIndicadorResponse = graficosData
            const graficoAntigo:GraficosIndicador | undefined = newArrayIndicadorResponse.find((g) => g === grafico)
            const file = arquivo
            if (file && graficoAntigo !== undefined) {
                newArrayIndicadorResponse.map((g, index) => {
                if (g === grafico){
                  graficoAntigo!.arquivo = file
                  newArrayIndicadorResponse[index] = graficoAntigo
                  setGraficosData(newArrayIndicadorResponse)
                  return
                }
              })
              // setNewIndicadorResponse((prevState) => ({
              //   ...prevState,
              //   arquivo: file,
              // }));
            }
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
          //value={newIndicadorResponse.descricaoGrafico}
          value={descricaoGrafico}
          onChange={(e) => {
            setDescricaoGrafico(e.target.value)
            const newArrayIndicadorResponse = graficosData
            const graficoAntigo:GraficosIndicador | undefined = newArrayIndicadorResponse.find((g) => g === grafico)
            if (graficoAntigo){
              graficoAntigo.descricaoGrafico = descricaoGrafico //e.target.value
              newArrayIndicadorResponse.map((g, index) => {
                if (g === grafico){
                  newArrayIndicadorResponse[index] = graficoAntigo
                  setGraficosData(newArrayIndicadorResponse)
                  return
                }
              })
            }
            // setNewIndicadorResponse((prevState) => ({
            //   ...prevState,
            //   tituloGrafico: e.target.value,
            // }));
          }}
          placeholder="Descrição do gráfico"
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipoGrafico">Tipo de Gráfico</label>
        <Form.Select
          className="form-select"
          aria-label="Tipo de gráfico"
          //value={newIndicadorResponse.tipoGrafico}
          value={tipoGrafico}
          onChange={(e) => {
            const newArrayIndicadorResponse = graficosData
            const graficoAntigo:GraficosIndicador | undefined = newArrayIndicadorResponse.find((g) => g === grafico)
            if (graficoAntigo){
              graficoAntigo.tipoGrafico = tipoGrafico //e.target.value
              newArrayIndicadorResponse.map((g, index) => {
                if (g === grafico){
                  newArrayIndicadorResponse[index] = graficoAntigo
                  setGraficosData(newArrayIndicadorResponse)
                  return
                }
              })
            }
            // setNewIndicadorResponse((prevState) => ({
            //   ...prevState,
            //   tituloGrafico: e.target.value,
            // }));
          }}
        >
          <option value="">Selecione um tipo de gráfico</option>
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
        {newIndicadorResponse.tipoGrafico && (
          <div style={{ width: "50%", height: "50%", margin: "0 auto" }}>
            <DashboardComponentPreview
              tipoGrafico={newIndicadorResponse.tipoGrafico}
            />
          </div>
        )}
      </div>

      <div className="atualizar">
        {/* <button
          type="button"
          className={`btn ${graficoAdicionado ? "btn-success" : "btn-apply"}`}
          onClick={handleApply}
        >
          {graficoAdicionado ? "Atualizar" : "Aplicar"}
        </button> */}

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
