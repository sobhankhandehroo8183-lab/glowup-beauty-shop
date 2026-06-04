import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slide1 from '../assets/images/ساحل-دریا-در-تابستان-1024x681.jpg';
import slide2 from '../assets/images/sale-colorful-concept-with-copy-space-Top.jpg';
import slide3 from '../assets/images/beauty-cosmetics1.jpg';
import slide4 from '../assets/images/1657173466_A9zP5.jpg';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: "✨ تابستانی درخشان ✨",
      subtitle: "مجموعه جدید محصولات تابستانه با تخفیف ویژه",
      image: slide1,
      link: "/products",
    },
    {
      id: 2,
      title: "🎁 تخفیف‌های شگفت‌انگیز 🎁",
      subtitle: "تا ۴۰٪ تخفیف روی تمام محصولات",
      image: slide2,
      link: "/products",
    },
    {
      id: 3,
      title: "🌿 طبیعی و ارگانیک 🌿",
      subtitle: "محصولات کاملاً طبیعی و بدون مواد شیمیایی",
      image: slide3,
      link: "/products",
    },
    {
      id: 4,
      title: "💎 آرایش حرفه‌ای 💎",
      subtitle: "ابزارهای با کیفیت برای آرایشگران حرفه‌ای",
      image: slide4,
      link: "/products",
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentSlide
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-110 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* گرادیانت روی اسلاید */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* محتوای اسلاید */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="container mx-auto px-4">
                <div className="inline-block px-6 py-2 rounded-full bg-white/20 backdrop-blur-md mb-4 text-white text-sm animate-pulse">
                  🔥 پیشنهاد ویژه 🔥
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeInUp">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  {slide.subtitle}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg animate-fadeInUp"
                  style={{ animationDelay: '0.4s' }}
                >
                  مشاهده محصولات →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه‌های قبلی/بعدی */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        ›
      </button>

      {/* نقاط نشانگر */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;