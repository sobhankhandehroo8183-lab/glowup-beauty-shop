const products = [
  {
    id: 1,
    name: "رژ لب قرمز کلاسیک",
    description: "رژ لب با ماندگاری بالا و رنگ زیبا",
    price: 120000,
    category: "لب",
    rating: 4.8,
    popular: true,
    image: "https://images.unsplash.com/photo-1588776814546-c6aa69f6a0e1?&w=300&h=300&fit=crop"
  },
  {
    id: 2,
    name: "کرم مرطوب‌کننده پوست",
    description: "نرم‌کننده و آبرسان پوست خشک و حساس",
    price: 95000,
    category: "پوست",
    rating: 4.5,
    popular: true,
    image: "https://images.unsplash.com/photo-1595992445646-7dbf8a02b86c?&w=300&h=300&fit=crop"
  },
  {
    id: 3,
    name: "ریمل حجم‌دهنده",
    description: "ریملی مقاوم در برابر آب با حجم‌دهی عالی",
    price: 80000,
    category: "چشم",
    rating: 4.3,
    popular: false,
    image: "https://images.unsplash.com/photo-1582719478170-4e8a0f6a3b2e?&w=300&h=300&fit=crop"
  },
  {
    id: 4,
    name: "خط چشم مشکی",
    description: "خط چشمی روان و با دوام بالا",
    price: 60000,
    category: "چشم",
    rating: 4.6,
    popular: true,
    image: "https://images.unsplash.com/photo-1584995093695-7f0f23e97960?&w=300&h=300&fit=crop"
  },
  {
    id: 5,
    name: "کرم ضد آفتاب SPF50",
    description: "محافظت کامل از پوست در برابر اشعه UV",
    price: 150000,
    category: "پوست",
    rating: 4.9,
    popular: true,
    image: "https://images.unsplash.com/photo-1591622772708-72a63c7465c6?&w=300&h=300&fit=crop"
  },
  {
    id: 6,
    name: "ماسک مو تغذیه‌کننده",
    description: "بازسازی و تقویت موهای خشک و آسیب‌دیده",
    price: 90000,
    category: "مو",
    rating: 4.4,
    popular: false,
    image: "https://images.unsplash.com/photo-1600180758868-f603f48e625d?&w=300&h=300&fit=crop"
  },
  {
    id: 7,
    name: "رژ گونه طبیعی",
    description: "رژ گونه با رنگ طبیعی و ماندگاری طولانی",
    price: 75000,
    category: "لب",
    rating: 4.2,
    popular: false,
    image: "https://images.unsplash.com/photo-1597547479480-3c0d02cb0de5?&w=300&h=300&fit=crop"
  },
  {
    id: 8,
    name: "سرم ضد پیری",
    description: "کاهش چین و چروک و افزایش نرمی پوست",
    price: 180000,
    category: "پوست",
    rating: 4.7,
    popular: true,
    image: "https://images.unsplash.com/photo-1600180758901-b7aa4f62e569?&w=300&h=300&fit=crop"
  },
  {
    id: 9,
    name: "شامپو تقویت‌کننده مو",
    description: "شامپویی مناسب برای موهای ضعیف و شکننده",
    price: 85000,
    category: "مو",
    rating: 4.3,
    popular: true,
    image: "https://images.unsplash.com/photo-1600180758885-4e8a8c6d6b2e?&w=300&h=300&fit=crop"
  },
  {
    id: 10,
    name: "سایه چشم دوتایی",
    description: "سایه‌ای نرم با رنگ‌های هماهنگ و زیبا",
    price: 70000,
    category: "چشم",
    rating: 4.5,
    popular: false,
    image: "https://images.unsplash.com/photo-1588776814515-4d6a0f9b8b4e?&w=300&h=300&fit=crop"
  },
  // محصولات جدید اضافه شده
  {
    id: 11,
    name: "رژ لب صورتی شاین",
    description: "رژ لب با رنگ روشن و درخشان",
    price: 130000,
    category: "لب",
    rating: 4.6,
    popular: true,
    image: "https://images.unsplash.com/photo-1600180758924-6e6a8c8b4c2e?&w=300&h=300&fit=crop"
  },
  {
    id: 12,
    name: "اسکراب صورت",
    description: "لایه‌بردار و روشن‌کننده پوست",
    price: 90000,
    category: "پوست",
    rating: 4.5,
    popular: true,
    image: "https://images.unsplash.com/photo-1600180758906-7b7a8c7d5e4f?&w=300&h=300&fit=crop"
  },
  {
    id: 13,
    name: "ریمل مشکی ضد آب",
    description: "ریملی مقاوم در برابر آب با حجم‌دهی عالی",
    price: 85000,
    category: "چشم",
    rating: 4.7,
    popular: true,
    image: "https://images.unsplash.com/photo-1600180758911-6e6a8b7c5d2e?&w=300&h=300&fit=crop"
  },
  {
    id: 14,
    name: "ماسک صورت آبرسان",
    description: "ماسکی نرم‌کننده و آبرسان برای انواع پوست",
    price: 95000,
    category: "پوست",
    rating: 4.8,
    popular: true,
    image: "https://images.unsplash.com/photo-1600180758915-7f6a8d7b5e4c?&w=300&h=300&fit=crop"
  },
  {
    id: 15,
    name: "لاک ناخن قرمز کلاسیک",
    description: "لاک با رنگ شفاف و ماندگاری بالا",
    price: 60000,
    category: "لب",
    rating: 4.3,
    popular: false,
    image: "https://images.unsplash.com/photo-1600180758919-6e6a8f7b5c4e?&w=300&h=300&fit=crop"
  }
];

export default products;
