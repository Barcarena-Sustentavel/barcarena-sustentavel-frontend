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
exports.TabContentComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const api_1 = __importDefault(require("../../../api"));
const addDelete_1 = __importDefault(require("../addDelete"));
const TabContentComponent = ({ dimensao, activeTab }) => {
    const [dimensaoJson, setDimensao] = (0, react_1.useState)();
    const [nomeIndicadores, setNomeIndicadores] = (0, react_1.useState)([]);
    const [nomeReferencias, setNomeReferencias] = (0, react_1.useState)([]);
    const [nomeContribuicoes, setNomeContribuicoes] = (0, react_1.useState)([]);
    const [nomeKmls, setNomeKmls] = (0, react_1.useState)([]);
    const url = `/admin/dimensoes/${dimensao}/`;
    const activeTabDict = {
        'Indicadores': nomeIndicadores,
        'Referências': nomeReferencias,
        'Contribuições': nomeContribuicoes,
        'Kmls': nomeKmls
    };
    //Lista de dados dos indicadores relacionados a dimensão
    const [formData, setFormData] = (0, react_1.useState)({
        nome: '',
        descricao: ''
    });
    //Função para atualizar o estado do formulário
    const handleInputChange = (e) => {
        //Desestruturação do evento em nome e valor do input
        const { name, value } = e.target;
        //Atualiza o estado do formulário
        setFormData(prev => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield api_1.default.put(`/dimensoes/${dimensaoJson === null || dimensaoJson === void 0 ? void 0 : dimensaoJson.id}/`, {
                nome: formData.nome,
                descricao: formData.descricao
            });
            setDimensao(response.data);
        }
        catch (error) {
            console.log(error);
        }
    });
    (0, react_1.useEffect)(() => {
        api_1.default.get(url).then(response => {
            setDimensao(response.data.dimensao);
            setNomeIndicadores(indicadores => [...indicadores, response.data.indicadores]);
            setNomeReferencias(referencias => [...referencias, response.data.referencias]);
            setNomeContribuicoes(contribuicoes => [...contribuicoes, response.data.contribuicoes]);
            setNomeKmls(kmls => [...kmls, response.data.kmls]);
        }).catch(error => {
            setDimensao(undefined);
            setNomeIndicadores([]);
            setNomeReferencias([]);
            setNomeContribuicoes([]);
            setNomeKmls([]);
            console.log(error);
        });
    }, [url, dimensao]);
    if (activeTab === 'Dimensão') {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Nome" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "nome", value: formData.nome, placeholder: dimensaoJson === null || dimensaoJson === void 0 ? void 0 : dimensaoJson.nome.toString(), onChange: handleInputChange }), (0, jsx_runtime_1.jsx)("label", { children: "Descri\u00E7\u00E3o" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "descricao", value: formData.descricao, placeholder: dimensaoJson === null || dimensaoJson === void 0 ? void 0 : dimensaoJson.descricao.toString(), onChange: handleInputChange }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSubmit, children: "Salvar Altera\u00E7\u00F5es" })] }));
    }
    else {
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(addDelete_1.default, { dimensao: dimensao, activeTab: activeTab }), (0, jsx_runtime_1.jsx)("div", { children: activeTabDict[activeTab].map((elementName) => {
                        return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/dimensoes/${dimensao}/${elementName}`, children: (0, jsx_runtime_1.jsx)("p", { children: elementName }) }));
                    }) })] }));
    }
};
exports.TabContentComponent = TabContentComponent;
