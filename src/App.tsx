import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import DimensaoAdmin from "./pages/admin/dimensaoAdmin.tsx";
import DimensaoComponent from "./pages/dimension/dimensao.tsx";
import DimensaoPageComponent from "./pages/admin/dimensao/DimensaoPageComponent.tsx";
import IndicadorComponent from "./pages/indicador/indicador.tsx";
import Home from "./pages/home/home.tsx";
import CreatePage from "./pages/admin/create/createPage.tsx";
import About from "./pages/about/about.tsx";
import "leaflet/dist/leaflet.css";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*Página inicial*/}
        <Route path="/" element={<Home />} />
        {/*Página de cada dimensão*/}
        <Route path="/:dimensao/" element={<DimensaoComponent />} />
        {/*Página de cada indicador referente a uma dimensão*/}
        <Route path="/:dimensao/:indicador/" element={<IndicadorComponent />} />
        {/*Página que mostra todas as dimensões*/}
        <Route path="/admin/dimensao/" element={<DimensaoAdmin />} />
        {/*Página que mostra todas as contribuições, indicadores e referências de uma dimensão*/}
        <Route
          path="/admin/dimensao/:dimensao/"
          element={<DimensaoPageComponent />}
        />
        {/*Página para criação de qualquer entidade referente a uma dimensão*/}
        <Route
          path="/admin/dimensao/:dimensao/create/:activeTab/"
          element={<CreatePage />}
        />

        <Route
          path="/admin/dimensao/:dimensao/update/:activeTab/:elementName/"
          element={<CreatePage />}
        />

        <Route path="/about/" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
