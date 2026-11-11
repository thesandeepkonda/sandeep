
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { experience } from "../../data/experience";
import { MapPin, Calendar } from "lucide-react";

export default function Experience() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-sky-500" />
              <span
                className="text-xs font-semibold text-sky-600 tracking-[0.18em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Work History
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12">
              Professional Experience
            </h2>
          </motion.div>

          {/* Experience Cards */}
          {experience.map((job, ji) => (
            <motion.div
              key={ji}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: ji * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-8"
            >
              {/* Job Header */}
              <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-white">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 2.2,
                            }}
                          />
                          Current Role
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900">
                      {job.company}
                    </h3>

                    <p className="text-sky-600 font-semibold mt-1">
                      {job.role}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        <span
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                          }}
                        >
                          {job.period}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Sandeep Konda Monogram */}
                  <div
                    className="hidden sm:flex items-center justify-center w-14 h-14 rounded-xl border-2 border-sky-200 bg-white text-sky-600 text-xl font-black tracking-tighter shadow-sm"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    SK
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="p-6 lg:p-8 border-t border-slate-100">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {job.areas.map((area, ai) => (
                    <motion.div
                      key={ai}
                      initial={{ opacity: 0, y: 12 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        delay: 0.25 + ai * 0.06,
                        duration: 0.4,
                      }}
                      whileHover={{
                        y: -2,
                        transition: { duration: 0.15 },
                      }}
                      className="p-4 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50/30 hover:shadow-sm transition-all duration-200 cursor-default group"
                    >
                      <h4 className="text-sm font-semibold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                        {area.title}
                      </h4>

                      <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        {area.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {area.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors"
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
