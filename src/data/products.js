const products = [
  {
    id: 1,
    name: "رژ لب قرمز کلاسیک",
    description: "رژ لب با ماندگاری بالا و رنگ زیبا",
    price: 120000,
    category: "لب",
    rating: 4.8,
    popular: true,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 2,
    name: "کرم مرطوب‌کننده پوست",
    description: "نرم‌کننده و آبرسان پوست خشک و حساس",
    price: 95000,
    category: "پوست",
    rating: 4.5,
    popular: true,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 3,
    name: "ریمل حجم‌دهنده",
    description: "ریملی مقاوم در برابر آب با حجم‌دهی عالی",
    price: 80000,
    category: "چشم",
    rating: 4.3,
    popular: false,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 4,
    name: "خط چشم مشکی",
    description: "خط چشمی روان و با دوام بالا",
    price: 60000,
    category: "چشم",
    rating: 4.6,
    popular: true,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 5,
    name: "کرم ضد آفتاب SPF50",
    description: "محافظت کامل از پوست در برابر اشعه UV",
    price: 150000,
    category: "پوست",
    rating: 4.9,
    popular: true,
    image: "https://images.unsplash.com/photo-1556228574443-f4be0a69df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 6,
    name: "ماسک مو تغذیه‌کننده",
    description: "بازسازی و تقویت موهای خشک و آسیب‌دیده",
    price: 90000,
    category: "مو",
    rating: 4.4,
    popular: false,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 7,
    name: "رژ گونه طبیعی",
    description: "رژ گونه با رنگ طبیعی و ماندگاری طولانی",
    price: 75000,
    category: "لب",
    rating: 4.2,
    popular: false,
    image: "https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 8,
    name: "سرم ضد پیری",
    description: "کاهش چین و چروک و افزایش نرمی پوست",
    price: 180000,
    category: "پوست",
    rating: 4.7,
    popular: true,
    image: "https://images.unsplash.com/photo-1556228574358-9a6b6b6f5b5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 9,
    name: "شامپو تقویت‌کننده مو",
    description: "شامپویی مناسب برای موهای ضعیف و شکننده",
    price: 85000,
    category: "مو",
    rating: 4.3,
    popular: true,
    image: "https://images.unsplash.com/photo-1556228574359-2d0b9c3d36f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 10,
    name: "سایه چشم دوتایی",
    description: "سایه‌ای نرم با رنگ‌های هماهنگ و زیبا",
    price: 70000,
    category: "چشم",
    rating: 4.5,
    popular: false,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 11,
    name: "رژ لب صورتی شاین",
    description: "رژ لب با رنگ روشن و درخشان",
    price: 130000,
    category: "لب",
    rating: 4.6,
    popular: true,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 12,
    name: "اسکراب صورت",
    description: "لایه‌بردار و روشن‌کننده پوست",
    price: 90000,
    category: "پوست",
    rating: 4.5,
    popular: true,
    image: "https://images.unsplash.com/photo-1556228574103-2f2c6f6f5b5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 13,
    name: "ریمل مشکی ضد آب",
    description: "ریملی مقاوم در برابر آب با حجم‌دهی عالی",
    price: 85000,
    category: "چشم",
    rating: 4.7,
    popular: true,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 14,
    name: "ماسک صورت آبرسان",
    description: "ماسکی نرم‌کننده و آبرسان برای انواع پوست",
    price: 95000,
    category: "پوست",
    rating: 4.8,
    popular: true,
    image: "https://images.unsplash.com/photo-1556228574358-9a6b6b6f5b5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 15,
    name: "لاک ناخن قرمز کلاسیک",
    description: "لاک با رنگ شفاف و ماندگاری بالا",
    price: 60000,
    category: "ناخن",
    rating: 4.3,
    popular: false,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  },
  {
    id: 16,
    name: "پنکیک پودری مات",
    description: "پودری سبک با پوشش عالی و ماندگاری بالا",
    price: 110000,
    category: "پوست",
    rating: 4.6,
    popular: true,
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
  }
];

export default products;