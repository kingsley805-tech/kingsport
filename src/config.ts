/**
 * Portfolio Configuration File
 * -------------------------------------------------------------
 * Edit your personal information, links, bios, skills, and settings
 * in this single file to personalize the entire website.
 */

export interface ProjectOverride {
  name: string;
  category?: 'hardware' | 'software';
  featured?: boolean;
  schematicUrl?: string;
  demoUrl?: string;
  tags?: string[];
  customDescription?: string;
}

export const PORTFOLIO_CONFIG = {
  // Personal Info
  name: "Kingsley Atta Yeboah",
  shortName: "Kingsley",
  title: "Software & Hardware Engineer",
  subtitle: "Embedded Systems • IoT Architecture • High-Speed PCB • Full-Stack Cloud",
  location: "Accra, Ghana (Available Worldwide / Remote)",
  timezone: "Africa/Accra", // UTC+0

  // GitHub Settings
  // Change to your actual GitHub username to pull your live repos, or keep as default
  githubUsername: "kingsley805-tech",
  
  // Contact & Socials
  email: "kingsleyattayeboah@gmail.com",
  socials: {
    github: "https://github.com/kingsley805-tech",
    linkedin: "https://linkedin.com/in/kingsley-atta-yeboah",
    twitter: "https://x.com/kingsley_tech",
    discord: "https://discord.gg/engineer",
    resume: "/resume.pdf"
  },

  // Short Bio (2-3 sentences)
  bio: "Bridging the physical and digital divide. I architect low-power embedded firmware, multi-layer PCBs, and fault-tolerant distributed cloud backends with zero-tolerance reliability and craft-level aesthetics.",
  
  // Extended Bio paragraphs for About Section
  about: {
    lead: "I operate at the intersection of atoms and bits — from microvolts across silicon pads to sub-millisecond API latencies.",
    paragraphs: [
      "With a background spanning embedded microcontrollers (STM32, ESP32, nRF52) and production web platforms, I understand how hardware constraints dictate software architectures, and how elegant software unleashes silicon capabilities.",
      "Whether routing controlled-impedance RF traces in KiCad, writing deterministically timed C/C++ firmware on FreeRTOS, or spinning up reactive web control dashboards in React and TypeScript, I build end-to-end systems that feel solid and alive."
    ],
    stats: [
      { label: "Hardware Boards Shipped", value: "35+" },
      { label: "Lines of Firmware & C++", value: "120k+" },
      { label: "Production Web Apps", value: "24+" },
      { label: "System Reliability Target", value: "99.99%" },
    ]
  },

  // Skills Breakdown (Hardware & Software)
  skills: {
    hardware: [
      { name: "STM32 (ARM Cortex-M)", level: 95, category: "MCU" },
      { name: "ESP32 / ESP-IDF", level: 92, category: "IoT" },
      { name: "KiCad & Altium Designer", level: 90, category: "EDA / PCB" },
      { name: "FreeRTOS & Zephyr", level: 88, category: "RTOS" },
      { name: "I2C, SPI, UART, CAN Bus", level: 96, category: "Protocols" },
      { name: "High-Speed & RF Routing", level: 84, category: "PCB Design" },
      { name: "Raspberry Pi & Embedded Linux", level: 86, category: "SBC" },
      { name: "Logic Analyzers & DSO Debugging", level: 92, category: "Testing" },
      { name: "Fusion 360 (CAD/Enclosures)", level: 80, category: "Mechanics" },
      { name: "SMD Soldering & Rework (0402 / QFN)", level: 88, category: "Assembly" },
    ],
    software: [
      { name: "C / C++ (C11 / C++20)", level: 94, category: "Systems" },
      { name: "TypeScript & JavaScript", level: 95, category: "Web" },
      { name: "React, Next.js & Vite", level: 92, category: "Frontend" },
      { name: "Node.js & Python", level: 90, category: "Backend" },
      { name: "Three.js & WebGL Shaders", level: 85, category: "Creative 3D" },
      { name: "PostgreSQL & Supabase", level: 88, category: "Database" },
      { name: "Docker & Linux Systems", level: 87, category: "DevOps" },
      { name: "MQTT, WebSockets, gRPC", level: 91, category: "Telemetry" },
      { name: "TailwindCSS & Design Systems", level: 94, category: "UI/UX" },
      { name: "Git & Hardware CI Pipelines", level: 90, category: "Workflow" }
    ]
  },

  // Experience Timeline
  experience: [
    {
      period: "2024 — Present",
      role: "Lead Embedded & Systems Engineer",
      company: "AeroPulse Technologies",
      badge: "Full-Time",
      description: "Leading IoT telemetry and custom PCB development for autonomous sensor nodes. Designed ultra-low power ESP32/STM32 boards with solar harvesting and LTE-M fallback. Built real-time edge telemetry ingest pipelines.",
      technologies: ["STM32", "KiCad", "FreeRTOS", "React", "Node.js", "MQTT", "AWS IoT"]
    },
    {
      period: "2023 — 2024",
      role: "Full-Stack Software Engineer",
      company: "Nexus Grid Labs",
      badge: "Hybrid",
      description: "Architected distributed monitoring dashboards and industrial equipment control interfaces. Authored WebGL data visualizers and WebAssembly drivers for real-time sensor waveform analysis.",
      technologies: ["TypeScript", "Next.js", "Three.js", "Docker", "PostgreSQL", "C++ WASM"]
    },
    {
      period: "2022 — 2023",
      role: "Firmware & Hardware Engineer",
      company: "K-Tronix Embedded Solutions",
      badge: "Consulting",
      description: "Engineered customized microcontroller boards, firmware drivers for CAN bus vehicle telemetry, and conducted signal integrity validation and EMC pre-compliance testing.",
      technologies: ["Altium", "C / C++", "CAN Bus", "Oscilloscopes", "Python Test Automation"]
    },
    {
      period: "2021 — 2022",
      role: "Junior Network & Hardware Systems Specialist",
      company: "Crown Enterprise Systems",
      badge: "Apprenticeship",
      description: "Deployed managed switch infrastructures, server racks, and embedded environmental monitoring appliances across enterprise data centers.",
      technologies: ["Linux", "Embedded Linux", "Bash", "Network Topology", "Cisco CLI"]
    }
  ],

  // Interactive Duality Showcase Data
  duality: {
    title: "Hardware / Software Duality",
    subtitle: "From silicon registers to reactive web threads",
    softwareSide: {
      filename: "stm32_telemetry_driver.c",
      language: "c",
      code: `/* ==============================================================
 * STM32H7 Core: Real-Time Sensor Ingest & DMA Pipeline
 * Hardware Interface: SPI2 Bus (Burst 10MHz DMA Stream)
 * ============================================================== */
#include "stm32h7xx_hal.h"
#include "telemetry_engine.h"

#define BUFFER_SIZE     1024
#define SENSOR_CS_PIN   GPIO_PIN_12
#define SENSOR_CS_PORT  GPIOB

static uint8_t  dma_rx_buffer[BUFFER_SIZE] __attribute__((section(".dma_ram")));
static volatile bool frame_ready = false;

void HAL_SPI_RxCpltCallback(SPI_HandleTypeDef *hspi) {
    if (hspi->Instance == SPI2) {
        // Assert chip select high immediately after burst transfer
        HAL_GPIO_WritePin(SENSOR_CS_PORT, SENSOR_CS_PIN, GPIO_PIN_SET);
        frame_ready = true;
        
        // Notify real-time FreeRTOS dispatcher task from ISR
        BaseType_t xHigherPriorityTaskWoken = pdFALSE;
        vTaskNotifyGiveFromISR(telemetryTaskHandle, &xHigherPriorityTaskWoken);
        portYIELD_FROM_ISR(xHigherPriorityTaskWoken);
    }
}

void Sensor_StartTelemetryBurst(void) {
    HAL_GPIO_WritePin(SENSOR_CS_PORT, SENSOR_CS_PIN, GPIO_PIN_RESET);
    HAL_SPI_Receive_DMA(&hspi2, dma_rx_buffer, BUFFER_SIZE);
}`
    },
    hardwareSide: {
      schematicName: "PCB Layout: Main Controller Rev 3.2",
      boardSpecs: "4-Layer FR-4 • 1.6mm • ENIG Finish • Controlled Impedance 50Ω",
      components: [
        { name: "MCU-U1", label: "STM32H743ZI", desc: "480MHz Cortex-M7 with double-precision FPU", coords: [48, 45] },
        { name: "PWR-U2", label: "TPS62840", desc: "Ultra-low Iq 60nA Buck Converter (3.3V)", coords: [22, 28] },
        { name: "COM-U3", label: "W5500 / ESP32-C3", desc: "Hardware TCP/IP & Wi-Fi/BLE Mesh Bridge", coords: [78, 32] },
        { name: "MEM-U4", label: "W25Q128JV", desc: "128Mb QSPI High-Speed NOR Flash for logs", coords: [32, 70] },
        { name: "CAN-U5", label: "TCAN1042", desc: "Automotive 5Mbps Fault-Tolerant CAN-FD", coords: [72, 75] },
      ]
    }
  },

  // Boot terminal sequence lines
  bootSequence: [
    "BOOT: Initializing portfolio.sys v4.2.0 [ARCH: ARM64+RISC-V]",
    "HAL: Probing bus devices... I2C1 [0x68 IMU], SPI2 [FLASH 16MB], CAN0 [500kbps]",
    "POWER: Rail voltages stabilized: 3V3=3.302V, 1V8=1.801V, VCORE=1.200V",
    "PHYSICS: Zero-gravity inertia engine online [FLOAT_BIAS: -0.002g]",
    "GITHUB: Syncing live public repositories & commit telemetry...",
    "READY: Welcome to the workstation. All traces energized."
  ],

  // Fallback / Showcase projects in case GitHub API rate limits or offline
  fallbackProjects: [
    {
      id: 901,
      name: "aeropulse-avionics-node",
      description: "Ultra-compact flight sensor node with dual-band GNSS, 9-DOF IMU, SD card blackbox, and low-latency LoRaWAN telemetry. Custom 4-layer KiCad PCB.",
      language: "C++",
      stargazers_count: 84,
      forks_count: 14,
      pushed_at: new Date(Date.now() - 3600000 * 12).toISOString(),
      topics: ["embedded", "stm32", "pcb", "kicad", "lora", "sensors", "hardware"],
      html_url: "https://github.com/kingsley805-tech/aeropulse-avionics-node",
      homepage: "https://aeropulse-demo.vercel.app",
      category: "hardware",
      isHardware: true
    },
    {
      id: 902,
      name: "flux-oscilloscope-webgl",
      description: "Real-time USB oscilloscope & logic analyzer web frontend. Streams 1MSps raw ADC samples via WebUSB / WebSerial rendered at 120 FPS using Three.js and WebGL compute shaders.",
      language: "TypeScript",
      stargazers_count: 142,
      forks_count: 28,
      pushed_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      topics: ["threejs", "webusb", "webserial", "oscilloscope", "webgl", "dsp"],
      html_url: "https://github.com/kingsley805-tech/flux-oscilloscope-webgl",
      homepage: "https://flux-scope.vercel.app",
      category: "software",
      isHardware: false
    },
    {
      id: 903,
      name: "nanogrid-solar-bms",
      description: "Smart 4S LiFePO4 Battery Management System with active cell balancing, CAN-FD bus, and an integrated thermal safety interlock. Designed in Altium Designer.",
      language: "C",
      stargazers_count: 67,
      forks_count: 12,
      pushed_at: new Date(Date.now() - 86400000 * 4).toISOString(),
      topics: ["bms", "battery", "hardware", "kicad", "altium", "can-bus", "firmware"],
      html_url: "https://github.com/kingsley805-tech/nanogrid-solar-bms",
      homepage: "",
      category: "hardware",
      isHardware: true
    },
    {
      id: 904,
      name: "synapse-mesh-gateway",
      description: "High-density ESP32 Wi-Fi & BLE gateway connecting up to 128 sensor nodes over ESP-NOW, publishing via MQTT TLS to AWS IoT Core with zero packet loss.",
      language: "C",
      stargazers_count: 53,
      forks_count: 9,
      pushed_at: new Date(Date.now() - 86400000 * 7).toISOString(),
      topics: ["esp32", "esp-now", "iot", "mqtt", "freertos", "firmware"],
      html_url: "https://github.com/kingsley805-tech/synapse-mesh-gateway",
      homepage: "",
      category: "hardware",
      isHardware: true
    },
    {
      id: 905,
      name: "zero-gravity-cad-viewer",
      description: "Browser-based 3D STEP & Gerber viewer for KiCad & Fusion 360 exports. Inspect PCB traces, drill holes, copper clearance and 3D component models directly in browser.",
      language: "TypeScript",
      stargazers_count: 118,
      forks_count: 19,
      pushed_at: new Date(Date.now() - 86400000 * 11).toISOString(),
      topics: ["threejs", "cad", "gerber", "pcb", "webgl", "kicad"],
      html_url: "https://github.com/kingsley805-tech/zero-gravity-cad-viewer",
      homepage: "https://zerog-cad.vercel.app",
      category: "software",
      isHardware: false
    },
    {
      id: 906,
      name: "antigravity-kernel-mon",
      description: "Linux eBPF kernel event monitor and real-time TCP socket latency profiler with a sleek terminal TUI and high-throughput Prometheus exporter.",
      language: "Rust",
      stargazers_count: 91,
      forks_count: 15,
      pushed_at: new Date(Date.now() - 86400000 * 18).toISOString(),
      topics: ["rust", "ebpf", "linux", "systems", "networking", "telemetry"],
      html_url: "https://github.com/kingsley805-tech/antigravity-kernel-mon",
      homepage: "",
      category: "software",
      isHardware: false
    }
  ]
};

export default PORTFOLIO_CONFIG;
