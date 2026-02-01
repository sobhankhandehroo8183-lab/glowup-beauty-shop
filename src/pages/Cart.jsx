import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    getTotalItems 
  } = useContext(CartContext);
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!cart.length) {
      alert('سبد خرید شما خالی است');
      return;
    }
    alert(`خرید شما با مبلغ ${getTotalPrice().toLocaleString('fa-IR')} تومان ثبت شد!`);
    clearCart();
    navigate('/');
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">سبد خرید شما خالی است</h1>
          <p className="text-gray-600 mb-8">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید. از محصولات شگفت‌انگیز ما دیدن کنید!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/products')}
              className="btn-primary flex items-center justify-center space-x-2 space-x-reverse px-6 py-3 rounded-lg text-white bg-pink-500 hover:bg-pink-600 transition-colors"
            >
              <FaShoppingBag />
              <span>مشاهده محصولات</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center space-x-2 space-x-reverse px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaArrowLeft />
              <span>بازگشت به صفحه اصلی</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* عنوان */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">سبد خرید</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <p className="text-gray-600">{getTotalItems()} محصول در سبد خرید موجود است</p>
            <button
              onClick={clearCart}
              className="flex items-center space-x-1 space-x-reverse text-red-500 hover:text-red-600 text-sm"
            >
              <FaTrash />
              <span>حذف همه</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* لیست محصولات */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  {/* اطلاعات محصول */}
                  <div className="md:col-span-5 flex items-center space-x-4 space-x-reverse">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center space-x-1 space-x-reverse text-red-500 hover:text-red-600 text-sm"
                      >
                        <FaTrash className="text-xs" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>

                  {/* قیمت واحد */}
                  <div className="md:col-span-2 text-center font-semibold text-gray-800">
                    {item.price.toLocaleString('fa-IR')} تومان
                  </div>

                  {/* تعداد */}
                  <div className="md:col-span-3 flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-100 text-gray-600 rounded-l"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 text-gray-600 rounded-r"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>

                  {/* جمع قیمت */}
                  <div className="md:col-span-2 text-center font-bold text-gray-800">
                    {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => navigate('/products')}
              className="flex items-center mt-4 space-x-2 space-x-reverse text-pink-500 hover:text-pink-600 font-semibold"
            >
              <FaArrowLeft />
              <span>ادامه خرید</span>
            </button>
          </div>

          {/* خلاصه سبد خرید */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-bold text-gray-800">خلاصه سفارش</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>جمع کل ({getTotalItems()} محصول)</span>
                  <span className="font-semibold">{getTotalPrice().toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>هزینه ارسال</span>
                  <span className="font-semibold">{getTotalPrice() > 300000 ? 'رایگان' : '۳۰,۰۰۰ تومان'}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>تخفیف</span>
                  <span>۲۵,۰۰۰ تومان</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>مبلغ قابل پرداخت</span>
                  <span>
                    {(getTotalPrice() + (getTotalPrice() > 300000 ? 0 : 30000) - 25000).toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              {/* کد تخفیف */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">کد تخفیف</label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="کد تخفیف را وارد کنید"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-l-lg">
                    اعمال
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                ادامه فرآیند خرید
              </button>

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <span className="text-green-500">✓</span>
                  <span>ضمانت بازگشت کالا تا ۷ روز</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <span className="text-green-500">✓</span>
                  <span>ارسال رایگان برای خرید بالای ۳۰۰ هزار تومان</span>
                </div>
                <div className="flex items-start space-x-2 space-x-reverse">
                  <span className="text-green-500">✓</span>
                  <span>پشتیبانی ۲۴ ساعته</span>
                </div>
              </div>

              {/* روش‌های پرداخت */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">روش‌های پرداخت</h3>
                <div className="flex flex-wrap gap-2">
                  {['💳', '🏦', '📱', '💎'].map((icon, index) => (
                    <div key={index} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              {/* امنیت خرید */}
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3 space-x-reverse">
                <div className="text-green-500 mt-1">🔒</div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">خرید امن از GlowUp</h4>
                  <p className="text-sm text-green-700">اطلاعات شما به صورت امن پردازش می‌شود. ما از اطلاعات شخصی شما محافظت می‌کنیم.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* محصولات پیشنهادی */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ممکن است این محصولات را دوست داشته باشید</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "سرم ویتامین C", price: 185000, image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop" },
              { name: "کرم ضد آفتاب SPF 50", price: 95000, image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=400&h=400&fit=crop" },
              { name: "خط چشم مایع", price: 68000, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" },
              { name: "پاک کننده آرایش", price: 72000, image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop" }
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${index + 9}`)}
              >
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800 text-sm mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-sm">{product.price.toLocaleString('fa-IR')} تومان</span>
                  <button className="text-xs bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded">افزودن</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
