import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AboutSectionProps {
  about: {
    title: string;
    description: string;
    image?: string;
    stats: { label: string; value: string }[];
  };
}

const AboutSection = ({ about }: AboutSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text inline-block mb-6">
            {about.title}
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            {about.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="shrink-0"
              >
                <img
                  src={about.image}
                  alt="Victor Molokwu"
                  className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-primary/20 box-glow"
                />
              </motion.div>
            )}
            <p className="text-lg text-muted-foreground font-body leading-relaxed text-left">
              {about.description}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {about.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center box-glow hover:box-glow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-body">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
