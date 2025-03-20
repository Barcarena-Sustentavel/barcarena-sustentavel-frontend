"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const dashboard_1 = require("./dashboard/dashboard");
const api_1 = __importDefault(require("../../api"));
const react_router_dom_1 = require("react-router-dom");
const IndicadorComponent = () => {
    const { dimensao, indicador } = (0, react_router_dom_1.useParams)();
    const url = `/dimensoes/${dimensao}/indicador/${indicador}/`;
    const [indicadorJson, setIndicadorJson] = (0, react_1.useState)({
        nome: '',
        graficos: []
    });
    (0, react_1.useEffect)(() => {
        api_1.default.get(url).then((response) => {
            setIndicadorJson(response.data);
        });
        console.log(indicadorJson);
    }, [url]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: indicadorJson.nome }), indicadorJson.graficos.map((grafico) => {
                return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(dashboard_1.DashboardComponent, { tipoGrafico: grafico.tipoGrafico, dados: grafico.dados, tituloGrafico: grafico.tituloGrafico, categorias: grafico.categoria }), (0, jsx_runtime_1.jsx)("p", { children: grafico.descricaoGrafico != null ? grafico.descricaoGrafico : '' })] }) }));
            })] }));
};
exports.default = IndicadorComponent;
