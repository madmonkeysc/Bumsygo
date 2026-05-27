import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy, Play, Music, Star, Sparkles, Heart } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const SPAWN_INTERVAL = 1000;
const BACKGROUND_IMG = '/assets/games/music_bg_realistic.webp';
const LOGO_MUSIC = '/assets/games/logo_music.webp';
const CHARACTER_BUBU = '/assets/games/bubu_full.webp';

const WIN_TARGET = 10;

const MusicAtSeaGame = () => {
  useSEO({
    title: 'Music at Sea - Bumsy Go',
    description: '¡Sigue el ritmo con Bubu Tambor y atrapa 10 notas mágicas!',
    image: BACKGROUND_IMG
  });

  const [gameState, setGameState] = useState('idle'); // idle, playing, finished
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [bubuState, setBubuState] = useState('idle'); // idle, happy, oops
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('musicSeaHighScore') || '0'));

  const spawnRef = useRef(null);
  const bubbleIdRef = useRef(0);
  const gameContainerRef = useRef(null);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setBubbles([]);
    setCombo(0);
    setMaxCombo(0);
    setBubuState('idle');
  };

  const endGame = useCallback(() => {
    setGameState('finished');
    setBubbles([]);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('musicSeaHighScore', score.toString());
    }
  }, [score, highScore]);

  // Spawn Bubbles logic
  useEffect(() => {
    if (gameState === 'playing') {
      let currentInterval = 1500; 
      
      const spawn = () => {
        const typeRand = Math.random();
        let type = 'normal'; 
        if (typeRand > 0.95) type = 'bomb'; 
        else if (typeRand > 0.85) type = 'gold';

        const newBubble = {
          id: bubbleIdRef.current++,
          type,
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 60 + 10}%`, // Random top position
          duration: 6, // Total lifetime of the bubble
          size: type === 'gold' ? 80 : (type === 'bomb' ? 100 : 90),
          rotation: Math.random() * 360,
          driftX: Math.random() * 40 - 20, // Small random horizontal drift
          driftY: Math.random() * 40 - 20, // Small random vertical drift
        };

        setBubbles(prev => [...prev, newBubble]);
        
        // Auto-remove bubble after its lifetime
        setTimeout(() => {
          setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
        }, 6000);

        spawnRef.current = setTimeout(spawn, currentInterval);
      };

      spawnRef.current = setTimeout(spawn, currentInterval);
    } else {
      clearTimeout(spawnRef.current);
    }
    return () => clearTimeout(spawnRef.current);
  }, [gameState]);

  const popBubble = (id, caught = true, type = 'normal') => {
    if (caught) {
      if (type === 'bomb') {
        setCombo(0);
        setBubuState('oops');
        setTimeout(() => setBubuState('idle'), 1000);
      } else {
        const points = 1; 
        setScore(s => {
          const nextScore = s + points;
          if (nextScore >= WIN_TARGET) {
            endGame();
          }
          return nextScore;
        });
        setCombo(c => {
          const next = c + 1;
          if (next > maxCombo) setMaxCombo(next);
          return next;
        });
        setBubuState('happy');
        setTimeout(() => setBubuState('idle'), 500);
      }
    }
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#E0F2FE] pt-24 pb-12 px-4 relative overflow-hidden flex flex-col items-center select-none" ref={gameContainerRef}>
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
        <Music size={120} className="text-blue-400 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 pointer-events-none">
        <Sparkles size={100} className="text-cyan-400 -rotate-12" />
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
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">Objetivo</span>
                <span className="text-2xl font-black text-accent leading-none">{WIN_TARGET}</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none mb-1">Atrapadas</span>
                <span className="text-2xl font-black text-primary leading-none">{score}</span>
              </div>
              {combo > 1 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-accent text-white px-3 py-1 rounded-full text-sm font-black"
                >
                  x{combo}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <img src={LOGO_MUSIC} alt="Music at Sea Logo" className="h-24 md:h-32 object-contain drop-shadow-xl" />
        </motion.div>

        {/* Game Area */}
        <div className="relative aspect-video bg-white rounded-[2.5rem] shadow-2xl border-8 border-white overflow-hidden group">
          {/* Main Background */}
          <div 
            className="absolute inset-0 bg-cover bg-bottom transition-transform duration-[20s] group-hover:scale-110"
            style={{ backgroundImage: `url(${BACKGROUND_IMG})` }}
          />
          
          {/* Water Overlay (Animated) */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 bg-cyan-500/10 z-10 pointer-events-none"
          />

          {/* Bubu Tambor */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center z-20 pointer-events-none">
            <motion.div
              animate={bubuState === 'happy' ? { scale: [1, 1.1, 1], rotate: [-5, 5, -5, 0] } : (bubuState === 'oops' ? { x: [-10, 10, -10, 10, 0] } : { y: [0, -5, 0] })}
              transition={{ repeat: bubuState === 'idle' ? Infinity : 0, duration: bubuState === 'happy' ? 0.3 : (bubuState === 'oops' ? 0.4 : 2) }}
            >
              <img 
                src={CHARACTER_BUBU} 
                alt="Bubu Tambor" 
                className={`h-48 md:h-64 object-contain drop-shadow-2xl transition-all ${bubuState === 'oops' ? 'brightness-75 grayscale' : 'brightness-100'}`} 
              />
              {bubuState === 'happy' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-400 text-white p-2 rounded-full font-black text-xs shadow-lg"
                >
                  ¡SÍ!
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Bubbles Container */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1,
                    opacity: 1,
                    x: [0, bubble.driftX, 0],
                    y: [0, bubble.driftY, 0],
                    rotate: bubble.rotation
                  }}
                  exit={{ scale: 2, opacity: 0 }}
                  transition={{ 
                    x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5 },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                  }}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ left: bubble.left, top: bubble.top, width: bubble.size, height: bubble.size }}
                  onClick={() => popBubble(bubble.id, true, bubble.type)}
                >
                  <div className={`w-full h-full rounded-full flex items-center justify-center shadow-lg relative group transition-all
                    ${bubble.type === 'normal' ? 'bg-white/40 backdrop-blur-sm border-2 border-white/60' : 
                      bubble.type === 'gold' ? 'bg-yellow-400/60 backdrop-blur-md border-4 border-yellow-200' : 
                      'bg-red-500/60 backdrop-blur-md border-4 border-red-200'}`}
                  >
                    {bubble.type === 'normal' && <Music className="text-white group-hover:scale-125 transition-transform" size={bubble.size * 0.5} fill="currentColor" />}
                    {bubble.type === 'gold' && <Star className="text-yellow-100 group-hover:scale-125 transition-transform" size={bubble.size * 0.6} fill="currentColor" />}
                    {bubble.type === 'bomb' && <span className="text-4xl">💣</span>}
                    
                    {/* Bubble Shine */}
                    <div className="absolute top-2 left-2 w-1/4 h-1/4 bg-white/40 rounded-full blur-[2px]" />
                    
                    {/* Ripple Effect for Gold */}
                    {bubble.type === 'gold' && (
                      <motion.div 
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="absolute inset-0 border-2 border-yellow-400 rounded-full"
                      />
                    )}
                  </div>
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
                <div className="bg-white/10 p-10 rounded-[3rem] backdrop-blur-md border border-white/20 flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={startGame}
                    className="bg-cyan-500 text-white px-12 py-6 rounded-3xl font-black text-3xl shadow-2xl flex items-center gap-4 group mb-8"
                  >
                    <Play size={40} fill="currentColor" /> ¡EMPEZAR!
                  </motion.button>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center border border-white/50"><Music size={20} /></div>
                      <span className="text-[10px] font-black uppercase">Normal</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-yellow-400/50 flex items-center justify-center border border-yellow-200"><Star size={20} fill="currentColor" /></div>
                      <span className="text-[10px] font-black uppercase text-yellow-300">Oro +50</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-red-500/50 flex items-center justify-center border border-red-200"><span className="text-xl">💣</span></div>
                      <span className="text-[10px] font-black uppercase text-red-300">¡Peligro!</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Finished State Overlay */}
          <AnimatePresence>
            {gameState === 'finished' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-cyan-900/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center text-white p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                  className="mb-8"
                >
                  <Trophy size={120} className="text-yellow-400 mx-auto drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]" />
                </motion.div>
                <h2 className="text-7xl font-black uppercase mb-4 tracking-tighter">¡MAGNÍFICO!</h2>
                
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
                    <span className="block text-xs font-black uppercase opacity-60 mb-2">Puntuación</span>
                    <span className="text-4xl font-black text-yellow-400">{score}</span>
                  </div>
                  <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
                    <span className="block text-xs font-black uppercase opacity-60 mb-2">Combo Máx</span>
                    <span className="text-4xl font-black text-cyan-400">x{maxCombo}</span>
                  </div>
                </div>

                {score >= highScore && score > 0 && (
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mb-8 bg-accent text-white px-8 py-3 rounded-full font-black text-2xl shadow-xl border-4 border-white/30"
                  >
                    🏆 ¡NUEVO RÉCORD! 🏆
                  </motion.div>
                )}
                
                <div className="flex gap-4">
                  <button 
                    onClick={startGame}
                    className="bg-accent text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-3"
                  >
                    <RefreshCw /> JUGAR DE NUEVO
                  </button>
                  <Link 
                    to="/play" 
                    className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-110 active:scale-95 transition-all"
                  >
                    MÁS JUEGOS
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Instructions */}
        <div className="mt-8 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center font-black text-primary text-xl">1</div>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest leading-tight">Revienta las notas musicales</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center font-black text-primary text-xl">2</div>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest leading-tight">Cuidado con las bombas rojas</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center font-black text-primary text-xl">3</div>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest leading-tight">¡Haz combos para ganar más!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicAtSeaGame;
