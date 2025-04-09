"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AddDelete = ({ dimensao, activeTab }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleAdd = () => {
        navigate(`/admin/dimensao/${dimensao}/create/${activeTab}/`);
    };
    const handleDelete = () => {
        navigate(`/admin/dimensao/${dimensao}/delete/${activeTab}/`);
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleAdd, children: (0, jsx_runtime_1.jsx)("p", { children: "Adicionar" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleDelete, children: (0, jsx_runtime_1.jsx)("p", { children: "Deletar" }) })] }) }));
};
exports.default = AddDelete;
