import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* background decoration (placeholder visual) */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      {/* بخش بالایی فوتر */}
      <div className="container mx-auto px-4 py-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* درباره ما */}
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <h2 className="text-xl font-bold">
                Glow<span className="text-pink-400">Up</span>
              </h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              فروشگاه تخصصی لوازم آرایشی و بهداشتی با بهترین کیفیت و قیمت.
              ارائه محصولات اورجینال با ضمانت بازگشت.
            </p>

            <div className="flex space-x-3 space-x-reverse">
              {['📱', '📸', '💬', '📺'].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all hover:scale-105"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="font-semibold text-lg mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  محصولات
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  سبد خرید
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* خدمات */}
          <div>
            <h3 className="font-semibold text-lg mb-4">خدمات</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">راهنمای خرید</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">شرایط بازگشت</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">سوالات متداول</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">حریم خصوصی</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">شرایط استفاده</a></li>
            </ul>
          </div>

          {/* تماس با ما */}
          <div>
            <h3 className="font-semibold text-lg mb-4">تماس با ما</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 space-x-reverse">
                <span className="text-pink-400 mt-1">📍</span>
                <span className="text-gray-400 text-sm">تهران، خیابان ولیعصر</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <span className="text-pink-400">📞</span>
                <span className="text-gray-400 text-sm">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <span className="text-pink-400">📧</span>
                <span className="text-gray-400 text-sm">info@glowup.com</span>
              </li>
            </ul>

            {/* خبرنامه */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-2">عضویت در خبرنامه</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="ایمیل شما"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded-r-lg border border-gray-700 focus:outline-none focus:border-pink-500"
                />
                <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-l-lg text-sm transition-colors">
                  عضویت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش پایینی فوتر */}
      <div className="border-t border-gray-800 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-right mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © ۱۴۰۳ GlowUp. تمامی حقوق محفوظ است.
              </p>
            </div>

            <div className="flex space-x-4 space-x-reverse">
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 opacity-70" />
              <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 opacity-70" />
              <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="h-6 opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
