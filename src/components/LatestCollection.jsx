import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';
import { motion } from 'framer-motion';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Only show premium dresses (category: Women, subCategory in premium list)
      const premiumSubcats = [
        'Co-ord set',
        'Maxi & Midi Dress',
        'Gown',
        'Indo-Western',
        'Drape Saree',
        'Party Wear',
      ];
      const filtered = products.filter(
        p =>
          p.category === 'Women' &&
          p.subCategory &&
          premiumSubcats.some(
            sub => p.subCategory.toLowerCase() === sub.toLowerCase()
          )
      );
      // Sort by date descending (latest first)
      filtered.sort((a, b) => b.date - a.date);
      setLatestProduct(filtered.slice(0, 6));
    }
  }, [products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className='my-10'>
      <motion.div
        className='text-center py-8 text-3xl'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title text1="LATEST" text2="CATEGORY" />
        <motion.p
          className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          "Refresh your style with our handpicked latest arrivals. Premium looks, exclusive deals, and new trends—just for you."
        </motion.p>
      </motion.div>

      <motion.div
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {latestProduct.map((item, index) => (
          <motion.div
            key={item._id || index}
            variants={itemVariants}
            className="transition-transform duration-200 hover:scale-105 hover:ring-2 hover:ring-blue-400 hover:z-10"
          >
            <ProductItems
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              isCircular={true}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LatestCollection;
