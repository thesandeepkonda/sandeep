import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import About from './pages/About';
import BlogHome from './pages/BlogHome';
import Contact from './pages/Contact';
import ApiSynIQ from './pages/ApiSynIQ';
import KubernetesJava from './pages/KubernetesJava';
import DevOpsPipeline from './pages/DevOpsPipeline';
import MicroservicesJava from './pages/MicroservicesJava';
import Zufeto from './pages/Zufeto';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<BlogHome />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/apisyniq" element={<ApiSynIQ />} />
          <Route path="/blog/kubernetes-java" element={<KubernetesJava />} />
          <Route path="/blog/devops-pipeline" element={<DevOpsPipeline />} />
          <Route path="/blog/microservices-java" element={<MicroservicesJava />} />
          <Route path="/blog/zufeto" element={<Zufeto />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;