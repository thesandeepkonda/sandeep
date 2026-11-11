import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { projects, type Project } from "../../data/projects"
import { ArrowRight, Clock } from "lucide-react"
import GithubIcon from "../ui/GithubIcon"

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles: Record<string, string> = {
    Live: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Completed: "bg-blue-50 text-blue-700 border-blue-200",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
    "Coming Soon": "bg-slate-100 text-slate-600 border-slate-200",
    "Portfolio Build": "bg-violet-50 text-violet-700 border-violet-200",
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border font-medium ${styles[status] || styles["Portfolio Build"]}`}
      style={{ fontFamily: "JetBrains Mono, monospace" }}
    >
      <Clock size={10} />
      {status}
    </span>
  )
}

function ArchDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col items-center gap-0 py-1">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <div
            className="w-full max-w-[180px] px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 font-medium text-center truncate"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="flex flex-col items-center">
              <div className="w-px h-2.5 bg-slate-200" />
              <ArrowRight size={9} className="text-slate-300 rotate-90" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section id="projects" className="py-24 bg-white">
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
                Engineering Work
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 max-w-2xl">
                Selected infrastructure, automation and DevOps builds.
              </h2>
              <p className="text-sm text-slate-400 max-w-xs">
                Portfolio builds in progress. Real project case studies will be added as work is documented.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-sky-200 hover:shadow-md transition-all duration-200"
              >
                {/* Top bar */}
                <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
                  <span
                    className="text-xs font-medium text-sky-600 truncate"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {project.category}
                  </span>
                  <StatusBadge status={project.status} />
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-sky-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Architecture */}
                  <div className="mb-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-400 mb-3 font-medium" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      // deployment flow
                    </div>
                    <ArchDiagram steps={project.architecture.steps} />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    {project.repoUrl ? (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-slate-700 hover:text-sky-600 transition-colors">
                        <GithubIcon size={14} /> Repository
                      </a>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm text-slate-400">
                        <GithubIcon size={14} /> Repository coming soon
                      </span>
                    )}
                    <span className="text-slate-200">·</span>
                    <span className="text-xs text-slate-400 italic">Portfolio Build — Details Coming Soon</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
