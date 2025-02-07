import { FC, useState} from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import dimensoes from "../const";
import {Container, Row, Col} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { KML } from "../../interfaces/kml_interface";
import api from "../../api";
import ReactLeafletKml from 'react-leaflet-kml'; // react-leaflet-kml must be loaded AFTER react-leaflet

const Map:FC = () =>{
    const [formIndicadoresAble, setformIndicadoresAble] = useState<boolean>(true);
    //Kml a ser mostrado no mapa
    const [kmlDocument, setKmlDocument] = useState<any>(null);
    //Kmls a serem mostrados na tela
    const [kmls, setKml] = useState<KML[]>([])
    //Array com lista de coordenadas
    const [diagram, setDiagram] = useState<Array<Array<number>>>([])
    const getKml = (dimensao: string) => async () => {
        formIndicadoresAble == true ? setformIndicadoresAble(false): setformIndicadoresAble(false)
        if(kmls.length > 0){
          setKml([])
        } 
        const response = await api.get(`/dimensoes/kml/${dimensao}/`)
        setKml(response.data.kmls)
    }

    //Função para pegar as coordenadas de um kml
    const getKmlCoords = (kml:string) => async () => {
        setKmlDocument(null)
        const response = await api.get(`/dimensoes/kmlCoords/${kml}/`)
        const parser = new DOMParser();
        const kmlParser:any = parser.parseFromString(response.data.coordenadas, "text/xml")
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

        const setArr: Array<Array<number>> = [];

        arraysCoords.forEach((coordArray) => {
          coordArray.forEach((coord) => {
            // Divide a string de coordenadas usando vírgula como separador e pega apenas os 2 primeiros elementos (lat,long), invertendo a ordem
            const strArr = coord.split(",").splice(0, 2).reverse();
            // Cria um array vazio para armazenar os números convertidos
            const numArr:Array<number> = [];
            // Converte cada elemento string para número decimal e adiciona ao array numArr
            strArr.forEach((elem) => {
              numArr.push(parseFloat(elem));
            });
            // Adiciona o par de coordenadas convertido ao array final setArr
            setArr.push(numArr);
          });
        });
        setDiagram(setArr);
        setKmlDocument(kmlParser);
        console.log(setArr)
      }
    return (
    <div style={{height:'100%', width:'100%'}}>
        <MapContainer style={{height:'50%', width:'100%'}} center={[-1.51130, -48.61914]} zoom={10} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {kmlDocument && <ReactLeafletKml kml={kmlDocument}/>}
            {diagram.length > 0 && diagram.map((position:any, idx) => 
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>{"User"}</span>
            </Popup>
          </Marker>
        )}
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

export default Map