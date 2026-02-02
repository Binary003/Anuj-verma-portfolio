import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/hero-portrait.jpg";

const roles = [
  "AI/ML Developer",
  "Backend Engineer",
  "Full Stack Developer",
  "Problem Solver",
];

const useTypewriter = (
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return displayText;
};

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const typewriterText = useTypewriter(roles, 100, 50, 2000);

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 lg:pt-24"
    >
      {/* Mobile/Tablet: Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background z-10" />
        <img
          src={heroImage}
          alt="Developer Portrait"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        <div className="lg:hidden absolute top-1/3 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="lg:hidden absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="hidden lg:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="hidden lg:block absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating particles */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-4 h-4 bg-primary rounded-full opacity-70"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-[40%] right-[20%] w-3 h-3 bg-primary rounded-full opacity-60"
        />
      </div>

      {/* Desktop Layout: Image Left, Content Right */}
      <div className="hidden lg:flex relative z-20 w-full max-w-7xl mx-auto px-12 items-center justify-between gap-12 mt-8">
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          className="flex-1 flex justify-center -mt-16"
        >
          <div className="relative overflow-hidden rounded-2xl">
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-transparent rounded-2xl blur-2xl"
            />
            <img
              src={heroImage}
              alt="Developer Portrait"
              className="relative w-full max-w-md h-auto object-cover object-[center_5%] rounded-2xl shadow-2xl"
              style={{ marginTop: "-50px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-2xl" />
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div style={{ opacity }} className="flex-1 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
              AI/ML & Backend Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl xl:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-foreground">ANUJ </span>
            <span className="text-gradient">VERMA</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl xl:text-3xl text-muted-foreground mb-6 h-10"
          >
            <span className="text-primary">{typewriterText}</span>
            <span className="animate-pulse text-primary">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg xl:text-xl text-muted-foreground max-w-lg mb-10"
          >
            Building intelligent systems and scalable backend solutions.
            Specializing in Machine Learning, Deep Learning, and robust API
            development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  y: {
                    duration: 2 + index * 0.3,
                    repeat: Infinity,
                    delay: index * 0.2,
                  },
                }}
                className="p-3 rounded-full border border-border bg-card/50 backdrop-blur-sm hover:border-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile/Tablet Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 text-center lg:hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            AI/ML & Backend Developer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="text-foreground">ANUJ </span>
          <span className="text-gradient">VERMA</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-muted-foreground mb-6 h-8"
        >
          <span className="text-primary">{typewriterText}</span>
          <span className="animate-pulse text-primary">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Building intelligent systems and scalable backend solutions.
          Specializing in Machine Learning, Deep Learning, and robust API
          development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full border border-border bg-card/50 backdrop-blur-sm hover:border-primary hover:bg-primary/10 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
