import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { profile } from "../../data/profile"
import { ExternalLink, FolderGit2 } from "lucide-react"
import GithubIcon from "../ui/GithubIcon"

export default function GitHubSection() {
  const { ref, isInView } = useInView()

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-slate-300" />
                  <span
                    className="text-xs font-medium text-slate-400 tracking-[0.18em] uppercase"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Open Source &amp; GitHub
                  </span>
                </div>
                <p className="text-slate-500 text-sm max-w-md">
                  Only relevant, production-quality engineering repositories are featured here.
                  Not every fork or classroom exercise.
                </p>
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all self-start"
              >
                <GithubIcon size={16} />
                View GitHub Profile
                <ExternalLink size={12} className="text-slate-400" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="p-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/40 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2 text-slate-400">
                    <FolderGit2 size={16} />
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      featured-repo-{i}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    Selected project repository coming soon. Engineering work is documented and added as it's ready.
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <span
                      className="text-xs text-slate-400"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      Coming Soon
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
