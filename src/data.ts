export const profile = {
  name: 'Sanskar S',
  role: 'Software Engineer',
  tagline: 'I build data platforms, knowledge graphs, and systems from first principles.',
  location: 'Earth, Sol System',
  github: 'https://github.com/sanskar',
  linkedin: 'https://www.linkedin.com/',
  email: 'sanskars@pretectum.com',
}

export const projects = [
  {
    title: 'Cortex',
    subtitle: 'GraphRAG Knowledge Engine',
    description:
      'Documents in, knowledge graph out. Multi-hop reasoning over a Neo4j graph with cited answers, an MCP server backbone, and a chat interface. Built to understand retrieval from first principles.',
    tech: ['TypeScript', 'Neo4j', 'OpenAI', 'Zod', 'MCP'],
    accent: '#00f0ff',
  },
  {
    title: 'Internet From Scratch',
    subtitle: 'Networking, rebuilt in Go',
    description:
      'A book-length project reimplementing the internet stack layer by layer — sockets, DNS, HTTP, TLS — every line written by hand to understand what actually happens on the wire.',
    tech: ['Go', 'TCP/IP', 'DNS', 'HTTP', 'TLS'],
    accent: '#7b5cff',
  },
  {
    title: 'Customer MDM Platform',
    subtitle: 'Enterprise data at Pretectum',
    description:
      'Microservices powering customer master data management — schema-driven datasets, Salesforce and JDBC connectors, encrypted pipelines, and search infrastructure at scale.',
    tech: ['Node.js', 'React', 'DynamoDB', 'AWS', 'OpenSearch'],
    accent: '#b400ff',
  },
  {
    title: 'Copilot Knowledge Service',
    subtitle: 'Tenant-scoped RAG for enterprise AI',
    description:
      'Server-side retrieval layer giving an AI copilot grounded knowledge of schemas, fields, and datasets — vector search over OpenSearch with strict tenant isolation.',
    tech: ['RAG', 'OpenSearch k-NN', 'GPT-4o', 'AWS Lambda'],
    accent: '#00ffa3',
  },
]

export const skillGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Go', 'Java', 'Python', 'SQL'],
  },
  {
    label: 'Backend & Data',
    items: ['Node.js', 'Neo4j', 'DynamoDB', 'Redis', 'OpenSearch', 'Postgres', 'Spring'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Redux-Saga', 'Three.js', 'Ant Design', 'Tailwind', 'Cypress'],
  },
  {
    label: 'Cloud & AI',
    items: ['AWS Lambda', 'Amplify', 'KMS', 'GraphRAG', 'MCP', 'LLM Pipelines'],
  },
]
