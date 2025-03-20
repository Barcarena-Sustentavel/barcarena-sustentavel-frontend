"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Highcharts = __importStar(require("highcharts"));
const highcharts_react_official_1 = __importDefault(require("highcharts-react-official"));
const react_1 = require("react");
const plotOptions = (dashboard) => {
    return {
        chart: {
            type: dashboard.tipoGrafico,
        },
        title: {
            text: dashboard.tituloGrafico != null ? dashboard.tituloGrafico : '',
        },
        series: dashboard.dados,
        xAxis: {
            categories: dashboard.categorias
        },
        yAxis: {
            title: {
                text: 'Valores'
            }
        }
    };
};
const DashboardComponent = ({ tipoGrafico, dados, tituloGrafico, categorias }) => {
    const chartComponentRef = (0, react_1.useRef)(null);
    let dadosGrafico = [];
    dados.map((dado, index = 0) => {
        dadosGrafico.push({
            name: `Dado ${index + 1}`,
            data: dado
        });
    });
    return ((0, jsx_runtime_1.jsx)(highcharts_react_official_1.default, { highcharts: Highcharts, options: plotOptions({
            tipoGrafico: tipoGrafico,
            dados: dadosGrafico,
            tituloGrafico: tituloGrafico,
            categorias: categorias
        }), ref: chartComponentRef }));
};
exports.DashboardComponent = DashboardComponent;
