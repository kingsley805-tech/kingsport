import React, { useEffect, useState } from 'react';
import { getStoredGitHubToken, setStoredGitHubToken } from '../lib/github';
import {
  X,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface GitHubTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTokenSaved: () => void;
}

export const GitHubTokenModal: React.FC<GitHubTokenModalProps> = ({
  isOpen,
  onClose,
  onTokenSaved
}) => {
  const [tokenInput, setTokenInput] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [hasExistingToken, setHasExistingToken] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const existing = getStoredGitHubToken();
    if (existing) {
      setHasExistingToken(true);
      setTokenInput(existing);
    } else {
      setHasExistingToken(false);
      setTokenInput('');
    }
    setStatusMessage(null);
    setStatusType(null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanToken = tokenInput.trim();
    if (!cleanToken) {
      setStatusType('error');
      setStatusMessage('Please enter a GitHub personal access token.');
      return;
    }

    setIsTesting(true);
    setStatusMessage(null);
    setStatusType(null);

    try {
      // Test credentials with GitHub API
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${cleanToken}`
        }
      });

      if (!userRes.ok) {
        throw new Error(
          `Authentication failed (${userRes.status} ${userRes.statusText}). Please check that the token is valid and unexpired.`
        );
      }

      const userData = await userRes.json();

      // Check repo count
      const reposRes = await fetch(
        'https://api.github.com/user/repos?per_page=100&affiliation=owner,collaborator,organization_member&visibility=all',
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `Bearer ${cleanToken}`
          }
        }
      );

      let count = 0;
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData)) count = reposData.length;
      }

      setStoredGitHubToken(cleanToken);
      setHasExistingToken(true);
      setStatusType('success');
      setStatusMessage(
        `Authenticated as @${userData.login}! Successfully connected to ${count} repositories (including private repositories).`
      );

      setTimeout(() => {
        onTokenSaved();
        onClose();
      }, 1200);
    } catch (err: any) {
      setStatusType('error');
      setStatusMessage(err?.message || 'Failed to authenticate with GitHub.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleRemoveToken = () => {
    setStoredGitHubToken(null);
    setTokenInput('');
    setHasExistingToken(false);
    setStatusType('success');
    setStatusMessage('Token removed. Switched back to public repositories.');
    setTimeout(() => {
      onTokenSaved();
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="GitHub Access Token Configuration"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Sync All 82 GitHub Repositories
              </h2>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                Unlock private, internal &amp; member repositories
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informative text */}
        <div className="space-y-3 mb-6 text-xs text-muted-foreground leading-relaxed">
          <p>
            GitHub&apos;s public API only exposes your <strong>37 public repositories</strong> without authorization. To fetch all <strong>82 repositories</strong> (including your 45 private and internal builds), GitHub requires a Personal Access Token with the <code className="text-primary font-mono bg-secondary px-1.5 py-0.5 rounded">repo</code> scope.
          </p>
          <div className="p-3 rounded-xl bg-secondary/45 border border-border/80 flex items-start gap-2 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              Your token is stored safely in your browser session or can be specified in <code className="text-primary">.env</code> as <code className="text-primary">VITE_GITHUB_TOKEN</code>.
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleTestAndSave} className="space-y-4">
          <div>
            <label
              htmlFor="gh-token-input"
              className="block font-mono text-xs text-muted-foreground mb-1.5 uppercase font-medium"
            >
              GitHub Personal Access Token (Classic or Fine-Grained)
            </label>
            <div className="relative">
              <input
                id="gh-token-input"
                type={showToken ? 'text' : 'password'}
                required
                value={tokenInput}
                onChange={e => setTokenInput(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-background border border-border font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                aria-label={showToken ? 'Hide token' : 'Show token'}
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                statusType === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-destructive/10 border-destructive/30 text-destructive'
              }`}
            >
              {statusType === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{statusMessage}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <a
              href="https://github.com/settings/tokens/new?scopes=repo,read:org&description=Kingsport+Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
            >
              <span>Generate token on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-2">
              {hasExistingToken && (
                <button
                  type="button"
                  onClick={handleRemoveToken}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-destructive/15 hover:bg-destructive/25 text-destructive font-mono text-xs font-semibold transition-colors"
                  title="Remove saved token"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              )}

              <button
                type="submit"
                disabled={isTesting}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-semibold hover:opacity-95 transition-opacity disabled:opacity-50"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify &amp; Sync Repos</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GitHubTokenModal;

