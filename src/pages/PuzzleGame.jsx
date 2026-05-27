import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy, Settings, Star, Sparkles } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const DIFFICULTY_LEVELS = [
  { label: 'Fácil', grid: 3, icon: '😊' },
  { label: 'Normal', grid: 4, icon: '😎' },
  { label: 'Experto', grid: 5, icon: '🔥' }
];

const PUZZLE_IMAGE = '/assets/games/somos_amigas.webp';

const PuzzleGame = () => {
  useSEO({
    title: 'Puzles Kids - Bumsy Go',
    description: 'Arma divertidos rompecabezas con Bumsy y sus amigos.',
    image: PUZZLE_IMAGE
  });

  const [gridSize, setGridSize] = useState(3);
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Initialize and shuffle puzzle
  const initPuzzle = useCallback((size) => {
    const totalPieces = size * size;
    const newPieces = Array.from({ length: totalPieces }, (_, i) => ({
      id: i,
      currentPos: i,
      correctPos: i,
    }));

    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i].currentPos, newPieces[j].currentPos] = [newPieces[j].currentPos, newPieces[i].currentPos];
    }

    setPieces(newPieces);
    setIsWon(false);
    setMoves(0);
    setSelectedPiece(null);
  }, []);

  useEffect(() => {
    initPuzzle(gridSize);
  }, [gridSize, initPuzzle]);

  const handlePieceClick = (piece) => {
    if (isWon) return;

    if (selectedPiece === null) {
      setSelectedPiece(piece);
    } else {
      if (selectedPiece.id === piece.id) {
        setSelectedPiece(null);
        return;
      }

      // Swap pieces
      const newPieces = [...pieces];
      const idx1 = newPieces.findIndex(p => p.id === selectedPiece.id);
      const idx2 = newPieces.findIndex(p => p.id === piece.id);
      
      const tempPos = newPieces[idx1].currentPos;
      newPieces[idx1].currentPos = newPieces[idx2].currentPos;
      newPieces[idx2].currentPos = tempPos;

      setPieces(newPieces);
      setMoves(m => m + 1);
      setSelectedPiece(null);

      // Check win
      const won = newPieces.every(p => p.currentPos === p.correctPos);
      if (won) {
        setIsWon(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2F8] pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 opacity-20 pointer-events-none">
        <Sparkles size={120} className="text-pink-400 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 pointer-events-none">
        <Star size={100} className="text-yellow-400 -rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link 
            to="/play" 
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-2xl font-black shadow-lg hover:scale-105 transition-all group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> VOLVER
          </Link>

          <div className="flex items-center gap-6">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg flex items-center gap-4">
              <div className="text-center">
                <span className="block text-[10px] uppercase font-black text-gray-400 tracking-widest">Movimientos</span>
                <span className="text-2xl font-black text-primary leading-none">{moves}</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <button 
                onClick={() => initPuzzle(gridSize)}
                className="text-accent hover:rotate-180 transition-transform duration-500"
              >
                <RefreshCw size={24} />
              </button>
            </div>
            
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-3 rounded-2xl shadow-lg transition-all ${showSettings ? 'bg-primary text-white' : 'bg-white text-primary'}`}
            >
              <Settings size={24} />
            </button>
          </div>
        </div>

        {/* Settings Menu */}
        <AnimatePresence>
          {showSettings && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-6 shadow-xl mb-8 flex flex-wrap items-center justify-center gap-4 border-4 border-primary/10"
            >
              <span className="font-black text-primary uppercase tracking-widest text-sm">Dificultad:</span>
              <div className="flex gap-2">
                {DIFFICULTY_LEVELS.map((level) => (
                  <button
                    key={level.grid}
                    onClick={() => {
                      setGridSize(level.grid);
                      setShowSettings(false);
                    }}
                    className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all ${
                      gridSize === level.grid 
                        ? 'bg-primary text-white scale-105' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    <span>{level.icon}</span> {level.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <img 
            src="/assets/games/logo_puzzle.webp" 
            alt="Puzles Kids Logo" 
            className="h-32 md:h-48 object-contain drop-shadow-2xl hover:scale-105 transition-transform"
          />
        </motion.div>

        {/* Game Board Container */}
        <div className="relative aspect-[4/5] md:aspect-square bg-white rounded-[2rem] p-4 shadow-2xl border-8 border-white group overflow-hidden">
          {/* Main Grid */}
          <div 
            className={`grid w-full h-full ${isWon ? 'gap-0' : 'gap-1'}`}
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`
            }}
          >
            {pieces.sort((a, b) => a.currentPos - b.currentPos).map((piece) => (
              <motion.div
                key={piece.id}
                layout
                onClick={() => handlePieceClick(piece)}
                className={`relative cursor-pointer overflow-hidden group/piece ${
                  selectedPiece?.id === piece.id ? 'ring-4 ring-accent z-20 scale-95' : ''
                } ${isWon ? 'cursor-default' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 300 }}
              >
                {/* Puzzle Piece Image */}
                <div 
                  className="w-full h-full transition-transform group-hover/piece:scale-105"
                  style={{
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${(piece.correctPos % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(piece.correctPos / gridSize) * (100 / (gridSize - 1))}%`,
                  }}
                />
                
                {/* Overlay for selected or hover */}
                {!isWon && (
                  <div className={`absolute inset-0 bg-accent/20 opacity-0 transition-opacity ${selectedPiece?.id === piece.id ? 'opacity-100' : 'group-hover/piece:opacity-50'}`} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Win Overlay - Repositioned to not cover the whole image */}
          <AnimatePresence>
            {isWon && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-0 bottom-0 bg-primary/90 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white p-8 text-center rounded-t-[3rem]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                  className="absolute -top-12 bg-yellow-400 p-4 rounded-full shadow-xl"
                >
                  <Trophy size={48} className="text-primary" />
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-2 tracking-tighter">¡Lo Lograste!</h2>
                <p className="text-lg font-bold mb-6 opacity-90">Completaste el rompecabezas en {moves} movimientos.</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => initPuzzle(gridSize)}
                    className="bg-accent text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                  >
                    <RefreshCw /> JUGAR DE NUEVO
                  </button>
                  <Link 
                    to="/play" 
                    className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    MAS JUEGOS
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            Haz clic en dos piezas para intercambiarlas
          </p>
        </div>
      </div>
    </div>
  );
};

export default PuzzleGame;
