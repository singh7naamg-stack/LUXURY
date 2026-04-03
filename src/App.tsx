/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home,
  Briefcase,
  Globe,
  Crown,
  LayoutDashboard,
  LogOut,
  Trash2,
  ChevronRight,
  Phone,
  CheckCircle2,
  ExternalLink,
  Car,
  ShoppingBag,
  Utensils,
  Plus,
  Film,
  Hotel,
  Plane,
  Ticket,
  Bus
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  Timestamp,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { db, auth } from './firebase';
import { SERVICES, TRANSLATIONS, PARTNERS, VIP_PLANS } from './constants';
import { Service, Booking, Language, Tab, Partner, VIPPlan } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [view, setView] = useState<'main' | 'booking' | 'confirmation' | 'admin'>('main');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: ''
  });
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (view === 'admin' && user?.email === 'singh7naamg@gmail.com') {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];
        setBookings(data);
      }, (error) => {
        console.error("Firestore Error: ", error);
      });
      return () => unsubscribe();
    }
  }, [view, user]);

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setView('booking');
    window.scrollTo(0, 0);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    setIsSubmitting(true);
    try {
      const newBooking: Omit<Booking, 'id'> = {
        ...bookingData,
        serviceId: selectedService.id,
        serviceName: selectedService.name.en,
        totalPrice: selectedService.price,
        status: 'pending',
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'bookings'), newBooking);
      setLastBooking({ id: docRef.id, ...newBooking });
      setView('confirmation');
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppConfirm = () => {
    if (!lastBooking || !selectedService) return;
    const businessNumber = '+971500000000'; // Placeholder
    const message = `Hello LUX! I'd like to confirm my booking:
- Service: ${selectedService.name[lang]}
- Name: ${lastBooking.name}
- Date: ${lastBooking.date}
- Time: ${lastBooking.time}
- Address: ${lastBooking.address}
- Total: ${lastBooking.totalPrice} AED`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${businessNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const TabButton = ({ tab, icon: Icon, label }: { tab: Tab, icon: any, label: string }) => (
    <button 
      onClick={() => { setActiveTab(tab); setView('main'); }}
      className={cn(
        "flex flex-col items-center gap-1 py-2 px-4 transition-all",
        activeTab === tab ? "text-gold" : "text-gray-500 hover:text-gray-300"
      )}
    >
      <Icon size={20} className={cn(activeTab === tab && "scale-110")} />
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );

  return (
    <div className={cn("min-h-screen flex flex-col bg-luxury-black pb-24", isRTL ? "font-arabic" : "font-sans")} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-luxury-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="text-2xl font-bold gold-text-gradient cursor-pointer tracking-[0.2em]"
            onClick={() => { setActiveTab('home'); setView('main'); }}
          >
            {t.title}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-xs font-bold text-gray-400 hover:text-gold transition-colors border border-white/10 px-3 py-1 rounded-full"
            >
              {t.switchLang}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                {user.email === 'singh7naamg@gmail.com' && (
                  <button 
                    onClick={() => setView(view === 'admin' ? 'main' : 'admin')}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      view === 'admin' ? "bg-gold text-black" : "text-gray-400 hover:text-gold"
                    )}
                  >
                    <LayoutDashboard size={18} />
                  </button>
                )}
                <button 
                  onClick={() => signOut(auth)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="text-xs font-bold text-black bg-gold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view === 'main' && (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-7xl mx-auto px-6 py-8"
            >
              {activeTab === 'home' && (
                <div className="space-y-8">
                  <div className="space-y-1">
                    <p className="text-gold font-bold text-xs uppercase tracking-widest">
                      {user ? `${isRTL ? 'مرحباً،' : 'Hello,'} ${user.displayName?.split(' ')[0]}` : t.greeting}
                    </p>
                    <h1 className="text-3xl font-bold">{t.myConcierge}</h1>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 gap-4">
                    {[
                      { icon: Briefcase, label: t.bookService, tab: 'services' },
                      { icon: Utensils, label: t.orderFood, tab: 'lifestyle' },
                      { icon: Car, label: t.getRide, tab: 'lifestyle' },
                      { icon: ShoppingBag, label: t.shop, tab: 'lifestyle' },
                      { icon: Film, label: t.cinemas, tab: 'lifestyle' },
                      { icon: Hotel, label: t.hotels, tab: 'lifestyle' },
                      { icon: Plane, label: t.flights, tab: 'lifestyle' },
                      { icon: Ticket, label: t.attractions, tab: 'lifestyle' },
                      { icon: Bus, label: t.transport, tab: 'lifestyle' }
                    ].map((action, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveTab(action.tab as Tab)}
                        className="bg-luxury-gray p-6 rounded-2xl border border-white/5 flex flex-col items-center gap-3 hover:border-gold/30 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                          <action.icon size={20} className="text-gold" />
                        </div>
                        <span className="text-xs font-bold text-center">{action.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Featured Banner */}
                  <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer" onClick={() => setActiveTab('services')}>
                    <img 
                      src={SERVICES[0].image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-gold font-bold text-xs uppercase tracking-widest mb-2">{t.featured}</p>
                      <h2 className="text-2xl font-bold mb-4">{SERVICES[0].name[lang]}</h2>
                      <div className="inline-flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-full font-bold text-xs">
                        {t.bookNow} <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Travel Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">{isRTL ? 'خطط لرحلتك' : 'Plan Your Journey'}</h2>
                      <button 
                        onClick={() => setActiveTab('lifestyle')}
                        className="text-gold text-xs font-bold uppercase tracking-widest hover:underline"
                      >
                        {isRTL ? 'عرض الكل' : 'View All'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        onClick={() => setActiveTab('lifestyle')}
                        className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <Hotel className="text-gold mx-auto mb-2" size={32} />
                            <h3 className="text-xl font-bold">{t.hotels}</h3>
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={() => setActiveTab('lifestyle')}
                        className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&q=80&w=800" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <Plane className="text-gold mx-auto mb-2" size={32} />
                            <h3 className="text-xl font-bold">{t.flights}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attractions Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">{isRTL ? 'استكشف المعالم' : 'Explore Attractions'}</h2>
                      <button 
                        onClick={() => setActiveTab('lifestyle')}
                        className="text-gold text-xs font-bold uppercase tracking-widest hover:underline"
                      >
                        {isRTL ? 'عرض الكل' : 'View All'}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: isRTL ? 'برج خليفة' : 'Burj Khalifa', img: 'https://images.unsplash.com/photo-1526495124232-a02e18494d17?auto=format&fit=crop&q=80&w=400' },
                        { name: isRTL ? 'متحف المستقبل' : 'Museum of Future', img: 'https://images.unsplash.com/photo-1649154435163-441f7e3666f7?auto=format&fit=crop&q=80&w=400' },
                        { name: isRTL ? 'متحف اللوفر' : 'Louvre Abu Dhabi', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=400' },
                        { name: isRTL ? 'عالم فيراري' : 'Ferrari World', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400' }
                      ].map((attr, i) => (
                        <div 
                          key={i}
                          onClick={() => setActiveTab('lifestyle')}
                          className="relative h-32 rounded-2xl overflow-hidden group cursor-pointer"
                        >
                          <img 
                            src={attr.img} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center p-2">
                            <h3 className="text-xs font-bold text-center">{attr.name}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-8">
                  <h1 className="text-3xl font-bold">{t.ourServices}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service) => (
                      <div key={service.id} className="bg-luxury-gray rounded-2xl border border-white/5 overflow-hidden flex flex-col">
                        <div className="h-48 overflow-hidden">
                          <img src={service.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">{service.name[lang]}</h3>
                            <span className="text-gold font-bold">{service.price} {t.aed}</span>
                          </div>
                          <p className="text-gray-400 text-sm mb-6 flex-grow">{service.description[lang]}</p>
                          <button 
                            onClick={() => handleBookNow(service)}
                            className="w-full py-3 rounded-xl gold-gradient text-black font-bold text-sm hover:opacity-90 transition-opacity"
                          >
                            {t.bookNow}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'lifestyle' && (
                <div className="space-y-12">
                  <h1 className="text-3xl font-bold">{t.getAnything}</h1>
                  
                  {[
                    { title: t.rides, icon: Car, category: 'rides' },
                    { title: t.shopping, icon: ShoppingBag, category: 'shopping' },
                    { title: t.food, icon: Utensils, category: 'food' },
                    { title: t.cinemas, icon: Film, category: 'cinemas' },
                    { title: t.hotels, icon: Hotel, category: 'hotels' },
                    { title: t.flights, icon: Plane, category: 'flights' },
                    { title: t.attractions, icon: Ticket, category: 'attractions' },
                    { title: t.transport, icon: Bus, category: 'transport' }
                  ].map((section) => (
                    <div key={section.category} className="space-y-4">
                      <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                        <section.icon size={18} className="text-gold" />
                        <h2 className="text-lg font-bold uppercase tracking-widest">{section.title}</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PARTNERS.filter(p => p.category === section.category).map(partner => (
                          <a 
                            key={partner.id}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-luxury-gray p-6 rounded-2xl border border-white/5 flex justify-between items-center hover:border-gold/30 transition-all group"
                          >
                            <div>
                              <h3 className="font-bold mb-1">{partner.name}</h3>
                              <p className="text-xs text-gray-500">{partner.description[lang]}</p>
                            </div>
                            <ExternalLink size={16} className="text-gray-600 group-hover:text-gold transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'vip' && (
                <div className="space-y-8">
                  <h1 className="text-3xl font-bold">{t.nakheelVip}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {VIP_PLANS.map((plan) => (
                      <div 
                        key={plan.id} 
                        className={cn(
                          "bg-luxury-gray rounded-3xl p-8 border flex flex-col relative overflow-hidden",
                          plan.color
                        )}
                      >
                        {plan.id === 'platinum' && (
                          <div className="absolute top-4 right-4">
                            <Crown size={24} className="text-gold" />
                          </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2">{plan.name[lang]}</h3>
                        <p className="text-gold font-bold text-xl mb-8">{plan.price[lang]}</p>
                        
                        <div className="space-y-4 mb-12 flex-grow">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.benefits}</p>
                          {plan.benefits[lang].map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm">
                              <CheckCircle2 size={16} className="text-gold mt-0.5 shrink-0" />
                              <span className="text-gray-300">{benefit}</span>
                            </div>
                          ))}
                        </div>

                        <button className={cn(
                          "w-full py-4 rounded-xl font-bold transition-all",
                          plan.id === 'standard' ? "bg-white/5 text-white hover:bg-white/10" : "gold-gradient text-black hover:opacity-90"
                        )}>
                          {t.joinNow}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {view === 'booking' && selectedService && (
            <motion.div 
              key="booking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto px-6 py-12"
            >
              <button 
                onClick={() => setView('main')}
                className="text-gray-400 hover:text-white mb-8 flex items-center gap-2"
              >
                <ChevronRight className={cn(isRTL ? "" : "rotate-180")} size={18} />
                {t.back}
              </button>

              <div className="bg-luxury-gray rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden">
                    <img src={selectedService.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedService.name[lang]}</h2>
                    <p className="text-gold font-bold">{selectedService.price} {t.aed}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.name}</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-luxury-black border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.phone}</label>
                    <input 
                      required
                      type="tel"
                      placeholder="+971"
                      className="w-full bg-luxury-black border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.address}</label>
                    <textarea 
                      required
                      rows={3}
                      className="w-full bg-luxury-black border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
                      value={bookingData.address}
                      onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.date}</label>
                      <input 
                        required
                        type="date"
                        className="w-full bg-luxury-black border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t.time}</label>
                      <input 
                        required
                        type="time"
                        className="w-full bg-luxury-black border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 rounded-xl gold-gradient text-black font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? '...' : t.confirmBooking}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {view === 'confirmation' && lastBooking && (
            <motion.div 
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto px-6 py-20 text-center"
            >
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} className="text-gold" />
              </div>
              <h1 className="text-3xl font-bold mb-4">{t.success}</h1>
              
              <div className="bg-luxury-gray rounded-3xl p-8 border border-white/10 text-left mb-12" dir={isRTL ? 'rtl' : 'ltr'}>
                <h3 className="text-lg font-bold mb-6 border-b border-white/5 pb-4">{t.summary}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.name}</span>
                    <span className="font-medium">{lastBooking.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.date}</span>
                    <span className="font-medium">{lastBooking.date} @ {lastBooking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">{t.total}</span>
                    <span className="text-gold font-bold">{lastBooking.totalPrice} {t.aed}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleWhatsAppConfirm}
                  className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Phone size={20} />
                  {t.confirmWhatsApp}
                </button>
                <button 
                  onClick={() => setView('main')}
                  className="w-full py-4 rounded-xl border border-white/10 text-gray-400 font-bold hover:text-white transition-colors"
                >
                  {t.back}
                </button>
              </div>
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div 
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-7xl mx-auto px-6 py-12"
            >
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t.admin}</h1>
                {user && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{user.email}</span>
                    <button 
                      onClick={() => signOut(auth)}
                      className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                )}
              </div>

              {user?.email === 'singh7naamg@gmail.com' ? (
                <div className="bg-luxury-gray rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-luxury-black border-b border-white/10">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Service</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">WhatsApp</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Schedule</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {bookings.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No bookings found.</td>
                          </tr>
                        ) : (
                          bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 font-medium">{booking.serviceName}</td>
                              <td className="px-6 py-4">{booking.name}</td>
                              <td className="px-6 py-4 text-gray-400">{booking.phone}</td>
                              <td className="px-6 py-4 text-sm">
                                {booking.date}<br/>
                                <span className="text-gray-500">{booking.time}</span>
                              </td>
                              <td className="px-6 py-4">
                                <select 
                                  value={booking.status}
                                  onChange={(e) => updateDoc(doc(db, 'bookings', booking.id!), { status: e.target.value })}
                                  className={cn(
                                    "bg-transparent border-none outline-none text-xs font-bold uppercase tracking-widest",
                                    booking.status === 'pending' && "text-yellow-500",
                                    booking.status === 'confirmed' && "text-blue-500",
                                    booking.status === 'completed' && "text-green-500",
                                    booking.status === 'cancelled' && "text-red-500"
                                  )}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="px-6 py-4">
                                <button 
                                  onClick={() => deleteDoc(doc(db, 'bookings', booking.id!))}
                                  className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 bg-luxury-gray rounded-2xl border border-white/10">
                  <p className="text-gray-500">Authorized admin access only.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      {view === 'main' && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-luxury-black/90 backdrop-blur-xl border-t border-white/10 px-4 pb-safe">
          <div className="max-w-xl mx-auto flex justify-between items-center">
            <TabButton tab="home" icon={Home} label={t.home} />
            <TabButton tab="services" icon={Briefcase} label={t.services} />
            <TabButton tab="lifestyle" icon={Globe} label={t.lifestyle} />
            <TabButton tab="vip" icon={Crown} label={t.vip} />
          </div>
        </nav>
      )}
    </div>
  );
}
