import './App.css';
//import { ShoppingCartPage } from './components/ShoppingCartPage';
import {HeaderBar} from './components/HeaderBar';
import {Home} from './components/Home';
import {SignUpForm} from './components/SignUpForm';
import {LoginPage} from './components/LoginPage';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

 

function App() {
  return(
    <BrowserRouter>
      <div>
        <HeaderBar/>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
