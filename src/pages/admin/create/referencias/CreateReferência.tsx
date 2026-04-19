import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../../../adapters/api.tsx";
//import Swal from "sweetalert2";
import { Referencia } from "../../../../interfaces/referencia/referencia_interface.tsx";
import { postReferencias, patchReferencias } from "../../../../services/crudReferencias.tsx";
import "./style.css";
//import "../../css/dimensaoPage.css";
import "../../dimensao/style.css";
import dimensoes from "../../../../utils/const.tsx";
import { Form, Alert, Button, Spinner } from "react-bootstrap";
import CreatePageHeader from "../../components/headers/components/createPageHeader.tsx";

const CreateReferencias: FC<{
  dimensao: string | undefined;
  referencia: string | undefined;
}> = ({ dimensao, referencia }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patch, setPatch] = useState(false);
  const [formRef, setFormRef] = useState<Referencia>({
    nome: "",
    link: "",
  });
  const [errorNome, setErrorNome] = useState<string | null>(null);
  const [errorLink, setErrorLink] = useState<string | null>(null);
  const {
    dimensoesColumn1,
    dimensoesColumn2,
    dimensoesCores123,
  } = dimensoes.GetAllConst();
  const dimensoesColumn12 = {
    ...dimensoesColumn1,
    ...dimensoesColumn2,
  };


  useEffect(() => {
    if (referencia != undefined) {
      const refDecodificado = decodeURIComponent(referencia)      
      //console.log(`/admin/dimensoes/${dimensao}/referencias/${refDecodificado}/`)
      api
        //.get(`/admin/dimensoes/${dimensao}/referencias/${refDecodificado}/`)
        .get(`/admin/dimensoes/${dimensao}/referencias/`,{params:{referenciaNome:refDecodificado}})
        .then((response) => {
          console.log(response.data);
          setFormRef({
            nome: response.data.nome,
            link: response.data.link,
          });
        });
      setPatch(true);
    }
  }, [dimensao, referencia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRef((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formRef.nome && setErrorNome(null)
    formRef.link && setErrorLink(null)

    // modificação: campo de link não é mais obrigatório
    if (!formRef.nome) {
      if (!formRef.nome) {
      setErrorNome("O campo nome é obrigatório.");
    } else {
      setErrorNome(null);
    }

    setErrorLink(null);
    
    return
  }
    /*
    if (!formRef.nome || !formRef.link) {
      await Swal.fire({
        title: "Erro!",
        text: "Por favor, preencha todos os campos.",
        icon: "error",
        confirmButtonColor: "var(--primary-color)",
      });
      return;
    }*/

    setIsSubmitting(true);

    if (patch) {
      patchReferencias(dimensao, referencia, formRef.nome, formRef.link);
    } else {
      postReferencias(dimensao, formRef.nome, formRef.link);
    }
    // Reset form
    setFormRef({
      nome: "",
      link: "",
    });

    // Navigate back to the dimension page
    navigate(`/admin/dimensao/${dimensao}/`);
    setIsSubmitting(false);
  };
  if(!dimensao) return;

  return (
    <div className="post-referencias-container">
      {/* <div
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
      </div> */}
      <CreatePageHeader dimensao={dimensao}/>
      <h2>
        {patch === true ? "Modificar Referência" : "Adicionar Referência"}
      </h2>
          <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nome">
        <Form.Label>Título da Referência</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={formRef.nome}
          onChange={handleChange}
          placeholder="Digite o título da referência"
        />
      </Form.Group>

      {errorNome && (
        <Alert variant="danger" className="mt-3">
          {errorNome}
        </Alert>
      )}

      <Form.Group controlId="link" className="mt-3">
        <Form.Label>Link da Referência</Form.Label>
        <Form.Control
          type="url"
          name="link"
          value={formRef.link}
          onChange={handleChange}
          placeholder="Digite o link da referência"
        />
      </Form.Group>

      {errorLink && (
        <Alert variant="danger" className="mt-3">
          {errorLink}
        </Alert>
      )}

      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="secondary"
          type="button"
          onClick={() => navigate(`/admin/dimensao/${dimensao}/`)}
        >
          Cancelar
        </Button>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Adicionando...
            </>
          ) : (
            patch === true ? "Modificar Referência" :"Adicionar Referência"
          )}
        </Button>
      </div>
    </Form>
    </div>
  );
};

export default CreateReferencias;
