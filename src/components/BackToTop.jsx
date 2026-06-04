import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      const shouldBeVisible = window.pageYOffset > 300;
      setIsVisible(shouldBeVisible);
    };

    window.addEventListener('scroll', handleScrollVisibility);

    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="بازگشت به بالا"
      className={`fixed bottom-20 left-4 md:left-8 z-40
        w-10 h-10 rounded-full shadow-lg
        flex items-center justify-center
        bg-pink-500 text-white
        transition-all duration-300
        hover:bg-pink-600
        ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }
      `}
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTop;
