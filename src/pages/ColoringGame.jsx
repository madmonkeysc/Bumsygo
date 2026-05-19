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
  { id: 'bumsy', name: 'Bumsy Oso', src: '/assets/games/colors/bumsy_lineart.png' },
  { id: 'pipa', name: 'Pipa Pintora', src: '/assets/games/colors/pipa_lineart.png' },
  { id: 'lumi', name: 'Lumi Búho', src: '/assets/games/colors/lumi_lineart.png' },
  { id: 'stella', name: 'Estrella Mágica', src: '/assets/games/colors/stella_lineart.png' },
];

const ColoringGame = () => {
  useSEO({
    title: 'Pinta Pipa',
    description: 'Diviértete llenando de color el mundo mágico de Bumsy Go.',
    image: '/assets/games/portada_pipa.png'
  });

  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedDrawing, setSelectedDrawing] = useState(DRAWINGS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  
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
    <div className="pt-24 pb-0 bg-primary/5 min-h-screen flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar - Galleries */}
      <div className="w-full md:w-80 bg-white shadow-2xl z-20 flex flex-col h-auto md:h-[calc(100vh-6rem)] border-r border-gray-100 overflow-y-auto hide-scrollbar">
        <div className="p-8 border-b border-gray-100 bg-accent/5 sticky top-0 z-10 backdrop-blur-md">
          <img src="/assets/games/logo_pipa.png" alt="Pintando con Pipa" className="h-16 object-contain mb-2" />
          <p className="font-bold text-gray-500 mt-2 text-sm">Elige un dibujo mágico</p>
        </div>
        
        <div className="p-6 grid grid-cols-2 md:grid-cols-1 gap-4">
          {DRAWINGS.map(drawing => (
            <motion.button
              key={drawing.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedDrawing(drawing)}
              className={`relative rounded-3xl overflow-hidden aspect-video md:aspect-square border-4 transition-all ${selectedDrawing.id === drawing.id ? 'border-accent shadow-[0_10px_20px_rgba(255,105,180,0.3)]' : 'border-transparent shadow-sm'}`}
            >
              <img src={drawing.src} alt={drawing.name} className="w-full h-full object-cover bg-white" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                 <span className="text-white font-black text-sm uppercase tracking-wider">{drawing.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative h-[calc(100vh-6rem)]">
        
        {/* Canvas Toolbar */}
        <div className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-6 md:px-12 z-10 shadow-sm overflow-x-auto hide-scrollbar">
           <div className="flex items-center gap-4 min-w-max mr-4">
             <div className="w-10 h-10 rounded-full shadow-inner border-2 border-gray-200" style={{ backgroundColor: selectedColor }}></div>
             <span className="font-black text-primary uppercase tracking-widest text-sm hidden md:inline">Color Actual</span>
           </div>

           <div className="flex items-center gap-2 md:gap-4 min-w-max">
              <button 
                onClick={handleUndo}
                disabled={history.length === 0}
                className={`p-3 md:px-6 md:py-3 rounded-full font-black text-sm flex items-center gap-2 uppercase transition-all ${history.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-100 hover:bg-orange-200 text-orange-600 shadow-sm hover:shadow-md'}`}
                title="Deshacer"
              >
                <Undo2 size={18} /> <span className="hidden md:inline">Deshacer</span>
              </button>
              
              <button 
                onClick={() => loadImage(selectedDrawing.src)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 md:px-6 md:py-3 rounded-full font-black text-sm flex items-center gap-2 transition-colors uppercase"
              >
                <Trash2 size={18} /> <span className="hidden md:inline">Limpiar</span>
              </button>
              
              <button 
                onClick={handleDownload}
                className="bg-primary hover:bg-secondary hover:text-primary text-white p-3 md:px-6 md:py-3 rounded-full font-black text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all uppercase"
              >
                <Download size={18} /> <span className="hidden md:inline">Guardar</span>
              </button>
           </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4 relative cursor-crosshair">
           <canvas 
             ref={canvasRef}
             width={800}
             height={800}
             onClick={floodFill}
             className="max-w-full h-auto max-h-full object-contain bg-white shadow-2xl rounded-2xl touch-none"
             style={{ cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${selectedColor.replace('#', '%23')}" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/></svg>') 0 24, crosshair` }}
           />
           {isProcessing && (
             <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-20">
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
             </div>
           )}
        </div>

        {/* Bottom Palette */}
        <div className="h-28 md:h-32 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center justify-start overflow-x-auto px-6 py-4 hide-scrollbar z-10">
          <div className="flex items-center gap-3 md:gap-4 mx-auto min-w-max">
            {COLORS.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(color)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md border-4 transition-all ${selectedColor === color ? 'border-primary scale-110 shadow-lg' : 'border-white'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ColoringGame;
