import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaHeart, FaGift, FaTruck, FaShieldAlt, FaHeadset, FaCreditCard, FaStar } from 'react-icons/fa';
import suggested1 from '../assets/images/download (1).jpeg';
import suggested2 from '../assets/images/80669-00.jpg';
import suggested3 from '../assets/images/download.jpeg';
import suggested4 from '../assets/images/0007531_-.jpeg';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    getTotalItems,
    addToCartWithFullCheck
  } = useContext(CartContext);
  
  const { isAuthenticated, isProfileComplete } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert('💕 لطفاً ابتدا وارد حساب کاربری خود شوید');
      navigate('/profile', { state: { from: '/cart', action: 'viewCart' } });
      return;
    }
    if (!isProfileComplete) {
      alert('🌸 لطفاً پروفایل خود را تکمیل کنید');
      navigate('/profile', { state: { from: '/cart', action: 'viewCart' } });
      return;
    }
  }, [isAuthenticated, isProfileComplete, navigate]);

  const handleCheckout = () => {
    if (!cart.length) {
      alert('🛍️ سبد خرید شما خالی است');
      return;
    }
    alert(`🎉 خرید شما با مبلغ ${getTotalPrice().toLocaleString('fa-IR')} تومان ثبت شد! 🎉`);
    clearCart();
    navigate('/');
  };

  const handleAddSuggestedProduct = (product, index) => {
    if (!isAuthenticated) {
      alert('💕 لطفاً ابتدا وارد حساب کاربری خود شوید');
      navigate('/profile', { state: { from: `/product/${index + 9}`, action: 'addToCart', quantity: 1 } });
      return;
    }
    if (!isProfileComplete) {
      alert('🌸 لطفاً پروفایل خود را تکمیل کنید');
      navigate('/profile', { state: { from: `/product/${index + 9}`, action: 'addToCart', quantity: 1 } });
      return;
    }
    
    const suggestedProduct = {
      id: index + 100,
      name: product.name,
      price: product.price,
      image: product.image,
      category: "پیشنهادی ویژه"
    };
    addToCartWithFullCheck(suggestedProduct, 1, navigate);
  };

  if (!isAuthenticated || !isProfileComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-rose-300 animate-gradient" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-center z-10"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg mb-4">
            <FaHeart className="text-white text-2xl animate-pulse" />
          </div>
          <p className="text-gray-700 font-medium bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full">در حال بررسی دسترسی...</p>
        </motion.div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-pink-100 to-rose-100" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ec4899 0.5px, transparent 0.5px)', backgroundSize: '20px 20px', opacity: 0.3 }} />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md z-10"
        >
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-8xl mb-6"
          >
            🛍️💕
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">سبد خریدت خالیه!</h1>
          <p className="text-gray-500 mb-8">
            هنوز محصولی اضافه نکردی... بیا از محصولات ناز و قشنگ ما دیدن کن!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:shadow-xl transition-all"
            >
              <FaShoppingBag />
              <span>مشاهده محصولات ✨</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-pink-300 text-pink-500 font-semibold hover:bg-pink-50 transition-all"
            >
              <FaArrowLeft />
              <span>بازگشت به خانه 🏠</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const suggestedProducts = [
    { name: "سرم ویتامین C ✨", price: 185000, image: suggested1 },
    { name: "کرم ضد آفتاب SPF 50 ☀️", price: 95000, image: suggested2 },
    { name: "خط چشم مایع 🖤", price: 68000, image: suggested3 },
    { name: "پاک کننده آرایش 🧼", price: 72000, image: suggested4 }
  ];

  const features = [
    { icon: <FaTruck />, title: "ارسال سریع", desc: "۲۴ ساعته", color: "from-blue-400 to-blue-500" },
    { icon: <FaShieldAlt />, title: "ضمانت اصالت", desc: "۱۰۰٪ تضمینی", color: "from-green-400 to-green-500" },
    { icon: <FaGift />, title: "هدیه ویژه", desc: "بالای ۳۰۰ هزار", color: "from-amber-400 to-amber-500" },
    { icon: <FaHeadset />, title: "پشتیبانی", desc: "۲۴/۷", color: "from-purple-400 to-purple-500" }
  ];

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50" />
      
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cartWaves" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0,30 Q15,20 30,30 T60,30" fill="none" stroke="#ec4899" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cartWaves)" />
      </svg>
      
      <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
      
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-300/30 text-xl animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 5}s`
          }}
        >
          💕
        </div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-center"
        >
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">سبد خرید</span>
            <FaStar className="text-pink-500 animate-pulse" />
          </h1>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm shadow-sm">
              <p className="text-gray-600">{getTotalItems()} محصول در سبد خریدت هست</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCart}
              className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/70 backdrop-blur-sm text-red-400 hover:text-red-500 transition-colors shadow-sm"
            >
              <FaTrash />
              <span>حذف همه</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* لیست محصولات */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all border border-white/40"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                    <div className="md:col-span-5 flex items-center gap-4">
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-xs text-pink-500 mb-2">{item.category}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-red-400 hover:text-red-500 text-xs"
                        >
                          <FaTrash className="text-xs" />
                          <span>حذف</span>
                        </motion.button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center font-semibold text-gray-800">
                      {item.price.toLocaleString('fa-IR')} تومان
                    </div>

                    <div className="md:col-span-3 flex justify-center">
                      <div className="flex items-center gap-2 bg-pink-50 rounded-full px-3 py-1 shadow-inner">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white text-pink-500 hover:bg-pink-100 transition-colors flex items-center justify-center shadow-sm"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="w-10 text-center font-semibold text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white text-pink-500 hover:bg-pink-100 transition-colors flex items-center justify-center shadow-sm"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                      {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => navigate('/products')}
              className="flex items-center gap-2 mt-4 text-pink-500 hover:text-pink-600 font-semibold transition-colors"
            >
              <FaArrowLeft />
              <span>ادامه خرید 🌸</span>
            </motion.button>
          </div>

          {/* خلاصه سبد خرید */}
          <div className="space-y-4">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-24 border border-white/40"
            >
              <div className="flex items-center gap-2 mb-4">
                <FaStar className="text-pink-500" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">خلاصه سفارش</h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>جمع کل ({getTotalItems()} محصول)</span>
                  <span className="font-semibold">{getTotalPrice().toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>هزینه ارسال</span>
                  <span className="font-semibold">{getTotalPrice() > 300000 ? '🚚 رایگان' : '۳۰,۰۰۰ تومان'}</span>
                </div>
                <div className="flex justify-between text-amber-500">
                  <span>🎁 تخفیف ویژه</span>
                  <span>۲۵,۰۰۰ تومان</span>
                </div>
                <div className="border-t border-dashed border-pink-200 pt-4 flex justify-between text-lg font-bold">
                  <span>💸 مبلغ قابل پرداخت</span>
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {(getTotalPrice() + (getTotalPrice() > 300000 ? 0 : 30000) - 25000).toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">🎫 کد تخفیف</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="کد تخفیف رو وارد کن..."
                    className="flex-1 px-4 py-2 border-2 border-pink-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-white/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all"
                  >
                    اعمال 💖
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:shadow-xl transition-all"
              >
                ادامه فرآیند خرید 💕
              </motion.button>

              <div className="mt-4 pt-4 border-t border-pink-100">
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className={`text-center p-2 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-10 shadow-sm`}
                    >
                      <div className="text-white text-lg mb-1">{feature.icon}</div>
                      <p className="text-xs font-semibold text-white">{feature.title}</p>
                      <p className="text-[10px] text-white/80">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 flex items-start gap-2">
                <div className="text-green-500 mt-0.5">🔒</div>
                <div>
                  <h4 className="font-semibold text-green-700 text-sm">خرید امن از GlowUp</h4>
                  <p className="text-xs text-green-600">اطلاعات تو کاملاً امنه، نگران نباش عزیزم! 💕</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* محصولات پیشنهادی */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">✨ ممکنه اینا رو هم دوست داشته باشی ✨</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedProducts.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 hover:shadow-xl transition-all cursor-pointer border border-white/40"
                onClick={() => navigate(`/product/${index + 9}`)}
              >
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800 text-sm mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 text-sm">{product.price.toLocaleString('fa-IR')} تومان</span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddSuggestedProduct(product, index);
                    }}
                    className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1.5 rounded-full font-medium"
                  >
                    افزودن 🛍️
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;