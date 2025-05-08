import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Container, Row, Col, Form } from "react-bootstrap";
import { KMLInterface } from "../../interfaces/kml_interface.tsx";
import api from "../../api.tsx";
import * as toGeoJSON from "@tmcw/togeojson";
import 'leaflet/dist/leaflet.css';

const Map2: FC = () => {
  const [dimensoes, setDimensoes] = useState<string[]>([]);
  const [formIndicadoresAble, setformIndicadoresAble] = useState<boolean>(true);
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [kmls, setKml] = useState<KMLInterface[]>([]);

  const getKml = (dimensao: string) => async () => {
    setformIndicadoresAble(false);
    setKml([]);
    const response = await api.get(`/dimensoes/kml/${dimensao}/`);
    setKml(response.data.kmls);
  };

  const getKmlCoords = (kml: string | undefined) => async () => {
    setGeojsonData(null);
    const response = await api.get(`/dimensoes/kmlCoords/${kml}/`);
    const parser = new DOMParser();
    const kmlXml = parser.parseFromString(response.data.coordenadas, "text/xml");
    const geojson = toGeoJSON.kml(kmlXml);
    setGeojsonData(geojson);
  };

  useEffect(() => {
    api.get('/dimensoes/').then((response) => {
      setDimensoes(response.data.dimensoes);
    });
  }, []);

  return (
    <div style={{ height: '100%', width: '100%'}}>
      <MapContainer style={{ height: "500px", width: "800px", margin: '0 auto'  }} center={[-1.51130, -48.61914]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geojsonData && <GeoJSON data={geojsonData} />}
      </MapContainer>

      <Container>
        <Row>
          <Col md={6}>
            <Form.Select aria-label="Selecionar dimensão">
              <option>Escolha a dimensão</option>
              {dimensoes.map((dimensao) => (
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

export default Map2;