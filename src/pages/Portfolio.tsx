import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import VercelPortfolio from "@/components/VercelPortfolio";
import { PORTFOLIO_CONFIG } from "@/config";

const Portfolio = () => (
  <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Main Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-mono text-xs text-muted-foreground">
            {PORTFOLIO_CONFIG.name}
          </span>
          <a
            href={PORTFOLIO_CONFIG.socials.resume}
            download={PORTFOLIO_CONFIG.cvFilename}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>
        </div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <VercelPortfolio />
    </main>
  </div>
);

export default Portfolio;
