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
    funFact: '¡Le encanta saltar charcos gigantes!', song: 'La Rueda de Bumsy',
    age: '6 años',
    favColor: 'Naranja Atardecer 🍊',
    favGame: 'Sergi Run 🏃‍♂️',
    likes: ['Explorar nuevos senderos', 'Las fresas silvestres dulces', 'Organizar campamentos nocturnos'],
    dislikes: ['Días aburridos en casa', 'Los ruidos chirriantes', 'Que se esconda el sol temprano'],
    detailedStory: 'Bumsy nació con un espíritu explorador en el corazón de Bumsy Town. Le encanta liderar a sus amigos a través de senderos misteriosos en el Bosque Arcoíris, siempre con una brújula en la mano y una sonrisa en la cara. Su mayor sueño es descubrir una isla flotante de caramelos.'
  },
  { 
    id: 'bubu', name: 'Bubu Tambor', title: 'El Rey del Ritmo',
    gradient: 'from-blue-400 to-indigo-600', color: 'bg-blue-600',
    circle: '/assets/characters/circles/bubu.webp',
    card: '/assets/characters/cards/bubu.webp',
    video: '/assets/characters/videos/bubu.mp4',
    desc: 'Un experto en ritmo que siempre marca el compás de la diversión. ¡Nunca verás a Bubu sin una sonrisa!',
    funFact: 'Toca música hasta con las cucharas.', song: 'Marcha con Bubu',
    age: '7 años',
    favColor: 'Azul Eléctrico 💙',
    favGame: 'Music at Sea 🥁',
    likes: ['Tocar la batería y el tambor', 'Las galletas de avena crujientes', 'Bailar bajo la lluvia templada'],
    dislikes: ['El silencio absoluto y aburrido', 'Las baquetas rotas', 'Que no haya ritmo en las canciones'],
    detailedStory: 'Bubu es el corazón musical del grupo. Desde que era muy pequeño, descubrió que cualquier objeto puede ser un instrumento musical, desde ramas secas hasta ollas de cocina. Siempre mantiene el compás positivo y anima a todos cuando están cansados.'
  },
  { 
    id: 'lumi', name: 'Lumi', title: 'La Curiosa',
    gradient: 'from-yellow-300 to-orange-400', color: 'bg-yellow-400',
    circle: '/assets/characters/circles/lumi.webp',
    card: '/assets/characters/cards/lumi.webp',
    video: '/assets/characters/videos/lumi.mp4',
    desc: 'Brillante y curiosa, siempre dispuesta a aprender algo nuevo sobre el universo y la naturaleza.',
    funFact: 'Su libro favorito es sobre las estrellas.', song: 'Lumi y el Sol',
    age: '6 años',
    favColor: 'Amarillo Estelar 💛',
    favGame: 'Rompecabezas Espaciales 🧩',
    likes: ['Observar las constelaciones', 'Coleccionar hojas de formas curiosas', 'Resolver acertijos difíciles'],
    dislikes: ['Las mentiras', 'El desorden extremo', 'Los cielos nublados en noche de lluvia de estrellas'],
    detailedStory: 'Lumi es la científica y astrónoma oficial de Bumsy Town. Pasa las noches mirando a través de su telescopio de madera buscando constelaciones divertidas con forma de animales. Es súper inteligente y siempre tiene datos curiosos para compartir.'
  },
  { 
    id: 'stella', name: 'Stella', title: 'Hada de los Sueños',
    gradient: 'from-purple-400 to-fuchsia-500', color: 'bg-purple-500',
    circle: '/assets/characters/circles/stella.webp',
    card: '/assets/characters/cards/stella.webp',
    video: '/assets/characters/videos/stella.mp4',
    desc: 'Llena de magia y polvos estelares, Stella hace que cada noche sea una historia de cuentos de hadas.',
    funFact: 'Su varita brilla en la oscuridad.', song: 'Magia Estelar',
    age: '5 años y medio',
    favColor: 'Violeta Mágico 💜',
    favGame: 'Memoria Mágica 🌟',
    likes: ['Crear figuras con polvos mágicos', 'Las nubes de algodón de azúcar', 'Contar cuentos antes de dormir'],
    dislikes: ['La oscuridad total sin estrellas', 'Las pesadillas', 'Que se agote su purpurina mágica'],
    detailedStory: 'Stella llegó a Bumsy Town flotando en una estrella fugaz. Es un hada bondadosa que cuida de los sueños de todos sus amigos, asegurándose de que tengan noches tranquilas y llenas de fantasía. Sus polvos mágicos huelen a vainilla dulce.'
  },
  { 
    id: 'pipa', name: 'Pipa', title: 'La Más Tierna',
    gradient: 'from-pink-300 to-rose-400', color: 'bg-pink-400',
    circle: '/assets/characters/circles/pipa.webp',
    card: '/assets/characters/cards/pipa.webp',
    video: '/assets/characters/videos/pipa.mp4',
    desc: 'La más dulce de todos los amigos. Su voz suave es perfecta para cantar canciones de cuna.',
    funFact: 'Sabe hablar con los pajaritos.', song: 'Duerme Pipa',
    age: '5 años',
    favColor: 'Rosa Chicle 🌸',
    favGame: 'Pipa Colors 🎨',
    likes: ['Cantar canciones de cuna', 'Hornear tartas de manzana', 'Cuidar las flores de su jardín'],
    dislikes: ['Los gritos o ruidos molestos', 'Ver a cualquiera de sus amigos triste', 'Los insectos picadores'],
    detailedStory: 'Pipa es la dulzura personificada. Le encanta pasar las tardes en su jardín cuidando margaritas and cantando melodías suaves que calman a cualquier animalito del bosque. Su pastel de manzana es famoso en todo Bumsy Town.'
  },
  { 
    id: 'drako', name: 'Drako', title: 'El Guardián',
    gradient: 'from-emerald-400 to-green-600', color: 'bg-emerald-500',
    circle: '/assets/characters/circles/drako.webp',
    card: '/assets/characters/cards/drako.webp',
    video: '/assets/characters/videos/drako.mp4',
    desc: 'Un enorme y amigable dragón que protege el bosque Arcoíris. Sus abrazos son los mejores del mundo.',
    funFact: '¡Estornuda confeti!', song: 'El Vuelo de Drako',
    age: '8 años',
    favColor: 'Verde Esmeralda 💚',
    favGame: 'Escondite Gigante 🦖',
    likes: ['Dar abrazos de oso gigantes', 'Estornudar confeti multicolor', 'Nadar en el lago cristalino'],
    dislikes: ['El frío extremo del invierno', 'Los espacios pequeños y encerrados', 'Que le pisen accidentalmente la cola'],
    detailedStory: 'Drako es un dragón gigante pero sumamente tierno. Aunque su tamaño podría asustar a primera vista, es el guardián más cariñoso y leal del Bosque Arcoíris. Cada vez que se ríe con fuerza, lanza una lluvia de confeti brillante.'
  },
  { 
    id: 'flamy', name: 'Flamy', title: 'La Bailarina',
    gradient: 'from-pink-400 to-rose-500', color: 'bg-rose-500',
    circle: '/assets/characters/circles/flamy.webp',
    card: '/assets/characters/cards/flamy.webp',
    video: '/assets/characters/videos/flamy.mp4',
    desc: 'Elegante y apasionada, le fascina organizar coreografías para toda la pandilla cada semana.',
    funFact: 'Puede sostenerse en una pata todo el día.', song: 'Baila con Flamy',
    age: '6 años',
    favColor: 'Fucsia Brillante 💖',
    favGame: 'Baila sin Parar 💃',
    likes: ['Bailar ballet y hip-hop', 'Las fresas frescas con chocolate', 'Diseñar trajes coloridos para actuar'],
    dislikes: ['Los zapatos apretados e incómodos', 'Las caídas graciosas', 'La música desafinada o sin ritmo'],
    detailedStory: 'Flamy es la energía andante del grupo. Le apasiona el baile en todas sus formas y siempre está ensayando nuevos pasos y coreografías. Cree firmemente que cualquier problema de la vida se puede resolver bailando alegremente.'
  },
  { 
    id: 'lola', name: 'Lola', title: 'La Inventora',
    gradient: 'from-amber-400 to-orange-500', color: 'bg-amber-500',
    circle: '/assets/characters/circles/lola.webp',
    card: '/assets/characters/cards/lola.webp',
    video: '/assets/characters/videos/lola.mp4',
    desc: 'Recolecta ramas, tuercas y cosas brillantes para inventar nuevos juegos increíbles cada día.',
    funFact: 'Tiene una colección secreta de bellotas coloridas.', song: 'Construyendo con Lola',
    age: '7 años',
    favColor: 'Amarillo Ocre 💛',
    favGame: 'Construye con Lola ⚙️',
    likes: ['Inventar máquinas curiosas', 'Buscar tuercas y tornillos brillantes', 'Completar rompecabezas difíciles'],
    dislikes: ['Las herramientas oxidadas', 'El pegamento de mala calidad', 'Seguir manuales de instrucciones aburridos'],
    detailedStory: 'Lola es una mente brillante para la ingeniería infantil. Su taller está lleno de inventos curiosos, como un lanzador de burbujas gigante y una patineta voladora de cartón. Nunca se rinde si un experimento falla.'
  },
  { 
    id: 'sergi', name: 'Sergi', title: 'El Relámpago',
    gradient: 'from-cyan-400 to-sky-500', color: 'bg-cyan-500',
    circle: '/assets/characters/circles/sergi.webp',
    card: '/assets/characters/cards/sergi.webp',
    video: '/assets/characters/videos/sergi.mp4',
    desc: 'El más veloz de toda la ciudad. Cuando parpadeas, ¡ya dio la vuelta completa al parque en tiempo récord!',
    funFact: 'Sus orejas giran como radares.', song: 'El Salto de Sergi',
    age: '6 años',
    favColor: 'Cian Veloz ⚡',
    favGame: 'Sergi Run 🏃‍♂️',
    likes: ['Correr a toda velocidad', 'Los helados refrescantes de limón', 'Hacer carreras amistosas con Bumsy'],
    dislikes: ['Estar sentado mucho tiempo', 'Que se pinche su llanta favorita', 'El tráfico lento'],
    detailedStory: 'Sergi tiene tanta energía que parece que corre con propulsores ocultos. Es capaz de dar la vuelta al parque antes de que parpadees, pero siempre se asegura de correr con cuidado y nunca dejar atrás a sus amigos más lentos.'
  },
  { 
    id: 'idara', name: 'Idara', title: 'La Música',
    gradient: 'from-teal-400 to-emerald-500', color: 'bg-teal-500',
    circle: '/assets/characters/circles/idara.webp',
    card: '/assets/characters/cards/idara.webp',
    video: '/assets/characters/videos/idara.mp4',
    desc: 'Con música en el alma y pasos de baile únicos. Idara convierte cada momento en una fiesta de ritmo.',
    funFact: 'Oye melodías en el viento.', song: 'Ritmo de Idara',
    age: '7 años',
    favColor: 'Turquesa Marino 🌊',
    favGame: 'El Ritmo de la Selva 🎹',
    likes: ['Componer melodías en su piano', 'Escuchar las olas del mar', 'Los festivales coloridos de verano'],
    dislikes: ['Los sonidos chirriantes y molestos', 'Perder la inspiración para escribir', 'Sentir frío en las manos'],
    detailedStory: 'Idara siente la música en cada latido de su corazón. Puede componer canciones hermosas inspirándose en el canto de los pájaros o en el sonido del viento sobre las hojas. Su mayor felicidad es tocar su piano para que todos bailen.'
  },
  { 
    id: 'oskava', name: 'Oskava', title: 'El Creativo',
    gradient: 'from-violet-400 to-purple-600', color: 'bg-violet-500',
    circle: '/assets/characters/circles/oskava.webp',
    card: '/assets/characters/cards/oskava.webp',
    video: '/assets/characters/videos/oskava.mp4',
    desc: 'Lleno de creatividad y colores, Oskava ve el arte en todo lo que le rodea y lo convierte en magia.',
    funFact: 'Pinta cuadros con los dedos de los pies.', song: 'Colores de Oskava',
    age: '6 años y medio',
    favColor: 'Púrpura Artístico 🔮',
    favGame: 'Colorea y Crea 🎨',
    likes: ['Pintar murales gigantes al aire libre', 'Las acuarelas brillantes', 'Crear esculturas de arcilla divertida'],
    dislikes: ['La pintura seca en sus pinceles', 'Que se borren sus bocetos', 'Los colores apagados o aburridos'],
    detailedStory: 'Oskava ve el mundo como un lienzo en blanco esperando ser llenado de color. Con sus pinceles mágicos, decora las calles de Bumsy Town y siempre encuentra formas creativas de reciclar objetos viejos en obras de arte.'
  }
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
    <div className="min-h-screen pt-0 pb-0 overflow-hidden relative bg-white">
      {/* Tall Premium Hero Section */}
      <div className="relative h-[70vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with subtle scale */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out scale-105"
          style={{ backgroundImage: `url('/assets/hero/characters_hero_2.jpeg')` }}
        />
        {/* Overlay Dark/Pink Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/20" />
        
        {/* Animated Sparkles Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping" />
          <div className="absolute top-1/3 right-1/4 w-3.5 h-3.5 bg-yellow-300 rounded-full animate-pulse delay-75" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-teal-300 rounded-full animate-bounce delay-150" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white flex flex-col items-center justify-center h-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 bg-pink-600/90 text-white font-black text-xs md:text-sm uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg border border-pink-500/30 flex items-center gap-2"
          >
            <Sparkles size={14} className="text-yellow-300 animate-pulse" /> ¿Qué personaje te encanta más?
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-none drop-shadow-md text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Mundo de Personajes <br/>
            <span className="bg-gradient-to-r from-pink-400 via-amber-300 to-teal-300 bg-clip-text text-transparent">BUMSY GO</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl text-slate-200 font-semibold mb-10 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Cada uno de nuestros amigos tiene talentos mágicos, historias divertidas y canciones especiales listas para ti. ¡Toca el botón y conócelos a todos!
          </motion.p>

          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() => {
              document.getElementById('character-explorer').scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white hover:bg-pink-500 hover:text-white text-slate-950 px-10 py-4 md:px-12 md:py-4.5 rounded-full font-black text-lg md:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-white/20"
          >
            DESCUBRIR HISTORIAS 👇
          </motion.button>
        </div>
      </div>

      {/* Dynamic Background tint for the explorer area */}
      <div className="relative">
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
        
        {/* Header and Explorer section */}
        <div id="character-explorer" className="container mx-auto px-6 pt-16 pb-6 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase">Nuestros Personajes</h2>
            <p className="text-lg text-primary/60 font-bold mt-3">Toca un personaje para conocerlo</p>
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
        <div className="container mx-auto px-6 relative z-10 pb-4">
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
                <div className="relative z-10 p-10 md:p-16 text-white bg-gradient-to-t from-black/80 via-black/30 to-transparent">
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

        {/* Detailed Character Biography Section */}
        <div className="container mx-auto px-6 relative z-10 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bio-${activeChar.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-12 bg-slate-50 border border-slate-100 rounded-[40px] p-8 md:p-14 shadow-lg relative overflow-hidden"
            >
              {/* Subtle background decoration */}
              <div className={`absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-gradient-to-br ${activeChar.gradient} opacity-5 blur-2xl pointer-events-none`} />
              
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 uppercase text-left flex items-center gap-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span className={`w-3 h-8 rounded-full ${activeChar.color}`} /> La Historia de {activeChar.name}
              </h3>

              {/* Quick Profile Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center gap-4 shadow-sm">
                  <span className="text-3xl">🎂</span>
                  <div className="text-left">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Edad</h4>
                    <p className="text-lg font-black text-slate-800">{activeChar.age}</p>
                  </div>
                </div>
                <div className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center gap-4 shadow-sm">
                  <span className="text-3xl">🎨</span>
                  <div className="text-left">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Color Favorito</h4>
                    <p className="text-lg font-black text-slate-800">{activeChar.favColor}</p>
                  </div>
                </div>
                <div className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center gap-4 shadow-sm">
                  <span className="text-3xl">🎮</span>
                  <div className="text-left">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Juego Favorito</h4>
                    <p className="text-lg font-black text-slate-800">{activeChar.favGame}</p>
                  </div>
                </div>
              </div>

              {/* Two-Column Grid: Likes/Dislikes & Detailed Biography */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Column: Likes & Dislikes */}
                <div className="space-y-6">
                  <div className="bg-emerald-50/50 border border-emerald-100/30 p-6 md:p-8 rounded-3xl">
                    <h4 className="text-lg font-black text-emerald-700 mb-4 flex items-center gap-2">
                      👍 LO QUE LE GUSTA
                    </h4>
                    <ul className="space-y-3">
                      {activeChar.likes.map((like, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-700 font-semibold text-sm text-left">
                          <span className="text-emerald-500 mt-0.5">✔</span> {like}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-rose-50/50 border border-rose-100/30 p-6 md:p-8 rounded-3xl">
                    <h4 className="text-lg font-black text-rose-700 mb-4 flex items-center gap-2">
                      👎 LO QUE NO LE GUSTA
                    </h4>
                    <ul className="space-y-3">
                      {activeChar.dislikes.map((dislike, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-700 font-semibold text-sm text-left">
                          <span className="text-rose-500 mt-0.5">✖</span> {dislike}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Detailed Biography Story */}
                <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[35px] shadow-sm flex flex-col justify-center">
                  <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-3 text-left">BIOGRAFÍA OFICIAL</h4>
                  <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed text-left" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {activeChar.detailedStory}
                  </p>
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-left">
                    <span className="text-2xl">✨</span>
                    <p className="text-xs font-bold text-slate-400 italic">
                      ¡Dato curioso! {activeChar.funFact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Characters;
