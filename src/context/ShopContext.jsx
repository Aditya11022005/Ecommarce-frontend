import React, { createContext, useState } from "react";
import { products } from "../assets/assets"; 

const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 10;

  const [cartItems, setCartItems] = useState({});


  const addToCart = (itemId, size) => {
    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  // Remove one item of a given size from cart
  const removeFromCart = (itemId, size) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] -= 1;
      if (cartData[itemId][size] <= 0) {
        delete cartData[itemId][size];
      }
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
    }
  };

  // Get total count of items in cart
  const getCartCount = () => {
    let count = 0;
    Object.values(cartItems).forEach(sizes => {
      Object.values(sizes).forEach(qty => {
        count += qty;
      });
    });
    return count;
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems({});
  };

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
export { ShopContext };
