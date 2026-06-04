import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { FaArrowLeft, FaGift, FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const Home = () => {
  // فقط 4 محصول اول پرفروش برای افزایش سرعت
  const popularProducts = products.filter(product => product.popular).slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: <FaTruck className="text-2xl" />, title: "ارسال سریع", desc: "۲۴ ساعته", color: "from-blue-400 to-blue-500" },
    { icon: <FaShieldAlt className="text-2xl" />, title: "ضمانت اصالت", desc: "۱۰۰٪ تضمینی", color: "from-green-400 to-green-500" },
    { icon: <FaGift className="text-2xl" />, title: "هدیه ویژه", desc: "بالای ۳۰۰ هزار", color: "from-amber-400 to-amber-500" },
    { icon: <FaHeadset className="text-2xl" />, title: "پشتیبانی", desc: "۲۴/۷", color: "from-purple-400 to-purple-500" }
  ];

  const categories = [
    { name: "کرم‌ها", icon: "🧴", color: "from-pink-100 to-pink-200" },
    { name: "رژ لب", icon: "💄", color: "from-red-100 to-red-200" },
    { name: "ریمل", icon: "👁️", color: "from-purple-100 to-purple-200" },
    { name: "کرم پودر", icon: "💅", color: "from-yellow-100 to-yellow-200" },
    { name: "ماسک صورت", icon: "🎭", color: "from-green-100 to-green-200" }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-decoration" />

      {/* اسلایدر */}
      <div className="container mx-auto px-4 mt-6 scroll-animate">
        <Slider />
      </div>

      {/* ویژگی‌های سایت */}
      <section className="py-12 scroll-animate">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div key={i} className={`glass-effect rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-r ${feature.color} bg-opacity-10`}>
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-md mb-2">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* محصولات پرفروش - فقط 4 عدد */}
      <section className="py-12 scroll-animate">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                ✨ محصولات پرفروش
              </h2>
              <p className="text-gray-500 text-sm mt-1">محبوب‌ترین محصولات این هفته</p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold transition-all group text-sm"
            >
              <span>مشاهده همه</span>
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-sm" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-scaleIn">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* بنر تبلیغاتی */}
      <section className="py-12 scroll-animate">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 shadow-2xl">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 p-6 md:p-10 text-center text-white">
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-3 text-xs">
                🔥 تخفیف ویژه
              </div>
              <h3 className="text-xl md:text-3xl font-bold mb-2">تا ۴۰٪ تخفیف در خرید اول</h3>
              <p className="text-sm md:text-base mb-4 opacity-90">با کد <span className="font-mono bg-white/20 px-2 py-1 rounded-lg text-sm">GLOWUP40</span></p>
              <Link
                to="/products"
                className="inline-block bg-white text-pink-600 hover:bg-gray-100 px-6 py-2 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg text-sm"
              >
                شروع خرید 🎁
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* دسته‌بندی‌ها */}
      <section className="py-12 bg-white/50 scroll-animate">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8">
            دسته‌بندی محصولات
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {categories.map((category, i) => (
              <Link
                key={i}
                to={`/products?category=${category.name}`}
                className="group bg-white rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-2 transition-all duration-300 group-hover:scale-110 text-2xl md:text-3xl`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-pink-500 transition-colors">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;