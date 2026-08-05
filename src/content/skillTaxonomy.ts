export interface SkillTaxonomyNode {
  id: string;
  label: string;
  synonyms: string[];
}

/**
 * Controlled vocabulary used by both skill-chip rendering and the fit-for-role
 * comparator. Synonyms let a visitor's free-text query ("do you know Spark?")
 * match a taxonomy node without any NLP model — pure substring/regex matching.
 */
export const skillTaxonomy: SkillTaxonomyNode[] = [
  {
    id: 'data-engineering.etl',
    label: 'ETL / ELT Pipeline Engineering',
    synonyms: ['etl', 'elt', 'data pipeline', 'pipelines', 'pipeline engineering', 'data pipelines'],
  },
  {
    id: 'data-engineering.spark',
    label: 'Apache Spark / PySpark',
    synonyms: ['spark', 'pyspark', 'apache spark'],
  },
  {
    id: 'data-engineering.databricks',
    label: 'Databricks & Medallion Architecture',
    synonyms: ['databricks', 'delta lake', 'medallion architecture', 'bronze silver gold', 'lakehouse'],
  },
  {
    id: 'data-engineering.sql',
    label: 'SQL, Data Modeling & PostgreSQL',
    synonyms: ['sql', 'postgresql', 'postgres', 'data modeling', 'data modelling', 'schema design', 'data quality'],
  },
  {
    id: 'cloud.aws',
    label: 'AWS (S3, Lambda, Bedrock, ECS)',
    synonyms: ['aws', 'amazon web services', 's3', 'lambda', 'bedrock', 'ecs', 'cloud'],
  },
  {
    id: 'backend.python',
    label: 'Python & FastAPI Backend Development',
    synonyms: ['python', 'fastapi', 'rest api', 'rest apis', 'backend', 'api development'],
  },
  {
    id: 'backend.devops',
    label: 'CI/CD & DevOps',
    synonyms: ['ci/cd', 'cicd', 'github actions', 'docker', 'devops', 'git', 'linux', 'alembic'],
  },
  {
    id: 'ai.rag',
    label: 'RAG & Vector Search',
    synonyms: ['rag', 'retrieval augmented generation', 'retrieval-augmented generation', 'vector search', 'vector database', 'vector databases', 'embeddings', 'langchain', 'semantic search'],
  },
  {
    id: 'ai.llm',
    label: 'LLMs & Prompt Engineering',
    synonyms: ['llm', 'llms', 'large language model', 'large language models', 'prompt engineering', 'claude', 'claude api', 'anthropic', 'gpt', 'gpt-4o', 'chatgpt'],
  },
  {
    id: 'ai.finetuning',
    label: 'LLM Fine-tuning (LoRA)',
    synonyms: ['fine-tuning', 'finetuning', 'lora', 'flan-t5', 'hugging face', 'huggingface', 'model training'],
  },
  {
    id: 'ai.agentic',
    label: 'Agentic AI & Multi-agent Orchestration',
    synonyms: ['agentic', 'agentic ai', 'multi-agent', 'crewai', 'mcp', 'model context protocol', 'n8n', 'agent orchestration', 'ai agents'],
  },
  {
    id: 'ai.nlp',
    label: 'NLP & Text Classification',
    synonyms: ['nlp', 'natural language processing', 'tf-idf', 'tfidf', 'ner', 'named entity recognition', 'scispacy', 'text classification', 'tokenization'],
  },
  {
    id: 'document-ai',
    label: 'Document Intelligence & OCR',
    synonyms: ['document intelligence', 'ocr', 'layoutlm', 'paddleocr', 'tesseract', 'document extraction', 'document ai'],
  },
  {
    id: 'viz.bi',
    label: 'BI & Data Visualization',
    synonyms: ['power bi', 'powerbi', 'streamlit', 'dashboard', 'dashboards', 'business intelligence', 'data visualization'],
  },
  {
    id: 'security.appsec',
    label: 'Application Security & Threat Detection',
    synonyms: ['security', 'appsec', 'owasp', 'sql injection', 'sqli', 'xss', 'cybersecurity', 'threat detection', 'injection detection'],
  },
  {
    id: 'leadership',
    label: 'Leadership, Training & Mentorship',
    synonyms: ['leadership', 'mentorship', 'training', 'team lead', 'community', 'volunteer', 'stakeholder management'],
  },
];

export function findTaxonomyMatches(query: string): SkillTaxonomyNode[] {
  const lower = query.toLowerCase();
  return skillTaxonomy.filter((node) =>
    node.synonyms.some((syn) => lower.includes(syn.toLowerCase())),
  );
}
