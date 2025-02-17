import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DimensaoAdmin from './components/admin/dimensaoAdmin';
import DimensaoPage from './components/admin/dimensao/DimensaoPageComponent';
import Home from './components/index';
import  CreatePage  from './components/admin/create/createPage';


const App:FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin/dimensao/" element={<DimensaoAdmin/>} />
        <Route path="/admin/dimensao/:dimensao/" element={<DimensaoPage/>} />
        <Route path='/admin/dimensao/create/' element={<CreatePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App