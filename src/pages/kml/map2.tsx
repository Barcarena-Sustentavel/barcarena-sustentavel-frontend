import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "./mapa.css";
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";

const Map2: FC<{ dimensao: string | undefined }> = ({ dimensao }) => {
  interface ChavesBooleanas {
    [key: string]: boolean;
  }
  const mapasConectividade = ["Cobertura", "Escola", "Saúde"];
  const [botaoConectividade, setBotaoConectividade] =
    useState<string>("Cobertura");

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
        </MapContainer>
      </div>
    </div>
  );
};

export default Map2;
