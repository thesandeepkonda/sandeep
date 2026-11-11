import { motion } from "framer-motion"
import { useInView } from "../../hooks/useInView"
import { profile } from "../../data/profile"
import { Mail, FileText, ArrowRight } from "lucide-react"
import GithubIcon from "../ui/GithubIcon"
import LinkedinIcon from "../ui/LinkedinIcon"

export default function Contact() {
  const { ref, isInView } = useInView()

  return (
    <section id="contact" className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(56,189,248,0.05) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-sky-500/40" />
            <span
              className="text-xs font-medium text-sky-400 tracking-[0.18em] uppercase"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Get in Touch
            </span>
            <div className="h-px w-8 bg-sky-500/40" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Let's Build Better Infrastructure.
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Interested in DevOps, cloud infrastructure, automation, or engineering
            opportunities? Let's connect.
          </p>

          {/* Email CTA */}
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-sky-500 text-white font-semibold text-base hover:bg-sky-400 transition-colors duration-200 mb-8 group"
          >
            <Mail size={18} />
            {profile.email}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>

          {/* Secondary */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { href: profile.github, icon: <GithubIcon size={15} />, label: "GitHub" },
              { href: profile.linkedin, icon: <LinkedinIcon size={15} />, label: "LinkedIn" },
              { href: profile.resumePath, icon: <FileText size={15} />, label: "Resume", download: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/12 text-slate-400 hover:text-white hover:border-white/25 text-sm transition-all duration-200"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
