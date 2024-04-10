import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import '@smastrom/react-rating/style.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AdminUserPage } from './components/AdminPages/AdminUserPage.jsx';
import { AdminProductPage } from './components/AdminPages/AdminProductPage.jsx';
import { TestPage } from './assets/01_TestPage.jsx';

import MainProductPage from './components/ProductPages/MainProductPage.jsx';
import PerProductPage from './components/ProductPages/PerProductPage.jsx';
import CategoryPage from './components/ProductPages/CategoryPage.jsx';

import ShoppingCartPage from './components/ShoppingCartPage/ShoppingCartPage.jsx';

import { SignUpPage } from './components/UserPages/SignUpPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainProductPage />
  },
  {
    path: "/product/:itemId",
    element: <PerProductPage />,
  },
  {
    path: "/admin-user",
    element: <AdminUserPage />,
  },
  {
    path: "/admin-product",
    element: <AdminProductPage />,
  },
  {
    path: "/shopping-cart",
    element: <ShoppingCartPage />
  },
  {
    path: "/category/:category",
    element: <CategoryPage />
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
