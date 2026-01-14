import { useState,FC, useEffect } from "react";
import { UnidadeSaude } from "../../interfaces/mapa.ts";
import { useMap } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { ChangeEvent } from "react";
import Papa from "papaparse";
import { ChavesBooleanas } from "./map2.tsx";
import L from "leaflet";
import { Tabela } from "../tabela.tsx";
// Dados de Saúde para Barcarena

export const MapaSaude:FC<{geoJsonListSetores:any[]}> = ({geoJsonListSetores}) => {
  const UpdateBounds: FC<{ bounds: L.LatLngBoundsExpression | undefined }> = ({
    bounds,
  }) => {
    const map = useMap();
  
    useEffect(() => {
      if (bounds) {
        map.fitBounds(bounds);
      }
    }, [bounds, map]);
  
    return null;
  };
  const blueIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    // Ícone vermelho (usado para marcadores sem internet)
    const redIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  const [fitBounds, setFitBounds] = useState<
      L.LatLngBoundsExpression | undefined
    >(undefined); 
  const [dadosSaudeBarcarena, setDadosSaudeBarcarena] = useState<
    UnidadeSaude[]
  >([]);
  const [marcadorComInternet, setMarcadorComInternet] = useState<UnidadeSaude[]>(
    [],
  );
  const [marcadorSemInternet, setMarcadorSemInternet] = useState<UnidadeSaude[]>(
    [],
  );
  const [tabela, setTabela] = useState<UnidadeSaude[]>([]);
  const [statusInternet, setStatusInternet] = useState<ChavesBooleanas>({
    "Com internet": true,
    "Sem internet": true,
  });
  const handleChange = (
      e: ChangeEvent<HTMLInputElement>,
      key: keyof ChavesBooleanas,
    ) => {if (e.currentTarget.name === "internetes") {
      // Alterna exibição de marcadores com/sem internet e zera arrays para recalcular
      setStatusInternet((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
      if (key === "Com internet") {
        setMarcadorComInternet([]);
      }
      if (key === "Sem internet") {
        setMarcadorSemInternet([]);
      }
    }}
    useEffect(() => {
        const resultDadosSaude = async () => {
                try {
                  const fetchCsv = await fetch(
                    "/Conectividade/Saúde/unidades_saude.csv",
                  );
                  const resText = await fetchCsv.text();
                  const result = Papa.parse<UnidadeSaude>(resText, {
                    header: true,
                    dynamicTyping: true, // converte números automaticamente
                    skipEmptyLines: true,
                  });
                  setDadosSaudeBarcarena(result.data);
                } catch (err) {
                  console.error(err);
                }
              };
              resultDadosSaude();
      },[])
    
      useEffect(() => {
        setMarcadorComInternet([]);
        setMarcadorSemInternet([]);
        const semInternet: string | undefined =
          statusInternet["Sem internet"] === true ? "Não" : undefined;

        const comInternet: string | undefined =
          statusInternet["Com internet"] === true ? "Sim" : undefined;

        // Preenche marcadores quando a fonte for 'Saúde'
         // Preenche marcadores quando a fonte for 'Saúde'
        const preencherMarcadoresSaude = (
          comInternet: string | undefined,
          semInternet: string | undefined,
        ) => {
          const novosMarcadoresComInternet: UnidadeSaude[] = [];
          const novosMarcadoresSemInternet: UnidadeSaude[] = [];
        
          dadosSaudeBarcarena.forEach((item) => {
            if (item.Internet === comInternet) {
              novosMarcadoresComInternet.push(item);
            }
            if (item.Internet === semInternet) {
              novosMarcadoresSemInternet.push(item);
            }
          });
          setMarcadorComInternet(novosMarcadoresComInternet);
          setMarcadorSemInternet(novosMarcadoresSemInternet);
        };
        preencherMarcadoresSaude(comInternet, semInternet);
      },[statusInternet, dadosSaudeBarcarena]);
      useEffect(() => {
    setTabela([...marcadorComInternet, ...marcadorSemInternet]);
  }, [marcadorComInternet, marcadorSemInternet]);
  console.log(marcadorComInternet)
  console.log(marcadorSemInternet)
  return(<div>
      <span>
            {Object.entries(statusInternet).map(([key]) => {
              return (
                <label>
                  <input
                    type="checkbox"
                    name="internetes"
                    checked={statusInternet[key]}
                    onChange={(e) => handleChange(e, key)}
                  />
                  {key}
                </label>
              );
            })}
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
                    
                      <UpdateBounds bounds={fitBounds} />
                    
                    {geoJsonListSetores.map((geojson, index) => (
                      <GeoJSON key={index} data={geojson} />
                    ))}

                    {marcadorComInternet.length > 0 ? (
                      marcadorComInternet.map((item, index) => (
                        <Marker
                          key={index}
                          position={[item.Latitude, item.Longitude]}
                          icon={blueIcon}
                        >
                          <Popup>
                            {Object.entries(item).map(([key, value]) => (
                              <div key={key}>
                                <b>{key}:</b>
                                {value}
                                <br />
                              </div>
                            ))}
                          </Popup>
                        </Marker>
                      ))
                    ) : (
                      <></>
                    )}
                    {marcadorSemInternet.length > 0 ? (
                      marcadorSemInternet.map((item, index) => (
                        <Marker
                          key={index}
                          position={[item.Latitude, item.Longitude]}
                          icon={redIcon}
                        >
                          <Popup>
                            <div>
                              {Object.entries(item).map(([key, value]) => (
                                <div key={key}>
                                  <b>{key}:</b> {value}
                                  <br />
                                </div>
                              ))}
                            </div>
                          </Popup>
                        </Marker>
                      ))
                    ) : (
                      <></>
                    )}
                  </MapContainer>

  </div>);

}