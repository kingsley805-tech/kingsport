import React, { useEffect, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../config';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [statusText, setStatusText] = useState('CALIBRATING_OSCILLATOR');

  useEffect(() => {
    const statuses = [
      'CALIBRATING_OSCILLATOR',
      'ENERGIZING_COPPER_TRACES',
      'INITIALIZING_HAL_BUS',
      'ALIGNING_ZERO_G_GYROSCOPES',
      'SYSTEM_READY'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText(statuses[statuses.length - 1]);
          setTimeout(() => {
            setIsWiping(true);
            setTimeout(onComplete, 650);
          }, 350);
          return 100;
        }

        const idx = Math.min(statuses.length - 2, Math.floor((next / 100) * (statuses.length - 1)));
        setStatusText(statuses[idx]);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-transform duration-700 ease-out ${
        isWiping ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Circuit Board SVG drawing itself */}
        <div className="relative w-40 h-40 mb-8">
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background grid pads */}
            <rect x="20" y="20" width="120" height="120" rx="16" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Central IC Microchip */}
            <rect
              x="55"
              y="55"
              width="50"
              height="50"
              rx="6"
              fill="hsl(var(--card))"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
            />
            {/* Chip notch */}
            <circle cx="65" cy="65" r="3" fill="hsl(var(--primary))" />

            {/* IC Pin leads */}
            <path d="M45 65h10 M45 80h10 M45 95h10" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M105 65h10 M105 80h10 M105 95h10" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M65 45v10 M80 45v10 M95 45v10" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M65 105v10 M80 105v10 M95 105v10" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />

            {/* Self-drawing circuit traces based on progress */}
            <path
              d="M10 30h40l20 25 M150 130h-40l-20-25 M130 30h-30l-15 15 M30 130h30l15-15"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="260"
              strokeDashoffset={260 - (260 * progress) / 100}
              className="transition-[stroke-dashoffset] duration-75 ease-out"
              style={{
                filter: 'drop-shadow(0 0 6px hsl(var(--primary)))'
              }}
            />

            {/* Via test points */}
            <circle cx="10" cy="30" r="3.5" fill="hsl(var(--primary))" />
            <circle cx="150" cy="130" r="3.5" fill="hsl(var(--primary))" />
            <circle cx="130" cy="30" r="3.5" fill="hsl(var(--primary))" />
            <circle cx="30" cy="130" r="3.5" fill="hsl(var(--primary))" />
          </svg>

          {/* Center glowing heartbeat */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs font-semibold text-primary">
              SYS
            </span>
          </div>
        </div>

        {/* Counter and Terminal Status */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-serif text-5xl md:text-6xl text-foreground tracking-tight font-light">
            {progress}
          </span>
          <span className="font-mono text-sm text-primary">%</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span>{statusText}</span>
        </div>

        {/* Brand identity caption */}
        <p className="mt-6 font-serif italic text-sm text-muted-foreground/80">
          {PORTFOLIO_CONFIG.name} — Hardware & Software
        </p>
      </div>
    </div>
  );
};

export default Preloader;
