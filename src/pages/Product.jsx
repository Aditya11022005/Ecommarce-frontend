import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';


const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  // Add to cart handler with toast
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size!', { position: 'top-center', autoClose: 1800 });
      return;
    }
    addToCart(productData._id, selectedSize);
    toast.success('Added to cart!', { position: 'top-center', autoClose: 1200 });
  };

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [tab, setTab] = useState('description');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  // Rent price: use productData.rent if available, else fallback to 60% of price, else 0
  const rentPrice = productData && (productData.rent || (productData.price ? Math.round(productData.price * 0.6) : 0));

  useEffect(() => {
    const item = products.find(
      (item) => item.id === productId || item._id === productId
    );
    if (item) {
      setProductData(item);
      // Normalize images: prefer images array, else image array, else image string
      let allImages = [];
      if (Array.isArray(item.images) && item.images.length > 0) {
        allImages = item.images;
      } else if (Array.isArray(item.image) && item.image.length > 0) {
        allImages = item.image;
      } else if (typeof item.image === 'string' && item.image) {
        allImages = [item.image];
      }
      setSelectedImage(allImages[0] || '');
      // Set default color if available
      if (item.colors && item.colors.length > 0) {
        setSelectedColor(item.colors[0]);
      } else {
        setSelectedColor('');
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  return (
    <div className="px-4 sm:px-10 py-10">
      {/* Product Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-10">
        {/* Left: Thumbnails (vertical on desktop, horizontal on mobile) */}
        {(() => {
          let thumbs = [];
          if (Array.isArray(productData.images) && productData.images.length > 0) {
            thumbs = productData.images;
          } else if (Array.isArray(productData.image) && productData.image.length > 0) {
            thumbs = productData.image;
          } else if (typeof productData.image === 'string' && productData.image) {
            thumbs = [productData.image];
          }
          return thumbs.length > 0 ? (
            <div className="hidden md:flex flex-col gap-3 items-center mt-2">
              {thumbs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`focus:outline-none rounded-lg border-2 bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                    selectedImage === img
                      ? 'border-yellow-500 ring-2 ring-yellow-500 shadow-lg scale-110 animate-thumbSelect'
                      : 'border-gray-200 hover:border-yellow-500'
                  }`}
                  style={{ padding: 0 }}
                  aria-label={`Preview image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-16 h-16 object-contain rounded-lg transition-all duration-300"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="hidden md:block" />
          );
        })()}

        {/* Main Image */}
        <div className="flex flex-col items-center">
          {/* Image Zoom on Hover */}
          <div
            className="relative flex items-center justify-center bg-white border border-gray-200 rounded-xl shadow-lg mb-4 h-[400px] w-full group overflow-hidden"
            style={{ cursor: 'zoom-in' }}
          >
            <img
              src={selectedImage}
              alt="Main"
              className="max-h-[380px] max-w-full object-contain rounded-xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:shadow-2xl animate-fadeInImg zoomable-image"
              style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)' }}
              onMouseMove={e => {
                const img = e.currentTarget;
                const rect = img.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                img.style.transformOrigin = `${x}% ${y}%`;
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(2)';
                e.currentTarget.style.zIndex = 10;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.transformOrigin = '';
                e.currentTarget.style.zIndex = '';
              }}
            />
            {/* Fade overlay for transition */}
            <div className="absolute inset-0 pointer-events-none" />
          </div>
          {/* Thumbnails for mobile */}
          {(() => {
            let thumbs = [];
            if (Array.isArray(productData.images) && productData.images.length > 0) {
              thumbs = productData.images;
            } else if (Array.isArray(productData.image) && productData.image.length > 0) {
              thumbs = productData.image;
            } else if (typeof productData.image === 'string' && productData.image) {
              thumbs = [productData.image];
            }
            return thumbs.length > 0 ? (
              <div className="flex md:hidden gap-3 mt-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 w-full">
                {thumbs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`focus:outline-none rounded-lg border-2 bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                      selectedImage === img
                        ? 'border-yellow-500 ring-2 ring-yellow-500 shadow-lg scale-110 animate-thumbSelect'
                        : 'border-gray-200 hover:border-yellow-500'
                    }`}
                    style={{ padding: 0 }}
                    aria-label={`Preview image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      className="w-16 h-16 object-contain rounded-lg transition-all duration-300"
                    />
                  </button>
                ))}
              </div>
            ) : null;
          })()}
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{productData.name}</h1>
          <div className="flex items-center gap-4">
            <p className="text-xl font-semibold text-green-600">
              {currency}{productData.price}
            </p>
            <span className="text-base font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full border border-gray-300">
              Rent: {currency}{rentPrice}
            </span>
          </div>
          <div className="flex gap-1">
            {'★'.repeat(4)}
            {'☆'}
            <span className="ml-2 text-sm text-gray-600">(122 reviews)</span>
          </div>
          <p className="text-gray-600">{productData.description}</p>


          {/* Color Selector */}
          {(() => {
            // Demo fallback: if no colors, show a default set for demo
            let colors = productData.colors;
            if (!colors || colors.length === 0) {
              colors = ['#000000', '#FF0000', '#1976D2', '#43A047']; // fallback demo
            }
            return colors && colors.length > 0 ? (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Select Color</h3>
                <div className="flex gap-3">
                  {colors.map((color, idx) => (
                    <button
                      key={color + idx}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none ${
                        selectedColor === color
                          ? 'border-black ring-2 ring-black scale-110 shadow-lg'
                          : 'border-gray-300 hover:border-black'
                      }`}
                      style={{ background: color.match(/^#|rgb|hsl/) ? color : undefined }}
                      aria-label={`Select color ${color}`}
                      title={color}
                    >
                      {/* If color is not a hex/rgb/hsl, show text */}
                      {!color.match(/^#|rgb|hsl/) && (
                        <span className="text-xs font-semibold text-gray-700">{color}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Size Selector + Size Chart */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-medium">Select Size</h3>
              <button
                type="button"
                onClick={() => setShowSizeChart(true)}
                className="text-blue-600 underline text-xs hover:text-blue-800 transition-colors duration-200"
              >
                Size Chart
              </button>
            </div>
            <div className="flex gap-3">
              {(productData.sizes && productData.sizes.length > 0 ? productData.sizes : ['S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-1 rounded-lg font-semibold text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black hover:scale-105 ${
                    selectedSize === size
                      ? 'border-black bg-black text-white scale-110'
                      : 'border-gray-300 text-gray-700 bg-white'
                  }`}
                  style={{ minWidth: 48 }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Size Chart Modal */}
          {showSizeChart && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
              <div className="bg-white rounded-xl shadow-2xl p-6 w-[90vw] max-w-md relative animate-scaleIn">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold focus:outline-none"
                  onClick={() => setShowSizeChart(false)}
                  aria-label="Close size chart"
                >
                  &times;
                </button>
                <h2 className="text-lg font-bold mb-4 text-center">Size Chart</h2>
                <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 border-b">Size</th>
                      <th className="py-2 px-3 border-b">Chest (in)</th>
                      <th className="py-2 px-3 border-b">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-3 border-b">S</td>
                      <td className="py-2 px-3 border-b">36-38</td>
                      <td className="py-2 px-3 border-b">26</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border-b">M</td>
                      <td className="py-2 px-3 border-b">38-40</td>
                      <td className="py-2 px-3 border-b">27</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border-b">L</td>
                      <td className="py-2 px-3 border-b">40-42</td>
                      <td className="py-2 px-3 border-b">28</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border-b">XL</td>
                      <td className="py-2 px-3 border-b">42-44</td>
                      <td className="py-2 px-3 border-b">29</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border-b">XXL</td>
                      <td className="py-2 px-3 border-b">44-46</td>
                      <td className="py-2 px-3 border-b">30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}


          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-4">
              <button
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
              <a
                href={`https://wa.me/919322465522?text=Hi,%20I%20want%20to%20rent%20the%20dress:%20${encodeURIComponent(productData.name)}%20(${currency}${rentPrice})`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                style={{ textDecoration: 'none' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 5.385 4.365 9.75 9.75 9.75 1.7 0 3.3-.425 4.7-1.175l3.3.925a.75.75 0 00.925-.925l-.925-3.3A9.708 9.708 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.125 13.125c-.75 1.125-2.25 2.25-4.125 2.25s-3.375-1.125-4.125-2.25" />
                </svg>
                Rent Dress
              </a>
            </div>
            <ToastContainer />
          </div>

          {/* Info */}
          <p className="text-sm text-gray-500 mt-4">
            ✅ 100% Original product. <br />
            🚚 Cash on delivery available. <br />
            🔁 Easy return & exchange within 7 days.
          </p>
        </div>
      </div>

      {/* Tabs: Description/Reviews */}
      <div className="mt-10">
        <div className="flex gap-4 border-b mb-4">
          <button
            onClick={() => setTab('description')}
            className={`py-2 px-4 ${
              tab === 'description' ? 'border-b-2 border-black font-semibold' : ''
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setTab('reviews')}
            className={`py-2 px-4 ${
              tab === 'reviews' ? 'border-b-2 border-black font-semibold' : ''
            }`}
          >
            Reviews (122)
          </button>
        </div>
        {tab === 'description' && (
          <p className="text-gray-700 text-sm leading-relaxed">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace for businesses and consumers.
          </p>
        )}
        {tab === 'reviews' && (
          <div className="text-gray-700 text-sm">Customer reviews coming soon!</div>
        )}
      </div>

      {/* Related Products (Premium Card Style) */}
      <div className="mt-14">
        <h2 className="text-xl font-bold mb-6 tracking-tight text-gray-800">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {products.slice(0, 4).map((item) => {
            let relImg = '';
            if (Array.isArray(item.images) && item.images.length > 0) {
              relImg = item.images[0];
            } else if (Array.isArray(item.image) && item.image.length > 0) {
              relImg = item.image[0];
            } else if (typeof item.image === 'string' && item.image) {
              relImg = item.image;
            }
            return (
              <Link
                key={item.id || item._id}
                to={`/product/${item.id || item._id}`}
                className="relative group rounded-2xl bg-gradient-to-br from-gray-50/80 to-white/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center p-5 overflow-hidden min-h-[270px] hover:scale-105 hover:ring-2 hover:ring-blue-300"
                style={{ textDecoration: 'none' }}
              >
                <div className="w-full flex-1 flex items-center justify-center mb-3">
                  <img
                    src={relImg}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md rounded-xl bg-white"
                    alt={item.name}
                  />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1 text-center group-hover:text-blue-700 transition-colors duration-200 truncate w-full" title={item.name}>{item.name}</h3>
                <p className="text-lg font-bold text-green-600 mb-2">{currency}{item.price}</p>
                <button
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-lg transition-all duration-300 pointer-events-auto"
                  tabIndex={-1}
                >View</button>
                <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:bg-blue-50/40 transition-colors duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;

/* Animations (Tailwind CSS custom classes, add to your global CSS if not present)
.animate-fadeInImg { animation: fadeInImg 0.5s; }
.animate-thumbSelect { animation: thumbSelect 0.3s; }
.animate-fadeInModal { animation: fadeInModal 0.4s; }
.animate-scaleInModal { animation: scaleInModal 0.4s; }
@keyframes fadeInImg { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
@keyframes thumbSelect { 0% { transform: scale(1); } 60% { transform: scale(1.15); } 100% { transform: scale(1.1); } }
@keyframes fadeInModal { from { opacity: 0; } to { opacity: 1; } }
@keyframes scaleInModal { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
*/
