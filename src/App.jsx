import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Market from './pages/market/Market';
import AuthContext, { AuthContextProvider } from './context/AuthContext';
import React, { useContext } from 'react';
import AdminPanel from './pages/admin/AdminPanel';
import Product from './pages/admin/products/Product';
import ProductOrders from './pages/admin/products/ProductOrders'
import ProductDetail from './pages/market/ProductDetail';
import Cart from './pages/market/Cart';
import Orders from './pages/market/Orders';
import CheckOut from './pages/market/CheckOut';
import AllProducts from './pages/market/AllProducts';

function App() {
  return (
    <AuthContextProvider>
      <RoutesWrapper />
    </AuthContextProvider>
  );
}

function RoutesWrapper() {
  const { loggedIn, role, loading } = useContext(AuthContext);

  // If still loading the auth state, show a loading screen
  if (loading) {
    return <div>Loading...</div>;  // Replace with a proper loading component if you want
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />

      {/**Auth */}
      <Route path='/register' element={!loggedIn ? <Register /> : role === 'admin' ? <Navigate to='/admin' /> : <Navigate to='/market' />} />
      <Route path='/login' element={!loggedIn ? <Login /> : role === 'admin' ? <Navigate to='/admin' /> : <Navigate to='/market' />} />

      {/**MarketPage */}
      <Route path='/market' element={loggedIn && role === 'user' ? <Market /> : <Navigate to='/login' />} />
      <Route path='/market/allproducts' element={<AllProducts/>}/>
      <Route path='/market/productDetail/:id' element={<ProductDetail />} />
      <Route path='/market/cart' element={<Cart/>}/>
      <Route path='/market/checkout' element={<CheckOut/>}/>
      <Route path='/market/orders' element={<Orders/>}/>

      {/**AdminPage */}
      <Route path='/admin' element={loggedIn && role === 'admin' ? <AdminPanel /> : <Navigate to='/login' />} >
        <Route path='product' element={<Product />} />
        <Route path='orders' element={<ProductOrders/>}/>
      </Route>
    </Routes>
  );
}

export default App;
