// App.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

// Canvas Network Component (enhanced 2D interactive background)
const CanvasNetwork = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(120, Math.floor((width * height) / 9000));
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 1.0,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          baseColor: `hsl(${Math.random() * 60 + 150}, 85%, 60%)`,
        });
      }
      particlesRef.current = particles;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.7;
      
      // Draw connections with enhanced glow
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 150) * 0.4;
            ctx.strokeStyle = `rgba(0, 255, 200, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }
      
      particlesRef.current.forEach(p => {
        if (mouseRef.current.x && mouseRef.current.y) {
          const dxMouse = p.x - mouseRef.current.x;
          const dyMouse = p.y - mouseRef.current.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - distMouse) / mouseRef.current.radius;
            p.vx += dxMouse * 0.002 * force;
            p.vy += dyMouse * 0.002 * force;
          }
        }
        
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        
        p.vx *= 0.99;
        p.vy *= 0.99;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffcc';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    resize();
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="canvas-bg" />;
};

// Floating Icons Component
const FloatingIcons = () => {
  const icons = ['☸️', '🐳', '⚙️', '☕', '🍃', '📨', '☁️', '🔷', '📊'];
  return (
    <div className="floating-icons">
      {icons.map((icon, i) => (
        <div key={i} className="floating-icon" style={{ animationDelay: `${i * 2}s`, top: `${20 + (i * 7) % 70}%`, left: `${5 + (i * 12) % 90}%` }}>
          {icon}
        </div>
      ))}
    </div>
  );
};

// Live Infrastructure Status Mini Panel
const LiveStatusPanel = () => {
  const [status, setStatus] = useState({ api: 'healthy', db: 'connected', cache: 'online', uptime: '99.99%' });
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus({
        api: Math.random() > 0.9 ? 'degraded' : 'healthy',
        db: 'connected',
        cache: 'online',
        uptime: '99.99%'
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="live-status-panel">
      <div className="status-header">📡 LIVE INFRASTRUCTURE STATUS</div>
      <div className="status-items">
        <span className={`status-dot ${status.api === 'healthy' ? 'green' : 'yellow'}`}></span> API Gateway
        <span className={`status-dot green`}></span> PostgreSQL
        <span className={`status-dot green`}></span> Redis Cache
        <span className="status-uptime">⏱️ {status.uptime} uptime</span>
      </div>
    </div>
  );
};

const DevOpsOpsCenter = () => {
  const [pipelineStep, setPipelineStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [triggering, setTriggering] = useState(false);
  const [buildStatus, setBuildStatus] = useState(null);
  const [githubRepo, setGithubRepo] = useState('thesandeepkonda/sandeep-portfolio');
  const [workflowStatus, setWorkflowStatus] = useState(null);
  const [showRealBuild, setShowRealBuild] = useState(false);
  
  const steps = ['Code Commit', 'Build', 'Test', 'Docker Build', 'Push Registry', 'Deploy K8s'];
  
  // Simulate pipeline run
  const triggerSimulatedBuild = () => {
    setTriggering(true);
    setBuildStatus(null);
    setWorkflowStatus(null);
    setPipelineStep(0);
    setLogs([]);
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setPipelineStep(step);
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] Executing: ${steps[step]}...`, ...prev].slice(0, 6));
        step++;
      } else {
        clearInterval(interval);
        setTriggering(false);
        setBuildStatus('success');
        setLogs(prev => [`✅ [${new Date().toLocaleTimeString()}] Pipeline succeeded!`, ...prev].slice(0, 6));
      }
    }, 800);
  };
  
  // Real GitHub Actions fetch (simulate because browser can't dispatch without token)
  const triggerRealGitHubBuild = async () => {
    setTriggering(true);
    setBuildStatus(null);
    setWorkflowStatus(null);
    try {
      const [owner, repo] = githubRepo.split('/');
      const runsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=1`);
      if (!runsRes.ok) throw new Error('Repo not found or no actions enabled');
      const runs = await runsRes.json();
      if (runs.workflow_runs && runs.workflow_runs.length > 0) {
        const lastRun = runs.workflow_runs[0];
        setWorkflowStatus({
          status: lastRun.status,
          conclusion: lastRun.conclusion,
          url: lastRun.html_url,
          updated_at: lastRun.updated_at
        });
        setBuildStatus(lastRun.conclusion === 'success' ? 'success' : 'failed');
        setLogs(prev => [
          `[${new Date().toLocaleTimeString()}] Fetched GitHub Actions for ${githubRepo}`,
          `Status: ${lastRun.status} | Conclusion: ${lastRun.conclusion || 'pending'}`,
          `View run: ${lastRun.html_url}`,
          ...prev
        ].slice(0, 6));
      } else {
        throw new Error('No workflow runs found');
      }
    } catch (err) {
      setBuildStatus('failed');
      setLogs(prev => [`❌ Error: ${err.message}`, ...prev].slice(0, 6));
    } finally {
      setTriggering(false);
    }
  };
  
  return (
    <div className="devops-ops-center">
      <h2 className="section-title">DevOps <span>Operations Center</span></h2>
      <p className="section-subtitle">CI/CD Pipeline | Container Lifecycle | Infrastructure Monitoring</p>
      
      <div className="pipeline-controls">
        <button onClick={triggerSimulatedBuild} disabled={triggering} className="trigger-btn">
          {triggering ? '⏳ Building...' : '▶️ Trigger Demo Build'}
        </button>
        <label className="real-build-toggle">
          <input type="checkbox" checked={showRealBuild} onChange={(e) => setShowRealBuild(e.target.checked)} />
          Use Real GitHub Actions
        </label>
        {showRealBuild && (
          <div className="github-repo-input">
            <input
              type="text"
              value={githubRepo}
              onChange={(e) => setGithubRepo(e.target.value)}
              placeholder="owner/repo"
              className="repo-input"
            />
            <button onClick={triggerRealGitHubBuild} disabled={triggering} className="trigger-btn small">Fetch Latest Run</button>
          </div>
        )}
      </div>
      
      {buildStatus && (
        <div className={`build-status ${buildStatus}`}>
          {buildStatus === 'success' ? '✅ Pipeline Succeeded' : '❌ Pipeline Failed'}
        </div>
      )}
      
      <div className="pipeline-visualization">
        <div className="pipeline-steps">
          {steps.map((step, idx) => (
            <div key={idx} className={`pipeline-step ${idx === pipelineStep ? 'active' : ''}`}>
              <div className="step-icon">{idx === 0 ? '📝' : idx === 1 ? '🔨' : idx === 2 ? '🧪' : idx === 3 ? '🐳' : idx === 4 ? '📦' : '☸️'}</div>
              <div className="step-name">{step}</div>
              {idx < steps.length - 1 && <div className={`step-connector ${idx < pipelineStep ? 'completed' : ''}`}></div>}
            </div>
          ))}
        </div>
        <div className="pipeline-log">
          <div className="log-header">📋 Pipeline Execution Log</div>
          <div className="log-content">
            {logs.map((log, i) => <div key={i} className="log-line">{log}</div>)}
          </div>
        </div>
      </div>
      
      {/* Git Commands Section */}
      <div className="git-commands-section">
        <h3>📦 Git → CI/CD Pipeline Trigger</h3>
        <pre className="git-commands-demo">
          <code>
            $ git add .{'\n'}
            $ git commit -m "feat: update backend service"{'\n'}
            $ git push origin main{'\n'}
            {'\n'}
            &gt; Push detected → Jenkins/GitHub Action automatically starts pipeline
          </code>
        </pre>
        <div className="pipeline-flow-demo">
          <span className="cmd-step">git push</span> → 
          <span className="cmd-step">webhook</span> → 
          <span className="cmd-step">CI/CD trigger</span> → 
          <span className="cmd-step">deploy</span>
        </div>
      </div>
      
      {/* Docker & K8s sections (unchanged) */}
      <div className="container-lifecycle">
        <div className="lifecycle-title">🐳 Docker Container Lifecycle</div>
        <div className="lifecycle-steps-basic">
          <span className="lifecycle-badge">docker build</span> → 
          <span className="lifecycle-badge">docker tag</span> → 
          <span className="lifecycle-badge">docker push</span> → 
          <span className="lifecycle-badge">docker run</span>
        </div>
        <div className="lifecycle-note">Image → Registry → Container</div>
      </div>
      
      <div className="k8s-cluster-visual-basic">
        <div className="k8s-title">☸️ Kubernetes Cluster (simple view)</div>
        <div className="cluster-simple">
          <div className="control-plane-simple">Control Plane (API Server, Scheduler)</div>
          <div className="worker-simple">Worker Nodes: 3 active, 12 pods total</div>
        </div>
      </div>
      
      <div className="monitoring-cards">
        <div className="monitor-card">🖥️ CPU Usage<br/><span className="metric-value">42%</span><div className="progress-bar"><div style={{width: '42%'}}></div></div></div>
        <div className="monitor-card">💾 Memory Usage<br/><span className="metric-value">68%</span><div className="progress-bar"><div style={{width: '68%'}}></div></div></div>
        <div className="monitor-card">🌐 Network I/O<br/><span className="metric-value">1.2 Gbps</span><div className="progress-bar"><div style={{width: '55%'}}></div></div></div>
      </div>
    </div>
  );
};

const AwsCloudTasks = () => {
  const [awsCommand, setAwsCommand] = useState('');
  const [awsOutput, setAwsOutput] = useState('');
  const runAwsCommand = () => {
    if (!awsCommand.trim()) return;
    const outputs = {
      'ec2 describe-instances': '{\n  "Reservations": [\n    {\n      "Instances": [\n        {\n          "InstanceId": "i-1234567890abcdef0",\n          "State": {"Name": "running"},\n          "InstanceType": "t3.micro"\n        }\n      ]\n    }\n  ]\n}',
      's3 ls': '2025-05-22 15:30:12 my-app-bucket\n2025-05-21 10:15:03 logs-bucket',
      'lambda list-functions': '{\n  "Functions": [\n    {"FunctionName": "api-handler", "Runtime": "java17", "State": "Active"},\n    {"FunctionName": "payment-processor", "Runtime": "java17", "State": "Active"}\n  ]\n}',
      'eks list-clusters': '{\n  "clusters": ["production-eks", "staging-eks"]\n}'
    };
    const output = outputs[awsCommand.toLowerCase()] || `Command '${awsCommand}' executed successfully (simulated).`;
    setAwsOutput(output);
  };
  return (
    <div className="aws-cloud-tasks">
      <h2 className="section-title">AWS <span>Cloud Tasks</span></h2>
      <p className="section-subtitle">Simulated AWS CLI commands for common infrastructure operations</p>
      <div className="aws-console">
        <div className="aws-command-line">
          <span className="aws-prompt">$ aws</span>
          <input
            type="text"
            value={awsCommand}
            onChange={(e) => setAwsCommand(e.target.value)}
            placeholder="ec2 describe-instances | s3 ls | lambda list-functions | eks list-clusters"
            className="aws-input"
          />
          <button onClick={runAwsCommand} className="btn-primary small">▶️ Execute</button>
        </div>
        {awsOutput && <pre className="aws-output">{awsOutput}</pre>}
      </div>
      <div className="aws-quick-actions">
        <button onClick={() => setAwsCommand('ec2 describe-instances')} className="quick-cmd">EC2 Instances</button>
        <button onClick={() => setAwsCommand('s3 ls')} className="quick-cmd">S3 Buckets</button>
        <button onClick={() => setAwsCommand('lambda list-functions')} className="quick-cmd">Lambda Functions</button>
        <button onClick={() => setAwsCommand('eks list-clusters')} className="quick-cmd">EKS Clusters</button>
      </div>
    </div>
  );
};


// Java Backend Engineering Showcase
const JavaBackendShowcase = () => {
  const [activeCode, setActiveCode] = useState('spring');
  const codeSnippets = {
    spring: `@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }
}`,
    docker: `FROM openjdk:17-jdk-slim
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    k8s: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-boot-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: myapp:latest
        ports:
        - containerPort: 8080`
  };
  
  return (
    <div className="java-backend-showcase">
      <h2 className="section-title">Java Backend <span>Engineering</span></h2>
      <p className="section-subtitle">Spring Boot | Microservices | API Architecture | Enterprise Patterns</p>
      
      <div className="backend-architecture">
        <div className="arch-diagram">
          <div className="arch-layer">🌐 Client → API Gateway → Load Balancer</div>
          <div className="arch-layer">🔐 Auth Service (JWT) → Core Service → Data Layer</div>
          <div className="arch-layer">🗄️ PostgreSQL (Primary) | Redis Cache | Kafka Queue</div>
        </div>
      </div>
      
      <div className="code-showcase">
        <div className="code-tabs">
          <button className={`code-tab ${activeCode === 'spring' ? 'active' : ''}`} onClick={() => setActiveCode('spring')}>Spring Boot REST API</button>
          <button className={`code-tab ${activeCode === 'docker' ? 'active' : ''}`} onClick={() => setActiveCode('docker')}>Dockerfile</button>
          <button className={`code-tab ${activeCode === 'k8s' ? 'active' : ''}`} onClick={() => setActiveCode('k8s')}>K8s Deployment</button>
        </div>
        <pre className="code-block">
          <code>{codeSnippets[activeCode]}</code>
        </pre>
      </div>
      
      <div className="microservices-grid">
        <div className="ms-card">🔄 API Gateway</div>
        <div className="ms-card">👤 User Service</div>
        <div className="ms-card">📦 Order Service</div>
        <div className="ms-card">💳 Payment Service</div>
        <div className="ms-card">📨 Notification</div>
        <div className="ms-card">📊 Analytics</div>
      </div>
    </div>
  );
};

// Interactive API Playground
const ApiPlayground = () => {
  const [endpoint, setEndpoint] = useState('/api/health');
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const endpoints = {
    'GET /api/health': { status: 200, data: { status: 'healthy', uptime: '99.99%', version: '2.1.0' } },
    'GET /api/users': { status: 200, data: { users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }], total: 2 } },
    'POST /api/deploy': { status: 202, data: { deploymentId: 'dep-12345', status: 'in_progress', message: 'Deployment initiated' } },
    'GET /api/metrics': { status: 200, data: { cpu: 42, memory: 68, requests: 1542, errors: 3 } },
    'POST /api/auth/login': { status: 200, data: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', expiresIn: 3600 } }
  };
  
  const handleCall = async () => {
    setLoading(true);
    setTimeout(() => {
      const key = `${method} ${endpoint}`;
      setResponse(endpoints[key] || { status: 404, data: { error: 'Endpoint not found' } });
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="api-playground">
      <h2 className="section-title">Interactive <span>API Experience</span></h2>
      <p className="section-subtitle">Test endpoints | Simulate requests | Explore backend responses</p>
      
      <div className="playground-container">
        <div className="api-controls">
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="method-select">
            <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
          </select>
          <select value={endpoint} onChange={(e) => setEndpoint(e.target.value)} className="endpoint-select">
            <option>/api/health</option><option>/api/users</option><option>/api/deploy</option>
            <option>/api/metrics</option><option>/api/auth/login</option>
          </select>
          <button onClick={handleCall} className="api-call-btn" disabled={loading}>{loading ? '⏳ Sending...' : '🚀 Execute Request'}</button>
        </div>
        
        <div className="api-response">
          <div className="response-header">📬 Response</div>
          {response ? (
            <pre className="response-body">{JSON.stringify(response, null, 2)}</pre>
          ) : (
            <div className="response-placeholder">Click execute to see API response</div>
          )}
        </div>
        
        <div className="api-animation">
          <div className={`request-flow ${loading ? 'active' : ''}`}>
            <span>📤 Request → </span>
            <span className={`status-dot ${response?.status === 200 ? 'green' : 'red'}`}></span>
            <span> ← Response ({response?.status || '---'})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// System Architecture Section (simplified)
const SystemArchitecture = () => {
  return (
    <div className="system-architecture">
      <h2 className="section-title">System Architecture <span>& Scalability</span></h2>
      <p className="section-subtitle">High-availability design | Auto-scaling | Event-driven | Caching strategies</p>
      
      {/* SIMPLIFIED ARCHITECTURE DIAGRAM */}
      <div className="arch-diagram-simple">
        <div className="arch-tier-simple">🌐 CDN / DNS (Route53)</div>
        <div className="arch-tier-simple">⚖️ Load Balancer (ALB/Nginx)</div>
        <div className="arch-tier-simple">🛡️ WAF & API Gateway</div>
        <div className="arch-tier-simple">📦 Application Services (3 replicas)</div>
        <div className="arch-tier-simple">🗄️ Data Layer: PostgreSQL + Redis + Kafka</div>
      </div>
      
      <div className="scaling-simulation">
        <div className="scaling-title">⚡ Auto-scaling Simulation</div>
        <div className="scaling-bars">
          <div className="scaling-bar" style={{height: '40px'}}>2 pods</div>
          <div className="scaling-bar" style={{height: '80px'}}>5 pods</div>
          <div className="scaling-bar" style={{height: '120px'}}>10 pods</div>
          <div className="scaling-bar" style={{height: '60px'}}>3 pods</div>
        </div>
        <div className="scaling-metrics">Load Average: 65% | Current Replicas: 8 | Scaling Threshold: 70%</div>
      </div>
    </div>
  );
};

// DevOps Dashboard
const DevOpsDashboard = () => {
  const [metrics, setMetrics] = useState({ cpu: 42, memory: 68, pods: 12, deployments: 24, errors: 2 });
  const [logFeed, setLogFeed] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(30 + Math.random() * 40),
        memory: Math.floor(50 + Math.random() * 30),
        pods: 10 + Math.floor(Math.random() * 8),
        deployments: 24 + Math.floor(Math.random() * 5),
        errors: Math.floor(Math.random() * 5)
      });
      setLogFeed(prev => [`[${new Date().toLocaleTimeString()}] INFO: Scraping metrics...`, ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="devops-dashboard">
      <h2 className="section-title">Real-time <span>DevOps Dashboard</span></h2>
      <p className="section-subtitle">Service health | Deployment tracking | Infrastructure monitoring</p>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-title">🖥️ CPU Usage</div>
          <div className="big-metric">{metrics.cpu}%</div>
          <div className="progress-bar"><div style={{width: `${metrics.cpu}%`}}></div></div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">💾 Memory Usage</div>
          <div className="big-metric">{metrics.memory}%</div>
          <div className="progress-bar"><div style={{width: `${metrics.memory}%`}}></div></div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">☸️ Running Pods</div>
          <div className="big-metric">{metrics.pods}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">🚀 Deployments</div>
          <div className="big-metric">{metrics.deployments}</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">⚠️ Error Rate</div>
          <div className="big-metric">{metrics.errors}/min</div>
        </div>
        <div className="dashboard-card">
          <div className="card-title">📋 Live Log Feed</div>
          <div className="log-feed">{logFeed.map((log, i) => <div key={i}>{log}</div>)}</div>
        </div>
      </div>
    </div>
  );
};
<AwsCloudTasks />

// Professional Experience Timeline
const ExperienceTimeline = () => {
  const experiences = [
    { year: '2024-Present', title: 'Senior DevOps Engineer', company: 'CloudTech Solutions', tech: 'AWS, K8s, Terraform, Jenkins', metrics: 'Scaled infra to 500k req/sec, 99.99% uptime' },
    { year: '2022-2024', title: 'Java Backend Developer', company: 'FinTech Corp', tech: 'Spring Boot, Kafka, PostgreSQL, Redis', metrics: 'Built microservices handling 1M+ daily transactions' },
    { year: '2020-2022', title: 'Cloud Engineer', company: 'StartupX', tech: 'Docker, CI/CD, AWS Lambda, API Gateway', metrics: 'Reduced deployment time by 70%' }
  ];
  
  return (
    <div className="experience-timeline">
      <h2 className="section-title">Engineering <span>Timeline</span></h2>
      <p className="section-subtitle">Projects | Deployments | Infrastructure milestones</p>
      
      <div className="timeline">
        {experiences.map((exp, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-year">{exp.year}</div>
            <div className="timeline-content">
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
              <div className="timeline-tech">{exp.tech}</div>
              <div className="timeline-metrics">📊 {exp.metrics}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Advanced Tech Stack
const AdvancedTechStack = () => {
  const categories = [
    { name: 'Java Backend', items: ['Java 17+', 'Spring Boot', 'Hibernate', 'Microservices', 'JUnit'], icon: '☕' },
    { name: 'DevOps & CI/CD', items: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD', 'Helm'], icon: '⚙️' },
    { name: 'Container & Orchestration', items: ['Docker', 'Kubernetes', 'Docker Swarm', 'Podman', 'Containerd'], icon: '🐳' },
    { name: 'Cloud Platforms', items: ['AWS', 'Azure', 'GCP', 'DigitalOcean', 'Linode'], icon: '☁️' },
    { name: 'Infrastructure as Code', items: ['Terraform', 'Ansible', 'Pulumi', 'CloudFormation', 'Chef'], icon: '🏗️' },
    { name: 'Monitoring & Observability', items: ['Prometheus', 'Grafana', 'ELK Stack', 'Datadog', 'New Relic'], icon: '📊' },
    { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'DynamoDB'], icon: '🗄️' }
  ];
  
  return (
    <div className="advanced-tech-stack">
      <h2 className="section-title">Advanced <span>Tech Stack</span></h2>
      <p className="section-subtitle">Enterprise-grade technologies powering modern infrastructure</p>
      
      <div className="tech-categories">
        {categories.map((cat, i) => (
          <div key={i} className="tech-category-card">
            <div className="tech-cat-icon">{cat.icon}</div>
            <h3>{cat.name}</h3>
            <div className="tech-items">
              {cat.items.map((item, j) => <span key={j} className="tech-badge">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navbarBg, setNavbarBg] = useState('rgba(3, 3, 12, 0.85)');
  const [formStatus, setFormStatus] = useState({ show: false, message: '', isError: false });
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [terminalLines, setTerminalLines] = useState([]);
  const [terminalCursor, setTerminalCursor] = useState(true);
  
  const lastScrollY = useRef(0);
  const lineIndexRef = useRef(0);
  const sectionsRef = useRef([]);

  // Terminal content data
  const terminalJsonLines = [
    '{',
    '  <span class="term-key">"name"</span>: <span class="term-string">"Sandeep Konda"</span>,',
    '  <span class="term-key">"roles"</span>: [<span class="term-string">"DevOps Engineer"</span>, <span class="term-string">"Java Backend Developer"</span>],',
    '  <span class="term-key">"expertise"</span>: <span class="term-string">"AWS, Spring Boot, CI/CD, K8s, Kafka"</span>,',
    '  <span class="term-key">"status"</span>: <span class="term-string">"200 OK (active)"</span>',
    '}'
  ];

  // Typewriter effect
  useEffect(() => {
    let interval;
    const startTyping = setTimeout(() => {
      lineIndexRef.current = 0;
      setTerminalLines([]);
      interval = setInterval(() => {
        if (lineIndexRef.current < terminalJsonLines.length) {
          setTerminalLines(prev => [...prev, terminalJsonLines[lineIndexRef.current]]);
          lineIndexRef.current++;
        } else {
          clearInterval(interval);
        }
      }, 70);
    }, 500);
    
    const cursorInterval = setInterval(() => setTerminalCursor(c => !c), 550);
    return () => {
      clearTimeout(startTyping);
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      if (window.scrollY > 50) {
        setNavbarBg('rgba(3, 3, 12, 0.92)');
      } else {
        setNavbarBg('rgba(3, 3, 12, 0.85)');
      }
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = window.scrollY;
      
      sectionsRef.current.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) section.classList.add('revealed');
        }
      });
    };

    const setSections = () => {
      const sections = document.querySelectorAll('.section');
      sectionsRef.current = sections;
      handleScroll();
    };
    
    window.addEventListener('scroll', handleScroll);
    setSections();
    window.addEventListener('resize', setSections);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setSections);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setFormStatus({ show: true, message: '🔄 Processing payload...', isError: false });
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus({ show: true, message: '✅ { "status": "success", "message": "Payload delivered." }', isError: false });
        form.reset();
        setTimeout(() => setFormStatus(prev => ({ ...prev, show: false })), 4000);
      } else {
        setFormStatus({ show: true, message: '⚠️ { "status": "error", "code": "try to mail: kondasandeep56@gmail.com" }', isError: true });
      }
    } catch (error) {
      setFormStatus({ show: true, message: '❌ { "status": "error", "message": "Network Timeout" }', isError: true });
    }
  };

  const techItems = [
    { name: "Java", icon: "☕" }, { name: "Spring Boot", icon: "🍃" }, { name: "Apache Kafka", icon: "📨" },
    { name: "RabbitMQ", icon: "🐇" }, { name: "Docker", icon: "🐳" }, { name: "Kubernetes", icon: "☸️" },
    { name: "AWS", icon: "☁️" }, { name: "Azure", icon: "🔷" }, { name: "Jenkins", icon: "⚙️" },
    { name: "Terraform", icon: "🏗️" }, { name: "Git", icon: "📦" }, { name: "Prometheus", icon: "📊" }
  ];
  const duplicatedTech = [...techItems, ...techItems];

  return (
    <div className="app">
      <CanvasNetwork />
      <FloatingIcons />
      <div className="bg-animation"></div>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

      <nav className={`navbar ${!isNavbarVisible ? 'navbar-hidden' : ''}`} style={{ background: navbarBg }}>
        <div className="container nav-content">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="logo">
            Sandeep<span>Konda</span>
          </a>
          <ul className="nav-menu">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-link">Home</a></li>
            <li><a href="#devops" onClick={(e) => { e.preventDefault(); scrollToSection('devops'); }} className="nav-link">DevOps</a></li>
            <li><a href="#backend" onClick={(e) => { e.preventDefault(); scrollToSection('backend'); }} className="nav-link">Backend</a></li>
            <li><a href="#tech" onClick={(e) => { e.preventDefault(); scrollToSection('tech'); }} className="nav-link">Stack</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero section revealed">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-subtitle">~$ whoami</div>
            <h1 className="hero-title">Building Scalable<br/>Backend Systems.</h1>
            <p className="hero-description">
              DevOps Engineer & Java Backend Architect specializing in cloud-native infrastructure, CI/CD automation, and high-performance microservices.
            </p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('devops')} className="btn btn-primary">Explore Infrastructure</button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">Connect →</button>
            </div>
            <LiveStatusPanel />
          </div>
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
              <div className="terminal-title">bash - root@aws-prod-server</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-line"><span className="term-command">$ curl -X GET https://api.sandeep.dev/v1/profile</span></div>
              {terminalLines.map((line, idx) => (
                <div key={idx} className="terminal-line" dangerouslySetInnerHTML={{ __html: line }}></div>
              ))}
              {terminalLines.length < terminalJsonLines.length && <span className="cursor"></span>}
              {terminalLines.length === terminalJsonLines.length && terminalCursor && <span className="cursor"></span>}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <div className="metrics-banner">
        <div className="container metrics-grid">
          <div className="metric"><div className="metric-value"><div className="pulse"></div> 99.99%</div><div className="metric-label">System Uptime</div></div>
          <div className="metric"><div className="metric-value">42ms</div><div className="metric-label">Avg API Latency</div></div>
          <div className="metric"><div className="metric-value">500k+</div><div className="metric-label">Daily Requests</div></div>
          <div className="metric"><div className="metric-value">50+</div><div className="metric-label">Deployments/Month</div></div>
        </div>
      </div>

      {/* Rotating Tech Logos */}
      <div className="tech-slider-section">
        <div className="container">
          <div className="slider-container">
            <div className="slider-track">
              {duplicatedTech.map((tech, idx) => (
                <div key={idx} className="tech-item"><span className="tech-icon">{tech.icon}</span><span>{tech.name}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Section (original CI/CD pipeline - UNCHANGED) */}
      <section id="architecture" className="section">
        <div className="container">
          <h2 className="section-title">Deployment <span>Architecture</span></h2>
          <div className="pipeline-container">
            <div className="pipeline-header">Standard CI/CD Lifecycle</div>
            <div className="pipeline-flow">
              <div className="pipeline-node"><div className="node-icon">💻</div><div className="node-label">1. Code (Git)</div></div>
              <div className="pipeline-connector"><div className="connector-progress"></div></div>
              <div className="pipeline-node"><div className="node-icon">🛡️</div><div className="node-label">2. SAST (Sonar)</div></div>
              <div className="pipeline-connector"><div className="connector-progress" style={{ animationDelay: '0.2s' }}></div></div>
              <div className="pipeline-node"><div className="node-icon">⚙️</div><div className="node-label">3. Build (Jenkins)</div></div>
              <div className="pipeline-connector"><div className="connector-progress" style={{ animationDelay: '0.4s' }}></div></div>
              <div className="pipeline-node"><div className="node-icon">🐳</div><div className="node-label">4. Image (Docker)</div></div>
              <div className="pipeline-connector"><div className="connector-progress" style={{ animationDelay: '0.6s' }}></div></div>
              <div className="pipeline-node"><div className="node-icon">☁️</div><div className="node-label">5. Deploy (K8s/AWS)</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: DevOps Operations Center */}
      <section id="devops" className="section">
        <div className="container">
          <DevOpsOpsCenter />
        </div>
      </section>

      {/* NEW: Java Backend Engineering Showcase */}
      <section id="backend" className="section">
        <div className="container">
          <JavaBackendShowcase />
        </div>
      </section>

      {/* NEW: Interactive API Playground */}
      <section className="section">
        <div className="container">
          <ApiPlayground />
        </div>
      </section>

      {/* NEW: System Architecture (simplified) */}
      <section className="section">
        <div className="container">
          <SystemArchitecture />
        </div>
      </section>

      {/* NEW: DevOps Dashboard */}
      <section className="section">
        <div className="container">
          <DevOpsDashboard />
        </div>
      </section>

      {/* NEW: Experience Timeline */}
      <section className="section">
        <div className="container">
          <ExperienceTimeline />
        </div>
      </section>

      {/* NEW: Advanced Tech Stack */}
      <section id="tech" className="section">
        <div className="container">
          <AdvancedTechStack />
        </div>
      </section>

      {/* Original Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title">Production <span>Deployments</span></h2>
          <div className="projects-grid">
            <div className="project-card"><div className="project-header"><div className="project-icon">🛒</div><h3 className="project-title">E-Commerce Pricing Engine</h3></div><div className="project-content"><p className="project-description">Spring Boot backend handling multi-vendor cart calculations and tax compliance.</p><div className="project-tech"><span className="tech-tag">Java</span><span className="tech-tag">Spring Boot</span><span className="tech-tag">PostgreSQL</span></div></div></div>
            <div className="project-card"><div className="project-header"><div className="project-icon">🌊</div><h3 className="project-title">API Gateway & Routing Layer</h3></div><div className="project-content"><p className="project-description">Centralized Spring Cloud Gateway with JWT validation, rate limiting, circuit breakers.</p><div className="project-tech"><span className="tech-tag">Spring Cloud Gateway</span><span className="tech-tag">Resilience4j</span><span className="tech-tag">Docker</span></div></div></div>
            <div className="project-card"><div className="project-header"><div className="project-icon">⚡</div><h3 className="project-title">Serverless Cloud Backend</h3></div><div className="project-content"><p className="project-description">AWS serverless components with Lambda, API Gateway, DynamoDB, CloudFront.</p><div className="project-tech"><span className="tech-tag">AWS Lambda</span><span className="tech-tag">DynamoDB</span><span className="tech-tag">API Gateway</span></div></div></div>
            <div className="project-card"><div className="project-header"><div className="project-icon">☸️</div><h3 className="project-title">K8s Microservices Platform</h3></div><div className="project-content"><p className="project-description">Scalable Kubernetes platform with Jenkins CI/CD, Prometheus & Grafana monitoring.</p><div className="project-tech"><span className="tech-tag">Kubernetes</span><span className="tech-tag">Jenkins</span><span className="tech-tag">Grafana</span></div></div></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Establish <span>Connection</span></h2>
          <div className="contact-content">
            <div><h3 style={{ color: '#fff', marginBottom: '20px' }}>// Open Ports</h3><p style={{ color: '#bbb', marginBottom: '30px' }}>Looking to architect a backend, optimize cloud infrastructure, or automate pipelines? Send a payload.</p><div style={{ fontFamily: "'Fira Code', monospace", color: '#ccc', lineHeight: 2 }}><div><span style={{ color: '#00ffaa' }}>email:</span> kondasandeep56@gmail.com</div><div><span style={{ color: '#00ffaa' }}>location:</span> Hyderabad, TS, India</div><div><span style={{ color: '#00ffaa' }}>status:</span> Available for opportunities</div></div><a href="https://wa.me/+918008806996" className="whatsapp-button" target="_blank" rel="noopener noreferrer">[ Execute WhatsApp Chat ]</a></div>
            <div className="contact-form"><form action="https://formspree.io/f/xbjnqzzk" method="POST" onSubmit={handleSubmit}><div className="form-group"><label htmlFor="name">req.body.name</label><input type="text" id="name" name="name" required /></div><div className="form-group"><label htmlFor="email">req.body.email</label><input type="email" id="email" name="email" required /></div><div className="form-group"><label htmlFor="message">req.body.message</label><textarea id="message" name="message" rows="4" required></textarea></div><button type="submit" className="submit-btn">POST /api/message</button>{formStatus.show && (<div id="statusMessage" style={{ marginTop: '16px', fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', color: formStatus.isError ? '#ff8a7a' : '#aaffdd' }}>{formStatus.message}</div>)}</form></div>
          </div>
        </div>
      </section>

      <footer className="footer"><div className="container"><p>System maintained by Sandeep Konda © 2025</p><div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '20px' }}><a href="https://github.com/thesandeepkonda" target="_blank" rel="noopener noreferrer" style={{ color: '#ccf', textDecoration: 'none' }}>GitHub</a><a href="https://www.linkedin.com/in/sandeepkonda07" target="_blank" rel="noopener noreferrer" style={{ color: '#ccf', textDecoration: 'none' }}>LinkedIn</a></div></div></footer>
    </div>
  );
};

export default App;