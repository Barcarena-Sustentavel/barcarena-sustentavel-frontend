import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../../../../api.tsx";
import Swal from "sweetalert2";
import { CreateKML } from "../../../../interfaces/kml_interface.tsx";
import { postKML, patchKML } from "./crudKml.tsx";
import "./CreateKml.css";
import "../../css/dimensaoPage.css";
import dimensoes from "../../../../utils/const.tsx";

const CreateKml: FC<{
  dimensao: string | undefined;
  kml: string | undefined;
}> = ({ dimensao, kml }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patch, setPatch] = useState(false);
  const [formKml, setFormKml] = useState<CreateKML>({
    nome: "",
    arquivo: "",
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

    if (!formKml.nome || !formKml.arquivo) {
      await Swal.fire({
        title: "Erro!",
        text: "Por favor, preencha todos os campos.",
        icon: "error",
        confirmButtonColor: "var(--primary-color)",
      });
      return;
    }

    setIsSubmitting(true);

    if (patch) {
      patchKML(dimensao, kml, formKml.nome, formKml.arquivo);
    } else {
      postKML(dimensao, formKml.nome, formKml.arquivo);
    }
    // Reset form
    setFormKml({
      nome: "",
      arquivo: "",
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Título do Kml</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formKml.nome}
            onChange={handleChange}
            placeholder={
              formKml.nome === "" ? "Digite o título do kml" : formKml.nome
            }
            required={!patch}
          />
        </div>

        <div className="form-group">
          <label htmlFor="link">Arquivo Kml</label>
          {patch === true && <p>{`Arquivo atual: ${formKml.arquivo}`}</p>}
          <input
            type="file"
            id="link"
            name="link"
            onChange={(e) =>
              setFormKml({ ...formKml, arquivo: e.target.files![0] })
            }
            required={!patch}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(`/admin/dimensao/${dimensao}/`)}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {patch ? "Atualizando Modificar" : "Adicionar Kml"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateKml;
