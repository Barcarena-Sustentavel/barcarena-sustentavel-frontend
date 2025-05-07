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
    <div style={{ height: '100%', width: '100%', margin: '0 auto' }}>
      <MapContainer style={{ height: "500px", width: "800px" }} center={[-1.51130, -48.61914]} zoom={10} scrollWheelZoom={true}>
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


/*import { FC, useState, useEffect} from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import ReactLeafletKml from 'react-leaflet-kml';
import { Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { KMLInterface } from "../../interfaces/kml_interface.tsx";
import api from "../../api.tsx";

const Map2:FC = () =>{
    //Lista de dimensões
    const [dimensoes, setDimensoes] = useState<string[]>([]);
    const [formIndicadoresAble, setformIndicadoresAble] = useState<boolean>(true);
    //Kml a ser mostrado no mapa
    const [kmlDocument, setKmlDocument] = useState<any>(null);
    //Kmls a serem mostrados na tela
    const [kmls, setKml] = useState<KMLInterface[]>([])
    //Array com lista de coordenadas
    //const [diagram, setDiagram] = useState<number[][][]>([])
    const getKml = (dimensao: string) => async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      formIndicadoresAble == true ? setformIndicadoresAble(false): setformIndicadoresAble(false)
        if(kmls.length > 0){
          setKml([])
        } 
        const response = await api.get(`/dimensoes/kml/${dimensao}/`)
        setKml(response.data.kmls)
    }

    //Função para pegar as coordenadas de um kml
    const getKmlCoords = (kml:string | undefined) => async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      kmlDocument != null ? setKmlDocument(null) : setKmlDocument(kmlDocument)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      //diagram != [] ? setDiagram([]) : setDiagram(diagram)
      const response = await api.get(`/dimensoes/kmlCoords/${kml}/`)
        const parser = new DOMParser();
        const kmlParser:any = parser.parseFromString(response.data.coordenadas, "text/xml")
        console.log(kmlParser)
        //Pega todas as coordenadas do kmlDocument
        const arraySelector =  kmlParser.querySelectorAll("coordinates")
        //Cria um array de arrays de strings com as coordenadas
        const arraysCoords:Array<Array<string>> = []

        //Transforma as coordenadas em um array string
        for(let i = 0; i < arraySelector.length; i++){
          const arraySelectorTextContent = arraySelector[i].textContent.split(" ")
          const arrayFilter = arraySelectorTextContent.filter((_:any, i:number) => i % (arraySelector.length/10) == 0);
          arraysCoords.push(arrayFilter)
        }

        const setArr: number[][][] = [];
        //const setArr: LatLng[][][] = [];

        arraysCoords.forEach((coordArray) => {
          const numArr:number[][] = [];
          //const numArr: LatLng[][] = [];
          coordArray.forEach((coord) => {
            // Divide a string de coordenadas usando vírgula como separador e pega apenas os 2 primeiros elementos (lat,long), invertendo a ordem
            const strArr = coord.split(",").splice(0, 2).reverse();
            const strArrNum:number[] = []
            // Cria um array vazio para armazenar os números convertidos
            // Converte cada elemento string para número decimal e adiciona ao array numArr
            //numArr.push(strArr)
            strArr.forEach(element => {
              strArrNum.push(Number(element));
          
            });
            console.log(strArrNum);
            numArr.push(strArrNum);
            setArr.push(numArr);
            //// Adiciona o par de coordenadas convertido ao array final setArr
            //setArr.push(numArr);
          });
        });
        //setDiagram((setArr));
        setKmlDocument(kmlParser);
        
      }
      useEffect(() => {
        api.get('/dimensoes/').then((response) => {
          setDimensoes(response.data.dimensoes);
        });
      }, []);
    return (
    <div style={{height:'100%', width:'100%'}}>
        <MapContainer style={{height:'50%', width:'100%'}} center={[-1.51130, -48.61914]} zoom={10} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {kmlDocument && <ReactLeafletKml kml={kmlDocument}/>}
         
        </MapContainer>

        <Container>
        <Row>
          <Col md={6}>
          <Form.Select   aria-label="Default select example">
            <option selected>Escolha a dimensão</option> :
          {dimensoes.map((dimensao) => (
                <option onClick={getKml(dimensao)} key={dimensao}>{dimensao}</option>
              ))}
          </Form.Select>
          </Col>
          <Col md={6}>
              <Form.Select disabled={formIndicadoresAble} id="formIndicadores" aria-label="Default select example">
              <option selected>Escolha o seu indicador</option> :
                {kmls.length > 0 && kmls.map((kml) => (
                    <option onClick={getKmlCoords(kml.nome)} key={kml.nome}>{kml.nome}</option>
                  ))}
                </Form.Select>
          </Col>
        </Row>
      </Container>
    </div>     

        )
}
*/
//export default Map2