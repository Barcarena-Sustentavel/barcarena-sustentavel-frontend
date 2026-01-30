// Importações React: hooks e tipos usados no componente
import {
  FC,
  MouseEvent,
  useEffect,
  useState,
  useRef,
} from "react";
// Componentes do react-leaflet para renderizar o mapa e camadas
import {
  Marker,
} from "react-leaflet";
// Estilos locais para o mapa
import "../../mapa.css";
// Biblioteca para converter KML (XML) em GeoJSON
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";
// Parser CSV usado para transformar o conteúdo CSV em objetos
//Importa Tabela
import { MapaCobertura } from "./cobertura.tsx";
import { MapaSaude } from "./saude.tsx";
import {MapaEscola} from "./escola.tsx";
// Tipo utilitário para estados de checkboxes/flags
export interface ChavesBooleanas {
    [key: string]: boolean;
  }
// Componente auxiliar que aplica `fitBounds` no mapa quando a prop `bounds` muda

// Componente principal do mapa (Map2)
// Recebe `dimensao` para decidir se mostra opções de Conectividade
const MapaConectividade: FC<{ dimensao: string | undefined }> = ({ dimensao }) => {
  // Opções de visualização para conectividade: tipo de mapa (Cobertura, Escola, Saúde)
  const mapasConectividade = ["Cobertura", "Escola", "Saúde"];
  //Estado do botão para escolher o mapa de conectividade
  const [botaoConectividade, setBotaoConectividade] =
    useState<string>("Cobertura");
  // Estados que guardam os dados lidos dos CSVs (escolas e unidades de saúde)
  //Carre a o componente tabela com o atual estado dos marcadores
  const [geojsonListSetores, setGeojsonListSetores] = useState<any[]>([]);  
  // Checkbox para ativar/desativar camadas de setores no mapa
  const [checkboxSetores, setCheckboxSetores] = useState<ChavesBooleanas>({
    Todos: false,
    Barcarena: false,
    Estradas: false,
    Ilhas: false,
    Murucupi: false,
    "Vila do Conde": false,
  });

  // Arquivos KML locais correspondentes aos setores
  const setores: Record<string, string> = {
    Todos: "",
    Barcarena: "barcarena_dissolved_lines.kml",
    Estradas: "estradas_dissolved_lines.kml",
    Ilhas: "ilhas_dissolved_lines.kml",
    Murucupi: "murucupi_dissolved_lines.kml",
    "Vila do Conde": "viladoconde_dissolved_lines.kml",
  };

  //Mudar o estado do botão de conectividade
  const onClickConectividade = (e: MouseEvent<HTMLButtonElement>) => {
    setBotaoConectividade(e.currentTarget.value);
  };
  //Mudar o estado do mapa conforme o checkbox de setor selecionado
  const handleChangeSetores = (item: keyof ChavesBooleanas): void => {
    //Se o item for "Todos", marca/desmarca todos os setores
    if (item === "Todos") {
      const todos: boolean = !checkboxSetores.Todos;
      setCheckboxSetores((prevState) => ({
        ...prevState,
        Todos: todos,
        Barcarena: todos,
        Estradas: todos,
        Ilhas: todos,
        Murucupi: todos,
        "Vila do Conde": todos,
      }));
      // Ao marcar/desmarcar 'Todos', atualiza a camada de cada setor
      Object.entries(checkboxSetores).forEach(([key]) => {
        setGeoJsonToKmlSetores(key);
      });
    } else {
      setCheckboxSetores((prevState) => ({
        ...prevState,
        [item]: !prevState[item],
      }));
      for (const key in checkboxSetores) {
        if (checkboxSetores[key] === false) {
          setCheckboxSetores((prev) => ({
            ...prev,
            Todos: false,
          }));
          break;
        }
      }
      setGeoJsonToKmlSetores(item.toString());
    }
  };
  // Carrega o KML correspondente ao setor e atualiza a camada no mapa
  const setGeoJsonToKmlSetores = async (item: string) => {
    const kmlUrl = item === "Todos" ? "" : `/setoresBarcarena/${setores[item]}`;
    if (kmlUrl === "") {
      return;
    }
    try {
      const response = await fetch(kmlUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Converte o KML para GeoJSON e adiciona/remove da lista de camadas
      const kmlText = await response.text();
      const parser = new DOMParser();
      const kmlXml = parser.parseFromString(kmlText, "text/xml");
      const parseError = kmlXml.getElementsByTagName("parsererror");
      if (parseError.length > 0) {
        console.error("XML Parse Error:", parseError[0].textContent);
        throw new Error("Failed to parse KML as XML");
      }
      // Aqui você pode usar o kmlXml com toGeoJSON ou outro parser
      const geojson = toGeoJSON.kml(kmlXml);
      if (checkboxSetores[item.toString()] === false) {
        // Se estava desmarcado, adiciona a camada ao mapa
        setGeojsonListSetores((prev) => [...prev, geojson]);
      } else {
        // Se estava marcado, remove a camada correspondente
        setGeojsonListSetores((prev) =>
          prev.filter(
            (g) =>
              g.features[0]?.properties?.name !==
              geojson.features[0]?.properties?.name,
          ),
        );
      }
    } catch (error) {
      console.error("Erro ao carregar KML:", error);
    }
  };

  // useEffect inicial: define valores padrão e carrega todos os setores
  useEffect(() => {
    handleChangeSetores("Todos");
  }, []);
  return (

    <div style={{ height: "100%", width: "100%" }}>
      {//Verifica a dimensão para mostrar os botões de conectividade
      dimensao === "Conectividade" && (
        <div className="botaoDivConectividade">
          <h2>Escolha um mapa</h2>
          <div className="botoesConectividade">
            {
            //Mostra todas as opções de mapas de conectividade
            mapasConectividade.map((mapa) => {
              return (
                <button value={mapa} onClick={(e) => onClickConectividade(e)}>
                  {mapa}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="mapa">
        <div className="setores">
          {
          //Mostra todas as checkboxes de setores censitários
          Object.entries(setores).map(([key]) => (
            <label
              key={key}
              style={{
                display: "block",
                marginBottom: "8px",
                marginRight: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={checkboxSetores[key]}
                onChange={() => handleChangeSetores(key)}
              />
              {key}
            </label>
          ))}
        </div>
        {/*Renderização dos mapas de conectividade conforme o estado da variável botaoConectividade */}
        {botaoConectividade === "Cobertura" && (<MapaCobertura geoJsonListSetores={geojsonListSetores}/>)}
        {botaoConectividade === "Escola" && (<MapaEscola geoJsonListSetores={geojsonListSetores}/>)}
        {botaoConectividade === "Saúde" && (<MapaSaude geoJsonListSetores={geojsonListSetores}/>)}
      </div>
    </div>
  );
};

export default MapaConectividade;
