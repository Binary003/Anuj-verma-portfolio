import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Brain,
  Database,
  Bot,
  BarChart3,
  Code,
} from "lucide-react";
import { fetchProjects, API_BASE_URL } from "@/lib/api";

// Default projects (fallback when API has no data)
const defaultProjects = [
  {
    title: "AI Chatbot Platform",
    description:
      "An intelligent conversational AI system built with LLMs, featuring natural language understanding, context management, and multi-turn dialogue capabilities.",
    technologies: ["Python", "LangChain", "OpenAI", "FastAPI", "Redis"],
    icon: Bot,
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "ML Model Pipeline",
    description:
      "End-to-end machine learning pipeline for automated training, evaluation, and deployment of computer vision models with real-time inference.",
    technologies: ["TensorFlow", "Docker", "Kubernetes", "AWS", "MLflow"],
    icon: Brain,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Scalable API Backend",
    description:
      "High-performance RESTful API serving millions of requests daily, featuring authentication, rate limiting, caching, and comprehensive monitoring.",
    technologies: ["Node.js", "Express", "MongoDB", "Redis", "JWT"],
    icon: Database,
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Real-time data analytics platform with interactive visualizations, custom reporting, and predictive insights powered by ML algorithms.",
    technologies: ["React", "D3.js", "Python", "PostgreSQL", "Pandas"],
    icon: BarChart3,
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
];

const gradients = [
  "from-cyan-500/20 to-blue-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-orange-500/20 to-yellow-500/20",
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      if (data.length > 0) {
        // Add gradient to each project from API
        const projectsWithGradient = data.map((project, index) => ({
          ...project,
          gradient: gradients[index % gradients.length],
        }));
        setProjects(projectsWithGradient);
      } else {
        setProjects(defaultProjects);
      }
      setLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of projects showcasing my expertise in AI/ML and backend
            development.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500"
            >
              {/* Project Header with Image or Gradient */}
              <div
                className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                {project.image ? (
                  <img
                    src={`${API_BASE_URL}${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-20 h-20 text-foreground/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

                {/* Hover Links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
