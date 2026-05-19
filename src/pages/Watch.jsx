import React from 'react';
import { motion } from 'framer-motion';
import { Play, Tv, Music, Trash2, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const Watch = () => {
  useSEO({
    title: 'Mira y Diviértete',
    description: 'Disfruta de las series originales de Bumsy, canciones infantiles y contenido educativo para niños de todas las edades.',
    image: '/assets/banners/bumsy_28.png'
  });

  const categories = [
    { name: 'Canciones Infantiles', color: 'bg-pink-400', image: '/assets/banners/news_idara.png', icon: <Music /> },
    { name: 'Cuentos Animados', color: 'bg-orange-400', image: '/assets/banners/news_cuentos.png', icon: '📖' },
    { name: 'Aprende con Bumsy', color: 'bg-green-400', image: '/assets/banners/bumsy_skool.png', icon: '💡' },
    { name: 'Pipa Colors', color: 'bg-yellow-400', image: '/assets/banners/pipa_colors.png', icon: <Sparkles /> },
  ];

  const featured = [
    { title: 'Bumsy Taller Mecánico', desc: '¡Vamos a arreglar los coches con Bumsy!', image: '/assets/banners/bumsy_28.png' },
    { title: 'Bumsy en la Escuela', desc: 'Aprende los números y colores con Bumsy.', image: '/assets/banners/escuela.png' },
    { title: 'Cuentos con Stella', desc: 'Historias mágicas para antes de dormir.', image: '/assets/banners/news_cuentos.png' },
  ];

  return (
    <div className="pb-24 bg-white">
      {/* Hero Category - Escenario Bumsy Spark */}
      <section className="relative min-h-screen flex items-center text-white overflow-hidden py-36 md:py-56">
        {/* Background Image Scenario */}
        <div className="absolute inset-0 bg-black">
          <img 
            src="/assets/branding/bumsyspark_escenario.png" 
            alt="Escenario Bumsy Spark" 
            className="w-full h-full object-cover object-center opacity-85 select-none" 
          />
          {/* Multi-layered Premium Gradients for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-[#FCF200]/25 backdrop-blur-md border border-[#FCF200]/40 px-6 py-2.5 rounded-full font-black text-[#FCF200] text-sm uppercase tracking-widest mb-8"
            >
              <Sparkles className="animate-spin" size={16} style={{ animationDuration: '4s' }} /> ¡CONCURSO BUMSY SPARK!
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.95] font-sans"
            >
              ¡Bumsy busca talento! 🌟
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-3xl font-bold text-gray-200 mb-12 leading-relaxed"
            >
              ¡El show de talentos más mágico de Bumsy Town está aquí! Graba el talento de tu pequeño y etiqueta a <span className="text-[#FCF200] font-black">@BumsyGo</span> para brillar juntos.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button 
                onClick={() => document.getElementById('participar').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#FCF200] hover:bg-[#EDE400] text-black px-12 py-6 rounded-full font-black text-2xl shadow-[0_20px_40px_rgba(252,242,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-wider font-sans"
              >
                ✨ PARTICIPAR AHORA
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dinámicas / Cómo Participar Section */}
      <section id="participar" className="py-28 bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-purple-600 font-black text-sm uppercase tracking-[0.25em] bg-purple-600/10 px-6 py-2.5 rounded-full inline-block mb-6">¿CÓMO FUNCIONA?</span>
            <h2 className="text-4xl md:text-6xl font-black text-purple-600 uppercase tracking-tighter mb-8 leading-none">
              Únete al Escenario de Bumsy Town
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-slate-600 leading-relaxed">
              Al igual que todos los habitantes de Bumsy Town, ¡los niños de todo el mundo tienen talentos mágicos que merecen ser compartidos! Graba a tu pequeño cantando, bailando, tocando un instrumento o mostrando su habilidad especial, y etiqueta a <strong className="text-purple-600">@BumsyGo</strong> en redes sociales. ¡Nuestros jueces expertos verán todos los videos para descubrir a la próxima estrella de Bumsy Spark!
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {[
              { step: "1", title: "Graba tu talento", desc: "Graba un video creativo de tu pequeño mostrando su magia especial (cantar, bailar, actuar...)." },
              { step: "2", title: "Súbelo y Etiqueta", desc: "Sube el video a Instagram, TikTok o YouTube etiquetando oficialmente a @BumsyGo." },
              { step: "3", title: "Usa el Hashtag", desc: "Añade el hashtag #BumsySpark en la descripción para que los jueces puedan evaluarlo." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-10 shadow-lg flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-purple-600 text-white font-black rounded-full flex items-center justify-center text-2xl mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="font-black text-2xl text-purple-600 uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Los Jueces Section */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-purple-600 font-black text-sm uppercase tracking-[0.25em] bg-purple-600/10 px-6 py-2.5 rounded-full inline-block mb-6">PANEL OFICIAL</span>
            <h2 className="text-4xl md:text-6xl font-black text-purple-600 uppercase tracking-tighter mb-6 leading-none">
              Nuestros Jueces Estrella 🏆
            </h2>
            <p className="text-xl md:text-2xl font-bold text-slate-500">
              ¡Conoce al panel de expertos de Bumsy Town que evaluará tu talento!
            </p>
          </div>

          {/* Judges 3 Column Layout */}
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { 
                name: "Bubu Tambor", 
                role: "JUEZ DE RITMO Y ENERGÍA 🥁", 
                image: "/assets/characters/circles/bubu.webp",
                desc: "El Rey del Ritmo evaluará los bailes con más ritmo, coreografías creativas y el sentido musical de cada pequeño participante.",
                color: "border-[#3b82f6]/40 hover:shadow-[#3b82f6]/20 bg-blue-50/50 hover:bg-blue-50"
              },
              { 
                name: "Stella", 
                role: "JUEZA DE MAGIA Y CREATIVIDAD ✨", 
                image: "/assets/characters/circles/stella.webp",
                desc: "Nuestra hada favorita buscará las ideas más originales, vestuarios mágicos y puestas en escena llenas de fantasía y color.",
                color: "border-[#a855f7]/40 hover:shadow-[#a855f7]/20 bg-purple-50/50 hover:bg-purple-50"
              },
              { 
                name: "Pipa", 
                role: "JUEZA DE TERNURA Y EXPRESIÓN 🐥", 
                image: "/assets/characters/circles/pipa.webp",
                desc: "La pollina más dulce del grupo evaluará la espontaneidad, la sonrisa y la alegría natural de cada video recibido.",
                color: "border-[#ec4899]/40 hover:shadow-[#ec4899]/20 bg-pink-50/50 hover:bg-pink-50"
              }
            ].map((judge, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`border-4 rounded-[40px] p-8 md:p-10 flex flex-col items-center text-center shadow-lg transition-all duration-300 ${judge.color}`}
              >
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-8 bg-white flex-shrink-0">
                  <img 
                    src={judge.image} 
                    alt={judge.name} 
                    className="w-full h-full object-cover select-none" 
                  />
                </div>
                <h3 className="text-3xl font-black text-purple-600 uppercase tracking-tight mb-2">{judge.name}</h3>
                <span className="font-black text-xs uppercase tracking-[0.2em] text-purple-600 mb-6 block bg-white px-5 py-2 rounded-full border shadow-sm">
                  {judge.role}
                </span>
                <p className="text-slate-600 font-bold leading-relaxed text-base">
                  {judge.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search/Filter Bar */}
      <section className="bg-white border-b border-purple-600/5 py-4 sticky top-[70px] z-40">
        <div className="container mx-auto px-6 flex items-center justify-between">
           <div className="flex gap-8 overflow-x-auto no-scrollbar pb-2">
             {['Recientes', 'Populares', 'Personajes', 'Series'].map(cat => (
               <button key={cat} className="font-black text-purple-600/40 hover:text-purple-700 whitespace-nowrap uppercase tracking-widest text-sm">
                 {cat}
               </button>
             ))}
           </div>
           <button className="bg-purple-600/5 p-2 rounded-full text-purple-600 hover:bg-purple-600/10 transition-colors">🔍</button>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-16">
           <h2 className="text-5xl md:text-6xl font-black text-purple-600 tracking-tighter uppercase">Videos Populares</h2>
           <button className="text-purple-600/40 font-black flex items-center gap-2 hover:text-purple-700 transition-colors uppercase tracking-widest text-sm">Ver todos <ChevronRight /></button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featured.map((v, i) => (
            <motion.div key={i} whileHover={{ y: -15 }} className="group cursor-pointer">
              <div className="aspect-video rounded-[50px] overflow-hidden mb-8 relative shadow-2xl border-4 border-purple-600/5">
                <img src={v.image} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInHover={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-2xl"
                  >
                    <Play fill="currentColor" size={32} className="ml-2" />
                  </motion.div>
                </div>
              </div>
              <h3 className="text-3xl font-black text-purple-600 mb-4 uppercase tracking-tight">{v.title}</h3>
              <p className="text-slate-600 font-bold mb-6 text-lg leading-relaxed">{v.desc}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600/5 rounded-full flex items-center justify-center text-purple-600">
                  <Tv size={20} />
                </div>
                <span className="text-purple-600 font-black text-xs uppercase tracking-[0.2em]">En nuestro canal</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-purple-600/5 py-32 overflow-hidden">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2 order-2 md:order-1 relative">
               <div className="aspect-video bg-white rounded-[80px] shadow-[0_40px_80px_rgba(8,112,184,0.15)] overflow-hidden flex items-center justify-center relative z-10 border-8 border-white">
                 <img src="/assets/banners/bumsy-plus.png" alt="Bumsy TV" className="w-full h-full object-cover" />
               </div>
               <div className="absolute -inset-10 bg-gradient-to-br from-purple-600/20 to-purple-500/20 blur-3xl -z-0 rounded-full"></div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
               <div className="bg-purple-600/10 text-purple-600 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-8 inline-block">MÁS ALLÁ DE LA WEB</div>
               <h2 className="text-5xl md:text-7xl font-black text-purple-600 mb-8 tracking-tighter leading-none uppercase">¡Bumsy en tu TV!</h2>
               <p className="text-2xl text-slate-600 font-bold leading-relaxed mb-12">
                 Nuestra serie animada llega a las plataformas de streaming más importantes del mundo. ¡Disfruta de "Bumsy Wonderstar" en alta definición!
               </p>
               <div className="flex flex-wrap gap-6">
                  <div className="bg-white px-10 py-5 rounded-[24px] shadow-xl font-black text-purple-600 border border-purple-600/5 hover:scale-105 transition-transform cursor-pointer tracking-widest">NETFLIX</div>
                  <div className="bg-white px-10 py-5 rounded-[24px] shadow-xl font-black text-purple-600 border border-purple-600/5 hover:scale-105 transition-transform cursor-pointer tracking-widest">DISNEY+</div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Watch;
