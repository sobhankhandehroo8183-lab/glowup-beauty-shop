import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext'; // 🔹 اضافه شد
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { getTotalItems } = useContext(CartContext);
  const { user, isAuthenticated, logout } = useProfile(); // 🔹 اضافه شد

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md relative overflow-hidden">
      {/* background decoration (placeholder visual) */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex justify-between items-center">
          {/* لوگو */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:opacity-90 transition-opacity"
            >
              Glow<span className="text-pink-500">Up</span>
            </Link>
          </div>

          {/* منوی ناوبری دسکتاپ */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link
              to="/"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              صفحه اصلی
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              محصولات
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium"
            >
              سبد خرید
            </Link>
          </nav>

          {/* آیکون‌ها */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <FaSearch className="text-gray-600" />
            </button>

            {/* 🔹 تغییرات: نمایش وضعیت کاربر */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 space-x-reverse">
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 space-x-reverse text-gray-700 hover:text-pink-500 transition-colors"
                >
                  <FaUser className="text-gray-600" />
                  <span className="text-sm hidden md:inline">{user?.username}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-red-500 hover:text-red-600"
                  title="خروج"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <Link
                to="/profile"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="ورود / ثبت‌نام"
              >
                <FaUser className="text-gray-600" />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaShoppingCart className="text-gray-600" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* منوی موبایل */}
        <nav className="md:hidden flex justify-around mt-4 border-t border-gray-200 pt-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-pink-500 transition-colors text-sm"
          >
            صفحه اصلی
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-pink-500 transition-colors text-sm"
          >
            محصولات
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-pink-500 transition-colors text-sm"
          >
            سبد خرید
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;