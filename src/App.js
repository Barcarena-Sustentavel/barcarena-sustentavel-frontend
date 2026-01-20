"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const dimensaoAdmin_1 = __importDefault(require("./components/admin/dimensaoAdmin"));
const dimensao_1 = __importDefault(require("./components/dimensao"));
const DimensaoPageComponent_1 = __importDefault(require("./components/admin/dimensao/DimensaoPageComponent"));
const indicador_1 = __importDefault(require("./components/indicador/indicador"));
const index_1 = __importDefault(require("./components/index"));
const createPage_1 = __importDefault(require("./components/admin/create/createPage"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(index_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/:dimensao/", element: (0, jsx_runtime_1.jsx)(dimensao_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/:dimensao/:indicador/', element: (0, jsx_runtime_1.jsx)(indicador_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/dimensao/", element: (0, jsx_runtime_1.jsx)(dimensaoAdmin_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/admin/dimensao/:dimensao/", element: (0, jsx_runtime_1.jsx)(DimensaoPageComponent_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/admin/dimensao/:dimensao/create/:activeTab/', element: (0, jsx_runtime_1.jsx)(createPage_1.default, {}) })] }) }));
};
exports.default = App;
