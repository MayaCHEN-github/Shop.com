import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { AdminUserPage } from './components/AdminPages/AdminUserPage.jsx';
import { AdminProductPage } from './components/AdminPages/AdminProductPage.jsx';
import { PaymentPage } from './components/Payment/PaymentPage.jsx';
import { OrderTrackPage } from './components/Payment/OrderTrackPage.jsx';
import { TestPage } from './assets/01_TestPage.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OrderTrackPage />
  </React.StrictMode>,
)
