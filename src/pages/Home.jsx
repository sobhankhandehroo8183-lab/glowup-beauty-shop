import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Home = () => {
  // اضافه کردن تصاویر متفاوت برای محصولات صفحه اصلی
  const popularProducts = products.filter(product => product.popular)
    .map(product => ({
      ...product,
      // ID متفاوت برای جلوگیری از تداخل با صفحه محصولات
      homeId: `home-${product.id}`,
      // تصویر متفاوت با سایز بزرگتر و کراپ متفاوت
      homeImage: product.image
        .replace('w=300', 'w=400')
        .replace('h=300', 'h=400')
        .replace('fit=crop', 'fit=crop&crop=faces')
    }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      {/* اسلایدر */}
      <div className="container mx-auto px-4 mt-6">
        <Slider />
      </div>

      {/* بخش محصولات پرفروش */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">محصولات پرفروش</h2>
            <Link
              to="/products"
              className="text-pink-500 hover:text-pink-600 flex items-center space-x-1 space-x-reverse transition-colors"
            >
              <span>مشاهده همه محصولات</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard 
                key={product.homeId} 
                product={{
                  ...product,
                  id: product.homeId, // استفاده از ID متفاوت
                  image: product.homeImage // استفاده از تصویر متفاوت
                }} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* بخش دسته‌بندی‌ها */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">دسته‌بندی محصولات</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['کرم‌ها', 'رژ لب', 'ریمل', 'کرم پودر', 'ماسک صورت'].map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category}`}
                className="bg-gray-50 hover:bg-pink-50 rounded-2xl p-6 text-center transition-all transform hover:scale-105 shadow hover:shadow-lg"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors text-3xl">
                  {category === 'کرم‌ها' && '🧴'}
                  {category === 'رژ لب' && '💄'}
                  {category === 'ریمل' && '👁️'}
                  {category === 'کرم پودر' && '💅'}
                  {category === 'ماسک صورت' && '🎭'}
                </div>
                <h3 className="font-semibold text-gray-800">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* بنر تبلیغاتی */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl p-8 text-white text-center bg-gradient-to-r from-pink-500 to-purple-500 overflow-hidden shadow-lg">
            {/* تصویر پس‌زمینه محو شده */}
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=400&q=80"
              alt="Promotion"
              className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
            />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">ارسال رایگان برای خریدهای بالای ۳۰۰ هزار تومان</h3>
              <p className="mb-6 text-lg">همین حالا از تخفیف‌های ویژه ما استفاده کنید</p>
              <Link
                to="/products"
                className="inline-block bg-white text-pink-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                شروع خرید
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;