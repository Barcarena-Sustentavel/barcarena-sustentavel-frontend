import {
  ChangeEvent,
  FC,
  MouseEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "./mapa.css";
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";
import { UnidadeSaude } from "./interfaces/mapa.ts";
import L from "leaflet";
import { EscolaBarcarena } from "./interfaces/mapa.ts";
import Papa from "papaparse";
interface Marcador extends UnidadeSaude, EscolaBarcarena {}
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Tabela: FC<{
  botaoConectividade: string;
  dadosTabela: Marcador[];
  setFitBounds: (fitBound: L.LatLngBoundsExpression) => void;
  refsMarcador: React.MutableRefObject<any>;
}> = ({ botaoConectividade, dadosTabela, setFitBounds, refsMarcador }) => {
  const colunas: string[] =
    botaoConectividade === "Saúde"
      ? ["Unidade", "Tipo", "Internet"]
      : ["Escola", "Dependência", "Internet"];
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 600, margin: "20px auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {colunas.map((coluna) => (
              <TableCell key={coluna} sx={{ fontWeight: "bold" }}>
                {coluna}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {dadosTabela.map((dado, index) => (
            <TableRow key={index}>
              <TableCell>
                <button
                  type="button"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "left",
                  }}
                  onClick={() => {
                    const novoFitBound: L.LatLngBoundsExpression = [
                      [-1.5113, -48.61914],
                      [dado.Latitude, dado.Longitude],
                    ];
                    setFitBounds(novoFitBound);
                    refsMarcador.current = dado;
                    console.log(refsMarcador.current);
                    refsMarcador.current.openPopup();
                  }}
                  value={
                    dado["Nome Escola"]
                      ? dado["Nome Escola"]
                      : dado["Tipo Unidade"]
                  }
                >
                  {botaoConectividade === "Escola"
                    ? dado["Nome Escola"]
                    : dado["Tipo Unidade"]}
                </button>
              </TableCell>
              <TableCell>
                {botaoConectividade === "Escola"
                  ? dado.Dependência
                  : dado["Tipo Unidade"]}
              </TableCell>
              <TableCell>{dado.Internet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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

const Map2: FC<{ dimensao: string | undefined }> = ({ dimensao }) => {
  interface ChavesBooleanas {
    [key: string]: boolean;
  }
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
  const mapasConectividade = ["Cobertura", "Escola", "Saúde"];
  const [botaoConectividade, setBotaoConectividade] =
    useState<string>("Cobertura");
  //Escola e saúde ------------------------------------------------------
  const [statusInternet, setStatusInternet] = useState<ChavesBooleanas>({
    "Com internet": true,
    "Sem internet": true,
  });
  const [dadosEscolasBarcarena, setDadosEscolasBarcarena] = useState<
    EscolaBarcarena[]
  >([]);
  const [dadosSaudeBarcarena, setDadosSaudeBarcarena] = useState<
    UnidadeSaude[]
  >([]);
  const refsMarcadorComInternet = useRef<(typeof Marker | null)[]>([]);
  const refsMarcadorSemInternet = useRef<(typeof Marker | null)[]>([]);

  const [marcadorComInternet, setMarcadorComInternet] = useState<Marcador[]>(
    [],
  );
  const [marcadorSemInternet, setMarcadorSemInternet] = useState<Marcador[]>(
    [],
  );
  const [tabela, setTabela] = useState<Marcador[]>([]);
  //Escola somente
  const [tipoDependencia, setTipoDependencia] = useState<string>("Todas");
  const [tipoLocalizacao, setTipoLocalizacao] = useState<string>("Todas");
  //Escola somente

  //Escola e saúde ------------------------------------------------------
  const [tecnologiasCoberturas, setTecnologiasCoberturas] =
    useState<ChavesBooleanas>({
      "2G": false,
      "3G": false,
      "4G": false,
      "5G": false,
      "3G4G5G": false, // único true
      "4G5G": false,
    });

  const [operadorasCoberturas, setOperadorasCoberturas] =
    useState<ChavesBooleanas>({
      Todas: false, //true, // único true
      Claro: false,
      Tim: false,
      Vivo: false,
    });
  const coberturaOperadoras: Record<string, string> = {
    Todas: "todas",
    Claro: "CLARO",
    Tim: "TIM",
    Vivo: "VIVO",
  };
  const [geojsonListSetores, setGeojsonListSetores] = useState<any[]>([]);
  const [geojsonListConectividade, setGeojsonListConectividade] = useState<
    any[]
  >([]);

  const [checkboxSetores, setCheckboxSetores] = useState<ChavesBooleanas>({
    Todos: false,
    Barcarena: false,
    Estradas: false,
    Ilhas: false,
    Murucupi: false,
    "Vila do Conde": false,
  });

  const setores: Record<string, string> = {
    Todos: "",
    Barcarena: "barcarena_dissolved_lines.kml",
    Estradas: "estradas_dissolved_lines.kml",
    Ilhas: "ilhas_dissolved_lines.kml",
    Murucupi: "murucupi_dissolved_lines.kml",
    "Vila do Conde": "viladoconde_dissolved_lines.kml",
  };

  const onClickConectividade = (e: MouseEvent<HTMLButtonElement>) => {
    setBotaoConectividade(e.currentTarget.value);
    if (e.currentTarget.value === "Cobertura") {
      setMarcadorComInternet([]);
      setMarcadorSemInternet([]);
      setOperadorasCoberturas((prev) => ({ ...prev, Todas: true }));
      setTecnologiasCoberturas((prev) => ({
        ...prev,
        "3G4G5G": true,
      }));
    }
    setGeojsonListConectividade([]);
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
    }

    if (e.currentTarget.name === "internetes") {
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
  };

  const handleChangeSetores = (item: keyof ChavesBooleanas): void => {
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

  const setGeoJsonToKmlSetores = async (item: string) => {
    console.log(item);
    const kmlUrl = item === "Todos" ? "" : `/setoresBarcarena/${setores[item]}`;
    if (kmlUrl === "") {
      return;
    }
    console.log(kmlUrl);
    try {
      const response = await fetch(kmlUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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
        // checkbox está desmarcado, adicionar
        setGeojsonListSetores((prev) => [...prev, geojson]);
      } else {
        // checkbox está marcado, remover
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

  //UseEffect para carregar as coberturas quando as tecnologias e operadoras forem escolhidas

  useEffect(() => {
    const tecnologiasAtivas = Object.keys(tecnologiasCoberturas).filter(
      (tec) => tecnologiasCoberturas[tec] === true,
    );

    const operadorasAtivas = Object.keys(operadorasCoberturas).filter(
      (op) => operadorasCoberturas[op] === true,
    );

    const novosPaths: string[] = [];

    tecnologiasAtivas.forEach((tec) => {
      operadorasAtivas.forEach((op) => {
        // pegar nome "limpo" da operadora pelo seu map
        const opFormatada = coberturaOperadoras[op] || op;
        novosPaths.push(`/Conectividade/Cobertura/${tec}_${opFormatada}.kml`);
      });
    });

    const carregarKmls = async () => {
      try {
        const results = await Promise.all(
          novosPaths.map(async (path) => {
            const response = await fetch(path);
            if (!response.ok) {
              throw new Error(`Erro HTTP! status: ${response.status}`);
            }

            const kmlText = await response.text();
            const parser = new DOMParser();
            const kmlXml = parser.parseFromString(kmlText, "text/xml");
            const parseError = kmlXml.getElementsByTagName("parsererror");

            if (parseError.length > 0) {
              console.error("Erro ao parsear XML:", parseError[0].textContent);
              return null;
            }

            return toGeoJSON.kml(kmlXml);
          }),
        );
        console.log("results: ", results);
        setGeojsonListConectividade(results.filter((r) => r !== null));
      } catch (err) {
        console.error("Erro ao carregar KMLs:", err);
      }
    };

    carregarKmls();
  }, [tecnologiasCoberturas, operadorasCoberturas]);

  useEffect(() => {
    if (botaoConectividade === "Cobertura") {
      setOperadorasCoberturas((prev) => ({ ...prev, Todas: true }));
      setTecnologiasCoberturas((prev) => ({ ...prev, "3G4G5G": true }));
    }
    handleChangeSetores("Todos");
  }, []);

  useEffect(() => {
    if (botaoConectividade === "Escola") {
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
    }

    if (botaoConectividade === "Saúde") {
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
    }
  }, [botaoConectividade]);

  useEffect(() => {
    setMarcadorComInternet([]);
    setMarcadorSemInternet([]);
    const semInternet: string | undefined =
      statusInternet["Sem internet"] === true ? "Não" : undefined;

    const comInternet: string | undefined =
      statusInternet["Com internet"] === true ? "Sim" : undefined;

    const preencherMarcadoresSaude = (
      comInternet: string | undefined,
      semInternet: string | undefined,
    ) => {
      const novosMarcadoresComInternet: Marcador[] = [];
      const novosMarcadoresSemInternet: Marcador[] = [];
      dadosSaudeBarcarena.forEach((item) => {
        if (item.Internet === comInternet) {
          novosMarcadoresComInternet.push(item as Marcador);
        }
        if (item.Internet === semInternet) {
          novosMarcadoresSemInternet.push(item as Marcador);
        }
      });
      setMarcadorComInternet(novosMarcadoresComInternet);
      setMarcadorSemInternet(novosMarcadoresSemInternet);
    };

    const preencharMarcadoresEscola = (
      comInternet: string | undefined,
      semInternet: string | undefined,
    ) => {
      const novosMarcadoresComInternet: Marcador[] = [];
      const novosMarcadoresSemInternet: Marcador[] = [];
      const todasLocalizacao: boolean =
        tipoLocalizacao === "Todas" ? true : false;
      const todasDependencia: boolean =
        tipoDependencia === "Todas" ? true : false;

      dadosEscolasBarcarena.forEach((item) => {
        if (
          item.Internet === comInternet &&
          (item.Localização === tipoLocalizacao ||
            item.Dependência === tipoDependencia)
        ) {
          novosMarcadoresComInternet.push(item as Marcador);
          return;
        } else if (
          item.Internet === comInternet &&
          todasLocalizacao &&
          todasDependencia
        ) {
          novosMarcadoresComInternet.push(item as Marcador);
          return;
        }

        if (
          item.Internet === semInternet &&
          item.Localização === tipoLocalizacao &&
          item.Dependência === tipoDependencia
        ) {
          novosMarcadoresSemInternet.push(item as Marcador);
          return;
        } else if (
          item.Internet === semInternet &&
          todasLocalizacao &&
          todasDependencia
        ) {
          novosMarcadoresSemInternet.push(item as Marcador);
          return;
        }
      });
      setMarcadorComInternet(novosMarcadoresComInternet);
      setMarcadorSemInternet(novosMarcadoresSemInternet);
    };

    if (botaoConectividade === "Saúde") {
      preencherMarcadoresSaude(comInternet, semInternet);
    }

    if (botaoConectividade === "Escola") {
      preencharMarcadoresEscola(comInternet, semInternet);
    }
  }, [
    botaoConectividade,
    statusInternet,
    tipoDependencia,
    tipoLocalizacao,
    dadosEscolasBarcarena,
    dadosSaudeBarcarena,
  ]); // dispara quando tipoDado muda

  useEffect(() => {
    setTabela([...marcadorComInternet, ...marcadorSemInternet]);
  }, [marcadorComInternet, marcadorSemInternet]);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {dimensao === "Conectividade" && (
        <div className="botaoDivConectividade">
          <h2>Escolha um mapa</h2>
          <div className="botoesConectividade">
            {mapasConectividade.map((mapa) => {
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
        {botaoConectividade === "Cobertura" && (
          <span className="tecnologiasEOperadoras">
            <div className="tecnologias">
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
        )}
        {(botaoConectividade === "Saúde" ||
          botaoConectividade === "Escola") && (
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
        )}
        {botaoConectividade === "Escola" && (
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
        )}
        <div className="setores">
          {Object.entries(setores).map(([key]) => (
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
          {(botaoConectividade === "Saúde" ||
            botaoConectividade === "Escola") && (
            <UpdateBounds bounds={fitBounds} />
          )}
          {geojsonListSetores.map((geojson, index) => (
            <GeoJSON key={index} data={geojson} />
          ))}
          {geojsonListConectividade.map((geojson, index) => (
            <GeoJSON key={index} data={geojson} />
          ))}

          {botaoConectividade === "Escola" && marcadorComInternet.length > 0 ? (
            marcadorComInternet.map((item, index) => (
              <Marker
                key={index}
                position={[item.Latitude, item.Longitude]}
                icon={blueIcon}
                ref={refsMarcadorComInternet[index]}
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
          {botaoConectividade === "Escola" && marcadorSemInternet.length > 0 ? (
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
          {botaoConectividade === "Saúde" && marcadorComInternet.length > 0 ? (
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
          {botaoConectividade === "Saúde" && marcadorSemInternet.length > 0 ? (
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
        {botaoConectividade === "Saúde" || botaoConectividade === "Escola" ? (
          <Tabela
            botaoConectividade={botaoConectividade}
            dadosTabela={tabela}
            setFitBounds={setFitBounds}
            refsMarcador={refsMarcador}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Map2;
