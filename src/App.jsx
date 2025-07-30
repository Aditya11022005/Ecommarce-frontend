import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import './index.css'; // ✅ Ensure styles are imported
import Footer from './components/Footer';

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contect />} /> {/* ✅ Fixed spelling */}
        <Route path='/product/:productId' element={<Product />} /> {/* ✅ Dynamic param */}
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
