import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Gamepad2, ArrowLeft, Trophy, Zap, RotateCcw } from 'lucide-react';
import useSEO from '../hooks/useSEO';

// ─── Constants ───────────────────────────────────────────────────────────────
const COLS = 20;
const ROWS = 20;
const CELL = 28; // px per cell
const TICK_START = 160; // ms
const TICK_MIN = 70;
const TICK_STEP = 8;

const DIR = {
  UP:    { x: 0,  y: -1 },
  DOWN:  { x: 0,  y:  1 },
  LEFT:  { x: -1, y:  0 },
  RIGHT: { x: 1,  y:  0 },
};

const OPPOSITE = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };

// Bumsy-themed emojis for food
const FOODS = ['🍎','🍓','🍇','🌟','💎','🎀','🧡','⭐'];

function randomCell(exclude = []) {
  let cell;
  do {
    cell = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (exclude.some(c => c.x === cell.x && c.y === cell.y));
  return cell;
}

function initState() {
  const head = { x: 10, y: 10 };
  const snake = [head, { x: 9, y: 10 }, { x: 8, y: 10 }];
  return {
    snake,
    dir: DIR.RIGHT,
    pendingDir: null,
    food: randomCell(snake),
    foodEmoji: FOODS[Math.floor(Math.random() * FOODS.length)],
    score: 0,
    alive: true,
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────
const SnakeGame = () => {
  useSEO({
    title: 'Bumsy Snake — Serpiente de Bumsy Town',
    description: 'Juega al clásico juego de la serpiente con los personajes de Bumsy Town. ¡Colecciona frutas y supera tu récord!',
    image: '/assets/games/poster_snake.png',
  });

  const [screen, setScreen] = useState('cover'); // cover | playing | gameover
  const [game, setGame] = useState(initState());
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('bumsy_snake_hs') || '0'));
  const [tick, setTick] = useState(TICK_START);
  const gameRef = useRef(game);
  const tickRef = useRef(tick);
  const intervalRef = useRef(null);

  gameRef.current = game;
  tickRef.current = tick;

  // ── Keyboard input ──────────────────────────────────────────────────────────
  const handleKey = useCallback((e) => {
    const map = {
      ArrowUp: 'UP', w: 'UP', W: 'UP',
      ArrowDown: 'DOWN', s: 'DOWN', S: 'DOWN',
      ArrowLeft: 'LEFT', a: 'LEFT', A: 'LEFT',
      ArrowRight: 'RIGHT', d: 'RIGHT', D: 'RIGHT',
    };
    const newDir = map[e.key];
    if (!newDir) return;
    e.preventDefault();
    setGame(g => {
      const currentDirName = Object.keys(DIR).find(k => DIR[k] === g.dir);
      if (newDir === OPPOSITE[currentDirName]) return g;
      return { ...g, pendingDir: DIR[newDir] };
    });
  }, []);

  useEffect(() => {
    if (screen !== 'playing') return;
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [screen, handleKey]);

  // ── Game loop ───────────────────────────────────────────────────────────────
  const step = useCallback(() => {
    setGame(g => {
      if (!g.alive) return g;
      const dir = g.pendingDir || g.dir;
      const head = g.snake[0];
      const next = { x: head.x + dir.x, y: head.y + dir.y };

      // Wall collision
      if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
        return { ...g, alive: false };
      }
      // Self collision
      if (g.snake.some(c => c.x === next.x && c.y === next.y)) {
        return { ...g, alive: false };
      }

      const ate = next.x === g.food.x && next.y === g.food.y;
      const newSnake = [next, ...g.snake];
      if (!ate) newSnake.pop();

      const newScore = ate ? g.score + 10 : g.score;
      const newFood = ate ? randomCell(newSnake) : g.food;
      const newEmoji = ate ? FOODS[Math.floor(Math.random() * FOODS.length)] : g.foodEmoji;

      return {
        ...g,
        snake: newSnake,
        dir,
        pendingDir: null,
        food: newFood,
        foodEmoji: newEmoji,
        score: newScore,
        alive: true,
      };
    });
  }, []);

  // Speed ramp
  useEffect(() => {
    if (screen !== 'playing') return;
    const newTick = Math.max(TICK_MIN, TICK_START - Math.floor(game.score / 30) * TICK_STEP);
    if (newTick !== tick) setTick(newTick);
  }, [game.score, screen]);

  // Interval
  useEffect(() => {
    if (screen !== 'playing') { clearInterval(intervalRef.current); return; }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(step, tick);
    return () => clearInterval(intervalRef.current);
  }, [screen, tick, step]);

  // Death detection
  useEffect(() => {
    if (!game.alive && screen === 'playing') {
      clearInterval(intervalRef.current);
      if (game.score > highScore) {
        setHighScore(game.score);
        localStorage.setItem('bumsy_snake_hs', game.score);
      }
      setTimeout(() => setScreen('gameover'), 300);
    }
  }, [game.alive]);

  const startGame = () => {
    setGame(initState());
    setTick(TICK_START);
    setScreen('playing');
  };

  // ── D-Pad (mobile) ──────────────────────────────────────────────────────────
  const dpad = (dirName) => {
    setGame(g => {
      const currentDirName = Object.keys(DIR).find(k => DIR[k] === g.dir);
      if (dirName === OPPOSITE[currentDirName]) return g;
      return { ...g, pendingDir: DIR[dirName] };
    });
  };

  // ── Render helpers ──────────────────────────────────────────────────────────
  const snakeSet = new Set(game.snake.map(c => `${c.x},${c.y}`));

  const speedLabel = tick >= 140 ? 'Lento' : tick >= 110 ? 'Normal' : tick >= 85 ? 'Rápido' : '🔥 Veloz';

  // ════════════════════════════════════════════════════════════════════════════
  // COVER SCREEN
  // ════════════════════════════════════════════════════════════════════════════
  if (screen === 'cover') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`
        }} />

        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center text-center max-w-lg"
        >
          {/* Snake emoji art */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="text-[100px] mb-4 select-none"
          >
            🐍
          </motion.div>

          {/* Title */}
          <h1
            className="text-6xl md:text-7xl font-black text-white mb-2 leading-none tracking-tighter"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Bumsy<span className="text-violet-400"> Snake</span>
          </h1>
          <p
            className="text-slate-400 text-lg font-medium mb-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            La víbora de Bumsy Town
          </p>

          {/* High score badge */}
          {highScore > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 px-5 py-2 rounded-full text-sm font-black mb-8"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <Trophy size={16} /> RÉCORD: {highScore} pts
            </motion.div>
          )}

          {/* Instructions mini */}
          <div className="grid grid-cols-2 gap-3 mb-10 w-full max-w-sm text-left">
            {[
              ['🎯', 'Come frutas para crecer'],
              ['⚡', 'Cada fruta da 10 puntos'],
              ['⬆️⬇️⬅️➡️', 'Flechas o WASD para mover'],
              ['💀', 'No choques con las paredes'],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-start gap-2 bg-slate-800/60 rounded-2xl p-3">
                <span className="text-xl">{icon}</span>
                <span className="text-slate-300 text-sm font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={startGame}
            className="bg-violet-600 hover:bg-violet-500 text-white font-black text-xl px-14 py-5 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.5)] flex items-center gap-3 mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Play fill="white" size={22} /> ¡JUGAR AHORA!
          </motion.button>

          {/* Back to hub */}
          <Link
            to="/play"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-300 font-semibold transition-colors text-sm"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <ArrowLeft size={16} /> Volver al Centro de Juegos
          </Link>
        </motion.div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // GAME OVER SCREEN
  // ════════════════════════════════════════════════════════════════════════════
  if (screen === 'gameover') {
    const isNewRecord = game.score > 0 && game.score >= highScore;
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`
        }} />
        <div className="absolute inset-0 bg-red-900/10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="relative z-10 flex flex-col items-center text-center max-w-sm"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.6 }}
            className="text-[80px] mb-4"
          >
            💀
          </motion.div>

          <h2
            className="text-5xl font-black text-white mb-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            ¡Juego<span className="text-red-400"> Terminado!</span>
          </h2>

          <div className="flex gap-6 my-8">
            <div className="bg-slate-800 rounded-2xl px-8 py-5 flex flex-col items-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Puntuación</span>
              <span className="text-4xl font-black text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{game.score}</span>
            </div>
            <div className="bg-amber-400/10 border border-amber-400/20 rounded-2xl px-8 py-5 flex flex-col items-center">
              <span className="text-amber-400/70 text-xs font-bold uppercase tracking-widest mb-1">Récord</span>
              <span className="text-4xl font-black text-amber-400" style={{ fontFamily: "'Poppins', sans-serif" }}>{highScore}</span>
            </div>
          </div>

          {isNewRecord && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center gap-2 bg-amber-400 text-slate-950 px-6 py-2 rounded-full font-black text-sm mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              🏆 ¡NUEVO RÉCORD!
            </motion.div>
          )}

          <div className="flex flex-col gap-4 w-full mt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={startGame}
              className="bg-violet-600 hover:bg-violet-500 text-white font-black text-lg px-10 py-4 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center gap-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <RotateCcw size={20} /> JUGAR DE NUEVO
            </motion.button>
            <Link
              to="/play"
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-200 font-semibold transition-colors text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <ArrowLeft size={16} /> Volver al Hub de Juegos
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // PLAYING SCREEN
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden select-none px-2 py-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)`,
        backgroundSize: `${CELL}px ${CELL}px`
      }} />

      {/* HUD */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-[560px] mb-4 px-1">
        <Link to="/play" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-sm font-semibold">
          <ArrowLeft size={16} /> Hub
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/80 rounded-full px-4 py-1.5">
            <Zap size={14} className="text-violet-400" />
            <span className="text-slate-300 text-sm font-bold">{speedLabel}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 rounded-full px-4 py-1.5">
            <Trophy size={14} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-black">{highScore}</span>
          </div>
        </div>
        <div className="bg-violet-600/20 border border-violet-500/30 rounded-full px-5 py-1.5">
          <span className="text-violet-300 font-black text-lg">{game.score}</span>
        </div>
      </div>

      {/* Game board */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden border-2 border-slate-700/60 shadow-[0_0_60px_rgba(139,92,246,0.15)]"
        style={{ width: COLS * CELL, height: ROWS * CELL, background: '#0f172a' }}
      >
        {/* Inner grid lines */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`
        }} />

        {/* Snake */}
        {game.snake.map((cell, i) => {
          const isHead = i === 0;
          const size = isHead ? CELL - 2 : CELL - 4;
          const offset = isHead ? 1 : 2;
          return (
            <div
              key={`${cell.x}-${cell.y}-${i}`}
              className="absolute transition-all duration-75"
              style={{
                left: cell.x * CELL + offset,
                top: cell.y * CELL + offset,
                width: size,
                height: size,
                borderRadius: isHead ? 10 : 8,
                background: isHead
                  ? 'linear-gradient(135deg, #a78bfa, #7c3aed)'
                  : `hsl(${260 - i * 2}, 70%, ${65 - i * 0.8}%)`,
                boxShadow: isHead ? '0 0 14px rgba(167,139,250,0.7)' : undefined,
                zIndex: game.snake.length - i,
              }}
            >
              {isHead && (
                <div className="absolute inset-0 flex items-center justify-center text-xs select-none pointer-events-none">
                  {/* Eyes */}
                  <div className="absolute top-[30%] left-[20%] w-[18%] h-[18%] bg-white rounded-full" />
                  <div className="absolute top-[30%] right-[20%] w-[18%] h-[18%] bg-white rounded-full" />
                </div>
              )}
            </div>
          );
        })}

        {/* Food */}
        <motion.div
          key={`${game.food.x},${game.food.y}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute flex items-center justify-center"
          style={{
            left: game.food.x * CELL,
            top: game.food.y * CELL,
            width: CELL,
            height: CELL,
            fontSize: CELL * 0.72,
            lineHeight: 1,
          }}
        >
          {game.foodEmoji}
        </motion.div>
      </div>

      {/* Mobile D-Pad */}
      <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 md:hidden">
        {[
          [null,    'UP',    null   ],
          ['LEFT',  null,    'RIGHT'],
          [null,    'DOWN',  null   ],
        ].map((row, ri) =>
          row.map((dir, ci) => (
            <button
              key={`${ri}-${ci}`}
              onPointerDown={() => dir && dpad(dir)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black transition-all active:scale-90 ${
                dir
                  ? 'bg-slate-700/80 hover:bg-violet-600/60 text-slate-200 border border-slate-600 active:bg-violet-600'
                  : 'pointer-events-none'
              }`}
            >
              {dir === 'UP' && '↑'}
              {dir === 'DOWN' && '↓'}
              {dir === 'LEFT' && '←'}
              {dir === 'RIGHT' && '→'}
            </button>
          ))
        )}
      </div>

      <p className="relative z-10 text-slate-600 text-xs mt-4 hidden md:block">
        Usa las teclas ↑ ↓ ← → o W A S D para moverte
      </p>
    </div>
  );
};

export default SnakeGame;
