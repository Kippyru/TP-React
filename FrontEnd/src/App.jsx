import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import LoginForm from "./loginform/Login";
import RegisterForm from "./loginform/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="/registro" element={<RegisterForm />}/>

        
      </Routes>
    </BrowserRouter>

  );
}

/*

        <Route path="/Home" element={<Home />}/>
        <Route path="/lista" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />

*/


export default App;
