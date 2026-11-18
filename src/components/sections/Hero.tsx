import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, FileText, ArrowRight, Download } from "lucide-react"
import { profile } from "../../data/profile"
import GithubIcon from "../ui/GithubIcon"
import LinkedinIcon from "../ui/LinkedinIcon"
import GradientASCII from "../GradientASCII" // adjust path if needed

// Branching pipeline — matches the brief's ASCII diagram exactly
const nodes = [
  { id: "git", label: "Git", sub: "Source Control", col: 1, row: 0, tooltip: "Source code versioning and branch strategy." },
  { id: "azdo", label: "AWS DevOps", sub: "CI/CD Platform", col: 1, row: 1, tooltip: "Automated build and deployment workflows via YAML and Release Pipelines." },
  { id: "terraform", label: "Terraform", sub: "Infrastructure as Code", col: 0, row: 2, tooltip: "Define and provision cloud infrastructure consistently and repeatably." },
  { id: "docker", label: "Docker", sub: "Containers", col: 2, row: 2, tooltip: "Package and run applications consistently in isolated containers." },
  { id: "AWS", label: "AWS", sub: "Cloud Platform", col: 0, row: 3, tooltip: "Microsoft AWS hosts compute, networking, storage and managed services." },
  { id: "k8s", label: "Kubernetes", sub: "Orchestration", col: 2, row: 3, tooltip: "Container orchestration for scaling, routing and managing workloads." },
]

const edges = [
  { from: "git", to: "azdo" },
  { from: "azdo", to: "terraform" },
  { from: "azdo", to: "docker" },
  { from: "terraform", to: "AWS" },
  { from: "docker", to: "k8s" },
]

const COLS = 3
const ROWS = 4
const W = 280
const H = 320
const NODE_W = 78
const NODE_H = 30
const colX = (c: number) => (W / (COLS - 1)) * c
const rowY = (r: number) => 20 + (H / (ROWS - 1)) * r * 0.9

function PipelineSVG() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % edges.length), 1400)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxHeight: 340 }}>
        <defs>
          <marker id="arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 z" fill="#1e3a5f" />
          </marker>
          <marker id="arr-active" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 z" fill="#38bdf8" />
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {edges.map((e, i) => {
          const f = nodes.find((n) => n.id === e.from)!
          const t = nodes.find((n) => n.id === e.to)!
          const fx = colX(f.col), fy = rowY(f.row) + NODE_H / 2
          const tx = colX(t.col), ty = rowY(t.row) - NODE_H / 2
          const mx = (fx + tx) / 2, my = (fy + ty) / 2
          const isActive = pulse === i
          const isHov = hovered === e.from || hovered === e.to
          const d = `M${fx},${fy} Q${mx},${my} ${tx},${ty}`
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={isHov || isActive ? "#1e3a5f" : "#0d1a2e"} strokeWidth="1" markerEnd="url(#arr)" />
              {isActive && (
                <motion.circle
                  r="4"
                  fill="#38bdf8"
                  filter="url(#glow)"
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ offsetPath: `path('${d}')` } as React.CSSProperties}
                />
              )}
              {isHov && (
                <path d={d} fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.5" />
              )}
            </g>
          )
        })}

        {nodes.map((node, i) => {
          const x = colX(node.col)
          const y = rowY(node.row)
          const isHov = hovered === node.id
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              onHoverStart={() => setHovered(node.id)}
              onHoverEnd={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {isHov && (
                <rect
                  x={x - NODE_W / 2 - 3} y={y - NODE_H / 2 - 3}
                  width={NODE_W + 6} height={NODE_H + 6}
                  rx="8" fill="#38bdf808"
                  stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.5"
                />
              )}
              <rect
                x={x - NODE_W / 2} y={y - NODE_H / 2}
                width={NODE_W} height={NODE_H}
                rx="7"
                fill={isHov ? "#0d2341" : "#0a1628"}
                stroke={isHov ? "#38bdf8" : "#1e3a5f"}
                strokeWidth="0.6"
                style={{ transition: "fill 0.2s" }}
              />
              <circle cx={x - NODE_W / 2 + 9} cy={y} r="2.5" fill={isHov ? "#38bdf8" : "#0ea5e9"} />
              <text x={x - NODE_W / 2 + 17} y={y - 3} fontSize="7.5" fill={isHov ? "#e0f2fe" : "#94a3b8"}
                fontFamily="JetBrains Mono, monospace" fontWeight="600">
                {node.label}
              </text>
              <text x={x - NODE_W / 2 + 17} y={y + 6} fontSize="5.5" fill="#334155"
                fontFamily="JetBrains Mono, monospace">
                {node.sub}
              </text>
            </motion.g>
          )
        })}
      </svg>

      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-0 left-0 right-0 text-center px-3 py-1.5 text-xs text-slate-300 bg-slate-900/90 rounded-lg border border-white/10 pointer-events-none"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {nodes.find((n) => n.id === hovered)?.tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const terminalScript = [
  { delay: 600, text: "$ whoami", type: "cmd" },
  { delay: 1000, text: "Sandeep@cloud-ops-engineer", type: "out" },
  { delay: 1600, text: "$ kubectl get pods -n production", type: "cmd" },
  { delay: 2100, text: "NAME             STATUS   READY", type: "header" },
  { delay: 2300, text: "api-svc-7f8c2    Running  ✓", type: "success" },
  { delay: 2500, text: "worker-4c2ab     Running  ✓", type: "success" },
  { delay: 3200, text: "$ terraform plan --out=plan.tfplan", type: "cmd" },
  { delay: 3900, text: "Plan: 3 to add, 0 to change.", type: "out" },
  { delay: 4600, text: "$ ansible-playbook site.yml", type: "cmd" },
  { delay: 5200, text: "PLAY RECAP  ok=12  changed=4  failed=0", type: "success" },
]

function Terminal() {
  const [lines, setLines] = useState<typeof terminalScript>([])

  useEffect(() => {
    terminalScript.forEach((l) => {
      setTimeout(() => setLines((p) => [...p, l]), l.delay)
    })
  }, [])

  return (
    <div
      className="rounded-xl overflow-hidden border border-white/10"
      style={{ background: "#060c18", boxShadow: "0 0 0 1px rgba(56,189,248,0.08), 0 8px 32px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-slate-600" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          cloud-ops ~ bash
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-500/50" style={{ fontFamily: "JetBrains Mono, monospace" }}>visual only</span>
        </div>
      </div>

      <div className="p-4 space-y-1 min-h-[156px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs leading-5"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {line.type === "cmd" && <span className="text-sky-400">{line.text}</span>}
            {line.type === "out" && <span className="text-slate-500">{line.text}</span>}
            {line.type === "header" && <span className="text-slate-600">{line.text}</span>}
            {line.type === "success" && <span className="text-emerald-400">{line.text}</span>}
          </motion.div>
        ))}
        {lines.length > 0 && lines.length < terminalScript.length && (
          <div className="text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            <span className="text-sky-400">$ </span>
            <span className="inline-block w-1.5 h-3 bg-sky-400/80 cursor-blink align-middle ml-px" />
          </div>
        )}
      </div>
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (d: number) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#080d1a" }}
      aria-label="Hero"
    >
      {/* ── GradientASCII background ───────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <GradientASCII
          colors={["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"]}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
          glyphOpacity={0.85}
          glow={0.2}
          depthOfField={0}
          flicker={0.2}
          softness={0.5}
          scale={1}
          flow={0.5}
          speed={1}
          gradientOpacity={0.9}
          grain={0.08}
          variation={0}
          mouseInteraction
          scrambleRadius={0.1}
          clickEffect="wave"
          intro
          lightMode={false}
        />
      </div>

      {/* Optional dark vignette to keep text legible over the ASCII */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,13,26,0.75) 0%, rgba(8,13,26,0.35) 55%, rgba(8,13,26,0.55) 100%)",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full pointer-events-none">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* Left column */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2.5 mb-7"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-sky-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />
              <span
                className="text-xs font-semibold text-sky-400 tracking-[0.2em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Cloud Operations → DevOps Engineering
              </span>
            </motion.div>

            <motion.h1
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-4xl lg:text-[52px] font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            >
              Building reliable{" "}
              <span className="text-sky-400">cloud infrastructure</span>,
              automation &amp; deployment systems.
            </motion.h1>

            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-base lg:text-lg text-slate-400 leading-relaxed mb-9 max-w-xl"
            >
              AWS Cloud Operations Engineer with 3+ years of experience working with
              production AWS environments, CI/CD pipelines, infrastructure automation,
              containers, monitoring and production operations.
            </motion.p>

            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 mb-10 pointer-events-auto"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}
                className="group flex items-center gap-2.5 px-6 py-3 rounded-lg bg-sky-500 text-white font-semibold text-sm hover:bg-sky-400 transition-all duration-200"
              >
                Explore My Engineering Work
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 text-slate-300 font-medium text-sm hover:bg-white/6 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                <FileText size={14} />
                View Resume
              </a>
            </motion.div>

            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-5 pointer-events-auto"
            >
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                <GithubIcon size={15} /> GitHub
              </a>
              <span className="w-px h-3.5 bg-slate-800" />
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                <LinkedinIcon size={15} /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right column — pointer-events-auto so SVG hovers work */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 pointer-events-auto"
          >
            <div
              className="rounded-2xl border border-white/8 p-5 backdrop-blur-sm"
              style={{ background: "rgba(8,13,26,0.55)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-600" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  // deployment pipeline
                </span>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-sky-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="text-xs text-slate-600" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    hover to explore
                  </span>
                </div>
              </div>
              <PipelineSVG />
            </div>

            <Terminal />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-700 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-[2]" />
    </section>
  )
}