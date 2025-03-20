"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const CreateIndicador_1 = require("./aux/indicador/CreateIndicador");
const CreatePage = () => {
    const { dimensao, activeTab } = (0, react_router_dom_1.useParams)();
    if (activeTab === "Dimensão") {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Nome da Dimens\u00E3o" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Descri\u00E7\u00E3o" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", children: "Criar Dimens\u00E3o" })] }) }));
    }
    if (activeTab === "Referencias") {
        return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "T\u00EDtulo" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Link" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", children: "Adicionar Refer\u00EAncia" })] }) }));
    }
    if (activeTab === "Contribuições") {
        // Handle Contribuições tab creation
    }
    if (activeTab === "Kmls") {
        // Handle Kmls tab creation
    }
    if (activeTab === "Indicadores") {
        return ((0, jsx_runtime_1.jsx)(CreateIndicador_1.CreateIndicador, { dimensao: dimensao }));
    }
};
exports.default = CreatePage;
