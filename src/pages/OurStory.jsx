import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Rocket, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const OurStory = () => {
  useSEO({
    title: 'Nuestra Historia - El Origen de Bumsy Go',
    description: 'Conoce cómo nació Bumsy Go y cómo un grupo de educadores e ilustradores creó este universo mágico de aprendizaje y diversión.',
    image: '/assets/hero/bg_bumsy_go.webp'
  });

  const timelineEvents = [
    {
      year: "El Origen",
      title: "La chispa de una gran idea",
      description: "Bumsy nació en un pequeño taller creativo con un grupo de educadores y diseñadores preocupados por la falta de contenidos infantiles que equilibraran el juego activo, la música original de alta calidad y la seguridad digital. Queríamos crear un mejor amigo para los niños que no solo entretuviera, sino que motivara el desarrollo psicomotriz.",
      icon: <Heart className="text-pink-500" size={24} />,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      year: "El Nacimiento",
      title: "Cobrando vida en el Bosque Arcoíris",
      description: "Primero nació Bumsy, el tigre valiente y curioso. Luego, para representar diferentes etapas y habilidades del desarrollo, nacieron sus inseparables amigos: Bubu (el ritmo), Lumi (la ciencia), Stella (la fantasía), Pipa (la empatía), Drako (la protección) y Flamy (el arte). Cada personaje fue diseñado con un perfil psicológico y pedagógico único.",
      icon: <Compass className="text-orange-500" size={24} />,
      gradient: "from-orange-500 to-amber-500"
    },
    {
      year: "El Salto Digital",
      title: "Un Club seguro para las familias",
      description: "Con el lanzamiento de Bumsy Go, creamos una plataforma con minijuegos educativos interactivos, videos musicales animados y, lo más importante, el primer Control Parental encriptado (CRM), permitiendo a los padres definir límites de tiempo de juego amigables y ver estadísticas reales del progreso de sus pequeños.",
      icon: <Rocket className="text-cyan-500" size={24} />,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      year: "Hoy en Día",
      title: "Una Red Global de Sonrisas",
      description: "Hoy, Bumsy Go acompaña a millones de familias en más de 150 países, llevando risas, lecciones de lógica, empatía y canciones inolvidables a hogares de todo el mundo. Seguimos creciendo con la misma resiliencia y amor con el que dibujamos el primer bosque.",
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="pb-24 bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-indigo-600">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url('/assets/hero/bumsy_wall.webp')" }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-6 relative z-10 text-center text-white flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="bg-white/20 backdrop-blur-md text-white font-black text-xs md:text-sm uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg border border-white/30 inline-flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-yellow-300 animate-pulse" /> EL CORAZÓN DE BUMSY GO
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Nuestra Historia
            </h1>
            <p className="text-lg md:text-2xl font-bold opacity-90 max-w-2xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Cómo convertimos una simple idea en un universo educativo de amor, música y aventuras seguras para niños de todo el mundo.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Main Philosophy Introduction */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Resiliencia y Compromiso Pedagógico
            </h2>
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Nuestra misión es empoderar a la próxima generación mediante contenidos alegres que fomenten habilidades cognitivas, el pensamiento crítico y el desarrollo emocional. Creemos que la tecnología digital debe ser un puente saludable de conexión familiar, no un muro.
            </p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ff0055_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          
          <div className="relative border-l-4 border-slate-200 ml-4 md:ml-32 py-10 space-y-16">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-10 md:pl-16"
              >
                {/* Timeline Icon Node */}
                <div className={`absolute -left-[22px] top-0 w-10 h-10 rounded-2xl bg-white border-4 border-slate-200 flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform`}>
                  {event.icon}
                </div>

                {/* Timeline Label on Larger Screens */}
                <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
                  <span className="text-2xl font-black text-slate-400 tracking-tight">{event.year}</span>
                </div>

                {/* Content Box */}
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <span className="md:hidden inline-block text-sm font-black text-pink-600 uppercase tracking-widest mb-2">{event.year}</span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {event.title}
                  </h3>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Nuestros Pilares Fundamentales
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-6 font-black text-3xl">
                🎶
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Música Activa</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                Canciones que incitan al baile, el canto y el movimiento físico, evitando el sedentarismo tecnológico.
              </p>
            </div>

            <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500 mb-6 font-black text-3xl">
                🛡️
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Seguridad Total</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                Entornos limpios de anuncios, controlados por padres y alineados con las regulaciones de protección de la privacidad infantil más estrictas.
              </p>
            </div>

            <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-500 mb-6 font-black text-3xl">
                🧠
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Educación Integral</h3>
              <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                Desarrollo cognitivo y socioemocional a través del juego constructivo, rompecabezas, lógica y empatía interpersonal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            ¡Sé parte del Club de Amigos!
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Regístrate en nuestro Portal de Padres y empieza a disfrutar de los beneficios exclusivos de Bumsy Go hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/crm?redirect=home" 
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-black px-10 py-5 rounded-2xl uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-xl"
            >
              Registrar mi Cuenta 🚀
            </Link>
            <Link 
              to="/play" 
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black px-10 py-5 rounded-2xl uppercase tracking-wider transition-all"
            >
              Ir a Jugar <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
