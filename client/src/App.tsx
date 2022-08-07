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
import EditProduct from "./components/admin/EditProduct";

import PaymentSuccess from "./pages/PaymentSuccess";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import { useEffect } from "react";
import { profile } from "./utils/authService";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";


function App() {
  const { token } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      dispatch(profile())
    }
  }, [token])

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/shoes/:slug' element={ <ProductDetails /> } />
          <Route path='/shoes' element={ <Products /> } />
          <Route path='/login' element={token? <Navigate to='/' /> : <LoginPage /> } />
          <Route path='/forgot-password' element={ <ForgotPassword /> } />
          <Route path='/register' element={token? <Navigate to='/' /> : <RegisterPage /> } />
          <Route path="/register-successful" element={ <RegisterSuccessful /> } />  
          <Route path="/verify-user" element={ <VerifyUser /> } />
          <Route path='/cart' element={ <Cart /> } />
          <Route path='/checkout' element={token? <Checkout /> : <Navigate to='/login' /> } />
          <Route path='/payment-success' element={token? <PaymentSuccess /> : <Navigate to='/login' /> } />
          <Route path='/profile' element={token? <Profile /> : <Navigate to='/login' />} />
          <Route path='/orders/:id' element={token? <OrderDetails /> : <Navigate to='/login' />} />
          <Route path='/administration' element={token?  <Admin />: <Navigate to='/' /> } />
          <Route path='/administration/edit-product/:slug' element={token? <EditProduct/> : <Navigate to='/' /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
