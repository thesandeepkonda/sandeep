
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution:
      "Aurora's Scientific, Technological and Research Academy",
    period: "2015 – 2019",
    location: "Hyderabad, India",
    coursework: [
      "Computer Science",
      "Software Engineering",
      "Programming",
      "Database Management",
    ],
  },
];

export default function Education() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Section Heading */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-slate-300" />
              <span
                className="text-xs font-medium text-slate-400 tracking-[0.18em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Education
              </span>
            </div>

            {/* Education Card */}
            <div className="flex flex-col sm:flex-row gap-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.4,
                  }}
                  className="flex-1 flex gap-4 p-6 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-sm transition-all"
                >
                  {/* Graduation Icon */}
                  <div className="w-11 h-11 rounded-lg border border-sky-100 bg-sky-50 flex items-center justify-center flex-shrink-0">
                    <GraduationCap
                      size={20}
                      className="text-sky-600"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-base leading-snug">
                      {edu.degree}
                    </h3>

                    <p className="text-sm text-slate-600 mt-2">
                      {edu.institution}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span
                        className="flex items-center gap-1.5 text-xs text-slate-400"
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        <Calendar size={13} />
                        {edu.period}
                      </span>

                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin size={13} />
                        {edu.location}
                      </span>
                    </div>

                    {edu.coursework.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
