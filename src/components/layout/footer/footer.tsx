import "@assets/styles/tooplate-gotto-job.css";
import "./footer.css";
import logoOdsb from "@assets/images/icons/Logo2.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ marginBottom: '0.8rem' }}>
              <img src={logoOdsb} alt="ODSB" style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p>Produção, análise e difusão de dados sobre os indicadores do município de Barcarena, Pará. Uma iniciativa envolvendo o apoio do Fundo Hydro, UFPA e Transparência Pública para a melhoria da qualidade de vida em Barcarena.</p>
          </div>
          <div className="footer-col">
            <h4>Conteúdo</h4>
            <ul>
              <li><a href="/#galeria">Relatórios</a></li>
              <li><a href="/#dimensoes">Indicadores</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Observatório</h4>
            <ul>
              <li><a href="/about/">Sobre</a></li>
              <li><a href="/colaboradores/">Colaboradores</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <ul>
              <li><a href="/cdn-cgi/l/email-protection#6305020f06000c0d0c10000c2305160d070c0b1a07110c4d0c1104">Email</a></li>
              <li><a href="#">Redes Sociais</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Observatório do Desenvolvimento Sustentável de Barcarena. Todos os direitos reservados.</span>
          <a href="#">Política de Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
