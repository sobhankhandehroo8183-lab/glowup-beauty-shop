import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCartWithProfileCheck } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCartWithProfileCheck(product, 1, navigate);
  };

  return (
    <div className="product-card bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/400x400.png?text=Product+Image';
            }}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />

          {product.popular && (
            <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow">
              پرفروش
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
          <div className="flex items-center space-x-1 space-x-reverse">
            <FaStar className="text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-pink-500 transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">
            {product.price.toLocaleString('fa-IR')} تومان
          </span>

          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 space-x-reverse bg-pink-500 hover:bg-pink-600 active:scale-95 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            <FaShoppingCart />
            <span>افزودن</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
