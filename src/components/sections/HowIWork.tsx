import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { philosophy } from "../../data/profile"
import { Cog, Rocket, Eye, SearchCode } from "lucide-react"

const config = [
  { Icon: Cog, accent: "sky", bg: "bg-sky-50", border: "border-sky-100", dot: "bg-sky-400", iconColor: "text-sky-500" },
  { Icon: Rocket, accent: "emerald", bg: "bg-emerald-50", border: "border-emerald-100", dot: "bg-emerald-400", iconColor: "text-emerald-500" },
  { Icon: Eye, accent: "violet", bg: "bg-violet-50", border: "border-violet-100", dot: "bg-violet-400", iconColor: "text-violet-500" },
  { Icon: SearchCode, accent: "amber", bg: "bg-amber-50", border: "border-amber-100", dot: "bg-amber-400", iconColor: "text-amber-500" },
]

export default function HowIWork() {
  const { ref, isInView } = useInView()

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-slate-300" />
              <span
                className="text-xs font-medium text-slate-500 tracking-[0.18em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Engineering Philosophy
              </span>
              <div className="h-px w-8 bg-slate-300" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">How I Work</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {philosophy.map((step, i) => {
              const { Icon, bg, border, dot, iconColor } = config[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`relative p-6 rounded-2xl border ${bg} ${border} cursor-default`}
                >
                  {/* Large ghost number */}
                  <div
                    className="text-6xl font-black mb-3 leading-none select-none"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(0,0,0,0.06)",
                    }}
                  >
                    {step.number}
                  </div>
                  <div className={`mb-3 ${iconColor}`}>
                    <Icon size={22} />
                  </div>
                  <h3
                    className="text-xs font-bold tracking-[0.15em] text-slate-900 mb-2.5"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>

                  {/* Corner dot */}
                  <div className={`absolute top-5 right-5 w-2 h-2 rounded-full ${dot} opacity-60`} />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
