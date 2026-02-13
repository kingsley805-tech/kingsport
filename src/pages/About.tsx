import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface TerminalWindowProps {
  children: React.ReactNode;
  delay?: number;
}

const TerminalWindow = ({ children, delay = 0 }: TerminalWindowProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="rounded-lg overflow-hidden bg-[#1e1e1e] border border-[#333] shadow-xl"
  >
    <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-[#333]">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
    </div>
    <div className="p-6 font-mono text-sm leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const TerminalLine = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-2">{children}</div>
);

const Prompt = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#9d7cd8]">{children}</span>
);

const Command = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#e0e0e0]"> {children}</span>
);

const Branch = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#7dcfff]">{children}</span>
);

const Output = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#e0af68]">{children}</span>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#73daca]">{children}</span>
);

// Fallback data
const defaultBio = "Hello! I'm Kingsley. I'm a software engineer. I studied CompSci at University of the people, I enjoy long walks on the beach, and I believe artificial intelligence will inevitably rule us all one day. You should hire me!";
const defaultFrontend = ['javascript', 'react', 'Typescript', 'Nextjs', 'git', 'github', 'bootstrap', 'html5', 'css3', 'figma', 'tailwindcss', 'React-Native', 'Wordpress', 'Material-UI'];
const defaultBackend = ['nodejs', 'Expressjs', 'Postgresql', 'Mysql', 'MongoDB', 'python', 'PHP', 'Laravel'];
const defaultHobbies = [
  { emoji: '📖', label: 'reading' },
  { emoji: '🎭', label: 'theater' },
  { emoji: '🎥', label: 'movies' },
  { emoji: '🌶', label: 'cooking' },
];

export default function About() {
  const { data: sections, isLoading } = useQuery({
    queryKey: ['about_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const bioSection = sections?.find(s => s.section_key === 'bio');
  const skillsSection = sections?.find(s => s.section_key === 'skills');
  const hobbiesSection = sections?.find(s => s.section_key === 'hobbies');

  const bio = (bioSection?.content as any)?.text ?? defaultBio;
  const frontendSkills: string[] = (skillsSection?.content as any)?.frontend ?? defaultFrontend;
  const backendSkills: string[] = (skillsSection?.content as any)?.backend ?? defaultBackend;
  
  const hobbiesRaw = (hobbiesSection?.content as any)?.items;
  const hobbies: { emoji: string; label: string }[] = Array.isArray(hobbiesRaw)
    ? hobbiesRaw.map((h: any) => typeof h === 'string' ? { emoji: '•', label: h } : h)
    : defaultHobbies;

  if (isLoading) {
    return (
      <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-6rem)] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-6">
        {/* About Me Terminal */}
        <TerminalWindow delay={0}>
          <TerminalLine>
            <Prompt>kingsleyyeboah $</Prompt>
            <Command>cat aboutkingsley</Command>
          </TerminalLine>
          <TerminalLine>
            <Branch>aboutkingsley (main) $</Branch>
          </TerminalLine>
          <div className="mt-4 pl-0 text-[#c0c0c0] leading-relaxed">
            <Output>{bio}</Output>
          </div>
        </TerminalWindow>

        {/* Skills Terminal */}
        <TerminalWindow delay={0.15}>
          <TerminalLine>
            <Prompt>kingsleyyeboah $</Prompt>
            <Command>cd skills/tools</Command>
          </TerminalLine>
          <TerminalLine>
            <Branch>skills/tools (main) $</Branch>
            <Command>ls</Command>
          </TerminalLine>
          
          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-3">
                <SectionLabel>Proficient FrontEnd With</SectionLabel>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {frontendSkills.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#a0a0a0] hover:text-[#9d7cd8] transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3">
                <SectionLabel>Proficient Backend With</SectionLabel>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {backendSkills.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-[#a0a0a0] hover:text-[#9d7cd8] transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </TerminalWindow>

        {/* Hobbies Terminal */}
        <TerminalWindow delay={0.3}>
          <TerminalLine>
            <Prompt>kingsleyyeboah $</Prompt>
            <Command>cd hobbies/interests</Command>
          </TerminalLine>
          <TerminalLine>
            <Branch>hobbies/interests (main) $</Branch>
            <Command>ls</Command>
          </TerminalLine>
          
          <div className="mt-4 flex flex-wrap gap-4">
            {hobbies.map(({ emoji, label }, index) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-[#a0a0a0] hover:text-white transition-colors cursor-default"
              >
                {emoji} {label}
              </motion.span>
            ))}
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
