import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt, FaHeart, FaTimes, FaBars, FaStore, FaHome } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { getTotalItems } = useContext(CartContext);
  const { user, isAuthenticated, logout } = useProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '🏠 صفحه اصلی', path: '/', icon: <FaHome className="text-sm" /> },
    { name: '✨ محصولات', path: '/products', icon: <FaStore className="text-sm" /> },
    { name: '🛍️ سبد خرید', path: '/cart', icon: <FaShoppingCart className="text-sm" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-effect shadow-2xl py-2' 
          : 'bg-white/60 backdrop-blur-md shadow-lg py-4'
      }`}
    >
      {/* دکوراسیون پس‌زمینه */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-transparent to-purple-200/20 pointer-events-none" />
      
      {/* حلقه‌های تزئینی متحرک */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-pink-300/20 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-300/20 animate-pulse delay-700" />

      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center">
          
          {/* ===== لوگوی دخترانه ===== */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
            >
              <span className="text-white font-bold text-2xl animate-pulse">💖</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold gradient-text">
                Glow<span className="text-pink-500">Up</span>
              </span>
              <span className="text-[10px] text-gray-400 -mt-1">✨ beauty shop ✨</span>
            </div>
          </Link>

          {/* ===== منوی دسکتاپ (بسیار دخترونه) ===== */}
          <nav className="hidden md:flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-4 py-1 shadow-inner">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative group px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 font-medium ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-500'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                  
                  {/* افکت نقطه زیر منو */}
                  {!isActive(item.path) && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 group-hover:w-6" />
                  )}
                  
                  {/* افکت قلب برای منوی فعال */}
                  {isActive(item.path) && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-1 text-xs"
                    >
                      💕
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* ===== آیکون‌های سمت راست ===== */}
          <div className="flex items-center gap-3">
            
            {/* دکمه جستجو */}
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative p-3 hover:bg-pink-100 rounded-full transition-all duration-300 group"
            >
              <FaSearch className="text-gray-600 group-hover:text-pink-500 transition-colors text-lg" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
            </motion.button>

            {/* سبد خرید با افکت ویژه */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/cart" className="relative p-3 hover:bg-pink-100 rounded-full transition-all duration-300 group block">
                <FaShoppingCart className="text-gray-600 group-hover:text-pink-500 transition-colors text-lg" />
                {getTotalItems() > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md font-bold"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* پروفایل کاربر */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/profile" className="flex items-center gap-2 p-1.5 hover:bg-pink-100 rounded-full transition-all duration-300 group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-xs text-gray-500">خوش اومدی</p>
                      <p className="text-sm font-semibold text-gray-700 leading-tight">{user?.username}</p>
                    </div>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="p-2.5 hover:bg-red-100 rounded-full transition-all duration-300 text-red-400 hover:text-red-500"
                  title="خروج"
                >
                  <FaSignOutAlt />
                </motion.button>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link to="/profile" className="p-3 hover:bg-pink-100 rounded-full transition-all duration-300 group block">
                  <div className="relative">
                    <FaUser className="text-gray-600 group-hover:text-pink-500 transition-colors text-lg" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </Link>
              </motion.div>
            )}

            {/* دکمه منوی موبایل */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 hover:bg-pink-100 rounded-full transition-all duration-300"
            >
              {isMenuOpen ? <FaTimes className="text-pink-500 text-xl" /> : <FaBars className="text-gray-600 text-xl" />}
            </motion.button>
          </div>
        </div>

        {/* ===== منوی موبایل با انیمیشن ===== */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pt-4 border-t border-pink-100 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                          : 'text-gray-700 hover:bg-pink-50 hover:text-pink-500'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                      {isActive(item.path) && <span className="mr-auto text-sm">💕</span>}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* ===== نوار جستجو ===== */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-3 p-4 glass-effect rounded-2xl shadow-2xl z-50"
            >
              <div className="relative">
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400" />
                <input
                  type="text"
                  placeholder="🔍 جستجوی محصولات دلخواهت..."
                  className="w-full px-12 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white/80"
                  autoFocus
                />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                >
                  <FaTimes />
                </motion.button>
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="text-xs text-gray-500">محبوب‌ها:</span>
                {['رژ لب', 'کرم ضد آفتاب', 'ریمل', 'ماسک'].map(tag => (
                  <button key={tag} className="text-xs px-3 py-1 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* افکت قلب‌های شناور (تزئینی) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none h-2">
        <div className="absolute -top-1 left-1/4 text-pink-300 text-xs animate-float opacity-30">♥</div>
        <div className="absolute -top-1 left-2/4 text-purple-300 text-xs animate-float delay-300 opacity-30">♥</div>
        <div className="absolute -top-1 right-1/4 text-pink-300 text-xs animate-float delay-700 opacity-30">♥</div>
      </div>
    </motion.header>
  );
};

export default Header;