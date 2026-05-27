import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Undo2, Image as ImageIcon } from 'lucide-react';
import useSEO from '../hooks/useSEO';

// --- Web Audio API Sound Effects ---
const playSplashSound = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
  
  gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
};

const COLORS = [
  '#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', 
  '#007AFF', '#5856D6', '#FF2D55', '#FFFFFF', '#000000',
  '#8B4513', '#FF69B4', '#9370DB', '#20B2AA', '#FF8C00'
];

const DRAWINGS = [
  { id: 'bumsy', name: 'Bumsy Oso', src: '/assets/games/colors/bumsy_lineart.webp' },
  { id: 'pipa', name: 'Pipa Pintora', src: '/assets/games/colors/pipa_lineart.webp' },
  { id: 'lumi', name: 'Lumi Búho', src: '/assets/games/colors/lumi_lineart.webp' },
  { id: 'stella', name: 'Estrella Mágica', src: '/assets/games/colors/stella_lineart.webp' },
];

const ColoringGame = () => {
  useSEO({
    title: 'Pinta Pipa',
    description: 'Diviértete llenando de color el mundo mágico de Bumsy Go.',
    image: '/assets/games/portada_pipa.webp'
  });

  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedDrawing, setSelectedDrawing] = useState(DRAWINGS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDrawingDrawerOpen, setIsDrawingDrawerOpen] = useState(false);
  
  // Undo History Stack
  const [history, setHistory] = useState([]);

  // Load Image to Canvas
  const loadImage = (src) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate aspect ratio to fit canvas
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      // Fill background with white
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Image
      ctx.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      
      // Reset history when loading new image
      setHistory([]);
    };
  };

  useEffect(() => {
    loadImage(selectedDrawing.src);
  }, [selectedDrawing]);

  // Utility to convert HEX to RGBA
  const hexToRgba = (hex) => {
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length === 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255, 255];
    }
    return [0,0,0,255];
  };

  // Undo Function
  const handleUndo = () => {
    if (history.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Pop the last state
    const previousState = history[history.length - 1];
    ctx.putImageData(previousState, 0, 0);
    
    // Remove it from history
    setHistory(prev => prev.slice(0, -1));
  };

  // Flood Fill Algorithm
  const floodFill = (e) => {
    if (isProcessing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const rect = canvas.getBoundingClientRect();
    
    // Scale coordinates if canvas css size differs from actual attribute size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const startX = Math.floor((e.clientX - rect.left) * scaleX);
    const startY = Math.floor((e.clientY - rect.top) * scaleY);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Get clicked pixel index
    const startPos = (startY * canvas.width + startX) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];

    // Get fill color
    const [fillR, fillG, fillB] = hexToRgba(selectedColor);

    // If clicked color is same as fill color, do nothing
    if (startR === fillR && startG === fillG && startB === fillB) return;

    // Stop filling if clicked on black outline (approx)
    if (startR < 50 && startG < 50 && startB < 50) return;

    // Save current state to history BEFORE modifying
    setHistory(prev => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);

    const matchStartColor = (pos) => {
      const r = data[pos];
      const g = data[pos + 1];
      const b = data[pos + 2];
      
      // Stop filling if it hits a dark outline
      if (r < 100 && g < 100 && b < 100) return false;

      // Color tolerance check
      const rDiff = Math.abs(r - startR);
      const gDiff = Math.abs(g - startG);
      const bDiff = Math.abs(b - startB);
      return (rDiff + gDiff + bDiff) < 150;
    };

    const colorPixel = (pos) => {
      data[pos] = fillR;
      data[pos + 1] = fillG;
      data[pos + 2] = fillB;
      data[pos + 3] = 255;
    };

    const pixelStack = [[startX, startY]];
    setIsProcessing(true);
    playSplashSound();

    setTimeout(() => {
      let newPos, x, y, pixelPos, reachLeft, reachRight;
      
      while (pixelStack.length) {
        newPos = pixelStack.pop();
        x = newPos[0];
        y = newPos[1];
        pixelPos = (y * canvas.width + x) * 4;
        
        while (y-- >= 0 && matchStartColor(pixelPos)) {
          pixelPos -= canvas.width * 4;
        }
        pixelPos += canvas.width * 4;
        ++y;
        
        reachLeft = false;
        reachRight = false;
        
        while (y++ < canvas.height - 1 && matchStartColor(pixelPos)) {
          colorPixel(pixelPos);

          if (x > 0) {
            if (matchStartColor(pixelPos - 4)) {
              if (!reachLeft) {
                pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }
        
          if (x < canvas.width - 1) {
            if (matchStartColor(pixelPos + 4)) {
              if (!reachRight) {
                pixelStack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }
          pixelPos += canvas.width * 4;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setIsProcessing(false);
    }, 0);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `Bumsy_Arte_${selectedDrawing.name}.png`;
    a.click();
  };

  return (
    <div className="pt-20 md:pt-24 pb-0 bg-slate-950 min-h-screen h-screen flex flex-col md:flex-row overflow-hidden select-none text-slate-100">
      
      {/* Sidebar - Galleries (Desktop only) */}
      <div className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 h-full overflow-y-auto hide-scrollbar">
        <div className="p-6 border-b border-slate-800 bg-slate-950/40 sticky top-0 z-10 backdrop-blur-md">
          <img src="/assets/games/logo_pipa.webp" alt="Pintando con Pipa" className="h-14 object-contain mb-2 mx-auto" />
          <p className="font-bold text-slate-400 mt-2 text-center text-xs tracking-wider uppercase">Elige un dibujo mágico</p>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          {DRAWINGS.map(drawing => (
            <motion.button
              key={drawing.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedDrawing(drawing)}
              className={`relative rounded-2xl overflow-hidden aspect-video border-4 transition-all ${selectedDrawing.id === drawing.id ? 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'border-slate-800 shadow-sm'}`}
            >
              <img src={drawing.src} alt={drawing.name} className="w-full h-full object-cover bg-white" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                 <span className="text-white font-black text-xs uppercase tracking-wider">{drawing.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Canvas Toolbar */}
        <div className="h-16 md:h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 z-10 shadow-md">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] border-2 border-white/80" style={{ backgroundColor: selectedColor }}></div>
             <span className="font-black text-slate-300 uppercase tracking-widest text-xs hidden sm:inline">Color Actual</span>
           </div>

           <div className="flex items-center gap-2 md:gap-3">
              {/* Mobile Drawings Button */}
              <button
                onClick={() => setIsDrawingDrawerOpen(true)}
                className="md:hidden bg-pink-600 hover:bg-pink-500 text-white p-2.5 rounded-full font-black text-xs flex items-center gap-1.5 transition-all shadow-lg uppercase tracking-wider"
              >
                <ImageIcon size={16} /> <span>Dibujos</span>
              </button>

              <button 
                onClick={handleUndo}
                disabled={history.length === 0}
                className={`p-2.5 md:px-5 md:py-2.5 rounded-full font-black text-xs flex items-center gap-1.5 uppercase transition-all ${history.length === 0 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-orange-600/20 hover:bg-orange-600/35 text-orange-400 border border-orange-500/30'}`}
                title="Deshacer"
              >
                <Undo2 size={16} /> <span className="hidden sm:inline">Deshacer</span>
              </button>
              
              <button 
                onClick={() => loadImage(selectedDrawing.src)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 md:px-5 md:py-2.5 border border-slate-700 rounded-full font-black text-xs flex items-center gap-1.5 transition-colors uppercase"
              >
                <Trash2 size={16} /> <span className="hidden sm:inline">Limpiar</span>
              </button>
              
              <button 
                onClick={handleDownload}
                className="bg-pink-600 hover:bg-pink-500 text-white p-2.5 md:px-5 md:py-2.5 rounded-full font-black text-xs flex items-center gap-1.5 shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all uppercase tracking-wider"
              >
                <Download size={16} /> <span className="hidden sm:inline">Guardar</span>
              </button>
           </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 bg-slate-950 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
           <canvas 
             ref={canvasRef}
             width={800}
             height={800}
             onPointerDown={floodFill}
             className="max-w-full max-h-full aspect-square object-contain bg-white shadow-[0_0_60px_rgba(255,255,255,0.06)] rounded-2xl touch-none"
             style={{ cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${selectedColor.replace('#', '%23')}" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/></svg>') 0 24, crosshair` }}
           />
           {isProcessing && (
             <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
             </div>
           )}
        </div>

        {/* Bottom Palette */}
        <div className="h-20 md:h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-start overflow-x-auto px-4 py-2 hide-scrollbar z-10">
          <div className="flex items-center gap-2 sm:gap-3 mx-auto min-w-max">
            {COLORS.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] border-4 transition-all ${selectedColor === color ? 'border-pink-500 scale-110 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'border-slate-800 hover:border-slate-400'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Mobile Drawings Drawer */}
      {isDrawingDrawerOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end justify-center md:hidden" onClick={() => setIsDrawingDrawerOpen(false)}>
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border-t border-slate-800 rounded-t-3xl w-full max-h-[75vh] overflow-y-auto p-5 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="font-black text-slate-200 text-sm uppercase tracking-widest">Elige un dibujo mágico</span>
              <button onClick={() => setIsDrawingDrawerOpen(false)} className="text-slate-400 hover:text-slate-200 font-bold text-base bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 pb-6">
              {DRAWINGS.map(drawing => (
                <button
                  key={drawing.id}
                  onClick={() => {
                    setSelectedDrawing(drawing);
                    setIsDrawingDrawerOpen(false);
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-video border-4 transition-all ${selectedDrawing.id === drawing.id ? 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'border-slate-800'}`}
                >
                  <img src={drawing.src} alt={drawing.name} className="w-full h-full object-cover bg-white" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2">
                     <span className="text-white font-black text-[10px] uppercase tracking-wider">{drawing.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ColoringGame;
