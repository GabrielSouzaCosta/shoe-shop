import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/shoes/:id' element={ <ProductDetails /> } />
        <Route path='/shoes' element={ <Products /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/register' element={ <RegisterPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
