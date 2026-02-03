import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext'; // ← اصلاح import
import { CartContext } from '../context/CartContext';

const Profile = () => {
  const { profile, updateProfile, isProfileComplete } = useProfile();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [address, setAddress] = useState(profile.address || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'نام الزامی است';
    if (!email) newErrors.email = 'ایمیل الزامی است';
    if (!address) newErrors.address = 'آدرس الزامی است';
    if (!phone) newErrors.phone = 'شماره تماس الزامی است';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (updateProfile) {
      updateProfile({ name, email, address, phone });
    } else {
      console.error('updateProfile موجود نیست!');
    }

    // برگرداندن کاربر به مسیر قبل و ادامه عملیات
    if (location.state && location.state.from) {
      const { from, action, quantity } = location.state;
      import('../data/products').then(({ default: products }) => {
        const productId = parseInt(from.split('/product/')[1]);
        const product = products.find(p => p.id === productId);
        if (product) {
          if (action === 'addToCart' || action === 'buyNow') {
            addToCart(product, quantity || 1);
            if (action === 'addToCart') alert(`${product.name} به سبد خرید اضافه شد`);
            if (action === 'buyNow') navigate('/cart');
            else navigate(from);
          }
        } else navigate(from);
      });
      return;
    }

    alert('پروفایل شما با موفقیت ذخیره شد');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            پروفایل شما
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            لطفاً اطلاعات خود را کامل کنید
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="name" className="sr-only">نام</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="نام"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">ایمیل</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="ایمیل"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="sr-only">آدرس</label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="آدرس"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="sr-only">شماره تماس</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                placeholder="شماره تماس"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              ذخیره پروفایل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
