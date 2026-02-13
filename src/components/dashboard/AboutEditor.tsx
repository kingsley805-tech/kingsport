import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X, User, Code, Gamepad2, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AboutSection {
  id: string;
  section_key: string;
  content: Record<string, any>;
  updated_at: string;
}

export default function AboutEditor() {
  const queryClient = useQueryClient();

  const { data: sections, isLoading } = useQuery({
    queryKey: ['about_content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*');
      if (error) throw error;
      return data as AboutSection[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ section_key, content }: { section_key: string; content: Record<string, any> }) => {
      const { error } = await supabase
        .from('about_content')
        .update({ content })
        .eq('section_key', section_key);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about_content'] });
      toast.success('About section updated!');
    },
    onError: (error) => {
      toast.error('Failed to update: ' + error.message);
    },
  });

  const bioSection = sections?.find(s => s.section_key === 'bio');
  const skillsSection = sections?.find(s => s.section_key === 'skills');
  const hobbiesSection = sections?.find(s => s.section_key === 'hobbies');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BioEditor
        bio={bioSection?.content as { text?: string; mini_bio?: string } | undefined}
        onSave={(content) => updateMutation.mutate({ section_key: 'bio', content })}
        isSaving={updateMutation.isPending}
      />
      <SkillsEditor
        skills={skillsSection?.content as { frontend?: string[]; backend?: string[] } | undefined}
        onSave={(content) => updateMutation.mutate({ section_key: 'skills', content })}
        isSaving={updateMutation.isPending}
      />
      <HobbiesEditor
        hobbies={(hobbiesSection?.content as { items?: { emoji: string; label: string }[] })?.items ?? []}
        onSave={(items) => updateMutation.mutate({ section_key: 'hobbies', content: { items } })}
        isSaving={updateMutation.isPending}
      />
    </div>
  );
}

function BioEditor({
  bio,
  onSave,
  isSaving,
}: {
  bio?: { text?: string; mini_bio?: string };
  onSave: (content: { text: string; mini_bio: string }) => void;
  isSaving: boolean;
}) {
  const [text, setText] = useState(bio?.text ?? '');
  const [miniBio, setMiniBio] = useState(bio?.mini_bio ?? '');

  useEffect(() => {
    if (bio) {
      setText(bio.text ?? '');
      setMiniBio(bio.mini_bio ?? '');
    }
  }, [bio]);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <User size={18} className="text-primary" />
        <h3 className="font-semibold text-lg">Bio</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Mini Bio</label>
          <input
            type="text"
            value={miniBio}
            onChange={(e) => setMiniBio(e.target.value)}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            placeholder="A short tagline about yourself"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Full Bio</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            placeholder="Tell the world about yourself..."
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSave({ text, mini_bio: miniBio })}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          Save Bio
        </motion.button>
      </div>
    </div>
  );
}

function SkillsEditor({
  skills,
  onSave,
  isSaving,
}: {
  skills?: { frontend?: string[]; backend?: string[] };
  onSave: (content: { frontend: string[]; backend: string[] }) => void;
  isSaving: boolean;
}) {
  const [frontend, setFrontend] = useState<string[]>(skills?.frontend ?? []);
  const [backend, setBackend] = useState<string[]>(skills?.backend ?? []);
  const [newFrontend, setNewFrontend] = useState('');
  const [newBackend, setNewBackend] = useState('');

  useEffect(() => {
    if (skills) {
      setFrontend(skills.frontend ?? []);
      setBackend(skills.backend ?? []);
    }
  }, [skills]);

  const addSkill = (type: 'frontend' | 'backend') => {
    if (type === 'frontend') {
      const trimmed = newFrontend.trim();
      if (trimmed && !frontend.includes(trimmed)) {
        setFrontend([...frontend, trimmed]);
        setNewFrontend('');
      }
    } else {
      const trimmed = newBackend.trim();
      if (trimmed && !backend.includes(trimmed)) {
        setBackend([...backend, trimmed]);
        setNewBackend('');
      }
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Code size={18} className="text-primary" />
        <h3 className="font-semibold text-lg">Skills</h3>
      </div>
      <div className="space-y-6">
        {/* Frontend */}
        <div>
          <label className="block text-sm font-medium mb-2">Frontend Skills</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newFrontend}
              onChange={(e) => setNewFrontend(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('frontend'))}
              placeholder="Add frontend skill..."
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              onClick={() => addSkill('frontend')}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {frontend.map((item) => (
              <span key={item} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {item}
                <button onClick={() => setFrontend(frontend.filter(i => i !== item))} className="hover:text-destructive transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div>
          <label className="block text-sm font-medium mb-2">Backend Skills</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newBackend}
              onChange={(e) => setNewBackend(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('backend'))}
              placeholder="Add backend skill..."
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              onClick={() => addSkill('backend')}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {backend.map((item) => (
              <span key={item} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {item}
                <button onClick={() => setBackend(backend.filter(i => i !== item))} className="hover:text-destructive transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSave({ frontend, backend })}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          Save Skills
        </motion.button>
      </div>
    </div>
  );
}

function HobbiesEditor({
  hobbies: initialHobbies,
  onSave,
  isSaving,
}: {
  hobbies: { emoji: string; label: string }[];
  onSave: (items: { emoji: string; label: string }[]) => void;
  isSaving: boolean;
}) {
  const [hobbies, setHobbies] = useState(initialHobbies);
  const [newEmoji, setNewEmoji] = useState('');
  const [newLabel, setNewLabel] = useState('');

  useEffect(() => {
    setHobbies(initialHobbies);
  }, [initialHobbies]);

  const addHobby = () => {
    const emoji = newEmoji.trim() || '•';
    const label = newLabel.trim();
    if (label && !hobbies.some(h => h.label === label)) {
      setHobbies([...hobbies, { emoji, label }]);
      setNewEmoji('');
      setNewLabel('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Gamepad2 size={18} className="text-primary" />
        <h3 className="font-semibold text-lg">Hobbies</h3>
      </div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
          placeholder="🎮"
          className="w-16 px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-center"
        />
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
          placeholder="Add hobby..."
          className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        <button
          onClick={addHobby}
          className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {hobbies.map((hobby) => (
          <span
            key={hobby.label}
            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            {hobby.emoji} {hobby.label}
            <button onClick={() => setHobbies(hobbies.filter(h => h.label !== hobby.label))} className="hover:text-destructive transition-colors">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSave(hobbies)}
        disabled={isSaving}
        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Save size={16} />
        Save Hobbies
      </motion.button>
    </div>
  );
}
