import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dimensoes from "../../utils/const.tsx";
import "./css/dimensaoAdmin.css";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api.tsx"
import {patchEmail, postEmail} from "./cruds/crudEmail.tsx"

const DimensaoAdmin: FC = () => {
  const navigate = useNavigate();
  const handleClick = (dimensao: string) => {
    navigate(`/admin/dimensao/${dimensao}/`);
  };
  const { dimensoesColumn1, dimensoesColumn2, dimensoesColumn3,dimensoesCores123 } =
    dimensoes.GetAllConst();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState<string>("");

  const [emailAtual, setEmailAtual] = useState<string>("");
  
  useEffect(() => {
    api
      .get("/admin/email_contribuicao")
      .then((response) => {
        console.log(response.data.email_contribuicao);
        if(response.data.email_contribuicao){
          console.log("Existe email");
          setEmail(response.data.email_contribuicao.email);
          setEmailAtual(response.data.email_contribuicao.email);
        }

      })
      .catch((error) => {
        console.error("Error fetching indicador data:", error);
      });
  }, [])

  const handleSubmitEmail = (e: any) => {
    e.preventDefault();


    emailAtual && emailAtual != "" ? patchEmail(email): postEmail(email);

    console.log("handlesubmitemail");
    
  }


  return (
    <div className="home-container">
      <div className="position-relative d-flex align-items-center justify-content-center admin-header-dimensao-admin">
        <h1>Administração de Dimensões</h1>
        <span className="position-absolute end-0 gear-icon"
              onClick={handleShow}>⚙️</span>
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="email-config-title">Destinatário de Contribuições</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEmail}>
            <Form.Group className="mb-3">
              <Form.Label className="email-current-title">E-mail Atual</Form.Label>
              <Form.Control
                type="email"
                name="nome"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="Digite um E-mail"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {emailAtual ? ("Modificar E-mail") : ("Adicionar E-mail")}
            </Button>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <div className="dimensoes-grid-wallpaper">
        <div className="dimensoes-grid">
          <div className="dimensoes-column">
            {Object.entries(dimensoesColumn1).map(([key, value]) => (
              <div
                className="dimensao-card"
                style={{
                  backgroundColor: `var(--${dimensoesCores123[key]})`,
                }}
                key={key}
              >
                <button
                  style={{
                    backgroundColor: `var(--${dimensoesCores123[key]})`,
                  }}
                  className="dimensao-button"
                  onClick={() => handleClick(key)}
                >
                  <h3>{key}</h3>
                  <div
                    style={{
                      WebkitMaskImage: `url(${value})`,
                      maskImage: `url(${value})`,
                    }}
                    className="dimensao-button-icone"
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="dimensoes-column">
            {Object.entries(dimensoesColumn2).map(([key, value]) => (
              <div
                style={{
                  backgroundColor: `var(--${dimensoesCores123[key]})`,
                }}
                className="dimensao-card"
                key={key}
              >
                <button
                  style={{
                    backgroundColor: `var(--${dimensoesCores123[key]})`,
                  }}
                  className="dimensao-button"
                  onClick={() => handleClick(key)}
                >
                  <h3>{key}</h3>
                  <div
                    style={{
                      WebkitMaskImage: `url(${value})`,
                      maskImage: `url(${value})`,
                    }}
                    className="dimensao-button-icone"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="dimensoes-column">
            {Object.entries(dimensoesColumn3).map(([key, value]) => (
              <div
                style={{
                  backgroundColor: `var(--${dimensoesCores123[key]})`,
                }}
                className="dimensao-card"
                key={key}
              >
                <button
                  style={{
                    backgroundColor: `var(--${dimensoesCores123[key]})`,
                  }}
                  className="dimensao-button"
                  onClick={() => handleClick(key)}
                >
                  <h3>{key}</h3>
                  <div
                    style={{
                      WebkitMaskImage: `url(${value})`,
                      maskImage: `url(${value})`,
                    }}
                    className="dimensao-button-icone"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DimensaoAdmin;
