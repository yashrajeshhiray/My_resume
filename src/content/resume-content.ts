import type {
  ResumeContent,
  RagChunk,
  ExperienceEntry,
  ProjectEntry,
  EducationEntry,
  CertificationEntry,
  LeadershipEntry,
  SkillGroup,
  Metric,
} from './types';

/**
 * Single source of truth for both the visual site and the RAG corpus.
 * Reconciled from two real source resumes (concise PDF + detailed master docx):
 * master wording takes priority; unique figures from the concise version are
 * spliced in (e.g. the explicit "5x" reconciliation speedup). Every RagChunk.text
 * is verbatim-derived from one of those two documents — nothing here is invented.
 *
 * Note: phone number is intentionally omitted from public display to avoid
 * harvesting/spam on a public static page; email + LinkedIn + GitHub cover contact.
 */

// ---------- Professional summary ----------

const summaryChunk: RagChunk = {
  id: 'summary-01',
  section: 'summary',
  title: 'Professional Summary',
  text: 'Data & AI Engineer with experience transforming fragmented data ecosystems into governed, scalable platforms — and turning those platforms into intelligent, production-grade AI products. Delivers end-to-end across data pipeline architecture, large-scale migrations, document intelligence, conversational AI, and agentic system design. Proven impact across cloud-native systems (Python, PySpark, Databricks, FastAPI, PostgreSQL, AWS): AI solutions processing 100K+ enterprise documents annually and modernized data platforms supporting 25M+ records across global consulting engagements at McKinsey & Company. Known for taking ownership from first principles to production, bridging raw data infrastructure and business-facing AI applications — the core of Applied AI / Forward-Deployed Engineering.',
  tags: ['summary', 'applied ai engineer', 'forward-deployed engineer', 'data engineer'],
  skillTaxonomy: ['ai.rag', 'ai.llm', 'ai.agentic', 'data-engineering.databricks', 'cloud.aws', 'backend.python'],
};

// ---------- Skills ----------

const skillDataInfra: RagChunk = {
  id: 'skill-data-infra',
  section: 'skill',
  title: 'Data & Infrastructure',
  text: 'Data & Infrastructure: Python, SQL, PostgreSQL, FastAPI, REST APIs, Git, Linux, Alembic, Databricks, Apache Spark (PySpark), ETL/ELT Pipelines, Medallion Architecture, Data Modeling & Quality, Data Lineage, AWS (S3, Lambda, Bedrock, ECS), Docker, CI/CD, GitHub Actions, Jupyter.',
  tags: ['data infrastructure', 'cloud', 'devops'],
  skillTaxonomy: ['data-engineering.etl', 'data-engineering.spark', 'data-engineering.databricks', 'data-engineering.sql', 'cloud.aws', 'backend.python', 'backend.devops'],
};

const skillAiAgentic: RagChunk = {
  id: 'skill-ai-agentic',
  section: 'skill',
  title: 'AI, ML & Agentic Systems',
  text: 'AI, ML & Agentic Systems: LLMs, MCP (Model Context Protocol), RAG Pipelines, LangChain, LLM Fine-tuning (LoRA), Vector Search & Embeddings, Multi-agent Orchestration (CrewAI), n8n Workflow Automation, Hugging Face Transformers, Claude API, Anthropic SDK, GPT-4o, Serper API, Prompt Engineering, Tokenization.',
  tags: ['ai', 'llm', 'agentic ai', 'rag'],
  skillTaxonomy: ['ai.rag', 'ai.llm', 'ai.finetuning', 'ai.agentic'],
};

const skillAppliedDomains: RagChunk = {
  id: 'skill-applied-domains',
  section: 'skill',
  title: 'Applied AI Domains & Visualization',
  text: 'Applied AI Domains & Visualization: Document Intelligence & OCR (LayoutLM, PaddleOCR, Tesseract), NLP & Text Classification (TF-IDF, sciSpaCy, NER), Application Security & Threat Detection, Power BI, Streamlit.',
  tags: ['document intelligence', 'nlp', 'security', 'visualization'],
  skillTaxonomy: ['document-ai', 'ai.nlp', 'security.appsec', 'viz.bi'],
};

const skills: SkillGroup[] = [
  { category: 'Data & Infrastructure', items: ['Python', 'SQL', 'PostgreSQL', 'FastAPI', 'REST APIs', 'Git', 'Linux', 'Alembic', 'Databricks', 'Apache Spark (PySpark)', 'ETL/ELT Pipelines', 'Medallion Architecture', 'Data Modeling & Quality', 'Data Lineage', 'AWS (S3, Lambda, Bedrock, ECS)', 'Docker', 'CI/CD', 'GitHub Actions', 'Jupyter'], chunk: skillDataInfra },
  { category: 'AI, ML & Agentic Systems', items: ['LLMs', 'MCP', 'RAG Pipelines', 'LangChain', 'LLM Fine-tuning (LoRA)', 'Vector Search & Embeddings', 'CrewAI', 'n8n', 'Hugging Face', 'Claude API', 'Anthropic SDK', 'GPT-4o', 'Serper API', 'Prompt Engineering', 'Tokenization'], chunk: skillAiAgentic },
  { category: 'Applied AI Domains & Visualization', items: ['Document Intelligence (LayoutLM, PaddleOCR, Tesseract)', 'NLP & Text Classification (TF-IDF, sciSpaCy, NER)', 'Application Security & Threat Detection', 'Power BI', 'Streamlit'], chunk: skillAppliedDomains },
];

// ---------- Experience: McKinsey & Company, Data Engineer I ----------

const expDe1DocIntel1: RagChunk = {
  id: 'exp-mck-de1-docintel-01',
  section: 'experience',
  title: 'Document Intelligence Platform — Extraction & Multi-modal Pipelines',
  company: 'McKinsey & Company', role: 'Data Engineer I',
  dateRange: { start: '2024', end: 'present' },
  text: 'Enhanced an enterprise Document Intelligence Platform (React + Python/FastAPI) — an asset analyzing 100K+ documents annually, personally supporting 3 consulting engagements — extending AI-powered extraction pipelines across invoices, pharma documents, legal contracts, and financial reports. Built multi-modal extraction pipelines using LayoutLM, Tesseract, and PaddleOCR — handling text, table, and image extraction from complex layouts, cutting manual reconciliation effort 5x and turnaround from days to hours; evaluated Azure Document Intelligence as an alternate extraction engine across 4+ document types.',
  tags: ['document intelligence', 'react', 'fastapi', 'ocr'],
  skillTaxonomy: ['document-ai', 'backend.python', 'cloud.aws'],
  metrics: [
    { raw: '100K+', value: 100000, label: 'Documents processed annually', kind: 'volume' },
    { raw: '3', value: 3, label: 'Consulting engagements personally supported', kind: 'count' },
    { raw: '5x', value: 5, label: 'Manual reconciliation effort reduction', kind: 'multiplier' },
    { raw: '4+', value: 4, label: 'Document types benchmarked', kind: 'count' },
  ],
};

const expDe1DocIntel2: RagChunk = {
  id: 'exp-mck-de1-docintel-02',
  section: 'experience',
  title: 'Document Intelligence Platform — KPI Engine & Data Persistence',
  company: 'McKinsey & Company', role: 'Data Engineer I',
  dateRange: { start: '2024', end: 'present' },
  text: 'Developed a KPI comparison and discrepancy flagging engine for invoices and contracts, automatically detecting field-level differences across document versions and eliminating hours of manual reconciliation per document set. Designed an end-to-end extraction pipeline with structured output persistence to AWS S3, Blob Storage, and database layers, enabling bulk document processing across high-volume document sets (100+ documents per batch).',
  tags: ['kpi extraction', 'aws s3', 'data persistence'],
  skillTaxonomy: ['document-ai', 'cloud.aws', 'data-engineering.sql'],
  metrics: [{ raw: '100+', value: 100, label: 'Documents processed per batch', kind: 'count' }],
};

const expDe1Benchmark: RagChunk = {
  id: 'exp-mck-de1-benchmark',
  section: 'experience',
  title: 'Benchmarking Data Platform Modernisation',
  company: 'McKinsey & Company', role: 'Data Engineer I',
  dateRange: { start: '2024', end: 'present' },
  text: 'Redesigned a fragmented benchmarking data foundation by consolidating 72 legacy tables into 14 optimised Databricks entities using Medallion Architecture (Bronze/Silver/Gold), reducing data model complexity by 80%+ across 25M+ records and establishing a governed, auditable analytical source for downstream reporting. Documented full data lineage using Databricks native lineage, ADRs in Confluence, and source-to-target mappings in Miro for stakeholder sign-off.',
  tags: ['databricks', 'medallion architecture', 'delta lake', 'data lineage'],
  skillTaxonomy: ['data-engineering.databricks'],
  metrics: [
    { raw: '80%+', value: 80, label: 'Data model complexity reduction (72→14 tables)', kind: 'percentage' },
    { raw: '25M+', value: 25000000, label: 'Records governed under modernized platform', kind: 'volume' },
  ],
};

const expDe1Elt: RagChunk = {
  id: 'exp-mck-de1-elt',
  section: 'experience',
  title: 'ELT Pipelines & Self-service Analytics',
  company: 'McKinsey & Company', role: 'Data Engineer I',
  dateRange: { start: '2024', end: 'present' },
  text: "Engineered 12+ production ELT pipelines (PySpark, SQL, Databricks Jobs, GitHub Actions) with automated data-quality validations, recovering 9,000+ records and delivering the platform's first Power BI self-service layer for 20+ stakeholders.",
  tags: ['pyspark', 'elt pipelines', 'power bi', 'databricks jobs'],
  skillTaxonomy: ['data-engineering.spark', 'data-engineering.etl', 'viz.bi', 'backend.devops'],
  metrics: [
    { raw: '12+', value: 12, label: 'Production ELT pipelines engineered', kind: 'count' },
    { raw: '9,000+', value: 9000, label: 'Records recovered via data-quality validation', kind: 'volume' },
    { raw: '20+', value: 20, label: 'Stakeholders served by self-service Power BI layer', kind: 'count' },
  ],
};

const expDe1PgMigration: RagChunk = {
  id: 'exp-mck-de1-pg-migration',
  section: 'experience',
  title: 'PostgreSQL Migration & Application Modernisation',
  company: 'McKinsey & Company', role: 'Data Engineer I',
  dateRange: { start: '2024', end: 'present' },
  text: 'Led end-to-end migration of 25M+ records from Databricks Delta Lake to PostgreSQL, redesigning 14+ entity schemas and building automated validation and reconciliation frameworks (Python, FastAPI, Alembic), enabling deprecation of a legacy Node.js application and a scalable, cloud-native backend for next-generation applications.',
  tags: ['postgresql', 'data migration', 'alembic'],
  skillTaxonomy: ['data-engineering.sql', 'backend.python', 'backend.devops'],
  metrics: [{ raw: '14+', value: 14, label: 'Entity schemas redesigned in migration', kind: 'count' }],
};

const expDe1MigrationValidation: RagChunk = {
  id: 'exp-mck-de1-migration-validation',
  section: 'experience',
  title: 'Migration Validation & Stakeholder Sign-off',
  company: 'McKinsey & Company', role: 'Data Engineer I',
  dateRange: { start: '2024', end: 'present' },
  text: 'Authored Alembic migration scripts, custom Python parquet loading pipelines, and incremental load scripts ensuring schema consistency and data integrity. Built FastAPI pipeline trigger endpoints, custom SQL/Python test suites, and end-to-end logging — delivering stakeholder-validated completeness sign-off across all 25M+ migrated records.',
  tags: ['testing', 'data validation', 'fastapi'],
  skillTaxonomy: ['backend.python', 'backend.devops', 'data-engineering.sql'],
};

const expDataEngineer1: ExperienceEntry = {
  id: 'exp-mck-de1',
  company: 'McKinsey & Company',
  role: 'Data Engineer I',
  location: 'Chennai, India',
  dateRange: { start: '2024', end: 'present' },
  bullets: [expDe1DocIntel1, expDe1DocIntel2, expDe1Benchmark, expDe1Elt, expDe1PgMigration, expDe1MigrationValidation],
};

// ---------- Experience: McKinsey & Company, Solution Delivery Intern ----------

const expIntLegalChatbot: RagChunk = {
  id: 'exp-mck-int-legal-chatbot',
  section: 'experience',
  title: 'Legal AI — Conversational Document Intelligence Chatbot',
  company: 'McKinsey & Company', role: 'Solution Delivery Intern',
  dateRange: { start: 'Jan 2023', end: 'Jul 2023' },
  text: 'Built a ChatGPT-style legal chatbot using RAG, LangChain, and vector databases — enabling lawyers to upload contracts and query critical clauses, obligations, and risks through a natural-language conversational interface, eliminating manual document review. Architected a unified LLM pipeline covering PDF extraction, chunking, embeddings, vector search, and prompt-based retrieval, replacing multiple task-specific models with a single production-ready architecture.',
  tags: ['legal ai', 'rag', 'langchain', 'chatbot'],
  skillTaxonomy: ['ai.rag', 'ai.llm'],
};

const expIntFinetuning: RagChunk = {
  id: 'exp-mck-int-finetuning',
  section: 'experience',
  title: 'Legal Contract QA — LoRA Fine-tuning',
  company: 'McKinsey & Company', role: 'Solution Delivery Intern',
  dateRange: { start: 'Jan 2023', end: 'Jul 2023' },
  text: 'Fine-tuned Flan-T5-XL on the CUAD legal QA dataset, achieving a 4x+ uplift over the base model — BLEU improved from 0.0659 to 0.2977 and ROUGE-1 F1 from 0.1523 to 0.6295 on contract question-answering tasks.',
  tags: ['fine-tuning', 'lora', 'flan-t5', 'cuad'],
  skillTaxonomy: ['ai.finetuning'],
  metrics: [{ raw: '4x+', value: 4, label: 'BLEU/ROUGE uplift fine-tuning Flan-T5-XL on legal QA', kind: 'multiplier' }],
};

const expIntDrafting: RagChunk = {
  id: 'exp-mck-int-drafting',
  section: 'experience',
  title: 'Legal Document Drafting Extension',
  company: 'McKinsey & Company', role: 'Solution Delivery Intern',
  dateRange: { start: 'Jan 2023', end: 'Jul 2023' },
  text: 'Extended the chatbot with an AI-powered legal document drafting feature — users could generate structured agreements and property contracts conversationally, delivering a complete read-analyse-draft workflow within a single Streamlit interface.',
  tags: ['streamlit', 'document drafting'],
  skillTaxonomy: ['ai.rag', 'viz.bi'],
};

const expSolutionDeliveryIntern: ExperienceEntry = {
  id: 'exp-mck-intern',
  company: 'McKinsey & Company',
  role: 'Solution Delivery Intern',
  location: 'Chennai, India',
  dateRange: { start: 'Jan 2023', end: 'Jul 2023' },
  bullets: [expIntLegalChatbot, expIntFinetuning, expIntDrafting],
};

// ---------- Projects ----------

const projInsuranceBuddy1: RagChunk = {
  id: 'proj-insurance-buddy-01',
  section: 'project',
  title: 'Insurance Buddy — Agentic AI Insurance Recommendation Platform',
  text: "Insurance Buddy — built a multi-agent AI application using the CrewAI orchestration framework and GPT-4o at an internal McKinsey innovation hackathon, analysing a user's salary, expenses, credit limit, and budget to compute a rule-based Persona Financial Health Score and recommend the top 3 matching insurance policies in real time.",
  tags: ['agentic ai', 'crewai', 'gpt-4o', 'hackathon'],
  skillTaxonomy: ['ai.agentic', 'ai.llm'],
};

const projInsuranceBuddy2: RagChunk = {
  id: 'proj-insurance-buddy-02',
  section: 'project',
  title: 'Insurance Buddy — 4-Agent Pipeline & Reporting',
  text: 'Designed a 4-agent pipeline — Financial Analyzer, Web Researcher, Critic, and Synthesizer — with a custom Serper API scraping tool built within CrewAI for real-time policy discovery, and GPT-4o for multi-stage reasoning, critique, and synthesis. Delivered an AI-generated insight report with policy recommendations and suitability justification through a Streamlit application with persona score visualisation and downloadable output — representing McKinsey at an internal innovation hackathon.',
  tags: ['agentic ai', 'streamlit', 'serper api'],
  skillTaxonomy: ['ai.agentic', 'viz.bi'],
  metrics: [{ raw: '4', value: 4, label: 'Autonomous agents orchestrated in the pipeline', kind: 'count' }],
};

const projDocTagging1: RagChunk = {
  id: 'proj-doctagging-01',
  section: 'project',
  title: 'Automatic Document Tagging — NLP Classification System',
  text: 'Automatic Document Tagging (M.Tech project, NIT Trichy) — built an end-to-end NLP document classification pipeline for medical and news articles (OHSUMED dataset), covering tokenisation, regex cleaning, stop-word removal, stemming, TF-IDF vectorisation, and Named Entity Recognition using sciSpaCy to extract domain-specific features.',
  tags: ['nlp', 'tf-idf', 'scispacy', 'classification'],
  skillTaxonomy: ['ai.nlp'],
};

const projDocTagging2: RagChunk = {
  id: 'proj-doctagging-02',
  section: 'project',
  title: 'Automatic Document Tagging — Classifier Benchmarking',
  text: 'Benchmarked 5 classifiers — Logistic Regression, SVM, Naive Bayes, Random Forest, and XGBoost — with hyperparameter tuning and stratified 10-fold cross-validation; SVM delivered peak precision, recall, and F1 across all document categories. Designed a reusable supervised text-classification framework applicable to large-scale content tagging, replacing manual labelling workflows in healthcare and media publishing.',
  tags: ['classifier benchmarking', 'cross-validation'],
  skillTaxonomy: ['ai.nlp'],
  metrics: [{ raw: '5', value: 5, label: 'Classifiers benchmarked with stratified 10-fold CV', kind: 'count' }],
};

const projSecNlp1: RagChunk = {
  id: 'proj-secnlp-01',
  section: 'project',
  title: 'Malicious Injection Detection in API Requests — Cybersecurity NLP System',
  text: 'Malicious Injection Detection in API Requests (M.Tech project, NIT Trichy) — developed an NLP-based binary classification system to detect malicious API requests, identifying SQL injection (SQLi), XSS, and command-injection attacks in REST API payloads before server processing, using the Wallarm Kaggle dataset of 65,854 real API requests.',
  tags: ['security', 'sql injection', 'xss', 'api security'],
  skillTaxonomy: ['security.appsec', 'ai.nlp'],
  metrics: [{ raw: '65,854', value: 65854, label: 'Real API requests analyzed for injection detection', kind: 'count' }],
};

const projSecNlp2: RagChunk = {
  id: 'proj-secnlp-02',
  section: 'project',
  title: 'Malicious Injection Detection — Feature Engineering & Results',
  text: 'Engineered a character-level TF-IDF vectorisation pipeline (100K-token vocabulary) with regex preprocessing, stemming, and lemmatisation to capture obfuscated injection patterns that word-level approaches miss. Trained and tuned 5 classifiers via stratified 10-fold cross-validation; Logistic Regression and Random Forest achieved 99.95 AUC-ROC and 99.88 F1, outperforming all baselines. Delivered a pre-server request-interception framework directly addressing OWASP Top 10 injection vulnerabilities, published as an academic paper.',
  tags: ['owasp', 'auc-roc', 'academic paper'],
  skillTaxonomy: ['security.appsec', 'ai.nlp'],
  metrics: [
    { raw: '99.95', value: 99.95, label: 'AUC-ROC on malicious API request detection', kind: 'score' },
    { raw: '99.88', value: 99.88, label: 'F1 score on malicious API request detection', kind: 'score' },
  ],
};

const projects: ProjectEntry[] = [
  {
    id: 'project-document-intelligence',
    name: 'Document Intelligence Platform',
    context: 'McKinsey & Company — Production Application',
    summaryChunk: expDe1DocIntel1,
    detailChunks: [expDe1DocIntel2],
    tags: ['document-ai', 'react', 'fastapi'],
  },
  {
    id: 'project-legal-ai-chatbot',
    name: 'Legal AI — Conversational Contract Chatbot',
    context: 'McKinsey & Company — Solution Delivery Internship',
    summaryChunk: expIntLegalChatbot,
    detailChunks: [expIntFinetuning, expIntDrafting],
    tags: ['rag', 'langchain', 'legal-ai'],
  },
  {
    id: 'project-insurance-buddy',
    name: 'Insurance Buddy — Agentic AI Insurance Recommendation Platform',
    context: 'Internal Innovation Hackathon',
    summaryChunk: projInsuranceBuddy1,
    detailChunks: [projInsuranceBuddy2],
    tags: ['agentic-ai', 'crewai'],
  },
  {
    id: 'project-document-tagging',
    name: 'Automatic Document Tagging — NLP Classification System',
    context: 'M.Tech Project, NIT Trichy',
    summaryChunk: projDocTagging1,
    detailChunks: [projDocTagging2],
    tags: ['nlp', 'classification'],
  },
  {
    id: 'project-malicious-injection-detection',
    name: 'Malicious Injection Detection in API Requests',
    context: 'M.Tech Project, NIT Trichy — Published Research',
    summaryChunk: projSecNlp1,
    detailChunks: [projSecNlp2],
    tags: ['security', 'nlp'],
  },
];

// ---------- Education ----------

const eduChunkNit: RagChunk = {
  id: 'edu-nit-trichy',
  section: 'education',
  title: 'M.Tech, Data Analytics — NIT Tiruchirappalli',
  text: 'M.Tech, Data Analytics — National Institute of Technology, Tiruchirappalli (NIT Trichy), 2021–2023. CGPA 9.15/10, Academic Excellence Award (2021-23).',
  tags: ['education', 'm.tech', 'data analytics'],
  skillTaxonomy: [],
};

const eduChunkShivaji: RagChunk = {
  id: 'edu-shivaji-university',
  section: 'education',
  title: 'B.Tech, Computer Science — Shivaji University',
  text: 'B.Tech, Computer Science — Department of Technology, Shivaji University, 2016–2020. CGPA 8.9/10, Zonal Inter-college Chess Tournament Runner-up (2019-20).',
  tags: ['education', 'b.tech', 'computer science'],
  skillTaxonomy: [],
};

const education: EducationEntry[] = [
  { id: 'edu-nit-trichy', institution: 'NIT Tiruchirappalli', degree: 'M.Tech, Data Analytics', dateRange: { start: '2021', end: '2023' }, cgpa: '9.15/10', honors: ['Academic Excellence Award (2021-23)'], chunk: eduChunkNit },
  { id: 'edu-shivaji-university', institution: 'Shivaji University', degree: 'B.Tech, Computer Science', dateRange: { start: '2016', end: '2020' }, cgpa: '8.9/10', honors: ['Zonal Inter-college Chess Tournament Runner-up (2019-20)'], chunk: eduChunkShivaji },
];

// ---------- Certifications ----------

const certAwsChunk: RagChunk = {
  id: 'cert-aws',
  section: 'certification',
  title: 'AWS Certified Cloud Practitioner',
  text: 'AWS Certified Cloud Practitioner — Amazon Web Services.',
  tags: ['certification', 'aws'],
  skillTaxonomy: ['cloud.aws'],
};

const certDlChunk: RagChunk = {
  id: 'cert-deep-learning',
  section: 'certification',
  title: 'Neural Networks and Deep Learning',
  text: 'Neural Networks and Deep Learning — DeepLearning.AI (Coursera).',
  tags: ['certification', 'deep learning'],
  skillTaxonomy: ['ai.finetuning'],
};

const certifications: CertificationEntry[] = [
  { id: 'cert-aws', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', chunk: certAwsChunk },
  { id: 'cert-deep-learning', name: 'Neural Networks and Deep Learning', issuer: 'DeepLearning.AI (Coursera)', chunk: certDlChunk },
];

// ---------- Leadership & Community ----------

const leadHelpTheBlindChunk: RagChunk = {
  id: 'leadership-help-the-blind',
  section: 'leadership',
  title: 'AI Training for Visually Challenged Faculty',
  text: 'Trained 30+ visually challenged faculty from institutes across India at Help the Blind Foundation on Gemini Live, Google Workspace AI integrations, and advanced prompt engineering — equipping them to deliver GenAI-powered job readiness coaching to their students.',
  tags: ['leadership', 'accessibility', 'training'],
  skillTaxonomy: ['leadership', 'ai.llm'],
  metrics: [{ raw: '30+', value: 30, label: 'Visually challenged faculty trained on GenAI tools', kind: 'count' }],
};

const leadGenerationAidChunk: RagChunk = {
  id: 'leadership-generation-aid-india',
  section: 'leadership',
  title: 'Employability Training via Generation Aid India',
  text: 'Delivered employability sessions to 110+ students across India via Generation Aid India on AI-assisted resume building, cover letters, ATS optimisation, prompt engineering, and interview preparation.',
  tags: ['leadership', 'mentorship', 'employability'],
  skillTaxonomy: ['leadership'],
  metrics: [{ raw: '110+', value: 110, label: 'Students trained on AI-assisted job readiness', kind: 'count' }],
};

const leadAnimalWelfareChunk: RagChunk = {
  id: 'leadership-animal-welfare',
  section: 'leadership',
  title: 'Animal Welfare Head, Prakruti Nature Club',
  text: 'Animal Welfare Head, Prakruti Nature Club (NIT Trichy) — led 45+ volunteers across stray-dog feeding programs, veterinary tie-ups, adoption drives, and ABC initiatives in partnership with Blue Cross Trichy.',
  tags: ['leadership', 'community', 'animal welfare'],
  skillTaxonomy: ['leadership'],
  metrics: [{ raw: '45+', value: 45, label: 'Volunteers led on campus animal-welfare programs', kind: 'count' }],
};

const leadership: LeadershipEntry[] = [
  { id: 'leadership-help-the-blind', org: 'Help the Blind Foundation', chunk: leadHelpTheBlindChunk },
  { id: 'leadership-generation-aid-india', org: 'Generation Aid India', chunk: leadGenerationAidChunk },
  { id: 'leadership-animal-welfare', org: 'Prakruti Nature Club (NIT Trichy)', chunk: leadAnimalWelfareChunk },
];

// ---------- Curated Impact metrics (drives the visual Impact stats section) ----------

const metrics: Metric[] = [
  { raw: '100K+', value: 100000, label: 'Documents processed annually by AI extraction pipelines', kind: 'volume' },
  { raw: '25M+', value: 25000000, label: 'Records migrated & modernized across data platforms', kind: 'volume' },
  { raw: '5x', value: 5, label: 'Reduction in manual reconciliation effort', kind: 'multiplier' },
  { raw: '80%+', value: 80, label: 'Data model complexity reduction (72→14 tables)', kind: 'percentage' },
  { raw: '4x+', value: 4, label: 'BLEU/ROUGE uplift fine-tuning Flan-T5-XL on legal QA', kind: 'multiplier' },
  { raw: '9,000+', value: 9000, label: 'Records recovered via automated data-quality validation', kind: 'volume' },
  { raw: '20+', value: 20, label: 'Stakeholders served by first self-service Power BI layer', kind: 'count' },
  { raw: '12+', value: 12, label: 'Production ELT pipelines engineered', kind: 'count' },
  { raw: '110+', value: 110, label: 'Students trained on AI-assisted job readiness', kind: 'count' },
  { raw: '30+', value: 30, label: 'Visually challenged faculty trained on GenAI tools', kind: 'count' },
  { raw: '45+', value: 45, label: 'Volunteers led on campus animal-welfare programs', kind: 'count' },
  { raw: '99.95', value: 99.95, label: 'AUC-ROC on malicious API request detection', kind: 'score' },
  { raw: '65,854', value: 65854, label: 'Real API requests analyzed for injection detection', kind: 'count' },
];

// ---------- Assembled export ----------

export const resumeContent: ResumeContent = {
  person: {
    name: 'Yash Rajesh Hiray',
    title: 'Applied AI & Data Engineer',
    tagline: 'Forward-Deployed at McKinsey & Company — Agentic Workflows · MCP · RAG · Databricks',
    email: 'yash.hiray13@gmail.com',
    links: [
      { label: 'GitHub', url: 'https://github.com/yashrajeshhiray' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yash-hiray-b0777112a' },
      { label: 'Email', url: 'mailto:yash.hiray13@gmail.com' },
    ],
    summary: summaryChunk,
  },
  skills,
  experience: [expDataEngineer1, expSolutionDeliveryIntern],
  projects,
  education,
  certifications,
  leadership,
  metrics,
};
