import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate, Link } from 'react-router-dom';


const PlaceOrder = () => {
  const { products, cartItems, currency, delivery_fee, clearCart } = useContext(ShopContext);
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

  const subtotal = cartList.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + (cartList.length > 0 ? delivery_fee : 0);

  // Address form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    country: 'India',
    state: '',
    district: '',
    taluka: '',
    city: '',
    pincode: '',
    payment: 'COD',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'state') {
      setForm(f => ({ ...f, state: value, district: '', taluka: '', city: '', pincode: '' }));
    } else if (name === 'district') {
      setForm(f => ({ ...f, district: value, taluka: '', city: '', pincode: '' }));
    } else if (name === 'taluka') {
      setForm(f => ({ ...f, taluka: value, city: '', pincode: '' }));
    } else if (name === 'city') {
      // Set pincode based on city
      const cityObj = selectedTalukaObj && selectedTalukaObj.cities.find(c => c.name === value);
      setForm(f => ({ ...f, city: value, pincode: cityObj ? cityObj.pincode : '' }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Use GPS to autofill address (demo: fills city/state if possible)
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Use a free API for reverse geocoding (demo: OpenStreetMap Nominatim)
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          setForm(f => ({
            ...f,
            address: data.display_name || f.address,
            city: data.address && (data.address.city || data.address.town || data.address.village || f.city),
            state: data.address && (data.address.state || f.state),
            pincode: data.address && (data.address.postcode || f.pincode),
            country: data.address && (data.address.country === 'India' ? 'India' : 'Other'),
          }));
          setError('');
        } catch {
          setError('Could not fetch location.');
        }
      },
      () => setError('Location permission denied.'),
      { timeout: 8000 }
    );
  };

  const handlePlaceOrder = e => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode || !form.state) {
      setError('Please fill all address fields.');
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setError('Enter a valid 6-digit pincode.');
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    setSuccess(true);
    clearCart();
    setTimeout(() => {
      navigate('/order');
    }, 2200);
  };

  return (
    <div className="min-h-[70vh] w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-10 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center tracking-tight">Place Order</h1>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Address Form */}
          <form onSubmit={handlePlaceOrder} className="flex-1 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0M12 3v4m0 0a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4h1a4 4 0 014 4z" /></svg>
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name<span className="text-red-500">*</span></label>
                <input id="name" name="name" value={form.name} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white/90" placeholder="Enter your full name" autoComplete="name" required />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone<span className="text-red-500">*</span></label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white/90" placeholder="10-digit mobile number" maxLength={10} autoComplete="tel" required pattern="\d{10}" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="country" className="text-sm font-medium text-gray-700">Country<span className="text-red-500">*</span></label>
                <input id="country" name="country" value={form.country} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white/90" placeholder="Country" autoComplete="country" required />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="state" className="text-sm font-medium text-gray-700">State<span className="text-red-500">*</span></label>
                <input id="state" name="state" value={form.state} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white/90" placeholder="State" autoComplete="address-level1" required />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="district" className="text-sm font-medium text-gray-700">District<span className="text-red-500">*</span></label>
                <input id="district" name="district" value={form.district} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white/90" placeholder="District" autoComplete="address-level2" required />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="taluka" className="text-sm font-medium text-gray-700">Taluka<span className="text-red-500">*</span></label>
                <input id="taluka" name="taluka" value={form.taluka} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white/90" placeholder="Taluka" required />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="city" className="text-sm font-medium text-gray-700">City<span className="text-red-500">*</span></label>
                <input id="city" name="city" value={form.city} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white/90" placeholder="City" autoComplete="address-level3" required />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode<span className="text-red-500">*</span></label>
                <input id="pincode" name="pincode" value={form.pincode} onChange={handleChange} className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white/90" placeholder="6-digit pincode" maxLength={6} autoComplete="postal-code" required pattern="\d{6}" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 mb-2">
              <button type="button" onClick={handleUseLocation} className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                Use my location
              </button>
              <span className="text-xs text-gray-400">(auto-fill address, city, pincode)</span>
            </div>
            <textarea name="address" value={form.address} onChange={handleChange} className="border rounded-lg px-3 py-2 mt-2 w-full focus:ring-2 focus:ring-black outline-none" placeholder="Full Address*" rows={2} />
            <h2 className="text-lg font-bold mt-6 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
              Payment Method
            </h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition">
                <input type="radio" name="payment" value="COD" checked={form.payment==='COD'} onChange={handleChange} />
                <span className="flex items-center gap-1"><svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 7V5a4 4 0 018 0v2"/></svg> COD</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition">
                <input type="radio" name="payment" value="UPI" checked={form.payment==='UPI'} onChange={handleChange} />
                <span className="flex items-center gap-1"><img src="/src/assets/razorpay_logo.png" alt="UPI" className="w-5 h-5" /> UPI</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition">
                <input type="radio" name="payment" value="Card" checked={form.payment==='Card'} onChange={handleChange} />
                <span className="flex items-center gap-1"><svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M2 11h20"/></svg> Card</span>
              </label>
            </div>
            {error && <div className="text-red-600 text-sm mb-2 animate-fadeInImg">{error}</div>}
            {success && <div className="text-green-600 text-base font-semibold mb-2 animate-fadeInImg">Order placed successfully! 🎉</div>}
            <button type="submit" className="w-full mt-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-all font-semibold shadow">Place Order</button>
          </form>
          {/* Order Summary */}
          <div className="w-full max-w-xs mx-auto md:mx-0 md:sticky md:top-24 h-fit">
            <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 mb-4">
              <h2 className="text-lg font-bold mb-4 tracking-tight">Order Summary</h2>
              {cartList.length === 0 ? (
                <div className="text-gray-400 text-center py-8">No items in cart.</div>
              ) : (
                <div className="divide-y divide-gray-200 mb-3">
                  {cartList.map((item, idx) => (
                    <div key={item._id + item.size} className="flex items-center gap-3 py-3">
                      <img src={Array.isArray(item.images) ? item.images[0] : (Array.isArray(item.image) ? item.image[0] : item.image)} alt={item.name} className="w-12 h-12 object-contain rounded-lg border bg-gray-50" />
                      <div className="flex-1">
                        <div className="font-medium text-sm truncate" title={item.name}>{item.name}</div>
                        <div className="text-xs text-gray-500">Size: {item.size}</div>
                        {item.color && <div className="text-xs text-gray-500 flex items-center gap-1">Color: <span className="inline-block w-3 h-3 rounded-full border ml-1 align-middle" style={{background:item.color}}></span></div>}
                      </div>
                      <div className="font-semibold text-sm">{currency}{item.price} x {item.qty}</div>
                    </div>
                  ))}
                </div>
              )}
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
            </div>
            <Link to="/cart" className="block text-center text-sm text-blue-600 hover:underline">&larr; Back to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ...existing code...
export default PlaceOrder;
