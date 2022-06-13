import { React } from 'react';
import './App.css';
import './stylesheets/Layout.css';
import './stylesheets/products.css';
import './stylesheets/authentication.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductInfo from './pages/ProductInfo';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './pages/AdminPage';

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoutes><Homepage /></ProtectedRoutes>} exact />
          <Route path='/productinfo/:productid' element={<ProtectedRoutes><ProductInfo /></ProtectedRoutes>} exact />
          <Route path='/cart' element={<ProtectedRoutes><CartPage /></ProtectedRoutes>} exact />
          <Route path='/orders' element={<ProtectedRoutes><OrdersPage /></ProtectedRoutes>} exact />
          <Route path='/admin' element={<ProtectedRoutes><AdminPage /></ProtectedRoutes>} exact />
          <Route path='/login' element={<LoginPage />} exact />
          <Route path='/register' element={<RegisterPage />} exact />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}
