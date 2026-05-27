import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Play as Android, Star, ShieldCheck, Zap, Download, Smartphone } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Apps = () => {
  useSEO({
    title: 'Apps y Juegos Interactivos',
    description: 'Lleva la diversión de Bumsy Go a tus dispositivos móviles. Juegos educativos, seguros y divertidos para niños de todas las edades.',
    image: '/assets/banners/bumsy-plus.webp'
  });

  const apps = [
    {
      id: 1,
      name: 'Bumsy Mundo Mágico',
      desc: 'Explora el bosque, juega mini-juegos y colecciona pegatinas digitales de tus personajes favoritos en nuestra app principal.',
      rating: '4.9',
      reviews: '2.5k',
      tags: ['Aventura', 'Creatividad'],
      color: 'bg-primary',
      image: '/assets/banners/bumsy-plus.webp'
    },
    {
      id: 2,
      name: 'Bumsy Colorea y Crea',
      desc: 'Dibuja, colorea y reconoce formas geométricas en un mundo lleno de brillo y magia con todos los amigos de Bumsy Go.',
      rating: '4.8',
      reviews: '3.1k',
      tags: ['Arte', 'Niños'],
      color: 'bg-accent',
      image: '/assets/banners/pintar.png'
    },
    {
      id: 3,
      name: 'Bumsy School: Números',
      desc: 'Aprende a contar y realizar operaciones básicas con la ayuda de Tarta y Pipo en este juego educativo de primer nivel.',
      rating: '4.9',
      reviews: '1.8k',
      tags: ['Educación', 'Matemáticas'],
      color: 'bg-secondary',
      image: '/assets/banners/escuela.webp'
    }
  ];

  const features = [
    { icon: <ShieldCheck size={40} />, title: 'Seguro para Niños', desc: 'Sin anuncios de terceros ni compras accidentales, garantizando una experiencia protegida.' },
    { icon: <Zap size={40} />, title: 'Aprendizaje Activo', desc: 'Contenido diseñado por expertos en pedagogía infantil para potenciar el desarrollo cognitivo.' },
    { icon: <Star size={40} />, title: 'Premiado', desc: 'Galardonado internacionalmente como el mejor ecosistema educativo digital del año.' },
  ];

  return (
    <div className="pb-24 pt-20 bg-white">
      {/* Hero Section */}
      <section className="bg-primary py-24 text-white rounded-b-[100px] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none uppercase tracking-tighter" style={{ fontFamily: "'Poppins', sans-serif" }}>Apps & Juegos</h1>
            <p className="text-xl md:text-3xl font-bold opacity-90 max-w-3xl mx-auto mb-16 leading-relaxed">
              Lleva la magia de Bumsy Go a todas partes con nuestras aplicaciones interactivas de clase mundial.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
               <button className="bg-white/10 hover:bg-white/20 px-10 py-5 rounded-[30px] flex items-center gap-4 backdrop-blur-xl border-2 border-white/20 transition-all group">
                  <Apple className="group-hover:scale-110 transition-transform" size={32} /> 
                  <div className="text-left">
                    <p className="text-xs font-black opacity-60 uppercase tracking-widest">Descarga en</p>
                    <p className="font-black text-xl leading-none">App Store</p>
                  </div>
               </button>
               <button className="bg-white/10 hover:bg-white/20 px-10 py-5 rounded-[30px] flex items-center gap-4 backdrop-blur-xl border-2 border-white/20 transition-all group">
                  <Android className="group-hover:scale-110 transition-transform" size={32} /> 
                  <div className="text-left">
                    <p className="text-xs font-black opacity-60 uppercase tracking-widest">Disponible en</p>
                    <p className="font-black text-xl leading-none">Google Play</p>
                  </div>
               </button>
            </div>
          </motion.div>
        </div>
        {/* Decor */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent rounded-full blur-[100px]"></div>
           <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-secondary rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="container mx-auto px-6 py-32">
        <div className="space-y-40">
          {apps.map((app, i) => (
            <motion.div 
              key={app.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-24`}
            >
              <div className="lg:w-1/2">
                <div className="flex gap-3 mb-10">
                  {app.tags.map(tag => (
                    <span key={tag} className="bg-primary/10 text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-primary mb-10 leading-none uppercase tracking-tighter">{app.name}</h2>
                <p className="text-2xl text-primary/60 mb-12 leading-relaxed font-bold">
                  {app.desc}
                </p>
                <div className="flex items-center gap-12 mb-12">
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-4xl font-black text-primary tracking-tighter">
                      {app.rating} <Star fill="#FFD600" color="#FFD600" size={32} />
                    </span>
                    <p className="text-sm text-primary/30 font-black uppercase tracking-widest mt-2">{app.reviews} Reseñas</p>
                  </div>
                  <div className="h-16 w-1 bg-primary/5 rounded-full"></div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-primary tracking-tighter">4+</span>
                    <p className="text-sm text-primary/30 font-black uppercase tracking-widest mt-2">Edad Recomendada</p>
                  </div>
                </div>
                <button className="bg-primary text-white px-12 py-6 rounded-full font-black text-2xl shadow-2xl flex items-center gap-4 hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter">
                  <Download size={28} /> DESCARGAR AHORA
                </button>
              </div>

              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-[500px] group">
                  <motion.div 
                    animate={{ rotate: i % 2 === 0 ? [0, 5, -5, 0] : [0, -5, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="relative bg-white p-6 rounded-[80px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-primary/5 overflow-hidden"
                  >
                    <div className="aspect-[9/18] bg-gray-50 rounded-[60px] overflow-hidden">
                       <img loading="lazy" src={app.image} alt={app.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                  </motion.div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 bg-secondary p-8 rounded-[40px] shadow-2xl animate-bounce text-4xl">✨</div>
                  <div className="absolute -bottom-10 -left-10 bg-accent p-8 rounded-[40px] shadow-2xl animate-pulse text-4xl text-white"><Smartphone size={48} /></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-primary py-32 rounded-[100px] mx-6">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            {features.map((feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -20 }}
                className="bg-white p-16 rounded-[80px] shadow-2xl text-center flex flex-col items-center"
              >
                <div className="bg-primary/5 text-primary p-10 rounded-[40px] mb-10 shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-black text-primary mb-6 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-xl text-primary/60 font-bold leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-6 py-40 text-center">
        <h2 className="text-5xl md:text-7xl font-black text-primary mb-16 tracking-tighter uppercase leading-none">Disponible en todas partes</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {[
            { icon: <Apple size={48} />, label: "iOS" },
            { icon: <Android size={48} />, label: "Android" },
            { icon: <Smartphone size={48} />, label: "Tablets" },
            { icon: <span className="text-3xl font-black">TV</span>, label: "Smart TV" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-white w-28 h-28 md:w-36 md:h-36 rounded-[40px] shadow-xl flex flex-col items-center justify-center border-4 border-primary/5 cursor-pointer group"
            >
              <div className="text-primary/40 group-hover:text-primary transition-colors">{item.icon}</div>
              <span className="text-xs font-black text-primary/20 uppercase tracking-widest mt-4">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Apps;
