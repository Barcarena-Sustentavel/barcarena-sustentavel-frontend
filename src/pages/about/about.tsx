import { FC } from "react";
import "@assets/styles/index.css";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import IBS from "@assets/images/about/21.12.2022---conexoes-sustentaveis.jpg";
import image1 from "@assets/images/about/WhatsApp Image 2025-05-04 at 14.00.02.jpeg";
import image2 from "@assets/images/about/WhatsApp Image 2025-05-04 at 14.00.11.jpeg";
import user from "@assets/images/about/user.png";
import "./about.css";

const About: FC = () => {
  const colaboradores = [
    { nome: "Colaborador 1", cargo: "Cargo 1" },
    { nome: "Colaborador 2", cargo: "Cargo 2" },
    { nome: "Colaborador 3", cargo: "Cargo 3" },
  ];

  return (
    <div className="home-container">
      <NavbarComponent />
      <h1>Sobre o ODSB</h1>
      <div className="about-descricao">
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <p>
            O Observatório do Desenvolvimento Sustentável de Barcarena (ODSB) é
            um projeto estratégico voltado para monitorar e analisar as
            múltiplas dimensões do desenvolvimento no município de Barcarena, no
            Pará, com foco em nove eixos temáticos, como emprego e renda, meio
            ambiente, educação e segurança pública. Alinhado aos objetivos do
            Fundo de Sustentabilidade Hydro, o ODSB busca gerar dados
            qualificados que orientem políticas corporativas e públicas,
            promovendo uma gestão baseada em evidências para impulsionar o
            desenvolvimento local de forma equilibrada e inclusiva. Sua criação
            reflete a necessidade de superar os desafios históricos da região,
            onde o crescimento econômico da mineração não se traduziu em avanços
            sociais proporcionalmente significativos.
          </p>
          <img src={IBS} alt="Imagem do equipe do projeto Barcarena" />
          </div>
          <div style={{ display: "flex", justifyContent: "center" , flexDirection:"row-reverse"}}>

          <p>
            Realizado em parceria com a Iniciativa Barcarena Sustentável (IBS),
            o ODSB funciona como uma ferramenta de governança colaborativa,
            integrando atores locais, setor privado e academia na construção de
            soluções para o território. Por meio de oficinas técnicas, estudos
            setoriais e um sistema de informações dinâmico, o projeto visa não
            apenas diagnosticar problemas, mas também propor ações concretas que
            fortaleçam a sustentabilidade e a qualidade de vida na região. A
            participação da IBS assegura que as demandas da comunidade e dos
            stakeholders sejam incorporadas, garantindo relevância e efetividade
            às análises produzidas.
          </p>
          <img src={image1} alt="Imagem do equipe do projeto Barcarena" />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
          <p>
            Executado pela Universidade Federal do Pará (UFPA), o ODSB combina
            expertise acadêmica e metodologias avançadas — como análise
            multivariada, machine learning e geoestatística — para criar
            indicadores robustos e previsões cenarizadas. A UFPA, como
            instituição executora, garante rigor científico e independência na
            produção de conhecimento, além de capacitar técnicos locais para a
            gestão contínua do sistema. O projeto se consolida como um legado de
            inovação e transparência, alinhado aos Objetivos de Desenvolvimento
            Sustentável (ODS) da ONU e às prioridades estratégicas da Hydro para
            a região.
          </p>
          <img src={image2} alt="Imagem do equipe do projeto Barcarena" />
          </div>

        </div>
      </div>
      <div>
        <h1>O time que faz tudo isso possível</h1>
        <div className="about-time">
          {colaboradores.map((colaborador) => (
            <div className="about-colaborador" key={colaborador.nome}>
              <img src={user} alt={colaborador.nome} />
              <div className="about-colaborador-info">
                <h3>{colaborador.nome}</h3>
                <p>{colaborador.cargo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
