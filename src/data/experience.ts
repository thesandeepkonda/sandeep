
export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  areas: {
    title: string;
    description: string;
    tags: string[];
  }[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Anasol Consultancy Services Private Limited",
    role: "Associate Software Engineer",
    location: "Hyderabad, India",
    period: "Jan 2025 – Present",
    current: true,
    areas: [
      {
        title: "AWS Cloud Infrastructure",
        description:
          "Provision and manage AWS infrastructure using Terraform, including VPC, ECS, EC2, RDS PostgreSQL, ALB, S3, CloudFront, Route 53 and ACM.",
        tags: ["AWS", "EC2", "VPC", "ECS", "RDS", "ALB", "S3"],
      },
      {
        title: "Infrastructure as Code",
        description:
          "Implement reusable Terraform modules to automate and standardise AWS resource provisioning with version-controlled infrastructure.",
        tags: ["Terraform", "IaC", "S3 Remote State", "AWS Modules"],
      },
      {
        title: "CI/CD Pipeline Automation",
        description:
          "Build automated GitHub Actions workflows for application builds, Docker image creation, Amazon ECR publishing and ECS deployments.",
        tags: ["GitHub Actions", "CI/CD", "Docker", "ECR"],
      },
      {
        title: "Containerization & Deployment",
        description:
          "Containerise Java Spring Boot applications and deploy workloads on Amazon ECS with EC2-backed capacity, Auto Scaling and ALB health checks.",
        tags: ["Docker", "Spring Boot", "Amazon ECS", "EC2", "Auto Scaling"],
      },
      {
        title: "Networking & Security",
        description:
          "Configure application routing, DNS, SSL/TLS certificates, IAM permissions, security groups and database connectivity.",
        tags: ["ALB", "IAM", "Route 53", "ACM", "CloudFront"],
      },
      {
        title: "Monitoring & Troubleshooting",
        description:
          "Troubleshoot AWS infrastructure, container deployments, networking, database connectivity, CI/CD workflows and application runtime issues.",
        tags: ["CloudWatch", "RDS PostgreSQL", "AWS Networking", "Troubleshooting"],
      },
    ],
  },
  {
    company: "Tanama Software Private Limited",
    role: "Software Engineer",
    location: "India",
    period: "May 2021 – Dec 2022",
    current: false,
    areas: [
      {
        title: "Java Backend Development",
        description:
          "Developed and maintained backend applications using Java and object-oriented programming principles.",
        tags: ["Java", "OOP", "Backend Development"],
      },
      {
        title: "Spring Boot & REST APIs",
        description:
          "Built and integrated RESTful APIs with CRUD operations using Spring Boot and Spring Data JPA.",
        tags: ["Spring Boot", "Spring Data JPA", "REST APIs"],
      },
      {
        title: "Database Development",
        description:
          "Designed and maintained database entities, repository layers and business logic for enterprise applications.",
        tags: ["Hibernate", "JDBC", "SQL", "MySQL"],
      },
      {
        title: "Debugging & Optimization",
        description:
          "Debugged backend issues, optimised SQL queries and improved application performance and reliability.",
        tags: ["Debugging", "SQL Optimization", "Performance"],
      },
      {
        title: "Agile Development",
        description:
          "Collaborated with senior developers in an Agile/Scrum environment to implement backend features and maintain existing applications.",
        tags: ["Agile", "Scrum", "Team Collaboration"],
      },
    ],
  },
];
