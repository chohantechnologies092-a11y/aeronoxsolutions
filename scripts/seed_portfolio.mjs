import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
const envPath = path.resolve(".env.local");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf8");
  envConfig.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = value;
    }
  });
}

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  console.error("Missing Firebase credentials in .env.local");
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

const portfolioItems = [
  {
    title: "Accomodation Corner",
    slug: "accomodation-corner",
    category: "Web Development",
    client: "Accomodation Corner",
    shortDescription: "A modern, high-performing web application designed to handle accommodations and booking efficiently.",
    challenge: "The client needed a responsive, user-friendly platform with strong performance to stand out in the accommodation sector.",
    solution: "We built a customized website with a sleek user interface, ensuring fast load times and seamless navigation.",
    results: [
      "Increased user engagement",
      "Streamlined booking process",
      "Enhanced digital presence"
    ],
    image: "/images/portfolio/web1.jpg",
    color: "#3b82f6"
  },
  {
    title: "Emirates Visa Express",
    slug: "emirates-visa-express",
    category: "Web Development",
    client: "Emirates Visa Express",
    shortDescription: "A streamlined portal for processing visa applications quickly and securely.",
    challenge: "The visa application process can be complex and intimidating. The client needed a clear, trust-building portal.",
    solution: "Developed an intuitive, secure web platform that guides users step-by-step through the application process.",
    results: [
      "Higher application completion rate",
      "Reduced support queries",
      "Improved user satisfaction"
    ],
    image: "/images/portfolio/web2.jpg",
    color: "#8b5cf6"
  },
  {
    title: "Eco Green Thermal Solutions",
    slug: "eco-green-thermal",
    category: "Web Development",
    client: "Eco Green Thermal Solutions",
    shortDescription: "A professional corporate website highlighting eco-friendly thermal products and services.",
    challenge: "Showcasing technical products while maintaining an engaging, environmentally-conscious brand image.",
    solution: "Created a clean, modern website with detailed product catalogs and easy lead generation forms.",
    results: [
      "Increased B2B leads",
      "Better brand positioning",
      "Clearer product communication"
    ],
    image: "/images/portfolio/web3.jpg",
    color: "#10b981"
  },
  {
    title: "Budget Bargainz",
    slug: "budget-bargainz",
    category: "Web Development",
    client: "Budget Bargainz",
    shortDescription: "An e-commerce platform offering a wide variety of discounted products.",
    challenge: "Managing a large inventory while ensuring the site remains fast and easy to navigate for shoppers.",
    solution: "Implemented a robust e-commerce architecture with advanced filtering and search capabilities.",
    results: [
      "Higher sales volume",
      "Improved cart abandonment rate",
      "Faster product discovery"
    ],
    image: "/images/portfolio/web4.jpg",
    color: "#f59e0b"
  },
  {
    title: "Perfumish",
    slug: "perfumish",
    category: "Web Development",
    client: "Perfumish",
    shortDescription: "A luxurious e-commerce storefront for premium fragrance collections.",
    challenge: "Translating the luxurious feel of high-end perfumes into a digital shopping experience.",
    solution: "Designed an elegant, visually rich online store focusing on high-quality imagery and smooth checkout.",
    results: [
      "Increased average order value",
      "Enhanced brand prestige",
      "Growing loyal customer base"
    ],
    image: "/images/portfolio/web5.jpg",
    color: "#ec4899"
  },
  {
    title: "Ducting Delivered",
    slug: "ducting-delivered",
    category: "SEO & Marketing",
    client: "Ducting Delivered",
    shortDescription: "A comprehensive SEO campaign to dominate search rankings for HVAC supplies.",
    challenge: "The client was struggling to rank for competitive industry keywords against established giants.",
    solution: "Executed a targeted on-page and technical SEO strategy, coupled with authoritative link building.",
    results: [
      "Ranked #1 for primary keywords",
      "300% increase in organic traffic",
      "Significant boost in online sales"
    ],
    image: "/images/portfolio/seo1.jpg",
    color: "#ef4444"
  },
  {
    title: "Ducting Supplies",
    slug: "ducting-supplies",
    category: "SEO & Marketing",
    client: "Ducting Supplies",
    shortDescription: "Strategic SEO optimization to increase visibility for specialized ducting equipment.",
    challenge: "Low organic visibility and high reliance on paid advertising.",
    solution: "Optimized category and product pages, and created valuable, intent-driven content.",
    results: [
      "Lowered customer acquisition cost",
      "Consistent organic lead generation",
      "Improved domain authority"
    ],
    image: "/images/portfolio/seo2.jpg",
    color: "#6366f1"
  },
  {
    title: "Bluetech Cloud",
    slug: "bluetech-cloud",
    category: "SEO & Marketing",
    client: "Bluetech Cloud",
    shortDescription: "B2B SEO campaign aimed at capturing enterprise-level cloud computing clients.",
    challenge: "Highly technical niche with long sales cycles and intense competition.",
    solution: "Developed an authoritative content strategy targeting long-tail technical queries.",
    results: [
      "Increased enterprise leads by 150%",
      "Positioned brand as an industry thought leader",
      "Higher engagement on technical articles"
    ],
    image: "/images/portfolio/seo3.jpg",
    color: "#0ea5e9"
  },
  {
    title: "Bluecloud Tech",
    slug: "bluecloud-tech",
    category: "SEO & Marketing",
    client: "Bluecloud Tech",
    shortDescription: "A dynamic social media marketing campaign to build brand awareness and community engagement.",
    challenge: "Brand was unknown in the social space and needed to quickly establish a presence.",
    solution: "Created engaging, tech-focused visual content and ran targeted community-building campaigns.",
    results: [
      "Grew followers by 10,000+ in 3 months",
      "High engagement rates across platforms",
      "Generated positive brand sentiment"
    ],
    image: "/images/portfolio/smm1.jpg",
    color: "#14b8a6"
  },
  {
    title: "Pinnacle Builder",
    slug: "pinnacle-builder",
    category: "SEO & Marketing",
    client: "Pinnacle Builder",
    shortDescription: "Social media and local SEO strategy for a premier construction company.",
    challenge: "Needed to showcase project portfolios effectively to local prospective clients.",
    solution: "Leveraged visual platforms like Instagram to display high-quality project timelapses and before/afters.",
    results: [
      "Significant increase in local inquiries",
      "Built a strong localized following",
      "Showcased brand reliability and quality"
    ],
    image: "/images/portfolio/smm2.jpg",
    color: "#f97316"
  },
  {
    title: "Luxora Haus",
    slug: "luxora-haus",
    category: "SEO & Marketing",
    client: "Luxora Haus",
    shortDescription: "A sophisticated social media strategy for a luxury real estate agency.",
    challenge: "Reaching high-net-worth individuals and standing out in the luxury real estate market.",
    solution: "Curated a highly aesthetic Instagram feed and utilized targeted LinkedIn marketing for investors.",
    results: [
      "Connected with key investors",
      "Elevated brand perception",
      "Increased high-value property inquiries"
    ],
    image: "/images/portfolio/smm3.jpg",
    color: "#d946ef"
  }
];

async function seedPortfolio() {
  console.log("Seeding portfolio items...");
  
  // First clear existing portfolio items
  const snapshot = await db.collection("projects").get();
  const batch = db.batch();
  
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();
  console.log("Cleared existing portfolio items.");
  
  // Add new items
  let count = 0;
  for (const item of portfolioItems) {
    const docRef = db.collection("projects").doc(item.slug);
    
    // Add timestamps
    const now = new Date().toISOString();
    const portfolioData = {
      ...item,
      createdAt: now,
      updatedAt: now
    };
    
    await docRef.set(portfolioData);
    console.log(`Added portfolio item: ${item.title}`);
    count++;
  }
  
  console.log(`Successfully seeded ${count} portfolio items!`);
}

seedPortfolio().catch(console.error);
