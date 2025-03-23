import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DimensaoAdmin from './components/admin/dimensaoAdmin.tsx';
import DimensaoComponent  from './components/dimensao.tsx';
import DimensaoPageComponent from './components/admin/dimensao/DimensaoPageComponent.tsx';
import IndicadorComponent from './components/indicador/indicador.tsx';
import Home from './components/home/index.tsx';
import CreatePage  from './components/admin/create/createPage.tsx';


const App:FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        {/*Página inicial*/}
        <Route path="/" element={<Home/>} />
        {/*Página de cada dimensão*/}
        <Route path="/:dimensao/" element={<DimensaoComponent/>} />
        {/*Página de cada indicador referente a uma dimensão*/}
        <Route path='/:dimensao/:indicador/' element={<IndicadorComponent/>} />
        {/*Página que mostra todas as dimensões*/}
        <Route path="/admin/dimensao/" element={<DimensaoAdmin/>} />
        {/*Página que mostra todas as contribuições, indicadores e referências de uma dimensão*/}
        <Route path="/admin/dimensao/:dimensao/" element={<DimensaoPageComponent/>} />
        {/*Página para criação de qualquer entidade referente a uma dimensão*/}
        <Route path='/admin/dimensao/:dimensao/create/:activeTab/' element={<CreatePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App