import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import {
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
  FaHeart,
} from 'react-icons/fa';

const BottomNav = () => {
  const location = useLocation();
  const { getTotalItems } = useContext(CartContext);

  const navItems = [
    { path: '/', icon: <FaHome />, label: 'خانه' },
    { path: '/products', icon: <FaShoppingBag />, label: 'محصولات' },
    {
      path: '/cart',
      icon: <FaShoppingCart />,
      label: 'سبد خرید',
      badge: getTotalItems(),
    },
    { path: '#wishlist', icon: <FaHeart />, label: 'علاقه‌مندی' },
    { path: '#account', icon: <FaUser />, label: 'پروفایل' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Background with slight gradient for nicer UI */}
      <div className="bg-gradient-to-t from-white via-white to-pink-50 border-t border-gray-200 shadow-2xl">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            const ItemContent = (
              <>
                <div
                  className={`text-lg transition-colors duration-200 ${
                    isActive ? 'text-pink-500' : 'text-gray-500'
                  }`}
                >
                  {item.icon}
                </div>

                <span
                  className={`text-xs mt-1 transition-all duration-200 ${
                    isActive
                      ? 'text-pink-500 font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>

                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <span className="absolute bottom-0 w-8 h-1 bg-pink-500 rounded-full" />
                )}
              </>
            );

            return item.path.startsWith('#') ? (
              <button
                key={item.label}
                type="button"
                className="relative flex flex-col items-center justify-center w-full h-full focus:outline-none"
              >
                {ItemContent}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className="relative flex flex-col items-center justify-center w-full h-full"
              >
                {ItemContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
