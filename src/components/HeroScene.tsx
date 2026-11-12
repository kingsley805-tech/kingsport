import React, { useEffect, useRef } from 'react';

interface HeroSceneProps {
  interactive?: boolean;
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isCyan: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let nodes: NodePoint[] = [];
    const pointer = { x: -9999, y: -9999 };

    const initNodes = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 24 : 44;
      nodes = Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.4 + (idx % 3) * 0.6,
        isCyan: idx % 3 === 0
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');
      const blueRgb = isDark ? '59, 130, 246' : '37, 99, 235';
      const cyanRgb = '6, 182, 212';
      const maxDist = width < 768 ? 115 : 150;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x <= 0 || n.x >= width) n.vx *= -1;
          if (n.y <= 0 || n.y >= height) n.vy *= -1;
        }

        // Subtle pointer attraction
        if (interactive && !prefersReducedMotion) {
          const dxp = pointer.x - n.x;
          const dyp = pointer.y - n.y;
          const distP = Math.hypot(dxp, dyp);
          if (distP > 0 && distP < 180) {
            n.x += dxp * 0.0025;
            n.y += dyp * 0.0025;
          }
        }

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isDark ? 0.22 : 0.14);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(${n.isCyan ? cyanRgb : blueRgb}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.isCyan ? cyanRgb : blueRgb}, ${isDark ? 0.55 : 0.45})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    initNodes();
    draw();

    window.addEventListener('resize', initNodes);
    if (interactive) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initNodes);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85"
    />
  );
};

export default HeroScene;
