import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/shoes/:id' element={ <ProductDetails /> } />
        <Route path='/shoes' element={ <Products /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
