import React from 'react';
import { motion } from 'framer-motion';
import { Play, Music, Heart, Share2, Download, Disc } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Songs = () => {
  useSEO({
    title: 'Canciones Mágicas y Melodías',
    description: 'Canta y baila con las canciones oficiales de Bumsy Go. Melodías educativas y divertidas para toda la familia.',
    image: '/assets/banners/news_idara.png'
  });

  const songs = [
    { id: 1, title: 'Bumsy en el Bosque', duration: '2:15', category: 'Aventura', image: '/assets/banners/bumsy-plus.png', color: 'bg-green-50' },
    { id: 2, title: 'La Danza de Tarta', duration: '1:45', category: 'Baile', image: '/assets/banners/news_idara.png', color: 'bg-yellow-50' },
    { id: 3, title: 'Colores Mágicos', duration: '2:30', category: 'Aprendizaje', image: '/assets/banners/pintar.png', color: 'bg-pink-50' },
    { id: 4, title: 'Pipo y el Hielo', duration: '2:05', category: 'Aventura', image: '/assets/banners/news_world.png', color: 'bg-blue-50' },
    { id: 5, title: 'Uni el Unicornio', duration: '3:00', category: 'Fantasía', image: '/assets/banners/navidad.png', color: 'bg-purple-50' },
    { id: 6, title: 'Saltando con Pipo', duration: '1:55', category: 'Acción', image: '/assets/banners/escuela.png', color: 'bg-orange-50' },
  ];

  return (
    <div className="pb-24 pt-20 bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-24 text-white rounded-b-[100px] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter" style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Canciones Mágicas
          </motion.h1>
          <p className="text-xl md:text-3xl font-bold opacity-90 max-w-3xl mx-auto leading-relaxed">
            ¡Canta, baila y aprende con las melodías más divertidas de Bumsy Town!
          </p>
        </div>
        {/* Floating Notes */}
        <div className="absolute top-20 left-20 text-6xl opacity-20 animate-bounce pointer-events-none">🎵</div>
        <div className="absolute bottom-20 right-20 text-6xl opacity-20 animate-pulse delay-100 pointer-events-none">🎶</div>
        <div className="absolute top-1/2 right-40 text-6xl opacity-20 animate-bounce delay-300 pointer-events-none">🎼</div>
      </section>

      {/* Categories / Filter Placeholder */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-wrap gap-6 justify-center mb-24">
          {['Todas', 'Rimas', 'Aventura', 'Baile', 'Educativo'].map((cat, i) => (
            <button 
              key={i}
              className={`px-10 py-4 rounded-full font-black text-xl shadow-xl transition-all ${i === 0 ? 'bg-primary text-white scale-110' : 'bg-white text-primary hover:bg-primary/5 border-4 border-primary/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {songs.map((song, i) => (
            <motion.div 
              key={song.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white rounded-[60px] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.05)] flex flex-col gap-8 group border-4 border-transparent hover:border-accent/10 transition-all"
            >
              <div className="flex items-center gap-8">
                <div className={`w-32 h-32 rounded-[40px] overflow-hidden shadow-2xl group-hover:scale-110 transition-transform relative`}>
                   <img loading="lazy" src={song.image} alt={song.title} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all"></div>
                </div>
                <div className="flex-1">
                  <span className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-2 block">{song.category}</span>
                  <h3 className="text-3xl font-black text-primary mb-2 leading-none uppercase tracking-tight">{song.title}</h3>
                  <p className="text-primary/30 font-black uppercase text-xs tracking-widest">Duración: {song.duration}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-auto pt-6 border-t border-gray-50">
                <button className="flex-1 bg-primary text-white py-5 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 shadow-2xl hover:bg-accent transition-all active:scale-95 uppercase tracking-tighter">
                  <Play size={24} fill="currentColor" /> REPRODUCIR
                </button>
                <div className="flex gap-3">
                  <button className="p-5 bg-primary/5 text-primary rounded-[24px] hover:bg-accent/10 hover:text-accent transition-all">
                    <Heart size={24} />
                  </button>
                  <button className="p-5 bg-primary/5 text-primary rounded-[24px] hover:bg-primary/10 transition-all">
                    <Download size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Playlist */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-secondary rounded-[100px] p-12 md:p-32 flex flex-col lg:flex-row items-center gap-24 relative overflow-hidden shadow-2xl">
          <div className="lg:w-1/3">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="aspect-square bg-white rounded-full shadow-[0_50px_100px_rgba(0,0,0,0.2)] flex items-center justify-center relative overflow-hidden border-[12px] border-white"
            >
              <img loading="lazy" src="/assets/banners/news_idara.png" alt="Album Cover" className="w-full h-full object-cover opacity-80" />
              <div className="absolute w-24 h-24 bg-white rounded-full border-8 border-gray-100 flex items-center justify-center">
                <Disc className="text-primary" size={48} />
              </div>
            </motion.div>
          </div>
          <div className="lg:w-2/3 text-center lg:text-left relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-primary mb-10 leading-none uppercase tracking-tighter" style={{ fontFamily: "'Poppins', sans-serif" }}>Álbum: El Ritmo de Bumsy Town</h2>
            <p className="text-xl md:text-3xl text-primary/60 font-bold mb-16 leading-relaxed">Escucha la colección completa de la primera temporada. ¡Más de 12 tracks exclusivos para bailar sin parar!</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              <button className="bg-primary text-white px-14 py-7 rounded-full font-black text-2xl shadow-2xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                <Music size={32} /> ESCUCHAR ÁLBUM COMPLETO
              </button>
              <button className="bg-white/40 backdrop-blur-md border-4 border-primary/10 text-primary px-14 py-7 rounded-full font-black text-2xl shadow-xl flex items-center gap-4 hover:bg-white/60 transition-all uppercase tracking-widest">
                <Share2 size={32} /> COMPARTIR
              </button>
            </div>
          </div>
          {/* Decor */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Songs;
