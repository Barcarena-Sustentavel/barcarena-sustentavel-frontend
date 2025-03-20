"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
//import Map from "./kml/map";
require("../css/map.css");
//import Map2 from "./kml/map2";
//import Map3 from "./kml/map3";
const const_1 = __importDefault(require("./const"));
const Home = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleClick = (dimensao) => {
        navigate(`/${dimensao}/`);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: 'container', children: (0, jsx_runtime_1.jsx)("div", { className: "map-container", children: (0, jsx_runtime_1.jsx)("ul", { children: const_1.default.map((dimensao) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { onClick: () => handleClick(dimensao), children: dimensao }) }))) }) }) }));
};
exports.default = Home;
