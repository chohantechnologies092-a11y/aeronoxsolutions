import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const devlyxServices = [
  {
    title: 'Custom Web Engineering',
    slug: 'custom-web-engineering',
    shortDescription: 'High-performance, scalable web applications built with modern frameworks like Next.js, React, and Node.js.',
    content: '<p>High-performance, scalable web applications built with modern frameworks like Next.js, React, and Node.js. We deliver robust architecture that handles growth.</p>',
    color: '#00c2ff', // Cyan/Blue
    icon: 'code',
    bentoClass: "md:col-span-1",
    createdAt: new Date('2023-01-01T00:00:00.000Z')
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    shortDescription: 'Native and cross-platform mobile experiences for iOS and Android that users love.',
    content: '<p>Native and cross-platform mobile experiences for iOS and Android that users love. We use React Native and Flutter to build beautiful apps.</p>',
    color: '#3b82f6', // Blue
    icon: 'smartphone',
    bentoClass: "md:col-span-1",
    createdAt: new Date('2023-01-01T00:00:00.000Z')
  },
  {
    title: 'API & Backend Architecture',
    slug: 'api-backend-architecture',
    shortDescription: 'Secure, resilient backend systems and microservices designed for enterprise-scale data processing.',
    content: '<p>Secure, resilient backend systems and microservices designed for enterprise-scale data processing. We specialize in serverless and containerized deployments.</p>',
    color: '#6366f1', // Indigo
    icon: 'server',
    bentoClass: "md:col-span-1 lg:col-span-2",
    createdAt: new Date('2023-01-01T00:00:00.000Z')
  },
  {
    title: 'SaaS Development',
    slug: 'saas-development',
    shortDescription: 'End-to-end development of Software as a Service products, from MVP to full-scale launch.',
    content: '<p>End-to-end development of Software as a Service products, from MVP to full-scale launch. We handle multi-tenancy, subscriptions, and scalable databases.</p>',
    color: '#ec4899', // Pink
    icon: 'cloud',
    bentoClass: "md:col-span-2 lg:col-span-1",
    createdAt: new Date('2023-01-01T00:00:00.000Z')
  }
];

async function main() {
  for (const service of devlyxServices) {
    const exists = await prisma.service.findUnique({ where: { slug: service.slug } });
    if (!exists) {
      await prisma.service.create({ data: service });
      console.log(`Created service: ${service.title}`);
    } else {
      console.log(`Skipped service (already exists): ${service.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
