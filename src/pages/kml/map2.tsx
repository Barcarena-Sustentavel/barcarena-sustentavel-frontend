import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { KMLInterface } from "../../interfaces/kml_interface.tsx";
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";

const Map2: FC<{ dimensao: string | undefined }> = () => {
  //const [formIndicadoresAble, setformIndicadoresAble] = useState<boolean>(true);
  //const [geojsonData, setGeojsonData] = useState<any>(null);
  const [geojsonList, setGeojsonList] = useState<any[]>([]);

  interface ChaveSetores {
    [key: string]: boolean;
  }
  const [checkboxSetores, setCheckboxSetores] = useState<ChaveSetores>({
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
  //const [kmls, setKml] = useState<KMLInterface[]>([]);

  const handleChangeSetores = (item: keyof ChaveSetores): void => {
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
      if (todos === false) {
        setGeojsonList([]);
        return;
      }
      Object.entries(checkboxSetores).forEach(([key]) => {
        setGeoJsonToKml(key);
      });
    } else {
      setCheckboxSetores((prevState) => ({
        ...prevState,
        [item]: !prevState[item],
      }));
      setGeoJsonToKml(item.toString());
    }
  };

  const setGeoJsonToKml = async (item: string) => {
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
        setGeojsonList((prev) => [...prev, geojson]);
      } else {
        // checkbox está marcado, remover
        setGeojsonList((prev) =>
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

  console.log(geojsonList);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>
        {Object.entries(setores).map(([key]) => (
          <label key={key} style={{ display: "block", marginBottom: "8px" }}>
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
        {geojsonList.map((geojson, index) => (
          <GeoJSON key={index} data={geojson} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map2;
