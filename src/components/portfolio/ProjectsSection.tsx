import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  link?: string;
  image?: string;
}

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ProjectContent = ({ project }: { project: Project }) => (
    <>
      {/* Project visual placeholder */}
      <div className="h-48 relative overflow-hidden bg-secondary">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-primary/30 group-hover:text-primary/60 transition-colors">
                {project.title.charAt(0)}
              </span>
            </div>
          </>
        )}
        {project.featured && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-primary/20 text-primary text-xs font-display rounded border border-primary/30">
            Featured
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.link && (
            <ExternalLink
              size={16}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary text-primary/80 text-xs font-body rounded border border-primary/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text inline-block mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground font-body">
            A selection of my recent work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 box-glow hover:box-glow-hover"
            >
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <ProjectContent project={project} />
                </a>
              ) : (
                <ProjectContent project={project} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
