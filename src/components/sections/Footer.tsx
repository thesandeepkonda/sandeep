import { profile } from "../../data/profile"
import { Mail, FileText } from "lucide-react"
import GithubIcon from "../ui/GithubIcon"
import LinkedinIcon from "../ui/LinkedinIcon"

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/6 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span
              className="text-sm font-semibold text-white"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              <span className="text-sky-400">&gt;</span> Sandeep Konda
            </span>
            <span className="text-xs text-slate-700">
              Cloud Operations Engineer → DevOps Engineering
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer"
              aria-label="GitHub" className="text-slate-700 hover:text-slate-400 transition-colors">
              <GithubIcon size={16} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn" className="text-slate-700 hover:text-slate-400 transition-colors">
              <LinkedinIcon size={16} />
            </a>
            <a href={`mailto:${profile.email}`}
              aria-label="Email" className="text-slate-700 hover:text-slate-400 transition-colors">
              <Mail size={16} />
            </a>
            <a href={profile.resumePath} target="_blank" rel="noopener noreferrer"
              aria-label="Resume" className="text-slate-700 hover:text-slate-400 transition-colors">
              <FileText size={16} />
            </a>
          </div>

          <p className="text-xs text-slate-800">© 2026 Sandeep Konda</p>
        </div>
      </div>
    </footer>
  )
}
