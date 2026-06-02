import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Copy, Check, Clock } from 'lucide-react';
import CommentSection from '../components/CommentSection';

// Canvas Network Component (same as above)
const CanvasNetwork = () => { /* ... include the CanvasNetwork code ... */ };

export default function MicroservicesJava() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyCode = () => {
    const code = `@Service
@Slf4j
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        Order order = Order.builder()
            .userId(request.getUserId())
            .productId(request.getProductId())
            .quantity(request.getQuantity())
            .status(OrderStatus.PENDING)
            .build();
        return mapToResponse(orderRepository.save(order));
    }
}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      <CanvasNetwork />
      <div className="bg-animation"></div>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

      <div className="container" style={{ paddingTop: '100px', maxWidth: '900px' }}>
        <button onClick={() => navigate('/blogs')} style={{ background: 'none', border: 'none', color: '#00ffaa', cursor: 'pointer', fontFamily: "'Fira Code', monospace", fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
          <ArrowLeft size={16} /> Back to Blogs
        </button>

        <div className="mb-8">
          <div className="hero-subtitle" style={{ color: '#00ffaa', fontFamily: "'Fira Code', monospace", marginBottom: '10px' }}>$ cat microservices-java.md</div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Building Production-Ready Microservices with Spring Boot</h1>
          <p className="hero-description">Practical guide to building scalable, resilient microservices using Spring Boot, Spring Cloud, and industry best practices.</p>
          
          <div className="live-status-panel">
            <div className="status-header">📄 ARTICLE METADATA</div>
            <div className="status-items">
              <span><Calendar size={12} /> June 1, 2026</span>
              <span><User size={12} /> Sandeep Konda</span>
              <span><Clock size={12} /> 12 min read</span>
            </div>
          </div>
        </div>

        <div className="java-backend-showcase" style={{ padding: '40px' }}>
          <div className="code-showcase">
            <div className="code-tabs"><div className="code-tab active">README.md</div></div>
            <div className="code-block" style={{ padding: '30px' }}>
              <div style={{ color: '#aaffdd', lineHeight: '1.8' }}>
                
                <div className="live-status-panel" style={{ margin: '0 0 30px 0' }}>
                  <div className="status-header">💡 REAL-WORLD EXPERIENCE</div>
                  <div className="status-items">50k+ daily requests | 99.99% uptime | Production-proven patterns</div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', marginBottom: '15px' }}>Why Microservices?</h2>
                <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
                  <li>✓ Independent deployments - Teams deploy without coordination</li>
                  <li>✓ Fault isolation - One service failing doesn't bring down everything</li>
                  <li>✓ Technology flexibility - Each service uses the best tool for the job</li>
                  <li>✓ Scalability - Scale only the services that need it</li>
                </ul>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Service Implementation</h2>
                
                <div className="terminal" style={{ margin: '20px 0' }}>
                  <div className="terminal-header">
                    <div className="terminal-dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                    <div className="terminal-title">OrderService.java</div>
                    <button onClick={copyCode} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>{copied ? <Check size={14} /> : <Copy size={14} />}</button>
                  </div>
                  <div className="terminal-body">
                    <pre style={{ color: '#d0ffd0', margin: 0, fontSize: '12px', fontFamily: "'Fira Code', monospace" }}>{`@Service
@Slf4j
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        Order order = Order.builder()
            .userId(request.getUserId())
            .productId(request.getProductId())
            .quantity(request.getQuantity())
            .status(OrderStatus.PENDING)
            .build();
        return mapToResponse(orderRepository.save(order));
    }
}`}</pre>
                  </div>
                </div>

                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">⚠️ PRODUCTION LESSON</div>
                  <div className="status-items">Always implement retries with exponential backoff and circuit breakers to prevent cascading failures.</div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Best Practices</h2>
                <div className="microservices-grid">
                  <div className="ms-card">✅ Saga Pattern</div>
                  <div className="ms-card">✅ Event Sourcing</div>
                  <div className="ms-card">✅ Circuit Breakers</div>
                  <div className="ms-card">✅ API Gateway</div>
                </div>

                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">🎯 KEY TAKEAWAY</div>
                  <div className="status-items">Start with a monolith, extract microservices when needed. Don't over-engineer from day one.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="microservices-grid" style={{ marginTop: '30px' }}>
            <div className="ms-card" style={{ background: 'rgba(0, 255, 170, 0.1)' }}><Tag size={16} style={{ color: '#00ffaa' }} /> <span style={{ color: '#00ffaa' }}>TAGS</span></div>
            {['Java 17', 'Spring Boot', 'Microservices', 'Docker', 'Kafka', 'Spring Cloud'].map(tag => (<div key={tag} className="ms-card"><span>{tag}</span></div>))}
          </div>

          <CommentSection postId={4} />
        </div>
      </div>
    </div>
  );
}