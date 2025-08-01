import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevent');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Toggle Category
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // Toggle Subcategory
  const toggleSubcategory = (e) => {
    const value = e.target.value;
    setSubcategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // Sort Handler
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter + Sort Products
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {

      // Only show premium dresses by default (Women, premium subcategories)
      const premiumSubcats = [
        'Co-ord set',
        'Maxi & Midi Dress',
        'Gown',
        'Indo-Western',
        'Drape Saree',
        'Party Wear',
      ];
      let filtered = products.filter(
        p =>
          p.category === 'Women' &&
          p.subCategory &&
          premiumSubcats.some(
            sub => p.subCategory.toLowerCase() === sub.toLowerCase()
          )
      );

      // If category filter is applied, filter further
      if (category.length > 0) {
        filtered = filtered.filter(product => category.includes(product.category));
      }

      // If subcategory filter is applied, filter further (case-insensitive, partial match)
      if (subcategory.length > 0) {
        filtered = filtered.filter(product => {
          if (!product.subCategory) return false;
          const prodSub = String(product.subCategory).toLowerCase();
          return subcategory.some(sel => prodSub.includes(sel.toLowerCase()));
        });
      }

      // Price Range Filter
      filtered = filtered.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Sort Logic
      if (sortOption === 'low-high') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'high-low') {
        filtered.sort((a, b) => b.price - a.price);
      }

      setFilterProducts(filtered);
      setLoading(false);
    }, 400); // 400ms for smoothness
    return () => clearTimeout(timer);
  }, [products, category, subcategory, sortOption, priceRange]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* FILTER SECTION */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilters ? 'rotate-90' : ''}`}
          />
        </p>

        {/* CATEGORY FILTER */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label><input type="checkbox" className="w-3" value="Women" onChange={toggleCategory} /> Women</label>
          </div>
        </div>

        {/* SUBCATEGORY FILTER */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label><input type="checkbox" className="w-3" value="Co-ord set" onChange={toggleSubcategory} /> Co-ord set</label>
            <label><input type="checkbox" className="w-3" value="Maxi & Midi Dress" onChange={toggleSubcategory} /> Maxi & Midi Dress</label>
            <label><input type="checkbox" className="w-3" value="Gown" onChange={toggleSubcategory} /> Gown</label>
            <label><input type="checkbox" className="w-3" value="Indo-Western" onChange={toggleSubcategory} /> Indo-Western</label>
            <label><input type="checkbox" className="w-3" value="Drape Saree" onChange={toggleSubcategory} /> Drape Saree</label>
            <label><input type="checkbox" className="w-3" value="Party Wear" onChange={toggleSubcategory} /> Party Wear</label>
          </div>
        </div>

        {/* PRICE RANGE FILTER */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label>Min: ₹{priceRange[0]}</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            />

            <label>Max: ₹{priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
          </div>
        </div>
      </div>

      {/* PRODUCT DISPLAY */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTION" />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="relevent">SORT BY - Relevent</option>
            <option value="low-high">SORT BY - Low to High</option>
            <option value="high-low">SORT BY - High to Low</option>
          </select>
        </div>

        <div className="min-h-[300px] flex items-center justify-center">
          {loading ? (
            <div className="w-full flex justify-center items-center py-16">
              <span className="inline-block w-10 h-10 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 w-full">
              {filterProducts.map((item, index) => (
                <div
                  key={index}
                  className="transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:z-10"
                  style={{ willChange: 'transform, box-shadow' }}
                >
                  <ProductItems
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
