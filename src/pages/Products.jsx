import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // ← useNavigate اضافه شد
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const Products = () => {
  const navigate = useNavigate(); // ← اضافه شد
  const [searchParams, setSearchParams] = useState(() => new URLSearchParams());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [...new Set(products.map(p => p.category))];

  useEffect(() => {
    let result = [...products];

    if (selectedCategory) result = result.filter(product => product.category === selectedCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result = result.filter(product => product.popular); break;
      default: break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, sortBy, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    category ? params.set('category', category) : params.delete('category');
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSelectedCategory(''); setSortBy('default'); setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        {/* عنوان */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">محصولات آرایشی</h1>
          <p className="text-gray-600">بهترین محصولات آرایشی و بهداشتی با کیفیت عالی</p>
        </div>

        {/* فیلترها و جستجو */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all hover:shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">جستجوی محصولات</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="نام محصول را جستجو کنید..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              >
                <option value="">همه دسته‌بندی‌ها</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">مرتب‌سازی بر اساس</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
              >
                <option value="default">پیش‌فرض</option>
                <option value="price-low">قیمت: کم به زیاد</option>
                <option value="price-high">قیمت: زیاد به کم</option>
                <option value="rating">بالاترین امتیاز</option>
                <option value="popular">محصولات پرفروش</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
              <FaFilter />
              <span>{filteredProducts.length} محصول یافت شد</span>
            </div>
            <button
              onClick={handleClearFilters}
              className="text-pink-500 hover:text-pink-600 font-semibold transition-colors"
            >
              حذف فیلترها
            </button>
          </div>
        </div>

        {/* لیست محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-5xl mb-4">😔</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">محصولی یافت نشد</h3>
              <p className="text-gray-500 mb-4">هیچ محصولی با فیلترهای انتخاب شده مطابقت ندارد</p>
              <button onClick={handleClearFilters} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl transition-colors">
                حذف فیلترها
              </button>
            </div>
          )}
        </div>

        {/* فیلترهای فعال */}
        {(selectedCategory || sortBy !== 'default' || searchQuery) && (
          <div className="mt-8 bg-white rounded-xl p-4 shadow-md">
            <h4 className="font-semibold text-gray-700 mb-2">فیلترهای فعال:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  دسته‌بندی: {selectedCategory}
                  <button onClick={() => handleCategoryChange('')} className="hover:text-pink-900">×</button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  جستجو: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="hover:text-blue-900">×</button>
                </span>
              )}
              {sortBy !== 'default' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  مرتب‌سازی: {
                    sortBy === 'price-low' ? 'قیمت کم به زیاد' :
                    sortBy === 'price-high' ? 'قیمت زیاد به کم' :
                    sortBy === 'rating' ? 'امتیاز' : 'پرفروش'
                  }
                  <button onClick={() => setSortBy('default')} className="hover:text-green-900">×</button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
