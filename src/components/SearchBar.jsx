
import React, { useContext, useRef, useEffect, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, Showsearch, SetShowsearch, products } = useContext(ShopContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (Showsearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [Showsearch]);

  // Filter products by search query (case-insensitive)
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, products]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return Showsearch ? (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-full sm:w-2/3 md:w-1/2 lg:w-2/5 mx-auto mt-10 mb-6">
        <div className="flex items-center w-full rounded-2xl bg-white border border-gray-200 shadow-xl px-6 py-4">
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-lg sm:text-xl px-2 py-2 text-gray-900 placeholder-gray-400 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            type="text"
            placeholder="Search for products, brands..."
            aria-label="Search"
            autoFocus
          />
          <button
            type="button"
            className="ml-3 p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Search"
            tabIndex={0}
          >
            <img className="w-5 h-5 filter invert" src={assets.search_icon} alt="Search" />
          </button>
        </div>
        {SetShowsearch && (
          <button
            onClick={() => SetShowsearch(false)}
            className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-gray-200 rounded-full p-2 shadow-lg transition-all focus:outline-none"
            tabIndex={0}
            aria-label="Close search bar"
          >
            <img className="w-4 h-4 filter invert" src={assets.cross_icon} alt="Close search" />
          </button>
        )}
      </div>
      {/* Search Results */}
      {searchQuery.trim() && (
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg max-h-80 overflow-y-auto p-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-3 border-b last:border-b-0 hover:bg-gray-100 rounded-xl transition cursor-pointer">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl border" />
                )}
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 text-base">{product.name}</div>
                  {product.brand && <div className="text-xs text-gray-500">{product.brand}</div>}
                  {product.price && <div className="text-xs text-gray-700 font-bold mt-1">₹{product.price}</div>}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">No products found.</div>
          )}
        </div>
      )}
      {/* No extra style needed for white background */}
    </div>
  ) : null;
}

export default SearchBar