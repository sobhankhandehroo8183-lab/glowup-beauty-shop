import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: "تابستانی درخشان",
      subtitle: "مجموعه جدید محصولات تابستانه",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80&crop=faces",
      link: "/products",
      bgColor: "from-pink-50 to-purple-50"
    },
    {
      id: 2,
      title: "تخفیف‌های ویژه",
      subtitle: "تا ۴۰٪ تخفیف روی تمام محصولات",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
      link: "/products",
      bgColor: "from-purple-50 to-blue-50"
    },
    {
      id: 3,
      title: "محصولات ارگانیک",
      subtitle: "طبیعی و بدون مواد شیمیایی",
      image: "https://images.unsplash.com/photo-1556228574443-f4be0a69df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
      link: "/products",
      bgColor: "from-blue-50 to-green-50"
    },
    {
      id: 4,
      title: "آرایش حرفه‌ای",
      subtitle: "ابزارهای با کیفیت برای آرایشگران",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80",
      link: "/products",
      bgColor: "from-green-50 to-yellow-50"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative custom-slider rounded-3xl overflow-hidden mt-6 shadow-lg">
      {/* اسلایدها */}
      <div className="relative h-[420px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-105 z-0'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`} />

            <img
              src={slide.image}
              alt={slide.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />

            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8">
                <div className="max-w-md backdrop-blur-sm bg-white/70 p-6 rounded-2xl shadow-lg">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-pink-500 hover:bg-pink-600 active:scale-95 text-white px-8 py-3 rounded-xl text-lg transition-all shadow-lg"
                  >
                    مشاهده محصولات
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه‌های کنترل */}
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* نشانگر اسلایدها */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-pink-500'
                : 'w-3 bg-white/80 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;