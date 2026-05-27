import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, Play, Star, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { gamesData } from '../data/gamesData';
const GamesHub = () => {
  useSEO({
    title: 'Centro de Juegos',
    description: 'Juega a los mejores juegos interactivos con Bumsy Go. Diversión garantizada para todos los niños.',
    image: '/assets/games/magic_memory_logo.webp'
  });

  const games = gamesData;

  return (
    <div className="pb-24 pt-32 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 text-primary px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-6 inline-flex items-center gap-2"
          >
            <Gamepad2 size={18} /> CENTRO DE JUEGOS
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-primary tracking-tighter uppercase leading-none"
          >
            ¡Hora de <span className="text-accent">Jugar!</span>
          </motion.h1>
        </div>

        {/* Games Grid - Poster Style */}
        <div className="flex flex-wrap justify-center gap-12">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col max-w-[400px] w-full group"
            >
              {/* Poster Container (No rounded corners as requested) */}
              <div className="relative w-full aspect-[2/3] mb-6 shadow-2xl overflow-hidden bg-gray-100">
                {game.soon ? (
                  <>
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm text-white">
                       <Sparkles size={48} className="mb-4 text-yellow-400" />
                       <h3 className="text-3xl font-black uppercase tracking-widest">Pronto</h3>
                    </div>
                    <img src={game.poster} alt={game.title} className="w-full h-full object-cover" />
                  </>
                ) : (
                  <Link to={game.path} className="block w-full h-full">
                    <img 
                      src={game.poster} 
                      alt={game.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer" 
                    />
                  </Link>
                )}
              </div>

              {/* Game Info */}
              <div className="flex flex-col flex-1 px-2">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index} 
                      size={20} 
                      fill={index < game.stars ? "#FFD700" : "transparent"} 
                      color={index < game.stars ? "#FFD700" : "#D1D5DB"} 
                    />
                  ))}
                </div>

                {/* Title, Logo & Desc */}
                {game.logo ? (
                  game.soon ? (
                    <img src={game.logo} alt={`${game.title} Logo`} className="h-28 md:h-36 object-contain mb-4 self-start drop-shadow-md" />
                  ) : (
                    <Link to={game.path} className="self-start">
                      <img src={game.logo} alt={`${game.title} Logo`} className="h-28 md:h-36 object-contain mb-4 self-start drop-shadow-md hover:scale-105 transition-transform cursor-pointer" />
                    </Link>
                  )
                ) : (
                  <h2 className="text-3xl font-black text-primary mb-2 uppercase tracking-tighter">{game.title}</h2>
                )}
                <p className="text-gray-500 font-bold mb-6 flex-1">{game.desc}</p>
                
                {/* Button */}
                {!game.soon ? (
                  <Link 
                    to={game.path} 
                    className={`${game.color} text-white px-8 py-4 font-black text-xl flex justify-center items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg uppercase w-full`}
                  >
                    <Play fill="currentColor" /> JUGAR AHORA
                  </Link>
                ) : (
                  <div className="bg-gray-200 text-gray-500 px-8 py-4 font-black text-xl flex justify-center items-center gap-3 uppercase w-full cursor-not-allowed">
                    PRÓXIMAMENTE
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default GamesHub;
