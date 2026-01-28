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
  const [page, setPage] = useState<string>("dimensoes")
  const [estudos, setEstudos] = useState<string[]>([])
  const [arquivoEstudo, setArquivoEstudo] = useState<File>(new File([], ""))
  const [nomeEstudo, setNomeEstudo] = useState<string>("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isPopUpAberto, setIsPopUpAberto] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("");

  const [emailAtual, setEmailAtual] = useState<string>("");
  
  useEffect(() => {
      const fetchAll = async () =>{
        await api
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
      await api
      .get("/admin/pagina_inicial/estudos_complementares/")
      .then((response) => {
        console.log("fetch de estudos")
        setEstudos(response.data.estudos)
      }).catch((error) =>{
        setEstudos([])
        console.log(error)
      })
      }
      fetchAll()
      
  }, [])

  const handleSubmitEmail = (e: any) => {
    e.preventDefault();
    emailAtual && emailAtual != "" ? patchEmail(email): postEmail(email);
    console.log("handlesubmitemail");
  }

  const handleEnviar = async () => {
    // Lógica de envio (FormData é necessário para arquivos)
    const formData = new FormData();
    formData.append("nome", nomeEstudo);
    if (arquivoEstudo) formData.append("pdf", arquivoEstudo);
    console.log(formData)
    try {
      api.post("/admin/pagina_inicial/estudos_complementares/", formData) // Parse the JSON response body
      .then(json => console.log(json)) // Log the resulting data (e.g., the new post with an ID)
      .catch(error => console.error('Error:', error)); // Handle network errors
      setNomeEstudo("")
      setIsPopUpAberto(false); // Fecha após enviar
    } catch (error) {
      console.error("Erro ao enviar", error);
    }
  };
  const renderAddEstudo = () => {
  // Se o estado for falso, não renderiza nada
  if (!isPopUpAberto) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: 1000,
      display: 'flex', // Aqui você garante o flex
      flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }}>
      <button onClick={() => setIsPopUpAberto(false)}>Fechar X</button>
      
      <label>Nome</label>
      <input value={nomeEstudo} onChange={(e) => setNomeEstudo(e.target.value)} type="text" />
      
      <label>Arquivo</label>
      <input type="file" onChange={(e) => {
        if (e.target.files !== null) setArquivoEstudo(e.target.files[0])
      }} />
      
      <button onClick={handleEnviar}>Enviar Estudo</button>
    </div>
  );
};

  return (
    <div className="home-container" style={{height:'100vh', backgroundColor:(isPopUpAberto === true ? 'rgba(0,0,0,0.7)' : '')}}>
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
        <select name="" id="" onChange={(e) => setPage(e.target.value)}>
        <option value="dimensoes">Dimensoes</option>
        <option value="pinicial">Página Inicial</option>
        <option value="contribuicao">Contriuição</option>
        </select>
        {page === "dimensoes" && <div className="dimensoes-grid-wallpaper">
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
      }
      {page === "pinicial" && 
        <div className="dimensoes-grid-wallpaper" style={isPopUpAberto === true ? {backgroundColor:'rgba(0,0,0,0.7)'} : {}}>
          <span> <button type="button" onClick={() => setIsPopUpAberto(true)}>Adicionar</button> <button>Deletar</button></span>
          {renderAddEstudo()}
          {estudos.map(estudo => <p>{estudo}</p>)}
        </div>}
        
    </div>
  );
};

export default DimensaoAdmin;
