import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, ChevronRight, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const MeetAndPlay = () => {
  useSEO({
    title: 'Conoce y Juega',
    description: 'Encuentra los próximos eventos en vivo de Bumsy, shows musicales y talleres creativos para toda la familia.',
    image: '/assets/banners/navidad.webp'
  });

  const events = [
    {
      id: 1,
      title: 'Bumsy Live Show: El Misterio del Bosque',
      date: '25 Abr - 30 May',
      location: 'Teatros Principales, Latam',
      desc: '¡Bumsy y sus amigos cobran vida en un escenario lleno de música, luces y magia para toda la familia!',
      image: '/assets/banners/escuela.webp',
      color: 'bg-primary'
    },
    {
      id: 2,
      title: 'Festival de Primavera con Bumsy',
      date: '15 de Mayo',
      location: 'Galería Central, Ciudad de México',
      desc: 'Ven a conocer a Tarta y Uni en persona, tómate una foto y llévate un recuerdo inolvidable en nuestro festival.',
      image: '/assets/banners/navidad.webp',
      color: 'bg-accent'
    },
    {
      id: 3,
      title: 'Taller de Dibujo: Crea tu propio Bumsy',
      date: 'Cada Sábado',
      location: 'Online (Zoom)',
      desc: 'Nuestros ilustradores te enseñarán paso a paso cómo dibujar a los personajes de Bumsy Go.',
      image: '/assets/banners/pintar.png',
      color: 'bg-secondary'
    }
  ];

  return (
    <div className="pb-24 bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="/assets/parents/sea.webp" 
            alt="Sea Background" 
            className="w-full h-full object-cover"
          />
          {/* Transparent overlays for contrast only, no pink mask */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
        </div>

        <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            {/* Top Text */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] whitespace-nowrap">
              Experiencia Bumsy
            </h1>
            <p className="text-lg md:text-3xl font-bold text-white/90 uppercase tracking-widest mb-10 drop-shadow-md">
              Diseñada para los niños y su aprendizaje.
            </p>

            {/* Bubu Character */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative mb-8"
            >
              <img 
                src="/assets/games/bubu_full.webp" 
                alt="Bubu Tambor" 
                className="h-[280px] md:h-[450px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-12 bg-black/30 blur-2xl rounded-full"
              />
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full shadow-2xl -mt-4"
            >
              <span className="text-lg md:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-4">
                <Sparkles className="text-accent" size={24} fill="currentColor" />
                Diseñado por expertos en niños.
                <Sparkles className="text-accent" size={24} fill="currentColor" />
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        {/* Soft Curve Divider at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20" />
      </section>

      {/* Parents Section Divider - Full Width & Organic Integration */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden -mt-24 z-30">
        <div className="absolute inset-0">
          <img 
            src="/assets/parents/parents_img.webp" 
            alt="Bumsy Parents" 
            className="w-full h-full object-cover"
          />
          {/* Top Gradient for Organic Integration with Hero */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white via-white/50 to-transparent z-10" />
          
          {/* Bottom Gradient for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        </div>
        <div className="container mx-auto px-6 relative z-20 text-center pb-40 md:pb-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-4xl font-bold text-white leading-relaxed drop-shadow-xl italic">
              "Comienza el viaje con Bumsy, es hora de que tus hijos aprendan"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sergi Learning Section with Wave Transition */}
      <section className="py-40 bg-white relative overflow-hidden -mt-20 pt-64">
        {/* Decorative Wave-like Background element */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-50 to-white -z-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-slate-800 mb-16 leading-tight tracking-tight max-w-4xl"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Siempre pensamos en lo que necesitan tus hijos <br className="hidden md:block" />
              <span className="text-orange-500">y para cada etapa de su desarrollo.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              <img 
                src="/assets/parents/sergi_learning.webp" 
                alt="Sergi Learning" 
                className="h-[400px] md:h-[600px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
              />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 h-10 bg-slate-900/5 blur-2xl rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-12 rounded-[50px] border-4 border-slate-100 w-full shadow-inner"
            >
              <p className="text-2xl md:text-3xl font-bold text-slate-800 mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Fomentamos habilidades clave como:
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {['Cognición', 'Pensamiento', 'Empatía', 'Creatividad', 'Lógica'].map((skill, i) => (
                  <span key={i} className="bg-white px-8 py-4 rounded-full shadow-md text-slate-700 font-bold uppercase tracking-widest text-sm hover:scale-110 transition-transform cursor-default" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-xl md:text-2xl font-semibold text-slate-500 mt-10" style={{ fontFamily: "'Poppins', sans-serif" }}>
                ...y mucho más para un crecimiento integral.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-40 left-10 opacity-10">
          <Sparkles size={100} className="text-orange-400 rotate-12" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Sparkles size={120} className="text-slate-400 -rotate-12" />
        </div>
      </section>

      {/* Activities Grid - Redesigned to be Modern & Professional */}
      <section className="py-32 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6">Más formas de Jugar</h2>
              <p className="text-xl md:text-2xl font-medium text-slate-500" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Explora el ecosistema completo de diversión y aprendizaje que hemos creado para tu familia.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Juegos Online', icon: '🎮', image: '/assets/banners/bumsy-plus.webp', desc: 'Desafíos interactivos que estimulan el pensamiento lógico.' },
              { title: 'Canciones en Vivo', icon: '🎤', image: '/assets/banners/news_idara.webp', desc: 'Videos musicales diseñados para el desarrollo motriz.' },
              { title: 'Zona Creativa', icon: '🎨', image: '/assets/banners/pintar.png', desc: 'Actividades descargables para fomentar la creatividad.' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-64 overflow-hidden relative">
                  <img loading="lazy" src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all"></div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl">{item.icon}</span>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 font-medium mb-10 text-lg flex-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.desc}</p>
                  <button className="flex items-center justify-between w-full group/btn text-slate-900 font-bold uppercase tracking-widest text-sm border-t border-slate-100 pt-6 hover:text-orange-500 transition-colors">
                    Ver más <ChevronRight className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Clean & Detailed */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6">Preguntas Frecuentes</h2>
            <div className="w-24 h-2 bg-orange-500 mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-4">
            {[
              {
                q: "¿Qué es bumsy go?",
                a: "Bumsy go es un universo educativo y divertido para niños de 2 a 6 años."
              },
              {
                q: "¿Es seguro para niños?",
                a: "Sí, ofrecemos un espacio seguro con contenido controlado y educativo para el desarrollo infantil."
              },
              {
                q: "¿Qué actividades ofrece?",
                a: "Ofrecemos videos musicales, juegos interactivos y actividades creativas que estimulan la imaginación y enseñan valores importantes."
              },
              {
                q: "¿Para qué edades es adecuado?",
                a: "Las actividades son variadas y entretenidas. Así que se trabaja para que vivan la experiencia niños desde 2 a 8 años."
              },
              {
                q: "¿Cómo puedo acceder?",
                a: "Puedes acceder a bumsy go a través de nuestro sitio web y disfrutar de todo el contenido. Así como también en todas nuestras redes sociales."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-slate-100 py-10 last:border-0"
              >
                <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-start gap-6">
                  <span className="text-orange-500 font-black">0{i+1}.</span>
                  {faq.q}
                </h4>
                <p className="text-xl md:text-2xl font-medium text-slate-500 leading-relaxed pl-16 md:pl-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetAndPlay;
