import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dimensao } from "../../../interfaces/dimensao_interface.tsx";
import { RenderContentInterface } from "../../../interfaces/admin_interfaces/render_content_interface.tsx";
import api from "../../../api.tsx";
import AddDelete from "../addDelete.tsx";

export const TabContentComponent: FC<RenderContentInterface> = ({
  dimensao,
  activeTab,
}) => {
  const [toDelete, setToDelete] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [dimensaoJson, setDimensao] = useState<Dimensao>();
  const [nomeIndicadores, setNomeIndicadores] = useState<string[]>([]);
  const [nomeReferencias, setNomeReferencias] = useState<string[]>([]);
  const [nomeContribuicoes, setNomeContribuicoes] = useState<string[]>([]);
  const [nomeKmls, setNomeKmls] = useState<string[]>([]);
  const url: string = `/admin/dimensoes/${dimensao}/`;
  const activeTabDict: { [key: string]: string[] } = {
    Indicadores: nomeIndicadores,
    Referências: nomeReferencias,
    Contribuições: nomeContribuicoes,
    Kmls: nomeKmls,
  };

  //Lista de dados dos indicadores relacionados a dimensão
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });
  //Função para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Desestruturação do evento em nome e valor do input
    const { name, value } = e.target;
    //Atualiza o estado do formulário
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.patch(
        `/admin/dimensoes/${dimensaoJson?.nome}/`,
        {
          nome: formData.nome,
          descricao: formData.descricao,
        },
      );
      setDimensao(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        setDimensao(response.data.dimensao);
        setNomeIndicadores(response.data.indicadores || []);
        setNomeReferencias(response.data.referencias || []);
        setNomeContribuicoes(response.data.contribuicoes || []);
        setNomeKmls(response.data.kmls || []);
      })
      .catch((error) => {
        setDimensao(undefined);
        setNomeIndicadores([]);
        setNomeReferencias([]);

        setNomeContribuicoes([]);
        setNomeKmls([]);
        console.log(error);
      });
  }, [url, dimensao]);

  if (activeTab === "Dimensão") {
    return (
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          placeholder={dimensaoJson?.nome}
          onChange={handleInputChange}
          disabled
        />

        <label>Descrição</label>
        <input
          type="text"
          name="descricao"
          value={formData.descricao}
          placeholder={dimensaoJson?.descricao}
          onChange={handleInputChange}
        />

        <button onClick={handleSubmit}>Salvar Alterações</button>
      </div>
    );
  } else {
    console.log(activeTabDict[activeTab]);
    return (
      <div>
        <div>
          {activeTabDict[activeTab].map((elementName: string) => {
            return (
              <span>
                <div className="checkbox-link-container">
                  <input
                    type="checkbox"
                    id={`checkbox-${elementName}`}
                    checked={!!checkedItems[elementName]}
                    onChange={(e) => {
                      e.stopPropagation();
                      setCheckedItems((prev) => ({
                        ...prev,
                        [elementName]: e.target.checked,
                      }));

                      if (e.target.checked) {
                        console.log(e.target);
                        //Conserva os elementos anteriores(..prev) e adiciona o novo
                        setToDelete((prev) => [...prev, elementName]);
                      } else {
                        //Pega os elementos do array anterior(prev), realiza um fitro(prev.filter) e remove o elemento selecionado(item => item !== elementName)
                        setToDelete((prev) =>
                          prev.filter((item) => item !== elementName),
                        );
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Link
                    to={`/admin/dimensao/${dimensao}/update/${activeTab}/${elementName}/`}
                  >
                    <label
                      htmlFor={`checkbox-${elementName}`}
                      className="checkbox-label"
                    >
                      <p>{elementName}</p>
                    </label>
                  </Link>
                </div>
              </span>
            );
          })}
        </div>
        <AddDelete
          dimensao={dimensao}
          activeTab={activeTab}
          deleteElement={toDelete}
        />
      </div>
    );
  }
};
