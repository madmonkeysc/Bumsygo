import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, Gamepad2 } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import Confetti from 'react-confetti';

// --- Web Audio API Sound Effects ---
const playSound = (type) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();

  if (type === 'flip') {
    // Pop sound
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } else if (type === 'match') {
    // Chime/Shimmer sound
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } else if (type === 'win') {
    // Triumphant arpeggio
    const playNote = (freq, time) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime + time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.3);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + 0.3);
    };
    playNote(440, 0);   // A4
    playNote(554.37, 0.15); // C#5
    playNote(659.25, 0.3); // E5
    playNote(880, 0.45); // A5
  }
};

const characters = [
  { id: 'bumsy', name: 'Bumsy', image: '/assets/characters/circles/bumsy.webp', color: 'bg-orange-500' },
  { id: 'bubu', name: 'Bubu', image: '/assets/characters/circles/bubu.webp', color: 'bg-blue-600' },
  { id: 'lumi', name: 'Lumi', image: '/assets/characters/circles/lumi.webp', color: 'bg-yellow-400' },
  { id: 'stella', name: 'Stella', image: '/assets/characters/circles/stella.webp', color: 'bg-purple-500' },
  { id: 'pipa', name: 'Pipa', image: '/assets/characters/circles/pipa.webp', color: 'bg-pink-400' },
  { id: 'drako', name: 'Drako', image: '/assets/characters/circles/drako.webp', color: 'bg-emerald-500' },
];

const MemoryGame = () => {
  useSEO({
    title: 'Memorama Mágico',
    description: 'Juega al Memorama Mágico con Bumsy y sus amigos. Diviértete, mejora tu memoria y colecciona estrellas.',
    image: '/assets/banners/bumsy-plus.png'
  });

  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Initialize Game
  const initializeGame = useCallback(() => {
    // Create pairs and shuffle
    const pairedCards = [...characters, ...characters]
      .map((char) => ({ ...char, uniqueId: Math.random() }))
      .sort(() => Math.random() - 0.5);
    
    setCards(pairedCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, [initializeGame]);

  // Handle Card Click
  const handleCardClick = (index) => {
    // Prevent clicking if 2 cards are already flipped, or clicking the same card, or clicking a matched card
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].id)
    ) {
      return;
    }

    playSound('flip');
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Check for match
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.id === secondCard.id) {
        // Match!
        setTimeout(() => {
          playSound('match');
          setMatchedPairs((prev) => [...prev, firstCard.id]);
          setFlippedIndices([]);
          
          // Check Win Condition
          if (matchedPairs.length + 1 === characters.length) {
            setTimeout(() => {
              playSound('win');
              setIsWon(true);
            }, 500);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="pb-24 pt-32 bg-primary/5 min-h-screen relative overflow-hidden flex flex-col items-center">
      {isWon && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-white p-8 rounded-[40px] shadow-xl border-4 border-white">
          <div className="flex items-center gap-4">
            <img src="/assets/games/magic_memory_logo.png" alt="Magic Memory Logo" className="h-20 md:h-24 object-contain drop-shadow-xl" />
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-primary/5 px-8 py-4 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-black text-primary/40 uppercase tracking-widest">Intentos</span>
              <span className="text-3xl font-black text-primary">{moves}</span>
            </div>
            <button 
              onClick={initializeGame}
              className="bg-primary text-white p-5 rounded-2xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
              title="Reiniciar Juego"
            >
              <RotateCcw size={28} />
            </button>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 perspective-1000">
          {cards.map((card, index) => {
            const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(card.id);
            const isMatched = matchedPairs.includes(card.id);

            return (
              <motion.div
                key={card.uniqueId}
                className="aspect-[3/4] relative cursor-pointer"
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: isFlipped ? 1 : 1.05 }}
                whileTap={{ scale: isFlipped ? 1 : 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div
                  className="w-full h-full relative preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                >
                  {/* Card Back (Bumsy Logo/Pattern) */}
                  <div className="absolute inset-0 w-full h-full rounded-[30px] backface-hidden shadow-[0_15px_35px_rgba(8,112,184,0.3)] overflow-hidden border-4 border-white">
                    <img src="/assets/games/card_back_final.png" alt="Card Back" className="w-full h-full object-cover" />
                  </div>

                  {/* Card Front (Character) */}
                  <div className={`absolute inset-0 w-full h-full ${card.color} rounded-[30px] backface-hidden rotate-y-180 shadow-2xl border-4 border-white flex flex-col items-center justify-center p-4 overflow-hidden`}>
                    <img src={card.image} alt={card.name} className="w-full h-full object-contain filter drop-shadow-xl z-10" />
                    
                    {/* Visual cue if matched */}
                    <AnimatePresence>
                      {isMatched && (
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-20 flex items-center justify-center"
                        >
                          <div className="bg-white p-3 rounded-full text-accent shadow-xl animate-bounce">
                            <Sparkles size={32} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Win Modal */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
            >
              <motion.div
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="bg-white rounded-[60px] p-12 max-w-xl w-full text-center shadow-2xl border-8 border-accent"
              >
                <div className="flex items-center justify-center mx-auto mb-8">
                  <img src="/assets/games/wow.png" alt="¡Wow! Ganaste" className="h-40 md:h-48 object-contain drop-shadow-2xl animate-bounce" />
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-primary mb-4 uppercase tracking-tighter leading-none">¡Ganaste!</h2>
                <p className="text-xl md:text-2xl font-bold text-gray-600 mb-10">Encontraste a todos los amigos en {moves} intentos.</p>
                <button
                  onClick={initializeGame}
                  className="bg-primary text-white w-full py-6 rounded-full font-black text-2xl uppercase tracking-widest shadow-[0_20px_40px_rgba(8,112,184,0.4)] hover:bg-secondary hover:text-primary transition-all active:scale-95"
                >
                  ¡Jugar Otra Vez!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default MemoryGame;
