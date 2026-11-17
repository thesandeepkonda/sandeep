import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Nav from "./components/Nav";
import Footer from "./components/sections/Footer";

// Page Imports
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import CertificationsPage from "./pages/CertificationsPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  useEffect(() => {
    document.title = "Sandeep Konda | AWS Cloud Operations & DevOps Engineer";
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Nav />

        <main className="min-h-screen bg-slate-950">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Redirect unknown routes to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}