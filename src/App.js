import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Srceens/Home';
import Footer from './Components/Srceens/Footer';
import ProductDetail from './Components/Srceens/ProductDetail';
import {useDispatch } from 'react-redux';
import Cart from './Components/Srceens/Cart';
import {ToastContainer} from "react-toastify"
import Register from './Components/Srceens/Register';
import Login from './Components/Srceens/Login';
import { loadUser } from './Components/Redux/Slices/authSlice';
import { useEffect } from 'react';
import CheckoutSuccess from './Components/Srceens/CheckoutSucess';
import NotFound from './Components/NotFound';
import Order from './Components/Srceens/Order';
import OrderDetail from './Components/Srceens/OrderDetail';
import Profile from './Components/Srceens/Profile';
import Admin from './Components/Srceens/Admin';
import UserList from './Components/Srceens/UserList';
import TotalProducts from "./Components/Srceens/TotalProducts"
import AddProduct from './Components/Srceens/AddProduct';
import OrdersList from './Components/Srceens/OrdersList';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    
    <div className="text-center bg-gray-100 min-h-screen">
     <BrowserRouter>
     <ToastContainer />
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/product/:id" element={<ProductDetail />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/checkout-success" element={<CheckoutSuccess />} />
          <Route exact path="/order" element={<Order />} />
          <Route exact path="/order/:id" element={<OrderDetail />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/admin" element={<Admin />} >
            <Route exact path="users-list" element={<UserList />} />
            <Route exact path="products-list" element={<TotalProducts/>} />
            <Route exact path="new-product" element={<AddProduct/>} />
            <Route exact path="orders-list" element={<OrdersList/>} />
          </Route>
          <Route exact path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
     </BrowserRouter>
     
    </div> 
  );
}

export default App;
