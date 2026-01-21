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
import { Collapse } from "react-bootstrap"
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, pointerWithin} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const CreateIndicador: FC<{
  dimensao: string | undefined;
  indicadorNome: string | undefined;
}> = ({ dimensao, indicadorNome }) => {
  const navigate = useNavigate();
  //Array para armazenar os gráficos antes de enviar para a API
  //const arrayIndicadorResponse: GraficosIndicador[] = useMemo(() => [], []);
  //Guarda o nome do indicador antigo para o patch
  const [indicadorAntigo, setIndicadorAntigo] = useState<string>("");
  //Muda o estado para realizar um patch
  const [patch, setPatch] = useState(false);
  //Faz um set do nome do indicador atual
  const [indicador, setIndicador] = useState<string>(
    indicadorNome !== undefined ? indicadorNome : "",
  );
  //Array que guarda os dados dos gráficos para que possam ser enviados definitivamente
  const [graficosData, setGraficosData] = useState<GraficosIndicador[]>([]);
  //Atributos relacionados aos nomes das colunas e suas cores
  const { dimensoesColumn1, dimensoesColumn2, dimensoesCores123 } =
    dimensoes.GetAllConst();
  const dimensoesColumn12 = {
    ...dimensoesColumn1,
    ...dimensoesColumn2,
  };
  //URL para recuperar dados do indicador
  const url = `admin/dimensoes/${dimensao}/indicador/${indicador}/`;
  //Mensagem de erros do indicador
  const [errorIndicador, setErrorIndicador] = useState<string | null>(null);
  //Mensagem de erros dos gráficos
  const [msgsErrorGrafico, setMsgsErrorGrafico] = useState<Array<string>>([]);
  //Array para armazenar os gráficos que devem ser deletados
  const [deleteArray, setDeleteArray] = useState<Array<GraficosIndicador>>([]);
  const [nextId, setNextId] = useState(1);

  const chaveValorGraficos: { [key: string]: string } = useMemo(
    () => ({
      //"Selecione um tipo de gráfico": "",
      Linha: "line",
      "Linha Suave": "spline",
      "Linha Com Coluna": "xy",
      Dispersão: "scatter",
      Coluna: "column",
      Barra: "bar",
      "Mapa de Calor": "heatmap",
      Pizza: "pie",
      "Área": "area",
      Tabela: "tabela",
    }),
    [],
  );

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setOpenStates(prev => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  //Deletar os gráficos selecionados
  const handleDeleteGrafico = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //Verifica se há gráficos selecionados
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

  //Faz o submit do a
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
          typeof(grafico.arquivo) === "object" &&
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

    if (patch === true) {
      //console.log(graficosData)
      patchIndicador(
        dimensao,
        indicadorAntigo,
        indicador,
        graficosData,
      );
      navigate(`/admin/dimensao/${dimensao}/`);
    } else {
      //postIndicador(dimensao, indicador, arrayIndicadorResponse);
      postIndicador(dimensao, indicador, graficosData);
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
          //arrayIndicadorResponse.length = 0;
          //console.log(response.data.graficos);

          const graficosFromApi: GraficosIndicador[] =
            response.data.graficos.map((grafico: any, index: any) => ({
              id: grafico.id,
              arquivo: grafico.path,
              descricaoGrafico: grafico.descricaoGrafico,
              tituloGrafico: grafico.tituloGrafico,
              tipoGrafico: grafico.tipoGrafico,
              posicao: grafico.posicaoGrafico ?? index
            }));


          setGraficosData(graficosFromApi.sort((a: GraficosIndicador, b: GraficosIndicador) => a.posicao - b.posicao));

          // Configurar nextId baseado no maior ID da API
          const maxId = graficosFromApi.reduce(
            (max, grafico) => Math.max(max, grafico.id || 0),
            0,
          );
          setNextId(maxId + 1);

          for(const grafico of graficosFromApi){
            setOpenStates(prev =>({
                ...prev,
              [grafico.id]: false,
          }))
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    //console.log(openStates);
  }, [openStates]);

  const addGrafico = (e: React.MouseEvent) => {
    e.preventDefault();

    const novoGrafico: GraficosIndicador = {
      id: -nextId, // ID negativo para novos gráficos
      arquivo: new File([], ""),
      descricaoGrafico: "",
      tituloGrafico: "",
      tipoGrafico: "",
      posicao: graficosData.length
    };

    setGraficosData((prev) => [...prev, novoGrafico]);
    setOpenStates(prev => ({
      ...prev,
      [novoGrafico.id]: true,
    }));
    setNextId((prev) => prev + 1);
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

  const sensitiveAnimateLayoutChanges = (args: any) => {
      const { isSorting, wasDragging } = args;

      // Se estiver arrastando ou ordenando, bloqueie animações de layout (altura/largura)
      if (isSorting || wasDragging) {
        return false; // <--- Força bruta: não anima layout shifts, apenas transform
      }

      return defaultAnimateLayoutChanges(args);
    };

  function SortableGrafico({
    id, 
    index,
    open,
    tituloGrafico,
    children
  }: { id: string; index: number, open: boolean, tituloGrafico: string, children: React.ReactNode }) {

    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id,
       animateLayoutChanges: sensitiveAnimateLayoutChanges,
      });
    const style = { transform: CSS.Translate.toString(transform), transition, opacity: isDragging ? 0: 1 , };
    
    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <div
          key={id || `new-${index}`}
          className="grafico-component"
        >
          <i
          className={openStates[Number(id)] ? ("bi bi-arrows-angle-contract collapse-icon"): 
            ("bi bi-arrows-angle-expand collapse-icon")
          }
          onClick={() => toggle(Number(id))}
          aria-expanded={openStates[Number(id)]}
          >
          </i>
          <span className="move-icon" {...listeners} style={{ cursor: "grab", marginRight: 8 }}>⠿</span>
          <h3>Gráfico {index + 1} { !open ? (" - " + tituloGrafico): ("")}</h3>
          {children}
      </div>
      </div>
    );

  }
  
  function SortableList() {

    function normalizarPosicoes(arr: GraficosIndicador[]) {
      return arr.map((grafico: GraficosIndicador, index: number) => ({
        ...grafico,
        posicao: index,
      }));
    }

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
    const [activeId, setActiveId] = useState(null);
    //useEffect(() => {
    //  console.log(`activeId = ${activeId}\ntypeof(activeId) = ${typeof(activeId)}\n${graficosData.find(grafico => grafico.id === activeId)}`)}, [activeId]);

    function onDragStart(event: any) {
      setActiveId(event.active.id);
    }


    function onDragEnd(event: any) {
      const { active, over } = event;

      // Verificação básica
      if (!over || active.id === over.id) return;

      setGraficosData((prev) => {
        // 1. Encontre os índices no array ATUAL (sem reordenar antes)
        // Usamos String() para garantir que comparação de número com string funcione
        const oldIndex = prev.findIndex((item) => String(item.id) === String(active.id));
        const newIndex = prev.findIndex((item) => String(item.id) === String(over.id));

        // Se não encontrar algum dos índices (segurança), retorna o estado anterior sem mudar nada
        if (oldIndex === -1 || newIndex === -1) return prev;

        // 2. Move o item no array
        const novoArray = arrayMove(prev, oldIndex, newIndex);

        // 3. Só AGORA você normaliza as posições (atualiza a propriedade .posicao)
        // para enviar ao backend ou salvar
        return normalizarPosicoes(novoArray);
      });
      setActiveId(null);
    }
    //console.log('graficosData', graficosData)
    const view = [...graficosData].sort((a,b) => a.posicao - b.posicao);
    //const view = graficosData.sort((a,b) => a.posicao - b.posicao);

    view.forEach((element, index, array) => {
      if(view[index].posicao != index)
        view[index].posicao = index
    });
    console.log(graficosData)
    return (
      <DndContext sensors={sensors}
        collisionDetection={pointerWithin}
        onDragEnd={onDragEnd}
        autoScroll={false}
        onDragStart={onDragStart}>
        <SortableContext items={graficosData.map((i) => i.id.toString())} strategy={verticalListSortingStrategy}>
            <div style={{ display: "grid", gap: 8, minHeight: '60px', height: 'auto' }}>
              {view.map((grafico, index) => (
                <SortableGrafico id={grafico.id.toString()} index={index} open={openStates[grafico.id]} tituloGrafico={grafico.tituloGrafico}>
                    <Collapse in={openStates[grafico.id]}>
                    <div>
                    <GraficoComponent
                      chaveValorGraficos={chaveValorGraficos}
                      grafico={grafico}
                      setDeleteArray={setDeleteArray}
                      graficosData = {graficosData}
                      setGraficosData={setGraficosData}
                      onDelete={() => deleteSingleGrafico(grafico)}
                    />
                    </div>
                    </Collapse>
                </SortableGrafico>
              ))}
            </div>
        </SortableContext>
        {/* --- DRAG OVERLAY --- */}
        {/* Renderizado fora do fluxo normal (Portal) */}
        {/* <DragOverlay adjustScale={false} style={styleDragOverlay}>
         */}
        <DragOverlay adjustScale={false}>
          <div className="grafico-component" style={{minHeight: "100px !important"}}>
            <h3>Gráfico - {graficosData.find(grafico => String(grafico.id) === String(activeId))?.tituloGrafico}</h3>
          </div>
        </DragOverlay>
      </DndContext>
    );
  }

  return (
    <div className="create-indicador-container">
      <div
        style={{
          backgroundColor: `var(--${dimensoesCores123[dimensao!]})`,
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
            <SortableList />
            

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
