import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import api from "../../../../adapters/api.tsx";
//import Swal from "sweetalert2";
import { patchEstudoComplementar, postEstudoComplementar } from "../../../../services/crudEstudosComplementares.tsx";
import { EstudoComplementar } from "../../../../interfaces/estudo_complementar/estudo_complementar_interface.tsx";
import { ConstContext, ConstContextType } from "../../../../context/const/script/ConstContext.ts";
import "./style.css";
import "../../dimensao/style.css";
import { Form, Alert, Button, Spinner } from "react-bootstrap";
import CreatePageHeader from "../../components/headers/components/createPageHeader.tsx";

const CreateEstudosComplementares: FC<{
  dimensao: string | undefined;
  estudoComplementarNome: string | undefined;
}> = ({ dimensao, estudoComplementarNome }) => {
  const { dimensoes } = useContext<ConstContextType>(ConstContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patch, setPatch] = useState(false);
  const [formEstCompl, setFormEstCompl] = useState<EstudoComplementar>({
    nome: "",
    arquivo: undefined,
  })
  const [errorNome, setErrorNome] = useState<string | null>(null);
  const [errorArquivo, setErrorArquivo] = useState<string | null>(null);

  useEffect(() => {
    if (estudoComplementarNome != undefined) {
      api
        .get(`/admin/dimensoes/${dimensao}/estudo_complementar/${estudoComplementarNome}/`)
        .then((response) => {
          console.log(response.data);

          const byteCharacters = atob(response.data.arquivo.arquivo_data);
          const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);

          const arquivo = new File([byteArray], response.data.arquivo.arquivo_nome, { type: "application/pdf" });
          
          setFormEstCompl(prev => ({
            ...prev,
            nome: response.data.estudo,
            arquivo: arquivo,
          }));
          console.log(formEstCompl);
        });
      setPatch(true);
    }
  }, []);

  useEffect(() => {
  console.log("formEstCompl foi atualizado:", formEstCompl);
  // ...aqui você pode chamar funções, validar, etc.
}, [formEstCompl]);

  const handleChangeNome = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormEstCompl((prev) => ({ ...prev, nome: value }));

    console.log(formEstCompl);
  };

  const handleChangeArquivo = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { files } = e.target;
    
    console.log(files);

    if(files)
      setFormEstCompl((prev) => ({
        ...prev,
        arquivo: files[0],
      }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // modificação: campo de link não é mais obrigatório
    if (!formEstCompl.nome) {
      setErrorNome("O campo nome é obrigatório.");
      return;
    } else {
      setErrorNome(null);
    }

    if(!formEstCompl.arquivo && !patch) {
      setErrorArquivo("O campo de arquivo é obrigatório.");
      return;
    } else {
      setErrorArquivo(null);
    }

    setIsSubmitting(true);

    if (patch) {
      patchEstudoComplementar(dimensao, estudoComplementarNome, formEstCompl.nome, formEstCompl.arquivo);
    } else {
      postEstudoComplementar(dimensao, formEstCompl.nome, formEstCompl.arquivo);
    }
    // Reset form
    setFormEstCompl({
      nome: "",
      arquivo: new File([], "empty.pdf",  {type: "application/pdf" }),
    });

    // Navigate back to the dimension page
    navigate(`/admin/dimensao/${dimensao}/`);
    setIsSubmitting(false);
  };

  const baixarArquivo = (arquivo: File) => {
    if(!arquivo) 
      return

    const url = URL.createObjectURL(arquivo);
    console.log(`arquivo: ${arquivo}\nnome_arquivo: ${arquivo.name}`)

    return <a href={url} target="_blank" rel="noopener noreferrer">{arquivo.name}</a>;
  }

  const getArquivoAtual = () => {
    console.log(formEstCompl.arquivo)
    return formEstCompl.arquivo ? formEstCompl.arquivo: new File([], "empty.pdf",  {type: "application/pdf" });
  }

  if(!dimensao) return;


  return (
    <div className="post-referencias-container">
      <CreatePageHeader dimensao={dimensao}/>
      <h2>
        {patch === true ? "Modificar Estudo Complementar" : "Adicionar Estudo Complementar"}
      </h2>
          <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nome">
        <Form.Label>Título do Estudo Complementar</Form.Label>
        <Form.Control
          type="text"
          name="nome"
          value={formEstCompl.nome}
          onChange={handleChangeNome}
          placeholder="Digite o título do estudo complementar"
        />
      </Form.Group>

      {errorNome && (
        <Alert variant="danger" className="mt-3">
          {errorNome}
        </Alert>
      )}

      {patch && (
        <>
          <div>Arquivo atual do estudo complementar</div>
          <div>{baixarArquivo(getArquivoAtual())}</div>
        </>
      )}

      

      <Form.Group controlId="file" className="mt-3">
        
        <Form.Label>{patch === true ? "Substituir arquivo do Estudo Complementar" : "Arquivo do Estudo Complementar"}</Form.Label>
        <Form.Control
          type="file"
          name="arquivoPdf"
          onChange={handleChangeArquivo}
          accept="application/pdf"
        />
      </Form.Group>

      {errorArquivo && (
        <Alert variant="danger" className="mt-3">
          {errorArquivo}
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
            patch === true ? "Modificar Estudo Complementar" :"Adicionar Estudo Complementar"
          )}
        </Button>
      </div>
    </Form>
    </div>
  );
};

export default CreateEstudosComplementares;
