import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Briefcase, Zap, Video, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Business = () => {
  useSEO({
    title: 'Negocios y Licenciamiento',
    description: 'Únete al éxito global de Bumsy Go. Descubre oportunidades de licenciamiento, alianzas estratégicas y expansión de marca.',
    image: '/assets/banners/mercha.webp'
  });

  return (
    <div className="pb-24 bg-white">
      {/* Hero Section */}
      <section 
        className="pt-40 pb-28 text-white relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[85vh] flex items-center"
        style={{ backgroundImage: "url('/assets/branding/wallpaper_orange.webp')" }}
      >
        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-block bg-white/20 backdrop-blur-md px-8 py-3 rounded-full font-black text-sm uppercase tracking-[0.2em] mb-8 border border-white/30 shadow-lg">
              SOCIOS Y ALIANZAS ESTRATÉGICAS
            </div>
            
            {/* Center Bumsy Business Graphic */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="mb-10 flex justify-center"
            >
              <img 
                src="/assets/branding/tiger_negocios.webp" 
                alt="Tiger Negocios" 
                className="max-h-[280px] md:max-h-[420px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.45)] select-none hover:scale-105 transition-transform duration-500" 
              />
            </motion.div>

            <p className="text-xl md:text-3xl font-extrabold text-white leading-relaxed mb-12 max-w-4xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              Llevando la magia y el entretenimiento preescolar a todo el mundo. Descubre cómo tu marca puede crecer con el universo de Bumsy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-[#FCF200] hover:bg-[#EDE400] text-black px-12 py-6 rounded-full font-black text-2xl shadow-[0_20px_40px_rgba(252,242,0,0.25)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-tight">
                <Briefcase size={28} /> CONTACTAR AHORA
              </button>
              <button className="bg-white/20 backdrop-blur-md border-4 border-white text-white px-12 py-6 rounded-full font-black text-2xl hover:bg-white/35 transition-all uppercase tracking-tight hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                DOSSIER 2026
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección Corporativa: Conexión y Líneas de Negocio */}
      <section className="py-24 bg-white border-t border-gray-100 relative">
        <div className="container mx-auto px-6">
          
          {/* Corporate Header / Overview (2 Columns) */}
          <div className="flex flex-col lg:flex-row gap-16 items-start justify-between mb-24 border-b border-gray-100 pb-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight uppercase font-sans">
                Conectando a personas de todo el mundo a través de contenido alegre
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold">
                Bumsy es una compañía de entretenimiento global que ofrece contenido atractivo y experiencias entretenidas para familias de todo el mundo. Conectamos a personas de todo el mundo a través de contenido de todos los géneros y formatos, incluidos programas animados originales, giras en vivo, juegos interactivos, mercancía y mucho más.
              </p>
            </div>
          </div>

          {/* Clean Corporate Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { icon: <Video size={28} className="text-gray-900" />, label: "Vistas Mensuales", value: "50M+" },
              { icon: <Globe size={28} className="text-gray-900" />, label: "Países", value: "150+" },
              { icon: <Users size={28} className="text-gray-900" />, label: "Suscriptores", value: "10M+" },
              { icon: <Zap size={28} className="text-gray-900" />, label: "Licencias Activas", value: "85+" }
            ].map((stat, i) => (
              <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.08 }}
                 className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-gray-100/50 transition-colors"
              >
                 <div className="w-14 h-14 bg-white border border-gray-200/50 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                   {stat.icon}
                 </div>
                 <h3 className="text-4xl font-black text-black mb-2 tracking-tight">{stat.value}</h3>
                 <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Líneas de Negocio (Business Grid) */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-16">
              <span className="h-1.5 w-12 bg-gray-900 rounded-full"></span>
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight uppercase">
                Negocios
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Pillar 1: Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200/60 rounded-[40px] p-10 flex flex-col justify-between hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all group min-h-[380px]"
              >
                <div>
                  <div className="w-16 h-16 bg-gray-50 border border-gray-200/50 rounded-2xl flex items-center justify-center text-gray-900 mb-8 group-hover:scale-105 transition-transform">
                    <Video size={30} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">Contenido</h3>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    Bumsy ofrece contenido de calidad que incluye canciones e historias, espectáculos teatrales y aplicaciones móviles en todas las plataformas, entre otros.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-black font-black text-lg group-hover:text-accent transition-colors cursor-pointer">
                  Descubrir más <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>

              {/* Pillar 2: Partnership */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-gray-200/60 rounded-[40px] p-10 flex flex-col justify-between hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all group min-h-[380px]"
              >
                <div>
                  <div className="w-16 h-16 bg-gray-50 border border-gray-200/50 rounded-2xl flex items-center justify-center text-gray-900 mb-8 group-hover:scale-105 transition-transform">
                    <Briefcase size={30} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">Alianzas</h3>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    Forjamos alianzas con marcas y empresas de todo el mundo para impulsar sinergias comerciales en diversas industrias, incluidas instituciones públicas, productos de consumo, tecnología y más.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-black font-black text-lg group-hover:text-accent transition-colors cursor-pointer">
                  Descubrir más <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>

              {/* Pillar 3: Merchandise */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-gray-200/60 rounded-[40px] p-10 flex flex-col justify-between hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all group min-h-[380px]"
              >
                <div>
                  <div className="w-16 h-16 bg-gray-50 border border-gray-200/50 rounded-2xl flex items-center justify-center text-gray-900 mb-8 group-hover:scale-105 transition-transform">
                    <Zap size={30} />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">Productos y Licencias</h3>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    Diseñados por equipos y socios galardonados, nuestros productos y mercancías basados en contenido brindan a los fanáticos oportunidades únicas para disfrutar de su contenido favorito.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-black font-black text-lg group-hover:text-accent transition-colors cursor-pointer">
                  Descubrir más <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Contact CTA - High End Slate Grey Redesign */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gray-900 rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-gray-800">
             <div className="relative z-10">
                <Sparkles className="mx-auto text-[#FCF200] opacity-80 mb-8" size={56} />
                <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase leading-none">
                  ¿Listo para conectar?
                </h2>
                <p className="text-lg md:text-2xl text-gray-300 font-bold max-w-3xl mx-auto mb-12 leading-relaxed">
                  Estamos buscando siempre aliados estratégicos que compartan nuestra visión de divertir y educar a la próxima generación.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                   <button className="bg-[#FCF200] hover:bg-[#EDE400] text-black px-12 py-5 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-wider shadow-lg">
                     AGENDAR REUNIÓN
                   </button>
                   <button className="bg-white/10 hover:bg-white/20 text-white border-4 border-white/20 px-12 py-5 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-wider">
                     DESCARGAR MEDIA KIT
                   </button>
                </div>
             </div>
             {/* Decor */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 left-10 w-48 h-48 bg-[#FCF200] rounded-full blur-2xl"></div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;
