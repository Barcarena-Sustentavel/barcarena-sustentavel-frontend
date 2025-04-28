import { FC } from "react";
import { useNavigate } from "react-router-dom";
import dimensoes from "../../utils/const.tsx";
import "./css/dimensaoAdmin.css";

const DimensaoAdmin: FC = () => {
  const navigate = useNavigate();
  const handleClick = (dimensao: string) => {
    navigate(`/admin/dimensao/${dimensao}/`);
  };

  return (
    <div className="home-container">
      <div className="admin-header-dimensao-admin">
        <h1>Administração de Dimensões</h1>
      </div>
      <div className="dimensoes-grid-wallpaper">
        <div className="dimensoes-grid">
          <div className="dimensoes-column">
            {Object.entries(dimensoes.dimensoesColumn1).map(([key, value]) => (
              <div
                className="dimensao-card"
                style={{
                  backgroundColor: `var(--${dimensoes.dimensaoCores[key]})`,
                }}
                key={key}
              >
                <button
                  style={{
                    backgroundColor: `var(--${dimensoes.dimensaoCores[key]})`,
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
            {Object.entries(dimensoes.dimensoesColumn2).map(([key, value]) => (
              <div
                style={{
                  backgroundColor: `var(--${dimensoes.dimensaoCores[key]})`,
                }}
                className="dimensao-card"
                key={key}
              >
                <button
                  style={{
                    backgroundColor: `var(--${dimensoes.dimensaoCores[key]})`,
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
