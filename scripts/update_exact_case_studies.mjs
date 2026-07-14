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

// Full Case Study Content Mappings
const caseStudies = {
  "ducting-delivered": {
    content: `
      <h2>The Problem:-</h2>
      <p>Ducting Delivered, a UK-based provider of industrial and commercial ventilation components, faced a significant "Digital Ceiling." While they offered high-quality galvanized spiral ducting and accessories, their website was functionally invisible to their core B2B audience. The brand suffered from <b>technical SEO decay</b>, with slow page speeds and a lack of mobile optimization that frustrated contractors on-site. Furthermore, their search visibility was limited to their own brand name, leaving them out of the competition for high-volume, "money" keywords like <i>"spiral ducting UK,"</i> <i>"commercial ventilation supplies,"</i> and <i>"galvanised ducting components."</i> Without a structured content hierarchy, search engines were unable to categorize their thousands of technical SKUs, resulting in a <b>stagnant organic lead flow.</b></p>
      
      <h2>The Solutions:-</h2>
      <p>We implemented a "Performance & Authority" SEO framework to transform the site into an industrial procurement powerhouse:</p>
      <ul>
        <li><b>Technical Architecture Cleanup:</b> We optimized the Shopify-based infrastructure, improving Core Web Vitals and implementing a clean URL structure that grouped products by diameter and material, making it easier for Google to index.</li>
        <li><b>Topical Authority Strategy:</b> We moved beyond product names to create <b>Technical Buying Guides</b> and "How-to" content (e.g., <i>"How to calculate airflow for commercial kitchens"</i>). This positioned the brand as an expert resource, not just a seller.</li>
        <li><b>High-Intent Keyword Mapping:</b> We optimized every collection and product page for long-tail, high-intent terms used by HVAC engineers and procurement officers, such as <i>"galvanised steel spiral pipe 150mm"</i> and <i>"fire-rated ducting connectors."</i></li>
        <li><b>Industrial Backlink Acquisition:</b> We secured placements and citations from UK-based construction, engineering, and HVAC trade publications to build domain authority and local trust.</li>
      </ul>
      
      <h2>Outcomes / Results:-</h2>
      <p>The strategic SEO intervention successfully broke the digital ceiling for Ducting Delivered, yielding a <b>120% increase in organic search traffic</b> within the first 10 months. The brand moved from invisible to a dominant market position, with <b>over 50 priority industry keywords reaching Page 1</b> of Google. This visibility drove a <b>65% increase in high-value B2B inquiries</b> and wholesale orders, significantly reducing the company's reliance on paid advertising. By aligning technical excellence with a deep understanding of the HVAC buyer journey, Ducting Delivered is now a primary digital destination for ventilation professionals across the UK.</p>
    `,
    description: "SEO for Ducting Delivered driving 120% traffic growth and Page 1 rankings. Increase B2B leads and sales."
  },
  "bluetech-cloud": {
    content: `
      <h2>The Problem:-</h2>
      <p>Bluetech Cloud, an emerging Managed IT and Cloud Solutions provider, was struggling to gain traction in an oversaturated enterprise technology market. Their primary challenge was <b>"Commoditization Syndrome"</b>. Their messaging and digital footprint blended in with thousands of other generic IT support companies. When potential clients searched for specialized services like <i>"AWS migration services London"</i> or <i>"enterprise cybersecurity audits,"</i> Bluetech Cloud was nowhere to be found. Their website served merely as a digital brochure rather than a lead generation engine. They lacked a clear, search-optimized value proposition to attract their ideal target audience: mid-sized enterprises looking to scale their cloud infrastructure securely.</p>
      
      <h2>The Solutions:-</h2>
      <p>We engineered a highly targeted B2B SEO and Content Strategy designed to capture high-intent, enterprise-level leads:</p>
      <ul>
        <li><b>Service Pillar Strategy:</b> We restructured their website architecture, creating deep, authoritative "Pillar Pages" for each core service (Cloud Migration, Cybersecurity, Managed IT, VoIP).</li>
        <li><b>Competitor Keyword Gap Analysis:</b> We identified valuable, low-competition technical keywords that larger competitors were ignoring, allowing us to capture high-intent traffic quickly.</li>
        <li><b>Technical SEO & Speed Optimization:</b> We overhauled the website's backend, ensuring lightning-fast load speeds, perfect mobile responsiveness, and schema markup (e.g., LocalBusiness and Service schema) to help Google understand their offerings.</li>
        <li><b>Thought Leadership Content:</b> We launched a technical blog focusing on solving specific IT pain points for CTOs and IT Managers, creating highly shareable content that naturally attracted high-quality backlinks.</li>
      </ul>
      
      <h2>Outcomes / Results:-</h2>
      <p>The transformation was profound. Within 12 months, Bluetech Cloud transitioned from an invisible player to a recognized authority in the UK cloud sector. We achieved a <b>150% increase in organic traffic</b>, driven primarily by CTOs and IT Directors actively searching for complex cloud solutions. Crucially, the quality of leads skyrocketed, resulting in a <b>200% increase in high-ticket enterprise contracts</b>. By establishing topical authority and dominating niche, high-value search terms, Bluetech Cloud significantly reduced their customer acquisition cost and built a sustainable, long-term pipeline of qualified B2B leads.</p>
    `,
    description: "B2B SEO campaign aimed at capturing enterprise-level cloud computing clients, increasing enterprise leads by 150%."
  },
  "luxora-haus": {
    content: `
      <h2>The Problem:-</h2>
      <p>Luxora Haus, an exclusive luxury real estate agency, faced a unique challenge: reaching ultra-high-net-worth individuals (UHNWIs) in a crowded, highly competitive digital space. Traditional marketing methods were failing to capture the attention of this elusive demographic. Their digital presence felt disconnected and failed to reflect the true prestige and exclusivity of their multi-million-pound property portfolio. They needed a strategy that didn't just showcase properties, but sold a lifestyle, requiring a sophisticated approach to Social Media Management that could cut through the noise and directly engage international investors and affluent buyers.</p>
      
      <h2>The Solutions:-</h2>
      <p>We crafted a bespoke, high-end Social Media strategy focused on aesthetic excellence and targeted networking:</p>
      <ul>
        <li><b>Visual Storytelling & Aesthetics:</b> We completely overhauled their visual identity on Instagram and YouTube. We moved away from standard property photos to producing cinematic, high-production-value video tours and aspirational lifestyle content that resonated with UHNWIs.</li>
        <li><b>LinkedIn Investor Outreach:</b> We implemented a highly targeted LinkedIn strategy, optimizing the profiles of the agency's lead brokers to position them as market authorities. We initiated direct, high-value networking campaigns targeting international property investors, family offices, and wealth managers.</li>
        <li><b>Targeted Meta Advertising (Facebook/Instagram):</b> We ran highly sophisticated, geo-targeted ad campaigns, focusing on specific affluent postcodes globally, retargeting website visitors, and utilizing lookalike audiences based on their existing high-value client list.</li>
        <li><b>Exclusive "Off-Market" Teasers:</b> We utilized Instagram Stories and private groups to create a sense of urgency and exclusivity by teasing off-market properties, encouraging direct DMs and private inquiries.</li>
      </ul>
      
      <h2>Outcomes / Results:-</h2>
      <p>The strategy successfully elevated Luxora Haus from a premium agency to an internationally recognized luxury brand. The visual overhaul led to a <b>300% increase in social media engagement</b>, rapidly growing a community of affluent followers. Most importantly, the targeted LinkedIn and Meta strategies generated a consistent flow of highly qualified leads. Within 8 months, the agency attributed <b>over £15 Million in property sales directly to social media inquiries</b>. The campaign successfully positioned Luxora Haus directly in front of the world's most discerning buyers, turning their digital presence into their most powerful sales asset.</p>
    `,
    description: "A sophisticated social media strategy for a luxury real estate agency, driving £15M+ in property sales via social inquiries."
  },
  "budget-bargainz": {
    content: `
      <h2>The Problem:-</h2>
      <p>Budget Bargainz, a growing discount e-commerce retailer, was struggling to maintain profitability and scale in a fiercely competitive online retail environment. Their primary challenge was <b>Cart Abandonment and Low Conversion Rates.</b> Despite driving traffic to their site, a poorly optimized user experience, a complicated checkout process, and slow page load times were causing potential customers to leave before completing their purchases. Furthermore, their website's architecture was rigid, making it difficult for the internal team to quickly update inventory, run flash sales, or adapt to rapidly changing consumer trends. They needed a complete digital overhaul to create a frictionless, high-converting shopping experience.</p>
      
      <h2>The Solutions:-</h2>
      <p>We completely re-engineered their e-commerce platform, focusing relentlessly on user experience (UX) and conversion rate optimization (CRO):</p>
      <ul>
        <li><b>Headless E-commerce Architecture:</b> We migrated them to a modern, headless architecture (utilizing Shopify Plus for the backend and a custom Next.js frontend). This decoupled structure allowed for blazing-fast page load speeds, crucial for retaining impatient discount shoppers.</li>
        <li><b>Frictionless Checkout Redesign:</b> We overhauled the checkout flow, implementing a streamlined, one-page checkout process with multiple payment options (including Buy Now, Pay Later solutions like Klarna) to drastically reduce cart abandonment.</li>
        <li><b>Intelligent Search & Filtering:</b> We integrated advanced, AI-powered search functionality (Algolia), allowing users to find specific bargains instantly through faceted filtering, typo-tolerance, and dynamic product recommendations.</li>
        <li><b>Mobile-First Optimization:</b> Recognizing that over 70% of their traffic came from smartphones, we designed a deeply intuitive mobile experience with thumb-friendly navigation and lightning-fast image loading.</li>
      </ul>
      
      <h2>Outcomes / Results:-</h2>
      <p>The impact of the new platform was immediate and dramatic. The improved site speed and streamlined checkout process led to a <b>45% reduction in cart abandonment.</b> Overall conversion rates skyrocketed, resulting in a <b>210% increase in online revenue</b> within the first six months post-launch. The headless architecture also empowered the internal marketing team, reducing the time required to launch new sales campaigns by 80%. Budget Bargainz now possesses a robust, scalable, and high-performing digital storefront capable of handling massive traffic spikes during peak retail seasons like Black Friday.</p>
    `,
    description: "An e-commerce platform offering a wide variety of discounted products, reducing cart abandonment by 45%."
  }
};

async function updateSpecificCaseStudies() {
  console.log("Updating specific case studies with exact content...");
  
  let count = 0;
  
  for (const [slug, data] of Object.entries(caseStudies)) {
    const docRef = db.collection("projects").doc(slug);
    const doc = await docRef.get();
    
    if (doc.exists) {
      await docRef.update({
        content: data.content,
        description: data.description,
      });
      console.log(`Successfully updated exact content for: ${slug}`);
      count++;
    } else {
      console.log(`Warning: Project ${slug} not found in database.`);
    }
  }
  
  console.log(`Successfully updated ${count} specific case studies!`);
}

updateSpecificCaseStudies().catch(console.error);
