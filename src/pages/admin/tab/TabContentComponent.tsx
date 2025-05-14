import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dimensao } from "../../../interfaces/dimensao_interface.tsx";
import { RenderContentInterface } from "../../../interfaces/admin_interfaces/render_content_interface.tsx";
import { Form, Alert } from "react-bootstrap";
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

  const [error,setError] = useState<string | null>(null);
  const url: string = `/admin/dimensoes/${dimensao}/`;
  const activeTabDict: { [key: string]: string[] } = {
    Indicadores: nomeIndicadores,
    Referências: nomeReferencias,
    Contribuições: nomeContribuicoes,
    Kmls: nomeKmls,
  };

  //Lista de dados dos indicadores relacionados a dimensão
  const [formData, setFormData] = useState({
    nome: undefined,
    descricao: undefined,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.nome === undefined && formData.descricao === undefined){
      setError("Para fazer modificações, preencha os campos que deseja modificar.")
      return
    }
    try {
      const patchDimensao:Record<string, string> = {};
      if (formData.nome !== undefined) {
        patchDimensao["nome"] = formData.nome;
      }
      if (formData.descricao !== undefined) {
        patchDimensao["descricao"] = formData.descricao;
      }


      const response = await api.patch(
        `/admin/dimensoes/${dimensaoJson?.nome}/`,
        patchDimensao
        //{
        //  nome: formData.nome,
        //  descricao: formData.descricao,
        //},
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
      <div className="admin-forms">
        <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    placeholder={dimensaoJson?.nome}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="descricao" className="mt-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type="text"
                    name="descricao"
                    value={formData.descricao}
                    placeholder={dimensaoJson?.descricao}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                <button /*onClick={handleSubmit}*/>Salvar Alterações</button>
                </Form>    
        </div>
    );
  } else {
    console.log(activeTabDict[activeTab]);
    return (
      <div>
        <div>
          {activeTabDict[activeTab].map((elementName: string) => {
            const encodedURI = encodeURI(
              `/admin/dimensao/${dimensao}/update/${activeTab}/${elementName}/`,
            );
            console.log(encodedURI);
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
                        //Conserva os elementos anteriores(..prev) e adiciona o novo
                        setToDelete((prev) => [...prev, elementName]);
                      } else {
                        setToDelete((prev) =>
                          prev.filter((item) => item !== elementName),
                        );
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Link
                    //Modificação de itens antigo
                    //to={`/admin/dimensao/${dimensao}/update/${activeTab}/${elementName}/`}
                    to={encodedURI}
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
