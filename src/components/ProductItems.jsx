import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItems = ({ id, name, image, price, isCircular = false }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden text-center'>
        <img
          src={image[0]}
          alt={name}
          className={`transition-transform duration-300 hover:scale-110 mx-auto
            ${isCircular ? 'rounded-full w-32 h-32 object-cover shadow-lg' : ''}
          `}
        />
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>
          {currency} {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItems;
