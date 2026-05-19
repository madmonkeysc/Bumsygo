import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy, Play, Clock, Star, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const GAME_DURATION = 30; // seconds
const SPAWN_INTERVAL = 2000; // Slower spawn (2 seconds)
const CHARACTER_LOLA = '/assets/games/lola_full.png';
const BACKGROUND_IMG = '/assets/games/hide_bg_realistic.jpg';
const LOGO_HIDE = '/assets/games/logo_hide.png';

// Adjusted hiding spots for the realistic forest background
const HIDING_SPOTS = [
  { id: 1, top: '55%', left: '15%' }, // Behind the log (left)
  { id: 2, top: '40%', left: '30%' }, // Near the teddy bear
  { id: 3, top: '55%', left: '45%' }, // In the central ferns
  { id: 4, top: '40%', left: '75%' }, // Behind the large tree (right)
  { id: 5, top: '35%', left: '55%' }, // Behind the thin trees (center-back)
  { id: 6, top: '65%', left: '60%' }, // In the grass (bottom-right)
  { id: 7, top: '45%', left: '10%' }, // Behind the mossy tree (far left)
  { id: 8, top: '75%', left: '35%' }, // In the foreground leaves
];

const HideAndSeekGame = () => {
  useSEO({
    title: 'El Escondite - Bumsy Go',
    description: 'Encuentra a Lola y sus amigos escondidos en el bosque.',
    image: BACKGROUND_IMG
  });

  const [gameState, setGameState] = useState('idle'); // idle, playing, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeSpot, setActiveSpot] = useState(null);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('hideSeekHighScore') || '0'));

  const timerRef = useRef(null);
  const spawnRef = useRef(null);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setActiveSpot(null);
  };

  const endGame = useCallback(() => {
    setGameState('finished');
    setActiveSpot(null);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('hideSeekHighScore', score.toString());
    }
  }, [score, highScore]);

  // Timer Effect
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, endGame]);

  // Spawn Effect
  useEffect(() => {
    if (gameState === 'playing') {
      spawnRef.current = setInterval(() => {
        const randomSpot = HIDING_SPOTS[Math.floor(Math.random() * HIDING_SPOTS.length)];
        setActiveSpot(randomSpot.id);
        
        // Hide character after a longer time
        setTimeout(() => {
          setActiveSpot((prev) => (prev === randomSpot.id ? null : prev));
        }, 1500);
      }, SPAWN_INTERVAL);
    } else {
      clearInterval(spawnRef.current);
    }
    return () => clearInterval(spawnRef.current);
  }, [gameState]);

  const handleCharacterClick = (e, spotId) => {
    e.stopPropagation();
    if (spotId === activeSpot) {
      setScore(s => s + 10);
      setActiveSpot(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECFDF5] pt-24 pb-12 px-4 relative overflow-hidden flex flex-col items-center">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
        <Sparkles size={120} className="text-green-400 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 pointer-events-none">
        <Star size={100} className="text-yellow-400 -rotate-12" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link 
            to="/play" 
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-2xl font-black shadow-lg hover:scale-105 transition-all group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> VOLVER
          </Link>

          <div className="flex items-center gap-4">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="text-accent" />
                <span className="text-2xl font-black text-primary w-8 text-center">{timeLeft}s</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">Puntos</span>
                <span className="text-2xl font-black text-primary leading-none">{score}</span>
              </div>
            </div>
            
            <div className="bg-primary text-white px-6 py-3 rounded-2xl shadow-lg hidden md:flex flex-col items-center">
              <span className="text-[10px] uppercase font-black text-white/60 tracking-widest leading-none mb-1">Récord</span>
              <span className="text-xl font-black leading-none">{highScore}</span>
            </div>
          </div>
        </div>

        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <img src={LOGO_HIDE} alt="El Escondite Logo" className="h-24 md:h-32 object-contain drop-shadow-xl" />
        </motion.div>

        {/* Game Area */}
        <div className="relative aspect-video bg-white rounded-[2.5rem] shadow-2xl border-8 border-white overflow-hidden group">
          {/* Main Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110"
            style={{ backgroundImage: `url(${BACKGROUND_IMG})` }}
          />
          
          {/* Dark overlay when not playing */}
          {gameState !== 'playing' && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-20" />
          )}

          {/* Hiding Spots Container */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {HIDING_SPOTS.map((spot) => (
              <div 
                key={spot.id} 
                className="absolute pointer-events-auto"
                style={{ top: spot.top, left: spot.left }}
              >
                <AnimatePresence>
                  {activeSpot === spot.id && (
                    <motion.div
                      initial={{ y: 50, opacity: 0, scale: 0.5 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: 50, opacity: 0, scale: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleCharacterClick(e, spot.id)}
                      className="cursor-pointer relative"
                    >
                      {/* Character Lola */}
                      <img 
                        src={CHARACTER_LOLA} 
                        alt="Lola" 
                        className="w-20 md:w-32 h-auto drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" 
                      />
                      {/* Interaction hint */}
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="absolute -top-4 -right-4 bg-accent text-white p-2 rounded-full shadow-lg"
                      >
                        <Star size={16} fill="currentColor" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Idle State / Start Button */}
          <AnimatePresence>
            {gameState === 'idle' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex flex-col items-center justify-center text-white"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={startGame}
                  className="bg-accent text-white px-12 py-6 rounded-3xl font-black text-3xl shadow-2xl flex items-center gap-4 group"
                >
                  <Play size={40} fill="currentColor" /> ¡EMPEZAR!
                </motion.button>
                <p className="mt-8 font-black uppercase tracking-widest text-xl drop-shadow-md">
                  ¡Encuentra a Lola antes de que se esconda!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Finished State Overlay */}
          <AnimatePresence>
            {gameState === 'finished' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-primary/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                >
                  <Trophy size={100} className="text-yellow-400 mb-6 mx-auto" />
                </motion.div>
                <h2 className="text-6xl font-black uppercase mb-2 tracking-tighter">¡TIEMPO AGOTADO!</h2>
                <div className="flex flex-col items-center mb-8">
                  <span className="text-2xl font-bold opacity-90">Tu Puntuación: {score}</span>
                  {score >= highScore && score > 0 && (
                    <motion.span 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-accent font-black text-xl mt-2"
                    >
                      ¡NUEVO RÉCORD! 🏆
                    </motion.span>
                  )}
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={startGame}
                    className="bg-accent text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                  >
                    <RefreshCw /> VOLVER A INTENTAR
                  </button>
                  <Link 
                    to="/play" 
                    className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    MAS JUEGOS
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex justify-center gap-12">
          <div className="flex items-center gap-3 text-gray-500 font-bold uppercase tracking-widest text-sm">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="text-primary">1</span>
            </div>
            Espera a que aparezca Lola
          </div>
          <div className="flex items-center gap-3 text-gray-500 font-bold uppercase tracking-widest text-sm">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="text-primary">2</span>
            </div>
            ¡Haz clic rápido!
          </div>
        </div>
      </div>
    </div>
  );
};

export default HideAndSeekGame;
