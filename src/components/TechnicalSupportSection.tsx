import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_CONFIG } from '../config';
import {
  Wrench,
  Wifi,
  MonitorCheck,
  ServerCog,
  ShieldAlert,
  Headphones,
  Satellite,
  Network,
  CheckCircle2
} from 'lucide-react';

const SUPPORT_ICONS = [
  Wrench,
  Wifi,
  MonitorCheck,
  ServerCog,
  ShieldAlert,
  Headphones
];

const NETWORKING_TOOLKIT = [
  { name: 'Cisco IOS', role: 'Routing, switching, VLANs & enterprise LAN architecture' },
  { name: 'Wireshark', role: 'Packet-level inspection & connectivity troubleshooting' },
  { name: 'MikroTik', role: 'RouterOS management, bandwidth shaping & ISP hotspots' },
  { name: 'pfSense', role: 'Firewall rules, VPN access & network segmentation' },
  { name: 'Ubiquiti UniFi', role: 'Multi-building Wi-Fi access point deployment & monitoring' },
  { name: 'Starlink Systems', role: 'Dish alignment, enterprise firewalling & link optimization' }
];

export const TechnicalSupportSection: React.FC = () => {
  return (
    <section
      id="technical-support"
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-border/60 bg-background overflow-hidden"
    >
      {/* Subtle Ambient Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 w-96 h-96 rounded-full bg-cyan-500/8 blur-[120px]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-500 font-semibold">
              IT Operations &amp; Field Infrastructure
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Technical Support &amp; Systems Reliability
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Beyond writing code, I diagnose hardware and operating system faults, administer servers and user access, resolve connectivity bottlenecks, and deploy resilient enterprise and ISP networks.
          </p>
        </div>

        {/* 6 Core Technical Support Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PORTFOLIO_CONFIG.supportHighlights.map((item, idx) => {
            const Icon = SUPPORT_ICONS[idx % SUPPORT_ICONS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-500 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Field Infrastructure Engagements + Networking Toolkit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Verified Field Projects Highlight */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm space-y-5">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-500 font-semibold">
              <Satellite className="w-4 h-4" />
              <span>Verified Network &amp; IT Support Deployments</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/45 border border-border/70">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">
                    Department of Feeder Roads — Starlink Network Setup &amp; Support
                  </h4>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                    Enterprise Satellite
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Executed site assessment, Starlink dish installation and alignment, router and firewall configuration, LAN/Wi-Fi deployment, throughput optimization, and ongoing technical support.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-secondary/45 border border-border/70">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">
                    Student Hostels — High-Speed ISP Network Infrastructure
                  </h4>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                    Multi-Building ISP
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Designed and implemented structured cabling, router and managed switch configuration, wireless access point rollouts, bandwidth monitoring, and proactive fault resolution across multiple residential blocks.
                </p>
              </div>
            </div>
          </div>

          {/* Networking & Diagnostics Toolkit */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-semibold mb-4">
                <Network className="w-4 h-4" />
                <span>Networking &amp; Diagnostic Stack</span>
              </div>
              <div className="space-y-3">
                {NETWORKING_TOOLKIT.map(tool => (
                  <div key={tool.name} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-foreground">{tool.name}</span>
                      <span className="text-xs text-muted-foreground"> — {tool.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/70 font-mono text-[11px] text-muted-foreground">
              Certified: Google IT Support • Systems Admin &amp; IT Infrastructure • Computer Networking
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSupportSection;

