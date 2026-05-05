import { FC, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import api from "../../../../adapters/api.tsx";
import { Alert } from "react-bootstrap";

export const DimensaoTab: FC<{ nomeDimensao: string | undefined, novoNomeDimensao: (name: string) => void }> = ({ nomeDimensao, novoNomeDimensao }) => {
  const [formDataDimensao, setFormDataDimensao] = useState({
    nome: undefined,
    descricao: undefined,
  });
  const [error, setError] = useState<string | null>(null)
  const url = `/admin/dimensoes/${nomeDimensao as string}/dimensao`

  useEffect(() => {
    const getDimensao = async () => {
      const response = await api.get(url)
      setFormDataDimensao({ nome: response.data.dimensao.nome, descricao: response.data.dimensao.descricao });
    }
    getDimensao()
  }, []);


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
        `/admin/dimensoes/${nomeDimensao}/`,
        patchDimensao,
      );
      if (response.data) {
        novoNomeDimensao(response.data.dimensao.nome);
      }

    } catch (error) {
      console.log(error);
    }
  };

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
  };
  return (
    <div className="admin-forms">
      <Form onSubmit={handleSubmitDimensao}>
        <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={formDataDimensao.nome}
            placeholder="Digite o nome da dimensão."
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="descricao" className="mt-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            className="dimensao-descricao-textarea"
            as="textarea"
            rows={8}
            type="text"
            name="descricao"
            value={formDataDimensao.descricao}
            placeholder="Digite a descrição da dimensão."
            onChange={handleInputChange}
          />
        </Form.Group>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        <button className="neutral-button">Salvar Alterações</button>
      </Form>
    </div>
  );
}