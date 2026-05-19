import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowLeft, Trophy, RotateCcw, Star } from 'lucide-react';
import useSEO from '../hooks/useSEO';

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 800;           // canvas logical width
const H = 300;           // canvas logical height
const GROUND_Y = 230;    // y position of ground line
const SERGI_W = 70;
const SERGI_H = 80;
const SERGI_X = 90;
const GRAVITY = 0.7;
const JUMP_V = -15;
const BASE_SPEED = 5;

// Obstacle types
const OBS_TYPES = [
  { w: 28, h: 55, color: '#16a34a', label: '🌿' },  // bush
  { w: 36, h: 70, color: '#15803d', label: '🌳' },  // tree
  { w: 50, h: 40, color: '#92400e', label: '🪨' },  // rock
  { w: 22, h: 65, color: '#7c3aed', label: '🍄' },  // mushroom
];

function randomObs(speed) {
  const t = OBS_TYPES[Math.floor(Math.random() * OBS_TYPES.length)];
  return {
    x: W + 60,
    y: GROUND_Y - t.h,
    w: t.w,
    h: t.h,
    color: t.color,
    label: t.label,
    speed,
  };
}

// Draw helpers ─────────────────────────────────────────────────────────────────
function drawBackground(ctx, offset) {
  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  sky.addColorStop(0, '#bfdbfe');
  sky.addColorStop(1, '#dbeafe');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, GROUND_Y);

  // Clouds (parallax)
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  const clouds = [
    { bx: 100, y: 40, r: 28 },
    { bx: 320, y: 60, r: 22 },
    { bx: 550, y: 35, r: 34 },
    { bx: 720, y: 55, r: 20 },
  ];
  clouds.forEach(c => {
    const x = ((c.bx - offset * 0.3) % (W + 120) + W + 120) % (W + 120) - 60;
    ctx.beginPath();
    ctx.arc(x, c.y, c.r, 0, Math.PI * 2);
    ctx.arc(x + c.r * 0.8, c.y - c.r * 0.3, c.r * 0.75, 0, Math.PI * 2);
    ctx.arc(x + c.r * 1.6, c.y, c.r * 0.6, 0, Math.PI * 2);
    ctx.fill();
  });

  // Rainbow (static)
  const rainbowColors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6'];
  rainbowColors.forEach((color, i) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.globalAlpha = 0.35;
    ctx.arc(W * 0.75, GROUND_Y + 50, 120 + i * 10, Math.PI, 0);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  // Ground strip
  const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, H);
  groundGrad.addColorStop(0, '#4ade80');
  groundGrad.addColorStop(0.15, '#16a34a');
  groundGrad.addColorStop(1, '#14532d');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

  // Ground line dashes
  ctx.strokeStyle = '#86efac';
  ctx.lineWidth = 2;
  ctx.setLineDash([18, 14]);
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y + 2);
  ctx.lineTo(W, GROUND_Y + 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Distant trees (parallax bg)
  ctx.globalAlpha = 0.25;
  const treeCols = ['#15803d','#166534','#14532d'];
  [60, 180, 300, 430, 580, 700].forEach((bx, i) => {
    const x = ((bx - offset * 0.15) % (W + 80) + W + 80) % (W + 80) - 40;
    ctx.fillStyle = treeCols[i % 3];
    ctx.beginPath();
    ctx.arc(x, GROUND_Y - 30, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x - 5, GROUND_Y - 10, 10, 20);
  });
  ctx.globalAlpha = 1;
}

function drawSergi(ctx, sergi, frame) {
  const { x, y, onGround } = sergi;
  // Body (orange gradient circle)
  const bodyGrad = ctx.createRadialGradient(x + SERGI_W / 2 - 10, y + 20, 5, x + SERGI_W / 2, y + SERGI_H / 2, SERGI_W / 2);
  bodyGrad.addColorStop(0, '#fbbf24');
  bodyGrad.addColorStop(1, '#f97316');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(x + SERGI_W / 2, y + SERGI_H * 0.55, SERGI_W * 0.42, SERGI_H * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.fillStyle = '#f97316';
  // Left ear
  ctx.beginPath();
  ctx.ellipse(x + SERGI_W * 0.3, y + 12, 9, 22, -0.2, 0, Math.PI * 2);
  ctx.fill();
  // Right ear
  ctx.beginPath();
  ctx.ellipse(x + SERGI_W * 0.7, y + 10, 9, 22, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Inner ears (pink)
  ctx.fillStyle = '#fda4af';
  ctx.beginPath();
  ctx.ellipse(x + SERGI_W * 0.3, y + 13, 5, 15, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + SERGI_W * 0.7, y + 11, 5, 15, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(x + SERGI_W / 2, y + SERGI_H * 0.35, SERGI_W * 0.35, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(x + SERGI_W * 0.38, y + SERGI_H * 0.3, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + SERGI_W * 0.62, y + SERGI_H * 0.3, 5, 0, Math.PI * 2);
  ctx.fill();
  // Eye shine
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + SERGI_W * 0.4, y + SERGI_H * 0.28, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + SERGI_W * 0.64, y + SERGI_H * 0.28, 2, 0, Math.PI * 2);
  ctx.fill();

  // Nose
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.arc(x + SERGI_W / 2, y + SERGI_H * 0.38, 3, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.strokeStyle = '#9a3412';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + SERGI_W / 2, y + SERGI_H * 0.4, 7, 0.1, Math.PI - 0.1);
  ctx.stroke();

  // Legs (animated when on ground)
  const legSwing = onGround ? Math.sin(frame * 0.25) * 12 : 0;
  ctx.fillStyle = '#f97316';
  // Left leg
  ctx.beginPath();
  ctx.ellipse(x + SERGI_W * 0.35 + legSwing, y + SERGI_H * 0.88, 9, 14, 0.2, 0, Math.PI * 2);
  ctx.fill();
  // Right leg
  ctx.beginPath();
  ctx.ellipse(x + SERGI_W * 0.65 - legSwing, y + SERGI_H * 0.88, 9, 14, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Backpack
  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.roundRect(x + SERGI_W * 0.62, y + SERGI_H * 0.25, 16, 24, 4);
  ctx.fill();
}

function drawObstacle(ctx, obs) {
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.beginPath();
  ctx.ellipse(obs.x + obs.w / 2, GROUND_Y + 4, obs.w * 0.5, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = obs.color;
  ctx.beginPath();
  ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 8);
  ctx.fill();

  // Emoji label
  ctx.font = `${Math.min(obs.w, 30)}px serif`;
  ctx.textAlign = 'center';
  ctx.fillText(obs.label, obs.x + obs.w / 2, obs.y + obs.h / 2 + 8);
}

// ─── Component ────────────────────────────────────────────────────────────────
const SergiRunGame = () => {
  useSEO({
    title: 'Sergi Corre — El corredor del Bosque Arcoíris',
    description: '¡Ayuda a Sergi a saltar obstáculos en el Bosque Arcoíris! Un juego de habilidad infinita para toda la familia.',
    image: '/assets/games/poster_sergi_run.png',
  });

  const [screen, setScreen] = useState('cover');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('bumsy_sergi_hs') || '0'));

  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const initState = () => ({
    sergi: { x: SERGI_X, y: GROUND_Y - SERGI_H, vy: 0, onGround: true },
    obstacles: [],
    offset: 0,
    frame: 0,
    score: 0,
    speed: BASE_SPEED,
    nextObs: 90,
    alive: true,
  });

  const jump = useCallback(() => {
    if (!stateRef.current) return;
    const s = stateRef.current.sergi;
    if (s.onGround) {
      s.vy = JUMP_V;
      s.onGround = false;
    }
  }, []);

  // Input
  useEffect(() => {
    if (screen !== 'playing') return;
    const onKey = (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, jump]);

  // Game loop
  const loop = useCallback((time) => {
    if (!stateRef.current) return;
    const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 16.67, 3) : 1;
    lastTimeRef.current = time;

    const st = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Physics
    const sg = st.sergi;
    sg.vy += GRAVITY * dt;
    sg.y += sg.vy * dt;
    if (sg.y >= GROUND_Y - SERGI_H) {
      sg.y = GROUND_Y - SERGI_H;
      sg.vy = 0;
      sg.onGround = true;
    }

    // Speed ramp
    st.speed = Math.min(BASE_SPEED + st.score * 0.004, 18);
    st.offset += st.speed * dt;
    st.frame += dt;

    // Obstacles
    st.nextObs -= st.speed * dt;
    if (st.nextObs <= 0) {
      st.obstacles.push(randomObs(st.speed));
      st.nextObs = 180 + Math.random() * 220;
    }
    st.obstacles = st.obstacles
      .map(o => ({ ...o, x: o.x - st.speed * dt }))
      .filter(o => o.x + o.w > -10);

    // Score
    st.score += 0.08 * dt;

    // Collision (AABB with shrink margin)
    const margin = 10;
    const sx = sg.x + margin, sy = sg.y + margin;
    const sw = SERGI_W - margin * 2, sh = SERGI_H - margin * 2;
    for (const obs of st.obstacles) {
      if (sx < obs.x + obs.w && sx + sw > obs.x && sy < obs.y + obs.h && sy + sh > obs.y) {
        st.alive = false;
        break;
      }
    }

    // Draw
    drawBackground(ctx, st.offset);
    st.obstacles.forEach(o => drawObstacle(ctx, o));
    drawSergi(ctx, sg, st.frame);

    // HUD
    ctx.fillStyle = 'rgba(15,23,42,0.55)';
    ctx.beginPath();
    ctx.roundRect(W - 170, 12, 155, 44, 22);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px Poppins, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`⭐ ${Math.floor(st.score)}`, W - 20, 42);

    setScore(Math.floor(st.score));

    if (!st.alive) {
      const hs = Math.max(Math.floor(st.score), parseInt(localStorage.getItem('bumsy_sergi_hs') || '0'));
      localStorage.setItem('bumsy_sergi_hs', hs);
      setHighScore(hs);
      setScreen('gameover');
      return;
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const startGame = () => {
    stateRef.current = initState();
    lastTimeRef.current = null;
    setScore(0);
    setScreen('playing');
  };

  useEffect(() => {
    if (screen === 'playing') {
      rafRef.current = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [screen, loop]);

  // ── COVER ──────────────────────────────────────────────────────────────────
  if (screen === 'cover') return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{ background: 'linear-gradient(160deg, #bfdbfe 0%, #dbeafe 40%, #bbf7d0 100%)' }}>
      {/* BG trees */}
      <div className="absolute inset-0 pointer-events-none">
        {['🌳','🌲','🌴','🌳','🌲'].map((t, i) => (
          <span key={i} className="absolute bottom-0 text-[80px] opacity-30 select-none"
            style={{ left: `${i * 22 + 2}%` }}>{t}</span>
        ))}
      </div>
      {/* Rainbow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-30">
        {['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6'].map((c, i) => (
          <div key={i} className="absolute rounded-full border-[5px] border-t-0" style={{
            borderColor: c, width: 300 + i * 20, height: 300 + i * 20,
            left: '50%', transform: 'translateX(-50%)', bottom: 0,
          }}/>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-md">

        {/* Sergi image */}
        <motion.img
          src="/assets/characters/circles/sergi.webp"
          alt="Sergi"
          animate={{ y: [0, -16, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="w-36 h-36 object-contain drop-shadow-xl mb-2 select-none"
        />

        <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tighter mb-1"
          style={{ fontFamily: "'Poppins', sans-serif", color: '#f97316',
            textShadow: '0 4px 0 #c2410c, 0 6px 20px rgba(249,115,22,0.3)' }}>
          Sergi<span style={{ color: '#16a34a' }}> Corre!</span>
        </h1>
        <p className="text-slate-600 font-semibold text-lg mb-3"
          style={{ fontFamily: "'Poppins', sans-serif" }}>
          El corredor del Bosque Arcoíris
        </p>

        {highScore > 0 && (
          <div className="flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-700 px-5 py-2 rounded-full text-sm font-black mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <Trophy size={16}/> RÉCORD: {highScore} pts
          </div>
        )}

        {/* Instructions */}
        <div className="grid grid-cols-2 gap-3 mb-8 w-full text-left">
          {[['⎵ / ↑','Presiona para saltar'],['🌿','Esquiva arbustos y rocas'],
            ['⭐','Gana puntos corriendo'],['🔥','¡La velocidad aumenta!']
          ].map(([k, v]) => (
            <div key={v} className="flex items-start gap-2 bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/80">
              <span className="text-xl leading-none">{k}</span>
              <span className="text-slate-700 text-sm font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>{v}</span>
            </div>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="flex items-center gap-3 font-black text-xl px-14 py-5 rounded-full text-white shadow-xl mb-5"
          style={{ fontFamily: "'Poppins', sans-serif",
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            boxShadow: '0 8px 30px rgba(249,115,22,0.45)' }}>
          <Play fill="white" size={22}/> ¡JUGAR AHORA!
        </motion.button>

        <Link to="/play" className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-semibold text-sm transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif" }}>
          <ArrowLeft size={16}/> Volver al Centro de Juegos
        </Link>
      </motion.div>
    </div>
  );

  // ── GAME OVER ──────────────────────────────────────────────────────────────
  if (screen === 'gameover') {
    const isNew = score >= highScore && score > 0;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
        style={{ background: 'linear-gradient(160deg, #fef3c7 0%, #fff7ed 50%, #fce7f3 100%)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="relative z-10 flex flex-col items-center text-center max-w-sm">

          <motion.span animate={{ rotate: [0,-15,15,-15,15,0] }} transition={{ duration: 0.7 }}
            className="text-[80px] mb-3 block">😵</motion.span>

          <h2 className="text-5xl font-black mb-2 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            ¡Sergi <span className="text-orange-500">tropezó!</span>
          </h2>

          <div className="flex gap-5 my-7">
            <div className="bg-white rounded-2xl shadow px-8 py-5 flex flex-col items-center border border-slate-100">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Puntos</span>
              <span className="text-4xl font-black text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>{score}</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-8 py-5 flex flex-col items-center">
              <span className="text-amber-600/70 text-xs font-bold uppercase tracking-widest mb-1">Récord</span>
              <span className="text-4xl font-black text-amber-500" style={{ fontFamily: "'Poppins', sans-serif" }}>{highScore}</span>
            </div>
          </div>

          {isNew && (
            <motion.div animate={{ scale: [1,1.1,1] }} transition={{ repeat: Infinity, duration: 1.4 }}
              className="flex items-center gap-2 bg-amber-400 text-slate-950 px-6 py-2 rounded-full font-black text-sm mb-5"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              🏆 ¡NUEVO RÉCORD!
            </motion.div>
          )}

          <div className="flex flex-col gap-4 w-full mt-2">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={startGame}
              className="flex items-center justify-center gap-3 font-black text-lg px-10 py-4 rounded-full text-white"
              style={{ fontFamily: "'Poppins', sans-serif",
                background: 'linear-gradient(135deg,#f97316,#ea580c)',
                boxShadow: '0 6px 25px rgba(249,115,22,0.4)' }}>
              <RotateCcw size={20}/> JUGAR DE NUEVO
            </motion.button>
            <Link to="/play" className="flex items-center justify-center gap-2 text-slate-400 hover:text-slate-700 font-semibold text-sm transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              <ArrowLeft size={16}/> Volver al Hub de Juegos
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── PLAYING ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 select-none px-2 py-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* HUD */}
      <div className="flex items-center justify-between w-full max-w-[800px] mb-3 px-1">
        <Link to="/play" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-sm font-semibold">
          <ArrowLeft size={16}/> Hub
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur rounded-full px-4 py-1.5 border border-white">
            <Star size={14} className="text-amber-500"/>
            <span className="text-slate-700 font-black text-sm">{score}</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5">
            <Trophy size={14} className="text-amber-500"/>
            <span className="text-amber-600 font-black text-sm">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 cursor-pointer"
        onClick={jump}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block max-w-full"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>

      <p className="text-slate-500 text-xs mt-4 hidden md:block">
        Presiona <kbd className="bg-white border border-slate-200 rounded px-2 py-0.5 text-slate-700 font-mono shadow-sm">Espacio</kbd> o <kbd className="bg-white border border-slate-200 rounded px-2 py-0.5 text-slate-700 font-mono shadow-sm">↑</kbd> para saltar · En móvil <strong>toca la pantalla</strong>
      </p>
      <p className="text-slate-400 text-xs mt-1 md:hidden">Toca la pantalla para saltar</p>
    </div>
  );
};

export default SergiRunGame;
