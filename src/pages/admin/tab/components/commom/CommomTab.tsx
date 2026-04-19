import { FC, useState } from "react";
import AddDelete from "../../../components/addDelete/addDelete.tsx";
import { Link } from "react-router-dom";
import api from "../../../../../adapters/api.tsx";
//Utilizado em para as tabs da dimensão que compartilham do mesmo tipo de estrutura do componente
export const CommonTab:FC<{activeTabDict:Array<Record<string,any>>,activeTab:string,nomeDimensao:string | undefined}> = ({ activeTabDict,activeTab, nomeDimensao}) =>{
    const [toDelete, setToDelete] = useState<string[]>([]);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    return(
    <div>
      <div>
        {activeTabDict.map((element) => {
          const regexForwardSlash = /(\/)*/g
          let elementNomeTratado:string = element.nome as string
          if (regexForwardSlash.test(element.nome as string)){
            elementNomeTratado = encodeURIComponent(elementNomeTratado)
          }
          const encodedURI = encodeURI(
            `/admin/dimensao/${nomeDimensao}/update/${activeTab}/${elementNomeTratado}/`,
          );
          return (
            <span>
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
                      setToDelete((prev) => [...prev, element.nome! as string]);
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
            </span>
          );
        })}
      </div>
      <AddDelete
        dimensao={nomeDimensao}
        activeTab={activeTab}
        deleteElement={toDelete}
      />
    </div>
  );

}