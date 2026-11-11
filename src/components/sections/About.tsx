import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { ArrowRight } from "lucide-react"

const journey = [
  "Cloud Operations",
  "Production Infrastructure",
  "Automation",
  "CI/CD",
  "Containers",
  "DevOps Engineering",
]

const highlights = [
  "AWS DevOps YAML pipeline design and maintenance",
  "Terraform and ARM Template infrastructure deployments",
  "Docker container management and Kubernetes operations",
  "Ansible-based configuration automation",
  "Prometheus and Grafana observability setup",
  "Production incident response and Root Cause Analysis",
  "Linux systems administration",
  "JIRA-based operational workflow and reporting",
]

export default function About() {
  const { ref, isInView } = useInView()

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-sky-500" />
              <span
                className="text-xs font-semibold text-sky-600 tracking-[0.18em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Engineering Profile
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Production cloud operations, moving deeper into{" "}
              <span className="text-sky-600">DevOps engineering</span>.
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-[0.95rem]">
              <p>
                Based in Bengaluru, I work as a Cloud Operations Engineer at Stibo Systems,
                supporting production Microsoft AWS environments. Day-to-day work involves
                CI/CD pipelines, infrastructure operations, containerized workloads, and
                production incident response.
              </p>
              <p>
                Over 3+ years in cloud operations, I've developed working experience across
                the AWS ecosystem, infrastructure-as-code tooling, container orchestration,
                and configuration automation.
              </p>
              <p>
                The direction is clear: from cloud operations support toward end-to-end DevOps
                engineering — designing systems, building automation, and owning infrastructure
                with greater depth.
              </p>
            </div>

            <figure className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1561233835-f937539b95b9?auto=format&fit=crop&w=1200&q=85"
                alt="Blue lights across modern data center infrastructure"
                className="h-44 w-full object-cover opacity-70 transition duration-500 hover:scale-[1.02] hover:opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Operational focus
                  </p>
                  <p className="mt-1 max-w-xs text-sm font-medium leading-snug">
                    Reliable systems, clear automation, observable outcomes.
                  </p>
                </div>
                <span className="hidden text-[10px] text-slate-400 sm:block">
                  Photo by Krzysztof Kowalik / Unsplash
                </span>
              </figcaption>
            </figure>

            {/* Career path */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {journey.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full border transition-colors ${
                      i === journey.length - 1
                        ? "bg-sky-500 text-white border-sky-500"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    {step}
                  </span>
                  {i < journey.length - 1 && (
                    <ArrowRight size={11} className="text-slate-300 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Core Experience Areas
            </h3>
            <div className="grid gap-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                  className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-100 hover:border-sky-200 hover:bg-sky-50/40 hover:shadow-sm transition-all duration-200 group cursor-default"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-sm text-slate-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
