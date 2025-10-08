import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dimensao } from "../../../interfaces/dimensao_interface.tsx";
import { RenderContentInterface } from "../../../interfaces/admin_interfaces/render_content_interface.tsx";
import { Form, Alert } from "react-bootstrap";
import api from "../../../api.tsx";
import AddDelete from "../addDelete.tsx";
import "./tabComponent.css";
import {
  getArtigoDimensao,
  uploadArtigoDimensao,
  updateArtigoDimensao,
  deleteArtigoDimensao,
} from "../create/artigo/crudArtigo.tsx";
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

  const [error, setError] = useState<string | null>(null);
  const url: string = `/admin/dimensoes/${dimensao}/`;
  const activeTabDict: { [key: string]: string[] } = {
    Indicadores: nomeIndicadores,
    Referências: nomeReferencias,
    Contribuições: nomeContribuicoes,
    Kmls: nomeKmls,
  };

  //Lista de dados dos indicadores relacionados a dimensão
  const [formDataDimensao, setFormDataDimensao] = useState({
    nome: undefined,
    descricao: undefined,
  });
  const [formDataArtigo, setFormDataArtigo] = useState<File>(new File([], ""));
  const [patchArtigo, setPatchArtigo] = useState<boolean>(false);
  //Função para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Desestruturação do evento em nome e valor do input
    const { name, value } = e.target;
    //Atualiza o estado do formulário
    if (name === "nome" || name === "descricao") {
      setFormDataDimensao((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }
    setFormDataArtigo(e.target.files![0]);
  };

  const handleSubmitDimensao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formDataDimensao.nome === undefined &&
      formDataDimensao.descricao === undefined
    ) {
      setError(
        "Para fazer modificações, preencha os campos que deseja modificar.",
      );
      return;
    }
    try {
      const patchDimensao: Record<string, string> = {};
      if (formDataDimensao.nome !== undefined) {
        patchDimensao["nome"] = formDataDimensao.nome;
      }
      if (formDataDimensao.descricao !== undefined) {
        patchDimensao["descricao"] = formDataDimensao.descricao;
      }

      const response = await api.patch(
        `/admin/dimensoes/${dimensaoJson?.nome}/`,
        patchDimensao,
      );
      setDimensao(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitArtigo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (patchArtigo === false) {
      uploadArtigoDimensao(dimensao as string, formDataArtigo);
      return;
    }
    updateArtigoDimensao(dimensao as string, formDataArtigo);
  };

  const handleDeleteArtigo = async (e: any) => {
    if (formDataArtigo.name != "") deleteArtigoDimensao(dimensao as string);
    setPatchArtigo(false);
  };

  const handleDownloadArtigo = async (e: any) => {
    if (formDataArtigo.name != "") getArtigoDimensao(dimensao as string);
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
        if (response.data.artigo != "") {
          setFormDataArtigo((prev) => ({
            ...prev,
            name: response.data.artigo,
          }));
          setPatchArtigo(true);
        }
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
        <Form onSubmit={handleSubmitDimensao}>
          <Form.Group controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formDataDimensao.nome}
              placeholder={dimensaoJson?.nome}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="descricao" className="mt-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              name="descricao"
              value={formDataDimensao.descricao}
              placeholder={dimensaoJson?.descricao}
              onChange={handleInputChange}
            />
          </Form.Group>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          <button>Salvar Alterações</button>
        </Form>
      </div>
    );
  } else if (activeTab === "Artigo") {
    return (
      <div className="admin-forms">
        <Form onSubmit={handleSubmitArtigo}>
          <Form.Group controlId="nome">
            {formDataArtigo.name === "" && <Form.Label>Artigo</Form.Label>}
            {formDataArtigo.name !== "" && (
              <Form.Label>Artigo Atual: {formDataArtigo.name}</Form.Label>
            )}
            <Form.Control
              type="file"
              name="artigo"
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="button-container">
            <button type="submit">Salvar Alterações</button>
            <button onClick={(e: any) => handleDownloadArtigo(e)}>
              Baixar Artigo
            </button>
            <button onClick={(e: any) => handleDeleteArtigo(e)}>
              Deletar Artigo
            </button>
          </div>
        </Form>
      </div>
    );
  } else {
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
                  <Link to={encodedURI}>
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
