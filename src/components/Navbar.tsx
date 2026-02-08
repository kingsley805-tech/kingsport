import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { name: 'home', path: '/' },
  { name: 'about me', path: '/about' },
  { name: 'portfolio', path: '/portfolio' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left nav items */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link to="/" className="font-mono text-2xl font-bold text-foreground">
            js
          </Link>

          {/* Right nav items */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/portfolio"
              className={`relative py-2 text-sm font-medium transition-colors ${
                location.pathname === '/portfolio'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              portfolio
              {location.pathname === '/portfolio' && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                />
              )}
            </Link>

            {isAdmin && (
              <Link
                to="/dashboard"
                className={`relative py-2 text-sm font-medium transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                dashboard
                {location.pathname === '/dashboard' && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                  />
                )}
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user && (
              <button
                onClick={signOut}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-destructive"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2 px-4 py-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                {user && (
                  <button
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="p-2 rounded-lg hover:bg-muted transition-colors text-destructive"
                  >
                    <LogOut size={20} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
