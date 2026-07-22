export const siteConfig = {
  name: "Aeronox Solutions",
  tagline: "Accessible, inclusive & sustainable digital growth",
  description:
    "We architect high-performance digital ecosystems with master-level engineering and breathtaking aesthetics. From premium SEO and custom web apps to intelligent AI automation and outbound telemarketing.",
  email: "info@aeronoxsolutions.com",
  phone: "+44 7535 151 621",
  address: "8 King Cross Street, Halifax, West Yorkshire HX1 2SH, UK",
  whatsapp: "https://wa.me/447535151621",
  socials: {
    linkedin: "https://linkedin.com/company/aeronoxsolutions",
    twitter: "https://twitter.com/aeronoxsolutions",
    facebook: "https://facebook.com/aeronoxsolutions",
    instagram: "https://instagram.com/aeronoxsolutions",
  }
};

export const navLinks = [
  { label: "Home", href: "/" },
  { 
    label: "About", 
    href: "/about",
    subLinks: [
      { label: "About Us", href: "/about" },
      { label: "Company Profile", href: "/about/company" }
    ]
  },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    id: "seo",
    number: "01",
    title: "Search Engine Optimization",
    description:
      "Data-driven SEO campaigns that multiply organic search visibility, drive high-intent leads, and guarantee long-term ROI through semantic search optimization.",
    icon: "search",
    features: [
      "Advanced semantic content indexing",
      "Technical Core Web Vitals optimization",
      "Local SEO & citation mapping",
      "Competitor keyword gap analysis",
    ],
  },
  {
    id: "web-dev",
    number: "02",
    title: "Web Engineering & Design",
    description:
      "High-performance custom web applications built for conversion, lightning speed, and global scalability, utilizing cutting-edge Next.js and Tailwind setups.",
    icon: "code",
    features: [
      "Next.js App Router & Server Component architecture",
      "Responsive UX/UI with interactive micro-animations",
      "E-commerce & CMS headless systems",
      "API design and secure cloud hosting integrations",
    ],
  },
  {
    id: "social",
    number: "03",
    title: "Social Media Management",
    description:
      "Organic and paid social campaigns built on psychological triggers that amplify brand authority, drive high engagement, and build lasting community hubs.",
    icon: "share",
    features: [
      "Tailored multi-platform content calendars",
      "High-performing paid social ads acquisition",
      "Brand voice refinement & graphics design",
      "Community management & audience outreach",
    ],
  },
  {
    id: "ai",
    number: "04",
    title: "AI & Workflow Automation",
    description:
      "Intelligent workflows, custom AI integrations, and automated pipelines that cut operational overhead, eliminate manual errors, and scale throughput.",
    icon: "bot",
    features: [
      "LLM & chatbot custom integrations",
      "Workflow mapping & automated logic (Zapier/Make)",
      "CRM & lead management automation",
      "Custom internal productivity dashboard setups",
    ],
  },
  {
    id: "telemarketing",
    number: "05",
    title: "B2B Outbound Telemarketing",
    description:
      "High-converting outreach, appointment setting, and lead verification handled by expert communicators who secure sales-ready opportunities for your team.",
    icon: "phone",
    features: [
      "Targeted lead database curation",
      "Professional cold & warm outbound calling",
      "Detailed appointment scheduling & logging",
      "Strict data compliance & quality assurance",
    ],
  },
  {
    id: "white-label",
    number: "06",
    title: "White-Label Delivery",
    description:
      "Seamlessly extend your agency's delivery capabilities. We execute the heavy technical work under your brand name, ensuring absolute client satisfaction.",
    icon: "layers",
    features: [
      "Complete client anonymity guaranteed",
      "Dedicated agency project manager contact",
      "Scalable delivery pipeline (Design, Dev, SEO)",
      "Strict NDA agreements and quality checks",
    ],
  },
];

export const stats = [
  { value: 2500, suffix: "+", label: "Clients consulted worldwide" },
  { value: 500, suffix: "+", label: "Successful projects delivered" },
  { value: 98, suffix: "%", label: "Client retention rate" },
  { value: 50, suffix: "K+", label: "Hours of manual labor saved" },
];

export const portfolio = [
  {
    id: "casita",
    title: "Casita Furniture",
    category: "Web Engineering",
    categoryKey: "web-dev",
    description: "Architected a custom headless store and designed a localized SEO roadmap, leading to a 140% traffic increase.",
    gradient: "from-violet-600/40 to-indigo-900/60",
    glowColor: "rgba(155, 92, 255, 0.4)",
    tag: "Next.js · Headless Shopify · SEO",
  },
  {
    id: "budget-bargains",
    title: "Budget Bargains",
    category: "Technical SEO & Marketing",
    categoryKey: "seo",
    description: "Re-engineered core performance, implemented structured metadata schema, and drove 200k+ organic monthly impressions.",
    gradient: "from-cyan-600/40 to-blue-900/60",
    glowColor: "rgba(0, 194, 255, 0.4)",
    tag: "Core Web Vitals · Technical SEO · Paid Social",
  },
  {
    id: "quran-academy",
    title: "Online Quran Academy",
    category: "Social Media & SEO",
    categoryKey: "social",
    description: "Crafted a targeted social acquisition campaign and SEO outreach framework, scaling active student enrollment worldwide.",
    gradient: "from-emerald-600/40 to-teal-900/60",
    glowColor: "rgba(0, 255, 148, 0.4)",
    tag: "Content Strategy · Lead Gen · Organic Search",
  },
  {
    id: "autopilot-flow",
    title: "Autopilot SaaS",
    category: "AI Automation",
    categoryKey: "ai",
    description: "Built end-to-end CRM automated pipelines and custom customer onboarding LLM agents, cutting manual support time by 70%.",
    gradient: "from-amber-600/40 to-orange-900/60",
    glowColor: "rgba(240, 192, 96, 0.4)",
    tag: "Make.com · OpenAI API · CRM Sync",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery & Blueprinting",
    description:
      "We deep dive into your operations, market share, and technical blockers to construct a tailored growth blueprint.",
  },
  {
    step: "02",
    title: "Agile Development & Design",
    description:
      "We execute fast with weekly review sprints, spinning up pixel-perfect components and high-performance infrastructure.",
  },
  {
    step: "03",
    title: "Semantic & Traffic Launch",
    description:
      "Your new assets are deployed on lightning-fast architectures and fully indexed for optimal search visibility from day one.",
  },
  {
    step: "04",
    title: "AI Scale & Iteration",
    description:
      "Continuous optimization, data tracking, and integrating AI automations to lock in compounding gains over time.",
  },
];

// Team data is now fetched from the database dynamically.

export const testimonials = [
  {
    quote:
      "Aeronox transformed our digital storefront. Our organic traffic doubled within six months and the page load speeds are now practically instant.",
    author: "Casita Furniture",
    role: "E-Commerce Director",
  },
  {
    quote:
      "They are professional, data-centric, and highly communicative. Re-engineering our site structure gave us an immediate lift in qualified search conversions.",
    author: "Budget Bargains",
    role: "Marketing Manager",
  },
  {
    quote:
      "Their custom social campaigns and local search mapping helped us connect with students all over the globe. Highly recommend their agency partnership.",
    author: "Online Quran Academy",
    role: "Operations Head",
  },
];

export const blogPosts = [
  {
    slug: "promote-business-social-media",
    title: "9 Effective Ways to Promote Your Business on Social Media",
    category: "Social Media",
    date: "March 12, 2026",
    readTime: "5 min read",
    snippet: "Leverage psychological triggers and smart scheduling algorithms to get high organic outreach without spending thousands on ads.",
    content: `## The Modern Landscape of Social Media Marketing

In 2026, social media marketing is no longer just about posting links or clean photos. The algorithms prioritize raw, high-retention content that sparks comments and shares. To grow your brand organically, you must align with user behavior and platform metrics.

### 1. Master Short-Form Video Hooks
The first 2.5 seconds of your reels, shorts, or TikTok videos dictate their visibility. Always start with a striking outcome or an intriguing question before introducing your brand.

### 2. Implement Interactive Polls & Interactive Elements
Platforms like Instagram and LinkedIn reward posts that drive direct engagement. Use polls, Q&As, and slider tools to increase engagement metrics instantly.

### 3. Repurpose Core Articles into Visual Carousels
Take a single blog post and split it into an 8-slide visual deck. Visually appealing slides have a higher save rate, signal value to the algorithm, and increase overall impressions.

---

### Key Takeaway
Stay consistent, focus on immediate value hooks, and always prompt users to comment, save, or share to maximize organic amplification.`,
  },
  {
    slug: "winning-social-media-strategy",
    title: "How to Write a Winning Social Media Strategy for Your Brand",
    category: "Strategy",
    date: "February 28, 2026",
    readTime: "8 min read",
    snippet: "A step-by-step roadmap to building an agency-grade content calendar, setting KPIs, and tracking direct sales conversion loops.",
    content: `## Building a Social Engine that Converts

Most brands post content without a clear conversion path. A winning social strategy connects top-of-funnel reach with bottom-of-funnel sales.

### Core Phases of a Conversion-Focused Strategy
1. **Audience Research:** Identify which platforms your target customers actually use. If you sell enterprise software, focus 90% of your energy on LinkedIn.
2. **Value pillars:** Group your posts into three pillars: Educational (how-to guides), Authoritative (case studies & testimonials), and Conversational (behind-the-scenes).
3. **The 80/20 Rule:** 80% of your content should educate and entertain, and only 20% should pitch your products or services.

### Automation and Scheduling
Utilize scheduling suites to maintain a steady posting cadence. Consistency tells platforms that your profile is active, ensuring your reach remains stable week-over-week.`,
  },
  {
    slug: "is-seo-still-worth-it",
    title: "Is SEO Still Worth It in 2026, or Is SEO Losing Its Impact?",
    category: "SEO",
    date: "January 15, 2026",
    readTime: "6 min read",
    snippet: "Analyzing the shift toward semantic search engines, LLM citation optimization, and why traditional keyword stuffing is officially dead.",
    content: `## The Shift to Semantic Search & LLM Citations

With search engines incorporating direct LLM answers, many marketers are asking if SEO is dead. The short answer is: **No, but SEO has fundamentally shifted.**

### What Changed in 2026?
* **LLM Engine Citations:** Search is transitionary. Optimization now means structuring your site data so models like Gemini, ChatGPT, and Copilot cite your business as the source of answer vectors.
* **Semantic intent Over Keywords:** Writing posts packed with repetitive keywords is obsolete. Search engines now scan for logical depth, topical authority, and direct expert solutions.
* **Page Experience:** Page load speeds, clean layout structures, and accessibility headers are heavily weighted core ranking signals.

---

### How to Stay Ahead
1. Optimize for **rich answers** and FAQ formats.
2. Ensure your schema markup is clean, validated, and up-to-date.
3. Focus on primary research, original case studies, and unique technical insights.`,
  },
];
