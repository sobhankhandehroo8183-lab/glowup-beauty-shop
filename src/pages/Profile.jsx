import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // 🔹 Link اضافه شد
import { useProfile } from '../context/ProfileContext';
import { CartContext } from '../context/CartContext';

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
  
  // 🔹 اضافه شده: state برای لاگین/ثبت‌نام
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authErrors, setAuthErrors] = useState({});
  const [authMessage, setAuthMessage] = useState('');

  // 🔹 اضافه شده: حالت ثبت‌نام مرحله‌ای
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

  // 🔹 اضافه شده: state برای کنترل ری‌درایرکت
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectData, setRedirectData] = useState(null);

  useEffect(() => {
    if (profile.name) setName(profile.name);
    if (profile.email) setEmail(profile.email);
    if (profile.address) setAddress(profile.address);
    if (profile.phone) setPhone(profile.phone);
  }, [profile]);

  // 🔹 اضافه شده: useEffect برای مدیریت ری‌درایرکت
  useEffect(() => {
    // اگر کاربر لاگین کرده و پروفایل کامل است و باید ری‌درایرکت شود
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
              // 🔹 تغییر: مستقیم به صفحه محصول برو، نه همین صفحه
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
      
      // ری‌ست کردن state
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

  // 🔹 اضافه شده: اعتبارسنجی Auth
  const validateAuth = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'نام کاربری الزامی است';
    if (!password) newErrors.password = 'رمز عبور الزامی است';
    if (!isLoginMode) {
      if (!email) newErrors.email = 'ایمیل الزامی است';
      if (password !== confirmPassword) newErrors.confirmPassword = 'رمز عبور مطابقت ندارد';
    }
    setAuthErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 اضافه شده: اعتبارسنجی ثبت‌نام مرحله ۱
  const validateRegisterStep1 = () => {
    const newErrors = {};
    if (!registerData.username) newErrors.username = 'نام کاربری الزامی است';
    if (!registerData.password) newErrors.password = 'رمز عبور الزامی است';
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور مطابقت ندارد';
    }
    setAuthErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 اضافه شده: اعتبارسنجی ثبت‌نام مرحله ۲
  const validateRegisterStep2 = () => {
    const newErrors = {};
    if (!registerData.name) newErrors.name = 'نام الزامی است';
    if (!registerData.email) newErrors.email = 'ایمیل الزامی است';
    if (!registerData.address) newErrors.address = 'آدرس الزامی است';
    if (!registerData.phone) newErrors.phone = 'شماره تماس الزامی است';
    setAuthErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!validateAuth()) return;

    if (isLoginMode) {
      const result = login(username, password);
      if (result.success) {
        setAuthMessage('با موفقیت وارد شدید!');
        
        // 🔹 تغییر: ذخیره داده‌های ری‌درایرکت
        if (location.state) {
          setRedirectData(location.state);
          setShouldRedirect(true);
        } else {
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1000);
        }
      } else {
        setAuthMessage(result.message);
      }
    } else {
      // ثبت‌نام قدیمی (برای سازگاری)
      const result = register(username, password, email);
      if (result.success) {
        setAuthMessage('ثبت‌نام موفقیت‌آمیز بود!');
        setIsLoginMode(true);
        // 🔹 تغییر: برای ثبت‌نام قدیمی هم ری‌درایرکت کن
        if (location.state) {
          setRedirectData(location.state);
          setShouldRedirect(true);
        }
      } else {
        setAuthMessage(result.message);
      }
    }
  };

  // 🔹 اضافه شده: ثبت‌نام مرحله‌ای
  const handleRegisterStep1 = (e) => {
    e.preventDefault();
    if (!validateRegisterStep1()) return;
    setRegisterStep(2);
  };

  const handleRegisterStep2 = (e) => {
    e.preventDefault();
    if (!validateRegisterStep2()) return;

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
      setAuthMessage('ثبت‌نام و تکمیل پروفایل موفقیت‌آمیز بود!');
      // اطلاعات پروفایل رو هم ذخیره کن
      updateProfile(userProfile);
      
      // 🔹 تغییر: برای ثبت‌نام مرحله‌ای هم ری‌درایرکت کن
      if (location.state) {
        setRedirectData(location.state);
        setShouldRedirect(true);
      } else {
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      }
    } else {
      setAuthMessage(result.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (updateProfile) {
      updateProfile({ name, email, address, phone });
    } else {
      console.error('updateProfile موجود نیست!');
    }

    // 🔹 تغییر: استفاده از state جدید برای ری‌درایرکت
    if (location.state && location.state.from) {
      const { from, action, quantity } = location.state;
      setRedirectData({ from, action, quantity });
      setShouldRedirect(true);
      return;
    }

    alert('پروفایل شما با موفقیت ذخیره شد');
  };

  // 🔹 اگر کاربر لاگین نکرده، فرم Auth نمایش داده شود
  if (!isAuthenticated) {
    // 🔹 حالت ثبت‌نام مرحله‌ای
    if (!isLoginMode && registerStep === 2) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                تکمیل اطلاعات پروفایل
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                مرحله ۲ از ۲ - لطفاً اطلاعات شخصی خود را وارد کنید
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full w-2/2"></div>
                </div>
              </div>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleRegisterStep2}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام کامل</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="نام کامل"
                  />
                  {authErrors.name && <p className="text-red-500 text-xs mt-1">{authErrors.name}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="ایمیل"
                  />
                  {authErrors.email && <p className="text-red-500 text-xs mt-1">{authErrors.email}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={registerData.address}
                    onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="آدرس"
                  />
                  {authErrors.address && <p className="text-red-500 text-xs mt-1">{authErrors.address}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="شماره تماس"
                  />
                  {authErrors.phone && <p className="text-red-500 text-xs mt-1">{authErrors.phone}</p>}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setRegisterStep(1)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← بازگشت
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  تکمیل ثبت‌نام
                </button>
              </div>
            </form>

            {authMessage && (
              <div className={`text-center text-sm ${authMessage.includes('موفق') ? 'text-green-600' : 'text-red-600'}`}>
                {authMessage}
              </div>
            )}
          </div>
        </div>
      );
    }

    // 🔹 حالت لاگین یا مرحله اول ثبت‌نام
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {isLoginMode ? 'ورود به حساب کاربری' : 'ثبت‌نام'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isLoginMode ? 'لطفاً وارد حساب کاربری خود شوید' : 'مرحله ۱ از ۲ - ایجاد حساب کاربری'}
            </p>
            {!isLoginMode && (
              <div className="mt-4 flex justify-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
            )}
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={isLoginMode ? handleAuthSubmit : handleRegisterStep1}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">نام کاربری</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={isLoginMode ? username : registerData.username}
                  onChange={(e) => isLoginMode ? 
                    setUsername(e.target.value) : 
                    setRegisterData({...registerData, username: e.target.value})
                  }
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                  placeholder="نام کاربری"
                />
                {authErrors.username && <p className="text-red-500 text-xs mt-1">{authErrors.username}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={isLoginMode ? password : registerData.password}
                  onChange={(e) => isLoginMode ? 
                    setPassword(e.target.value) : 
                    setRegisterData({...registerData, password: e.target.value})
                  }
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                  placeholder="رمز عبور"
                />
                {authErrors.password && <p className="text-red-500 text-xs mt-1">{authErrors.password}</p>}
              </div>
              
              {!isLoginMode && (
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                    placeholder="تکرار رمز عبور"
                  />
                  {authErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{authErrors.confirmPassword}</p>}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setRegisterStep(1);
                  setRegisterData({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    name: '',
                    address: '',
                    phone: ''
                  });
                }}
                className="text-sm text-pink-500 hover:text-pink-600"
              >
                {isLoginMode ? 'حساب کاربری ندارید؟ ثبت‌نام کنید' : 'قبلاً ثبت‌نام کرده‌اید؟ وارد شوید'}
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                {isLoginMode ? 'ورود' : 'ادامه ثبت‌نام'}
              </button>
            </div>
          </form>

          {authMessage && (
            <div className={`text-center text-sm ${authMessage.includes('موفق') ? 'text-green-600' : 'text-red-600'}`}>
              {authMessage}
            </div>
          )}

          {isLoginMode && (
            <div className="text-center text-sm text-gray-500">
              <p>برای تست: ابتدا ثبت‌نام کنید</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 🔹 اگر کاربر لاگین کرده، فرم پروفایل نمایش داده شود
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              پروفایل شما
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              خوش آمدید، {user?.username}
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:text-red-600"
          >
            خروج
          </button>
        </div>
        
        {!isProfileComplete && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-700 text-sm">
              ⚠️ لطفاً اطلاعات پروفایل خود را تکمیل کنید (فقط یک بار)
            </p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="نام"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="ایمیل"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="آدرس"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="شماره تماس"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              ذخیره پروفایل
            </button>
          </div>
        </form>
        
        {isProfileComplete && (
          <div className="text-center text-sm text-green-600">
            ✅ پروفایل شما تکمیل شده است
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;