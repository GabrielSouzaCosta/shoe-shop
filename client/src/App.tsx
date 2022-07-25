import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from './utils/authService'

import Home from './pages/Home'
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import { useAuth } from "./utils/useAuth";

function App() {
  const user = useAuth()

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/shoes/:id' element={ <ProductDetails /> } />
          <Route path='/shoes' element={ <Products /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/register' element={ <RegisterPage /> } />
          <Route path='/cart' element={ <Cart /> } />
          <Route path='/checkout' element={ <Checkout /> } />
          <Route path='/administration' element={user.is_superuser? <Admin /> : <Navigate to='/' /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
