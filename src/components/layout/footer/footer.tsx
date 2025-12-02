import { Container, Row, Col } from "react-bootstrap";
import {
  Envelope,
  Telephone,
  Globe,
  Instagram,
  ArrowUp,
} from "react-bootstrap-icons"; // Ícones do React-Bootstrap

// Importe as imagens (ajuste os caminhos conforme sua estrutura)
import logo from "@assets/images/icons/Logo2.png";
import hydroLogo from "@assets/images/icons/SELO Fundo Hydro-09.png";
//import barcarenaLogo from "@assets/images/icons/IniciativaBarcarenaSustentavel.png";
import barcarenaLogo from "@assets/images/icons/iniciativaBarcarena.png";
import ufpaLogo from "@assets/images/icons/logoUFPA.png";
import "@assets/styles/tooplate-gotto-job.css";
import "./footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* Seção Superior */}
      <div className="bg-color-secondary-gray">
        <Container className="pt-3">
          <Row>
            {/* Coluna Contato */}
            <Col lg={3} xs={6} className="mb-3">
              <h6 className="site-footer-title">Contato</h6>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={logo}
                  alt="Logo ODSB"
                  className="img-fluid logo-footer"
                />
              </div>
              <p className="mb-2">
                <Telephone className="custom-icon me-1" />
                <a href="tel:9999999999" className="site-footer-link">
                  999999-9999
                </a>
              </p>
              <p>
                <Envelope className="custom-icon me-1" />
                <a
                  href="mailto:faleconosco@odsb.org"
                  className="site-footer-link"
                >
                  faleconosco@fundohydro.org
                </a>
              </p>
            </Col>

            {/* Coluna Realização */}
            <Col lg={3} xs={6} className="ms-lg-auto">
              <h6 className="site-footer-title">Realização</h6>
              <a
                href="https://fundosustentabilidadehydro.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={hydroLogo}
                  alt="Fundo de Sustentabilidade Hydro"
                  //className="img-fluid"
                  className="image-footer"
                />
              </a>
            </Col>

            {/* Coluna Apoio */}
            <Col lg={3} xs={6}>
              <h6 className="site-footer-title">Apoio</h6>
              <a
                href="https://www.barcarenasustentavel.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={barcarenaLogo}
                  alt="Iniciativa Barcarena Sustentável"
                  //className="img-fluid"
                  className="image-footer"
                />
              </a>
            </Col>

            {/* Coluna Execução */}
            <Col lg={3} xs={6} className="mt-3 mt-lg-0">
              <h6 className="site-footer-title">Execução</h6>
              <a
                href="https://ufpa.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={ufpaLogo}
                  alt="Universidade Federal do Pará"
                  className="img-fluid"
                />
              </a>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Seção Inferior */}
      <div className="bg-color-secondary-darkblue site-footer-bottom mt-0">
        <Container>
          <Row>
            {/* Copyright e Redes Sociais */}
            <Col lg={8} className="d-flex align-items-center">
              <p className="copyright-text mb-0">Copyright © ODSB 2024</p>
              <ul className="social-icon list-unstyled d-flex mb-0 ms-3">
                <li className="social-icon-item mx-2">
                  <a
                    href="https://portalbarcarena.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Globe />
                  </a>
                </li>
                <li className="social-icon-item mx-2">
                  <a
                    href="https://www.instagram.com/portalbarcarena/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Instagram />
                  </a>
                </li>
              </ul>
            </Col>

            {/* Créditos */}
            <Col lg={1} className="mt-2 d-flex align-items-center mt-lg-0">
              <p className="mb-0">
                Design:{" "}
                <a
                  className="sponsored-link"
                  href="https://www.tooplate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ODSB
                </a>
              </p>
            </Col>

            {/* Botão Voltar ao Topo */}
            <Col lg={3}>
              <button
                onClick={scrollToTop}
                className="bg-color-secondary-green back-top-icon d-flex justify-content-center align-items-center border-0"
                aria-label="Voltar ao topo"
              >
                <div>
                  <ArrowUp />
                </div>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
