
import React, { useContext, useRef, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { Search, SetSearch, Showsearch, SetShowsearch } = useContext(ShopContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (Showsearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [Showsearch]);

  // Optional: handle Enter key for search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // You can trigger a search action here if needed
      // For now, just blur the input
      e.target.blur();
    }
  };

  return Showsearch ? (
    <div className='border-t border-b bg-black text-center'>
      <div className="inline-flex items-center justify-center border border-gray-700 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-black shadow-md">
        <input
          ref={inputRef}
          value={Search}
          onChange={(e) => SetSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className='flex-1 outline-none bg-inherit text-sm px-2 py-1 text-white placeholder-gray-400'
          type="text"
          placeholder='Search for products, brands...'
          aria-label="Search"
        />
        <button
          type="button"
          className="ml-2 focus:outline-none"
          aria-label="Search"
          tabIndex={0}
        >
          <img className='w-4 filter invert' src={assets.search_icon} alt="Search" />
        </button>
      </div>
      <img
        onClick={() => SetShowsearch(false)}
        className='inline w-3 cursor-pointer ml-2 align-middle filter invert'
        src={assets.cross_icon}
        alt="Close search"
        tabIndex={0}
        role="button"
        aria-label="Close search bar"
      />
    </div>
  ) : null;
}

export default SearchBar