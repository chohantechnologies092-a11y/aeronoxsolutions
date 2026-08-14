/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/firebase-admin";
import { ALL_PROJECTS } from "@/lib/projects-data";
import { blogPosts, testimonials as fallbackTestimonials } from "@/lib/constants";
import { unstable_cache } from "next/cache";

function handleDbError(fnName: string, err: any) {
  if (
    err?.code === 8 || 
    err?.status === 8 || 
    String(err?.message || "").includes("RESOURCE_EXHAUSTED") || 
    String(err?.message || "").includes("Quota exceeded")
  ) {
    console.warn(`[Firestore Quota Exceeded] in ${fnName} - local fallback active.`);
  } else {
    console.error(`Error in ${fnName}:`, err);
  }
}

export const DEFAULT_SERVICES = [
  {
    id: "web-dev",
    slug: "web-dev",
    title: "Web Engineering & Design",
    shortDescription: "High-performance custom web applications built for conversion, lightning speed, and global scalability.",
    content: "<p>We engineer enterprise-grade headless platforms, high-converting e-commerce web applications, and custom API integrations built to perform at global scale.</p>",
    icon: "code",
    color: "#6a35ff",
    bentoClass: "md:col-span-1",
    capabilities: "Next.js 16 App Router & React 19, Headless E-Commerce Solutions, Custom REST & GraphQL APIs, Sub-Second Page Load Optimization",
    showOnHome: true,
  },
  {
    id: "seo",
    slug: "seo",
    title: "Search Engine Optimization",
    shortDescription: "Data-driven SEO campaigns that multiply organic search visibility, drive high-intent leads, and guarantee long-term ROI.",
    content: "<p>Our data-driven SEO frameworks engineer top 3 search rankings for competitive commercial keywords, turning organic search into your most profitable sales channel.</p>",
    icon: "search",
    color: "#00c2ff",
    bentoClass: "md:col-span-1",
    capabilities: "Technical & Core Web Vitals Audits, Commercial Keyword Strategy, Programmatic SEO Architecture, High-Authority Digital PR & Backlinks",
    showOnHome: true,
  },
  {
    id: "graphic-design",
    slug: "graphic-design",
    title: "Graphics & Logo Design",
    shortDescription: "High-impact brand logos, vector emblems, product packaging, and visual identity assets.",
    content: "<p>We design memorable brand identities, modern enterprise logos, vector graphics, and visual design assets engineered to stand out in competitive global markets.</p>",
    icon: "palette",
    color: "#ff007a",
    bentoClass: "md:col-span-1",
    capabilities: "Enterprise Logo Design, Brand Identity Systems, Vector Emblem & Icons, Social Media Visual Assets, Packaging & Print Design",
    showOnHome: true,
  },
  {
    id: "marketing",
    slug: "social-media-management",
    title: "Social Media Management",
    shortDescription: "Organic and paid social campaigns built on psychological triggers that amplify brand authority and drive engagement.",
    content: "<p>We execute aggressive multi-channel marketing campaigns that lower CAC, increase LTV, and scale monthly recurring revenue (MRR).</p>",
    icon: "share",
    color: "#ff3b30",
    bentoClass: "md:col-span-1",
    capabilities: "Multi-Channel Paid Ads (Google & Meta), High-Converting Landing Page Design, Funnel A/B Testing & CRO, Customer Retention Email Workflows",
    showOnHome: true,
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI Systems & Workflow Automation",
    shortDescription: "Custom AI agents, automated CRM pipelines, and intelligent business process engines.",
    content: "<p>Eliminate manual bottlenecks with custom AI subagents, automated data extractors, and intelligent customer support pipelines that operate 24/7.</p>",
    icon: "bot",
    color: "#ffbe00",
    bentoClass: "md:col-span-1",
    capabilities: "Custom LLM Integration & Prompting, Automated Lead Processing Pipelines, AI Support & Sales Chatbots, Internal Tooling Automation",
    showOnHome: true,
  },
  {
    id: "custom-software",
    slug: "custom-software",
    title: "Custom Software Engineering",
    shortDescription: "Tailored SaaS platforms, cloud microservices, and complex database architectures.",
    content: "<p>From concept to deployment, we build robust, scalable software platforms that solve complex business logic with modern cloud infrastructure.</p>",
    icon: "cpu",
    color: "#af52de",
    bentoClass: "md:col-span-1",
    capabilities: "SaaS Platform Development, Database Optimization & Firestore, Cloud Architecture & Serverless, Role-Based Admin Dashboards",
    showOnHome: true,
  },
];

export const getServices = unstable_cache(
  async (): Promise<any[]> => {
    try {
      const snapshot = await db.collection("services").get();
      const docs = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      
      if (docs.length > 0) {
        return docs.sort((a: any, b: any) => {
          const orderA = typeof a.order === 'number' ? a.order : 9999;
          const orderB = typeof b.order === 'number' ? b.order : 9999;
          
          if (orderA !== orderB) return orderA - orderB;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      }
    } catch (err) {
      handleDbError("getServices", err);
    }

    return DEFAULT_SERVICES;
  },
  ["services-list"],
  { revalidate: 1, tags: ["services"] }
);

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<any> => {
    try {
      const snapshot = await db.collection("services").where("slug", "==", slug).limit(1).get();
      if (!snapshot.empty) {
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      }
    } catch (err) {
      handleDbError("getServiceBySlug", err);
    }

    const cleanSlug = (slug || "").toLowerCase().trim();
    const fallbackMatch = DEFAULT_SERVICES.find(s => 
      s.slug === cleanSlug || 
      s.id === cleanSlug || 
      cleanSlug.includes(s.id) ||
      s.slug.includes(cleanSlug)
    );

    return fallbackMatch || null;
  },
  // Next.js unstable_cache automatically appends function args to keyParts, making a unique cache entry per slug
  ["service-by-slug"],
  { revalidate: 1, tags: ["services"] }
);

export const getProjects = unstable_cache(
  async (): Promise<any[]> => {
    try {
      const snapshot = await db.collection("projects").get();
      const dbDocs = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

      const deletedIds = new Set(dbDocs.filter((d: any) => d.deleted).map((d: any) => String(d.id).toLowerCase()));
      const activeDbDocs = dbDocs.filter((d: any) => !d.deleted);

      const merged = [...activeDbDocs];

      const seenIds = new Set<string>();
      const seenSlugs = new Set<string>();
      const seenTitles = new Set<string>();

      activeDbDocs.forEach((d: any) => {
        if (d.id) seenIds.add(String(d.id).toLowerCase());
        if (d.slug) seenSlugs.add(String(d.slug).toLowerCase());
        if (d.title) seenTitles.add(String(d.title).toLowerCase());
      });

      for (const p of ALL_PROJECTS) {
        const pId = String(p.id).toLowerCase();
        const pSlug = String(p.slug).toLowerCase();
        const pTitle = String(p.title).toLowerCase();

        if (
          !deletedIds.has(pId) &&
          !seenIds.has(pId) &&
          !seenSlugs.has(pSlug) &&
          !seenTitles.has(pTitle)
        ) {
          merged.push(p);
          seenIds.add(pId);
          seenSlugs.add(pSlug);
          seenTitles.add(pTitle);
        }
      }

      return merged.sort((a, b) => {
        const orderA = typeof a.order === 'number' ? a.order : 9999;
        const orderB = typeof b.order === 'number' ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        return (a.title || "").localeCompare(b.title || "");
      });
    } catch (err) {
      handleDbError("getProjects", err);
    }

    return ALL_PROJECTS;
  },
  ["projects-list"],
  { revalidate: 1, tags: ["projects"] }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<any> => {
    try {
      const snapshot = await db.collection("projects").where("slug", "==", slug).limit(1).get();
      if (!snapshot.empty) {
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      }
    } catch (err) {
      handleDbError("getProjectBySlug", err);
    }

    return ALL_PROJECTS.find((p) => p.slug === slug) || null;
  },
  ["project-by-slug"],
  { revalidate: 1, tags: ["projects"] }
);

export const getClients = unstable_cache(
  async (): Promise<any[]> => {
    try {
      const snapshot = await db.collection("clients").orderBy("createdAt", "desc").get();
      return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      handleDbError("getClients", err);
      return [];
    }
  },
  ["clients-list"],
  { revalidate: 1, tags: ["clients"] }
);

export const getTestimonials = unstable_cache(
  async (): Promise<any[]> => {
    try {
      const snapshot = await db.collection("testimonials").orderBy("createdAt", "desc").get();
      if (snapshot.docs.length > 0) {
        return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      handleDbError("getTestimonials", err);
    }
    return fallbackTestimonials as any[];
  },
  ["testimonials-list"],
  { revalidate: 1, tags: ["testimonials"] }
);

export const getBlogs = unstable_cache(
  async (): Promise<any[]> => {
    try {
      const snapshot = await db.collection("blogs").orderBy("createdAt", "desc").get();
      if (snapshot.docs.length > 0) {
        return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      handleDbError("getBlogs", err);
    }
    return blogPosts as any[];
  },
  ["blogs-list"],
  { revalidate: 1, tags: ["blogs"] }
);

export const getBlogBySlug = unstable_cache(
  async (slug: string): Promise<any> => {
    try {
      const snapshot = await db.collection("blogs").where("slug", "==", slug).limit(1).get();
      if (!snapshot.empty) {
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      }
    } catch (err) {
      handleDbError("getBlogBySlug", err);
    }
    return blogPosts.find((b: any) => b.slug === slug) || null;
  },
  ["blog-by-slug"],
  { revalidate: 1, tags: ["blogs"] }
);

export const getBlogById = unstable_cache(
  async (id: string): Promise<any> => {
    try {
      const doc = await db.collection("blogs").doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      handleDbError("getBlogById", err);
    }
    return blogPosts.find((b: any) => (b as any).id === id || b.slug === id) || null;
  },
  ["blog-by-id"],
  { revalidate: 1, tags: ["blogs"] }
);

export const getSEO = unstable_cache(
  async (): Promise<any> => {
    try {
      const doc = await db.collection("seo").doc("global").get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      handleDbError("getSEO", err);
    }
    return null;
  },
  ["seo-global"],
  { revalidate: 1, tags: ["seo"] }
);

export const getPageSEO = unstable_cache(
  async (pageSlug: string): Promise<any> => {
    try {
      const doc = await db.collection("seo").doc(pageSlug).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      handleDbError(`getPageSEO(${pageSlug})`, err);
    }
    return null;
  },
  ["seo-page"],
  { revalidate: 1, tags: ["seo"] }
);

export const getSettings = unstable_cache(
  async (): Promise<any> => {
    try {
      const doc = await db.collection("settings").doc("global").get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      handleDbError("getSettings", err);
    }
    return null;
  },
  ["settings-global"],
  { revalidate: 1, tags: ["settings"] }
);

export async function getMessages(): Promise<any[]> {
  try {
    const snapshot = await db.collection("messages").orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    handleDbError("getMessages", err);
    return [];
  }
}

export async function getLeads(): Promise<any[]> {
  try {
    const snapshot = await db.collection("leads").orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    handleDbError("getLeads", err);
    return [];
  }
}

export async function getLeadById(id: string): Promise<any> {
  try {
    const doc = await db.collection("leads").doc(id).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
  } catch (err) {
    handleDbError("getLeadById", err);
  }
  return null;
}

export const getServiceById = unstable_cache(
  async (id: string): Promise<any> => {
    try {
      const doc = await db.collection("services").doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      handleDbError("getServiceById", err);
    }
    return DEFAULT_SERVICES.find((s) => s.id === id || s.slug === id) || null;
  },
  // Next.js unstable_cache automatically appends function args to keyParts, making a unique cache entry per id
  ["service-by-id"],
  { revalidate: 1, tags: ["services"] }
);

export const getProjectById = unstable_cache(
  async (id: string): Promise<any> => {
    try {
      const doc = await db.collection("projects").doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      handleDbError("getProjectById", err);
    }
    return ALL_PROJECTS.find((p) => p.id === id) || null;
  },
  ["project-by-id"],
  { revalidate: 1, tags: ["projects"] }
);

export async function getClientById(id: string): Promise<any> {
  try {
    const doc = await db.collection("clients").doc(id).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    }
  } catch (err) {
    handleDbError("getClientById", err);
  }
  return null;
}

export async function getCount(collection: string) {
  try {
    const snapshot = await db.collection(collection).count().get();
    return snapshot.data().count;
  } catch (err) {
    handleDbError(`getCount(${collection})`, err);
    return 0;
  }
}

export const getCompanyProfile = unstable_cache(
  async (): Promise<any> => {
    try {
      const doc = await db.collection("company").doc("profile").get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      handleDbError("getCompanyProfile", err);
    }
    return null;
  },
  ["company-profile"],
  { revalidate: 1, tags: ["company"] }
);

export const getTeamMembers = unstable_cache(
  async (): Promise<any[]> => {
    try {
      const snapshot = await db.collection("team").get();
      const docs = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

      return docs.sort((a: any, b: any) => {
        const orderA = typeof a.order === 'number' ? a.order : 9999;
        const orderB = typeof b.order === 'number' ? b.order : 9999;
        
        if (orderA !== orderB) return orderA - orderB;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    } catch (err) {
      handleDbError("getTeamMembers", err);
      return [];
    }
  },
  ["team-members"],
  { revalidate: 1, tags: ["team"] }
);

export async function getRolePermissions(): Promise<string[]> {
  try {
    const doc = await db.collection("settings").doc("roles").get();
    if (doc.exists) {
      const data = doc.data();
      return data?.editorPermissions || [];
    }
  } catch (err) {
    handleDbError("getRolePermissions", err);
  }
  return ["/admin", "/admin/projects", "/admin/services", "/admin/blogs", "/admin/seo", "/admin/leads", "/admin/graphic-design", "/admin/banners"];
}

export async function getAnalyticsEvents(): Promise<any[]> {
  try {
    const snapshot = await db.collection("analytics_events").orderBy("timestamp", "desc").get();
    return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    handleDbError("getAnalyticsEvents", err);
    return [];
  }
}


