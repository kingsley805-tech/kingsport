import React, { useState, useRef } from 'react';
import { PORTFOLIO_CONFIG } from '../config';
import { Cpu, Code2, Layers, Zap, Sliders, Info, ShieldCheck, Terminal } from 'lucide-react';

export const DualitySection: React.FC = () => {
  // Slider position from 0 (all software) to 100 (all hardware)
  const [sliderPos, setSliderPos] = useState(50);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const duality = PORTFOLIO_CONFIG.duality;

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section
      id="duality"
      className="relative py-24 px-6 sm:px-10 lg:px-16 border-b border-border/50 overflow-hidden bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
                SIGNATURE ARCHITECTURE
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal tracking-tight">
              {duality.title}
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-xl font-sans">
              {duality.subtitle}. Seamless integration from C11 firmware registers to multi-layer controlled-impedance PCB layouts.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-secondary/80 border border-border backdrop-blur-sm self-start md:self-auto">
            <button
              onClick={() => setSliderPos(0)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                sliderPos === 0
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Software (0%)</span>
            </button>
            <button
              onClick={() => setSliderPos(50)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                sliderPos === 50
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Split (50%)</span>
            </button>
            <button
              onClick={() => setSliderPos(100)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                sliderPos === 100
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Hardware (100%)</span>
            </button>
          </div>
        </div>

        {/* Morphing Window Container */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full h-[580px] sm:h-[620px] rounded-2xl border border-border overflow-hidden bg-card shadow-2xl select-none"
        >
          {/* Top Window Header */}
          <div className="absolute top-0 inset-x-0 h-12 bg-secondary/70 border-b border-border/80 z-30 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-muted-foreground font-medium hidden sm:inline">
                DUALITY WORKBENCH // {sliderPos < 50 ? 'FIRMWARE LAYER' : 'PCB SILICON LAYER'}
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {duality.hardwareSide.boardSpecs.split('•')[0]}
              </span>
              <span className="hidden md:inline text-xs">
                IMPEDANCE: 50Ω MATCHED
              </span>
            </div>
          </div>

          {/* LAYER 1: The Hardware PCB Schematic (Bottom layer) */}
          <div className="absolute inset-0 pt-12 bg-[#0c0e12] text-white overflow-hidden">
            {/* PCB Grid Background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e07a5f_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between">
              {/* Board Header details */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20 border border-primary/40 text-primary">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-semibold text-foreground">
                      {duality.hardwareSide.schematicName}
                    </h4>
                    <p className="font-mono text-xs text-primary/80">
                      {duality.hardwareSide.boardSpecs}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/60 border border-border text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DRC: 0 Errors • 0 Warnings</span>
                </div>
              </div>

              {/* Vector PCB Canvas with interactive ICs and pulsing traces */}
              <div className="relative w-full flex-1 my-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 800 450"
                  className="w-full h-full max-h-[380px] overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer PCB outline */}
                  <rect
                    x="20"
                    y="20"
                    width="760"
                    height="410"
                    rx="16"
                    stroke="#e07a5f"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    fill="#13161c"
                    fillOpacity="0.8"
                  />

                  {/* Corner Mounting holes */}
                  <circle cx="50" cy="50" r="12" stroke="#e07a5f" strokeWidth="2" fill="#0c0e12" />
                  <circle cx="750" cy="50" r="12" stroke="#e07a5f" strokeWidth="2" fill="#0c0e12" />
                  <circle cx="50" cy="400" r="12" stroke="#e07a5f" strokeWidth="2" fill="#0c0e12" />
                  <circle cx="750" cy="400" r="12" stroke="#e07a5f" strokeWidth="2" fill="#0c0e12" />

                  {/* High-speed differential pair traces */}
                  <path
                    d="M 220 180 L 320 180 L 370 210 L 400 210"
                    stroke="#e07a5f"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-60"
                  />
                  <path
                    d="M 220 190 L 315 190 L 365 220 L 400 220"
                    stroke="#e07a5f"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-60"
                  />

                  {/* Animated SPI bus pulse */}
                  <path
                    d="M 400 240 L 480 240 L 530 290 L 620 290"
                    stroke="#f4a261"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="15 35"
                    className="animate-trace"
                  />
                  <path
                    d="M 400 210 L 460 210 L 510 130 L 600 130"
                    stroke="#e07a5f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="10 40"
                    className="animate-trace"
                  />

                  {/* Ground Pour Hatch Pattern */}
                  <line x1="120" y1="80" x2="280" y2="80" stroke="#252b36" strokeWidth="1" />
                  <line x1="120" y1="90" x2="280" y2="90" stroke="#252b36" strokeWidth="1" />

                  {/* Vias (interlayer connections) */}
                  {[
                    [310, 150], [330, 150], [350, 150],
                    [460, 310], [480, 310], [500, 310],
                    [650, 180], [670, 180], [690, 180]
                  ].map(([vx, vy], idx) => (
                    <g key={idx}>
                      <circle cx={vx} cy={vy} r="5" fill="#f4a261" />
                      <circle cx={vx} cy={vy} r="2" fill="#0c0e12" />
                    </g>
                  ))}

                  {/* IC Footprint: Central MCU STM32H743 */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-105"
                    onClick={() => setActiveComponent('MCU-U1')}
                  >
                    <rect
                      x="350"
                      y="160"
                      width="110"
                      height="110"
                      rx="8"
                      fill="#1e222a"
                      stroke={activeComponent === 'MCU-U1' ? '#f4a261' : '#e07a5f'}
                      strokeWidth="2"
                    />
                    <circle cx="365" cy="175" r="4" fill="#e07a5f" />
                    <text x="405" y="210" fill="#ffffff" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      STM32H7
                    </text>
                    <text x="405" y="228" fill="#e07a5f" fontSize="10" fontFamily="monospace" textAnchor="middle">
                      480MHz Core
                    </text>
                  </g>

                  {/* IC Footprint: Power Management */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setActiveComponent('PWR-U2')}
                  >
                    <rect x="150" y="140" width="70" height="70" rx="6" fill="#1e222a" stroke="#e07a5f" strokeWidth="1.5" />
                    <text x="185" y="175" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      TPS62840
                    </text>
                    <text x="185" y="190" fill="#a0aab8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      3.3V BUCK
                    </text>
                  </g>

                  {/* IC Footprint: CAN Transceiver */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setActiveComponent('CAN-U5')}
                  >
                    <rect x="580" y="260" width="80" height="60" rx="6" fill="#1e222a" stroke="#e07a5f" strokeWidth="1.5" />
                    <text x="620" y="292" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      TCAN1042
                    </text>
                    <text x="620" y="306" fill="#a0aab8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      CAN-FD 5M
                    </text>
                  </g>

                  {/* IC Footprint: NOR Flash Memory */}
                  <g
                    className="cursor-pointer"
                    onClick={() => setActiveComponent('MEM-U4')}
                  >
                    <rect x="560" y="100" width="80" height="55" rx="6" fill="#1e222a" stroke="#e07a5f" strokeWidth="1.5" />
                    <text x="600" y="128" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      W25Q128
                    </text>
                    <text x="600" y="142" fill="#a0aab8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      QSPI FLASH
                    </text>
                  </g>
                </svg>
              </div>

              {/* Bottom active component inspector */}
              <div className="z-10 flex items-center justify-between text-xs font-mono bg-card/80 border border-border/80 px-4 py-2.5 rounded-lg">
                <span className="text-muted-foreground">
                  CLICK CHIP TO INSPECT REGISTERS:
                </span>
                <span className="text-primary font-semibold">
                  {activeComponent
                    ? duality.hardwareSide.components.find(c => c.name === activeComponent)?.label +
                      ' — ' +
                      duality.hardwareSide.components.find(c => c.name === activeComponent)?.desc
                    : 'STM32H743ZI — 480MHz Cortex-M7 with double-precision FPU'}
                </span>
              </div>
            </div>
          </div>

          {/* LAYER 2: The Software Code Editor (Top layer with clip-path) */}
          <div
            className="absolute inset-0 pt-12 bg-card text-foreground overflow-hidden transition-[clip-path] duration-75 ease-out"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
          >
            <div className="relative w-full h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              {/* File Tab */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-md bg-secondary text-primary font-mono text-xs font-medium flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{duality.softwareSide.filename}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground hidden sm:inline">
                    DMA BUFFER: 1024 BYTES • NON-BLOCKING ISR
                  </span>
                </div>
                <span className="font-mono text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  COMPILED // 0 WARNINGS
                </span>
              </div>

              {/* Syntax Highlighted C Code */}
              <div className="font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-foreground/90 py-2">
                <pre className="whitespace-pre">
                  <code>{duality.softwareSide.code}</code>
                </pre>
              </div>

              {/* Bottom Firmware stats */}
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>FLASH: 42.8 KB (2.1%)</span>
                  <span>RAM: 12.4 KB (1.2%)</span>
                </div>
                <span className="text-primary">RTOS: FreeRTOS v10.4</span>
              </div>
            </div>
          </div>

          {/* DRAGGABLE SLIDER DIVIDER BAR */}
          <div
            className="absolute top-12 bottom-0 w-1 bg-primary cursor-ew-resize z-40 transition-[left] duration-75 ease-out flex items-center justify-center shadow-[0_0_15px_rgba(224,122,95,0.8)]"
            style={{ left: `${sliderPos}%` }}
            onPointerDown={handlePointerDown}
          >
            {/* Grab Handle */}
            <div className="w-8 h-8 -translate-x-1/2 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform">
              <Sliders className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Duality description bullets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2.5 mb-2 font-mono text-sm font-semibold text-primary">
              <Cpu className="w-4 h-4" />
              <span>Silicon Awareness</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Deep understanding of DMA controllers, nested vector interrupts, bus contention, and register boundaries.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2.5 mb-2 font-mono text-sm font-semibold text-primary">
              <Zap className="w-4 h-4" />
              <span>Signal Integrity</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Controlled impedance trace calculations, differential pairs, ground return paths, and decoupling capacitor placement.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2.5 mb-2 font-mono text-sm font-semibold text-primary">
              <Code2 className="w-4 h-4" />
              <span>Full-Stack Telemetry</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Edge sensors publish via MQTT TLS or WebSockets to cloud pipelines with sub-second browser visualization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualitySection;
