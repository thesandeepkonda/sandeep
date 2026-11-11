export type ProjectStatus = "Live" | "Completed" | "In Progress" | "Coming Soon" | "Portfolio Build"

export interface ProjectArch {
  steps: string[]
}

export interface Project {
  id: string
  title: string
  category: string
  status: ProjectStatus
  description: string
  architecture: ProjectArch
  tags: string[]
  repoUrl?: string
  demoUrl?: string
  details?: {
    overview: string
    problem: string
    implementation: string[]
    challenges: string[]
    lessons: string[]
  }
}

export const projects: Project[] = [
  {
    id: "AWS-devops-pipeline",
    title: "AWS DevOps Infrastructure Pipeline",
    category: "CI/CD · Terraform · AWS",
    status: "Portfolio Build",
    description: "A reusable infrastructure deployment workflow demonstrating source control, AWS DevOps CI/CD and Terraform-based AWS infrastructure provisioning.",
    architecture: {
      steps: ["Git Repository", "AWS DevOps", "CI/CD Pipeline", "Terraform Plan", "AWS Infrastructure"],
    },
    tags: ["Git", "AWS DevOps", "YAML", "Terraform", "AWS"],
  },
  {
    id: "containerized-deployment",
    title: "Containerized Application Deployment",
    category: "Docker · Kubernetes",
    status: "Portfolio Build",
    description: "A containerized deployment workflow from application code through Docker image creation, container registry, and Kubernetes orchestration.",
    architecture: {
      steps: ["Application Code", "Docker Build", "Container Registry", "Kubernetes", "Running Workload"],
    },
    tags: ["Docker", "Kubernetes", "Container Registry", "Linux"],
  },
  {
    id: "AWS-monitoring",
    title: "AWS Monitoring & Observability",
    category: "Prometheus · Grafana · Monitoring",
    status: "Portfolio Build",
    description: "An observability stack covering infrastructure metrics collection, Prometheus scraping, and Grafana dashboard visualization with proactive alerting.",
    architecture: {
      steps: ["AWS Infrastructure", "Metrics Collection", "Prometheus", "Grafana", "Dashboards & Alerts"],
    },
    tags: ["Prometheus", "Grafana", "AWS Monitor", "Alerting", "Dashboards"],
  },
  {
    id: "ansible-automation",
    title: "Infrastructure Automation with Ansible",
    category: "Ansible · Linux · Automation",
    status: "Portfolio Build",
    description: "Ansible-based configuration management and automation workflow demonstrating playbook-driven provisioning across multiple Linux targets.",
    architecture: {
      steps: ["Ansible Controller", "Inventory", "Playbooks", "VM-01 / VM-02 / VM-03", "Configured State"],
    },
    tags: ["Ansible", "Linux", "Configuration Management", "Bash", "Automation"],
  },
]
