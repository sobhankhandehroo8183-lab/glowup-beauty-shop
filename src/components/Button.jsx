import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaCreditCard,
} from 'react-icons/fa';

const Bottom = () => {
  return (
    <div className="bg-gray-900 text-white relative overflow-hidden">
      {/* background decoration (placeholder visual) */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      {/* بخش خدمات */}
      <div className="bg-gray-800/95 backdrop-blur-sm py-6 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* خدمت ۱ */}
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="text-pink-400 mt-1">
                <FaTruck className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">ارسال سریع</h4>
                <p className="text-gray-400 text-sm">
                  ارسال به سراسر کشور در کمترین زمان
                </p>
              </div>
            </div>

            {/* خدمت ۲ */}
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="text-pink-400 mt-1">
                <FaShieldAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">ضمانت اصل بودن</h4>
                <p className="text-gray-400 text-sm">
                  تمامی محصولات با ضمانت اصالت کالا
                </p>
              </div>
            </div>

            {/* خدمت ۳ */}
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="text-pink-400 mt-1">
                <FaCreditCard className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">پرداخت امن</h4>
                <p className="text-gray-400 text-sm">
                  پرداخت آنلاین با امنیت بالا
                </p>
              </div>
            </div>

            {/* خدمت ۴ */}
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="text-pink-400 mt-1">
                <FaHeadset className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">پشتیبانی ۲۴/۷</h4>
                <p className="text-gray-400 text-sm">
                  پشتیبانی آنلاین در تمامی ساعات
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش ارتباطات */}
      <div className="py-10 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* اطلاعات تماس */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center space-x-2 space-x-reverse">
                <FaMapMarkerAlt className="text-pink-400" />
                <span>آدرس و تماس</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 space-x-reverse">
                  <FaMapMarkerAlt className="text-gray-400 mt-1" />
                  <span className="text-gray-400 text-sm">
                    تهران، خیابان ولیعصر، پلاک ۱۲۳۴
                  </span>
                </li>
                <li className="flex items-center space-x-3 space-x-reverse">
                  <FaPhone className="text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </span>
                </li>
                <li className="flex items-center space-x-3 space-x-reverse">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    info@glowup.com
                  </span>
                </li>
              </ul>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div>
              <h3 className="font-bold text-lg mb-4">شبکه‌های اجتماعی</h3>
              <p className="text-gray-400 text-sm mb-4">
                ما را در شبکه‌های اجتماعی دنبال کنید
              </p>
              <div className="flex space-x-3 space-x-reverse">
                <a
                  href="https://wa.me/989121234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all hover:scale-105"
                  aria-label="واتساپ"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://t.me/glowup_shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all hover:scale-105"
                  aria-label="تلگرام"
                >
                  <FaTelegram />
                </a>
                <a
                  href="https://instagram.com/glowup_shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 rounded-full flex items-center justify-center transition-all hover:scale-105"
                  aria-label="اینستاگرام"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* خبرنامه */}
            <div>
              <h3 className="font-bold text-lg mb-4">خبرنامه</h3>
              <p className="text-gray-400 text-sm mb-4">
                از جدیدترین محصولات و تخفیف‌ها با خبر شوید
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-r-lg border border-gray-700 focus:outline-none focus:border-pink-500 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-l-lg text-sm transition-colors"
                >
                  عضویت
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* بخش پایینی */}
      <div className="border-t border-gray-800 py-6 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* لوگو و کپی‌رایت */}
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="text-lg font-bold">
                  Glow<span className="text-pink-400">Up</span>
                </span>
              </div>
              <p className="text-gray-500 text-xs">
                © ۱۴۰۳ - تمامی حقوق برای GlowUp محفوظ است
              </p>
            </div>

            {/* لینک‌های پایانی */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                صفحه اصلی
              </Link>
              <Link to="/products" className="text-gray-400 hover:text-white text-sm transition-colors">
                محصولات
              </Link>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                حریم خصوصی
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                شرایط استفاده
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                تماس با ما
              </a>
            </div>

            {/* گواهی‌ها */}
            <div className="mt-4 md:mt-0 flex items-center space-x-4 space-x-reverse">
              <div className="text-gray-500 text-xs flex items-center space-x-1 space-x-reverse">
                <span className="text-green-400">🔒</span>
                <span>پرداخت امن</span>
              </div>
              <div className="text-gray-500 text-xs flex items-center space-x-1 space-x-reverse">
                <span className="text-blue-400">✓</span>
                <span>نماد اعتماد</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
