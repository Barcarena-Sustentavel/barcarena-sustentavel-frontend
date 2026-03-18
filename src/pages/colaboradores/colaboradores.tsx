import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@assets/styles/index.css";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import emConstrucao from '../../assets/images/icons/emConstrucao.svg' 
import profile from '../../assets/images/icons/profile.png'
import "./colaboradores.css";
import BarraParceiros from "../../components/layout/barraParceiros/BarraParceiros.tsx";
import PersonaCard from "./personaCard.tsx";

const Colaboradores: FC = () => {
  const especialistasArea = [
    {
      area: "Economia e Mercado de Trabalho",
      nome: "Profa. Dra. Ana Elizabeth Neirão Reymão",
      instituicao: "ICSA — Instituto de Ciências Sociais Aplicadas",
      tag: "ICSA · UFPA",
      classCard: "blue"
    },
    {
      area: "Meio Ambiente e Saneamento",
      nome: "Profa. Dra. Marinalva Maciel",
      instituicao: "ICEN — Instituto de Ciências Exatas e Naturais",
      tag: "ICEN · UFPA",
      classCard: "blue"
    },
    {
      area: "Educação, Cultura, Esporte e Lazer",
      nome: "Prof. Dr. Héliton Ribeiro Tavares",
      instituicao: "ICEN — Instituto de Ciências Exatas e Naturais",
      tag: "ICEN · UFPA",
      classCard: "blue"
    },
    {
      area: "Mobilidade",
      nome: "B.Sc. Raimundo Jorge Pires Bastos",
      instituicao: "SEMOB — Secretaria Municipal de Mobilidade Urbana",
      tag: "SEMOB",
      classCard: "blue"
    },
    {
      area: "Ordenamento Territorial e Habitação",
      nome: "Prof. Dr. José Júlio Ferreira Lima",
      instituicao: "ITEC — Instituto de Tecnologia",
      tag: "ITEC · UFPA",
      classCard: "blue"
    },
    {
      area: "Segurança",
      nome: "MSc. Coronel Daniel Neves",
      instituicao: "Polícia Militar do Pará",
      tag: "PM-PA",
      classCard: "blue"
    },
    {
      area: "Saúde",
      nome: "Prof. Dr. João Marcelo Brazão Protázio",
      instituicao: "ICEN — Instituto de Ciências Exatas e Naturais",
      tag: "ICEN · UFPA",
      classCard: "blue"
    },
    {
      area: "Conectividade",
      nome: "Prof. Dr. Victor Hugo S. C. Pinto",
      instituicao: "ICEN — Instituto de Ciências Exatas e Naturais",
      tag: "ICEN · UFPA",
      classCard: "blue"
    },
  ];

  const timeDesenvolvimento = [
    {
      area: "Coordenação do Desenvolvimento da Plataforma",
      nome: "Dr. Victor Hugo S. C. Pinto",
      instituicao: "Professor na Faculdade de Computação | ICEN",
      tag: "UFPA",
      cardClass: "green",
    },
    {
      area: "Full Stack",
      nome: "Mário Roberto Lima Pinto",
      instituicao: "Estudante de Graduação em Ciência da Computação",
      tag: "UFPA",
      cardClass: "green",
    },
    {
      area: "Back End",
      nome: "Davison dos Santos Logan Cardoso",
      instituicao: "Estudante de Graduação em Ciência da Computação",
      tag: "UFPA",
      cardClass: "green",
    },
    {
      area: "Front End",
      nome: "Luiz Jordanny de Sousa da Silva",
      instituicao: "Estudante de Graduação em Ciência da Computação",
      tag: "UFPA",
      cardClass: "green",
    },
    {
      area: "Full Stack",
      nome: "Victor Hugo Goncalves de Oliveira",
      instituicao: "Estudante de Graduação em Ciência da Computação",
      tag: "UFPA",
      cardClass: "green",
    },
    {
      area: "Front End",
      nome: "João Pedro Souza Arruda",
      instituicao: "Estudante de Graduação em Ciência da Computação",
      tag: "UFPA",
      cardClass: "green",
    },
  ];

  const alunosColaboradores = [
    {
      nome: "Ana Beatrice da Silva Santana",
      instituicao: "Estudante de Graduação em Ciências Econômicas",
      tag: "UFPA",
    },
    {
      nome: "Breno Cauã Rodrigues da Silva",
      instituicao: "Estudante de Graduação em Estatística",
      tag: "UFPA",
    },
    {
      nome: "Éder Amoras Melo",
      instituicao: "Estudante de Pós-Graduação do PPGME",
      tag: "UFPA",
    },
    {
      nome: "Kevin Jesus Neves Oliveira",
      instituicao: "Estudante de Graduação em Ciências Econômicas",
      tag: "UFPA",
    },
    {
      nome: "Vitor Samuel Moraes dos Santos",
      instituicao: "Estudante de Graduação em Ciências Econômicas",
      tag: "UFPA",
    },
  ];

  // const navigate = useNavigate()
  // const handleNavigate = (e:any) => {
  //   e.preventDefault()
  //   navigate('/')}

  return (
    <>
      <NavbarComponent />
        <section className="page-hero">
          <div className="page-hero-eyebrow">Pessoas</div>
          <h1>Colaboradores</h1>
          <p>Especialistas, pesquisadores e desenvolvedores que tornam o ODSB possível.</p>
        </section>

        <div className="colabs-wrap">

          <div className="group-header">
            <div className="line"></div>
            <h2>Especialistas da Área</h2>
            <div className="line"></div>
          </div>
          <div className="colabs-grid">
            <div className="colab-card featured">
              <div className="colab-role-tag">✦ Coordenadora Geral do Projeto</div>
              <div className="colab-sub">Instituições Locais</div>
              <div className="colab-name">Profa. Dra. Maria Amélia Enriquez</div>
              <div className="colab-info">ICSA — Instituto de Ciências Sociais Aplicadas</div>
              <span className="colab-badge">ICSA · UFPA</span>
            </div>
            {especialistasArea.map((especialista) => (
              <PersonaCard key={especialista.nome} {...especialista} />
            ))}
          </div>

          
          <div className="group-header">
            <div className="line"></div>
            <h2>Time de Desenvolvimento</h2>
            <div className="line"></div>
          </div>
          <div className="colabs-grid">
            {timeDesenvolvimento.map((membro) => (
              <PersonaCard key={membro.nome} {...membro} />
            ))}
          </div>

          
          <div className="group-header">
            <div className="line"></div>
            <h2>Alunos Pesquisadores</h2>
            <div className="line"></div>
          </div>
          <div className="colabs-grid">
            {alunosColaboradores.map((aluno) => (
              <PersonaCard key={aluno.nome} {...aluno} />
            ))}
          </div>

        </div>
      <BarraParceiros />
      <Footer />
    </>
  );
};

export default Colaboradores;
