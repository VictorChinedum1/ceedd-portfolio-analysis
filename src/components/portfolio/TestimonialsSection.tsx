import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const TestimonialsSection = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text inline-block mb-4">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground font-body">
            What people say about working with me
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 box-glow hover:box-glow-hover relative"
            >
              <Quote
                size={32}
                className="absolute top-4 right-4 text-primary/10"
              />

              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    className="text-primary fill-primary"
                  />
                ))}
              </div>

              <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full border border-primary/30"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-body font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
