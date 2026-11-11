
export interface Certification {
  title: string;
  code: string;
  issuer: string;
  level: string;
  description: string;
  credentialUrl?: string;
  color: string;
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    code: "SAA",
    issuer: "Amazon Web Services (AWS)",
    level: "Associate",
    description:
      "Validates expertise in designing secure, resilient, high-performing, and cost-optimized application architectures on Amazon Web Services.",
    color: "#ff9900",
  },
  {
    title: "Microsoft Certified: Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    level: "Fundamentals",
    description:
      "Validates foundational knowledge of cloud concepts, Azure services, cloud security, compliance, pricing, and support.",
    color: "#0078d4",
  },
];
