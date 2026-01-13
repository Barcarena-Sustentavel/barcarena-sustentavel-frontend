import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@assets/styles/index.css";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import emConstrucao from '../../assets/images/icons/emConstrucao.svg' 
import profile from '../../assets/images/icons/profile.png'
import "./colaboradores.css";

const Colaboradores: FC = () => {
  const [nomes,setNomes] = useState<string>("especialistas");
  const titulo:string = (nomes === "especialistas" ? "Especialistas da Área" : nomes === "timeDev" ? "Time de Desenvolvimento" : "Alunos Pesquisadores");
  const especialistaArea:Array<Record<string, string>> = [
    { nome: "Dra. Ana Elizabeth Neirão Reymão",
  area: "Economia e Mercado de Trabalho"
},

{ nome: "Dra. Marinalva Maciel",
  area: "Meio Ambiente e Saneamento"
},

{ nome: "Dr. Héliton Ribeiro Tavares",
  area: "Educação, Cultura, Esporte e Lazer"
},

{ nome: "B.Sc. Raimundo Jorge Pires Bastos",
  area: "Mobilidade"
},

{ nome: "Dr. José Júlio Ferreira Lima",
  area: "Ordenamento Territorial e Habitação"
},

{ nome: "MSc. Tenente Coronel Daniel Neves",
  area: "Segurança"
},

{ nome: "Dr. João Marcelo Brazão Protázio",
  area: "Saúde"
},

{ nome: "Dr. Victor Hugo Santiago C. Pinto",
  area: "Conectividade"
},

{ nome: "Dra. Maria Amélia Enriquez",
  area: "Instituições Locais"
}]
const timeDesenvolvimento:Array<Record<string, string>> = [{ nome:"Mário Roberto Lima Pinto"}, {nome:"Victor Hugo Santiago C. Pinto"}, {nome:"Davison dos Santos Logan Cardoso"}, {nome:"Luiz Jordanny de Sousa da Silva"}, {nome:"Victor Hugo Goncalves de Oliveira"}]
const alunosPesquisadores:Array<Record<string, string>> = [{ nome: "Ana Beatrice da Silva Santana",
  area: "Estudante de Graduação em Ciências Econômicas (UFPA)"
},

{ nome: "Breno Cauã Rodrigues da Silva",
  area: "Estudante de Graduação em Estatística (UFPA)"
},

{ nome: "Éder Amoras Melo",
  area: "Estudante de Pós-Graduação do PPGME (UFPA)"
},

{ nome: "Kevin Jesus Neves Oliveira",
  area: "Estudante de Graduação em Ciências Econômicas (UFPA)"
},

{ nome: "Vitor Samuel Moraes dos Santos",
  area: "Estudante de Graduação em Ciências Econômicas (UFPA)"
}
]
  const navigate = useNavigate()
  const handleNavigate = (e:any) => {
    e.preventDefault()
    navigate('/')}


const personas = (list:Array<Record<string, string>>) =>{
  return (<div className="times">{list.map(espec =>
             <div className="persona" key={espec.nome}>
             <img src={profile} alt="persona temporária" />
          <p>{espec.nome}</p> 
          <p>{espec.area}</p>
          </div>)}</div>)
}
  return (
    <div className="home-container">
      <NavbarComponent />
      <main>
        <div className="colabContainer" >
        <h2>{titulo}</h2>
        <p id="timesAbaixo">Escolha um dos times abaixo</p>
        <select name="colab-filter" id="colab-filter" onChange={(e) => setNomes(e.target.value)}>
          <option value="especialistas">Especialistas da Àrea</option>
          <option value="timeDev">Time de desenvolvimento</option>
          <option value="alunos">Alunos Pesquisadores</option>
        </select>
        {nomes === "especialistas" && 
        personas(especialistaArea)
        }
        {nomes === "timeDev" &&
        personas(timeDesenvolvimento)}
        {nomes === "alunos" && 
        personas(alunosPesquisadores)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Colaboradores;
