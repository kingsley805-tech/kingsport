import { motion } from 'framer-motion';

const frontendSkills = [
  'javascript', 'react', 'Typescript', 'Nextjs', 'git', 'github',
  'bootstrap', 'html5', 'css3', 'figma', 'tailwindcss', 'React-Native',
  'Wordpress', 'Material-UI'
];

const backendSkills = [
  'nodejs', 'Expressjs', 'Postgresql', 'Mysql', 'MongoDB', 'python', 'PHP', 'Laravel'
];

const hobbies = [
  { emoji: '📖', label: 'reading' },
  { emoji: '🎭', label: 'theater' },
  { emoji: '🎥', label: 'movies' },
  { emoji: '🌶', label: 'cooking' },
];

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
    {/* Terminal Header */}
    <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-[#333]">
      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
    </div>
    {/* Terminal Body */}
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

export default function About() {
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
            <Output>
              Hello! I'm Kingsley. I'm a software engineer. I studied CompSci at University of the people, 
              I enjoy long walks on the beach, and I believe artificial intelligence will inevitably rule us all one day. 
              You should hire me!
            </Output>
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
            {/* Frontend Skills */}
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

            {/* Backend Skills */}
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
