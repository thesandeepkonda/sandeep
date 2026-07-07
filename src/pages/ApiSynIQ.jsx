import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag, Terminal } from 'lucide-react';
import CommentSection from '../components/CommentSection';

export default function ApiSynIQ() {
  const navigate = useNavigate();

  const code = `@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity<CourseResponse> createCourse(
            @RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.createCourse(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourse(
            @PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourse(id));
    }
}`;

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">

        <button
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18}/> Back to Blogs
        </button>

        <motion.section initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
            <Terminal size={16}/> $ cat lms-backend.md
          </div>

          <h1 className="text-4xl font-black mb-4">
            Learning Management System (LMS) — Java Backend Development
          </h1>

          <p className="text-slate-600 text-lg mb-6">
            I developed the backend of a Learning Management System using Java,
            Spring Boot, Spring Security, Hibernate, JPA and MySQL. The project
            exposes secure REST APIs for course management, student enrollment,
            assignments, quizzes and progress tracking.
          </p>

          <div className="flex gap-4 text-sm text-slate-500 flex-wrap">
            <span><Calendar size={14} className="inline"/> July 2026</span>
            <span><User size={14} className="inline"/> Your Name</span>
            <span><Clock size={14} className="inline"/> 8 min read</span>
          </div>
        </motion.section>

        <div className="bg-white rounded-2xl border mt-8 p-10">
          <h2 className="text-2xl font-bold mb-4">What is the LMS Backend?</h2>

          <p className="text-slate-600">
            This project focuses on developing the complete Java backend for a
            Learning Management System. I implemented REST APIs for user
            authentication, course creation, instructor management, student
            enrollment, assignments, quizzes, attendance and learning progress.
            The application follows a layered architecture using Spring Boot,
            Spring Data JPA, Hibernate and MySQL with JWT-based authentication.
          </p>

          <div className="my-6 p-4 bg-blue-50 border rounded-xl">
            <h3 className="font-bold text-blue-700">🎯 KEY FEATURE</h3>
            <p>
              Developed scalable Java backend services with Spring Boot, JWT,
              role-based authorization, validation, exception handling and
              database integration.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">Architecture</h2>

          <p className="text-slate-600 mb-6">
            Client → Spring Boot REST APIs → Service Layer → Repository Layer
            (JPA/Hibernate) → MySQL Database secured with Spring Security and JWT.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              '👨‍🎓 Student Module',
              '📚 Course Module',
              '📝 Assignment Module',
              '🔒 Security'
            ].map(item=>(
              <div key={item} className="bg-slate-50 p-4 rounded-xl text-center border">
                {item}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Code Example</h2>

          <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl overflow-auto">
            {code}
          </pre>

          <div className="my-6 p-4 bg-blue-50 border rounded-xl">
            <h3 className="font-bold text-blue-700">🎯 KEY TAKEAWAY</h3>
            <p>
              This project demonstrates my experience building enterprise Java
              backend applications using Spring Boot, REST APIs, Hibernate,
              MySQL, JWT authentication and clean layered architecture.
            </p>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16}/> TAGS
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                'Java','Spring Boot','Spring Security','JWT',
                'REST API','Hibernate','JPA','MySQL','LMS'
              ].map(tag=>(
                <span key={tag} className="px-3 py-1 border rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <CommentSection postId={2}/>
      </div>
    </div>
  );
}
