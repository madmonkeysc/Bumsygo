import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Award, Heart, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const GlobalNetwork = () => {
  useSEO({
    title: 'Red Global - Bumsy Go Internacional',
    description: 'Explora la presencia global de Bumsy Go. Llevamos educación, música y diversión familiar segura a más de 150 países.',
    image: '/assets/hero/bg_bumsy_go.webp'
  });

  const statistics = [
    { value: "150+", label: "Países Activos", desc: "Familias de todo el mundo disfrutan de Bumsy Go.", icon: "🌎" },
    { value: "10+", label: "Idiomas Disponibles", desc: "Contenido localizado para cada cultura y región.", icon: "💬" },
    { value: "50M+", label: "Descargas Globales", desc: "Juegos, canciones y actividades descargadas.", icon: "📈" },
    { value: "100%", label: "Seguro y Privado", desc: "Cumplimiento absoluto de las leyes de protección infantil.", icon: "🛡️" }
  ];

  const regions = [
    {
      name: "Bumsy Go Latam",
      hq: "Ciudad de México",
      languages: "Español, Portugués",
      focus: "Producción musical y doblaje original, eventos en vivo y shows presenciales, alianzas escolares locales.",
      color: "border-orange-500 bg-orange-50/50"
    },
    {
      name: "Bumsy Go USA & Canada",
      hq: "Miami, Florida",
      languages: "Inglés, Francés",
      focus: "Desarrollo tecnológico de minijuegos educativos, distribución de libros y merchandising físico en Norteamérica.",
      color: "border-pink-500 bg-pink-50/50"
    },
    {
      name: "Bumsy Go Europe",
      hq: "Madrid, España",
      languages: "Español, Inglés, Alemán, Italiano",
      focus: "Estudios curriculares y alineación con directrices de la Unión Europea sobre pedagogía activa y límites digitales.",
      color: "border-indigo-500 bg-indigo-50/50"
    }
  ];

  return (
    <div className="pb-24 bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
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
              <Sparkles size={16} className="text-yellow-300 animate-pulse" /> PRESENCIA INTERNACIONAL
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Red Global
            </h1>
            <p className="text-lg md:text-2xl font-bold opacity-90 max-w-2xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Llevamos el Bosque Arcoíris y el aprendizaje activo a millones de hogares a través de las fronteras.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Global Impact Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Bumsy Go en Números
            </h2>
            <p className="text-slate-500 font-medium mt-4 text-lg max-w-xl mx-auto">
              Nuestra huella global crece con el compromiso inquebrantable de mantener la calidad pedagógica.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-100 rounded-[40px] p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
              >
                <span className="text-5xl mb-6">{stat.icon}</span>
                <span className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stat.value}</span>
                <span className="text-sm font-black text-pink-600 uppercase tracking-widest mb-3">{stat.label}</span>
                <p className="text-slate-500 font-medium text-sm leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Operations Map / Grid */}
      <section className="py-20 bg-slate-50 relative border-y border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#ff0055_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.01]" />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Oficinas y Operaciones Regionales
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {regions.map((reg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`border-t-8 rounded-[40px] p-10 bg-white shadow-lg flex flex-col ${reg.color}`}
              >
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {reg.name}
                </h3>
                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Sede Regional</span>
                    <span className="font-bold text-slate-700">{reg.hq}</span>
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Idiomas principales</span>
                    <span className="font-bold text-slate-700">{reg.languages}</span>
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">Área de enfoque</span>
                    <p className="text-slate-500 font-semibold text-sm leading-relaxed mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {reg.focus}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Local Compliance Certification Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 rounded-[50px] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Globe size={180} />
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <span className="bg-white/10 text-cyan-300 border border-white/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                  Seguridad Digital Global
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-4 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Cumplimiento e Inclusión
                </h2>
                <p className="text-slate-300 font-semibold leading-relaxed text-sm md:text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Bumsy Go está diseñado de raíz para proteger la identidad de los niños. Cumplimos rigurosamente con las normativas internacionales como COPPA (Estados Unidos) y GDPR (Unión Europea).
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-emerald-400" /> COPPA COMPLIANT
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
                    <CheckCircle2 size={14} className="text-emerald-400" /> GDPR CERTIFIED
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-tight text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Localización inclusiva
                </h3>
                <p className="text-slate-300 font-semibold text-xs leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Adaptamos no solo el idioma, sino también los contextos culturales en nuestros videos y dinámicas para asegurar que todos los niños del mundo se sientan bienvenidos e integrados.
                </p>
                <div className="h-0.5 bg-white/10" />
                <p className="text-slate-300 font-semibold text-xs leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Nuestra plataforma se somete periódicamente a auditorías de accesibilidad web (WCAG 2.1) para que niños con capacidades diferentes disfruten del juego.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalNetwork;
