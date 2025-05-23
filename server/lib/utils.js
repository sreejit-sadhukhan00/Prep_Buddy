export const mappings = {
  google: "google",
  alphabet: "google",
  microsoft: "microsoft",
  amazon: "amazon",
  "amazon web services": "aws",
  aws: "aws",
  meta: "meta",
  facebook: "meta",
  instagram: "meta",
  whatsapp: "meta",
  apple: "apple",
  netflix: "netflix",
  linkedin: "linkedin",
  twitter: "x",
  x: "x",
  tesla: "tesla",
  spacex: "spacex",
  nvidia: "nvidia",
  intel: "intel",
  amd: "amd",
  ibm: "ibm",
  oracle: "oracle",
  sap: "sap",
  samsung: "samsung",
  tcs: "tcs",
  infosys: "infosys",
  wipro: "wipro",
  hcl: "hcl",
  accenture: "accenture",
  capgemini: "capgemini",
  cognizant: "cognizant",
  deloitte: "deloitte",
  ibm: "ibm",
  zoho: "zoho",
  freshworks: "freshworks",
  adobe: "adobe",
  figma: "figma",
  atlassian: "atlassian",
  jira: "atlassian",
  confluence: "atlassian",
  bitbucket: "bitbucket",
  github: "github",
  gitlab: "gitlab",
  digitalocean: "digitalocean",
  heroku: "heroku",
  vercel: "vercel",
  netlify: "netlify",
  supabase: "supabase",
  appwrite: "appwrite",
  planetScale: "planetscale",
  neon: "neon",
  mongodb: "mongodb",
  redis: "redis",
  elastic: "elastic",
  firebase: "firebase",
  oracle: "oracle",
  snowflake: "snowflake",
  databricks: "databricks",
  twilio: "twilio",
  stripe: "stripe",
  paypal: "paypal",
  square: "square",
  shopify: "shopify",
  salesforce: "salesforce",
  hubspot: "hubspot",
  airbnb: "airbnb",
  uber: "uber",
  lyft: "lyft",
  spotify: "spotify",
  dropbox: "dropbox",
  slack: "slack",
  notion: "notion",
  zoom: "zoom",
  miro: "miro",
  asana: "asana",
  monday: "monday",
  linear: "linear",
  cloudflare: "cloudflare",
  fastly: "fastly",
  datadog: "datadog",
  newrelic: "newrelic",
  sentry: "sentry",
  raycast: "raycast",
  postman: "postman",
  figma: "figma",
  canva: "canva",
  adobe: "adobe",
  wix: "wix",
  squarespace: "squarespace",
  docusign: "docusign",
  zapier: "zapier",
  ifttt: "ifttt",
  notion: "notion",
  clickup: "clickup",
  trello: "trello",
  lucidchart: "lucidchart",
  openai: "openai",
  huggingface: "huggingface",
  deepmind: "deepmind",
  anthropic: "anthropic",
};

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const getRandomTechLogos = () => {
  const allTechKeys = Object.keys(mappings);
  const selectedRandomKeys = Array.from({ length: 5 }, () => {
    const randIndex = Math.floor(Math.random() * allTechKeys.length);
    return allTechKeys[randIndex];
  });

  const logoUrls = selectedRandomKeys.map((rawTech) => {
    const normalized = mappings[rawTech] || rawTech.toLowerCase();
    return {
      tech: rawTech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  return logoUrls;
};
