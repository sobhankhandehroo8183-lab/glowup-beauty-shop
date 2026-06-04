import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';
import { FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCartWithProfileCheck } = useContext(CartContext);
  const { isAuthenticated } = useProfile();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = React.useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('💕 لطفاً ابتدا وارد حساب کاربری خود شوید');
      navigate('/profile', { 
        state: { 
          from: `/product/${product.id}`, 
          action: 'addToCart',
          quantity: 1
        } 
      });
      return;
    }
    addToCartWithProfileCheck(product, 1, navigate);
  };

  return (
    <div className="product-card-custom group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-pink-100 hover:border-pink-300 relative animate-scaleIn">
      {/* برچسب پرفروش */}
      {product.popular && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            🔥 پرفروش
          </div>
        </div>
      )}
      
      {/* دکمه علاقه‌مندی */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="افزودن به علاقه‌مندی‌ها"
      >
        <FaHeart className={`text-lg transition-colors ${isLiked ? 'text-pink-500' : 'text-gray-400'}`} />
      </button>

      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
          <img
  src={product.image}
  alt={product.name}
  loading="lazy"
  decoding="async"
  width="300"
  height="300"
  onError={(e) => {
    e.currentTarget.src = 'https://placehold.co/400x400/ff69b4/white?text=GlowUp';
  }}
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-pink-500 bg-pink-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 hover:text-pink-500 transition-colors mb-2 line-clamp-2 text-lg">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {product.price.toLocaleString('fa-IR')}
            </span>
            <span className="text-xs text-gray-400 mr-1">تومان</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-pink-500/30 active:scale-95"
            aria-label="افزودن به سبد خرید"
          >
            <FaShoppingCart className="text-sm" />
            <span className="text-sm font-medium">افزودن</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;