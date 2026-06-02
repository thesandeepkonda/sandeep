// src/components/BlogList.jsx
import React, { useState, useMemo } from 'react';
import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '../data/blogData.js'; // You'll create this file

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Header matching your projects section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 mb-4">
          <BookOpen size={14} className="text-blue-500" />
          <span className="text-xs font-semibold text-blue-700">Insights & Updates</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 sm:text-5xl">Blog</h1>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Stories, case studies, and insights from our engineering and design teams.
        </p>
      </div>

      {/* Search & Filters (same as your projects) */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-white/80 backdrop-blur-sm px-11 py-3.5 text-sm outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-md'
                : 'bg-white/70 text-slate-600 border border-slate-200 hover:bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <AnimatePresence mode="popLayout">
        {filteredPosts.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={post.id}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1"
              >
                {/* Optional image placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100" />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-slate-500 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                      {post.category}
                    </span>
                    <a href={`/blog/${post.id}`} className="text-sm font-medium text-blue-600 hover:underline inline-flex items-center gap-1">
                      Read more <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500">No posts found. Try adjusting your search.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}