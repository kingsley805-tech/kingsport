import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const tools = [
  {
    name: 'Cisco IOS',
    description: 'Enterprise router and switch configuration, VLAN setup, and routing protocols (OSPF, EIGRP, BGP).',
    url: 'https://www.cisco.com',
  },
  {
    name: 'Wireshark',
    description: 'Deep packet inspection, protocol analysis, and network troubleshooting for complex environments.',
    url: 'https://www.wireshark.org',
  },
  {
    name: 'MikroTik',
    description: 'RouterOS configuration, hotspot management, bandwidth shaping, and wireless deployments.',
    url: 'https://mikrotik.com',
  },
  {
    name: 'pfSense',
    description: 'Firewall configuration, VPN setup, intrusion detection, and network segmentation.',
    url: 'https://www.pfsense.org',
  },
  {
    name: 'Nmap',
    description: 'Network discovery, security auditing, port scanning, and vulnerability assessment.',
    url: 'https://nmap.org',
  },
  {
    name: 'Ubiquiti',
    description: 'UniFi network deployments, access point management, and enterprise Wi-Fi solutions.',
    url: 'https://www.ui.com',
  },
];

const NetworkingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    const cards = sectionRef.current?.querySelectorAll('.reveal');
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="networking" ref={sectionRef} className="section-padding max-w-7xl mx-auto">
      <p className="text-primary font-display text-sm tracking-[0.2em] uppercase mb-2">Networking</p>
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-16">
        Network <span className="gradient-text-amber">Expertise</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <div
            key={tool.name}
            className="reveal opacity-0 glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-500 group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 text-primary font-display font-bold text-sm">
              {tool.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{tool.description}</p>
            {tool.url && (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ExternalLink size={12} /> Learn more
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NetworkingSection;
