import { useState, useEffect, FC } from "react";
import { ChavesBooleanas } from "./map2.tsx";
import * as toGeoJSON from "@tmcw/togeojson";
import { GeoJSON } from "react-leaflet";
import { ChangeEvent } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
//export const MapaCobertura:FC = () =>
export const MapaCobertura:FC<{geoJsonListSetores: any[]}> = ({geoJsonListSetores}) => 
{
  const [geoJsonListCobertura, setGeoJsonListCobertura] = useState<any[]>([]);

  const [tecnologiasCoberturas, setTecnologiasCoberturas] =
    useState<ChavesBooleanas>({
      "2G": false,
      "3G": false,
      "4G": false,
      "5G": false,
      "3G4G5G": false, // único true
      "4G5G": false,
    });
  // Operadoras para filtro de cobertura
  const [operadorasCoberturas, setOperadorasCoberturas] =
    useState<ChavesBooleanas>({
      Todas: false, //true, // único true
      Claro: false,
      Tim: false,
      Vivo: false,
    });
// Mapeamento de rótulos para nomes de arquivo (formato esperado nos KMLs)
 const coberturaOperadoras: Record<string, string> = {
    Todas: "todas",
    Claro: "CLARO",
    Tim: "TIM",
    Vivo: "VIVO",
  };
  const handleChange = (
      e: ChangeEvent<HTMLInputElement>,
      key: keyof ChavesBooleanas,
    ) => {
      if (e.currentTarget.name === "tecnologias") {
      setTecnologiasCoberturas((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }

    if (e.currentTarget.name === "operadoras") {
      setOperadorasCoberturas((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
  }}
  //handler de mudança para os checkboxes de tecnologias e operadoras
const mudarKmlCobertura = async () => {
      //Filtra as tecnologias ativas (true)
      const tecnologiasAtivas = Object.keys(tecnologiasCoberturas).filter(
        (tec) => tecnologiasCoberturas[tec] === true,
      );
      //Filtra as operadoras ativas (true)
      const operadorasAtivas = Object.keys(operadorasCoberturas).filter(
        (op) => operadorasCoberturas[op] === true,
      );
      
      //Paths para serem renderizados
      const novosPaths: string[] = [];
      
      //Pega da pasta Public os KMLs segundo a combinação de tecnologias e operadoras ativas
      tecnologiasAtivas.forEach((tec /*Tecnologia */) => {
        operadorasAtivas.forEach((op /*Operadora*/) => {
          //Formata para ficar no nome do arquivo caso ele exista
          const opFormatada = coberturaOperadoras[op] || op;
          //Faz push do arquivo
          novosPaths.push(`/Conectividade/Cobertura/${tec}_${opFormatada}.kml`);
        });
      })
      try {
        // Faz uma promisse que espera todos os elementos dentro do map serem resolvidos
        const results = await Promise.all(
          novosPaths.map(async (path) => {
            //fetch do arquivo KML
            const response = await fetch(path);
            if (!response.ok) {
              throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            
            //Conversão para xml
            const kmlText = await response.text();
            const parser = new DOMParser();
            //Arquivo já convertido para XML
            const kmlXml = parser.parseFromString(kmlText, "text/xml");
            const parseError = kmlXml.getElementsByTagName("parsererror");

            if (parseError.length > 0) {
              console.error("Erro ao parsear XML:", parseError[0].textContent);
              return null;
            }
            //Toda a vez que houver a conversão retorna para dentro de results em formato de lista
            return toGeoJSON.kml(kmlXml);
          }),
        );
        console.log("results: ", results);

        // Atualiza o estado com as camadas de conectividade válidas
        //setGeojsonListConectividade(results.filter((r) => r !== null));
        setGeoJsonListCobertura(results.filter((r) => r !== null));
      } catch (err) {
        console.error("Erro ao carregar KMLs:", err);
      }
}
  useEffect(() => {
    mudarKmlCobertura();
  }, [tecnologiasCoberturas, operadorasCoberturas]);
  
   useEffect(() => {
      setOperadorasCoberturas((prev) => ({ ...prev, Todas: true }));
      setTecnologiasCoberturas((prev) => ({ ...prev, "3G4G5G": true }));
  }, []);
//quando tecnologias ou operadoras mudam, monta lista de paths de KML e carrega
return (<div>
  <span className="tecnologiasEOperadoras">
            <div className="tecnologias">
              {/*Lista as tecnologias que podem ser mapeadas pela cobertura em formato de checkbox*/}
              <label>Tecnologias:</label>
              {Object.entries(tecnologiasCoberturas).map(([key]) => {
                return (
                  <label>
                    <input
                      type="checkbox"
                      name="tecnologias"
                      checked={tecnologiasCoberturas[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                    {key}
                  </label>
                );
              })}
            </div>
            <div className="operadoras">
              {/*Lista as operadoras que podem ser mapeadas pela cobertura em formato de checkbox*/}
              <label>Operadoras:</label>
              {Object.entries(operadorasCoberturas).map(([key]) => {
                return (
                  <label>
                    <input
                      type="checkbox"
                      name="operadoras"
                      checked={operadorasCoberturas[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                    {key}
                  </label>
                );
              })}
            </div>
          </span>
        <MapContainer
            style={{ height: "500px", width: "800px", margin: "0 auto" }}
            center={[-1.5113, -48.61914]}
            zoom={10}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          {geoJsonListSetores.map((geojson, index) => (
            <GeoJSON key={index} data={geojson} />
          ))}
          {geoJsonListCobertura.map((geojson, index) => (
              <GeoJSON key={index} data={geojson} />
            ))}
          </MapContainer>
          
      </div>
)
    }



