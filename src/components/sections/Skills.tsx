import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { skillGroups } from "../../data/skills"
import { Cloud, GitMerge, Layers, Box, Terminal, Activity, Server, Shield } from "lucide-react"

type IconName = "cloud" | "git-merge" | "layers" | "box" | "terminal" | "activity" | "server" | "shield"

const iconMap: Record<IconName, React.ComponentType<{ size?: number; className?: string }>> = {
  cloud: Cloud,
  "git-merge": GitMerge,
  layers: Layers,
  box: Box,
  terminal: Terminal,
  activity: Activity,
  server: Server,
  shield: Shield,
}

export default function Skills() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section id="skills" className="py-24 bg-slate-950">
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
                Technology Stack
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Engineering Stack</h2>
            <p className="text-slate-500 max-w-xl text-[0.95rem]">
              Technologies I work with in production cloud operations and DevOps engineering contexts.
              No proficiency bars — just the tools I actually use.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillGroups.map((group, i) => {
              const Icon = iconMap[group.icon as IconName] || Cloud
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  className="p-5 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-sky-500/25 transition-all duration-200 cursor-default group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/15 transition-colors flex-shrink-0">
                      <Icon size={15} className="text-sky-400" />
                    </div>
                    <h3
                      className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full border border-white/8 bg-white/4 text-slate-500 hover:text-slate-300 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all duration-150"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
