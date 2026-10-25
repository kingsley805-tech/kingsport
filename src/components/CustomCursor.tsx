import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let particleCounter = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Spawn faint particle trail
      particleCounter++;
      if (particleCounter % 4 === 0) {
        const id = Math.random();
        setParticles(prev => [
          ...prev.slice(-12),
          { id, x: mouseX, y: mouseY, opacity: 0.6 }
        ]);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Scan interactive target element under cursor
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        setCursorType('view');
      } else if (target.closest('[data-cursor="drag"]')) {
        setCursorType('drag');
      } else if (
        target.closest('a, button, input, select, textarea, [role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp loop for the lagging ring
    let animationId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const loop = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // Fade out particles
      setParticles(prev =>
        prev
          .map(p => ({ ...p, opacity: p.opacity - 0.03 }))
          .filter(p => p.opacity > 0.05)
      );

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Particle trail */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: '3px',
            height: '3px',
            opacity: p.opacity,
            boxShadow: '0 0 6px hsl(var(--primary))',
            transition: 'opacity 0.1s linear'
          }}
        />
      ))}

      {/* Center sharp dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 ${
          cursorType === 'view' ? 'opacity-0' : 'opacity-100'
        } ${cursorType === 'pointer' ? 'w-2 h-2 bg-primary' : 'w-1.5 h-1.5 bg-foreground'}`}
        style={{ willChange: 'transform' }}
      />

      {/* Lagging Ring / Badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono font-medium transition-all duration-200 ease-out ${
          cursorType === 'view'
            ? 'w-14 h-14 bg-primary text-primary-foreground text-[10px] tracking-widest rounded-full shadow-lg shadow-primary/30'
            : cursorType === 'pointer'
            ? 'w-10 h-10 border-2 border-primary/80 bg-primary/10 rounded-full'
            : cursorType === 'drag'
            ? 'w-12 h-12 border border-primary/60 bg-primary/20 rounded-full text-[9px] text-primary'
            : 'w-7 h-7 border border-foreground/30 rounded-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorType === 'view' && 'VIEW'}
        {cursorType === 'drag' && 'TOSS'}
      </div>
    </div>
  );
};

export default CustomCursor;
