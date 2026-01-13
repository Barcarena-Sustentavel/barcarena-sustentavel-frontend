"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const api_1 = __importDefault(require("../../api"));
const DimensaoComponent = () => {
    const { dimensao } = (0, react_router_dom_1.useParams)();
    const [indicadores, setIndicadores] = (0, react_1.useState)([]);
    const [referencias, setReferencias] = (0, react_1.useState)([]);
    const [dimensaoJson, setDimensao] = (0, react_1.useState)(null);
    const url = `/dimensoes/${dimensao}/`;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleNavigate = (indicador) => {
        navigate(`/${dimensao}/${indicador}/`);
    };
    (0, react_1.useEffect)(() => {
        api_1.default.get(url).then((response) => {
            setDimensao(response.data.dimensao);
            setIndicadores(response.data.indicadores);
            setReferencias(response.data.referencias);
        });
    }, [url, dimensao]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: dimensaoJson === null || dimensaoJson === void 0 ? void 0 : dimensaoJson.nome }), (0, jsx_runtime_1.jsx)("h2", { children: dimensaoJson === null || dimensaoJson === void 0 ? void 0 : dimensaoJson.descricao }), (0, jsx_runtime_1.jsx)("ul", { children: indicadores.length > 0 && indicadores.map((indicador) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { onClick: () => handleNavigate(indicador), children: indicador }) }))) }), referencias.length > 0 && referencias.map((referencia) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("a", { href: `${referencia.link}` }), " ", (0, jsx_runtime_1.jsx)("h3", { children: referencia.nome })] })))] }));
};
exports.default = DimensaoComponent;
