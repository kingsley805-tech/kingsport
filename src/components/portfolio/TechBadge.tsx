import { motion } from 'framer-motion';

interface TechBadgeProps {
  tech: string;
  index?: number;
}

const techColors: Record<string, string> = {
  react: 'bg-[#61DAFB]/20 text-[#61DAFB] border-[#61DAFB]/30',
  typescript: 'bg-[#3178C6]/20 text-[#3178C6] border-[#3178C6]/30',
  javascript: 'bg-[#F7DF1E]/20 text-[#F7DF1E] border-[#F7DF1E]/30',
  tailwind: 'bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/30',
  tailwindcss: 'bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/30',
  nextjs: 'bg-white/20 text-white border-white/30',
  nodejs: 'bg-[#339933]/20 text-[#339933] border-[#339933]/30',
  supabase: 'bg-[#3ECF8E]/20 text-[#3ECF8E] border-[#3ECF8E]/30',
  laravel: 'bg-[#FF2D20]/20 text-[#FF2D20] border-[#FF2D20]/30',
  php: 'bg-[#777BB4]/20 text-[#777BB4] border-[#777BB4]/30',
  python: 'bg-[#3776AB]/20 text-[#3776AB] border-[#3776AB]/30',
  mongodb: 'bg-[#47A248]/20 text-[#47A248] border-[#47A248]/30',
  postgresql: 'bg-[#4169E1]/20 text-[#4169E1] border-[#4169E1]/30',
  mysql: 'bg-[#4479A1]/20 text-[#4479A1] border-[#4479A1]/30',
  html: 'bg-[#E34F26]/20 text-[#E34F26] border-[#E34F26]/30',
  html5: 'bg-[#E34F26]/20 text-[#E34F26] border-[#E34F26]/30',
  css: 'bg-[#1572B6]/20 text-[#1572B6] border-[#1572B6]/30',
  css3: 'bg-[#1572B6]/20 text-[#1572B6] border-[#1572B6]/30',
  git: 'bg-[#F05032]/20 text-[#F05032] border-[#F05032]/30',
  figma: 'bg-[#F24E1E]/20 text-[#F24E1E] border-[#F24E1E]/30',
  wordpress: 'bg-[#21759B]/20 text-[#21759B] border-[#21759B]/30',
  bootstrap: 'bg-[#7952B3]/20 text-[#7952B3] border-[#7952B3]/30',
  expressjs: 'bg-white/20 text-white border-white/30',
  'react-native': 'bg-[#61DAFB]/20 text-[#61DAFB] border-[#61DAFB]/30',
  'material-ui': 'bg-[#0081CB]/20 text-[#0081CB] border-[#0081CB]/30',
};

export default function TechBadge({ tech, index = 0 }: TechBadgeProps) {
  const normalizedTech = tech?.toLowerCase().replace(/\s+/g, '') || '';
  const colorClass = techColors[normalizedTech] || 'bg-primary/20 text-primary border-primary/30';

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colorClass} transition-all cursor-default`}
    >
      {tech}
    </motion.span>
  );
}
