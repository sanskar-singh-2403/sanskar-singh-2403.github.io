export const profile = {
  name: 'Sanskar Singh',
  role: 'AI Engineer',
  tagline:
    'AI Engineer building agentic systems, knowledge graphs, and ML infrastructure. I like understanding every layer of the stack from first principles.',
  location: 'India',
  github: 'https://github.com/sanskar-singh-2403',
  linkedin: 'https://www.linkedin.com/in/sanskar-singh-bhardwaj-558771227/',
  email: 'sanskarsinghty1234@gmail.com',
  resume: '/resume.pdf',
}

export const experience = [
  {
    company: 'TailoredAI',
    role: 'AI Engineer',
    period: 'Oct 2025 — Present',
    points: [
      'Automating the hiring process at Cognizant with a multi-agent system: a proposal agent that surfaces available candidates for a role, an allocation agent that handles assignment, and an interview agent that conducts live interviews.',
      'Built LLM-led voice interviews on OpenAI Realtime, with structured evaluation flowing back into the allocation pipeline.',
      'Architected the platform around MCP and tool calling, keeping agents composable and every capability exposed as a typed, reusable tool.',
    ],
    tech: ['OpenAI Realtime', 'MCP', 'Tool Calling', 'Agents', 'TypeScript'],
    accent: '#00f0ff',
  },
  {
    company: 'Hyperverge',
    role: 'Software Engineer',
    period: 'Jun 2025 — Oct 2025',
    points: [
      'Owned the OCR service end-to-end — serving 1M+ documents monthly — including the vision-model layer for document understanding.',
      'Built HyperTuring, a self-serve model training pipeline letting users bring their own data and train custom OCR and entity-classification models, cutting model onboarding from weeks to days.',
      'Automated deployments with Ansible for configuration management: baked services into Amazon Machine Images, bootstrapped via user data, and rolled out through AWS Auto Scaling Groups — reducing deployment time by ~60%.',
    ],
    tech: ['OCR', 'Vision Models', 'Ansible', 'AMI', 'AWS ASG', 'Python'],
    accent: '#ffb300',
  },
  {
    company: 'Hyperverge',
    role: 'SDE Intern',
    period: 'Jan 2025 — Jun 2025',
    points: [
      'Built an intelligent CodeLLM agent: source code parsed to ASTs, modeled as a Neo4j knowledge graph, queried with Cypher for semantic code search, Q&A, automated test generation and code reviews.',
      'End-to-end ownership of the India-Verify product — verified identity data via DigiLocker from national databases (PAN, Aadhaar, Voter ID), delivering features and coordinating rolling production deployments.',
    ],
    tech: ['Neo4j', 'Cypher', 'RAG', 'MongoDB', 'AST'],
    accent: '#00ffa3',
  },
  {
    company: 'Sauvant AI',
    role: 'SDE Intern',
    period: 'Apr 2024 — Nov 2024',
    points: [
      'Built a scalable loan origination system from scratch with a microservices architecture, enforced code quality via linters, formatters and CI/CD.',
      'Deployed on AWS EC2 with Auto Scaling Groups and Elastic Load Balancer; custom domain via Route 53 with ACM-backed HTTPS.',
    ],
    tech: ['Express.js', 'Next.js', 'MongoDB', 'AWS EC2', 'ASG/ELB'],
    accent: '#7b5cff',
  },
  {
    company: 'TestRigor',
    role: 'Full Stack Development Intern',
    period: 'Nov 2023 — Apr 2024',
    points: [
      'Designed a custom Language Server Protocol (LSP) over JSON-RPC powering intelligent code suggestions in the team IDE — cut test-authoring time by 20%.',
      'Built an executor service parallelizing tasks across 8 backend instances with Java, Docker and Kubernetes — reduced test execution time by 40%.',
    ],
    tech: ['Java', 'LSP', 'JSON-RPC', 'Docker', 'Kubernetes'],
    accent: '#ff4d8d',
  },
]

export const projects = [
  {
    title: 'Cortex',
    subtitle: 'GraphRAG Knowledge Engine',
    description:
      'Documents in, knowledge graph out. Multi-hop reasoning over a Neo4j graph with cited answers, an MCP server backbone, and a chat interface. Built to understand retrieval from first principles.',
    tech: ['TypeScript', 'Neo4j', 'OpenAI', 'Zod', 'MCP'],
    accent: '#00f0ff',
    link: 'https://github.com/sanskar-singh-2403',
  },
  {
    title: 'Internet From Scratch',
    subtitle: 'Networking, rebuilt in Go',
    description:
      'A book-length project reimplementing the internet stack layer by layer — sockets, DNS, HTTP, TLS — every line written by hand to understand what actually happens on the wire.',
    tech: ['Go', 'TCP/IP', 'DNS', 'HTTP', 'TLS'],
    accent: '#7b5cff',
    link: 'https://github.com/sanskar-singh-2403',
  },
  {
    title: 'CodeLLM Agent',
    subtitle: 'Semantic code intelligence',
    description:
      'Converts entire codebases into ASTs and a Neo4j knowledge graph, enabling Cypher-powered semantic search, automated test generation and AI code review through a light RAG pipeline.',
    tech: ['Neo4j', 'AST', 'Cypher', 'MongoDB', 'RAG'],
    accent: '#00ffa3',
    link: 'https://github.com/sanskar-singh-2403/ai-codellm',
  },
  {
    title: 'Events App',
    subtitle: 'Full-stack event platform',
    description:
      'Create events, sell tickets, get paid — a production-grade Next.js app with Stripe payments, Clerk auth, and advanced tag-based search across events.',
    tech: ['Next.js', 'MongoDB', 'Stripe', 'Clerk', 'Tailwind'],
    accent: '#ffb300',
    link: 'https://github.com/sanskar-singh-2403/events_app',
  },
  {
    title: 'Memories',
    subtitle: 'MERN social platform',
    description:
      'A social media web app for sharing travel experiences — interactive feed with likes, comments, and a Redux-driven UI over an Express + MongoDB backend.',
    tech: ['React', 'Redux', 'Express', 'MongoDB', 'MUI'],
    accent: '#ff4d8d',
    link: 'https://github.com/sanskar-singh-2403/Memories-web-app',
  },
  {
    title: 'Text Summarizer',
    subtitle: 'Seq2seq NLP service',
    description:
      'High-quality abstractive summarization built on the Pegasus transformer — FastAPI backend serving Hugging Face sequence-to-sequence inference behind a clean web UI.',
    tech: ['Pegasus', 'FastAPI', 'Transformers', 'Python'],
    accent: '#b400ff',
    link: 'https://github.com/sanskar-singh-2403/text_summarizer',
  },
]

export const stats = [
  { value: '5', label: 'Roles across AI agents, ML infra, fintech and dev-tooling' },
  { value: '2500+', label: 'DSA problems solved across LeetCode, Codeforces, CodeChef' },
  { value: '8.71', label: 'GPA — B.Tech ECE, IIIT Naya Raipur' },
]

export const achievements = [
  'Flipkart Grid 5.0 Finalist — out of ~100,000 participating teams',
  'Codeforces Specialist (1480+) · CodeChef 4-star (1800+)',
  'Kaggle — ranked under 400 in the RL ghoulreaper competition',
]

export const skillGroups = [
  {
    label: 'AI & Agents',
    items: ['OpenAI Realtime', 'MCP', 'Tool Calling', 'RAG', 'LangChain', 'Neo4j', 'Vision Models', 'OCR'],
  },
  {
    label: 'Languages',
    items: ['TypeScript', 'Python', 'Go', 'Java', 'C++', 'Rust', 'SQL'],
  },
  {
    label: 'Backend & Data',
    items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'Kafka', 'GraphQL'],
  },
  {
    label: 'Cloud & Infra',
    items: ['AWS', 'Ansible', 'AMI/ASG', 'Docker', 'Kubernetes', 'CI/CD'],
  },
]
