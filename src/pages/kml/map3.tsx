import { FC, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, GeoJSON } from 'react-leaflet';
import dimensoes from "../../utils/const.tsx";
import { Container, Row, Col, Form } from 'react-bootstrap';
import { KML } from "../../interfaces/kml_interface.tsx";
import api from "../../api.tsx";
import * as toGeoJSON from "@tmcw/togeojson";
import 'leaflet/dist/leaflet.css';

// 🔧 FIX: importar os ícones diretamente e configurar o Leaflet
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map3: FC = () => {
  const dimensoesArray: string[] = [
    ...Object.keys(dimensoes.dimensoesColumn1),
    ...Object.keys(dimensoes.dimensoesColumn2)
  ];

  const [formIndicadoresAble, setformIndicadoresAble] = useState<boolean>(true);
  const [kmls, setKml] = useState<KML[]>([]);
  const [diagram, setDiagram] = useState<Array<Array<number>>>([]);
  const [geojsonData, setGeojsonData] = useState<any>(null);

  const getKml = (dimensao: string) => async () => {
    if (formIndicadoresAble) setformIndicadoresAble(false);
    if (kmls.length > 0) setKml([]);

    const response = await api.get(`/dimensoes/kml/${dimensao}/`);
    setKml(response.data.kmls);
    console.log(response.data.kmls);
  };

  const getKmlCoords = (kml: string) => async () => {
    setGeojsonData(null);
    setDiagram([]);

    const response = await api.get(`/dimensoes/kmlCoords/${kml}/`);
    const kmlXml = new DOMParser().parseFromString(response.data.coordenadas, "text/xml");

    const geojson = toGeoJSON.kml(kmlXml);
    setGeojsonData(geojson);

    const coords: Array<Array<number>> = [];
    geojson.features.forEach((feature: any) => {
      const geom = feature.geometry;
      if (geom.type === "Point") {
        coords.push(geom.coordinates.slice().reverse());
      } else if (geom.type === "LineString" || geom.type === "Polygon") {
        const points = geom.type === "Polygon"
          ? geom.coordinates[0]
          : geom.coordinates;
        points.forEach((coord: number[]) => coords.push(coord.slice().reverse()));
      }
    });

    setDiagram(coords);
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <MapContainer style={{ height: '500px', width: '800px', margin: '0 auto' }} center={[-1.51130, -48.61914]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geojsonData && <GeoJSON data={geojsonData} />}

        {diagram.length > 0 &&
          diagram.map((position, idx) => (
            <Marker key={`marker-${idx}`} position={position}>
              <Popup>
                <span>{"User"}</span>
              </Popup>
              <Tooltip>Tooltip for Marker</Tooltip>
            </Marker>
          ))}
      </MapContainer>

      <Container>
        <Row>
          <Col md={6}>
            <Form.Select aria-label="Selecionar dimensão">
              <option>Escolha a dimensão</option>
              {dimensoesArray.map((dimensao) => (
                <option onClick={getKml(dimensao)} key={dimensao}>{dimensao}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Select disabled={formIndicadoresAble} id="formIndicadores" aria-label="Selecionar indicador">
              <option>Escolha o seu indicador</option>
              {kmls.map((kml) => (
                <option onClick={getKmlCoords(kml.nome)} key={kml.nome}>{kml.nome}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Map3;

/*import { FC, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, GeoJSON } from 'react-leaflet';
import dimensoes from "../../utils/const.tsx";
import { Container, Row, Col, Form } from 'react-bootstrap';
import { KML } from "../../interfaces/kml_interface.tsx";
import api from "../../api.tsx";
import * as toGeoJSON from "@tmcw/togeojson";
import 'leaflet/dist/leaflet.css';

const Map3: FC = () => {
  const dimensoesArray: string[] = [
    ...Object.keys(dimensoes.dimensoesColumn1),
    ...Object.keys(dimensoes.dimensoesColumn2)
  ];

  const [formIndicadoresAble, setformIndicadoresAble] = useState<boolean>(true);
  const [kmls, setKml] = useState<KML[]>([]);
  const [diagram, setDiagram] = useState<Array<Array<number>>>([]);
  const [geojsonData, setGeojsonData] = useState<any>(null);

  const getKml = (dimensao: string) => async () => {
    if (formIndicadoresAble) setformIndicadoresAble(false);
    if (kmls.length > 0) setKml([]);

    const response = await api.get(`/dimensoes/kml/${dimensao}/`);
    setKml(response.data.kmls);
    console.log(response.data.kmls);
  };

  const getKmlCoords = (kml: string) => async () => {
    setGeojsonData(null);
    setDiagram([]);

    const response = await api.get(`/dimensoes/kmlCoords/${kml}/`);
    const kmlXml = new DOMParser().parseFromString(response.data.coordenadas, "text/xml");

    // Converte para GeoJSON
    const geojson = toGeoJSON.kml(kmlXml);
    setGeojsonData(geojson);

    // Extrai coordenadas para markers (se precisar)
    const coords: Array<Array<number>> = [];
    geojson.features.forEach((feature: any) => {
      const geom = feature.geometry;
      if (geom.type === "Point") {
        coords.push(geom.coordinates.slice().reverse()); // [lat, lon]
      } else if (geom.type === "LineString" || geom.type === "Polygon") {
        const points = geom.type === "Polygon"
          ? geom.coordinates[0] // primeiro anel
          : geom.coordinates;
        points.forEach((coord: number[]) => coords.push(coord.slice().reverse()));
      }
    });

    setDiagram(coords);
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <MapContainer style={{ height: '500px', width: '800px', margin:'0 auto' }} center={[-1.51130, -48.61914]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geojsonData && <GeoJSON data={geojsonData} />}

        {diagram.length > 0 &&
          diagram.map((position, idx) => (
            <Marker key={`marker-${idx}`} position={position}>
              <Popup>
                <span>{"User"}</span>
              </Popup>
              <Tooltip>Tooltip for Marker</Tooltip>
            </Marker>
          ))}
      </MapContainer>

      <Container>
        <Row>
          <Col md={6}>
            <Form.Select aria-label="Selecionar dimensão">
              <option>Escolha a dimensão</option>
              {dimensoesArray.map((dimensao) => (
                <option onClick={getKml(dimensao)} key={dimensao}>{dimensao}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Select disabled={formIndicadoresAble} id="formIndicadores" aria-label="Selecionar indicador">
              <option>Escolha o seu indicador</option>
              {kmls.map((kml) => (
                <option onClick={getKmlCoords(kml.nome)} key={kml.nome}>{kml.nome}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Map3;
*/
