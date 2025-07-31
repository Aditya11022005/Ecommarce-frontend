import React, { createContext, useState } from "react";
import { products } from "../assets/assets"; 

const ShopContext = createContext();


const ShopContextProvider = (props) => {
  // --- App-wide constants ---
  const currency = '₹';
  const delivery_fee = 10;

  // --- Cart State ---
  const [cartItems, setCartItems] = useState({});

  // --- Search State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [Showsearch, SetShowsearch] = useState(false);



  // Add item to cart (with size)
  const addToCart = (itemId, size) => {
    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);
  };


  // Remove one item of a given size from cart
  const removeFromCart = (itemId, size) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] -= 1;
      if (cartData[itemId][size] <= 0) delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
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
  const clearCart = () => setCartItems({});


  // --- Context value ---
  const value = {
    addToCart,
    cartItems,
    clearCart,
    currency,
    delivery_fee,
    getCartCount,
    products,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    Showsearch,
    SetShowsearch,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
export { ShopContext };
