import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminUserPage from './components/AdminPages/AdminUserPage';
import AdminProductPage from './components/AdminPages/AdminProductPage';
import MainProductPage from './components/ProductPages/MainProductPage';
import Headbar from './components/ProductPages/HeadBarProduct';
import PerProductPage from './components/ProductPages/PerProductPage';
import { ShoppingCartPage } from './components/ShoppingCartPage';
 
function App() {
  const [keyword,setKeyword] = useState('');
  const [category,setCategory] = useState('');

  const handleKeywordChange = (keyword) =>{
    setKeyword(keyword);
  }

  return (
    <>
       <Router>
          <Headbar />
          <Routes>
            <Route path="/AdminUserPage" element={<AdminUserPage />} />
            <Route path="/AdminProductPage" element={<AdminProductPage />} />
            <Route path="/" element={<MainProductPage />} />
            <Route path="/PerProductPage/:id" element={<PerProductPage />} />
            <Route path="/ShoppingCartPage" element={<ShoppingCartPage />} />
          </Routes>
      </Router>        
    </>
  )
}

export default App
