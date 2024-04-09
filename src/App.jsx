import react, {useState} from 'react';

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminUserPage from './components/AdminPages/AdminUserPage';
import AdminProductPage from './components/AdminPages/AdminProductPage';
import {ShoppingCartPage}  from './components/ShoppingCartPage';
import Headbar from './assets/HeadBar';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignUpForm from './components/SignUpForm';

function App() {
  const [keyword, setKeyword] = useState('');
  const [minprice, setMinprice] = useState(0);
  const [maxprice, setMaxprice] = useState(500000);

  const changeKeyword = (newKeyword) =>{
    setKeyword(newKeyword);
    console.log(keyword);
  }

  const changeMinPrice = (newMinprice)=>{
    setMinprice(newMinprice);
    console.log(minprice);
  }

  const changeMaxPrice = (newMaxprice)=>{
    setMaxprice(newMaxprice);
    console.log(maxprice);
  }

  return (
      <Router>
        <Headbar onKeywordChange = {changeKeyword} onMinPriceChange ={changeMinPrice} onMaxPriceChange= {changeMaxPrice}/>
        <div style={{ marginTop: '130px' }}></div>        
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/AdminUserPage" element={<AdminUserPage />} />
          <Route path="/AdminProductPage" element={<AdminProductPage />} />
          <Route path = "/shopping-cart" element={ShoppingCartPage} />
        </Routes>
        
       </Router>
  )
}

export default App
