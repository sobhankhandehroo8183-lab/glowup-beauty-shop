import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaInstagram, FaTelegram, FaWhatsapp, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCreditCard, FaTruck, FaShieldAlt, FaGift, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: '✨ صفحه اصلی', path: '/' },
    { name: '💄 محصولات', path: '/products' },
    { name: '🛍️ سبد خرید', path: '/cart' },
    { name: '👤 پروفایل', path: '/profile' },
    { name: '💕 حریم خصوصی', path: '/privacy' },
    { name: '📜 قوانین و مقررات', path: '/terms' }
  ];

  const services = [
    { icon: <FaTruck />, title: 'ارسال سریع', desc: '۲۴ ساعته به سراسر کشور' },
    { icon: <FaShieldAlt />, title: 'ضمانت اصالت', desc: '۱۰۰٪ تضمین کیفیت' },
    { icon: <FaGift />, title: 'هدیه ویژه', desc: 'برای خرید بالای ۳۰۰ هزار' },
    { icon: <FaCreditCard />, title: 'پرداخت امن', desc: 'درگاه‌های معتبر' }
  ];

  const socialLinks = [
    { icon: <FaInstagram />, name: 'اینستاگرام', color: 'hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500', link: '#' },
    { icon: <FaTelegram />, name: 'تلگرام', color: 'hover:bg-blue-500', link: '#' },
    { icon: <FaWhatsapp />, name: 'واتساپ', color: 'hover:bg-green-500', link: '#' },
    { icon: <FaTwitter />, name: 'توییتر', color: 'hover:bg-sky-500', link: '#' }
  ];

  const paymentMethods = ['💳', '🏦', '📱', '💎', '✨', '🪙'];

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* دکوراسیون پس‌زمینه */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50" />
      
      {/* الگوی قلب‌های تزئینی */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #ec4899 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* دایره‌های نور تزئینی */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      
      {/* قلب‌های شناور */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-200/50 text-2xl animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        >
          {['♥', '♡', '💕', '💖', '✨'][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* بخش خدمات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 border-b border-pink-200">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-3 shadow-lg">
                {service.icon}
              </div>
              <h3 className="font-bold text-gray-800">{service.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* بخش لوگو و توضیحات */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl animate-pulse">💕</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Glow<span className="text-pink-500">Up</span>
                </h2>
                <p className="text-xs text-gray-400">✨ beauty shop ✨</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              اولین و تخصص‌ترین فروشگاه آنلاین لوازم آرایشی و بهداشتی با ضمانت اصالت کالا و بهترین قیمت‌ها.✨
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.link}
                  className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:text-white`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* لینک‌های سریع */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              لینک‌های سریع
              <span className="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-pink-500 transition-colors duration-300 flex items-center gap-2 text-sm"
                  >
                    <span className="text-pink-400 text-xs">{link.name.charAt(0)}</span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* خدمات مشتریان */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              خدمات مشتریان
              <span className="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/faq" className="text-gray-600 hover:text-pink-500 transition-colors flex items-center gap-2 text-sm">
                  <span className="text-pink-400">❓</span> سوالات متداول
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/returns" className="text-gray-600 hover:text-pink-500 transition-colors flex items-center gap-2 text-sm">
                  <span className="text-pink-400">🔄</span> شرایط بازگشت کالا
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/delivery" className="text-gray-600 hover:text-pink-500 transition-colors flex items-center gap-2 text-sm">
                  <span className="text-pink-400">🚚</span> روش‌های ارسال
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/payment" className="text-gray-600 hover:text-pink-500 transition-colors flex items-center gap-2 text-sm">
                  <span className="text-pink-400">💳</span> روش‌های پرداخت
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* تماس با ما */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              تماس با ما
              <span className="w-8 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <FaPhone className="text-pink-500 text-sm" />
                </div>
                <span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <FaEnvelope className="text-pink-500 text-sm" />
                </div>
                <span dir="ltr">info@glowup.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-pink-500 text-sm" />
                </div>
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <FaClock className="text-pink-500 text-sm" />
                </div>
                <span>شنبه تا پنجشنبه ۹ الی ۲۰</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* روش‌های پرداخت */}
        <div className="border-t border-pink-200 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">پرداخت امن با تمام کارت‌های عضو شتاب</h3>
              <div className="flex gap-3 justify-center md:justify-start">
                {paymentMethods.map((method, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-xl"
                  >
                    {method}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">
              <p>همراه ما باشید در:</p>
              <div className="flex gap-2 justify-center mt-1">
                <span className="text-pink-400">✨</span>
                <span>اینستاگرام</span>
                <span className="text-purple-400">✨</span>
                <span>تلگرام</span>
                <span className="text-pink-400">✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* کپی رایت */}
        <div className="border-t border-pink-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} کلیه حقوق این سایت متعلق به <span className="text-pink-500 font-semibold">GlowUp</span> می‌باشد.
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              ساخته شده با <FaHeart className="text-pink-500 animate-pulse" /> برای زیبایی تو ✨
            </p>
          </div>
        </div>
      </div>

      {/* دکمه بازگشت به بالا */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;