import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronRight, ChevronLeft, Sparkles, Tv, ArrowRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { gamesData } from '../data/gamesData';
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useSEO({
    title: 'Música, Juegos y Diversión para Niños',
    description: '¡Bienvenidos al mundo de Bumsy! Descubre canciones infantiles, cuentos animados, juegos educativos y toda la magia de Bumsy Town.',
    image: '/assets/hero/bg_bumsy_go.webp'
  });

  const heroSlides = [
    { 
      id: 1, 
      bgImg: '/assets/hero/bg_bumsy_go.webp', 
      fgImg: '/assets/hero/fg_bumsy_go.webp',
      title: '¡NUEVAS AVENTURAS Y VIDEOS DIVERTIDOS!', 
      subtitle: 'Acompaña a Bumsy y sus amigos en nuestro canal oficial de YouTube con música, risas y aprendizaje para toda la familia.',
      btnText: 'VER EN YOUTUBE 🎬',
      link: 'https://youtube.com/@BumsyGo',
      gradient: 'from-[#4CA5EC] to-[#1F70B8]'
    },
    { 
      id: 2, 
      bgImg: '/assets/hero/bg_games.webp', 
      fgImg: '/assets/hero/fg_games.webp',
      title: '¡HORA DE JUGAR Y APRENDER!', 
      subtitle: 'Descubre los nuevos juegos interactivos de Bumsy Town.',
      btnText: 'JUGAR AHORA',
      link: '/play',
      gradient: 'from-[#8B5CF6] to-[#6366F1]'
    },
    { 
      id: 3, 
      bgImg: '/assets/hero/bg_friends.webp', 
      fgImg: '/assets/hero/fg_friends.webp',
      title: 'CONOCE A NUESTROS MEJORES AMIGOS', 
      subtitle: 'Cada personaje tiene una historia mágica para compartir contigo.',
      btnText: '¡QUIERO CONOCERLOS! 💖',
      link: '/characters',
      gradient: 'from-[#F97316] to-[#F59E0B]'
    },
    { 
      id: 4, 
      bgImg: '/assets/hero/bg_learning.webp', 
      fgImg: '/assets/hero/fg_learning.webp',
      title: 'CUADERNOS DE AVENTURA BUMSY GO', 
      subtitle: 'Diviértete pintando, resolviendo acertijos y aprendiendo con los cuadernos oficiales de Bumsy Town.',
      btnText: 'VER LIBROS Y COLOREABLES 📚',
      link: '/shop?category=Libros',
      gradient: 'from-[#10B981] to-[#059669]'
    },
    { 
      id: 5, 
      bgImg: '/assets/hero/bg_next.webp', 
      fgImg: '/assets/hero/fg_next.webp',
      title: '¡LO PRÓXIMO EN BUMSY TOWN!', 
      subtitle: 'Sé el primero en conseguir las figuras coleccionables, peluches exclusivos y juegos de Bumsy antes de que se agoten.',
      btnText: 'RESERVAR AHORA 🛍️',
      link: '/shop?category=Próximamente',
      gradient: 'from-[#EC4899] to-[#F43F5E]'
    }
  ];

  // Preload all hero images for instant transitions
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const bg = new Image();
      bg.src = slide.bgImg;
      if (slide.fgImg) {
        const fg = new Image();
        fg.src = slide.fgImg;
      }
    });
  }, []);

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // Rotate every 5 seconds
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, heroSlides.length]);

  const characters = [
    { name: 'Bumsy', color: 'bg-orange-500', card: '/assets/characters/cards/bumsy.webp', video: '/assets/characters/videos/bumsy.mp4', filter: 'bumsy', desc: '¡El líder más aventurero y divertido!' },
    { name: 'Bubu Tambor', color: 'bg-blue-600', card: '/assets/characters/cards/bubu.webp', video: '/assets/characters/videos/bubu.mp4', filter: 'bubu', desc: '¡Ritmo y diversión en cada latido!' },
    { name: 'Lumi', color: 'bg-yellow-400', card: '/assets/characters/cards/lumi.webp', video: '/assets/characters/videos/lumi.mp4', filter: 'lumi', desc: '¡Brillando siempre con luz propia!' },
    { name: 'Stella', color: 'bg-purple-500', card: '/assets/characters/cards/stella.webp', video: '/assets/characters/videos/stella.mp4', filter: 'stella', desc: '¡Llena de magia y polvo de estrellas!' },
    { name: 'Pipa', color: 'bg-pink-400', card: '/assets/characters/cards/pipa.webp', video: '/assets/characters/videos/pipa.mp4', filter: 'pipa', desc: '¡Tan tierna como una canción de cuna!' },
    { name: 'Drako', color: 'bg-emerald-500', card: '/assets/characters/cards/drako.webp', video: '/assets/characters/videos/drako.mp4', filter: 'drako', desc: '¡El guardián del bosque Arcoíris!' },
    { name: 'Flamy', color: 'bg-rose-500', card: '/assets/characters/cards/flamy.webp', video: '/assets/characters/videos/flamy.mp4', filter: 'flamy', desc: '¡La bailarina más elegante del grupo!' },
    { name: 'Lola', color: 'bg-amber-500', card: '/assets/characters/cards/lola.webp', video: '/assets/characters/videos/lola.mp4', filter: 'lola', desc: '¡La inventora de todos los juegos!' },
    { name: 'Sergi', color: 'bg-cyan-500', card: '/assets/characters/cards/sergi.webp', video: '/assets/characters/videos/sergi.mp4', filter: 'sergi', desc: '¡El más veloz de toda la pandilla!' },
    { name: 'Idara', color: 'bg-teal-500', card: '/assets/characters/cards/idara.webp', video: '/assets/characters/videos/idara.mp4', filter: 'idara', desc: '¡Con música en el alma y pasos de baile!' },
    { name: 'Oskava', color: 'bg-violet-500', card: '/assets/characters/cards/oskava.webp', video: '/assets/characters/videos/oskava.mp4', filter: 'oskava', desc: '¡Lleno de creatividad y colores!' },
  ];

  // Character Carousel Auto-play (every 10 seconds)
  useEffect(() => {
    const charTimer = setInterval(() => {
      setActiveCharIndex((prev) => (prev + 1) % characters.length);
    }, 10000);
    return () => clearInterval(charTimer);
  }, [characters.length]);

  const [currentNewsIdx, setCurrentNewsIdx] = useState(0);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  const news = [
    { 
      title: 'Bumsy en el Mundo: ¡Lanzamiento en países de habla hispana!', 
      date: 'Abril 2026', 
      image: '/assets/banners/news_world.jpeg' 
    },
    { 
      title: 'Colaboración global: Bumsy x Idara Play', 
      date: 'Abril 2026', 
      image: '/assets/banners/news_idara.jpeg' 
    },
    { 
      title: 'Temporada 1 de "Cuentos Mágicos"', 
      date: 'Marzo 2026', 
      image: '/assets/banners/news_cuentos.jpeg' 
    },
    { 
      title: 'Aventura en la Escuela con Bumsy', 
      date: 'Marzo 2026', 
      image: '/assets/banners/news_skul.jpeg' 
    },
  ];

  const maxNewsIndex = news.length - visibleNewsCount;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleNewsCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleNewsCount(2);
      } else {
        setVisibleNewsCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentNewsIdx > maxNewsIndex) {
      setCurrentNewsIdx(Math.max(0, maxNewsIndex));
    }
  }, [visibleNewsCount, maxNewsIndex, currentNewsIdx]);

  const nextNews = () => {
    setCurrentNewsIdx((prev) => (prev >= maxNewsIndex ? 0 : prev + 1));
  };
  
  const prevNews = () => {
    setCurrentNewsIdx((prev) => (prev <= 0 ? maxNewsIndex : prev - 1));
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* 1. HERO SECTION (Layout Pinkfong Style) */}
      <section className="relative h-screen min-h-[650px] md:min-h-[800px] flex items-center justify-center overflow-hidden bg-black shadow-2xl">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute inset-0 flex flex-col justify-end md:justify-center items-center pb-24 md:pb-0 bg-gradient-to-br ${heroSlides[currentSlide].gradient}`}
          >
            {/* Foto de fondo */}
            <motion.div 
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].bgImg})` }}
            ></motion.div>

            <div className="container mx-auto px-6 relative z-20 flex flex-col md:flex-row items-center">
              {/* Right Side: Character Image (Logo del slide) */}
              <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end z-10 order-1 md:order-2 mb-8 md:mb-0">
                <motion.img
                  src={heroSlides[currentSlide].fgImg}
                  alt="Foreground"
                  initial={{ scale: 0.8, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  className="w-full h-auto max-w-[75vw] md:max-w-[45vw] lg:max-w-[40vw] drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Left Side: Text & CTA */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20 order-2 md:order-1">
                <motion.h1
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 leading-tight tracking-tight text-white uppercase max-w-xl"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-sm md:text-xl lg:text-2xl font-bold text-white/90 mb-8 md:mb-10 max-w-lg"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {heroSlides[currentSlide].link.startsWith('http') ? (
                    <a 
                      href={heroSlides[currentSlide].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-black px-8 py-3 md:px-10 md:py-3 rounded-full font-black text-base md:text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                      {heroSlides[currentSlide].btnText}
                    </a>
                  ) : (
                    <Link 
                      to={heroSlides[currentSlide].link} 
                      className="inline-block bg-white text-black px-8 py-3 md:px-10 md:py-3 rounded-full font-black text-base md:text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                      {heroSlides[currentSlide].btnText}
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
            
            {/* Overlay Gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10 hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 md:hidden"></div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators & Controls */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-6 z-30">
          <div className="flex gap-2 w-full max-w-[200px] md:max-w-xs">
            {heroSlides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  setIsAutoPlaying(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 flex-1 ${idx === currentSlide ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
          
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
          >
            {isAutoPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>
      </section>

      {/* 2. VAMOS A JUGAR (Games Carousel) */}
      <section className="py-10 bg-primary/5">
        <div className="container mx-auto px-6">

          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <div className="bg-accent/10 text-accent px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles size={18} /> CENTRO DE ENTRETENIMIENTO
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-4 tracking-tighter uppercase">¡VAMOS A JUGAR!</h2>
            <Link to="/play" className="text-primary/40 font-black text-lg flex items-center gap-2 hover:text-accent transition-colors group uppercase">
              Ver Todos los Juegos <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>

          {/* Carrusel horizontal — 6 portadas visibles */}
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar">
            {gamesData.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.07, duration: 0.4 }}
                className="snap-start flex-shrink-0 w-44 md:w-52 group"
              >
                {/* Póster — sin bordes, esquinas redondeadas, sombra suave */}
                <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-md">
                  {game.soon ? (
                    <img src={game.poster} alt={game.title} className="w-full h-full object-cover" />
                  ) : (
                    <Link to={game.path} className="block w-full h-full">
                      <img
                        src={game.poster}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                      />
                    </Link>
                  )}
                </div>

                {/* Logo o nombre debajo del póster */}
                <div className="mt-3 text-center">
                  {game.logo ? (
                    <Link to={game.path}>
                      <img src={game.logo} alt={`${game.title} Logo`} className="h-10 object-contain mx-auto drop-shadow-sm" />
                    </Link>
                  ) : (
                    <span className="text-sm font-black text-primary uppercase">{game.title}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>

      {/* 2.5 BUMSY BS TEASER SECTION */}
      <section className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center text-white">
        {/* Background Image Bumsy BS */}
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="/assets/branding/bumsybs_fondo.webp" 
            alt="Bumsy BS Background" 
            className="w-full h-full object-cover object-center select-none" 
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          {/* Logo BS2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 hover:scale-105 transition-transform"
          >
            <img 
              src="/assets/branding/bs2_logo.webp" 
              alt="Logo BS2" 
              className="h-72 md:h-[450px] object-contain select-none drop-shadow-[0_15px_30px_rgba(252,242,0,0.5)]" 
            />
          </motion.div>

          {/* Main Teaser Text */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase leading-[0.95] max-w-5xl"
          >
            ¡Bumsy busca talento en <span className="text-[#FCF200] block md:inline font-black drop-shadow-md">Bumsy Spark! 🌟</span>
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link 
              to="/watch" 
              className="inline-flex items-center justify-center bg-[#FCF200] hover:bg-[#EDE400] text-black px-16 py-8 rounded-full font-black text-2xl shadow-[0_25px_50px_rgba(252,242,0,0.4)] hover:scale-105 active:scale-95 transition-all gap-3 uppercase tracking-wider font-sans"
            >
              ✨ Descubrir Detalles
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. PERSONAJES (Characters Carousel - Pinkfong Style) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase">PERSONAJES</h2>
          </div>

          {/* Top Nav (Tabs) */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
            {characters.map((char, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCharIndex(i)}
                className={`text-xl md:text-2xl font-black transition-all ${
                  i === activeCharIndex 
                    ? 'text-primary border-b-[3px] border-primary pb-2' 
                    : 'text-primary/30 hover:text-primary/60'
                }`}
              >
                {char.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Main Carousel Card */}
          <div className="relative max-w-5xl mx-auto flex items-center justify-center">
            {/* Left Prev Char Hint */}
            <div className="hidden lg:flex w-24 h-[400px] absolute -left-40 opacity-30 pointer-events-none items-center justify-end overflow-hidden rounded-r-[40px] bg-gradient-to-r from-transparent to-primary/5">
               <img 
                 src={characters[(activeCharIndex - 1 + characters.length) % characters.length].card} 
                 className="h-40 translate-x-12 filter blur-[2px] object-contain" 
                 alt="previous"
               />
            </div>

            {/* Left Arrow */}
            <button 
              className="absolute -left-5 md:-left-12 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-primary/40 hover:text-primary transition-colors focus:outline-none" 
              onClick={() => setActiveCharIndex((prev) => (prev - 1 + characters.length) % characters.length)}
            >
               <ChevronLeft />
            </button>

            {/* Active Card - Premium Glassmorphism Redesign */}
            <div className="w-full flex-col md:flex-row flex rounded-[50px] overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] min-h-[450px] h-auto md:h-[450px] transition-all duration-700 ease-in-out border border-white/50 relative group bg-white">
              
              {/* Background gradient blur connecting both sides */}
              <div className={`absolute inset-0 opacity-10 blur-3xl z-0 transition-colors duration-1000 ${characters[activeCharIndex].color}`}></div>

              {/* Left Half — solo video, sin imagen de fondo */}
              <div className="w-full md:w-5/12 relative overflow-hidden z-10 bg-black min-h-[360px]">
                <video
                  key={characters[activeCharIndex].video}
                  src={characters[activeCharIndex].video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              {/* Right Half — card image as background + desc overlay (name is in the card image) */}
              <div className="w-full md:w-7/12 relative flex flex-col justify-end overflow-hidden z-10 min-h-[360px]">
                <img
                  src={characters[activeCharIndex].card}
                  alt={characters[activeCharIndex].name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 p-8 md:p-12 text-white">
                  {/* Tag badges */}
                  <motion.div
                    key={`tags-${activeCharIndex}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-wrap gap-3 mb-6"
                  >
                    <span className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-white/30">
                      #{characters[activeCharIndex].filter}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-white/20">
                      #Amigo
                    </span>
                  </motion.div>

                  <motion.p
                    key={`desc-${activeCharIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-base md:text-xl font-bold mb-8 leading-relaxed max-w-md drop-shadow-sm"
                  >
                    {characters[activeCharIndex].desc}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Link
                      to={`/characters#${characters[activeCharIndex].filter}`}
                      className="inline-flex items-center justify-center px-8 py-4 font-black text-lg text-primary bg-white rounded-[20px] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.3)]"
                    >
                      Descubrir Magia <Sparkles size={18} className="ml-2 text-accent" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              className="absolute -right-5 md:-right-12 z-20 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-primary/40 hover:text-primary transition-colors focus:outline-none" 
              onClick={() => setActiveCharIndex((prev) => (prev + 1) % characters.length)}
            >
               <ChevronRight />
            </button>

            {/* Right Next Char Hint */}
            <div className="hidden lg:flex w-24 h-[400px] absolute -right-40 opacity-30 pointer-events-none items-center justify-start overflow-hidden rounded-l-[40px] bg-gradient-to-l from-transparent to-primary/5">
               <img 
                 src={characters[(activeCharIndex + 1) % characters.length].card} 
                 className="h-40 -translate-x-12 filter blur-[2px] object-contain" 
                 alt="next"
               />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE NUEVO CONTENIDO (Estilo Pinkfong Giant Text) */}
      <section className="bg-white overflow-hidden relative pt-20 pb-32">
        {/* Giant scrolling text background */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center whitespace-nowrap overflow-hidden z-0">
          {/* Fading edges to blend with white background */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
           <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex font-black text-[5rem] md:text-[10rem] lg:text-[12rem] text-primary/10 tracking-tighter uppercase whitespace-nowrap gap-12 md:gap-24"
              style={{ fontFamily: "'Peace Sans', Impact, sans-serif", lineHeight: 1 }}
           >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-12 md:gap-24 items-center">
                  <span>NUEVO CONTENIDO</span>
                  <span>NEW CONTENT</span>
                  <span>新しいコンテンツ</span>
                  <span>NOUVEAU CONTENU</span>
                  <span>NEUER INHALT</span>
                </div>
              ))}
           </motion.div>
        </div>

        {/* Foreground Image */}
        <div className="w-full flex justify-center relative z-20 px-6">
           <img 
             src="/assets/banners/bumsy_28.webp" 
             className="w-full max-w-[1200px] hover:scale-[1.02] transition-transform duration-500 drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative z-30" 
             alt="Nuestro Nuevo Contenido" 
           />
        </div>
      </section>

      {/* 4. YOUTUBE SECTION (Replaces Nuestro Contenido) */}
      <section className="w-full relative overflow-hidden bg-white py-16 md:py-28">
        {/* Yellow Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/assets/banners/fondo_youtube.webp" 
            alt="YouTube Background" 
            className="w-full h-full object-cover object-center" 
          />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20 flex flex-col items-center">
          {/* Title inside the image area at the top */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full text-center px-6 mb-12 md:mb-20"
          >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]" style={{ fontFamily: "'Peace Sans', Impact, sans-serif" }}>
              NUESTROS CONTENIDOS
            </h2>
          </motion.div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
            {/* YouTube Logo/Banner Image */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <img 
                src="/assets/banners/youtube_banner.webp" 
                alt="YouTube Bumsy" 
                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-500" 
              />
            </motion.div>

            {/* Text & CTA */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase leading-none drop-shadow-lg"
                style={{ fontFamily: "'Peace Sans', Impact, sans-serif" }}
              >
                <span className="text-white">Bumsy en </span>
                <span className="text-[#EC4899]">YouTube</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-3xl font-bold text-black/70 mb-10 leading-tight uppercase"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Suscríbete ahora para ver <br /> episodios completos y música.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <a 
                  href="https://youtube.com/@BumsyGo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FF0000] text-white px-12 py-5 rounded-full font-black text-2xl uppercase shadow-[0_15px_40px_rgba(255,0,0,0.3)] hover:scale-110 active:scale-95 transition-all"
                >
                  ¡IR AL CANAL!
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* 6. BUMSY SKOOL (Alianzas Educativas - FULL WIDTH) */}
      <section className="w-full relative overflow-hidden bg-white py-16 md:py-28">
        <div className="absolute inset-0">
          <img 
            src="/assets/banners/bumsy_skool.webp" 
            alt="Bumsy School" 
            className="w-full h-full object-cover object-center" 
          />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20 flex justify-end">
          <div className="max-w-2xl text-right bg-white/70 backdrop-blur-md p-6 md:p-10 rounded-[40px] border border-white/40 shadow-xl">
            <motion.h2 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black text-primary mb-6 tracking-tighter uppercase leading-none drop-shadow-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Aprendiendo <br /> con <span className="text-accent">Bumsy</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl font-bold text-gray-800 mb-10 leading-relaxed max-w-xl ml-auto"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Bumsy llega a las aulas para transformar la educación en una aventura mágica. ¡Descubre cómo tu escuela puede aliarse con el universo Bumsy!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/education" className="inline-block bg-primary text-white px-12 py-5 rounded-full font-black text-xl uppercase shadow-[0_15px_40px_rgba(8,112,184,0.3)] hover:scale-105 active:scale-95 transition-all">
                Alianza Educativa
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. NOTICIAS BUMSY */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter uppercase">NOTICIAS DE BUMSY</h2>
            <p className="text-xl md:text-2xl font-bold opacity-80 max-w-3xl">Entérate de las últimas novedades, lanzamientos y sorpresas en el universo Bumsy.</p>
          </div>
          
          <div className="relative px-2 md:px-12">
            <div className="relative overflow-hidden w-full">
              <div 
                className="flex transition-transform duration-500 ease-in-out -mx-4"
                style={{ transform: `translateX(-${currentNewsIdx * (100 / visibleNewsCount)}%)` }}
              >
                {news.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex-shrink-0 px-4 transition-all duration-300 ${
                      visibleNewsCount === 1 ? 'w-full' : visibleNewsCount === 2 ? 'w-1/2' : 'w-1/3'
                    }`}
                  >
                    <div className="bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col border border-gray-100 rounded-3xl overflow-hidden h-full">
                      <div className="w-full aspect-[16/9] overflow-hidden bg-gray-50">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="text-sm font-bold text-primary/60 mb-2 uppercase tracking-widest">{item.date}</div>
                        <h3 className="text-2xl font-black text-primary mb-6 leading-tight flex-grow" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</h3>
                        <Link 
                          to="/news"
                          className="text-primary font-bold flex items-center gap-2 hover:text-accent transition-colors text-lg uppercase mt-auto"
                        >
                          Leer completa <ArrowRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            {maxNewsIndex > 0 && (
              <>
                <button 
                  onClick={prevNews}
                  className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white text-primary hover:text-accent rounded-full shadow-lg border border-gray-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextNews}
                  className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white text-primary hover:text-accent rounded-full shadow-lg border border-gray-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Dots Indicators */}
            {maxNewsIndex > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                {[...Array(maxNewsIndex + 1)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentNewsIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentNewsIdx ? 'w-8 bg-primary' : 'w-2.5 bg-primary/25'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. PIPA COLORS (Sección de Descargables - FULL WIDTH) */}
      <section className="w-full relative overflow-hidden h-[500px] md:h-[750px] bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src="/assets/banners/pipa_colors.webp" 
            alt="Pipa Colors" 
            className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-2xl text-white z-10">
                <motion.h2 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  ¡Pipa <span className="text-[#FCF200]">Colors</span>!
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl md:text-3xl font-bold mb-10 text-white/90 leading-relaxed"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Descarga gratis los mejores dibujos para colorear y deja volar tu imaginación con Pipa y sus amigos.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link to="/downloads" className="inline-block bg-[#FCF200] hover:bg-white text-black px-12 py-5 rounded-full font-black text-2xl uppercase shadow-[0_15px_40px_rgba(252,242,0,0.3)] transition-all hover:scale-105 active:scale-95">
                    ¡Quiero Pintar!
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 8. BUSINESS BANNER (Full Width con Texto Superior) */}
      <section className="w-full relative overflow-hidden bg-[#FFEB3B]">
         <div className="w-full relative h-[500px] md:h-auto min-h-[500px] flex flex-col justify-between">
            
            {/* Imagen de fondo / Flamy */}
            <img src="/assets/banners/bumsy_29.webp" alt="Hacer Negocios con Bumsy" className="w-full h-full object-cover absolute inset-0 md:relative md:object-contain md:h-auto md:max-h-none" />
            
            {/* Textos montados arriba para no tapar al Flamingo */}
            <div className="absolute top-10 md:top-16 left-0 right-0 z-20 flex flex-col items-center text-center px-6 pointer-events-none">
               <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)] text-[#E91E63] uppercase" style={{fontFamily: "'Peace Sans', Impact, sans-serif"}}>
                 CONEXIONES
               </h2>
               <p className="text-2xl md:text-4xl font-bold text-gray-800 tracking-wide max-w-3xl" style={{fontFamily: "'Poppins', sans-serif"}}>
                 Bumsy siempre busca conectar con nuevos socios.
               </p>
            </div>

            {/* Botón de acción montado hasta abajo */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center w-full px-6">
               <Link to="/business" className="bg-[#E91E63] text-white px-12 py-5 border-4 border-white rounded-full font-black text-2xl shadow-[0_10px_30px_rgba(233,30,99,0.5)] hover:scale-110 active:scale-95 transition-all text-center">
                 IR A LICENCIAS Y NEGOCIOS
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
