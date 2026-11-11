import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { Cloud, GitMerge, Layers, Shield } from "lucide-react"

const items = [
  { icon: Cloud, value: "3+", unit: "Years", label: "Production AWS Experience", tag: "Cloud Platform" },
  { icon: GitMerge, value: "CI/CD", unit: "", label: "Pipeline Design & Maintenance", tag: "AWS DevOps" },
  { icon: Layers, value: "IaC", unit: "", label: "Infrastructure as Code", tag: "Terraform · ARM" },
  { icon: Shield, value: "Ops", unit: "", label: "Incident Management & RCA", tag: "Production Support" },
]

export default function Snapshot() {
  const { ref, isInView } = useInView()

  return (
    <section className="bg-slate-950 py-10 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center gap-3.5 p-5 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-sky-500/25 transition-all duration-200 cursor-default"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/15 transition-colors">
                <item.icon size={17} className="text-sky-400" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold text-white leading-none">
                  {item.value}
                  {item.unit && <span className="text-sm font-normal text-slate-500 ml-1">{item.unit}</span>}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 leading-tight truncate">{item.label}</div>
                <div
                  className="text-xs text-sky-400/60 mt-0.5 truncate"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {item.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
