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
      <ListEditor
        title="Skills"
        icon={<Code size={18} />}
        items={(skillsSection?.content as { items?: string[] })?.items ?? []}
        onSave={(items) => updateMutation.mutate({ section_key: 'skills', content: { items } })}
        isSaving={updateMutation.isPending}
      />
      <ListEditor
        title="Hobbies"
        icon={<Gamepad2 size={18} />}
        items={(hobbiesSection?.content as { items?: string[] })?.items ?? []}
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

function ListEditor({
  title,
  icon,
  items: initialItems,
  onSave,
  isSaving,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  onSave: (items: string[]) => void;
  isSaving: boolean;
}) {
  const [items, setItems] = useState<string[]>(initialItems);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const addItem = () => {
    const trimmed = newItem.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed]);
      setNewItem('');
    }
  };

  const removeItem = (item: string) => {
    setItems(items.filter(i => i !== item));
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-primary">{icon}</span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          placeholder={`Add ${title.toLowerCase()}...`}
          className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        <button
          onClick={addItem}
          className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            {item}
            <button onClick={() => removeItem(item)} className="hover:text-destructive transition-colors">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSave(items)}
        disabled={isSaving}
        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        <Save size={16} />
        Save {title}
      </motion.button>
    </div>
  );
}
