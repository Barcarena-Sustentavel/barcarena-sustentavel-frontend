"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const const_1 = __importDefault(require("../const"));
//import AddDelete from './addDelete'
const DimensaoAdmin = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleClick = (dimensao) => {
        navigate(`/admin/dimensao/${dimensao}/`);
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: const_1.default.map((dimensao) => ((0, jsx_runtime_1.jsx)("ul", { children: (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", { onClick: () => handleClick(dimensao), children: (0, jsx_runtime_1.jsx)("h3", { children: dimensao }) }) }) }, dimensao))) }));
};
exports.default = DimensaoAdmin;
