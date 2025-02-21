import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DimensaoAdmin from './components/admin/dimensaoAdmin';
import DimensaoPageComponent from './components/admin/dimensao/DimensaoPageComponent';
import Home from './components/index';
import  CreatePage  from './components/admin/create/createPage';


const App:FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:dimensao/" element={<Home/>} />
        <Route path='/:dimensao/:indicador/' element={<Home/>} />
        <Route path="/admin/dimensao/" element={<DimensaoAdmin/>} />
        <Route path="/admin/dimensao/:dimensao/" element={<DimensaoPageComponent/>} />
        <Route path='/admin/dimensao/:dimensao/create/:activeTab/' element={<CreatePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App