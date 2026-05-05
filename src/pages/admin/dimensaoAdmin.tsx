import { FC, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dimensoes from "../../utils/const.tsx";
import "./style.css";
import api from "../../adapters/api.tsx"
import { patchEmail, postEmail } from "../../services/crudEmail.tsx"
import "../../main.css"
import { ConstContext, ConstContextType } from "../../context/const/script/ConstContext.ts";
const DimensaoCard: FC<{ colunaDimensoes: Record<string, string>, colunaDimensoesCores: Record<string, string> }> = ({ colunaDimensoes, colunaDimensoesCores }) => {
  const navigate = useNavigate();

  const handleClick = (dimensao: string) => {
    navigate(`/admin/dimensao/${dimensao}/`);
  };

  return (
    <div className="dimensoes-grid">
      {Object.entries(colunaDimensoes).map(([key, value]) => (
        <div
          className="dimensao-card"
          style={{
            backgroundColor: `${colunaDimensoesCores[key]}`,
          }}
          key={key}
        >
          <button
            style={{
              backgroundColor: `${colunaDimensoesCores[key]}`,
            }}
            className="dimensao-button"
            onClick={() => handleClick(key)}
          >
            {value !== undefined && <svg
              viewBox={(value as any).viewBox}                   // Aumenta o ícone se for ativo
              stroke="white"  //{(icon as any).stroke}
              fill={(value as any).fill}
              strokeWidth={(value as any)["stroke-width"]}
              strokeLinecap={(value as any)["stroke-linecap"]}
              strokeLinejoin={(value as any)["stroke-linejoin"]}
              width="36" // icon um tamanho padrão
              height="36">
              {(value as any).children}
            </svg>}
            <h3>{key}</h3>
          </button>
        </div>
      ))}
    </div>)
}

const DimensaoAdmin: FC = () => {

  //Diminuir a quantidade de useStates, quando possível
  const { dimensoesIcones,dimensoesCores } =
      useContext<ConstContextType>(ConstContext);
  const [page, setPage] = useState<string>("dimensoes")
  const [isPopUpAberto, setIsPopUpAberto] = useState<Record<string, any>>({ estado: false, estudo: "" })
  const [email, setEmail] = useState<string>("");

  const [emailAtual, setEmailAtual] = useState<string>("");

  useEffect(() => {
    const fetchAll = async () => {
      const response = await api.get("/admin/email_contribuicao") 
          if (response.data.email_contribuicao) {
            setEmail(response.data.email_contribuicao.email);
            setEmailAtual(response.data.email_contribuicao.email);
          }
    }
    fetchAll()

  }, [])

  const handleSubmitEmail = (e: any) => {
    e.preventDefault();
    emailAtual && emailAtual != "" ? patchEmail(email) : postEmail(email);
    console.log("handlesubmitemail");
  }

  return (
    <div className="admin-sideBar-opcao" style={{ height: '100vh', backgroundColor: (isPopUpAberto.estado === true ? 'rgba(0,0,0,0.7)' : '') }}>
      <div className="sideBar-opcao">
        <img src="/src/assets/images/about/logo.png" alt="" />
        <div className="opcoes-sideBar">
          <button value="dimensoes" style={page === "dimensoes" ? { border: "solid 2px var(--primary-blue)", backgroundColor: "var(--primary-blue)", color: "white" } : {}} onClick={(e: any) => setPage(e.target.value)}>Dimensões</button>
          <button value="contribuicao" style={page === "contribuicao" ? { border: "solid 2px var(--primary-blue)", backgroundColor: "var(--primary-blue)", color: "white" } : {}} onClick={(e: any) => setPage(e.target.value)}>Contribuição</button>
        </div>
      </div>
      {page === "dimensoes" && <div className="dimensoes-grid-wallpaper">
        <div>
          <DimensaoCard colunaDimensoes={dimensoesIcones} colunaDimensoesCores={dimensoesCores} />        
        </div>
      </div>
      }

      {page === "contribuicao" &&
        <div className="dimensoes-grid-wallpaper" style={{display: "flex", justifyContent: "center", padding: "2rem 1.5rem"}}>
          <div style={{display: "flex" ,flexDirection: "column", justifyContent:"center", alignItems:"center"} } className="container-contribuicao">
            <form onSubmit={handleSubmitEmail}>

              <div className="contribuicao-label-email" style={{marginBottom:"1rem"}}>
                <label htmlFor="email-input">E-mail atual</label>
                <input
                  type="email"
                  id="email-input"
                  name="nome"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  placeholder="Digite um E-mail"
                  className="email-input"
                />
              </div>

              <button type="submit" id="submit-btn">
                {emailAtual ? ("Modificar E-mail") : ("Adicionar E-mail")}
              </button>

            </form>
          </div>
        </div>
      }

    </div>
  );
};

export default DimensaoAdmin;
