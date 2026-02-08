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

const TerminalWindow = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="terminal"
  >
    <div className="terminal-header">
      <div className="terminal-dot bg-red-500" />
      <div className="terminal-dot bg-yellow-500" />
      <div className="terminal-dot bg-green-500" />
    </div>
    <div className="terminal-body">{children}</div>
  </motion.div>
);

export default function About() {
  return (
    <section className="min-h-[calc(100vh-8rem)] py-24">
      <div className="container mx-auto px-6 max-w-4xl space-y-8">
        {/* About terminal */}
        <TerminalWindow>
          <div className="space-y-4">
            <p>
              <span className="terminal-prompt">kingsleyyeboah $</span> cat aboutkingsley
            </p>
            <p>
              <span className="terminal-branch">aboutkingsley (main) $</span>{' '}
              <span className="terminal-output">
                Hello! I'm Kingsley. I'm a software engineer. I studied CompSci at University of the people, 
                I enjoy long walks on the beach, and I believe artificial intelligence will inevitably rule us all one day. 
                You should hire me!
              </span>
            </p>
          </div>
        </TerminalWindow>

        {/* Skills terminal */}
        <TerminalWindow delay={0.2}>
          <div className="space-y-6">
            <p>
              <span className="terminal-prompt">kingsleyyeboah $</span> cd skills/tools
            </p>
            <p>
              <span className="terminal-branch">skills/tools (main) $</span> ls
            </p>
            
            <div>
              <p className="terminal-prompt mb-3">proficient FrontEnd With</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {frontendSkills.map((skill) => (
                  <span key={skill} className="text-muted-foreground">{skill}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="terminal-prompt mb-3">proficient Backend With</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {backendSkills.map((skill) => (
                  <span key={skill} className="text-muted-foreground">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </TerminalWindow>

        {/* Hobbies terminal */}
        <TerminalWindow delay={0.4}>
          <div className="space-y-4">
            <p>
              <span className="terminal-prompt">kingsleyyeboah $</span> cd hobbies/interests
            </p>
            <p>
              <span className="terminal-branch">hobbies/interests (main) $</span> ls
            </p>
            <div className="flex flex-wrap gap-4">
              {hobbies.map(({ emoji, label }) => (
                <span key={label} className="text-muted-foreground">
                  {emoji} {label}
                </span>
              ))}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
