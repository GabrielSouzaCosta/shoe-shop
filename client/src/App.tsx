import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from './pages/Home'
import LoginPage from "./pages/authentication/LoginPage";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import RegisterPage from "./pages/authentication/RegisterPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import VerifyUser from "./pages/authentication/VerifyUser";
import RegisterSuccessful from "./pages/authentication/RegisterSuccessful";
import ForgotPassword from "./pages/authentication/ForgotPassword";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/shoes/:slug' element={ <ProductDetails /> } />
          <Route path='/shoes' element={ <Products /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/forgot-password' element={ <ForgotPassword /> } />
          <Route path='/register' element={ <RegisterPage /> } />
          <Route path="/register-successful" element={ <RegisterSuccessful /> } />  
          <Route path="/verify-user" element={ <VerifyUser /> } />
          <Route path='/cart' element={ <Cart /> } />
          <Route path='/checkout' element={ <Checkout /> } />
          <Route path='/administration' element={ <Admin /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
