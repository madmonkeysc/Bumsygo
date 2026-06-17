import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Star, HelpCircle, Gamepad2, Compass, Music, Check, Mail } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const YoutubeIcon = ({ size = 24, className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={className} 
    fill="currentColor"
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const IdaraWorld = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useSEO({
    title: 'El Mundo de Idara y el Loco Dael',
    description: 'Descubre el canal de Idara y el Loco Dael: aventuras, retos, adivinanzas y travesuras divertidas.',
    image: '/assets/idara/idara_play.png'
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  const channelFeatures = [
    {
      icon: <Compass size={28} className="text-pink-500" />,
      title: "Aventuras Increíbles",
      desc: "Sigue a Idara y al Loco Dael en emocionantes viajes por Bumsy Town, explorando nuevos lugares y descubriendo misterios.",
      bgColor: "bg-pink-50"
    },
    {
      icon: <Gamepad2 size={28} className="text-cyan-500" />,
      title: "Juegos y Retos",
      desc: "Pon a prueba tus habilidades físicas e intelectuales con retos de coordinación, agilidad y divertidas dinámicas.",
      bgColor: "bg-cyan-50"
    },
    {
      icon: <HelpCircle size={28} className="text-yellow-600" />,
      title: "Adivinanzas del Loco Dael",
      desc: "Ejercita tu cerebro resolviendo los acertijos más divertidos y las locas preguntas que solo el Loco Dael sabe inventar.",
      bgColor: "bg-amber-50"
    },
    {
      icon: <Music size={28} className="text-teal-500" />,
      title: "Bailes y Canciones",
      desc: "¡Ponte en movimiento! Aprende las coreografías más contagiosas y canta junto a Idara sus temas exclusivos.",
      bgColor: "bg-teal-50"
    }
  ];

  return (
    <div className="min-h-screen pt-0 pb-0 overflow-hidden relative bg-white">
      
      {/* 1. Immersive Hero Section */}
      <div className="relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[95vh] w-full flex items-center justify-center overflow-hidden bg-[#FF80A9]">
        {/* Background Wallpaper */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out scale-105"
          style={{ backgroundImage: `url('/assets/hero/bumsy_wall.png')` }}
        />
        {/* Overlay Dark/Pink Vignette for header & logo readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-pink-900/10 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent z-10" />

        {/* Animated Background Sparkles */}
        <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-yellow-300 rounded-full animate-pulse delay-75" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-300 rounded-full animate-bounce delay-150" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-6 pt-28 pb-16 sm:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl">
          
          {/* Left Block: Text, Badges, CTA */}
          <div className="flex-1 text-center lg:text-left text-white flex flex-col items-center lg:items-start max-w-2xl">
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-5 bg-white/20 backdrop-blur-md text-white font-black text-xs md:text-sm uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg border border-white/30 flex items-center gap-2"
            >
              <Sparkles size={16} className="text-yellow-300 animate-pulse" /> EL SHOW MÁS TRAVIESO Y DIVERTIDO
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none drop-shadow-md text-white font-black"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Idara Play <br/>
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-cyan-300 bg-clip-text text-transparent font-black">y el Loco Dael</span>
            </motion.h1>

            {/* Subtitle / Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-slate-100 font-semibold mb-8 max-w-xl leading-relaxed drop-shadow-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              ¡Prepárate para reír a carcajadas! Únete a Idara y al Loco Dael en su increíble canal lleno de aventuras alocadas, juegos interactivos, adivinanzas súper difíciles y divertidos retos para toda la familia.
            </motion.p>

            {/* Hero CTA Button: Próximamente (triggers interactive Modal) */}
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onClick={() => setShowModal(true)}
              className="hidden lg:flex bg-gradient-to-r from-[#FCF200] to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black px-12 py-4.5 rounded-full font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 items-center gap-3 border-2 border-white/40"
            >
              <YoutubeIcon size={24} className="text-red-600 fill-red-600 animate-pulse" /> PRÓXIMAMENTE ⚡
            </motion.button>
          </div>

          {/* Right Block: Floating IDARA PLAY Graphic */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -15, 0]
              }}
              transition={{ 
                duration: 4.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                opacity: { duration: 0.8, delay: 0.5 },
                scale: { duration: 0.8, delay: 0.5 }
              }}
              className="w-full relative flex justify-center"
            >
              <img 
                src="/assets/idara/idara_play.png" 
                alt="Idara Play Show" 
                className="w-4/5 sm:w-full max-h-[35vh] sm:max-h-[45vh] lg:max-h-[55vh] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
              />
            </motion.div>

            {/* Mobile CTA Button */}
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => setShowModal(true)}
              className="flex lg:hidden mt-8 bg-gradient-to-r from-[#FCF200] to-yellow-400 text-black px-10 py-4 rounded-full font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 items-center gap-2 border border-white/20"
            >
              <YoutubeIcon size={20} className="text-red-600 fill-red-600" /> PRÓXIMAMENTE ⚡
            </motion.button>
          </div>

        </div>
      </div>

      {/* 2. Meet the Stars Section (Super Idara & Loco Dael) */}
      <div className="relative py-20 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ff0055_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="text-pink-600 font-extrabold tracking-widest text-xs uppercase bg-pink-100 px-4 py-1.5 rounded-full">LOS PROTAGONISTAS</span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              ¿Quiénes son? Conoce a las Estrellas
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
              Idara y el Loco Dael son mejores amigos, pero son totalmente diferentes. ¡Eso es lo que hace que sus aventuras sean tan divertidas!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Card 1: Super Idara */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-pink-100 flex flex-col items-center p-8 text-center"
            >
              <div className="w-44 h-44 rounded-full bg-pink-100 overflow-hidden flex items-center justify-center mb-6 border-4 border-pink-200 shadow-inner">
                <img 
                  src="/assets/idara/super_idara.png" 
                  alt="Super Idara" 
                  className="w-[85%] h-[85%] object-contain mt-2 scale-110"
                />
              </div>
              <span className="bg-pink-600 text-white text-[10px] font-black tracking-wider uppercase px-4 py-1 rounded-full mb-3">🦸‍♀️ LA LÍDER INGENIOSA</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>Super Idara</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Idara cuenta con superpoderes de ingenio, oído musical y coordinación. Es la encargada de resolver las adivinanzas difíciles, inventar retos interesantes y guiar a sus amigos en el baile. ¡Su carisma y sabiduría iluminan todo el canal!
              </p>
            </motion.div>

            {/* Card 2: Loco Dael */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-cyan-100 flex flex-col items-center p-8 text-center"
            >
              <div className="w-44 h-44 rounded-full bg-cyan-100 overflow-hidden flex items-center justify-center mb-6 border-4 border-cyan-200 shadow-inner">
                <img 
                  src="/assets/idara/loco_toalla.png" 
                  alt="El Loco Dael" 
                  className="w-[85%] h-[85%] object-contain mt-2 scale-110"
                />
              </div>
              <span className="bg-cyan-500 text-white text-[10px] font-black tracking-wider uppercase px-4 py-1 rounded-full mb-3">🤪 REY DE LAS TRAVESURAS</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>El Loco Dael</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Con su icónica toalla en la cabeza y sus divertidas ocurrencias, el Loco Dael es la chispa del humor. Siempre está ideando bromas inofensivas, cayéndose de formas graciosas y creando simpáticos malentendidos. ¡Con él nunca te aburrirás!
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Features Activities Section */}
      <div className="relative py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-cyan-500 font-extrabold tracking-widest text-xs uppercase bg-cyan-50 px-4 py-1.5 rounded-full">¿QUÉ HABRÁ EN EL CANAL?</span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Mucha Diversión y Aprendizaje
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {channelFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl ${feat.bgColor} border border-black/5 flex flex-col items-center lg:items-start text-center lg:text-left`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Newsletter & Simulated Sign Up (Premium Interactive Section) */}
      <div className="relative py-24 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <Star className="mx-auto text-yellow-300 animate-spin mb-6" size={40} style={{ animationDuration: '6s' }} />
          <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            ¿Quieres ser el primero en enterarte?
          </h2>
          <p className="text-slate-100 text-base sm:text-xl font-medium mb-10 max-w-2xl mx-auto">
            Regístrate con tu correo y te enviaremos una notificación especial y un regalo digital exclusivo el día del lanzamiento del canal oficial.
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="email"
                placeholder="Ingresa tu correo aquí"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                required
                className="w-full pl-12 pr-6 py-4 rounded-full bg-white text-slate-900 font-semibold focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-xl placeholder-slate-400 disabled:bg-slate-100"
              />
            </div>
            <button
              type="submit"
              disabled={subscribed}
              className={`px-8 py-4 rounded-full font-black text-black shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
                subscribed 
                  ? 'bg-emerald-400 text-white' 
                  : 'bg-[#FCF200] hover:bg-[#EDE400] hover:scale-105'
              }`}
            >
              {subscribed ? (
                <>
                  <Check size={20} /> ¡LISTO!
                </>
              ) : (
                'REGISTRARME'
              )}
            </button>
          </form>

          <AnimatePresence>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-emerald-200 font-bold mt-4 animate-pulse"
              >
                ¡Te has registrado con éxito! Te enviaremos una sorpresa especial muy pronto.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Announcement Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 25 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl text-center border-4 border-pink-400"
            >
              <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <YoutubeIcon size={44} className="text-red-600 fill-red-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                ¡Muy Pronto!
              </h3>
              <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                Estamos en el estudio grabando y editando las mejores travesuras y retos del Loco Dael y de Idara. 
                <br /><span className="text-pink-600 font-bold">¡Suscríbete arriba para recibir el aviso antes que nadie!</span>
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black py-4 rounded-full shadow-lg transition-colors duration-200"
              >
                ¡ENTENDIDO, ESTARÉ ATENTO!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default IdaraWorld;
