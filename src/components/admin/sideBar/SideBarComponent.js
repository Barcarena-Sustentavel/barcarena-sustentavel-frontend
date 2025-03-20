"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const SideBar = () => {
    const adminPage = "/admin/dimensao/";
    return ((0, jsx_runtime_1.jsx)("div", { className: '', children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Administra\u00E7\u00E3o" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: adminPage, children: (0, jsx_runtime_1.jsx)("h3", { children: "Dimens\u00E3o" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: adminPage, children: (0, jsx_runtime_1.jsx)("h3", { children: "Contribui\u00E7\u00E3o" }) })] })] }) }));
};
exports.default = SideBar;
