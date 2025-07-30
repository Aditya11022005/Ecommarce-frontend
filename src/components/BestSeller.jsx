import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProducts = products.filter((item) => item.bestseller);
      setBestSeller(bestProducts.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-10 px-4">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLER" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "Discover our most-loved products—trusted by hundreds, chosen for you. Shop the best sellers and experience the difference."
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSeller.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No Best Seller Products Found</p>
        ) : (
          bestSeller.map((item) => (
            <div
              key={item._id}
              className="transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400 border border-transparent rounded-2xl bg-white"
              style={{ willChange: 'transform, box-shadow, border-color' }}
            >
              <ProductItems
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BestSeller;
