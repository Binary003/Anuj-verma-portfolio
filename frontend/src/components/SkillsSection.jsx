import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fetchSkills } from "@/lib/api";

const defaultSkills = {
  "AI/ML": [
    { name: "TensorFlow", proficiency: 90 },
    { name: "PyTorch", proficiency: 85 },
    { name: "Scikit-learn", proficiency: 92 },
    { name: "OpenCV", proficiency: 80 },
    { name: "NLP/LLMs", proficiency: 88 },
    { name: "Computer Vision", proficiency: 82 },
  ],
  Backend: [
    { name: "Node.js", proficiency: 95 },
    { name: "Python", proficiency: 93 },
    { name: "Express.js", proficiency: 90 },
    { name: "FastAPI", proficiency: 85 },
    { name: "MongoDB", proficiency: 88 },
    { name: "PostgreSQL", proficiency: 86 },
  ],
  Tools: [
    { name: "Docker", proficiency: 85 },
    { name: "Git", proficiency: 95 },
    { name: "AWS", proficiency: 80 },
    { name: "Redis", proficiency: 78 },
    { name: "REST APIs", proficiency: 95 },
    { name: "GraphQL", proficiency: 75 },
  ],
};

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "Tools",
  other: "Other",
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      const data = await fetchSkills();
      if (data.length > 0) {
        // Group skills by category
        const grouped = data.reduce((acc, skill) => {
          const category = categoryLabels[skill.category] || skill.category;
          if (!acc[category]) acc[category] = [];
          acc[category].push(skill);
          return acc;
        }, {});
        setSkills(grouped);
      } else {
        setSkills(defaultSkills);
      }
      setLoading(false);
    };
    loadSkills();
  }, []);

  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden bg-secondary/30"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Technical Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            My <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit spanning artificial intelligence, backend
            development, and modern DevOps practices.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(
            ([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-6 text-gradient">
                  {category}
                </h3>
                <div className="space-y-5">
                  {categorySkills.map((skill, index) => (
                    <div key={skill._id || skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView ? { width: `${skill.proficiency}%` } : {}
                          }
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.15 + index * 0.1,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-glow"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ),
          )}
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            And many more technologies...
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "TypeScript",
              "Kubernetes",
              "Jupyter",
              "Flask",
              "Pandas",
              "NumPy",
              "Keras",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground hover:border-primary hover:text-foreground transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
