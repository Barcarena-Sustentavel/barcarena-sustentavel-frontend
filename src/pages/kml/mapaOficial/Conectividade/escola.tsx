import { useState,FC, useRef, ChangeEvent, useEffect } from "react";
import { EscolaBarcarena } from "../../interfaces/mapa.ts";
import { ChavesBooleanas } from "./map2.tsx";
import { useMap } from "react-leaflet";
import {Marker, 
        MapContainer, 
        Popup, 
        TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet";
//import { Marcador } from "./map2.tsx";
import L from "leaflet";
import Papa from "papaparse";
import { Tabela } from "../tabela.tsx";
export const MapaEscola:FC<{geoJsonListSetores: any[]}> = ({geoJsonListSetores}) => 
{
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
  const [tabela, setTabela] = useState<EscolaBarcarena[]>([]);
  const [dadosEscolasBarcarena, setDadosEscolasBarcarena] = useState<
      EscolaBarcarena[]
    >([]);
    const [statusInternet, setStatusInternet] = useState<ChavesBooleanas>({
        "Com internet": true,
        "Sem internet": true,
      });
    // Filtros para o mapa de escola (dependência e localização)
  const [tipoDependencia, setTipoDependencia] = useState<string>("Todas");
    //Localização para ser escolhida no mapa de escola
  const [tipoLocalizacao, setTipoLocalizacao] = useState<string>("Todas");
  //const refsMarcadorComInternet = useRef<(typeof Marker | null)[]>([]);
  //const refsMarcadorSemInternet = useRef<(typeof Marker | null)[]>([]);
  const [marcadorComInternet, setMarcadorComInternet] = useState<EscolaBarcarena[]>(
      [],
    );
  const [marcadorSemInternet, setMarcadorSemInternet] = useState<EscolaBarcarena[]>(
    [],
  );
  const [geoJsonListEscola, setGeoJsonListEscola] = useState<any[]>([]);
  const [fitBounds, setFitBounds] = useState<
      L.LatLngBoundsExpression | undefined
    >(undefined);
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
  const handleChange = (
      e: ChangeEvent<HTMLInputElement>,
      key: keyof ChavesBooleanas,
    ) => {
      if (e.currentTarget.name === "internetes") {
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
    }
    }


useEffect(() => {
      const resultDadosEscola = async () => {
              try {
                const fetchCsv = await fetch(
                  "/Conectividade/Escola/escolas_barcarena.csv",
                );
                const resText = await fetchCsv.text();
                const result = Papa.parse<EscolaBarcarena>(resText, {
                  header: true,
                  dynamicTyping: true, // converte números automaticamente
                  skipEmptyLines: true,
                });
                setDadosEscolasBarcarena(result.data);
              } catch (err) {
                console.error(err);
              }
            };
            resultDadosEscola();
    })
useEffect(() => {
  setMarcadorComInternet([]);
    setMarcadorSemInternet([]);
    const semInternet: string | undefined =
      statusInternet["Sem internet"] === true ? "Não" : undefined;

    const comInternet: string | undefined =
      statusInternet["Com internet"] === true ? "Sim" : undefined;

    const preencharMarcadoresEscola = (
      comInternet: string | undefined,
      semInternet: string | undefined,
    ) => {
      const novosMarcadoresComInternet: EscolaBarcarena[] = [];
      const novosMarcadoresSemInternet: EscolaBarcarena[] = [];
      const todasLocalizacao: boolean = tipoLocalizacao === "Todas" ? true : false;
      const todasDependencia: boolean =
        tipoDependencia === "Todas" ? true : false;

      dadosEscolasBarcarena.forEach((item) => {
        if (
          item.Internet === comInternet &&
          (item.Localização === tipoLocalizacao ||
            item.Dependência === tipoDependencia)
        ) {
          novosMarcadoresComInternet.push(item);
          return;
        } else if (
          item.Internet === comInternet &&
          todasLocalizacao &&
          todasDependencia
        ) {
          novosMarcadoresComInternet.push(item);
          return;
        }

        if (
          item.Internet === semInternet &&
          item.Localização === tipoLocalizacao &&
          item.Dependência === tipoDependencia
        ) {
          novosMarcadoresSemInternet.push(item);
          return;
        } else if (
          item.Internet === semInternet &&
          todasLocalizacao &&
          todasDependencia
        ) {
          novosMarcadoresSemInternet.push(item);
          return;
        }
      });
      setMarcadorComInternet(novosMarcadoresComInternet);
      setMarcadorSemInternet(novosMarcadoresSemInternet);
    };
    preencharMarcadoresEscola(comInternet, semInternet)
},[statusInternet, tipoDependencia, tipoLocalizacao, dadosEscolasBarcarena]);
useEffect(() => {
    setTabela([...marcadorComInternet, ...marcadorSemInternet]);
  }, [marcadorComInternet, marcadorSemInternet]);
  return(<div className="mapa">
    
          <div className="flex gap-4">
            {/* Dropdown 1 - Gestão */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Dependência
              </label>
              <select
                value={tipoDependencia}
                onChange={(e) => setTipoDependencia(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="Todas">Todas</option>
                <option value="Estadual">Estadual</option>
                <option value="Municipal">Municipal</option>
              </select>
            </div>

            {/* Dropdown 2 - Local */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Localização
              </label>
              <select
                value={tipoLocalizacao}
                onChange={(e) => setTipoLocalizacao(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="Todas">Todas</option>
                <option value="Rural">Rural</option>
                <option value="Urbana">Urbana</option>
              </select>
            </div>
          </div>
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
          
                    {marcadorComInternet.length > 0 ?(
                      marcadorComInternet.map((item, index) => (
                        <Marker
                          key={index}
                          position={[item.Latitude, item.Longitude]}
                          icon={blueIcon}
                          //ref={refsMarcadorComInternet[index]}
                        >
                          <Popup>
                            {Object.entries(item).map(([key, value]) => (
                              <div key={key}>
                                <b>{key}:</b> {value}
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
                  </MapContainer>
                  {/*<Tabela
                      botaoConectividade={'Escola'}
                      dadosTabela={tabela}
                      setFitBounds={setFitBounds}
                      refsMarcador={refsMarcador}
                    >*/}
        </div>) }

