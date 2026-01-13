"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIndicador = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const postIndicador_1 = require("./postIndicador");
const react_bootstrap_1 = require("react-bootstrap");
let arrayIndicadorResponse = [];
const CreateIndicador = ({ dimensao }) => {
    const [indicador, setIndicador] = (0, react_1.useState)("");
    const chaveValorGraficos = {
        'Linha': 'line',
        'Linha Suave': 'spline',
        'Área': 'area',
        'Área Suave': 'areaspline',
        'Dispersão': 'scatter',
        'Coluna': 'column',
        'Barra': 'bar',
        'Bolha': 'bubble',
        'Intervalo de Área': 'arearange',
        'Intervalo de Coluna': 'columnrange',
        'Diagrama de Caixa': 'boxplot',
        'Mapa de Calor': 'heatmap',
        'Cascata': 'waterfall',
        'Funil': 'funnel',
        'Pirâmide': 'pyramid',
        'Mapa de Árvore': 'treemap',
        'Grafo de Rede': 'networkgraph',
        'Linha do Tempo': 'timeline'
    };
    const [graficoNode, setGraficoNode] = (0, react_1.useState)([(0, jsx_runtime_1.jsx)(GraficoComponent, { chaveValorGraficos: chaveValorGraficos })]);
    const addGrafico = () => {
        setGraficoNode([...graficoNode, (0, jsx_runtime_1.jsx)(GraficoComponent, { chaveValorGraficos: chaveValorGraficos })
        ]);
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "nomeIndicador", children: "Nome" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Nome do Indicador", id: "idIndicador", name: "nomeIndicador", onChange: (e) => setIndicador(e.target.value) }), (0, jsx_runtime_1.jsx)("div", { id: "graficos", children: graficoNode.map((grafico) => grafico) }), (0, jsx_runtime_1.jsx)("button", { id: "criarGrafico", onClick: addGrafico, children: "Adicionar Gr\u00E1fico" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: (e) => {
                        e.preventDefault();
                        (0, postIndicador_1.postIndicador)(dimensao, indicador, arrayIndicadorResponse);
                    }, children: "Criar Indicador" })] }) }));
};
exports.CreateIndicador = CreateIndicador;
const GraficoComponent = ({ /*arrayIndicadorResponse,*/ chaveValorGraficos }) => {
    const [graficoAdicionado, setGraficoAdicionado] = (0, react_1.useState)(false);
    const [newIndicadorResponse, setNewIndicadorResponse] = (0, react_1.useState)({
        arquivo: new File([], ''),
        descricaoGrafico: '',
        tituloGrafico: '',
        tipoGrafico: ''
    });
    const [cacheIndicadorResponse, setCacheIndicadorResponse] = (0, react_1.useState)(undefined);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "tituloGrafico", children: "Titulo do gr\u00E1fico" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "tituloGrafico", name: "tituloGrafico", placeholder: "Titulo do gr\u00E1fico", onChange: (e) => setNewIndicadorResponse(prevState => (Object.assign(Object.assign({}, prevState), { tituloGrafico: e.target.value }))) }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "csvGrafico", children: "Dados do gr\u00E1fico" }), (0, jsx_runtime_1.jsx)("input", { required: true, id: "csvGrafico", name: "csvGrafico", type: "file", onChange: (e) => {
                    //const formArquivo = new FormData();
                    //formArquivo.append('arquivo', e.target.files![0]);
                    //setNewIndicadorResponse(prevState => ({...prevState, arquivo:formArquivo}))
                    setNewIndicadorResponse(prevState => (Object.assign(Object.assign({}, prevState), { arquivo: e.target.files[0] })));
                } }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "descricaoGrafico", children: "Descri\u00E7\u00E3o do gr\u00E1fico" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "descricaoGrafico", name: "descricaoGrafico", onChange: (e) => setNewIndicadorResponse(prevState => (Object.assign(Object.assign({}, prevState), { descricaoGrafico: e.target.value }))), placeholder: "Descri\u00E7\u00E3o do gr\u00E1fico" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "", children: "Tipo Gr\u00E1fico" }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Select, { "aria-label": "Default select example", onChange: (e) => setNewIndicadorResponse(prevState => (Object.assign(Object.assign({}, prevState), { tipoGrafico: e.target.value }))), children: [(0, jsx_runtime_1.jsx)("option", { defaultValue: 'Selecione o tipo de gráfico', children: "Selecione o tipo de gr\u00E1fico" }), Object.keys(chaveValorGraficos).map(key => ((0, jsx_runtime_1.jsx)("option", { value: chaveValorGraficos[key], children: key }, chaveValorGraficos[key])))] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => {
                    if (graficoAdicionado === true) {
                        arrayIndicadorResponse.map(indicador => {
                            if (indicador === cacheIndicadorResponse) {
                                indicador = newIndicadorResponse;
                                setCacheIndicadorResponse(newIndicadorResponse);
                                setGraficoAdicionado(true);
                                return;
                            }
                        });
                    }
                    else {
                        setCacheIndicadorResponse(newIndicadorResponse);
                        arrayIndicadorResponse.push(newIndicadorResponse);
                        setGraficoAdicionado(true);
                    }
                }, children: "Aplicar" })] }));
};
