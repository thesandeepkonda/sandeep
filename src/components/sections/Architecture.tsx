import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "../../hooks/useInView"

const pipeline = [
  { id: "dev", label: "Developer", sub: "Code → Commit", color: "#64748b", icon: "⌨", tooltip: "Engineers write and commit code to version control, triggering automated pipeline workflows." },
  { id: "git", label: "Git", sub: "Version Control", color: "#f97316", icon: "⎇", tooltip: "Git manages source code versioning, branching strategy, and code review via pull requests." },
  { id: "repos", label: "AWS Repos", sub: "Remote Repository", color: "#0078d4", icon: "☁", tooltip: "AWS Repos hosts the central repository and integrates natively with AWS DevOps pipelines." },
  { id: "azdo", label: "AWS DevOps", sub: "CI/CD Platform", color: "#0ea5e9", icon: "⚙", tooltip: "CI/CD platform used for automated build and deployment workflows via YAML and Release Pipelines." },
  { id: "build", label: "Build", sub: "Compile · Test", color: "#8b5cf6", icon: "🔨", tooltip: "The build stage compiles application code, runs tests, and produces deployable artifacts." },
  { id: "terraform", label: "Terraform", sub: "Infrastructure as Code", color: "#7c3aed", icon: "T", tooltip: "Infrastructure as Code used to define and provision cloud infrastructure consistently and repeatably." },
  { id: "AWS", label: "AWS Infrastructure", sub: "Cloud Resources", color: "#0078d4", icon: "△", tooltip: "Microsoft AWS hosts compute, networking, storage, and managed services provisioned via Terraform." },
  { id: "deploy", label: "Deploy", sub: "Release · Container", color: "#059669", icon: "→", tooltip: "Applications are deployed to AWS environments via Docker containers and Kubernetes orchestration." },
  { id: "monitor", label: "Monitor", sub: "Prometheus · Grafana", color: "#dc2626", icon: "◉", tooltip: "Prometheus scrapes metrics and Grafana visualizes infrastructure and application health dashboards." },
]

export default function Architecture() {
  const [hovered, setHovered] = useState<string | null>(null)
  const { ref, isInView } = useInView(0.1)

  const hoveredNode = pipeline.find((n) => n.id === hovered)

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-sky-500" />
              <span
                className="text-xs font-semibold text-sky-400 tracking-[0.18em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                DevOps Pipeline
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              From Code to Infrastructure
            </h2>
            <p className="text-slate-500 max-w-lg text-[0.95rem]">
              The end-to-end DevOps workflow from developer commit through CI/CD automation to production infrastructure and monitoring.{" "}
              <span className="text-sky-500/60">Hover any stage to learn more.</span>
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Pipeline list */}
            <div className="flex flex-col gap-1.5">
              {pipeline.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  className="flex flex-col"
                >
                  <motion.div
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      hovered === step.id
                        ? "bg-white/8 border-sky-500/35 shadow-lg shadow-sky-900/10"
                        : "border-white/6 bg-white/3 hover:bg-white/5"
                    }`}
                    onHoverStart={() => setHovered(step.id)}
                    onHoverEnd={() => setHovered(null)}
                  >
                    {/* Number */}
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{
                        background: `${step.color}18`,
                        color: step.color,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className={`text-sm font-semibold transition-colors ${hovered === step.id ? "text-white" : "text-slate-400"}`}>
                        {step.label}
                      </span>
                      <span className="text-xs text-slate-700 ml-2 flex-shrink-0" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        {step.sub}
                      </span>
                    </div>

                    <motion.div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      animate={{
                        backgroundColor: hovered === step.id ? step.color : "rgba(255,255,255,0.12)",
                        boxShadow: hovered === step.id ? `0 0 8px ${step.color}80` : "none",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  {/* Connector */}
                  {i < pipeline.length - 1 && (
                    <div className="ml-[2.35rem] w-px h-1.5 bg-white/8" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Detail + toolchain */}
            <div className="sticky top-24 flex flex-col gap-5">
              <AnimatePresence mode="wait">
                {hoveredNode ? (
                  <motion.div
                    key={hoveredNode.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="p-8 rounded-2xl border border-white/10 bg-white/4"
                    style={{ minHeight: 200 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                      style={{ background: `${hoveredNode.color}18` }}
                    >
                      {hoveredNode.icon}
                    </div>
                    <div
                      className="text-xs font-medium mb-1.5 tracking-widest uppercase"
                      style={{ color: hoveredNode.color, fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {hoveredNode.sub}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{hoveredNode.label}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{hoveredNode.tooltip}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-2xl border border-white/6 bg-white/2 flex items-center justify-center"
                    style={{ minHeight: 200 }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3 opacity-15">⚙</div>
                      <p className="text-slate-700 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        hover a pipeline stage
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toolchain */}
              <div className="p-5 rounded-xl border border-white/6 bg-white/2">
                <p
                  className="text-xs text-slate-700 mb-3"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  // core toolchain
                </p>
                <div className="flex flex-wrap gap-2">
                  {["AWS DevOps", "Terraform", "Docker", "Kubernetes", "Ansible", "Prometheus", "Grafana", "Bash"].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 text-slate-600 hover:text-slate-400 hover:border-white/20 transition-colors"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
