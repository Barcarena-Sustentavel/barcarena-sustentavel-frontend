import { FC, useEffect, useState, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { KMLInterface } from "../../interfaces/kml_interface.tsx";
import * as toGeoJSON from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";

const Map2: FC = () => {
  const [dimensoes, setDimensoes] = useState<string[]>([]);
  const [formIndicadoresAble, setformIndicadoresAble] = useState<boolean>(true);
  //const [geojsonData, setGeojsonData] = useState<any>(null);
  const [geojsonList, setGeojsonList] = useState<any[]>([]);
  const [kmls, setKml] = useState<KMLInterface[]>([]);
  const [checkboxSetores, setCheckboxSetores] = useState<ChaveSetores>({
    Todos: true,
    Barcarena: true,
    Estradas: true,
    Ilhas: true,
    Murucupi: true,
    "Vila do Conde": true,
  });
  const setores: Record<string, string> = useMemo(
    () => ({
      Todos: "",
      Barcarena: "barcarena_dissolved_lines.kml",
      Estradas: "estradas_dissolved_lines.kml",
      Ilhas: "ilhas_dissolved_lines.kml",
      Murucupi: "murucupi_dissolved_lines.kml",
      "Vila do Conde": "viladoconde_dissolved_lines.kml",
    }),
    [],
  );

  interface ChaveSetores {
    [key: string]: boolean;
  }

  const handleChangeSetores = async (
    item: keyof ChaveSetores,
  ): Promise<void> => {
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

  const setGeoJsonToKml = useCallback(
    async (item: string) => {
      const kmlUrl = `/setoresBarcarena/${setores[item]}`;
      try {
        console.log(kmlUrl);
        const response = await fetch(kmlUrl);
        const kmlText = await response.text();
        console.log(kmlText);
        const parser = new DOMParser();
        const kmlXml = parser.parseFromString(kmlText, "text/xml");

        // Aqui você pode usar o kmlXml com toGeoJSON ou outro parser
        const geojson = toGeoJSON.kml(kmlXml);
        if (checkboxSetores[item.toString()] === false) {
          setGeojsonList((prev) =>
            [...prev].slice(geojsonList.indexOf(geojson)),
          );
          return;
        }
        setGeojsonList((prev) => [...prev, geojson]);
      } catch (error) {
        console.error("Erro ao carregar KML:", error);
      }
    },
    [checkboxSetores, geojsonList, setores],
  );

  useEffect(() => {
    Object.entries(checkboxSetores).forEach(([key]) => {
      setGeoJsonToKml(key);
    });
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>
        {Object.entries(setores).map(([key]) => (
          <label key={key} style={{ display: "block", marginBottom: "8px" }}>
            <input
              type="checkbox"
              checked={!checkboxSetores[key]}
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
        {/*{geojsonData && <GeoJSON data={geojsonData} />}*/}
        {geojsonList.map((geojson, index) => (
          <GeoJSON key={index} data={geojson} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map2;
