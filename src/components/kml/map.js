"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const MapContainer_1 = require("react-leaflet/MapContainer");
const TileLayer_1 = require("react-leaflet/TileLayer");
const Marker_1 = require("react-leaflet/Marker");
const Popup_1 = require("react-leaflet/Popup");
const const_1 = __importDefault(require("../const"));
const react_bootstrap_1 = require("react-bootstrap");
//import Dropdown from 'react-bootstrap/Dropdown';
const Form_1 = __importDefault(require("react-bootstrap/Form"));
const api_1 = __importDefault(require("../../api"));
const react_leaflet_kml_1 = __importDefault(require("react-leaflet-kml")); // react-leaflet-kml must be loaded AFTER react-leaflet
const Map = () => {
    const [formIndicadoresAble, setformIndicadoresAble] = (0, react_1.useState)(true);
    //Kml a ser mostrado no mapa
    const [kmlDocument, setKmlDocument] = (0, react_1.useState)(null);
    //Kmls a serem mostrados na tela
    const [kmls, setKml] = (0, react_1.useState)([]);
    //Array com lista de coordenadas
    const [diagram, setDiagram] = (0, react_1.useState)([]);
    const getKml = (dimensao) => () => __awaiter(void 0, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        formIndicadoresAble == true ? setformIndicadoresAble(false) : setformIndicadoresAble(false);
        if (kmls.length > 0) {
            setKml([]);
        }
        const response = yield api_1.default.get(`/dimensoes/kml/${dimensao}/`);
        setKml(response.data.kmls);
    });
    //Função para pegar as coordenadas de um kml
    const getKmlCoords = (kml) => () => __awaiter(void 0, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        kmlDocument != null ? setKmlDocument(null) : setKmlDocument(kmlDocument);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        //diagram != [] ? setDiagram([]) : setDiagram(diagram)
        const response = yield api_1.default.get(`/dimensoes/kmlCoords/${kml}/`);
        const parser = new DOMParser();
        const kmlParser = parser.parseFromString(response.data.coordenadas, "text/xml");
        //Pega todas as coordenadas do kmlDocument
        const arraySelector = kmlParser.querySelectorAll("coordinates");
        //Cria um array de arrays de strings com as coordenadas
        const arraysCoords = [];
        //Transforma as coordenadas em um array string
        for (let i = 0; i < arraySelector.length; i++) {
            const arraySelectorTextContent = arraySelector[i].textContent.split(" ");
            const arrayFilter = arraySelectorTextContent.filter((_, i) => i % (arraySelector.length / 10) == 0);
            arraysCoords.push(arrayFilter);
        }
        const setArr = [];
        arraysCoords.forEach((coordArray) => {
            coordArray.forEach((coord) => {
                // Divide a string de coordenadas usando vírgula como separador e pega apenas os 2 primeiros elementos (lat,long), invertendo a ordem
                const strArr = coord.split(",").splice(0, 2).reverse();
                // Cria um array vazio para armazenar os números convertidos
                const numArr = [];
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
        console.log(setArr);
    });
    return ((0, jsx_runtime_1.jsxs)("div", { style: { height: '100%', width: '100%' }, children: [(0, jsx_runtime_1.jsxs)(MapContainer_1.MapContainer, { style: { height: '50%', width: '100%' }, center: [-1.51130, -48.61914], zoom: 10, scrollWheelZoom: true, children: [(0, jsx_runtime_1.jsx)(TileLayer_1.TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), kmlDocument && (0, jsx_runtime_1.jsx)(react_leaflet_kml_1.default, { kml: kmlDocument }), diagram.length > 0 && diagram.map((position, idx) => (0, jsx_runtime_1.jsx)(Marker_1.Marker, { position: position, children: (0, jsx_runtime_1.jsx)(Popup_1.Popup, { children: (0, jsx_runtime_1.jsx)("span", { children: "User" }) }) }, `marker-${idx}`))] }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Container, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Row, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { md: 6, children: (0, jsx_runtime_1.jsxs)(Form_1.default.Select, { "aria-label": "Default select example", children: [(0, jsx_runtime_1.jsx)("option", { selected: true, children: "Escolha a dimens\u00E3o" }), " :", const_1.default.map((dimensao) => ((0, jsx_runtime_1.jsx)("option", { onClick: getKml(dimensao), children: dimensao }, dimensao)))] }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Col, { md: 6, children: (0, jsx_runtime_1.jsxs)(Form_1.default.Select, { disabled: formIndicadoresAble, id: "formIndicadores", "aria-label": "Default select example", children: [(0, jsx_runtime_1.jsx)("option", { selected: true, children: "Escolha o seu indicador" }), " :", kmls.length > 0 && kmls.map((kml) => ((0, jsx_runtime_1.jsx)("option", { onClick: getKmlCoords(kml.nome), children: kml.nome }, kml.nome)))] }) })] }) })] }));
};
exports.default = Map;
