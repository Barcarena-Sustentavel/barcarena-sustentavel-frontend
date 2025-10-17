import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import dimensoes from "../../utils/const.tsx";
import "./css/dimensaoAdmin.css";

const DimensaoAdmin: FC = () => {
  const navigate = useNavigate();
  //const [logged, setLogged] = useState(false);
  const handleClick = (dimensao: string) => {
    navigate(`/admin/dimensao/${dimensao}/`);
  };
  const { dimensoesColumn1, dimensoesColumn2, dimensoesCores123 } =
    dimensoes.GetAllConst();

  return (
    <div className="home-container">
      <div className="admin-header-dimensao-admin">
        <h1>Administração de Dimensões</h1>
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
        </div>
      </div>
    </div>
  );
};

export default DimensaoAdmin;
