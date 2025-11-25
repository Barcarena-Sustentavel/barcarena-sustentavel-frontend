import { FC } from "react";
import "@assets/styles/index.css";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import IBS from "@assets/images/about/21.12.2022---conexoes-sustentaveis.jpg";
import image_piramide from "@assets/images/about/piramide.png";
import image_mandala from "@assets/images/about/mandala_odsb-1.png";
// import image1 from "@assets/images/about/WhatsApp Image 2025-05-04 at 14.00.02.jpeg";
// import image2 from "@assets/images/about/WhatsApp Image 2025-05-04 at 14.00.11.jpeg";
// import user from "@assets/images/about/user.png";
import "./about.css";

const About: FC = () => {
  // const colaboradores = [
  //   { nome: "Colaborador 1", cargo: "Cargo 1" },
  //   { nome: "Colaborador 2", cargo: "Cargo 2" },
  //   { nome: "Colaborador 3", cargo: "Cargo 3" },
  // ];

  return (
    <div className="home-container">
      <NavbarComponent />
      <main className="main-container">
        <p className="mx-auto sobre-titulo">Sobre</p>
        <div className="mx-auto conteudo-pagina">
          <span className="text-center section-titulo observatorio-titulo">Observatório de Desenvolvimento Sustentável de Barcarena - ODSB</span>
          <section className="d-flex align-items-center section-um">
            <div className="div-texto-intro">
              <p className="section-texto">
                O ODSB objetiva desenvolver um Sistema de Informações para o município de Barcarena, 
                integrando diversas dimensões do desenvolvimento sustentável. Esse sistema será atualizado 
                periodicamente com dados extraídos de fontes de órgãos de controle e pesquisa, como IBGE, IPEAData, 
                Atlas da Violência, Secretaria da Fazenda (SEFA), Fundação de Pesquisa do Estado do Pará (Fapespa), 
                Datasus, Secretaria de Comércio Exterior do Ministério da Economia, Tribunal de Contas dos 
                Municípios (TCM), Índice de Desenvolvimento Sustentável das Cidades (IDSC), Secretarias municipais de 
                Barcarena, além de relatórios e balanços anuais de empresas atuantes no município, entre outras 
                bases confiáveis.
              </p>
              <p className="section-texto">
                O sistema deve oferecer boletins periódicos (relatórios dinâmicos) e dashboards que refletirão o 
                status dos principais indicadores de desenvolvimento municipal. Além disso, será capaz de associar 
                esses indicadores a variáveis socioeconômicas, tecnológicas e ambientais, possibilitando a elaboração 
                de boletins analíticos. Esses boletins revelarão a relação entre a dinâmica do desenvolvimento municipal 
                e o desempenho das nove dimensões cobertas pelo observatório.
              </p>
            </div>
            <img className="img-ibs" src={IBS}></img>
          </section>
          <section className="d-flex align-items-center objetivos-section">
            <div className="d-flex justify-content-center align-items-center objetivos-titulo">
              <span className="section-titulo">Objetivos</span>
            </div>
            <div>
              <p className="objetivos-texto section-texto">
                O ODSB será uma ferramenta indispensável tanto para o estabelecimento das metas do Fundo de 
                Sustentabilidade Hydro, assim como base para o planejamento estratégico da Iniciativa Barcarena 
                Sustentável (IBS), além de servir como instrumento de pesquisa e estudo que dará o suporte às ações 
                dos parceiros no município de Barcarena, inclusive do poder público e de entidades da sociedade civil.
              </p>
            </div>
          </section>
          <section className="conceitos-section">
            <span className="text-center section-titulo">Conceitos Básicos (Dimensão, Indicadores e Variáveis)</span>
            <div className="d-flex div-conceitos-grupo">
              <img className="img-piramide" src={image_piramide}></img>
              <div className="conceito-texto">
                <p className="section-titulo conceito-titulo">Dimensão:</p>
                <p className="section-texto">Refere-se a uma categoria ou aspecto específico do fenômeno a ser 
                  analisado, como a Educação de Barcarena. Assim, a dimensão é o campo de estudo sob o qual as 
                  informações serão organizadas.</p>
                <p className="section-titulo conceito-titulo">Indicadores:</p>
                <p className="section-texto">São métricas específicas que permitem medir ou avaliar o desempenho 
                  dentro de uma dimensão. Por exemplo, na dimensão “educação”, um indicador poderia ser a “taxa de 
                  alfabetização”.</p>
                <p className="section-titulo conceito-titulo">Variáveis:</p>
                <p className="section-texto">São os dados ou atributos que alimentam os indicadores, como idade, 
                  gênero, ou localização geográfica. Elas fornecem os detalhes necessários para calcular ou definir 
                  o valor de um indicador.</p>
              </div>
            </div>
          </section>
          <section className="fontes-secundarias-section">
            <p className="text-center section-titulo">Dados de Fontes Secundárias</p>
            <p className="section-texto">
              A coleta de dados é essencial para realizar análises precisas e qualifica decisões. Ela pode ser 
              feita a partir de fontes primárias ou secundárias. Dados de fonte primária são aqueles coletados 
              diretamente pela pessoa ou organização que realiza a pesquisa, por meio de métodos como entrevistas, 
              questionários, observação direta ou experimentos. Esses dados são originais e específicos ao propósito 
              da pesquisa, oferecendo alta precisão e relevância, mas exigindo mais tempo e recursos para serem obtidos. 
              Por outro lado, os dados de fonte secundária são informações previamente coletadas e organizadas por terceiros, 
              como censos, relatórios governamentais, artigos acadêmicos ou bases de dados públicas. A combinação de ambas as 
              fontes é comum para equilibrar precisão e eficiência em estudos analíticos. A seleção criteriosa de fontes 
              secundárias confiáveis é crucial para garantir a qualidade e a precisão das análises. Dados de organizações 
              consolidadas e de prestígio nacional – como órgãos governamentais, institutos de pesquisa e agências reconhecidas – 
              assegura que as informações utilizadas foram coletadas com rigor metodológico e seguem padrões éticos e científicos. 
              Fontes bem estabelecidas geralmente passam por revisões rigorosas e são submetidas a auditorias regulares, o que aumenta 
              a confiabilidade dos dados. Além disso, essas fontes tendem a oferecer dados atualizados e contextualizados, o que é 
              essencial para evitar distorções ou conclusões equivocadas. Com base em fontes secundárias robustas, a pesquisa ganha 
              legitimidade e maior credibilidade, pois se apoia em informações de alta qualidade. O ODSB utiliza dados de fontes secundárias, 
              no entanto, estudos complementares oriundos de fontes primárias poderão ser disponibilizados na plataforma, considerando a 
              confiabilidade e relevância para a população de Barcarena.
            </p>
          </section>
          <div className="d-flex justify-content-center">
            <img className="img-mandala" src={image_mandala}></img>
          </div>
          <section className="d-flex dados-section">
            <div className="metodologia-dados-container">
              <p className="section-titulo">Metodologia Para Coleta de Dados</p>
              <p className="section-texto">
                O procedimento de diagnóstico baseado em indicadores é um processo sistemático de coleta, seleção, 
                análise e interpretação de dados para identificar problemas nas dimensões previstas em nosso estudo. O processo envolve as seguintes etapas:
                <ul>
                  <li>Coleta de dados a partir de uma variedade de fontes disponíveis, na sua maioria, online.</li>
                  <li>Definição dos Objetivos do diagnóstico. O que o estudo deseja identificar?</li>
                  <li>
                    Seleção dos indicadores segundo um critério de seleção ótimo, com o objetivo de garantir que eles 
                    sejam relevantes, válidos, confiáveis, sensíveis, específicos, acessíveis, eficientes, comparáveis, interpretáveis e úteis. 
                  </li>
                  <li>
                    Análise dos dados para identificação de tendências, padrões e discrepâncias, etapa realizada a partir de uma variedade de técnicas estatísticas ou qualitativas.
                  </li>
                  <li>
                    Interpretação dos resultados à luz dos objetivos do diagnóstico e dos indicadores selecionados previamente para este propósito. 
                    Ao considerar essas características, pretende-se garantir que resultados mais robustos e eficazes em relação as dimensões previstas nos estudos.
                  </li>
                </ul>
              </p>
            </div>
            <div className="metodologia-dados-container">
              <p className="section-titulo">Definição da Base de Dados</p>
              <p className="section-texto">
                Para compreender em profundidade de cada dimensão do ODSB, um levantamento de dados orientado por especialistas foi conduzido. Desse modo, 
                identificaram-se as informações, variáveis e indicadores essenciais para o estudo. Uma parcela expressiva dos dados foi coletada de forma 
                automatizada diretamente das plataformas originais, o que permitiu um enriquecimento rápido e consistente do banco de dados. Contudo, outras 
                informações precisaram ser coletadas manualmente a partir de diversas fontes secundárias, complementando o repositório. 
              </p>
              <p className="section-texto">
                Com essa base de dados, contendo variáveis, 
                indicadores e índices rigorosamente selecionados, tornou-se possível realizar uma análise detalhada das dimensões do ODSB por meio de modelos estatísticos avançados. 
                Esses modelos têm permitido identificar relações de causa e efeito tanto entre indicadores dentro de uma mesma dimensão quanto entre indicadores de diferentes dimensões, 
                aprofundando a compreensão das dinâmicas e interdependências que influenciam o desenvolvimento sustentável de Barcarena.
              </p>
            </div>
            <div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
