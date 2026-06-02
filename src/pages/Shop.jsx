import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Filter, Star, Truck, ShieldCheck, RefreshCcw, ShoppingBag, Gift, Sparkles, Trash2, CreditCard } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [allProducts, setAllProducts] = useState([
    { id: 1, name: 'Peluche Bumsy Fox (XXL)', price: 29.99, category: 'Peluches', image: '/assets/banners/mercha.webp', color: 'bg-orange-50', rating: 5 },
    { id: 2, name: 'Camiseta Arcoíris Uni', price: 19.99, category: 'Ropa', image: '/assets/banners/mercha.webp', color: 'bg-pink-50', rating: 4 },
    { id: 3, name: 'Cuento: Aventuras en el Bosque', price: 14.99, category: 'Libros', image: '/assets/banners/books.webp', color: 'bg-green-50', rating: 5 },
    { id: 4, name: 'Mochila Tarta Turtle', price: 34.99, category: 'Accesorios', image: '/assets/banners/mercha.webp', color: 'bg-emerald-50', rating: 5 },
    { id: 5, name: 'Pack de Pegatinas Mágicas', price: 5.99, category: 'Accesorios', image: '/assets/banners/pintar.png', color: 'bg-yellow-50', rating: 4 },
    { id: 6, name: 'Gorra Pipo Penguin', price: 12.99, category: 'Ropa', image: '/assets/banners/mercha.webp', color: 'bg-blue-50', rating: 5 },
    { id: 7, name: 'Peluche Tarta Extra Suave', price: 24.99, category: 'Peluches', image: '/assets/banners/mercha.webp', color: 'bg-green-50', rating: 4 },
    { id: 8, name: 'Libro para Colorear Bumsy', price: 9.99, category: 'Libros', image: '/assets/banners/pintar.png', color: 'bg-purple-50', rating: 5 },
    
    // Regalos para Colorear (Especiales / Gratuitos)
    { id: 9, name: 'Coloreable Bubu Mágico', price: 0, category: 'Regalos', image: '/assets/ecommerce/bubu_portada.webp', isFree: true, downloadUrl: '/assets/ecommerce/bubu_portada.png', rating: 5 },
    { id: 10, name: 'Bumsy Word Search (Sopa de Letras)', price: 0, category: 'Regalos', image: '/assets/ecommerce/bumsy_word_01.webp', isFree: true, downloadUrl: '/assets/ecommerce/bumsy_word_01.png', rating: 5 },
    { id: 11, name: 'Coloreable Especial Flamy Colors', price: 0, category: 'Regalos', image: '/assets/ecommerce/flamy_colors.webp', isFree: true, downloadUrl: '/assets/ecommerce/flamy_colors.png', rating: 5 },
    { id: 12, name: 'Libro Portada Flamy y Amigos', price: 0, category: 'Regalos', image: '/assets/ecommerce/flamy_portada.webp', isFree: true, downloadUrl: '/assets/ecommerce/flamy_portada.png', rating: 5 },
    { id: 13, name: 'Coloreable Lola Unicornio', price: 0, category: 'Regalos', image: '/assets/ecommerce/lola_portada.webp', isFree: true, downloadUrl: '/assets/ecommerce/lola_portada.png', rating: 5 },
    { id: 14, name: 'Coloreable Pipa Portada 2', price: 0, category: 'Regalos', image: '/assets/ecommerce/pipa_portada_2.webp', isFree: true, downloadUrl: '/assets/ecommerce/pipa_portada_2.png', rating: 5 }
  ]);

  useSEO({
    title: 'Tienda Oficial',
    description: 'Llévate a casa la magia de Bumsy Town. Peluches, ropa, libros y accesorios oficiales de Bumsy y sus amigos.',
    image: '/assets/banners/mercha.webp'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [stockOverrides, setStockOverrides] = useState({});
  const [notification, setNotification] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart with localStorage so items are persisted beautifully
  useEffect(() => {
    const savedCart = localStorage.getItem('bumsy_shop_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('bumsy_shop_cart', JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    const updated = [...cart];
    const existing = updated.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      updated.push({ ...product, quantity: 1 });
    }
    saveCartToStorage(updated);
    setIsCartOpen(true);
    triggerNotification(`¡"${product.name}" añadido al carrito!`);
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCartToStorage(updated);
    triggerNotification('Producto removido del carrito.');
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const updated = cart.map((item) => (item.id === id ? { ...item, quantity } : item));
    saveCartToStorage(updated);
  };

  const handleProceedToCheckout = () => {
    if (cart.length > 0) {
      // Direct checkout for first item in cart
      localStorage.setItem('bumsy_checkout_redirect', JSON.stringify(cart[0]));
    }
    triggerNotification('¡Excelente! Redirigiéndote al portal seguro para completar tu compra...');
    setIsCartOpen(false);
    setTimeout(() => {
      window.location.href = '/crm';
    }, 1200);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    // Centralized CRM products database loading
    const savedProducts = localStorage.getItem('bumsy_crm_products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        const formatted = parsed.map(p => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          category: p.category,
          image: p.image,
          color: p.color || 'bg-slate-50',
          rating: p.rating || 5,
          isFree: p.isFree || Number(p.price) === 0 || p.category === 'Regalos',
          downloadUrl: p.pdfFile || p.downloadUrl
        }));
        setAllProducts(formatted);
      } catch (e) {
        console.error('Error parsing CRM products:', e);
      }
    } else {
      // Seed initial catalog if empty so both modules share the same database
      const defaultProducts = [
        { id: 1, name: 'Peluche Bumsy Fox (XXL)', price: 29.99, category: 'Peluches', image: '/assets/banners/mercha.webp', description: 'Peluche oficial gigante de Bumsy Fox, extra suave y perfecto para abrazar.', stock: 15, rating: 5, color: 'bg-orange-50' },
        { id: 2, name: 'Camiseta Arcoíris Uni', price: 19.99, category: 'Ropa', image: '/assets/banners/mercha.webp', description: 'Camiseta oficial con diseño de arcoíris de Bumsy Town. Algodón 100% orgánico.', stock: 8, rating: 4, color: 'bg-pink-50' },
        { id: 3, name: 'Cuento: Aventuras en el Bosque', price: 14.99, category: 'Libros', image: '/assets/banners/books.webp', description: 'El cuento oficial ilustrado que narra las divertidas aventuras de Bumsy y sus amigos.', stock: 20, rating: 5, color: 'bg-green-50' },
        { id: 4, name: 'Mochila Tarta Turtle', price: 34.99, category: 'Accesorios', image: '/assets/banners/mercha.webp', description: 'Mochila escolar resistente y colorida de Tarta Turtle con compartimentos especiales.', stock: 12, rating: 5, color: 'bg-emerald-50' },
        { id: 5, name: 'Pack de Pegatinas Mágicas', price: 5.99, category: 'Accesorios', image: '/assets/banners/pintar.png', description: 'Paquete de 50 pegatinas de vinilo resistentes al agua con todos los personajes.', stock: 50, rating: 4, color: 'bg-yellow-50' },
        { id: 6, name: 'Gorra Pipo Penguin', price: 12.99, category: 'Ropa', image: '/assets/banners/mercha.webp', description: 'Gorra ajustable oficial con bordado premium de Pipo Penguin.', stock: 30, rating: 5, color: 'bg-blue-50' },
        { id: 7, name: 'Peluche Tarta Extra Suave', price: 24.99, category: 'Peluches', image: '/assets/banners/mercha.webp', description: 'Peluche coleccionable de Tarta Turtle, suave, tierno y con colores brillantes.', stock: 10, rating: 4, color: 'bg-green-50' },
        { id: 8, name: 'Libro para Colorear Bumsy', price: 9.99, category: 'Libros', image: '/assets/banners/pintar.png', description: 'Libro físico con más de 60 páginas de plantillas e ilustraciones para colorear.', stock: 40, rating: 5, color: 'bg-purple-50' },
        { id: 9, name: 'Coloreable Bubu Mágico', price: 0, category: 'Regalos', image: '/assets/ecommerce/bubu_portada.webp', isFree: true, downloadUrl: '/assets/ecommerce/bubu_portada.png', description: 'Plantilla digital gratuita de Bubu Mágico para descargar y pintar.', stock: 999, rating: 5, color: 'bg-slate-50' },
        { id: 10, name: 'Bumsy Word Search (Sopa de Letras)', price: 0, category: 'Regalos', image: '/assets/ecommerce/bumsy_word_01.webp', isFree: true, downloadUrl: '/assets/ecommerce/bumsy_word_01.png', description: 'Divertido juego de sopa de letras imprimible con vocabulario de Bumsy Town.', stock: 999, rating: 5, color: 'bg-slate-50' },
        { id: 11, name: 'Coloreable Especial Flamy Colors', price: 0, category: 'Regalos', image: '/assets/ecommerce/flamy_colors.webp', isFree: true, downloadUrl: '/assets/ecommerce/flamy_colors.png', description: 'Dibujo especial descargable de Flamy para colorear con tus mejores tonos.', stock: 999, rating: 5, color: 'bg-slate-50' },
        { id: 12, name: 'Libro Portada Flamy y Amigos', price: 0, category: 'Regalos', image: '/assets/ecommerce/flamy_portada.webp', isFree: true, downloadUrl: '/assets/ecommerce/flamy_portada.png', description: 'Precioso libro digital de colorear de Flamy y sus inseparables amigos.', stock: 999, rating: 5, color: 'bg-slate-50' },
        { id: 13, name: 'Coloreable Lola Unicornio', price: 0, category: 'Regalos', image: '/assets/ecommerce/lola_portada.webp', isFree: true, downloadUrl: '/assets/ecommerce/lola_portada.png', description: 'Divertida plantilla digital de Lola Unicornio para pintar y decorar.', stock: 999, rating: 5, color: 'bg-slate-50' },
        { id: 14, name: 'Coloreable Pipa Portada 2', price: 0, category: 'Regalos', image: '/assets/ecommerce/pipa_portada_2.webp', isFree: true, downloadUrl: '/assets/ecommerce/pipa_portada_2.png', description: 'Nueva plantilla interactiva oficial de Pipa para colorear gratis.', stock: 999, rating: 5, color: 'bg-slate-50' },
        { id: 'custom_1', name: 'Taza Mágica Bumsy (CRM)', price: 14.99, category: 'Accesorios', image: '/assets/banners/mercha.webp', description: 'Taza de cerámica premium que cambia de color al verter líquidos calientes.', stock: 45, rating: 5, color: 'bg-slate-50' }
      ];
      localStorage.setItem('bumsy_crm_products', JSON.stringify(defaultProducts));
      setAllProducts(defaultProducts);
    }

    // Dynamic stock overrides loading
    const savedOverrides = localStorage.getItem('bumsy_crm_stock_overrides');
    if (savedOverrides) {
      try {
        setStockOverrides(JSON.parse(savedOverrides));
      } catch (e) {
        console.error('Error parsing stock overrides:', e);
      }
    }
  }, []);

  const getProductStock = (product) => {
    if (product.isFree) return 999;
    const strId = product.id.toString();
    const key = strId.startsWith('custom_') ? strId : `static_${product.id}`;
    if (key in stockOverrides) {
      return stockOverrides[key];
    }
    const defaults = {
      'static_1': 15,
      'static_2': 8,
      'static_3': 20,
      'static_4': 12,
    };
    return defaults[key] !== undefined ? defaults[key] : 25;
  };

  const triggerNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 4000);
  };
  
  const categories = ['Todos', 'Peluches', 'Ropa', 'Libros', 'Accesorios', 'Regalos'];

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });



  return (
    <div className="pb-24 pt-0 bg-white relative">
      {/* Floating Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-950/10 backdrop-blur-xl bg-slate-950/90 text-white max-w-md w-[90%]"
          >
            <Sparkles size={20} className="text-[#FCF200] shrink-0 animate-pulse" />
            <span className="font-bold text-sm leading-tight">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Promo */}
      <section className="relative pt-36 pb-28 md:pt-48 md:pb-36 overflow-hidden">
        {/* Background Image Fondo NEXT */}
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="/assets/branding/shop_bg_next.webp" 
            alt="Fondo NEXT Background" 
            className="w-full h-full object-cover object-center select-none" 
          />
        </div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#FCF200]/25 backdrop-blur-md border border-[#FCF200]/30 text-[#FCF200] px-6 py-2 rounded-full font-black text-sm tracking-widest uppercase mb-8 inline-block"
            >
              COLECCIÓN EXCLUSIVA 2026
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none uppercase tracking-tighter drop-shadow-md" style={{ fontFamily: "'Poppins', sans-serif" }}>La Tienda de Bumsy</h1>
            <p className="text-xl md:text-3xl font-bold text-gray-100 opacity-90 mb-12 leading-relaxed max-w-xl drop-shadow-sm">Llévate a tus amigos favoritos a casa con nuestra mercancía oficial y mágica.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <button className="bg-[#FCF200] hover:bg-[#EDE400] text-black px-12 py-6 rounded-full font-black text-2xl shadow-[0_20px_45px_rgba(252,242,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
                 <ShoppingBag size={28} /> COMPRAR AHORA
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border-4 border-white/25 px-12 py-6 rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-all">
                 VER CATÁLOGO
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg"
            >
               <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
               <img loading="lazy" src="/assets/branding/shop_fg_next.webp" alt="Next Products" className="relative z-10 w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] select-none hover:scale-105 transition-transform duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop Controls */}
      <section className="container mx-auto px-6 pt-36 md:pt-44 pb-12 relative z-10">
        <div className="flex flex-col items-center gap-12 mb-20">
          {/* Gallery Subtitle Anchor */}
          <div className="text-center mb-2">
            <span 
              className="text-xs font-black text-slate-300 tracking-[0.4em] uppercase block mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Colección Oficial Bumsy Town
            </span>
            <div className="w-12 h-[3px] bg-slate-100 mx-auto rounded-full"></div>
          </div>

          {/* Elegant Floating Category Dock */}
          <div className="w-full flex justify-center">
            <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar w-full max-w-4xl justify-start md:justify-center">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-8 py-3.5 rounded-full font-bold text-lg transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.15)] scale-105' 
                      : 'bg-slate-50 text-slate-500 border border-slate-100 hover:border-slate-300 hover:bg-slate-100/50'
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Premium Capsule Search Bar */}
          <div className="w-full max-w-2xl flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-full p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.02)] focus-within:border-slate-300 transition-all focus-within:shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
            <div className="flex-1 relative flex items-center pl-5">
              <Search className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Buscar productos oficiales..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-2.5 focus:outline-none text-slate-800 font-semibold text-lg placeholder-slate-400"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              />
            </div>
            <button className="bg-slate-950 hover:bg-slate-800 text-white p-4 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Premium Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => {
              const stockVal = getProductStock(product);
              const isOutOfStock = stockVal <= 0;

              return (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="bg-white border border-slate-100 rounded-[40px] p-6 md:p-8 shadow-[0_12px_35px_rgba(15,23,42,0.03)] hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)] hover:border-slate-200 transition-all duration-500 flex flex-col group relative overflow-hidden"
                >
                  {/* Heart Button on Top Right (Boutique Style) */}
                  <button className="absolute top-8 right-8 md:top-10 md:right-10 bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 p-4 rounded-full shadow-md hover:shadow-lg border border-slate-100 backdrop-blur-sm z-20 transition-all active:scale-90">
                    <Heart size={20} />
                  </button>

                  {/* Product Image Area (Vertical Aspect Ratio 3:4) */}
                  <div className="aspect-[3/4] w-full rounded-[30px] bg-slate-50 flex items-center justify-center mb-8 relative overflow-hidden group-hover:bg-slate-100/70 transition-colors duration-500">
                    <img 
                      loading="lazy" 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none" 
                    />

                    {/* Stock level badge overlay */}
                    {!product.isFree && (
                      <span className={`absolute top-4 left-4 font-black text-[10px] uppercase px-3.5 py-1.5 rounded-full tracking-wider z-20 shadow-md ${
                        isOutOfStock 
                          ? 'bg-red-500 text-white' 
                          : stockVal <= 5 
                            ? 'bg-amber-500 text-slate-950 shadow-sm' 
                            : 'bg-slate-950 text-white'
                      }`}>
                        {isOutOfStock ? 'Agotado' : `Stock: ${stockVal} u.`}
                      </span>
                    )}

                    {/* Elegant Fading Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-slate-900/10 backdrop-blur-[1px] transition-all duration-300 flex items-center justify-center">
                       {product.isFree ? (
                         <a 
                           href={product.downloadUrl} 
                           download={product.downloadUrl?.startsWith('data:application/pdf') ? `${product.name}.pdf` : `${product.name}.png`}
                           className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm tracking-wider px-8 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                           style={{ fontFamily: "'Poppins', sans-serif" }}
                         >
                           <Gift size={16} /> ¡DESCARGAR REGALO!
                         </a>
                       ) : (
                          <button 
                            onClick={() => {
                              if (isOutOfStock) {
                                triggerNotification('Lo sentimos, este producto está temporalmente agotado.');
                              } else {
                                addToCart(product);
                              }
                            }}
                           className={`font-bold text-sm tracking-wider px-8 py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 ${
                             isOutOfStock 
                               ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                               : 'bg-slate-950 hover:bg-slate-800 text-white'
                           }`}
                           style={{ fontFamily: "'Poppins', sans-serif" }}
                         >
                           <ShoppingCart size={16} /> {isOutOfStock ? 'AGOTADO' : 'AÑADIR AL CARRITO'}
                         </button>
                       )}
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3 text-left">
                      <span 
                        className="text-xs font-bold text-slate-400 uppercase tracking-widest"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {product.category}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < product.rating ? '#F59E0B' : 'none'} color={i < product.rating ? '#F59E0B' : '#E2E8F0'} />
                        ))}
                      </div>
                    </div>
                    <h3 
                      className="text-2xl font-bold text-slate-800 group-hover:text-accent transition-colors leading-tight mb-5 tracking-tight text-left"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100">
                      {product.isFree ? (
                        <>
                          <span 
                            className="text-2xl font-black text-rose-500 tracking-tight flex items-center gap-2"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            <Gift size={22} className="animate-bounce text-amber-500" /> GRATIS
                          </span>
                          <a 
                            href={product.downloadUrl} 
                            download={product.downloadUrl?.startsWith('data:application/pdf') ? `${product.name}.pdf` : `${product.name}.png`}
                            className="bg-amber-400 text-slate-950 hover:bg-slate-950 hover:text-white p-4 rounded-full transition-all border border-amber-300 hover:border-slate-950 shadow-md active:scale-90"
                          >
                            <Gift size={20} />
                          </a>
                        </>
                      ) : (
                        <>
                          <span 
                            className="text-3xl font-extrabold text-slate-950 tracking-tight"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            ${product.price}
                          </span>
                          <button 
                            onClick={() => {
                              if (isOutOfStock) {
                                triggerNotification('Lo sentimos, este producto está temporalmente agotado.');
                              } else {
                                addToCart(product);
                              }
                            }}
                            className={`p-4 rounded-full transition-all border shadow-sm active:scale-90 ${
                              isOutOfStock 
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-950 hover:text-white border-slate-100 hover:border-slate-950'
                            }`}
                          >
                            <ShoppingBag size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Support — Premium Dark Band */}
      <section className="mt-40 mb-0 relative z-10 overflow-hidden">
        {/* Subtle top separator line */}
        <div className="w-24 h-[3px] bg-slate-100 mx-auto rounded-full mb-24"></div>

        <div className="bg-slate-950 mx-4 md:mx-8 rounded-[48px] px-8 md:px-20 py-20 md:py-24 shadow-[0_40px_100px_rgba(15,23,42,0.18)]">
          {/* Header */}
          <div className="text-center mb-20">
            <span
              className="text-xs font-black text-slate-500 tracking-[0.4em] uppercase block mb-5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Por qué comprar en Bumsy
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Tu compra, nuestra promesa.
            </h2>
          </div>

          {/* Three pillars — horizontal on desktop */}
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 gap-0">
            {/* Envío */}
            <div className="flex flex-col items-center text-center px-8 md:px-12 py-10 md:py-0 group">
              <div className="w-20 h-20 rounded-3xl bg-slate-800 group-hover:bg-blue-500 flex items-center justify-center mb-8 transition-colors duration-500 shadow-lg">
                <Truck size={36} className="text-blue-400 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3
                className="text-xl font-black text-white mb-3 tracking-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Envío Gratuito
              </h3>
              <p
                className="text-slate-400 font-medium text-base leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                En pedidos superiores a $50 en todo el país, sin costo adicional.
              </p>
            </div>

            {/* Seguridad */}
            <div className="flex flex-col items-center text-center px-8 md:px-12 py-10 md:py-0 group">
              <div className="w-20 h-20 rounded-3xl bg-slate-800 group-hover:bg-emerald-500 flex items-center justify-center mb-8 transition-colors duration-500 shadow-lg">
                <ShieldCheck size={36} className="text-emerald-400 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3
                className="text-xl font-black text-white mb-3 tracking-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Compra Segura
              </h3>
              <p
                className="text-slate-400 font-medium text-base leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Datos protegidos con encriptación SSL de grado bancario.
              </p>
            </div>

            {/* Cambios */}
            <div className="flex flex-col items-center text-center px-8 md:px-12 py-10 md:py-0 group">
              <div className="w-20 h-20 rounded-3xl bg-slate-800 group-hover:bg-amber-500 flex items-center justify-center mb-8 transition-colors duration-500 shadow-lg">
                <RefreshCcw size={36} className="text-amber-400 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3
                className="text-xl font-black text-white mb-3 tracking-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Cambios Fáciles
              </h3>
              <p
                className="text-slate-400 font-medium text-base leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                30 días para cambios o devoluciones, sin preguntas ni costo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Icon Bubble */}
      {cart.length > 0 && (
        <motion.button
          onClick={() => setIsCartOpen(true)}
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-40 bg-pink-600 hover:bg-pink-500 text-white p-5 rounded-full shadow-2xl flex items-center justify-center border border-pink-400/20"
        >
          <ShoppingCart size={28} />
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-950 font-black text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </motion.button>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-over Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-slate-950/95 border-l border-slate-850 backdrop-blur-xl text-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart size={22} className="text-pink-500" />
                  <h3 className="font-black text-lg uppercase tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Tu Carrito
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-white text-xs font-black uppercase bg-slate-900 hover:bg-slate-850 border border-slate-800 px-4 py-2 rounded-full transition-all"
                >
                  Cerrar
                </button>
              </div>

              {/* Drawer Body (Cart Items List) */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
                    <ShoppingBag size={48} className="text-slate-700" />
                    <p className="text-sm font-semibold uppercase tracking-wider">Tu carrito está vacío</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="bg-slate-900/60 border border-slate-850 rounded-2xl p-4 flex gap-4 relative overflow-hidden">
                      <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-850 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-black text-xs uppercase text-slate-200 tracking-tight leading-tight truncate">{item.name}</h4>
                          <span className="font-mono text-pink-500 font-bold text-xs block mt-1">${item.price} USD</span>
                        </div>
                        
                        {/* Quantity adjusters */}
                        <div className="flex items-center gap-2.5 mt-3">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs flex items-center justify-center border border-slate-700 transition-colors"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-black text-slate-300">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs flex items-center justify-center border border-slate-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-850 bg-slate-950 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-black uppercase tracking-wider">Subtotal:</span>
                    <span className="font-mono text-xl font-black text-pink-500">${cartTotal.toFixed(2)} USD</span>
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black text-sm py-4 rounded-2xl shadow-[0_12px_30px_rgba(219,39,119,0.3)] uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard size={16} /> Proceder al Pago / Registrarse
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Shop;
