import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Music, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const characters = [
  { 
    id: 'bumsy', name: 'Bumsy', title: 'El Aventurero',
    gradient: 'from-orange-400 to-red-500', color: 'bg-orange-500',
    circle: '/assets/characters/circles/bumsy.webp',
    card: '/assets/characters/cards/bumsy.webp',
    video: '/assets/characters/videos/bumsy.mp4',
    desc: 'El líder valiente y travieso del grupo. Siempre está buscando nuevas aventuras y tiene una solución divertida para cualquier problema.',
    funFact: '¡Le encanta saltar charcos gigantes!', song: 'La Rueda de Bumsy'
  },
  { 
    id: 'bubu', name: 'Bubu Tambor', title: 'El Rey del Ritmo',
    gradient: 'from-blue-400 to-indigo-600', color: 'bg-blue-600',
    circle: '/assets/characters/circles/bubu.webp',
    card: '/assets/characters/cards/bubu.webp',
    video: '/assets/characters/videos/bubu.mp4',
    desc: 'Un experto en ritmo que siempre marca el compás de la diversión. ¡Nunca verás a Bubu sin una sonrisa!',
    funFact: 'Toca música hasta con las cucharas.', song: 'Marcha con Bubu'
  },
  { 
    id: 'lumi', name: 'Lumi', title: 'La Curiosa',
    gradient: 'from-yellow-300 to-orange-400', color: 'bg-yellow-400',
    circle: '/assets/characters/circles/lumi.webp',
    card: '/assets/characters/cards/lumi.webp',
    video: '/assets/characters/videos/lumi.mp4',
    desc: 'Brillante y curiosa, siempre dispuesta a aprender algo nuevo sobre el universo y la naturaleza.',
    funFact: 'Su libro favorito es sobre las estrellas.', song: 'Lumi y el Sol'
  },
  { 
    id: 'stella', name: 'Stella', title: 'Hada de los Sueños',
    gradient: 'from-purple-400 to-fuchsia-500', color: 'bg-purple-500',
    circle: '/assets/characters/circles/stella.webp',
    card: '/assets/characters/cards/stella.webp',
    video: '/assets/characters/videos/stella.mp4',
    desc: 'Llena de magia y polvos estelares, Stella hace que cada noche sea una historia de cuentos de hadas.',
    funFact: 'Su varita brilla en la oscuridad.', song: 'Magia Estelar'
  },
  { 
    id: 'pipa', name: 'Pipa', title: 'La Más Tierna',
    gradient: 'from-pink-300 to-rose-400', color: 'bg-pink-400',
    circle: '/assets/characters/circles/pipa.webp',
    card: '/assets/characters/cards/pipa.webp',
    video: '/assets/characters/videos/pipa.mp4',
    desc: 'La más dulce de todos los amigos. Su voz suave es perfecta para cantar canciones de cuna.',
    funFact: 'Sabe hablar con los pajaritos.', song: 'Duerme Pipa'
  },
  { 
    id: 'drako', name: 'Drako', title: 'El Guardián',
    gradient: 'from-emerald-400 to-green-600', color: 'bg-emerald-500',
    circle: '/assets/characters/circles/drako.webp',
    card: '/assets/characters/cards/drako.webp',
    video: '/assets/characters/videos/drako.mp4',
    desc: 'Un enorme y amigable dragón que protege el bosque Arcoíris. Sus abrazos son los mejores del mundo.',
    funFact: '¡Estornuda confeti!', song: 'El Vuelo de Drako'
  },
  { 
    id: 'flamy', name: 'Flamy', title: 'La Bailarina',
    gradient: 'from-pink-400 to-rose-500', color: 'bg-rose-500',
    circle: '/assets/characters/circles/flamy.webp',
    card: '/assets/characters/cards/flamy.webp',
    video: '/assets/characters/videos/flamy.mp4',
    desc: 'Elegante y apasionada, le fascina organizar coreografías para toda la pandilla cada semana.',
    funFact: 'Puede sostenerse en una pata todo el día.', song: 'Baila con Flamy'
  },
  { 
    id: 'lola', name: 'Lola', title: 'La Inventora',
    gradient: 'from-amber-400 to-orange-500', color: 'bg-amber-500',
    circle: '/assets/characters/circles/lola.webp',
    card: '/assets/characters/cards/lola.webp',
    video: '/assets/characters/videos/lola.mp4',
    desc: 'Recolecta ramas, tuercas y cosas brillantes para inventar nuevos juegos increíbles cada día.',
    funFact: 'Tiene una colección secreta de bellotas coloridas.', song: 'Construyendo con Lola'
  },
  { 
    id: 'sergi', name: 'Sergi', title: 'El Relámpago',
    gradient: 'from-cyan-400 to-sky-500', color: 'bg-cyan-500',
    circle: '/assets/characters/circles/sergi.webp',
    card: '/assets/characters/cards/sergi.webp',
    video: '/assets/characters/videos/sergi.mp4',
    desc: 'El más veloz de toda la ciudad. Cuando parpadeas, ¡ya dio la vuelta completa al parque en tiempo récord!',
    funFact: 'Sus orejas giran como radares.', song: 'El Salto de Sergi'
  },
  { 
    id: 'idara', name: 'Idara', title: 'La Música',
    gradient: 'from-teal-400 to-emerald-500', color: 'bg-teal-500',
    circle: '/assets/characters/circles/idara.webp',
    card: '/assets/characters/cards/idara.webp',
    video: '/assets/characters/videos/idara.mp4',
    desc: 'Con música en el alma y pasos de baile únicos. Idara convierte cada momento en una fiesta de ritmo.',
    funFact: 'Oye melodías en el viento.', song: 'Ritmo de Idara'
  },
  { 
    id: 'oskava', name: 'Oskava', title: 'El Creativo',
    gradient: 'from-violet-400 to-purple-600', color: 'bg-violet-500',
    circle: '/assets/characters/circles/oskava.webp',
    card: '/assets/characters/cards/oskava.webp',
    video: '/assets/characters/videos/oskava.mp4',
    desc: 'Lleno de creatividad y colores, Oskava ve el arte en todo lo que le rodea y lo convierte en magia.',
    funFact: 'Pinta cuadros con los dedos de los pies.', song: 'Colores de Oskava'
  },
];

const Characters = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeChar = characters[activeIdx];

  useSEO({
    title: `Conoce a ${activeChar.name}`,
    description: activeChar.desc,
    image: activeChar.card
  });

  return (
    <div className="min-h-screen pt-20 pb-0 overflow-hidden relative bg-white">
      {/* Dynamic Background tint */}
      <AnimatePresence>
        <motion.div 
          key={`bg-${activeChar.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-br ${activeChar.gradient} pointer-events-none`}
        />
      </AnimatePresence>
      
      {/* Header */}
      <div className="container mx-auto px-6 pt-10 pb-6 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black text-primary tracking-tighter uppercase">Nuestros Personajes</h1>
          <p className="text-xl text-primary/60 font-bold mt-4">Toca un personaje para conocerlo</p>
        </div>

        {/* Scrollable Circle Avatars */}
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 px-2 hide-scrollbar justify-start md:justify-center items-center">
          {characters.map((char, i) => (
            <button 
              key={char.id}
              onClick={() => setActiveIdx(i)}
              className={`relative flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-300 group ${activeIdx === i ? 'scale-110' : 'hover:scale-105 opacity-50 hover:opacity-90'}`}
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 shadow-lg transition-all ${activeIdx === i ? 'border-white shadow-xl' : 'border-transparent'}`}>
                <img 
                  src={char.circle} 
                  alt={char.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`font-black text-xs md:text-sm ${activeIdx === i ? 'text-primary' : 'text-primary/40'}`}>
                {char.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Active Character Area */}
      <div className="container mx-auto px-6 relative z-10 pb-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeChar.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="w-full rounded-[50px] md:rounded-[70px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row bg-white relative"
          >
            {/* Video Side — solo video, no card behind */}
            <div className="lg:w-1/2 relative overflow-hidden min-h-[360px] lg:min-h-[500px] bg-black">
              <video
                key={activeChar.video}
                src={activeChar.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Card image as background + info overlay — no gradient */}
            <div className="lg:w-1/2 relative overflow-hidden min-h-[360px] lg:min-h-[500px] flex flex-col justify-end">
              <img
                src={activeChar.card}
                alt={activeChar.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 p-10 md:p-16 text-white">
                {/* Etiquetas */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-white/30">
                    #{activeChar.id}
                  </span>
                  <span className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase border border-white/20">
                    #Amigo
                  </span>
                </div>

                <p className="text-xl md:text-2xl font-bold mb-8 leading-relaxed drop-shadow-sm">
                  {activeChar.desc}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className={`${activeChar.color} text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all`}>
                    <Play fill="currentColor" size={18} /> Ver Episodio
                  </button>
                  <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-white/30 active:scale-95 transition-all">
                    <Music size={18} /> {activeChar.song}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Characters;
