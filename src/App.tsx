import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DimensaoAdmin from './components/admin/dimensaoAdmin';
import DimensaoPage from './components/admin/dimensaoPage';
import Home from './components/index';

const App:FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin/dimensao/" element={<DimensaoAdmin/>} />
        <Route path="/admin/dimensao/:dimensao/" element={<DimensaoPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App