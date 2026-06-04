import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useProfile } from '../context/ProfileContext';
import products from '../data/products';
import { FaStar, FaShoppingCart, FaArrowRight, FaShareAlt, FaHeart } from 'react-icons/fa';
import extraImg1 from '../assets/images/303.jpg';
import extraImg2 from '../assets/images/WA-4453-450x315.jpg';

const ProductDetail = () => {
  const { id } = useParams();                 
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { isProfileComplete, isAuthenticated } = useProfile();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      const related = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product]);

  useEffect(() => {
    if (
      isProfileComplete &&
      location.state &&
      location.state.from === `/product/${id}` &&
      product
    ) {
      const { action, quantity: q } = location.state;

      if (action === 'addToCart') {
        addToCart(product, q);
        alert(`${q} عدد ${product.name} به سبد خرید اضافه شد`);
        navigate(location.pathname, { replace: true, state: null });
      }

      if (action === 'buyNow') {
        addToCart(product, q);
        navigate('/cart', { replace: true });
      }
    }
  }, [isProfileComplete]);

  const checkUserAuth = (actionType = 'addToCart') => {
    if (!isAuthenticated) {
      alert('لطفاً ابتدا وارد حساب کاربری خود شوید');
      navigate('/profile', { 
        state: { 
          from: `/product/${id}`, 
          action: actionType, 
          quantity 
        } 
      });
      return false;
    }
    
    if (!isProfileComplete) {
      alert('لطفاً پروفایل خود را تکمیل کنید');
      navigate('/profile', { 
        state: { 
          from: `/product/${id}`, 
          action: actionType, 
          quantity 
        } 
      });
      return false;
    }
    
    return true;
  };

  const handleAddToCart = () => {
    if (!checkUserAuth('addToCart')) {
      return;
    }

    if (product) {
      addToCart(product, quantity);
      alert(`${quantity} عدد ${product.name} به سبد خرید اضافه شد`);
    }
  };

  const handleBuyNow = () => {
    if (!checkUserAuth('buyNow')) {
      return;
    }

    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">محصول یافت نشد</h2>
          <p className="text-gray-600 mb-6">محصول مورد نظر وجود ندارد یا حذف شده است.</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            بازگشت به محصولات
          </button>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image,
    extraImg1,
    extraImg2
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-sm text-gray-600 flex flex-wrap items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-pink-500 transition-colors">صفحه اصلی</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-pink-500 transition-colors">محصولات</button>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
            <div>
              <div className="mb-4 relative">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg transition-transform hover:scale-105"
                />
              </div>

              <div className="flex space-x-3 space-x-reverse mt-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-pink-500 scale-105'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <img src={img} alt={`تصویر ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center space-x-4 space-x-reverse">
                <button className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-pink-500 transition-colors">
                  <FaShareAlt />
                  <span>اشتراک گذاری</span>
                </button>
                <button className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-red-500 transition-colors">
                  <FaHeart />
                  <span>افزودن به علاقه‌مندی‌ها</span>
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.category}</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 ml-1" />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">(۴۵ نظر)</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-800">{product.price.toLocaleString('fa-IR')} تومان</span>
                <div className="flex items-center space-x-2 space-x-reverse mt-2">
                  <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm">موجود در انبار</span>
                  <span className="text-sm text-gray-500">ارسال رایگان برای خریدهای بالای ۳۰۰ هزار تومان</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">توضیحات محصول</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">ویژگی‌ها</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features && product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-gray-700 mb-2 block">تعداد</span>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >-</button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >+</button>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-gray-500 mb-1">جمع کل</div>
                    <div className="text-2xl font-bold text-gray-800">{(product.price * quantity).toLocaleString('fa-IR')} تومان</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 space-x-reverse transition-colors"
                  >
                    <FaShoppingCart />
                    <span>افزودن به سبد خرید</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 space-x-reverse transition-colors"
                  >
                    <span>خرید سریع</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">محصولات مشابه</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 hover:text-pink-500 cursor-pointer"
                        onClick={() => navigate(`/product/${relatedProduct.id}`)}>
                      {relatedProduct.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">{relatedProduct.price.toLocaleString('fa-IR')} تومان</span>
                      <button
                        onClick={() => {
                          if (!isAuthenticated) {
                            alert('لطفاً ابتدا وارد حساب کاربری خود شوید');
                            navigate('/profile', { 
                              state: { 
                                from: `/product/${relatedProduct.id}`, 
                                action: 'addToCart', 
                                quantity: 1 
                              } 
                            });
                            return;
                          }
                          
                          if (!isProfileComplete) {
                            alert('لطفاً پروفایل خود را تکمیل کنید');
                            navigate('/profile', { 
                              state: { 
                                from: `/product/${relatedProduct.id}`, 
                                action: 'addToCart', 
                                quantity: 1 
                              } 
                            });
                            return;
                          }
                          
                          addToCart(relatedProduct, 1);
                          alert(`${relatedProduct.name} به سبد خرید اضافه شد`);
                        }}
                        className="text-sm bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded transition-colors"
                      >
                        افزودن
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">اطلاعات تکمیلی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">🚚 ارسال و بازگشت کالا</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• ارسال رایگان برای خرید بالای ۳۰۰ هزار تومان</li>
                <li>• ارسال به سراسر کشور</li>
                <li>• امکان بازگشت کالا تا ۷ روز</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">🔒 ضمانت اصالت کالا</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• کلیه محصولات دارای ضمانت اصالت</li>
                <li>• محصولات وارداتی با مجوز بهداشت</li>
                <li>• گارانتی کیفیت محصولات</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">💳 روش‌های پرداخت</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• پرداخت آنلاین</li>
                <li>• پرداخت در محل</li>
                <li>• خرید اقساطی</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;