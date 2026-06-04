import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaStar, FaGem, FaSpinner, FaCheckCircle, FaUserPlus, FaSignInAlt, FaMagic, FaRegStar } from 'react-icons/fa';

const Profile = () => {
  const { profile, updateProfile, isProfileComplete, user, isAuthenticated, login, register, logout } = useProfile();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [address, setAddress] = useState(profile.address || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [errors, setErrors] = useState({});
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authErrors, setAuthErrors] = useState({});
  const [authMessage, setAuthMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [registerStep, setRegisterStep] = useState(1);
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    address: '',
    phone: ''
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectData, setRedirectData] = useState(null);

  useEffect(() => {
    if (profile.name) setName(profile.name);
    if (profile.email) setEmail(profile.email);
    if (profile.address) setAddress(profile.address);
    if (profile.phone) setPhone(profile.phone);
  }, [profile]);

  useEffect(() => {
    if (shouldRedirect && redirectData && isAuthenticated && isProfileComplete) {
      const { from, action, quantity } = redirectData;
      
      import('../data/products').then(({ default: products }) => {
        const productId = parseInt(from.split('/product/')[1]);
        const product = products.find(p => p.id === productId);
        
        if (product) {
          if (action === 'addToCart' || action === 'buyNow') {
            addToCart(product, quantity || 1);
            if (action === 'addToCart') {
              alert(`${product.name} به سبد خرید اضافه شد`);
              navigate(from, { replace: true });
            }
            if (action === 'buyNow') {
              navigate('/cart', { replace: true });
            }
          }
        } else {
          navigate(from || '/', { replace: true });
        }
      });
      
      setShouldRedirect(false);
      setRedirectData(null);
    }
  }, [shouldRedirect, redirectData, isAuthenticated, isProfileComplete, navigate, addToCart]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'نام الزامی است';
    if (!email) newErrors.email = 'ایمیل الزامی است';
    if (!address) newErrors.address = 'آدرس الزامی است';
    if (!phone) newErrors.phone = 'شماره تماس الزامی است';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterStep1 = () => {
    const newErrors = {};
    if (!registerData.username) newErrors.username = 'نام کاربری الزامی است';
    if (!registerData.password) newErrors.password = 'رمز عبور الزامی است';
    if (registerData.password.length < 4) newErrors.password = 'رمز عبور باید حداقل ۴ کاراکتر باشد';
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور مطابقت ندارد';
    }
    setAuthErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterStep2 = () => {
    const newErrors = {};
    if (!registerData.name) newErrors.name = 'نام الزامی است';
    if (!registerData.email) newErrors.email = 'ایمیل الزامی است';
    if (!registerData.address) newErrors.address = 'آدرس الزامی است';
    if (!registerData.phone) newErrors.phone = 'شماره تماس الزامی است';
    setAuthErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setAuthErrors({ general: 'نام کاربری و رمز عبور الزامی است' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const result = login(username, password);
      if (result.success) {
        setAuthMessage('✨ با موفقیت وارد شدید! ✨');
        if (location.state) {
          setRedirectData(location.state);
          setShouldRedirect(true);
        } else {
          setTimeout(() => navigate('/', { replace: true }), 1500);
        }
      } else {
        setAuthMessage(result.message);
        setIsLoading(false);
      }
    }, 800);
  };

  const handleRegisterStep1 = (e) => {
    e.preventDefault();
    if (!validateRegisterStep1()) return;
    setRegisterStep(2);
  };

  const handleRegisterStep2 = (e) => {
    e.preventDefault();
    if (!validateRegisterStep2()) return;

    setIsLoading(true);
    setTimeout(() => {
      const userProfile = {
        name: registerData.name,
        email: registerData.email,
        address: registerData.address,
        phone: registerData.phone
      };

      const result = register(
        registerData.username, 
        registerData.password, 
        registerData.email, 
        userProfile
      );

      if (result.success) {
        setAuthMessage('🎉 ثبت‌نام با موفقیت انجام شد! 🎉');
        updateProfile(userProfile);
        setTimeout(() => {
          if (location.state) {
            setRedirectData(location.state);
            setShouldRedirect(true);
          } else {
            navigate('/', { replace: true });
          }
        }, 1500);
      } else {
        setAuthMessage(result.message);
        setIsLoading(false);
      }
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (updateProfile) {
      updateProfile({ name, email, address, phone });
    }

    if (location.state && location.state.from) {
      const { from, action, quantity } = location.state;
      setRedirectData({ from, action, quantity });
      setShouldRedirect(true);
      return;
    }

    alert('پروفایل شما با موفقیت ذخیره شد');
  };

  // صفحه لاگین/ثبت‌نام با پس‌زمینه خیلی خاص
  if (!isAuthenticated) {
    if (!isLoginMode && registerStep === 2) {
      return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 animate-gradient" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-400 rounded-full filter blur-3xl opacity-10" />
          
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/20 text-2xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              {['♥', '♡', '💕', '💖', '✨'][Math.floor(Math.random() * 5)]}
            </div>
          ))}

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.3 }}
            className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40 relative z-10"
          >
            <div className="text-center mb-8">
              <motion.div 
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg mb-4 ring-4 ring-white/50"
              >
                <FaMagic className="text-white text-3xl animate-pulse" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">تکمیل پروفایل</h2>
              <p className="text-gray-500 text-sm mt-1">مرحله ۲ از ۲ - اطلاعات شخصی خود را وارد کن</p>
              <div className="mt-4 bg-pink-100 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                />
              </div>
            </div>

            <form onSubmit={handleRegisterStep2}>
              <div className="space-y-4">
                <div className="relative group">
                  <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    placeholder="نام کامل"
                    className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
                  />
                  {authErrors.name && <p className="text-red-500 text-xs mt-1">{authErrors.name}</p>}
                </div>

                <div className="relative group">
                  <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    placeholder="ایمیل"
                    className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
                  />
                  {authErrors.email && <p className="text-red-500 text-xs mt-1">{authErrors.email}</p>}
                </div>

                <div className="relative group">
                  <FaMapMarkerAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="text"
                    value={registerData.address}
                    onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                    placeholder="آدرس"
                    className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
                  />
                  {authErrors.address && <p className="text-red-500 text-xs mt-1">{authErrors.address}</p>}
                </div>

                <div className="relative group">
                  <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    placeholder="شماره تماس"
                    className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
                  />
                  {authErrors.phone && <p className="text-red-500 text-xs mt-1">{authErrors.phone}</p>}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setRegisterStep(1)}
                  className="flex-1 py-3 rounded-xl border-2 border-pink-300 text-pink-500 font-semibold hover:bg-pink-50 transition-all"
                >
                  ← بازگشت
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : 'تکمیل ثبت‌نام ✨'}
                </motion.button>
              </div>
            </form>

            {authMessage && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 text-center text-sm flex items-center justify-center gap-2 border border-green-200"
              >
                <FaCheckCircle />
                {authMessage}
              </motion.div>
            )}
          </motion.div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-pink-800 to-rose-900 animate-gradient" />
        
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
        
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-400 rounded-full filter blur-3xl opacity-20" />
        
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/30 text-sm animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            ✦
          </div>
        ))}

        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.8, bounce: 0.3 }}
          className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40 relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg mb-4 ring-4 ring-white/50"
            >
              {isLoginMode ? (
                <FaSignInAlt className="text-white text-3xl" />
              ) : (
                <FaUserPlus className="text-white text-3xl" />
              )}
            </motion.div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {isLoginMode ? 'خوش اومدی!' : 'بیا عضو شو!'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {isLoginMode ? 'وارد حسابت بشو' : 'یه حساب ناز برات بسازیم'}
            </p>
          </div>

          <form onSubmit={isLoginMode ? handleLogin : handleRegisterStep1}>
            <div className="space-y-4">
              <div className="relative group">
                <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  value={isLoginMode ? username : registerData.username}
                  onChange={(e) => isLoginMode ? 
                    setUsername(e.target.value) : 
                    setRegisterData({...registerData, username: e.target.value})
                  }
                  placeholder="نام کاربری"
                  className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
                />
              </div>

              <div className="relative group">
                <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="password"
                  value={isLoginMode ? password : registerData.password}
                  onChange={(e) => isLoginMode ? 
                    setPassword(e.target.value) : 
                    setRegisterData({...registerData, password: e.target.value})
                  }
                  placeholder="رمز عبور"
                  className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
                />
              </div>

              {!isLoginMode && (
                <div className="relative group">
                  <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    placeholder="تکرار رمز عبور"
                    className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
                  />
                  {authErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{authErrors.confirmPassword}</p>}
                </div>
              )}
            </div>

            {authErrors.general && (
              <p className="text-red-500 text-sm mt-3 text-center">{authErrors.general}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : (isLoginMode ? 'ورود 💖' : 'ادامه ثبت‌نام 🌸')}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setRegisterStep(1);
                setAuthMessage('');
              }}
              className="text-pink-500 hover:text-purple-600 text-sm font-medium transition-colors"
            >
              {isLoginMode ? 'حساب نداری؟ بیا بسازیمش 💕' : 'قبلاً عضو شدی؟ وارد شو 💖'}
            </button>
          </div>

          {authMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 text-center text-sm flex items-center justify-center gap-2 border border-green-200"
            >
              <FaCheckCircle />
              {authMessage}
            </motion.div>
          )}

          {isLoginMode && (
            <div className="mt-6 pt-4 border-t border-pink-100 text-center">
              <p className="text-xs text-gray-400">✨ با ما زیباتر شو ✨</p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // صفحه پروفایل بعد از لاگین
  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #ec4899 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40 relative z-10"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">پروفایل تو 💕</h2>
            <p className="text-gray-500 text-sm">خوش اومدی، {user?.username} جان!</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="text-red-400 hover:text-red-500 text-sm font-medium transition-colors"
          >
            خروج 🚪
          </motion.button>
        </div>

        {!isProfileComplete && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200">
            <p className="text-yellow-700 text-sm flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              لطفاً پروفایل خود را تکمیل کن (فقط یک بار)
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام"
                className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="relative group">
              <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل"
                className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="relative group">
              <FaMapMarkerAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="آدرس"
                className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="relative group">
              <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="شماره تماس"
                className="w-full px-10 py-3 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/80"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:shadow-xl transition-all"
          >
            ذخیره پروفایل 💾
          </motion.button>
        </form>

        {isProfileComplete && (
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 text-sm">
              <FaCheckCircle /> پروفایل کامل شده
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;