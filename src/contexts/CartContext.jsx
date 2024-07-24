import React, { createContext, useEffect, useState } from 'react';


export const CartContext = createContext()

const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce((accumilator, currentItem) => {
        return accumilator + currentItem.buyPrice;
      }, 0);
      setTotal(total);
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      setItemAmount(cart.length);
    }
  }, [cart]);

  const addToCart = (product) => {
    const { id, ...other } = product;
    const cartItem = cart.find(item => {
      return item.id === id;
    });
    if (cartItem) {
      return;
    }
    else {
      localStorage.setItem('cart', JSON.stringify([...cart, product]));
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (id,) => {
    const newCart = cart.filter(item => {
      return item.id !== id ;
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    
  };

  return <CartContext.Provider value={{
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    itemAmount,
    total,
  }}>
    {children}
  </CartContext.Provider>;
};

export default CartProvider;
