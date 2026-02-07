import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, AlertCircle } from 'lucide-react';

interface ProjectPreviewProps {
  liveUrl: string;
  title: string;
  thumbnailUrl?: string;
}

export default function ProjectPreview({ liveUrl, title, thumbnailUrl }: ProjectPreviewProps) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIsLoading(false);
  };

  // Check if URL might block iframe embedding
  const mightBlockIframe = () => {
    try {
      const url = new URL(liveUrl);
      // Common sites that block iframe embedding
      const blockedDomains = ['github.com', 'twitter.com', 'facebook.com', 'linkedin.com'];
      return blockedDomains.some(domain => url.hostname.includes(domain));
    } catch {
      return true;
    }
  };

  if (!liveUrl || mightBlockIframe() || iframeError) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 group">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
            <AlertCircle size={48} className="mb-2 opacity-50" />
            <p className="text-sm">Preview not available</p>
          </div>
        )}
        
        {/* Overlay with button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6"
        >
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ExternalLink size={16} />
            Open Live Preview
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted group">
      {isLoading && (
        <div className="absolute inset-0 skeleton" />
      )}
      
      <iframe
        ref={iframeRef}
        src={liveUrl}
        title={title}
        className="w-full h-full border-0"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />
      
      {/* Overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <ExternalLink size={18} />
          Open in New Tab
        </a>
      </motion.div>
    </div>
  );
}
