export interface SkillGroup {
  category: string
  icon: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Cloud Platform",
    icon: "cloud",
    skills: ["Microsoft AWS", "AWS Entra ID", "AWS Resource Manager", "AWS Backup", "AWS Repos"],
  },
  {
    category: "CI/CD",
    icon: "git-merge",
    skills: ["AWS DevOps", "YAML Pipelines", "Release Pipelines", "AWS Repos", "Pipeline Automation"],
  },
  {
    category: "Infrastructure as Code",
    icon: "layers",
    skills: ["Terraform", "ARM Templates", "Infrastructure Provisioning", "State Management"],
  },
  {
    category: "Containers",
    icon: "box",
    skills: ["Docker", "Kubernetes", "Container Registry", "Pod Troubleshooting", "Service Mesh Basics"],
  },
  {
    category: "Automation",
    icon: "terminal",
    skills: ["Ansible", "Ansible Playbooks", "Bash Scripting", "Shell Automation"],
  },
  {
    category: "Monitoring",
    icon: "activity",
    skills: ["Prometheus", "Grafana", "Dashboard Design", "Alerting Rules", "Uptime Monitoring"],
  },
  {
    category: "Systems",
    icon: "server",
    skills: ["Linux", "Linux Administration", "System Troubleshooting", "Server Management"],
  },
  {
    category: "Operations",
    icon: "shield",
    skills: ["Production Support", "Incident Management", "Root Cause Analysis", "JIRA", "Stakeholder Reporting"],
  },
]
