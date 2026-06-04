import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/کرم-مرطوب-کننده-پوست-خشک-امونی-50-میلی-لیتر.jpg';
import img3 from '../assets/images/images.jpeg';
import img4 from '../assets/images/مدل-خط-چشم-یونانی.jpg';
import img5 from '../assets/images/80669-00.jpg';
import img6 from '../assets/images/hair-mask.jpg';
import img7 from '../assets/images/IMG_3096.jpg';
import img8 from '../assets/images/retinol-anti-wrinkle-facial-serum-1.webp';
import img9 from '../assets/images/solamor-strengthening-shampoo-for-all-hair-250ml.darosite24-300x300.jpg';
import img10 from '../assets/images/مدل-سایه-چشم-گربه-ای؛-از-جمله-پرطرفدار-ترین-انواع-مدل-سایه-چشم.jpg';
import img11 from '../assets/images/FRANCIS-ULTRA-SHINE-LIP-GLOSS.jpg';
import img12 from '../assets/images/تصویر-شاخص-1.jpg';
import img13 from '../assets/images/ریمل-حجم-دهنده-فرچه-مویی-بل-کویین.jpg';
import img14 from '../assets/images/ae63803567eba460cdc11b5e448cfe22858702c0_1713550490.jpg';
import img15 from '../assets/images/red-nail-design-1.webp';
import img16 from '../assets/images/280x280.jpg';

const products = [
  {
    id: 1,
    name: "رژ لب قرمز کلاسیک",
    description: "رژ لب با ماندگاری بالا و رنگ زیبا",
    price: 120000,
    category: "لب",
    rating: 4.8,
    popular: true,
    image: img1
  },
  {
    id: 2,
    name: "کرم مرطوب‌کننده پوست",
    description: "نرم‌کننده و آبرسان پوست خشک و حساس",
    price: 95000,
    category: "پوست",
    rating: 4.5,
    popular: true,
    image: img2
  },
  {
    id: 3,
    name: "ریمل حجم‌دهنده",
    description: "ریملی مقاوم در برابر آب با حجم‌دهی عالی",
    price: 80000,
    category: "چشم",
    rating: 4.3,
    popular: false,
    image: img3
  },
  {
    id: 4,
    name: "خط چشم مشکی",
    description: "خط چشمی روان و با دوام بالا",
    price: 60000,
    category: "چشم",
    rating: 4.6,
    popular: true,
    image: img4
  },
  {
    id: 5,
    name: "کرم ضد آفتاب SPF50",
    description: "محافظت کامل از پوست در برابر اشعه UV",
    price: 150000,
    category: "پوست",
    rating: 4.9,
    popular: true,
    image: img5
  },
  {
    id: 6,
    name: "ماسک مو تغذیه‌کننده",
    description: "بازسازی و تقویت موهای خشک و آسیب‌دیده",
    price: 90000,
    category: "مو",
    rating: 4.4,
    popular: false,
    image: img6
  },
  {
    id: 7,
    name: "رژ گونه طبیعی",
    description: "رژ گونه با رنگ طبیعی و ماندگاری طولانی",
    price: 75000,
    category: "لب",
    rating: 4.2,
    popular: false,
    image: img7
  },
  {
    id: 8,
    name: "سرم ضد پیری",
    description: "کاهش چین و چروک و افزایش نرمی پوست",
    price: 180000,
    category: "پوست",
    rating: 4.7,
    popular: true,
    image: img8
  },
  {
    id: 9,
    name: "شامپو تقویت‌کننده مو",
    description: "شامپویی مناسب برای موهای ضعیف و شکننده",
    price: 85000,
    category: "مو",
    rating: 4.3,
    popular: true,
    image: img9
  },
  {
    id: 10,
    name: "سایه چشم دوتایی",
    description: "سایه‌ای نرم با رنگ‌های هماهنگ و زیبا",
    price: 70000,
    category: "چشم",
    rating: 4.5,
    popular: false,
    image: img10
  },
  {
    id: 11,
    name: "رژ لب صورتی شاین",
    description: "رژ لب با رنگ روشن و درخشان",
    price: 130000,
    category: "لب",
    rating: 4.6,
    popular: true,
    image: img11
  },
  {
    id: 12,
    name: "اسکراب صورت",
    description: "لایه‌بردار و روشن‌کننده پوست",
    price: 90000,
    category: "پوست",
    rating: 4.5,
    popular: true,
    image: img12
  },
  {
    id: 13,
    name: "ریمل مشکی ضد آب",
    description: "ریملی مقاوم در برابر آب با حجم‌دهی عالی",
    price: 85000,
    category: "چشم",
    rating: 4.7,
    popular: true,
    image: img13
  },
  {
    id: 14,
    name: "ماسک صورت آبرسان",
    description: "ماسکی نرم‌کننده و آبرسان برای انواع پوست",
    price: 95000,
    category: "پوست",
    rating: 4.8,
    popular: true,
    image: img14
  },
  {
    id: 15,
    name: "لاک ناخن قرمز کلاسیک",
    description: "لاک با رنگ شفاف و ماندگاری بالا",
    price: 60000,
    category: "ناخن",
    rating: 4.3,
    popular: false,
    image: img15
  },
  {
    id: 16,
    name: "پنکیک پودری مات",
    description: "پودری سبک با پوشش عالی و ماندگاری بالا",
    price: 110000,
    category: "پوست",
    rating: 4.6,
    popular: true,
    image: img16
  }
];

export default products;