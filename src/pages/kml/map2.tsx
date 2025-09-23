import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "./mapa.css";
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";
import { UnidadeSaude } from "./interfaces/mapa.ts";
import { EscolaBarcarena } from "./interfaces/mapa.ts";
import Papa from "papaparse";

const Map2: FC<{ dimensao: string | undefined }> = ({ dimensao }) => {
  interface ChavesBooleanas {
    [key: string]: boolean;
  }

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
  const [marcadorComInternet, setMarcadorComInternet] = useState<
    (UnidadeSaude | EscolaBarcarena)[]
  >([]);
  const [marcadorSemInternet, setMarcadorSemInternet] = useState<
    (UnidadeSaude | EscolaBarcarena)[]
  >([]);
  const [tipoDependencia, setTipoDependencia] = useState<string>("Todas");
  const [tipoLocalizacao, setTipoLocalizacao] = useState<string>("Todas");
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
      fetch("/Conectividade/Escola/escolas_barcarena.csv")
        .then((res) => res.text())
        .then((csvText) => {
          const result = Papa.parse<EscolaBarcarena>(csvText, {
            header: true,
            dynamicTyping: true, // converte números automaticamente
            skipEmptyLines: true,
          });
          if (result.data) {
            setDadosEscolasBarcarena(result.data);
          }
        });
    }

    if (botaoConectividade === "Saúde") {
      fetch("/Conectividade/Saúde/unidades_saude.csv")
        .then((res) => res.text())
        .then((csvText) => {
          const result = Papa.parse<UnidadeSaude>(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
          });
          if (result.data) {
            setDadosSaudeBarcarena(result.data);
          }
        });
    }

    const preencharCoordenadasMarcadores = (botaoConectividade: string) => {
      const arrayDados: (UnidadeSaude | EscolaBarcarena)[] =
        botaoConectividade === "Saúde"
          ? dadosSaudeBarcarena
          : botaoConectividade === "Escola"
            ? dadosEscolasBarcarena
            : [];
      const novosMarcadoresComInternet: (UnidadeSaude | EscolaBarcarena)[] = [];
      const novosMarcadoresSemInternet: (UnidadeSaude | EscolaBarcarena)[] = [];
      if (arrayDados.length > 0) {
        for (let i = 0; i < arrayDados.length; i++) {
          if (
            arrayDados[i].Internet === "Sim" &&
            statusInternet["Com internet"] === true
          ) {
            novosMarcadoresComInternet.push(arrayDados[i]);
          }
          if (
            arrayDados[i].Internet === "Não" &&
            statusInternet["Sem internet"] === true
          ) {
            novosMarcadoresSemInternet.push(arrayDados[i]);
          }
        }
      }
      if (novosMarcadoresComInternet.length > 0) {
        setMarcadorComInternet(novosMarcadoresComInternet);
      }
      if (novosMarcadoresSemInternet.length > 0) {
        setMarcadorSemInternet(novosMarcadoresSemInternet);
      }
    };

    preencharCoordenadasMarcadores(botaoConectividade);
  }, [
    botaoConectividade,
    statusInternet,
    tipoDependencia,
    tipoLocalizacao,
    //dadosSaudeBarcarena,
    //dadosEscolasBarcarena,
    //marcadorComInternet,
    //marcadorSemInternet,
  ]); // dispara quando tipoDado muda
  /*
  const preencharCoordenadasMarcadores = (botaoConectividade: string) => {
    const arrayDados: (UnidadeSaude | EscolaBarcarena)[] =
      botaoConectividade === "Saúde"
        ? dadosSaudeBarcarena
        : botaoConectividade === "Escola"
          ? dadosEscolasBarcarena
          : [];
    const novosMarcadoresComInternet: (UnidadeSaude | EscolaBarcarena)[] = [];
    const novosMarcadoresSemInternet: (UnidadeSaude | EscolaBarcarena)[] = [];
    if (arrayDados.length > 0) {
      for (let i = 0; i < arrayDados.length; i++) {
        if (
          arrayDados[i].Internet === "Sim" &&
          statusInternet["Com internet"] === true
        ) {
          novosMarcadoresComInternet.push(arrayDados[i]);
        }
        if (
          arrayDados[i].Internet === "Não" &&
          statusInternet["Sem internet"] === true
        ) {
          novosMarcadoresSemInternet.push(arrayDados[i]);
        }
      }
    }
    if (novosMarcadoresComInternet.length > 0) {
      setMarcadorComInternet(novosMarcadoresComInternet);
    }
    if (novosMarcadoresSemInternet.length > 0) {
      setMarcadorSemInternet(novosMarcadoresSemInternet);
    }
  }; */
  console.log(marcadorComInternet);
  console.log(marcadorSemInternet);
  function isEscolaBarcarena(item: any): item is EscolaBarcarena {
    return "Localização" in item && "Dependência" in item;
  }
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
            })}{" "}
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
                Tipo de Gestão
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
                Tipo de Local
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
          {geojsonListSetores.map((geojson, index) => (
            <GeoJSON key={index} data={geojson} />
          ))}

          {geojsonListConectividade.map((geojson, index) => (
            <GeoJSON key={index} data={geojson} />
          ))}
          {botaoConectividade === "Escola"
            ? marcadorComInternet
                .filter(isEscolaBarcarena)
                .filter(
                  (m) =>
                    m.Localização === tipoLocalizacao &&
                    m.Dependência === tipoDependencia, // ajuste os valores desejados aqui
                )
                .map((m, index) => (
                  <Marker key={index} position={[m.Latitude, m.Longitude]}>
                    <Popup>
                      <div>
                        Localização: {m.Localização} <br />
                        Dependência: {m.Dependência}
                      </div>
                    </Popup>
                  </Marker>
                ))
            : marcadorComInternet.map((m, index) => (
                <Marker key={index} position={[m.Latitude, m.Longitude]}>
                  <Popup>
                    <div>
                      Localização: {m.Latitude} <br />
                      Dependência: {m.Longitude}
                    </div>
                  </Popup>
                </Marker>
              ))}
          {marcadorSemInternet.map((m, index) => (
            <Marker key={index} position={[m.Latitude, m.Longitude]}>
              <Popup>Pop up marcdor sem internet</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map2;
