import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTechs: string[];
  onTechToggle: (tech: string) => void;
  availableTechs: string[];
  onClearFilters: () => void;
}

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedTechs,
  onTechToggle,
  availableTechs,
  onClearFilters,
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const hasActiveFilters = searchQuery || selectedTechs.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
            selectedTechs.length > 0
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:bg-muted'
          }`}
        >
          <Filter size={18} />
          <span>Filter</span>
          {selectedTechs.length > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-primary-foreground text-primary rounded-full">
              {selectedTechs.length}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-2.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <X size={18} />
            Clear
          </motion.button>
        )}
      </div>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-card border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">Filter by Technology:</p>
              <div className="flex flex-wrap gap-2">
                {availableTechs.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => onTechToggle(tech)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTechs.includes(tech)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
