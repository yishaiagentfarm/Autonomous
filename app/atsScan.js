// ---------------------------------------------------------------------------
// Client-side ATS scan engine  (100% in-browser, no backend, no API, $0)
// Implements spec 4110ef3a section (c): tokenize JD + resume, extract the
// keywords the JD is scanning for from a tech-tuned dictionary, score the
// resume's match-rate, and list the exact MISSING keywords with the JD
// sentence each came from. Returns a real, specific result — not a vanity #.
//
// Privacy is a selling point: nothing leaves the browser.
// ---------------------------------------------------------------------------

// Tech-tuned keyword/alias dictionary. Canonical term -> [aliases].
// All entries lowercase. Aliases include the spelled-out / abbreviated forms
// recruiters and ATS filters use interchangeably (K8s = Kubernetes, etc.).
export const SKILLS = {
  // --- languages ---
  javascript: ["js"],
  typescript: ["ts"],
  python: [],
  java: [],
  "c++": ["cpp"],
  "c#": ["csharp", "c sharp"],
  go: ["golang"],
  rust: [],
  ruby: [],
  php: [],
  swift: [],
  kotlin: [],
  scala: [],
  "objective-c": ["objective c"],
  perl: [],
  "r": [],
  matlab: [],
  sql: [],
  bash: ["shell scripting", "shell"],
  powershell: [],
  // --- frontend ---
  react: ["react.js", "reactjs"],
  "react native": [],
  angular: ["angular.js", "angularjs"],
  "vue": ["vue.js", "vuejs"],
  svelte: [],
  "next.js": ["nextjs", "next js"],
  redux: [],
  html: ["html5"],
  css: ["css3"],
  sass: ["scss"],
  tailwind: ["tailwind css", "tailwindcss"],
  webpack: [],
  vite: [],
  "rsc": ["react server components"],
  jquery: [],
  "responsive design": [],
  accessibility: ["a11y", "wcag"],
  // --- backend / frameworks ---
  "node.js": ["node", "nodejs"],
  express: ["express.js"],
  django: [],
  flask: [],
  fastapi: [],
  "spring": ["spring boot"],
  "ruby on rails": ["rails"],
  laravel: [],
  ".net": ["dotnet", "dot net", "asp net", "net"],
  graphql: [],
  "rest": ["rest api", "restful", "rest apis"],
  grpc: [],
  microservices: [],
  websockets: ["websocket"],
  // --- data / databases ---
  postgresql: ["postgres"],
  mysql: [],
  "sql server": ["mssql"],
  oracle: [],
  mongodb: ["mongo"],
  redis: [],
  elasticsearch: ["elastic search"],
  cassandra: [],
  dynamodb: [],
  snowflake: [],
  bigquery: ["big query"],
  redshift: [],
  databricks: [],
  spark: ["apache spark", "pyspark"],
  hadoop: [],
  kafka: ["apache kafka"],
  airflow: ["apache airflow"],
  dbt: [],
  etl: ["elt"],
  "data warehouse": ["data warehousing"],
  "data pipeline": ["data pipelines"],
  // --- data science / ml ---
  "machine learning": ["ml"],
  "deep learning": [],
  "natural language processing": ["nlp"],
  "computer vision": [],
  tensorflow: [],
  pytorch: [],
  "scikit-learn": ["sklearn", "scikit learn"],
  pandas: [],
  numpy: [],
  "llm": ["llms", "large language models", "large language model"],
  "generative ai": ["genai", "gen ai"],
  "a/b testing": ["ab testing", "a b testing"],
  statistics: ["statistical analysis"],
  "data analysis": ["data analytics"],
  tableau: [],
  "power bi": ["powerbi"],
  looker: [],
  // --- cloud / devops ---
  aws: ["amazon web services"],
  azure: ["microsoft azure"],
  "google cloud": ["gcp", "google cloud platform"],
  docker: [],
  kubernetes: ["k8s"],
  terraform: [],
  ansible: [],
  jenkins: [],
  "ci/cd": ["ci cd", "cicd", "continuous integration", "continuous delivery", "continuous deployment"],
  "github actions": [],
  gitlab: ["gitlab ci"],
  git: [],
  linux: ["unix"],
  nginx: [],
  serverless: ["lambda", "aws lambda"],
  prometheus: [],
  grafana: [],
  datadog: [],
  observability: ["monitoring"],
  // --- mobile ---
  ios: [],
  android: [],
  flutter: [],
  // --- testing ---
  jest: [],
  cypress: [],
  playwright: [],
  selenium: [],
  "unit testing": ["unit tests"],
  "test automation": ["automated testing"],
  tdd: ["test driven development"],
  // --- product / pm ---
  roadmap: ["product roadmap"],
  "user research": [],
  "product strategy": [],
  "go-to-market": ["go to market", "gtm"],
  stakeholder: ["stakeholder management", "stakeholders"],
  "user stories": ["user story"],
  backlog: ["backlog grooming"],
  agile: [],
  scrum: [],
  kanban: [],
  jira: [],
  confluence: [],
  wireframe: ["wireframes", "wireframing"],
  "product analytics": [],
  kpi: ["kpis"],
  okr: ["okrs"],
  "market research": [],
  "competitive analysis": [],
  "product-led growth": ["product led growth", "plg"],
  segmentation: [],
  "customer discovery": [],
  // --- design ---
  figma: [],
  sketch: [],
  "adobe xd": [],
  prototyping: ["prototype", "prototypes"],
  "user experience": ["ux"],
  "user interface": ["ui"],
  "design system": ["design systems"],
  "usability testing": [],
  "interaction design": [],
  "visual design": [],
  "user-centered design": ["user centered design"],
  // --- general / soft / seniority ---
  "cross-functional": ["cross functional"],
  leadership: ["team leadership"],
  mentorship: ["mentoring", "mentored"],
  "system design": [],
  "distributed systems": [],
  scalability: ["scalable"],
  api: ["apis"],
  "object-oriented": ["object oriented", "oop"],
  "data structures": [],
  algorithms: ["algorithm"],
  "code review": ["code reviews"],
  documentation: [],
};

const STOPWORDS = new Set([
  "the", "and", "for", "with", "you", "your", "are", "our", "this", "that",
  "will", "have", "has", "from", "all", "can", "but", "not", "they", "their",
  "who", "what", "when", "where", "how", "why", "a", "an", "of", "to", "in",
  "on", "at", "as", "is", "it", "be", "or", "we", "us", "by", "if", "so",
  "do", "we", "i", "team", "work", "working", "role", "job", "company",
  "experience", "years", "year", "ability", "strong", "good", "great",
  "looking", "join", "help", "build", "building", "including", "etc",
]);

// Normalize text for phrase matching. Keep + and # (c++, c#). Pad with spaces
// so we can word-boundary match multi-word phrases via simple includes().
// Drop punctuation to spaces, keeping only + # and - (for c++, c#, scikit-learn,
// cross-functional, etc.). Dots and slashes become spaces — terms that need
// them (node.js, ci/cd, a/b testing) carry space/joined aliases in the dict —
// so "Grafana." reliably matches "grafana".
function normalize(text) {
  return (
    " " +
    text
      .toLowerCase()
      .replace(/[^a-z0-9+#\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim() +
    " "
  );
}

// Count occurrences of a term (or any of its aliases) in normalized text.
function termCount(normText, canonical, aliases) {
  const forms = [canonical, ...aliases];
  let count = 0;
  for (const f of forms) {
    const needle = " " + f.trim() + " ";
    let idx = normText.indexOf(needle);
    while (idx !== -1) {
      count++;
      idx = normText.indexOf(needle, idx + 1);
    }
  }
  return count;
}

function termPresent(normText, canonical, aliases) {
  return termCount(normText, canonical, aliases) > 0;
}

// Split raw text into sentences for "where this keyword came from".
function splitSentences(text) {
  return text
    .replace(/\r/g, "")
    .split(/(?<=[.!?])\s+|\n+|•|•|·|;/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// Find the first JD sentence that mentions the keyword (any form).
function sentenceFor(sentences, canonical, aliases) {
  const forms = [canonical, ...aliases];
  for (const s of sentences) {
    const ns = normalize(s);
    for (const f of forms) {
      if (ns.indexOf(" " + f.trim() + " ") !== -1) {
        return s.length > 180 ? s.slice(0, 177) + "…" : s;
      }
    }
  }
  return null;
}

// Pull capitalized multi-word proper nouns from the JD as secondary keywords
// (e.g. "Apache Kafka", "Amazon Web Services") that aren't in the dictionary.
function extractProperNouns(rawJd, alreadyCovered) {
  // Multi-word Capitalized phrases only; no '.' inside so sentence boundaries
  // like "Python. Strong" can't glue two words into a fake phrase.
  const matches = rawJd.match(/\b([A-Z][a-zA-Z0-9+#]+(?:\s+[A-Z][a-zA-Z0-9+#]+){1,2})\b/g) || [];
  const seen = new Set();
  const result = [];
  for (const m of matches) {
    const lower = m.toLowerCase().trim();
    const firstWord = lower.split(" ")[0];
    if (STOPWORDS.has(firstWord)) continue;
    if (lower.length < 4) continue;
    if (seen.has(lower)) continue;
    if (alreadyCovered.has(lower)) continue;
    seen.add(lower);
    result.push({ canonical: lower, display: m.trim(), aliases: [] });
    if (result.length >= 8) break;
  }
  return result;
}

// Main entry point.
export function scanResume(resumeText, jdText) {
  const resume = (resumeText || "").trim();
  const jd = (jdText || "").trim();
  if (resume.length < 30 || jd.length < 30) {
    return {
      error:
        "Please paste both your resume and a job description (at least a few sentences each) so the scan has something to compare.",
    };
  }

  const normResume = normalize(resume);
  const normJd = normalize(jd);
  const jdSentences = splitSentences(jd);

  // 1. Dictionary target keywords present in the JD, weighted by JD frequency.
  const targets = [];
  const coveredCanon = new Set();
  for (const [canonical, aliases] of Object.entries(SKILLS)) {
    const freq = termCount(normJd, canonical, aliases);
    if (freq > 0) {
      targets.push({
        canonical,
        display: canonical,
        aliases,
        weight: Math.min(freq, 3),
      });
      coveredCanon.add(canonical);
    }
  }

  // 2. Secondary proper-noun keywords (weight 1) not already in the dictionary.
  for (const pn of extractProperNouns(jd, coveredCanon)) {
    targets.push({ ...pn, weight: 1 });
  }

  if (targets.length === 0) {
    return {
      error:
        "No recognizable role keywords found in that job description. Paste a real tech job posting (responsibilities + requirements) for an accurate scan.",
    };
  }

  // 3. Score: matched weight / total weight.
  let totalWeight = 0;
  let matchedWeight = 0;
  const missing = [];
  const covered = [];
  for (const t of targets) {
    totalWeight += t.weight;
    const present = termPresent(normResume, t.canonical, t.aliases);
    if (present) {
      matchedWeight += t.weight;
      covered.push(t);
    } else {
      missing.push({
        ...t,
        sentence: sentenceFor(jdSentences, t.canonical, t.aliases),
      });
    }
  }

  const score = Math.round((100 * matchedWeight) / totalWeight);

  // Rank missing by weight (JD emphasis) desc, then covered by weight desc.
  missing.sort((a, b) => b.weight - a.weight);
  covered.sort((a, b) => b.weight - a.weight);

  return {
    score,
    missing: missing.slice(0, 12),
    covered: covered.slice(0, 6),
    totalKeywords: targets.length,
    matchedCount: covered.length,
  };
}
