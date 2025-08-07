import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../../../api.tsx";
import { CreateKML } from "../../../../interfaces/kml_interface.tsx";
import { postKML, patchKML } from "./crudKml.tsx";
import "./CreateKml.css";
import "../../css/dimensaoPage.css";
import dimensoes from "../../../../utils/const.tsx";
import { Form, Alert, Button} from "react-bootstrap";

const CreateKml: FC<{
  dimensao: string | undefined;
  kml: string | undefined;
}> = ({ dimensao, kml }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patch, setPatch] = useState(false);
  const [nomeError, setNomeError] = useState<string | null>(null);
  const [arquivoError, setArquivoError] = useState<string | null>(null);
  const [formKml, setFormKml] = useState<CreateKML>({
    nome: "",
    arquivo: new File([], ""),
  });
 const {
     dimensoesColumn1,
     dimensoesColumn2,
     dimensoesCores12,
   } = dimensoes.GetAllConst();
   const dimensoesColumn12 = {
     ...dimensoesColumn1,
     ...dimensoesColumn2,
   };
  useEffect(() => {
    if (kml != undefined) {
      setPatch(true);
      api.get(`/admin/dimensoes/${dimensao}/kml/${kml}/`).then((response) => {
        console.log(response.data);
        setFormKml({
          nome: response.data.nome,
          arquivo: response.data.arquivo,
        });
      });
    }
  }, [dimensao, kml]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormKml((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    formKml.nome && setNomeError(null)
    formKml.arquivo && setArquivoError(null)


    if (!formKml.nome || !formKml.arquivo) {
      if (!formKml.nome) {
      setNomeError("O campo nome é obrigatório.");
    } else {
      setNomeError(null);
    }

    if (!formKml.arquivo) {
      setArquivoError("O campo arquivo é obrigatório.");
    } else {
      setArquivoError(null);
    }
    return
  }

    setIsSubmitting(true);
    console.log(formKml);
    if (patch) {
      patchKML(dimensao, kml, formKml.nome!, formKml.arquivo);
    } else {
      postKML(dimensao, formKml.nome, formKml.arquivo);
    }
    // Reset form
    setFormKml({
      nome: "",
      arquivo: new File([], ""),
    });

    // Navigate back to the dimension page
    navigate(`/admin/dimensao/${dimensao}/`);
    setIsSubmitting(false);
  };

  return (
    <div className="post-referencias-container">
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
      <h2>{patch === true ? "Modificar Kml" : "Adicionar Kml"}</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nome">
        <Form.Label>Título do KML</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={formKml.nome}
          onChange={handleChange}
          placeholder="Digite o título do KML"
        />
        {nomeError && <Alert variant="danger" className="mt-2">{nomeError}</Alert>}
      </Form.Group>

      <Form.Group controlId="arquivo" className="mt-3">
        <Form.Label>Arquivo KML</Form.Label>
        {patch && <p>{`Arquivo atual: ${formKml.arquivo}`}</p>}
        <Form.Control
          type="file"
          name="arquivo"
          onChange={handleChange}
        />
        {arquivoError && <Alert variant="danger" className="mt-2">{arquivoError}</Alert>}
      </Form.Group>

      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="secondary"
          type="button"
          onClick={() => navigate(`/admin/dimensao/${dimensao}/`)}
        >
          Cancelar
        </Button>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : patch ? "Atualizar Modificar" : "Adicionar KML"}
        </Button>
      </div>
    </Form>
    </div>
  );
};

export default CreateKml;
