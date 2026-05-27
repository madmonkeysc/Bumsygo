import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Bell, Share2, ChevronRight, Globe, Zap } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const News = () => {
  useSEO({
    title: 'Noticias y Novedades',
    description: 'Mantente al día con las últimas noticias, lanzamientos globales y colaboraciones especiales de Bumsy Go.',
    image: '/assets/banners/news_world.webp'
  });

  const articles = [
    {
      id: 1,
      title: 'Colaboración Global: Bumsy Go! x Idara Play',
      date: '12 de Abril, 2026',
      desc: 'Nos unimos a Idara Play para lanzar una serie de contenidos musicales únicos. ¡Disfruta del ritmo de Bumsy en todas partes!',
      category: 'Colaboración',
      image: '/assets/banners/news_idara.webp'
    },
    {
      id: 2,
      title: 'Bumsy Town: Ya disponible en países de habla hispana',
      date: '8 de Abril, 2026',
      desc: 'Nuestra aplicación interactiva Bumsy Town ha alcanzado un nuevo hito global. ¡Gracias a todas las familias hispanohablantes por ser parte de esta aventura!',
      category: 'Lanzamiento',
      image: '/assets/banners/news_world.webp'
    },
    {
      id: 3,
      title: 'Temporada 1 de "Cuentos Mágicos"',
      date: '2 de Abril, 2026',
      desc: 'Disfruta de las mejores historias y leyendas en esta primera temporada, ahora disponible en nuestro canal oficial.',
      category: 'Contenido',
      image: '/assets/banners/news_cuentos.webp'
    },
    {
      id: 4,
      title: 'Aventura en la Escuela con Bumsy',
      date: '25 de Marzo, 2026',
      desc: 'Prepárate para los nuevos episodios educativos que se lanzarán este mes. ¡Aprender nunca fue tan divertido!',
      category: 'Educación',
      image: '/assets/banners/escuela.webp'
    }
  ];

  return (
    <div className="pb-24 pt-20 bg-white">
      {/* Header Section */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-16"
          >
            <div className="md:w-1/2 text-center md:text-left">
              <div className="bg-white/10 px-8 py-3 rounded-full inline-flex items-center gap-3 font-black text-sm uppercase tracking-[0.2em] mb-10 border border-white/20">
                <Bell size={20} /> SALA DE PRENSA
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none uppercase tracking-tighter" style={{ fontFamily: "'Poppins', sans-serif" }}>Noticias Bumsy</h1>
              <p className="text-xl md:text-3xl font-bold opacity-90 max-w-2xl leading-relaxed">
                Mantente al día con las colaboraciones mundiales, lanzamientos y anuncios especiales de The Bumsy Company.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-full max-w-md aspect-square bg-white/10 rounded-full flex items-center justify-center p-12 backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                <img loading="lazy" src="/assets/banners/news_world.webp" alt="Bumsy News" className="w-full h-auto drop-shadow-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* Background Decorative */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent opacity-20 blur-[100px] rounded-full"></div>
      </section>

      {/* Main News Feed - SHARP STYLE as requested */}
      <section className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {articles.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white shadow-[0_30px_60px_rgba(0,0,0,0.05)] flex flex-col border border-gray-100 group transition-all duration-500"
            >
              <div className="aspect-[16/9] overflow-hidden bg-gray-50">
                <img loading="lazy" src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="p-12 md:p-16 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-8">
                  <span className="bg-primary/10 text-primary px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">
                    {article.category}
                  </span>
                  <span className="font-black text-primary/30 uppercase text-sm tracking-[0.2em]">
                    {article.date}
                  </span>
                </div>
                <h2 className="text-4xl font-black text-primary mb-8 group-hover:text-accent transition-colors leading-tight tracking-tight uppercase">
                  {article.title}
                </h2>
                <p className="text-xl text-primary/60 font-bold mb-12 leading-relaxed flex-1">
                  {article.desc}
                </p>
                <div className="flex items-center justify-between pt-10 border-t border-gray-100">
                  <button className="text-primary font-black text-xl flex items-center gap-3 hover:gap-6 transition-all group-hover:text-accent uppercase tracking-tighter">
                    Leer más <ChevronRight size={24} />
                  </button>
                  <button className="p-4 bg-primary/5 text-primary/40 rounded-full hover:bg-primary/10 hover:text-primary transition-all">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="bg-primary/5 py-32 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2">
             <div className="flex items-center gap-6 mb-12">
               <div className="bg-white p-6 rounded-[30px] text-blue-500 shadow-xl">
                  <Globe size={48} />
               </div>
               <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tighter uppercase leading-none">Colaboración Global</h2>
             </div>
             <p className="text-2xl text-primary/60 font-bold leading-relaxed mb-12">
               En Bumsy Go, creemos en el poder de las alianzas para llevar alegría y educación a todos los rincones del planeta.
             </p>
             <div className="space-y-8">
                {[
                  { title: 'Licenciamiento de Marca', icon: <Zap size={28} /> },
                  { title: 'Alianzas Estratégicas', icon: <Share2 size={28} /> },
                  { title: 'Contenido Co-branded', icon: <Globe size={28} /> }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 20 }}
                    className="flex items-center gap-8 p-8 rounded-[40px] bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer border border-primary/5"
                  >
                    <div className="text-accent">{item.icon}</div>
                    <span className="text-2xl font-black text-primary uppercase tracking-tight">{item.title}</span>
                  </motion.div>
                ))}
             </div>
          </div>
          <div className="lg:w-1/2 bg-white rounded-[80px] p-20 text-center shadow-2xl border-4 border-primary/5 relative">
             <div className="absolute -top-10 -left-10 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl shadow-xl animate-bounce">🤝</div>
             <h3 className="text-4xl font-black text-primary mb-8 uppercase tracking-tighter">¿Quieres trabajar con nosotros?</h3>
             <p className="text-2xl text-primary/40 font-bold mb-12 leading-relaxed">Explora las oportunidades de negocio y únete a la familia de The Bumsy Company.</p>
             <button className="bg-primary text-white px-12 py-6 rounded-full font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                CONSULTAR COLABORACIÓN
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
