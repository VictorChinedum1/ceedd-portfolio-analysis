import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projectsData } from "@/data/portfolio";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  link?: string;
  image?: string;
}

const Projects = () => {
  const ProjectContent = ({ project }: { project: Project }) => (
    <>
      {/* Project visual placeholder */}
      <div className="h-48 relative overflow-hidden bg-secondary">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.querySelector('.fallback')?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className="fallback absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-primary/60 group-hover:text-primary/80 transition-colors">
            {project.title.charAt(0)}
          </span>
        </div>
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-body">Back to Home</span>
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text inline-block mb-4">
              All Projects
            </h1>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Explore my complete portfolio of work, from featured projects to experimental creations
            </p>
            <div className="mt-6 flex justify-center gap-4 text-sm font-body">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                {projectsData.length} Total Projects
              </span>
              <span className="px-3 py-1 bg-secondary text-muted-foreground rounded-full">
                {projectsData.filter(p => p.featured).length} Featured
              </span>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
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

          {/* Empty State */}
          {projectsData.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground font-body">
                No projects available at the moment.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects;
