import React, { createContext, useState, useEffect } from 'react';
import { useProfile } from './ProfileContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { profileCompletedOnce, isAuthenticated } = useProfile(); // 🔹 isAuthenticated اضافه شد

  const [cart, setCart] = useState(() => {
    const savedCart =
      sessionStorage.getItem('glowup-cart') ||
      localStorage.getItem('glowup-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('glowup-cart', JSON.stringify(cart));
    sessionStorage.setItem('glowup-cart', JSON.stringify(cart));
  }, [cart]);

  // 🔹 اضافه شده: تابع چک کردن کاربر قبل از هر عملیات سبد خرید
  const checkUserBeforeCartOperation = (navigate, actionType = 'addToCart', product = null) => {
    // اول چک کن کاربر لاگین کرده یا نه
    if (!isAuthenticated) {
      alert('لطفاً ابتدا وارد حساب کاربری خود شوید');
      if (navigate) {
        navigate('/profile', { 
          state: { 
            from: product ? `/product/${product.id}` : '/cart',
            action: actionType,
            quantity: 1
          } 
        });
      }
      return false;
    }
    
    // اگر لاگین کرده اما پروفایل کامل نیست
    if (!profileCompletedOnce) {
      alert('لطفاً پروفایل خود را تکمیل کنید');
      if (navigate) {
        navigate('/profile', { 
          state: { 
            from: product ? `/product/${product.id}` : '/cart',
            action: actionType,
            quantity: 1
          } 
        });
      }
      return false;
    }
    
    return true;
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('glowup-cart');
    localStorage.removeItem('glowup-cart');
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  const addToCartWithProfileCheck = (
    product,
    quantity = 1,
    navigate
  ) => {
    // 🔹 استفاده از تابع چک کاربر بهبود یافته
    if (!checkUserBeforeCartOperation(navigate, 'addToCart', product)) {
      return;
    }

    addToCart(product, quantity);
    alert('محصول به سبد خرید اضافه شد');
  };

  // 🔹 اضافه شده: تابع addToCart با چک کامل کاربر
  const addToCartWithFullCheck = (
    product,
    quantity = 1,
    navigate
  ) => {
    // همان تابع قبلی با نام جدید برای سازگاری
    return addToCartWithProfileCheck(product, quantity, navigate);
  };

  // 🔹 اضافه شده: تابع برای چک کردن دسترسی به سبد خرید
  const checkCartAccess = (navigate) => {
    return checkUserBeforeCartOperation(navigate, 'viewCart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addToCartWithProfileCheck,
        addToCartWithFullCheck, // 🔹 اضافه شده
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        checkCartAccess, // 🔹 اضافه شده
        checkUserBeforeCartOperation // 🔹 اضافه شده (برای استفاده داخلی)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};