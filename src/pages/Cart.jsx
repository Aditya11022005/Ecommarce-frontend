import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';


const Cart = () => {
  const { products, cartItems, removeFromCart, addToCart, currency, delivery_fee, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  // Flatten cart items for rendering
  const cartList = [];
  Object.entries(cartItems).forEach(([itemId, sizes]) => {
    Object.entries(sizes).forEach(([size, qty]) => {
      const product = products.find(p => p._id === itemId || p.id === itemId);
      if (product) {
        cartList.push({ ...product, size, qty });
      }
    });
  });

  // Calculate subtotal
  const subtotal = cartList.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + (cartList.length > 0 ? delivery_fee : 0);

  return (
    <div className="min-h-[60vh] w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-10 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center tracking-tight">Your Cart</h1>
        {cartList.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🛒</div>
            <div className="mb-4 text-lg">Your cart is empty.</div>
            <Link to="/collection" className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">Continue Shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="backdrop-blur-md bg-white/70 border border-gray-200 rounded-2xl shadow-xl p-4 divide-y divide-gray-200">
                {cartList.map((item, idx) => (
                  <div key={item._id + item.size} className="flex flex-col sm:flex-row items-center gap-4 py-5 group">
                    <img src={Array.isArray(item.images) ? item.images[0] : (Array.isArray(item.image) ? item.image[0] : item.image)} alt={item.name} className="w-24 h-24 object-contain rounded-xl border bg-gray-50 shadow-sm" />
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                        <div className="max-w-xs">
                          <div className="font-semibold text-lg mb-1 truncate" title={item.name}>{item.name}</div>
                          <div className="text-sm text-gray-500 mb-1">Size: <span className="font-medium text-gray-800">{item.size}</span></div>
                          {item.color && <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">Color: <span className="inline-block w-4 h-4 rounded-full border ml-1 align-middle" style={{background:item.color}}></span></div>}
                          <div className="text-green-700 font-bold text-base">{currency}{item.price}</div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <button onClick={() => removeFromCart(item._id, item.size)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 active:scale-95 text-xl font-bold flex items-center justify-center shadow transition-all">-</button>
                          <span className="px-2 text-lg font-semibold select-none">{item.qty}</span>
                          <button onClick={() => addToCart(item._id, item.size)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 active:scale-95 text-xl font-bold flex items-center justify-center shadow transition-all">+</button>
                          <button onClick={() => removeFromCart(item._id, item.size)} className="ml-3 text-gray-400 hover:text-red-600 text-xl transition-colors" title="Remove"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={clearCart} className="mt-4 text-sm text-gray-500 hover:text-red-600 underline">Clear Cart</button>
            </div>
            {/* Summary */}
            <div className="w-full max-w-xs mx-auto lg:mx-0 lg:sticky lg:top-24 h-fit">
              <div className="backdrop-blur-md bg-white/80 border border-gray-200 rounded-2xl shadow-xl p-6 mb-4">
                <h2 className="text-lg font-bold mb-4 tracking-tight">Order Summary</h2>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Subtotal</span>
                  <span>{currency}{subtotal}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Delivery Fee</span>
                  <span>{currency}{cartList.length > 0 ? delivery_fee : 0}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>{currency}{total}</span>
                </div>
                <button onClick={() => navigate('/place-order')} className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-all font-semibold shadow">Checkout</button>
              </div>
              <Link to="/collection" className="block text-center text-sm text-blue-600 hover:underline">&larr; Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
