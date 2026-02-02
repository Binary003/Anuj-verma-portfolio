import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Skill from './models/Skill.js';

dotenv.config();

const projects = [
  {
    title: "AI Chatbot Platform",
    description: "An intelligent conversational AI system built with LLMs, featuring natural language understanding, context management, and multi-turn dialogue capabilities.",
    technologies: ["Python", "LangChain", "OpenAI", "FastAPI", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "",
    featured: true,
    order: 1
  },
  {
    title: "ML Model Pipeline",
    description: "End-to-end machine learning pipeline for automated training, evaluation, and deployment of computer vision models with real-time inference.",
    technologies: ["TensorFlow", "Docker", "Kubernetes", "AWS", "MLflow"],
    githubUrl: "https://github.com",
    liveUrl: "",
    featured: true,
    order: 2
  },
  {
    title: "Scalable API Backend",
    description: "High-performance RESTful API serving millions of requests daily, featuring authentication, rate limiting, caching, and comprehensive monitoring.",
    technologies: ["Node.js", "Express", "MongoDB", "Redis", "JWT"],
    githubUrl: "https://github.com",
    liveUrl: "",
    featured: false,
    order: 3
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time data analytics platform with interactive visualizations, custom reporting, and predictive insights powered by ML algorithms.",
    technologies: ["React", "D3.js", "Python", "PostgreSQL", "Pandas"],
    githubUrl: "https://github.com",
    liveUrl: "",
    featured: false,
    order: 4
  }
];

const skills = [
  // Frontend
  { name: "React", category: "frontend", proficiency: 90, order: 1 },
  { name: "TypeScript", category: "frontend", proficiency: 85, order: 2 },
  { name: "JavaScript", category: "frontend", proficiency: 95, order: 3 },
  { name: "HTML/CSS", category: "frontend", proficiency: 92, order: 4 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 88, order: 5 },
  
  // Backend
  { name: "Node.js", category: "backend", proficiency: 95, order: 1 },
  { name: "Python", category: "backend", proficiency: 93, order: 2 },
  { name: "Express.js", category: "backend", proficiency: 90, order: 3 },
  { name: "FastAPI", category: "backend", proficiency: 85, order: 4 },
  { name: "REST APIs", category: "backend", proficiency: 95, order: 5 },
  
  // Database
  { name: "MongoDB", category: "database", proficiency: 88, order: 1 },
  { name: "PostgreSQL", category: "database", proficiency: 86, order: 2 },
  { name: "Redis", category: "database", proficiency: 78, order: 3 },
  
  // Tools
  { name: "Docker", category: "tools", proficiency: 85, order: 1 },
  { name: "Git", category: "tools", proficiency: 95, order: 2 },
  { name: "AWS", category: "tools", proficiency: 80, order: 3 },
  { name: "Linux", category: "tools", proficiency: 82, order: 4 },
  
  // Other (AI/ML)
  { name: "TensorFlow", category: "other", proficiency: 90, order: 1 },
  { name: "PyTorch", category: "other", proficiency: 85, order: 2 },
  { name: "Scikit-learn", category: "other", proficiency: 92, order: 3 },
  { name: "NLP/LLMs", category: "other", proficiency: 88, order: 4 },
  { name: "Computer Vision", category: "other", proficiency: 82, order: 5 },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared existing projects and skills');

    // Insert projects
    await Project.insertMany(projects);
    console.log(`✅ Added ${projects.length} projects`);

    // Insert skills
    await Skill.insertMany(skills);
    console.log(`✅ Added ${skills.length} skills`);

    console.log('');
    console.log('Database seeded successfully!');
    console.log('Refresh your admin dashboard to see the data.');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDatabase();
