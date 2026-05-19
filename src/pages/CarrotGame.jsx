import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy, Play, Clock, Star, Sparkles, Heart } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const GAME_DURATION = 30; // seconds
const SPAWN_INTERVAL = 800; // ms
const BACKGROUND_IMG = '/assets/hero/bg_bumsy_go.png';
const LOGO_CARROTS = '/assets/games/logo_carrots.png';
const CHARACTER_SERGI = '/assets/characters/cards/sergi.webp';
const CARROT_IMG = 'https://cdn-icons-png.flaticon.com/512/2909/2909808.png'; // Using a placeholder for now, or I'll generate one if possible. Actually, I'll use an Emoji for simplicity and reliability.

const CarrotGame = () => {
  useSEO({
    title: 'Cazando Zanahorias - Bumsy Go',
    description: '¡Ayuda a Sergi a atrapar todas las zanahorias antes de que se acabe el tiempo!',
    image: BACKGROUND_IMG
  });

  const [gameState, setGameState] = useState('idle'); // idle, playing, finished
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [carrots, setCarrots] = useState([]);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('carrotGameHighScore') || '0'));
  const [sergiPos, setSergiPos] = useState(50); // percentage

  const timerRef = useRef(null);
  const spawnRef = useRef(null);
  const carrotIdRef = useRef(0);
  const gameAreaRef = useRef(null);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setCarrots([]);
  };

  const endGame = useCallback(() => {
    setGameState('finished');
    setCarrots([]);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('carrotGameHighScore', score.toString());
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
        const newCarrot = {
          id: carrotIdRef.current++,
          left: `${Math.random() * 80 + 10}%`,
          duration: Math.random() * 2 + 2, // 2-4 seconds to fall
          rotation: Math.random() * 360
        };
        setCarrots(prev => [...prev, newCarrot]);
      }, SPAWN_INTERVAL);
    } else {
      clearInterval(spawnRef.current);
    }
    return () => clearInterval(spawnRef.current);
  }, [gameState]);

  const handleMouseMove = (e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSergiPos(Math.max(5, Math.min(95, percentage)));
  };

  const handleTouchMove = (e) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSergiPos(Math.max(5, Math.min(95, percentage)));
  };

  const collectCarrot = (id) => {
    setScore(s => s + 10);
    setCarrots(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED] pt-24 pb-12 px-4 relative overflow-hidden flex flex-col items-center select-none">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
        <Sparkles size={120} className="text-orange-400 rotate-12" />
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
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">Zanahorias</span>
                <span className="text-2xl font-black text-primary leading-none">{score}</span>
              </div>
            </div>
            
            <div className="bg-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg hidden md:flex flex-col items-center">
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
          <img src={LOGO_CARROTS} alt="Cazando Zanahorias Logo" className="h-24 md:h-32 object-contain drop-shadow-xl" />
        </motion.div>

        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative aspect-video bg-white rounded-[2.5rem] shadow-2xl border-8 border-white overflow-hidden group cursor-none"
        >
          {/* Main Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] group-hover:scale-105"
            style={{ backgroundImage: `url(${BACKGROUND_IMG})` }}
          />
          
          {/* Grass/Bottom Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-green-500/20 to-transparent z-10 pointer-events-none" />

          {/* Sergi the Rabbit */}
          <motion.div 
            className="absolute bottom-4 z-20 pointer-events-none"
            animate={{ left: `${sergiPos}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ transform: 'translateX(-50%)' }}
          >
            <motion.img 
              src={CHARACTER_SERGI} 
              alt="Sergi" 
              animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="h-32 md:h-48 object-contain drop-shadow-2xl" 
            />
          </motion.div>

          {/* Carrots Container */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <AnimatePresence>
              {carrots.map((carrot) => (
                <motion.div
                  key={carrot.id}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ 
                    y: '120%', 
                    rotate: carrot.rotation + 360,
                    opacity: 1 
                  }}
                  transition={{ 
                    y: { duration: carrot.duration, ease: "linear" },
                    rotate: { duration: carrot.duration, ease: "linear" },
                    opacity: { duration: 0.2 }
                  }}
                  onUpdate={(latest) => {
                    // Check collision
                    const carrotY = (parseFloat(latest.y) / 100) * (gameAreaRef.current?.clientHeight || 0);
                    const sergiX = sergiPos;
                    const carrotX = parseFloat(carrot.left);
                    
                    if (latest.y && parseFloat(latest.y) > 75 && parseFloat(latest.y) < 95) {
                      if (Math.abs(sergiX - carrotX) < 10) {
                        collectCarrot(carrot.id);
                      }
                    }
                  }}
                  onAnimationComplete={() => {
                    setCarrots(prev => prev.filter(c => c.id !== carrot.id));
                  }}
                  className="absolute"
                  style={{ left: carrot.left }}
                >
                  <span className="text-4xl md:text-6xl drop-shadow-lg">🥕</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Idle State / Start Button */}
          <AnimatePresence>
            {gameState === 'idle' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex flex-col items-center justify-center text-white bg-black/30 backdrop-blur-[2px]"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={startGame}
                  className="bg-orange-500 text-white px-12 py-6 rounded-3xl font-black text-3xl shadow-2xl flex items-center gap-4 group"
                >
                  <Play size={40} fill="currentColor" /> ¡EMPEZAR!
                </motion.button>
                <p className="mt-8 font-black uppercase tracking-widest text-xl drop-shadow-md text-center max-w-md">
                  ¡Mueve a Sergi y atrapa todas las zanahorias!
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
                className="absolute inset-0 bg-orange-900/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                >
                  <Trophy size={100} className="text-yellow-400 mb-6 mx-auto" />
                </motion.div>
                <h2 className="text-6xl font-black uppercase mb-2 tracking-tighter">¡BUEN TRABAJO!</h2>
                <div className="flex flex-col items-center mb-8">
                  <span className="text-2xl font-bold opacity-90">Zanahorias atrapadas: {score / 10}</span>
                  {score >= highScore && score > 0 && (
                    <motion.span 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-yellow-400 font-black text-xl mt-2"
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
                    <RefreshCw /> JUGAR DE NUEVO
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
            Mueve el mouse para seguir las zanahorias
          </div>
          <div className="flex items-center gap-3 text-gray-500 font-bold uppercase tracking-widest text-sm">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
              <span className="text-primary">2</span>
            </div>
            ¡Atrapa tantas como puedas!
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrotGame;
