import { Service, Partner, VIPPlan } from './types';

export const SERVICES: Service[] = [
  {
    id: 'villa-deep-clean',
    name: { en: 'Villa Deep Clean', ar: 'تنظيف عميق للفيلا' },
    description: { 
      en: 'Professional deep cleaning for luxury villas by expert staff.', 
      ar: 'تنظيف عميق احترافي للفلل الفاخرة من قبل طاقم خبير.' 
    },
    price: 350,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'car-detailing',
    name: { en: 'Car Detailing', ar: 'تلميع السيارات' },
    description: { 
      en: 'Premium interior and exterior detailing at your doorstep.', 
      ar: 'تلميع داخلي وخارجي متميز عند باب منزلك.' 
    },
    price: 180,
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'personal-chef',
    name: { en: 'Personal Chef (Dinner)', ar: 'شيف شخصي (عشاء)' },
    description: { 
      en: 'Gourmet dining experience prepared in your own kitchen.', 
      ar: 'تجربة طعام فاخرة يتم تحضيرها في مطبخك الخاص.' 
    },
    price: 750,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pets-grooming',
    name: { en: 'Pets Grooming', ar: 'تجميل الحيوانات الأليفة' },
    description: { 
      en: 'Professional grooming for your pets at home.', 
      ar: 'تجميل احترافي لحيواناتك الأليفة في المنزل.' 
    },
    price: 250,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nurse-on-call',
    name: { en: 'Nurse on Call', ar: 'ممرضة عند الطلب' },
    description: { 
      en: 'Qualified nursing care in the comfort of your home.', 
      ar: 'رعاية تمريضية مؤهلة في راحة منزلك.' 
    },
    price: 500,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'doctor-on-call',
    name: { en: 'Doctor on Call', ar: 'طبيب عند الطلب' },
    description: { 
      en: 'Expert medical consultation at your doorstep.', 
      ar: 'استشارة طبية خبيرة عند باب منزلك.' 
    },
    price: 800,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nanny-services',
    name: { en: 'Nanny Services', ar: 'خدمات مربية' },
    description: { 
      en: 'Professional and caring childcare for your little ones.', 
      ar: 'رعاية أطفال احترافية وحنونة لصغارك.' 
    },
    price: 400,
    image: 'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'salon-services',
    name: { en: 'Salon Services', ar: 'خدمات الصالون' },
    description: { 
      en: 'Premium hair, nails, and beauty treatments at home.', 
      ar: 'علاجات الشعر والأظافر والتجميل المتميزة في المنزل.' 
    },
    price: 300,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'
  }
];

export const PARTNERS: Partner[] = [
  {
    id: 'uber',
    name: 'Uber UAE',
    description: { en: 'Premium rides across the Emirates.', ar: 'رحلات فاخرة في جميع أنحاء الإمارات.' },
    url: 'https://www.uber.com/ae',
    category: 'rides'
  },
  {
    id: 'careem',
    name: 'Careem',
    description: { en: 'The region\'s everyday super app.', ar: 'تطبيق المنطقة اليومي الفائق.' },
    url: 'https://www.careem.com',
    category: 'rides'
  },
  {
    id: 'noon',
    name: 'Noon',
    description: { en: 'Local marketplace for everything you need.', ar: 'سوق محلي لكل ما تحتاجه.' },
    url: 'https://www.noon.com',
    category: 'shopping'
  },
  {
    id: 'amazon',
    name: 'Amazon UAE',
    description: { en: 'Global shopping experience in the UAE.', ar: 'تجربة تسوق عالمية في الإمارات.' },
    url: 'https://www.amazon.ae',
    category: 'shopping'
  },
  {
    id: 'deliveroo',
    name: 'Deliveroo',
    description: { en: 'Great food delivered to your door.', ar: 'طعام رائع يصل إلى باب منزلك.' },
    url: 'https://www.deliveroo.ae',
    category: 'food'
  },
  {
    id: 'talabat',
    name: 'Talabat',
    description: { en: 'Order food and groceries online.', ar: 'اطلب الطعام والبقالة عبر الإنترنت.' },
    url: 'https://www.talabat.com',
    category: 'food'
  },
  {
    id: 'vox-cinemas',
    name: 'VOX Cinemas',
    description: { en: 'The Middle East\'s most innovative cinema.', ar: 'السينما الأكثر ابتكاراً في الشرق الأوسط.' },
    url: 'https://uae.voxcinemas.com',
    category: 'cinemas'
  },
  {
    id: 'reel-cinemas',
    name: 'Reel Cinemas',
    description: { en: 'Experience world-class cinema in Dubai.', ar: 'تجربة سينما عالمية المستوى في دبي.' },
    url: 'https://reelcinemas.com',
    category: 'cinemas'
  },
  {
    id: 'roxy-cinemas',
    name: 'Roxy Cinemas',
    description: { en: 'Boutique cinema experience.', ar: 'تجربة سينما بوتيك.' },
    url: 'https://www.theroxycinemas.com',
    category: 'cinemas'
  },
  {
    id: 'novo-cinemas',
    name: 'Novo Cinemas',
    description: { en: 'A great time out.', ar: 'وقت رائع بالخارج.' },
    url: 'https://uae.novocinemas.com',
    category: 'cinemas'
  },
  {
    id: 'booking-com',
    name: 'Booking.com',
    description: { en: 'Find deals on hotels, homes, and much more.', ar: 'اعثر على عروض على الفنادق والمنازل وأكثر من ذلك بكثير.' },
    url: 'https://www.booking.com',
    category: 'hotels'
  },
  {
    id: 'expedia',
    name: 'Expedia',
    description: { en: 'Plan your next trip with ease.', ar: 'خطط لرحلتك القادمة بسهولة.' },
    url: 'https://www.expedia.com',
    category: 'hotels'
  },
  {
    id: 'hotels-com',
    name: 'Hotels.com',
    description: { en: 'Book your perfect stay.', ar: 'احجز إقامتك المثالية.' },
    url: 'https://www.hotels.com',
    category: 'hotels'
  },
  {
    id: 'agoda',
    name: 'Agoda',
    description: { en: 'Best price guarantee on hotels.', ar: 'ضمان أفضل الأسعار على الفنادق.' },
    url: 'https://www.agoda.com',
    category: 'hotels'
  },
  {
    id: 'marriott',
    name: 'Marriott Bonvoy',
    description: { en: 'Luxury hotel stays worldwide.', ar: 'إقامات فندقية فاخرة في جميع أنحاء العالم.' },
    url: 'https://www.marriott.com',
    category: 'hotels'
  },
  {
    id: 'emirates',
    name: 'Emirates',
    description: { en: 'Fly better with Emirates.', ar: 'سافر بتميز مع طيران الإمارات.' },
    url: 'https://www.emirates.com',
    category: 'flights'
  },
  {
    id: 'etihad',
    name: 'Etihad Airways',
    description: { en: 'Choose well with Etihad.', ar: 'اختر الأفضل مع الاتحاد للطيران.' },
    url: 'https://www.etihad.com',
    category: 'flights'
  },
  {
    id: 'flydubai',
    name: 'flydubai',
    description: { en: 'Fly to more places for less.', ar: 'سافر إلى أماكن أكثر بتكلفة أقل.' },
    url: 'https://www.flydubai.com',
    category: 'flights'
  },
  {
    id: 'qatar-airways',
    name: 'Qatar Airways',
    description: { en: 'Going places together.', ar: 'نذهب إلى الأماكن معاً.' },
    url: 'https://www.qatarairways.com',
    category: 'flights'
  },
  {
    id: 'skyscanner',
    name: 'Skyscanner',
    description: { en: 'Compare cheap flights from thousands of airlines.', ar: 'قارن الرحلات الجوية الرخيصة من آلاف شركات الطيران.' },
    url: 'https://www.skyscanner.com',
    category: 'flights'
  },
  {
    id: 'wego',
    name: 'Wego',
    description: { en: 'Search and compare flights and hotels.', ar: 'ابحث وقارن بين الرحلات الجوية والفنادق.' },
    url: 'https://www.wego.ae',
    category: 'flights'
  },
  {
    id: 'nol-recharge',
    name: 'Nol Card Recharge',
    description: { en: 'Top up your Dubai Nol card instantly.', ar: 'اشحن بطاقة نول دبي الخاصة بك على الفور.' },
    url: 'https://www.rta.ae/wps/portal/rta/ae/public-transport/nol/topup',
    category: 'transport'
  },
  {
    id: 'hafilat-recharge',
    name: 'Hafilat Card Recharge',
    description: { en: 'Recharge your Abu Dhabi Hafilat card.', ar: 'اشحن بطاقة حافلات أبوظبي الخاصة بك.' },
    url: 'https://hafilat.darbi.ae/',
    category: 'transport'
  },
  {
    id: 'burj-khalifa',
    name: 'Burj Khalifa',
    description: { en: 'Visit the world\'s tallest building.', ar: 'قم بزيارة أطول مبنى في العالم.' },
    url: 'https://www.burjkhalifa.ae',
    category: 'attractions'
  },
  {
    id: 'museum-of-future',
    name: 'Museum of the Future',
    description: { en: 'Explore the future of humanity.', ar: 'استكشف مستقبل البشرية.' },
    url: 'https://museumofthefuture.ae',
    category: 'attractions'
  },
  {
    id: 'ferrari-world',
    name: 'Ferrari World',
    description: { en: 'World\'s first Ferrari-branded theme park.', ar: 'أول مدينة ترفيهية تحمل علامة فيراري في العالم.' },
    url: 'https://www.ferrariworldabudhabi.com',
    category: 'attractions'
  },
  {
    id: 'louvre-abudhabi',
    name: 'Louvre Abu Dhabi',
    description: { en: 'A universal museum in the Arab world.', ar: 'متحف عالمي في العالم العربي.' },
    url: 'https://www.louvreabudhabi.ae',
    category: 'attractions'
  },
  {
    id: 'warner-bros',
    name: 'Warner Bros. World',
    description: { en: 'Immersive indoor theme park.', ar: 'مدينة ترفيهية داخلية غامرة.' },
    url: 'https://www.wbworldabudhabi.com',
    category: 'attractions'
  },
  {
    id: 'global-village',
    name: 'Global Village',
    description: { en: 'Multi-cultural festival park.', ar: 'منتزه المهرجانات متعدد الثقافات.' },
    url: 'https://www.globalvillage.ae',
    category: 'attractions'
  },
  {
    id: 'miracle-garden',
    name: 'Dubai Miracle Garden',
    description: { en: 'The world\'s largest natural flower garden.', ar: 'أكبر حديقة زهور طبيعية في العالم.' },
    url: 'https://www.dubaimiraclegarden.com',
    category: 'attractions'
  }
];

export const VIP_PLANS: VIPPlan[] = [
  {
    id: 'standard',
    name: { en: 'Standard', ar: 'عادي' },
    price: { en: 'Free', ar: 'مجاني' },
    benefits: { 
      en: ['Basic concierge access', 'Standard booking'], 
      ar: ['وصول أساسي للكونسيرج', 'حجز عادي'] 
    },
    color: 'border-white/10'
  },
  {
    id: 'gold',
    name: { en: 'Gold', ar: 'ذهبي' },
    price: { en: 'AED 99/mo', ar: '99 درهم/شهرياً' },
    benefits: { 
      en: ['Priority booking', '10% off all services', 'WhatsApp concierge'], 
      ar: ['أولوية الحجز', 'خصم 10% على جميع الخدمات', 'كونسيرج عبر واتساب'] 
    },
    color: 'border-gold'
  },
  {
    id: 'platinum',
    name: { en: 'Platinum', ar: 'بلاتيني' },
    price: { en: 'AED 299/mo', ar: '299 درهم/شهرياً' },
    benefits: { 
      en: ['Everything in Gold', 'Personal account manager', 'Exclusive deals'], 
      ar: ['كل ما في الباقة الذهبية', 'مدير حساب شخصي', 'عروض حصرية'] 
    },
    color: 'border-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]'
  }
];

export const TRANSLATIONS = {
  en: {
    title: 'LUX',
    home: 'Home',
    services: 'Services',
    lifestyle: 'Lifestyle',
    vip: 'VIP',
    greeting: 'Hello, Guest',
    myConcierge: 'My Concierge',
    ourServices: 'Our Services',
    getAnything: 'Get Anything',
    nakheelVip: 'LUX VIP',
    bookService: 'Book a Service',
    orderFood: 'Order Food',
    getRide: 'Get a Ride',
    shop: 'Shop',
    featured: 'Featured Luxury',
    bookNow: 'Book Now',
    joinNow: 'Join Now',
    name: 'Full Name',
    phone: 'WhatsApp Number',
    address: 'Address',
    date: 'Date',
    time: 'Time',
    confirmBooking: 'Confirm Booking',
    summary: 'Booking Summary',
    confirmWhatsApp: 'Confirm via WhatsApp',
    success: 'Booking Received!',
    back: 'Back',
    admin: 'Admin',
    aed: 'AED',
    switchLang: 'العربية',
    rides: 'Rides',
    shopping: 'Shopping',
    food: 'Food',
    cinemas: 'Cinemas',
    hotels: 'Hotels',
    flights: 'Flights',
    transport: 'Transport',
    attractions: 'Attractions',
    benefits: 'Benefits',
    total: 'Total'
  },
  ar: {
    title: 'لوكس',
    home: 'الرئيسية',
    services: 'الخدمات',
    lifestyle: 'نمط الحياة',
    vip: 'VIP',
    greeting: 'مرحباً، ضيفنا',
    myConcierge: 'الكونسيرج الخاص بي',
    ourServices: 'خدماتنا',
    getAnything: 'احصل على أي شيء',
    nakheelVip: 'لوكس VIP',
    bookService: 'احجز خدمة',
    orderFood: 'اطلب طعاماً',
    getRide: 'احصل على رحلة',
    shop: 'تسوق',
    featured: 'تميز فاخر',
    bookNow: 'احجز الآن',
    joinNow: 'انضم الآن',
    name: 'الاسم الكامل',
    phone: 'رقم الواتساب',
    address: 'العنوان',
    date: 'التاريخ',
    time: 'الوقت',
    confirmBooking: 'تأكيد الحجز',
    summary: 'ملخص الحجز',
    confirmWhatsApp: 'تأكيد عبر واتساب',
    success: 'تم استلام الحجز!',
    back: 'رجوع',
    admin: 'المسؤول',
    aed: 'درهم',
    switchLang: 'English',
    rides: 'المواصلات',
    shopping: 'التسوق',
    food: 'الطعام',
    cinemas: 'السينما',
    hotels: 'الفنادق',
    flights: 'الرحلات الجوية',
    transport: 'المواصلات العامة',
    attractions: 'المعالم السياحية',
    benefits: 'المميزات',
    total: 'الإجمالي'
  }
};
