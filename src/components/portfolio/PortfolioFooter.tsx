import { Github, Twitter, Linkedin } from "lucide-react";

const PortfolioFooter = () => {
  return (
    <footer className="border-t border-border py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-lg font-bold text-primary text-glow-sm">
          Ceedd
        </div>

        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()} Ceedd. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {[Github, Twitter, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
