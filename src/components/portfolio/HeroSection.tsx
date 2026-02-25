import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  name: string;
  tagline: string;
  description: string;
}

const Particle = ({ index }: { index: number }) => {
  const style = useMemo(() => {
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 5;
    const driftX = (Math.random() - 0.5) * 200;
    const driftY = -(Math.random() * 300 + 100);
    return {
      width: size,
      height: size,
      left: `${left}%`,
      top: `${top}%`,
      "--drift-x": `${driftX}px`,
      "--drift-y": `${driftY}px`,
      animation: `particle-drift ${duration}s ease-in-out ${delay}s infinite`,
    } as React.CSSProperties;
  }, [index]);

  return (
    <div
      className="absolute rounded-full bg-primary/60"
      style={style}
    />
  );
};

const HeroSection = ({ name, tagline, description }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!nameRef.current || !heroRef.current) return;
      const scrolled = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollPercent = Math.min(scrolled / heroHeight, 1);

      nameRef.current.style.transform = `translateY(${scrolled * 0.4}px) rotateX(${scrollPercent * 15}deg)`;
      nameRef.current.style.opacity = `${1 - scrollPercent * 0.8}`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const letters = name.split("");

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(240 27% 5%) 0%, hsl(220 15% 7%) 50%, hsl(240 27% 5%) 100%)",
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(191 100% 50% / 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Content */}
      <div
        ref={nameRef}
        className="relative z-10 text-center"
        style={{ perspective: "1000px" }}
      >
        {/* Floating name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-display font-black tracking-wider text-glow">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="inline-block text-primary animate-letter-float"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl font-body text-foreground/80 mb-4 tracking-wide"
        >
          {tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg font-body text-muted-foreground max-w-xl mx-auto px-4"
        >
          {description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <button
            onClick={() =>
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-primary text-primary-foreground font-display text-sm font-semibold rounded-lg box-glow hover:box-glow-hover transition-all duration-300 hover:scale-105"
          >
            View Projects
          </button>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 border border-primary/40 text-primary font-display text-sm font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() =>
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="text-primary/60 hover:text-primary transition-colors animate-float"
        >
          <ArrowDown size={28} />
        </button>
      </motion.div>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(191 100% 50% / 0.1) 2px, hsl(191 100% 50% / 0.1) 4px)",
        }}
      />
    </section>
  );
};

export default HeroSection;
