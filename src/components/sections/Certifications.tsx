import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { certifications } from "../../data/certifications"
import { Award, ExternalLink } from "lucide-react"

const levelColors: Record<string, { chip: string; icon: string }> = {
  Expert: { chip: "bg-amber-50 text-amber-700 border-amber-200", icon: "text-amber-500 bg-amber-50" },
  Associate: { chip: "bg-blue-50 text-blue-700 border-blue-200", icon: "text-blue-600 bg-blue-50" },
  Fundamentals: { chip: "bg-slate-100 text-slate-600 border-slate-200", icon: "text-slate-500 bg-slate-100" },
}

export default function Certifications() {
  const { ref, isInView } = useInView()

  return (
    <section id="certifications" className="py-24 bg-white">
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
                className="text-xs font-semibold text-sky-600 tracking-[0.18em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Microsoft Certified
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Certifications</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {certifications.map((cert, i) => {
              const colors = levelColors[cert.level] || levelColors.Fundamentals
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex flex-col p-7 rounded-2xl border border-slate-200 bg-white hover:border-sky-200 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colors.icon} border-current/20`}>
                      <Award size={20} />
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colors.chip}`}
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {cert.level}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1 font-medium">{cert.issuer}</p>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{cert.title}</h3>
                    <div
                      className="text-sm font-semibold text-sky-600 mb-4"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {cert.code}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{cert.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700 font-semibold transition-colors"
                      >
                        View Credential <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span
                        className="text-xs text-slate-400 italic"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        // credential URL coming soon
                      </span>
                    )}
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
