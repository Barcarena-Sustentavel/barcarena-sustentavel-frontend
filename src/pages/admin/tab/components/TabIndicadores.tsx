import { FC, useState, useEffect } from "react";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";
import api from "../../../../adapters/api.tsx";
import AddDelete from "../../components/addDelete/addDelete.tsx";
import { CSS } from "@dnd-kit/utilities";
import { IndicadorTrocarPosicao } from "../../../../interfaces/admin_interfaces/indicador/indicador_trocar_posicao.ts";
import { Link } from "react-router-dom";

export const TabIndicadores: FC<{ nomeDimensao: string | undefined }> = ({ nomeDimensao }) => {

  const [nomeIndicadores, setNomeIndicadores] = useState<
    Array<Record<string, string | number | null>>
  >([]);
  const [toDelete, setToDelete] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const url = `/admin/dimensoes/${nomeDimensao as string}/indicador`

  const SortableItem: FC<{
    id: number;
    children: (props: { dragHandleProps: any }) => React.ReactNode;
  }> = ({
    id,
    children,
  }) => {
      const { setNodeRef, transform, transition, attributes, listeners } = useSortable({ id });
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
      const dragHandleProps = { ...attributes, ...listeners };
      return (
        <div ref={setNodeRef} style={style}>
          {children({ dragHandleProps })}
        </div>
      );
    }
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    if (active.id !== over.id) {
      const oldIndex = nomeIndicadores.find((item) => item.posicao === active.id);
      const newIndex = nomeIndicadores.find((item) => item.posicao === over.id);
      const antigaPosicao = nomeIndicadores.indexOf(oldIndex!)
      const novaPosicao = nomeIndicadores.indexOf(newIndex!)
      let arrayPatch: IndicadorTrocarPosicao[] = []
      const novoArray = arrayMove(nomeIndicadores, antigaPosicao, novaPosicao)
      novoArray.map((element) => {
        arrayPatch.push({ nome: (element.nome as string), posicao: (element.posicao as number) })
      })
      api.patch(`/admin/dimensoes/${nomeDimensao}/indicador/trocar_posicao`,
        arrayPatch, { headers: { 'Content-Type': "application/json" } }
      );
      setNomeIndicadores(novoArray)
    }
  }
  useEffect(() => {
    const getIndicador = async () => {
      const response = await api.get(url)
      setNomeIndicadores(response.data.indicadores.sort((item1: any, item2: any) => item1.posicao as number - item2.posicao as number) || []);
    }
    getIndicador()
  }, [])
  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={nomeIndicadores.map((item, index) => item.posicao as number)}
          strategy={verticalListSortingStrategy}
        >
          {nomeIndicadores.map((element, index) => {
            //console.log(element)
            const encodedURI = encodeURI(
              `/admin/dimensao/${nomeDimensao}/update/indicador/${element.nome}/`,
            );
            return (
              <SortableItem
                key={element.posicao as number}
                id={element.posicao as number}
              >
                {(props) => (
                  <div><span className="d-flex align-items-center justify-content-between">
                    <div className="checkbox-link-container">
                      <input
                        type="checkbox"
                        id={`checkbox-${element.nome}`}
                        checked={!!checkedItems[element.nome!]}
                        onChange={(e) => {
                          e.stopPropagation();
                          setCheckedItems((prev) => ({
                            ...prev,
                            [element.nome!]: e.target.checked,
                          }));

                          if (e.target.checked) {
                            //Conserva os elementos anteriores(..prev) e adiciona o novo
                            setToDelete((prev) => [
                              ...prev,
                              element.nome! as string,
                            ]);
                          } else {
                            setToDelete((prev) =>
                              prev.filter((item) => item !== element.nome),
                            );
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Link to={encodedURI}>
                        <label
                          htmlFor={`checkbox-${element.nome}`}
                          className="checkbox-label"
                        >
                          <p>{element.nome}</p>
                        </label>
                      </Link>
                    </div>
                    <span
                      {...(props.dragHandleProps || {})}
                      style={{ cursor: "grab", marginRight: 8 }}
                      aria-label="Arrastar"
                    >
                      ☰
                    </span>
                  </span>
                  </div>)}
              </SortableItem>
            );
          })}
        </SortableContext>
      </DndContext>
      <AddDelete
        dimensao={nomeDimensao}
        activeTab="indicador"
        deleteElement={toDelete}
      />
    </div>
  );
}