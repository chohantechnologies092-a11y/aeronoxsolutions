export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  clientLocation: string;
  serviceCategory: string;
  tags: string;
  description: string;
  content: string;
  image: string;
  growthBadge?: string;
  beforeStats?: string;
  afterStats?: string;
  challenge?: string;
  solution?: string;
  liveUrl?: string;
  showOnHome: boolean;
  order: number;
  socialMediaStats?: {
    platform: string;
    description: string;
    beforeStats: string;
    afterStats: string;
    beforeImage?: string;
    afterImage?: string;
  }[];
}

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "qistkhata-recovery-pro",
    title: "QistKhata Recovery Pro v1.0 — FinTech Installment & Ledger Engine",
    slug: "qistkhata-recovery-pro",
    client: "Al-Madina Electronics & Installments",
    clientLocation: "Pakistan",
    serviceCategory: "custom-software",
    tags: "Custom Software, FinTech SaaS, Installment Ledger, Recovery Engine, Next.js",
    description: "Built a comprehensive enterprise FinTech SaaS management system for installment businesses, featuring real-time ledger accounting, guarantor tracking, automated recovery radars, and defaulter alert systems.",
    content: `## Project Overview
QistKhata Recovery Pro v1.0 is an enterprise-grade FinTech SaaS platform engineered specifically for retail installment businesses and recovery management.

### Core Architecture & Features
1. **Executive Recovery Radar:** Live dashboard tracking total contract volume (Rs 1.3M+), cash recovered (Rs 875k+), and remaining market receivables (Rs 427k).
2. **Automated Defaulter Alert Engine:** Real-time overdue payment tracking and instant defaulter notifications.
3. **Ledger & Guarantor Management:** Complete buyer profile, guarantor verification, and flexible monthly installment schedule generation.
4. **Offline-First & Cloud Sync:** High-availability local data persistence combined with secure cloud database synchronization.

### Key Metrics & Business Performance
* **67% Recovery Progress** achieved across active store portfolio contracts.
* Automated calculation of expected net markup profit (Rs 162,000+).
* Zero manual accounting errors across 100% of installment agreements.`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "Rs 1.3M+ Ledger Tracked",
    beforeStats: "Recovery Tracking: Manual Register\nOverdue Defaulters: Unmapped\nCalculation Errors: Frequent",
    afterStats: "Recovery Progress: 67% Automated\nDefaulter Radar: Real-time Alert\nCalculation Accuracy: 100%",
    challenge: "Traditional paper khata registers for installment businesses were prone to calculation errors, missing payment tracking, and unorganized guarantor records.",
    solution: "Engineered a custom dark-mode web application (QistKhata Recovery Pro) with real-time financial metrics, automated payment schedules, and recovery alerts.",
    showOnHome: true,
    order: 0
  },
  {
    id: "furnico-living",
    title: "Furnico Living — Premium E-Commerce Storefront & SEO",
    slug: "furnico-living",
    client: "Furnico Living",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Next.js, E-Commerce, SEO, Graphic Design, SMM",
    description: "Architected a high-converting Next.js e-commerce platform with custom furniture product configurator, coupled with technical SEO and organic social growth campaigns.",
    content: `## Project Overview
Furnico Living is a leading UK luxury furniture retailer. Aeronox Solutions was brought on to deliver a complete digital overhaul including custom web engineering, brand identity redesign, organic SEO scaling, and social media marketing.

### Core Challenges
* Legacy storefront suffered from slow mobile load times (4.8s) causing high bounce rates.
* Poor visibility on competitive UK luxury furniture search terms.
* Disconnected visual branding across social media channels.

### Delivered Engineering & Marketing Solutions
1. **Next.js 16 Storefront:** Engineered a sub-second headless e-commerce store with dynamic 3D room preview and fast filtering.
2. **Technical & Semantic SEO:** Implemented schema markup, optimized site hierarchy, and targeted high-intent commercial keywords.
3. **Social Media & Graphic Suite:** Designed modern vector visual identity assets and ran targeted Instagram and Facebook campaigns.

### Key Results
* **+185% increase** in organic e-commerce revenue within 6 months.
* **Top 3 search rankings** for "Luxury Living Room Furniture UK".
* Reduced page load speed from 4.8s to 0.7s.`,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+185% Organic Revenue",
    beforeStats: "Page Load Speed: 4.8s\nOrganic Monthly Traffic: 1,200\nKeyword Rankings: Page 3+",
    afterStats: "Page Load Speed: 0.7s\nOrganic Monthly Traffic: 28,500+\nKeyword Rankings: Top 3 for Luxury Furniture UK",
    challenge: "High bounce rate on legacy e-commerce portal and low organic search visibility for UK luxury furniture keywords.",
    solution: "Built a headless React/Next.js storefront, executed semantic schema markup for UK search index, and created luxury product graphic showcases.",
    liveUrl: "https://www.furnicoliving.co.uk",
    showOnHome: true,
    order: 1
  },
  {
    id: "ickletots",
    title: "Ickletots — Baby & Kids Apparel E-Commerce Experience",
    slug: "ickletots",
    client: "Ickletots",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Web Engineering, UI/UX, Graphic Design, SMM",
    description: "Designed a vibrant, mobile-first Web application with interactive product customizers and a visual brand identity package.",
    content: `## Project Overview
Ickletots is a premium UK children's fashion brand. We built a high-performance shopping web application paired with social media visual branding and marketing.

### Core Deliverables
* Mobile-first responsive Next.js storefront.
* Custom graphic assets, logo branding, and social templates.
* Multi-channel social media acquisition campaign.

### Business Impact
* **+220% increase** in mobile social sales.
* Mobile conversion rate boosted from 0.9% to 3.8%.`,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+220% Social Sales",
    beforeStats: "Mobile Conversion: 0.9%\nSocial Engagement: Low\nBrand Recognition: Local",
    afterStats: "Mobile Conversion: 3.8%\nSocial Reach: 150k+/mo\nBrand Recognition: UK-wide",
    challenge: "Outdated storefront layout with low mobile conversions and inconsistent visual branding across social channels.",
    solution: "Engineered a lightning-fast responsive storefront, redesigned brand assets & logo graphics, and launched targeted social campaigns.",
    liveUrl: "https://www.ickletots.co.uk",
    showOnHome: true,
    order: 2
  },
  {
    id: "connect-ai-solutions",
    title: "Connect AI Solutions — B2B Enterprise AI & Software Portal",
    slug: "connect-ai-solutions",
    client: "Connect AI Solutions",
    clientLocation: "United Kingdom",
    serviceCategory: "custom-software",
    tags: "Next.js, AI Systems, Technical SEO, Graphic Design, SMM",
    description: "Built an enterprise B2B software portal with automated workflow integrations, accompanied by high-authority B2B technical SEO and social acquisition.",
    content: `## Project Overview
Connect AI Solutions provides enterprise AI automation to UK businesses. Aeronox engineered their client portal, technical SEO silos, and visual identity.

### Engineering Features
* Role-based B2B dashboard for client workflow monitoring.
* Technical SEO optimization for AI & enterprise software keywords.
* Custom vector graphics and presentation decks for executive sales calls.

### Measurable Results
* **3.5x increase** in qualified B2B sales pipeline leads.
* Domain Rating elevated from DR 12 to DR 48.`,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "3.5x B2B Pipeline",
    beforeStats: "Lead Velocity: 5 leads/mo\nDomain Rating: DR 12\nSite Performance: 62/100",
    afterStats: "Lead Velocity: 45+ leads/mo\nDomain Rating: DR 48\nSite Performance: 99/100",
    challenge: "Low search visibility for enterprise AI automation software and unoptimized lead acquisition funnels.",
    solution: "Developed a custom Web application, optimized B2B keyword silos, designed high-end vector graphics, and ran social lead generation.",
    liveUrl: "https://www.connectaisolutions.com",
    showOnHome: true,
    order: 3
  },
  {
    id: "luxora-haus",
    title: "Luxora Haus — Luxury Interior & Homeware Digital Showcase",
    slug: "luxora-haus",
    client: "Luxora Haus",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Web Engineering, Interior Styling, SMM, Graphic Design",
    description: "Developed a minimalist, ultra-fast web portfolio showcasing luxury home architecture and interior styling, paired with targeted social campaigns.",
    content: `## Project Overview
Luxora Haus creates bespoke architectural interiors in the UK. We crafted a high-definition web portfolio and social marketing channels to showcase luxury projects.

### Highlights
* Sub-second high-resolution gallery rendering.
* Social media growth campaign targeting high-net-worth homeowners.`,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+160% Direct Inquiries",
    beforeStats: "Site Speed: 5.2s\nLead Bounce Rate: 68%\nSocial Followers: 800",
    afterStats: "Site Speed: 0.8s\nLead Bounce Rate: 24%\nSocial Followers: 24,500+",
    challenge: "Outdated Web layout failed to reflect the high-end luxury aesthetic of the interior designs.",
    solution: "Custom Web application with high-definition imagery, micro-animations, and social audience targeting.",
    liveUrl: "https://www.luxorahaus.co.uk",
    showOnHome: false,
    order: 4
  },
  {
    id: "phantom-properties",
    title: "Phantom Properties — Real Estate Portal & Property Finder UAE",
    slug: "phantom-properties",
    client: "Phantom Properties",
    clientLocation: "UAE",
    serviceCategory: "web-dev",
    tags: "Real Estate, Next.js, Web Development, UAE",
    description: "High-performance real estate portal with interactive floor plans, localized currency converters, and instant WhatsApp booking integration.",
    content: `## Project Overview
Phantom Properties is a prominent real estate agency in Dubai, UAE. We engineered a high-speed property listing engine optimized for international investors.

### Key Features
* Dynamic floor plan viewer and currency switcher (AED, USD, GBP, EUR).
* Direct CRM and WhatsApp lead routing.`,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "4.2x Property Views",
    beforeStats: "Property Inquiries: 12/mo\nLoad Time: 4.5s\nMobile Score: 45/100",
    afterStats: "Property Inquiries: 110+/mo\nLoad Time: 0.6s\nMobile Score: 98/100",
    challenge: "Needed a high-speed real estate portal capable of handling high-resolution 3D property renderings and mobile inquiries in UAE.",
    solution: "Architected a Next.js server-rendered property portal with instant search filters and multi-currency listing view.",
    liveUrl: "https://www.phantomproperties.ae",
    showOnHome: false,
    order: 5
  },
  {
    id: "orphan-care",
    title: "Orphan Care — Non-Profit Donation Portal & Outreach",
    slug: "orphan-care",
    client: "Orphan Care",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Non-Profit, Next.js, SEO, Graphic Design, SMM",
    description: "Built an accessible, secure online donation portal with recurring subscription options, backed by SEO and organic charity outreach campaigns.",
    content: `## Project Overview
Orphan Care UK provides humanitarian relief worldwide. We developed their web donation platform, WCAG accessible interface, and search engine visibility.

### Results
* **+310% increase** in online recurring donor conversions.
* Ranked #1 on Google for key UK charity keywords.`,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+310% Online Donations",
    beforeStats: "Monthly Online Donations: £4.5k\nSEO Visibility: Page 4\nMobile Usability: Poor",
    afterStats: "Monthly Online Donations: £38k+\nSEO Visibility: Page 1 #1\nMobile Usability: 100% WCAG",
    challenge: "Complex donation checkout and lack of organic search rankings for UK humanitarian aid keywords.",
    solution: "Built a streamlined Next.js donation system, conducted technical SEO optimization, designed social graphics, and boosted UK organic rankings.",
    liveUrl: "https://www.orphancare.co.uk",
    showOnHome: false,
    order: 6
  },
  {
    id: "discover-ibt",
    title: "Discover IBT — Business & Technology Consultation Platform",
    slug: "discover-ibt",
    client: "Discover IBT",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Corporate Web Dev, SEO, Graphic Design, SMM",
    description: "Full digital transformation including enterprise Web portal, technical SEO indexing, social media authority building, and modern brand design.",
    content: `## Project Overview
Discover IBT offers IT consultation to UK firms. Aeronox engineered a comprehensive corporate web application and multi-channel SEO campaign.`,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "2.8x Pipeline Growth",
    beforeStats: "Organic Inquiries: 3/mo\nSearch Impressions: 5k/mo",
    afterStats: "Organic Inquiries: 32/mo\nSearch Impressions: 120k/mo",
    challenge: "Weak online presence and fragmented branding across digital touchpoints for corporate consultation.",
    solution: "Re-engineered company portal, created unified visual identity, and launched multi-channel search & social acquisition.",
    liveUrl: "https://www.discoveribt.com",
    showOnHome: false,
    order: 7
  },
  {
    id: "index-house",
    title: "Index House — Corporate Property & Office Management Portal",
    slug: "index-house",
    client: "Index House",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Web Engineering, Commercial Real Estate, Next.js",
    description: "Engineered a sleek commercial property listing platform with online booking tours and tenant management UI.",
    content: `## Project Overview
Index House manages commercial workspaces across the UK. We developed an online office scheduling and virtual tour platform.`,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+140% Tour Velocity",
    beforeStats: "Tour Bookings: Manual Phone Only\nSite Performance: 55/100",
    afterStats: "Tour Bookings: 85% Automated Online\nSite Performance: 96/100",
    challenge: "Outdated static website with no online tour scheduling or lead capture capabilities.",
    solution: "Built a responsive Next.js application with dynamic property filter and calendar scheduling module.",
    liveUrl: "https://www.indexhouse.co.uk",
    showOnHome: false,
    order: 8
  },
  {
    id: "soft-office",
    title: "Soft Office — B2B Office Supplies Storefront & Catalog System",
    slug: "soft-office",
    client: "Soft Office",
    clientLocation: "United Kingdom",
    serviceCategory: "custom-software",
    tags: "B2B E-Commerce, Web Development, Catalog System",
    description: "Scalable B2B e-commerce platform supporting bulk order inquiries, custom invoice generation, and product catalog management.",
    content: `## Project Overview
Soft Office supplies corporate furniture and stationery in the UK. We engineered a custom B2B web catalog with bulk pricing rules.`,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+190% B2B Orders",
    beforeStats: "Bulk Order Inquiries: 8/mo\nCatalog Indexing: Slow",
    afterStats: "Bulk Order Inquiries: 48/mo\nCatalog Indexing: Real-time",
    challenge: "Inability to process high-volume B2B catalog searches efficiently.",
    solution: "Built a high-performance web catalog with instant search, filtering, and quotation request workflow.",
    liveUrl: "https://www.softoffice.co.uk",
    showOnHome: false,
    order: 9
  },
  {
    id: "ducting-delivered",
    title: "Ducting Delivered — Industrial HVAC & Ductwork E-Commerce & SEO",
    slug: "ducting-delivered",
    client: "Ducting Delivered",
    clientLocation: "United Kingdom",
    serviceCategory: "seo",
    tags: "Industrial SEO, Technical Web Dev, E-Commerce",
    description: "Re-engineered industrial e-commerce shop with technical SEO targeting UK HVAC contractors and commercial builders.",
    content: `## Project Overview
Ducting Delivered supplies ductwork across the UK. We scaled their organic search keywords and optimized catalog indexing speed.`,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+240% Keyword Lift",
    beforeStats: "Organic Revenue: £8k/mo\nCore Web Vitals: Failed",
    afterStats: "Organic Revenue: £42k/mo\nCore Web Vitals: Passed 100%",
    challenge: "Poor Google indexation of 2,000+ industrial product SKUs and slow page response times.",
    solution: "Implemented programmatic SEO architecture, optimized technical speed, and rebuilt product pages.",
    liveUrl: "https://www.ductingdelivered.co.uk",
    showOnHome: false,
    order: 10
  },
  {
    id: "pinnacle-builder",
    title: "Pinnacle Builder — Construction & Renovation Social Acquisition",
    slug: "pinnacle-builder",
    client: "Pinnacle Builder",
    clientLocation: "United Kingdom",
    serviceCategory: "marketing",
    tags: "Social Media Marketing, Construction Lead Gen, SMM",
    description: "Designed a localized social media growth and lead acquisition engine targeting high-ticket residential renovation clients in the UK.",
    content: `## Project Overview
Pinnacle Builder delivers premium house extensions and renovations in the UK. We established their digital social marketing funnel.`,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "£450k+ Pipeline",
    beforeStats: "Social Leads: 0\nBrand Impressions: Negligible",
    afterStats: "Social Leads: 22 qualified/mo\nBrand Impressions: 85,000+/mo",
    challenge: "Reliance on traditional word-of-mouth with no digital inbound lead channels for construction projects.",
    solution: "Developed video showcase reels of completed building projects and deployed targeted social ad funnels.",
    showOnHome: false,
    order: 11
  },
  {
    id: "quick-airport-transfers",
    title: "Quick Airport Transfers — High-ROAS Google Search PPC Campaign",
    slug: "quick-airport-transfers",
    client: "Quick Airport Transfers",
    clientLocation: "United Kingdom",
    serviceCategory: "marketing",
    tags: "Google PPC, Paid Search Ads, Conversion Optimization",
    description: "Engineered a hyper-targeted Google Search PPC campaign for airport transfer keywords, optimizing cost-per-acquisition (CPA).",
    content: `## Project Overview
Quick Airport Transfers needed to acquire high-intent UK travel bookings via Google Ads while driving down CPA.

### Campaign Results
* Reduced booking CPA from £24.00 to £7.50.
* Achieved a verified 5.4x Return on Ad Spend (ROAS).`,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "5.4x ROAS",
    beforeStats: "Cost Per Booking: £24.00\nConversion Rate: 2.1%",
    afterStats: "Cost Per Booking: £7.50\nConversion Rate: 8.4%",
    challenge: "Wasted ad spend on non-converting broad match terms in competitive UK transportation markets.",
    solution: "Re-structured campaign negative keyword match lists, created dynamic landing pages, and implemented conversion tracking.",
    liveUrl: "https://www.quickairporttransfers.co.uk",
    showOnHome: false,
    order: 12
  },
  {
    id: "home-start-furniture-place",
    title: "Home Start Furniture Place — Custom Furniture E-Commerce",
    slug: "home-start-furniture-place",
    client: "Home Start Furniture Place",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Web Engineering, E-Commerce, UX Design",
    description: "Designed an interactive online furniture showcase with custom room visualizer and seamless mobile checkout integration.",
    content: `## Project Overview
Home Start Furniture Place is a popular UK home furnishings provider. We rebuilt their e-commerce storefront for 1-tap mobile ordering.`,
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+175% Checkout Lift",
    beforeStats: "Cart Abandonment: 78%\nMobile UX: Cluttered",
    afterStats: "Cart Abandonment: 34%\nMobile UX: Frictionless 1-Tap",
    challenge: "High cart abandonment rate on mobile devices due to slow checkout steps.",
    solution: "Developed a custom Next.js e-commerce app with single-page checkout and fast product media loading.",
    liveUrl: "https://www.homestartfurnitureplace.co.uk",
    showOnHome: false,
    order: 13
  },
  {
    id: "heidis-wardrobe",
    title: "Heidis Wardrobe — Boutique Fashion & E-Commerce Web App",
    slug: "heidis-wardrobe",
    client: "Heidis Wardrobe",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Fashion E-Commerce, Web Development, Next.js",
    description: "Built an elegant fashion boutique storefront featuring seasonal collections, dynamic inventory sync, and instant filtering.",
    content: `## Project Overview
Heidis Wardrobe is a UK boutique fashion brand. We built a high-fashion digital storefront with instant collection lookbooks.`,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "3.1x Mobile Sales",
    beforeStats: "Mobile Page Load: 4.1s\nRepeat Customers: 12%",
    afterStats: "Mobile Page Load: 0.7s\nRepeat Customers: 41%",
    challenge: "Slow image rendering and lack of mobile optimization caused lost sales during seasonal collection drops.",
    solution: "Created a lightweight Next.js frontend with automated image compression and instant client side filter.",
    liveUrl: "https://www.heidiswardrobe.co.uk",
    showOnHome: false,
    order: 14
  },
  {
    id: "urus-rent-a-car",
    title: "URUS Rent A Car — Luxury Supercar Rental SEO & Brand UAE",
    slug: "urus-rent-a-car",
    client: "URUS Rent A Car",
    clientLocation: "UAE",
    serviceCategory: "seo",
    tags: "Luxury Automotive, SEO, Social Media, Graphic Design, UAE",
    description: "Executed high-impact luxury brand design, supercar social video campaigns, and organic SEO targeting Dubai tourists & VIP clientele.",
    content: `## Project Overview
URUS Rent A Car provides exotic supercar rentals in Dubai, UAE. Aeronox built their SEO presence, social reels engine, and graphic identity.

### Results
* Ranked #1 on Google Dubai for "Urus Car Rental Dubai".
* Increased organic customer bookings by **+280%**.`,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+280% Organic Bookings",
    beforeStats: "Dubai Organic Rank: Page 3\nInstagram Engagement: 0.8%",
    afterStats: "Dubai Organic Rank: Top 3 (#1 for Urus Rental)\nInstagram Engagement: 6.4%",
    challenge: "Fierce competition in Dubai luxury car rental market with high customer acquisition costs.",
    solution: "Built high-authority local SEO citations, created premium supercar vector graphics, and ran viral social reels.",
    liveUrl: "https://www.urusrentacar.ae",
    showOnHome: false,
    order: 15
  },
  {
    id: "kor-rent-a-car",
    title: "KOR Rent A Car — Premium Fleet Rental Platform & Full Marketing UAE",
    slug: "kor-rent-a-car",
    client: "KOR Rent A Car",
    clientLocation: "UAE",
    serviceCategory: "web-dev",
    tags: "Fleet Management Web App, SEO, SMM, Graphic Design, UAE",
    description: "Engineered a complete car booking web app with online reservation system, backed by technical SEO and social acquisition.",
    content: `## Project Overview
KOR Rent A Car manages a fleet of luxury and economy vehicles in UAE. We developed their web application, brand design, and search campaign.`,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+340% Online Reservations",
    beforeStats: "Online Reservations: 15/mo\nGoogle Ranking: Unindexed",
    afterStats: "Online Reservations: 140+/mo\nGoogle Ranking: Top 3 Dubai",
    challenge: "Manual booking system via WhatsApp was prone to double bookings and lost leads.",
    solution: "Built a real-time fleet availability web portal with instant booking confirmation, SEO ranking strategy, and social branding.",
    liveUrl: "https://www.kor.ae",
    showOnHome: false,
    order: 16
  },
  {
    id: "casita-furniture",
    title: "Casita Furniture — Complete Digital E-Commerce Transformation",
    slug: "casita-furniture",
    client: "Casita Furniture",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Next.js, Headless E-Commerce, SEO, Graphic Design, SMM",
    description: "Architected a custom headless store and designed a localized UK SEO roadmap, leading to a 140% traffic increase.",
    content: `## Project Overview
Casita Furniture is a premier UK home furnishing brand. We delivered full headless web engineering, SEO, graphic identity, and social media management.`,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+140% Traffic Increase",
    beforeStats: "Page Load: 3.8s\nOrganic Traffic: 3,500/mo",
    afterStats: "Page Load: 0.6s\nOrganic Traffic: 18,200/mo",
    challenge: "Needed scalable e-commerce infrastructure to handle nationwide UK delivery orders.",
    solution: "Headless Shopify + Next.js architecture, complete brand graphic suite, and continuous UK SEO optimization.",
    liveUrl: "https://www.casitafurniture.co.uk",
    showOnHome: false,
    order: 17
  },
  {
    id: "online-quran-academy",
    title: "Online Quran Academy — EdTech Platform & Global Student Acquisition",
    slug: "online-quran-academy",
    client: "Online Quran Academy",
    clientLocation: "Pakistan",
    serviceCategory: "web-dev",
    tags: "EdTech, Web Engineering, SMM, Graphic Design",
    description: "Built an interactive EdTech student portal with course enrollment tools, supported by global social acquisition campaigns.",
    content: `## Project Overview
Online Quran Academy connects international students with expert tutors. Aeronox built their student portal and social marketing pipeline.`,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+380% Student Registrations",
    beforeStats: "Monthly Student Enrollment: 25\nGlobal Reach: Limited",
    afterStats: "Monthly Student Enrollment: 210+\nGlobal Reach: 18 Countries",
    challenge: "Reaching international students across UK, USA, UAE, and Europe with a trustworthy brand image.",
    solution: "Developed modern EdTech web portal, multi-lingual social media graphics, and targeted global social campaigns.",
    liveUrl: "https://www.onlinequran-academy.com",
    showOnHome: false,
    order: 18
  },
  {
    id: "cake-corner",
    title: "Cake Corner — Artisanal Bakery Web App & Local SEO UK",
    slug: "cake-corner",
    client: "Cake Corner",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Bakery Web App, Local SEO, Social Media Marketing",
    description: "Custom online cake ordering web application with custom design selector, local SEO optimization, and social content strategy.",
    content: `## Project Overview
Cake Corner is a popular UK custom bakery. We engineered a step-by-step custom cake ordering web application and localized Google SEO.`,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+210% Custom Pre-Orders",
    beforeStats: "Local Google Map Rank: #14\nOnline Pre-Orders: 5/week",
    afterStats: "Local Google Map Rank: #1\nOnline Pre-Orders: 42/week",
    challenge: "Inability to take online custom cake order specs leading to heavy phone workload.",
    solution: "Developed a custom cake builder web app with step-by-step options and optimized Google Business Profile SEO.",
    liveUrl: "https://www.cakecornerwm.co.uk",
    showOnHome: false,
    order: 20
  },
  {
    id: "kids-wholesale",
    title: "Kids Wholesale — B2B Childrenswear Wholesale Web Portal",
    slug: "kids-wholesale",
    client: "Kids Wholesale",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "B2B Wholesale, Web Engineering, Next.js",
    description: "High-capacity B2B wholesale platform featuring bulk pricing tiers, VAT tax calculations, and trade account verification.",
    content: `## Project Overview
Kids Wholesale is a UK childrenswear distributor. We developed an automated B2B portal for retail buyers across Europe.`,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+195% Trade Accounts",
    beforeStats: "Trade Registration: Manual PDF\nCatalog Load: 6s",
    afterStats: "Trade Registration: Instant Digital Approval\nCatalog Load: 0.5s",
    challenge: "Manual trade account verification slowed down new buyer onboarding.",
    solution: "Built an automated B2B portal with role-based buyer pricing tiers and real-time inventory management.",
    liveUrl: "https://www.kidswholesale.co.uk",
    showOnHome: false,
    order: 21
  },
  {
    id: "mansuri-fashion",
    title: "Mansuri Fashion — Designer Apparel E-Commerce & Organic SEO",
    slug: "mansuri-fashion",
    client: "Mansuri Fashion",
    clientLocation: "United Kingdom",
    serviceCategory: "web-dev",
    tags: "Fashion E-Commerce, SEO, Web Development, SMM",
    description: "Modern designer clothing storefront with high-resolution visual catalog, organic SEO optimization, and social fashion marketing.",
    content: `## Project Overview
Mansuri Fashion offers luxury ethnic & contemporary apparel in the UK. Aeronox built their web app and scaled organic search revenue.`,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "+260% E-Commerce Revenue",
    beforeStats: "Organic Search Revenue: £3.2k/mo\nMobile Bounce: 62%",
    afterStats: "Organic Search Revenue: £24.8k/mo\nMobile Bounce: 19%",
    challenge: "Low search engine presence for designer fashion keywords in the UK market.",
    solution: "Developed high-speed Next.js fashion storefront with structured schema and active social content strategy.",
    liveUrl: "https://www.mansurifashions.co.uk",
    showOnHome: false,
    order: 22
  },
  {
    id: "tropi-juice",
    title: "Tropi Juice — Beverage Brand Launch & Social Media Marketing",
    slug: "tropi-juice",
    client: "Tropi Juice",
    clientLocation: "United Kingdom",
    serviceCategory: "marketing",
    tags: "Social Media Marketing, Beverage Branding, Viral Reels",
    description: "Vibrant social media branding, promo campaign, and influencer marketing launch for a fresh juice & smoothie brand in the UK.",
    content: `## Project Overview
Tropi Juice launched a fresh beverage line in the UK. Aeronox created their social media marketing campaign and brand graphics.`,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=1200",
    growthBadge: "120k+ Social Reach",
    beforeStats: "Brand Engagement: 0\nRetail Footfall Impact: Unmapped",
    afterStats: "Brand Engagement: 8.2%\nRetail Footfall Impact: +35% Store Traffic",
    challenge: "Launching a new beverage product line in a competitive retail environment.",
    solution: "Designed high-energy visual graphics, ran viral short-form video reels, and managed local social community outreach.",
    showOnHome: false,
    order: 23
  }
];
