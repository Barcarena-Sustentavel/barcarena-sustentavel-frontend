import { FC, useEffect, useState } from "react";
import "@assets/styles/index.css";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import IBS from "@assets/images/about/21.12.2022---conexoes-sustentaveis.jpg";
import "./about.css";
import api from "../../api.tsx";
import { getArtigoDimensao } from "../admin/create/artigo/crudArtigo.tsx";
import downloadIcon from "../../assets/images/icons/download-svgrepo-com.svg";
import Mandala from "../../components/layout/mandala/mandala.tsx";


const About: FC = () => {
  const [dimensoes, setDimensoes] = useState<string[]>([]);
  const [estudos, setNomeEstudos] = useState<string[]>([]);

  const urlDimensoes: string = "/dimensoes/";

  const getDownloadCard = (dimensao: string) => {
    return (
      <div key={dimensao} className="d-flex align-items-center card-download-short-paper col-4">
        <a className="dimensao-short-paper" onClick={() => getArtigoDimensao(dimensao)}>
          {dimensao}
        </a>
      </div>
    );
  };

  const downloadEstudo = async (estudo: string) => {
    api
      .get("/estudos_complementares/arquivo", { params: { estudoComplementarNome: estudo } })
      .then((response) => {
        const pdfBlob = new Blob([response.data.arquivo_data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(pdfBlob);
        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.setAttribute("download", `${estudo}.pdf`);
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Erro ao baixar estudo:", error);
      });
  };

  useEffect(() => {
    const fetchEstudos = async () => {
      await api
        .get("/estudos_complementares/", { params: { pagina: "Pagina_sobre" } })
        .then((response) => {
          const estudosData = response.data.estudos;
          const estudosNomes = estudosData.map((estudo: string) => estudo);
          setNomeEstudos(estudosNomes);
        })
        .catch((error) => {
          console.error("Erro ao buscar estudos complementares:", error);
        });
    };
    fetchEstudos();
  }, []);

  useEffect(() => {
    api
      .get(urlDimensoes)
      .then((response) => {
        setDimensoes(response.data.dimensoes);
      })
      .catch((error) => {
        console.error("Erro ao buscar dimensões:", error);
      });
  }, []);

  return (
    <div className="home-container">
      <NavbarComponent />

      <main className="main-container">
         {/* ── Hero ── */}
    <div className="about-hero">
      <p className="eyebrow">Quem Somos</p>
      <h1>Observatório do Desenvolvimento Sustentável de Barcarena</h1>
      <p className="about-hero-sub">
        Conheça o ODSB — sua missão, metodologia, dimensões e as fontes que sustentam nossas análises.
      </p>
    </div>
        <div className="page-wrapper">


   {/* ODSB */}
<div className="sec-divider" style={{ textAlign: "left", marginBottom: "1.5rem", marginTop: "2rem" }}>
  <h2>O que é o ODSB?</h2>
</div>

<div className="intro-grid">
  <div className="intro-text">
    <p>
      O ODSB objetiva desenvolver um Sistema de Informações para o município de Barcarena,
      integrando diversas dimensões do desenvolvimento sustentável. Esse sistema será atualizado
      periodicamente com dados extraídos de fontes de órgãos de controle e pesquisa, como IBGE, IPEAData,
      Atlas da Violência, Secretaria da Fazenda (SEFA), Fundação de Pesquisa do Estado do Pará (Fapespa),
      Datasus, Secretaria de Comércio Exterior do Ministério da Economia, Tribunal de Contas dos
      Municípios (TCM), Índice de Desenvolvimento Sustentável das Cidades (IDSC), Secretarias municipais de
      Barcarena, além de relatórios e balanços anuais de empresas atuantes no município, entre outras
      bases confiáveis.
    </p>
    <p>
      O sistema deve oferecer boletins periódicos (relatórios dinâmicos) e dashboards que refletirão o
      status dos principais indicadores de desenvolvimento municipal. Além disso, será capaz de associar
      esses indicadores a variáveis socioeconômicas, tecnológicas e ambientais, possibilitando a elaboração
      de boletins analíticos. Esses boletins revelarão a relação entre a dinâmica do desenvolvimento municipal
      e o desempenho das nove dimensões cobertas pelo observatório.
    </p>
  </div>
  <div className="intro-img">
    <img src={IBS} alt="Iniciativa Barcarena Sustentável" />
  </div>
</div>



         {/* Objetivos */}
<div className="objetivo-card">
  <span className="objetivo-label">Objetivos</span>
  <p>
    O ODSB será uma ferramenta indispensável tanto para o estabelecimento das metas do Fundo de
    Sustentabilidade Hydro, assim como base para o planejamento estratégico da Iniciativa Barcarena
    Sustentável (IBS), além de servir como instrumento de pesquisa e estudo que dará o suporte às ações
    dos parceiros no município de Barcarena, inclusive do poder público e de entidades da sociedade civil.
  </p>
</div>

        {/* Conceitos Básicos */}
<div className="concepts-section">
  <div className="sec-divider">
    <p className="eyebrow">Fundamentos</p>
    <h2>Conceitos Básicos — Dimensão, Indicadores e Variáveis</h2>
  </div>

  <div className="concepts-grid">
    <div className="pyramid-wrap">
      <svg width="320" height="280" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,260 300,260 240,170 80,170" fill="#E05A2B" opacity="0.92" />
        <polygon points="80,170 240,170 195,95 125,95" fill="#3d7a2e" opacity="0.9" />
        <polygon points="125,95 195,95 160,28" fill="#1B4F9B" opacity="0.95" />
        <polygon points="20,260 300,260 160,28" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
        <line x1="80" y1="170" x2="240" y2="170" stroke="white" strokeWidth="1" opacity="0.3" />
        <line x1="125" y1="95" x2="195" y2="95" stroke="white" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>

    <div className="concept-items">
      <div className="concept-item">
        <span className="tag tag-dim">Dimensão</span>
        <p>
          Refere-se a uma categoria ou aspecto específico do fenômeno a ser analisado, como a Educação
          de Barcarena. Assim, a dimensão é o campo de estudo sob o qual as informações serão organizadas.
        </p>
      </div>
      <div className="concept-item">
        <span className="tag tag-ind">Indicadores</span>
        <p>
          São métricas específicas que permitem medir ou avaliar o desempenho dentro de uma dimensão.
          Por exemplo, na dimensão "educação", um indicador poderia ser a "taxa de alfabetização".
        </p>
      </div>
      <div className="concept-item">
        <span className="tag tag-var">Variáveis</span>
        <p>
          São os dados ou atributos que alimentam os indicadores, como idade, gênero, ou localização
          geográfica. Elas fornecem os detalhes necessários para calcular ou definir o valor de um indicador.
        </p>
      </div>
    </div>
  </div>
</div>

{/* Fontes Secundárias */}
<section className="fontes-section">
  <div className="parallax-bg" />
  <h2>Dados de Fontes Secundárias</h2>
  <p>
    A coleta de dados é essencial para realizar análises precisas e qualifica decisões. Ela pode ser
    feita a partir de fontes primárias ou secundárias. Dados de fonte primária são aqueles coletados
    diretamente pela pessoa ou organização que realiza a pesquisa, por meio de métodos como entrevistas,
    questionários, observação direta ou experimentos. Esses dados são originais e específicos ao propósito
    da pesquisa, oferecendo alta precisão e relevância, mas exigindo mais tempo e recursos para serem obtidos.
    Por outro lado, os dados de fonte secundária são informações previamente coletadas e organizadas por
    terceiros, como censos, relatórios governamentais, artigos acadêmicos ou bases de dados públicas.
    A combinação de ambas as fontes é comum para equilibrar precisão e eficiência em estudos analíticos.
    A seleção criteriosa de fontes secundárias confiáveis é crucial para garantir a qualidade e a precisão
    das análises. Dados de organizações consolidadas e de prestígio nacional – como órgãos governamentais,
    institutos de pesquisa e agências reconhecidas – assegura que as informações utilizadas foram coletadas
    com rigor metodológico e seguem padrões éticos e científicos. Fontes bem estabelecidas geralmente passam
    por revisões rigorosas e são submetidas a auditorias regulares, o que aumenta a confiabilidade dos dados.
    Além disso, essas fontes tendem a oferecer dados atualizados e contextualizados, o que é essencial para
    evitar distorções ou conclusões equivocadas. Com base em fontes secundárias robustas, a pesquisa ganha
    legitimidade e maior credibilidade, pois se apoia em informações de alta qualidade. O ODSB utiliza dados
    de fontes secundárias, no entanto, estudos complementares oriundos de fontes primárias poderão ser
    disponibilizados na plataforma, considerando a confiabilidade e relevância para a população de Barcarena.
  </p>
  <div className="fontes-sources">
    <span className="source-tag">IBGE</span>
    <span className="source-tag">IPEAData</span>
    <span className="source-tag">Atlas da Violência</span>
    <span className="source-tag">SEFA</span>
    <span className="source-tag">Fapespa</span>
    <span className="source-tag">Datasus</span>
    <span className="source-tag">MDIC</span>
    <span className="source-tag">TCM</span>
    <span className="source-tag">IDSC</span>
  </div>
</section>


          <div className="mandala-bloco metodologia-dados-container">
  <div className="sec-divider">
    <p className="eyebrow">Abrangência</p>
    <h2>As 9 Dimensões do ODSB</h2>
    <p>
      O observatório cobre nove dimensões do desenvolvimento sustentável,
      totalizando mais de 80 indicadores municipais.
    </p>
  </div>
  <Mandala />
</div>

          {/* Metodologia + Base de Dados — inalterado */}
          <section className="dados-section">
            <div className="metodologia-dados-container">
              <p className="section-titulo">Metodologia Para Coleta de Dados</p>
              <p className="section-texto">
                O procedimento de diagnóstico baseado em indicadores é um processo sistemático de coleta, seleção,
                análise e interpretação de dados para identificar problemas nas dimensões previstas em nosso estudo.
                O processo envolve as seguintes etapas:
              </p>
              <ul>
                <li>Coleta de dados a partir de uma variedade de fontes disponíveis, na sua maioria, online.</li>
                <li>Definição dos Objetivos do diagnóstico. O que o estudo deseja identificar?</li>
                <li>
                  Seleção dos indicadores segundo um critério de seleção ótimo, com o objetivo de garantir que eles
                  sejam relevantes, válidos, confiáveis, sensíveis, específicos, acessíveis, eficientes, comparáveis,
                  interpretáveis e úteis.
                </li>
                <li>
                  Análise dos dados para identificação de tendências, padrões e discrepâncias, etapa realizada a partir
                  de uma variedade de técnicas estatísticas ou qualitativas.
                </li>
                <li>
                  Interpretação dos resultados à luz dos objetivos do diagnóstico e dos indicadores selecionados
                  previamente para este propósito. Ao considerar essas características, pretende-se garantir resultados
                  mais robustos e eficazes em relação às dimensões previstas nos estudos.
                </li>
              </ul>
            </div>

            <div className="metodologia-dados-container">
              <p className="section-titulo">Definição da Base de Dados</p>
              <p className="section-texto">
                Para compreender em profundidade de cada dimensão do ODSB, um levantamento de dados orientado por
                especialistas foi conduzido. Desse modo, identificaram-se as informações, variáveis e indicadores
                essenciais para o estudo. Uma parcela expressiva dos dados foi coletada de forma automatizada
                diretamente das plataformas originais, o que permitiu um enriquecimento rápido e consistente do banco
                de dados. Contudo, outras informações precisaram ser coletadas manualmente a partir de diversas fontes
                secundárias, complementando o repositório.
              </p>
              <p className="section-texto">
                Com essa base de dados, contendo variáveis, indicadores e índices rigorosamente selecionados,
                tornou-se possível realizar uma análise detalhada das dimensões do ODSB por meio de modelos
                estatísticos avançados. Esses modelos têm permitido identificar relações de causa e efeito tanto
                entre indicadores dentro de uma mesma dimensão quanto entre indicadores de diferentes dimensões,
                aprofundando a compreensão das dinâmicas e interdependências que influenciam o desenvolvimento
                sustentável de Barcarena.
              </p>
            </div>
          </section>

          {/* Downloads — inalterado */}
          <p className="mx-auto sobre-titulo">Download de Short Papers</p>
          <div className="d-flex mx-auto align-items-center justify-content-center secao-download-papers row">
            {dimensoes.map((dimensao) => getDownloadCard(dimensao))}
          </div>

          <p className="mx-auto sobre-titulo">Download de Estudos Complementares</p>
          <div className="d-flex mx-auto align-items-center justify-content-center secao-download-papers row">
            {estudos.map((estudo, index) => (
              <div key={index} className="w-1/2 d-flex justify-content-between align-items-center bg-primary rounded p-3 h-100">
                <p className="mb-0">{estudo}</p>
                <button className="btn btn-link p-0" onClick={() => downloadEstudo(estudo)}>
                  <img src={downloadIcon} className="bg-light" alt="Download" style={{ width: "24px", height: "24px" }} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
