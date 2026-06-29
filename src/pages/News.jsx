import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Bell, Share2, ChevronRight, Globe, Zap, X } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const News = () => {
  useSEO({
    title: 'Noticias y Novedades',
    description: 'Mantente al día con las últimas noticias, lanzamientos globales y colaboraciones especiales de Bumsy Go.',
    image: '/assets/banners/news_world.jpeg'
  });

  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'Bumsy en el Mundo: ¡Lanzamiento en países de habla hispana!',
      date: '15 de Abril, 2026',
      desc: 'El mapa interactivo de Bumsy Town abre sus puertas a toda la comunidad de habla hispana con minijuegos educativos.',
      category: 'Lanzamiento',
      image: '/assets/banners/news_world.jpeg',
      fullContent: `¡Una noticia que nos llena de emoción! Bumsy Town, la aplicación educativa líder para niños en edad preescolar, ya se encuentra disponible de forma oficial en España y toda Latinoamérica. A través de este colorido mapa digital interactivo, los pequeños pueden explorar los hogares de sus personajes favoritos: el gran piano de Idara, el circuito de carreras de Sergi y el mágico Bosque Arcoíris custodiado por Drako. 

Cada zona incluye minijuegos diseñados para estimular la lógica, la memoria y el reconocimiento de colores, con controles intuitivos adaptados para manos pequeñas. ¡Únete a los miles de familias que ya están aprendiendo y jugando juntas en Bumsy Town!`
    },
    {
      id: 2,
      title: 'Colaboración Global: Bumsy Go! x Idara Play',
      date: '12 de Abril, 2026',
      desc: 'Nos unimos a Idara Play para lanzar una serie de contenidos musicales únicos. ¡Disfruta del ritmo de Bumsy en todas partes!',
      category: 'Colaboración',
      image: '/assets/banners/news_idara.jpeg',
      fullContent: `¡Prepárate para bailar sin parar! The Bumsy Company se complace en anunciar su colaboración musical definitiva con el canal de Idara Play y el Loco Dael. Juntos han creado una serie de videos musicales llenos de energía y coreografías fáciles de seguir, perfectos para incentivar la motricidad y coordinación de los niños. 

La carismática Idara nos guiará a través de divertidos retos de baile mientras cantamos los grandes éxitos de Bumsy Town con arreglos dinámicos completamente nuevos. Los videos estarán disponibles a partir de esta semana en YouTube y en nuestra plataforma oficial. ¡Sintoniza el ritmo de Bumsy y pon a prueba tus mejores pasos!`
    },
    {
      id: 3,
      title: 'Temporada 1 de "Cuentos Mágicos"',
      date: '2 de Abril, 2026',
      desc: 'Disfruta de las mejores historias y leyendas en esta primera temporada, ahora disponible en nuestro canal oficial.',
      category: 'Contenido',
      image: '/assets/banners/news_cuentos.jpeg',
      fullContent: `La hora de dormir se convierte en un momento verdaderamente mágico. Estrenamos la primera temporada de "Cuentos Mágicos", una colección de historias ilustradas y animadas narradas por el Hada Stella. 

Cada cuento está diseñado no solo para entretener, sino para transmitir valores esenciales como la amistad, la empatía, el compartir y el cuidado de la naturaleza. Los niños podrán acompañar a Lumi en su búsqueda de la estrella perdida o aprender de la paciencia junto al dragón Drako. Ya puedes disfrutar de todos los episodios completos con audio adaptado y subtítulos interactivos en la sección de Aventuras. ¡Deja que la magia de los cuentos guíe los dulces sueños de tus pequeños!`
    },
    {
      id: 4,
      title: 'Aventura en la Escuela con Bumsy',
      date: '25 de Marzo, 2026',
      desc: 'Prepárate para los nuevos episodios educativos que se lanzarán este mes. ¡Aprender nunca fue tan divertido!',
      category: 'Educación',
      image: '/assets/banners/news_skul.jpeg',
      fullContent: `¡Bumsy va a la escuela! Nos enorgullece presentar Bumsy Skool, una iniciativa global orientada a colaborar con jardines de infancia y centros de educación infantil. 

A través de este programa, los docentes tendrán acceso gratuito a cuadernos de actividades imprimibles, fichas para colorear de Pipa Colors y dinámicas grupales basadas en los personajes de Bumsy Town. Nuestro equipo pedagógico ha estructurado estos recursos bajo metodologías de aprendizaje lúdico, ayudando a los niños a desarrollar habilidades cognitivas, motrices y socioemocionales de una manera divertida y natural. ¡Lleva la alegría del Bosque Arcoíris directamente a las aulas y transforma el aprendizaje diario!`
    }
  ];

  return (
    <div className="pb-24 bg-white">
      {/* Header Section */}
      <section 
        className="pt-40 pb-28 text-white relative overflow-hidden bg-primary"
        style={{ 
          backgroundImage: "url('/assets/banners/fondo_verde.png')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        {/* Overlay dark to ensure readability */}
        <div className="absolute inset-0 bg-black/10 z-0"></div>

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
              <p className="text-xl md:text-3xl font-bold opacity-90 max-w-2xl leading-relaxed mb-10">
                ¡El diario oficial de Bumsy Town! Abre las puertas a lanzamientos exclusivos, canciones pegadizas y aventuras mágicas de toda la pandilla.
              </p>
              <button 
                onClick={() => document.getElementById('news-feed').scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent text-white px-10 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
              >
                Ver últimas noticias
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-lg"
              >
                <img loading="lazy" src="/assets/banners/dragona_news.png" alt="Dragona News" className="w-full h-auto drop-shadow-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main News Feed - SHARP STYLE as requested */}
      <section id="news-feed" className="container mx-auto px-6 pt-48 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {articles.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className="bg-white shadow-[0_30px_60px_rgba(0,0,0,0.05)] flex flex-col border border-gray-100 group transition-all duration-500 rounded-3xl overflow-hidden"
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
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    className="text-primary font-black text-xl flex items-center gap-3 hover:gap-6 transition-all group-hover:text-accent uppercase tracking-tighter"
                  >
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
               En Bumsy Go, creemos en el power de las alianzas para llevar alegría y educación a todos los rincones del planeta.
             </p>
             <div className="space-y-8">
                {[
                  { 
                    title: 'Licenciamiento de Marca', 
                    icon: <Zap size={28} />, 
                    url: 'https://tidycal.com/humbertocarosilva/licenciamiento-bumsy-go' 
                  },
                  { 
                    title: 'Alianzas Estratégicas', 
                    icon: <Share2 size={28} />, 
                    url: 'https://tidycal.com/humbertocarosilva/alianzas-creativas-bumsy-go' 
                  },
                  { 
                    title: 'Contenido Co-branded', 
                    icon: <Globe size={28} />, 
                    url: 'https://tidycal.com/humbertocarosilva/alianzas-creativas-bumsy-go' 
                  }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block"
                  >
                    <motion.div 
                      whileHover={{ x: 20 }}
                      className="flex items-center gap-8 p-8 rounded-[40px] bg-white shadow-sm hover:shadow-xl transition-all cursor-pointer border border-primary/5"
                    >
                      <div className="text-accent">{item.icon}</div>
                      <span className="text-2xl font-black text-primary uppercase tracking-tight">{item.title}</span>
                    </motion.div>
                  </a>
                ))}
             </div>
          </div>
          <div className="lg:w-1/2 bg-white rounded-[80px] p-20 text-center shadow-2xl border-4 border-primary/5 relative">
             <h3 className="text-4xl font-black text-primary mb-8 uppercase tracking-tighter">¿Quieres trabajar con nosotros?</h3>
             <p className="text-2xl text-primary/40 font-bold mb-12 leading-relaxed">Explora las oportunidades de negocio y únete a la familia de The Bumsy Company.</p>
             <a 
               href="https://tidycal.com/humbertocarosilva/alianzas-creativas-bumsy-go" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-block"
             >
               <button className="bg-primary text-white px-12 py-6 rounded-full font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
                  CONSULTAR COLABORACIÓN
               </button>
             </a>
          </div>
        </div>
      </section>

      {/* Modal Detalle de Noticia */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white w-full max-w-4xl max-h-[85vh] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-20 p-3 bg-white/80 backdrop-blur-sm text-primary hover:text-accent rounded-full shadow-md transition-all hover:scale-110 active:scale-95"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto flex-1">
                {/* Banner Image */}
                <div className="w-full aspect-[21/9] md:aspect-[16/6] bg-gray-50 overflow-hidden relative">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">
                      {selectedArticle.category}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-8 md:p-16">
                  <div className="text-sm font-black text-primary/30 uppercase tracking-[0.2em] mb-4">
                    {selectedArticle.date}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight tracking-tight uppercase">
                    {selectedArticle.title}
                  </h2>
                  <div className="text-xl md:text-2xl text-primary/70 font-bold leading-relaxed space-y-6 whitespace-pre-line">
                    {selectedArticle.fullContent}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 md:px-16 md:py-8 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="bg-primary text-white px-8 py-4 rounded-full font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                >
                  Cerrar
                </button>
                <button className="flex items-center gap-3 p-4 bg-white text-primary hover:text-accent border border-gray-200 rounded-full font-black text-base hover:shadow-md transition-all">
                  <Share2 size={20} /> Compartir Noticia
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default News;
