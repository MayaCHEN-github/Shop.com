import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminUserPage from './components/AdminPages/AdminUserPage';
import AdminProductPage from './components/AdminPages/AdminProductPage';
import { ShoppingCartPage } from './components/ShoppingCartPage';
import {TestPage} from './assets/01_TestPage';
import Headbar from './assets/HeadBar';

function App() {
 

  return (
      <Router>
        <Routes>
          <Route path="/AdminUserPage" component={AdminUserPage} />
          <Route path="/AdminProductPage" component={AdminProductPage} />
          <Route path = "/shopping-cart" component={ShoppingCartPage} />
        </Routes>
        <Headbar/>
       </Router>
  )
}

export default App
