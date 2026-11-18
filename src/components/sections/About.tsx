import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { ArrowRight, Terminal, Cloud, Code2 } from "lucide-react"
import TechText from "../../components/sections/TechText"
import Scanner from "./Scanner"

const journey = [
  "Java Backend",
  "Spring Boot",
  "AWS Infrastructure",
  "Terraform IaC",
  "CI/CD Automation",
  "Cloud Operations",
]

const highlights = [
  "AWS Infrastructure provisioning (VPC, EC2, ECS, RDS, S3)",
  "Terraform IaC and reusable module implementation",
  "GitHub Actions CI/CD workflows & automated deployments",
  "Docker containerization & Amazon ECS workloads",
  "Java Spring Boot REST API development",
  "AWS Networking & Security (ALB, Route 53, ACM, IAM)",
  "CloudWatch monitoring & infrastructure troubleshooting",
  "Agile backend debugging & SQL optimization",
]

export default function About() {
  const { ref, isInView } = useInView(0.15)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: "#020617" }}
    >
      {/* ── Scanner background ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Scanner
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.5}
          sweepSpeed={0.25}
          sweepWidth={1.6}
          trail={0.5}
          ripple={0.22}
          bandDensity={11}
          glow={0.6}
          scanDirection="vertical"
          colorSpread={0.7}
          scanline
          scanlineIntensity={0.5}
          mouseInteraction
          clickEffect="ping"
          reverse={false}
          scale={1.5}
          frequency={2}
          lineWidth={1.2}
          brightness={1}
          vignette={0.3}
          grain
          grainIntensity={0.04}
          opacity={1}
          mouseMode="repel"
          mouseRadius={0.5}
          mouseStrength={0.7}
          intro
          lightMode={false}
        />
      </div>

      {/* Dark vignette — keeps text legible over the bright scan */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.8) 55%, rgba(2,6,23,0.95) 100%)",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 pointer-events-none">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left Column: Bio & Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 32 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-sky-400"
              />
              <span
                className="text-xs font-semibold text-sky-400 tracking-[0.18em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                About Me
              </span>
            </div>

            {/* Animated interactive name — tightened container so no gap */}
            <div className="mb-4">
              <div className="w-full h-[95px] md:h-[115px] relative text-sky-400">
                <TechText
                  text="Sandeep Konda"
                  fontWeight={700}
                  fontSize={110}
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  intro="none"
                  introDuration={2}
                  clickKick
                  guides={false}
                  fontFamily=""
                  letterSpacing={-0.05}
                  accentColor="currentColor"
                  reach={200}
                  softness={0.7}
                  lineStyle="dashed"
                  strokeWidth={1.5}
                  speed={1}
                  bounce={0.4}
                  selection
                  labels
                  color="currentColor"
                  align="left"
                  draggable
                  sweep
                />
              </div>

              <p className="text-slate-200 text-2xl lg:text-3xl font-semibold -mt-2">
                Passionate about{" "}
                <span className="text-sky-400 relative inline-block">
                  AWS Cloud, DevOps, and automation.
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-sky-400/40 rounded"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </span>
              </p>
            </div>

            <div className="space-y-4 text-slate-300 leading-relaxed text-[0.95rem]">
              <p>
                Based in Hyderabad, I currently work as an Associate Software Engineer at Anasol Consultancy Services, focusing on managing and provisioning scalable AWS infrastructure.
              </p>
              <p>
                My background is rooted in backend development—building robust REST APIs with Java and Spring Boot. This software engineering foundation allows me to approach cloud operations with a developer's mindset, writing clean Infrastructure-as-Code (IaC) using Terraform.
              </p>
              <p>
                Today, my day-to-day involves designing automated GitHub Actions workflows, containerizing workloads with Docker, and orchestrating deployments on Amazon ECS while ensuring secure, monitored, and highly available environments.
              </p>
            </div>

            {/* Image Box with Floating Animation */}
            <motion.figure
              className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-purple-500/10 group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.img
                // REPLACE THIS URL WITH YOUR ACTUAL PHOTO LINK
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85"
                alt="Sandeep Konda - Software & Cloud Engineer"
                className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white pointer-events-none">
                <div>
                  <div className="flex gap-2 mb-2">
                    <Code2 size={14} className="text-sky-400" />
                    <Cloud size={14} className="text-sky-400" />
                    <Terminal size={14} className="text-sky-400" />
                  </div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Sandeep Konda
                  </p>
                  <p className="mt-1 max-w-xs text-sm font-medium leading-snug">
                    Building robust backends and reliable AWS infrastructure.
                  </p>
                </div>
              </figcaption>
            </motion.figure>

            {/* Career path chips */}
            <div className="mt-10 flex flex-wrap items-center gap-2">
              {journey.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <span
                    className={`text-sm font-medium px-3 py-1.5 rounded-full border transition-all duration-300 hover:shadow-md ${
                      i === journey.length - 1
                        ? "bg-sky-500 text-white border-sky-500 shadow-sky-500/20"
                        : "bg-slate-900/60 backdrop-blur-sm text-slate-300 border-white/10 hover:border-sky-400/50"
                    }`}
                  >
                    {step}
                  </span>
                  {i < journey.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                    >
                      <ArrowRight size={12} className="text-slate-600 flex-shrink-0" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Core Experience Areas */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:mt-4 pointer-events-auto"
          >
            <h3
              className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              <Terminal size={14} /> Core Expertise
            </h3>

            <div className="grid gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(82, 39, 255, 0.12)",
                    borderColor: "rgba(255, 159, 252, 0.5)",
                  }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-slate-900/50 backdrop-blur-sm shadow-sm transition-all duration-200 group cursor-default relative overflow-hidden"
                >
                  {/* Subtle hover background highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-300 relative z-10" />
                  <span className="text-sm text-slate-200 font-medium relative z-10">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}