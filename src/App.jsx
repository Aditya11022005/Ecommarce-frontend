import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contect from './pages/Contect';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Login from './pages/Login';
import Product from './pages/Product';
import Cart from './pages/Cart'; // ✅ Added import
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import './index.css'; // ✅ Ensure styles are imported
import Footer from './components/Footer';


function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Loader for 1s on every route change
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return <Loader />;

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contect />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order' element={<Order />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
