import React from 'react';
import { motion } from 'framer-motion';
import { Play, Tv, Star, Clock, ChevronRight, Zap } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Videos = () => {
  useSEO({
    title: 'Videos y Aventuras Animadas',
    description: 'Mira los episodios completos de Bumsy Go, canciones infantiles y cuentos mágicos para niños. Diversión garantizada y segura.',
    image: '/assets/banners/news_cuentos.webp'
  });

  const categories = ['Todos', 'Musicales', 'Cuentos', 'Educativos'];
  
  const featuredVideo = {
    title: 'Bumsy y el Misterio del Bosque',
    category: 'Cuento Animado',
    duration: '12:45',
    image: '/assets/banners/news_cuentos.webp'
  };

  const videos = [
    { id: 1, title: 'La Canción del Abecedario', category: 'Educativo', duration: '3:20', image: '/assets/banners/escuela.webp', color: 'bg-orange-50' },
    { id: 2, title: 'Bailando con Tarta', category: 'Musical', duration: '2:15', image: '/assets/banners/news_idara.webp', color: 'bg-green-50' },
    { id: 3, title: 'Uni y las Estrellas', category: 'Cuento', duration: '5:40', image: '/assets/banners/navidad.webp', color: 'bg-purple-50' },
    { id: 4, title: 'Aprendiendo los Números', category: 'Educativo', duration: '4:10', image: '/assets/banners/escuela.webp', color: 'bg-blue-50' },
    { id: 5, title: 'El Cumpleaños de Pipo', category: 'Cuento', duration: '8:30', image: '/assets/banners/bumsy-plus.webp', color: 'bg-pink-50' },
    { id: 6, title: 'Ritmos de la Selva', category: 'Musical', duration: '2:50', image: '/assets/banners/news_idara.webp', color: 'bg-emerald-50' },
  ];

  return (
    <div className="pb-24 pt-20 bg-white">
      {/* Hero / Featured Video Section */}
      <section className="bg-secondary/20 py-24 text-primary rounded-b-[100px] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-center gap-20"
          >
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="bg-accent/10 text-accent px-8 py-3 rounded-full font-black text-sm inline-block mb-10 tracking-[0.2em] uppercase border border-accent/20 shadow-sm">
                ¡ESTRENO MUNDIAL!
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-10 leading-none uppercase tracking-tighter" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Aventuras de Bumsy
              </h1>
              <p className="text-xl md:text-3xl font-bold opacity-80 mb-12 max-w-2xl leading-relaxed">
                Mira los episodios completos, canta tus canciones favoritas y vive la magia de Bumsy Town en HD.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button className="bg-primary text-white px-12 py-6 rounded-full font-black text-2xl flex items-center justify-center gap-4 shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-tight">
                  <Play size={28} fill="currentColor" /> VER AHORA
                </button>
                <button className="bg-white text-primary border-4 border-primary/5 px-12 py-6 rounded-full font-black text-2xl hover:bg-primary/5 transition-all uppercase tracking-tight">
                  VER TRAILER
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="aspect-video bg-white rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-hidden relative group cursor-pointer border-[12px] border-white"
               >
                  <img loading="lazy" src={featuredVideo.image} alt={featuredVideo.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all flex items-center justify-center z-10">
                    <div className="w-24 h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-2xl group-hover:scale-125 transition-all">
                      <Play size={44} fill="currentColor" className="ml-2" />
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-10 text-white z-20">
                    <p className="font-black text-lg mb-2 opacity-90 uppercase tracking-widest">{featuredVideo.category}</p>
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{featuredVideo.title}</h2>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20">
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar w-full md:w-auto">
            {categories.map((cat, i) => (
              <button 
                key={i}
                className={`whitespace-nowrap px-10 py-4 rounded-[30px] font-black text-xl transition-all ${i === 0 ? 'bg-primary text-white shadow-2xl scale-105' : 'bg-white text-primary border-4 border-primary/5 hover:border-primary/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-3 text-accent font-black text-xl hover:gap-6 transition-all uppercase tracking-tighter">
            VER TODO EL CATÁLOGO <ChevronRight size={28} />
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {videos.map((video, i) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="group cursor-pointer"
            >
              <div className={`aspect-video rounded-[60px] mb-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] group-hover:shadow-2xl transition-all border-4 border-white`}>
                <img loading="lazy" src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all shadow-2xl scale-50 group-hover:scale-100">
                    <Play size={32} fill="currentColor" className="ml-2" />
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/60 text-white px-4 py-2 rounded-2xl text-sm font-black backdrop-blur-md">
                   {video.duration}
                </div>
              </div>
              <div className="px-6">
                <span className="text-accent font-black text-xs tracking-[0.2em] uppercase mb-3 block">{video.category}</span>
                <h3 className="text-3xl font-black text-primary group-hover:text-accent transition-colors leading-tight uppercase tracking-tight">{video.title}</h3>
                <div className="flex items-center gap-6 mt-6 text-primary/30 font-black uppercase text-xs tracking-widest">
                  <span className="flex items-center gap-2"><Tv size={18} /> HD 4K</span>
                  <span className="flex items-center gap-2"><Star size={18} /> TOP 10</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subscription / Newsletter (Bumsy Style) */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-primary p-12 md:p-32 rounded-[100px] text-white text-center relative overflow-hidden shadow-2xl">
           <div className="relative z-10 max-w-4xl mx-auto">
             <h2 className="text-5xl md:text-8xl font-black mb-10 leading-none uppercase tracking-tighter" style={{ fontFamily: "'Poppins', sans-serif" }}>¿Quieres más diversión?</h2>
             <p className="text-xl md:text-3xl font-bold opacity-80 mb-16 leading-relaxed">Suscríbete a nuestro canal de novedades y recibe alertas mágicas de nuevos episodios directamente.</p>
             <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[40px] flex flex-col sm:flex-row gap-4 border-2 border-white/20">
               <input 
                type="email" 
                placeholder="Tu correo mágico aquí..." 
                className="bg-transparent border-none px-8 py-5 text-white placeholder:text-white/40 focus:outline-none flex-1 text-2xl font-bold"
               />
               <button className="bg-white text-primary px-12 py-5 rounded-[30px] font-black text-2xl hover:bg-secondary hover:text-primary transition-all uppercase tracking-widest shadow-xl">
                 ¡SUSCRIBIRME!
               </button>
             </div>
           </div>
           {/* Decorative Background Icons */}
           <Tv size={240} className="absolute -bottom-20 -left-20 opacity-5 -rotate-12 pointer-events-none" />
           <Zap size={240} className="absolute -top-20 -right-20 opacity-5 rotate-12 pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default Videos;
