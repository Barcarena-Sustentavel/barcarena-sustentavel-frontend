"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const TabContentComponent_1 = require("../tab/TabContentComponent");
const DimensaoPageComponent = () => {
    const { dimensao } = (0, react_router_dom_1.useParams)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('Dimensão');
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("nav", { children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('Dimensão'), children: "Dimens\u00E3o" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('Indicadores'), children: "Indicadores" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('Referências'), children: "Refer\u00EAncias" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('Contribuições'), children: "Contribui\u00E7\u00F5es" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setActiveTab('Kmls'), children: "Kmls" })] }), (0, jsx_runtime_1.jsx)(TabContentComponent_1.TabContentComponent, { dimensao: dimensao, activeTab: activeTab })] }));
};
exports.default = DimensaoPageComponent;
