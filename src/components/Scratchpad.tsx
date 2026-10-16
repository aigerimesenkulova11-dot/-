import React, { useRef, useState, useEffect } from 'react';
import { Edit3, Eraser, RotateCcw, X, Maximize2, Minimize2, Palette, Grid } from 'lucide-react';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState('#fef08a'); // soft chalk yellow
  const [penSize, setPenSize] = useState(3);
  const [showGrid, setShowGrid] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [isOpen, isExpanded]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (tool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = penSize * 4;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 flex flex-col rounded-2xl shadow-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-md overflow-hidden ${
        isExpanded
          ? 'inset-4 md:inset-10'
          : 'bottom-4 right-4 w-[92vw] sm:w-[480px] h-[360px] max-h-[85vh]'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-slate-700 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-bold text-slate-100 font-['Chakra_Petch',sans-serif] tracking-wide">
            КАРАЛАМА (ЧЕРНОВИК)
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">Эсептөөлөрдү жазуу</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Торчону күйгүзүү/өчүрүү"
            className={`p-1.5 rounded-lg border text-xs transition ${
              showGrid
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-700/60 text-slate-400 border-slate-600'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Кичирейтүү' : 'Чоңойтуу'}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600 transition"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            title="Жабуу"
            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/40 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTool('pen')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition ${
              tool === 'pen'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Калем</span>
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition ${
              tool === 'eraser'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>Өчүргүч</span>
          </button>
        </div>

        {/* Color Palette (when pen active) */}
        {tool === 'pen' && (
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
            <Palette className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:inline" />
            {[
              { color: '#fef08a', label: 'Сары' },
              { color: '#38bdf8', label: 'Көк' },
              { color: '#4ade80', label: 'Жашыл' },
              { color: '#f43f5e', label: 'Кызыл' },
              { color: '#ffffff', label: 'Ак' },
            ].map((c) => (
              <button
                key={c.color}
                onClick={() => setPenColor(c.color)}
                style={{ backgroundColor: c.color }}
                title={c.label}
                className={`w-4 h-4 rounded-full transition-transform ${
                  penColor === c.color ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-900' : 'opacity-80 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        )}

        <button
          onClick={clearCanvas}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-700/50 transition ml-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Тазалоо</span>
        </button>
      </div>

      {/* Canvas Area */}
      <div
        className="relative flex-1 bg-slate-950 overflow-hidden cursor-crosshair touch-none"
        style={
          showGrid
            ? {
                backgroundImage: `
                  linear-gradient(to right, rgba(51, 65, 85, 0.25) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(51, 65, 85, 0.25) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px'
              }
            : undefined
        }
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block"
        />
        <div className="absolute bottom-2 right-3 pointer-events-none text-[11px] text-slate-500 select-none">
          Бул жерге мамыча түрүндө эсептесеңиз болот ✏️
        </div>
      </div>
    </div>
  );
};
