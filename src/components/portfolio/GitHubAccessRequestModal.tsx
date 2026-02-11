import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Github, Mail, User, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GitHubAccessRequestModalProps {
  projectId?: string;
  projectTitle?: string;
  requestType: 'project_code' | 'github_profile';
  onClose: () => void;
}

export default function GitHubAccessRequestModal({
  projectId,
  projectTitle,
  requestType,
  onClose,
}: GitHubAccessRequestModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length > 100) {
      toast.error('Please enter a valid name (max 100 characters)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()) || email.trim().length > 255) {
      toast.error('Please enter a valid email');
      return;
    }

    if (message.trim().length > 500) {
      toast.error('Message must be under 500 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('github_access_requests')
        .insert({
          requester_name: name.trim(),
          requester_email: email.trim(),
          project_id: projectId ?? null,
          request_type: requestType,
          message: message.trim() || null,
        });

      if (error) throw error;

      // Notify admin via edge function
      await supabase.functions.invoke('notify-access-request', {
        body: {
          requester_name: name.trim(),
          requester_email: email.trim(),
          project_title: projectTitle ?? 'GitHub Profile',
          request_type: requestType,
        },
      });

      toast.success('Request sent! The owner will review it shortly.');
      onClose();
    } catch (err: any) {
      toast.error('Failed to submit request: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Github size={20} className="text-primary" />
            <h2 className="text-lg font-bold">Request Access</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            {requestType === 'github_profile'
              ? 'Request access to view the GitHub profile.'
              : `Request access to view the source code for "${projectTitle}".`}
          </p>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <User size={14} /> Your Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Mail size={14} /> Your Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <MessageSquare size={14} /> Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Why would you like access?"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                'Send Request'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
