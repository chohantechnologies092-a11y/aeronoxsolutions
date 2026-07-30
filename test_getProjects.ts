import { getProjects } from "./src/lib/data";

async function main() {
  const projects = await getProjects();
  const ickletots = projects.filter(p => p.id === "ickletots" || p.slug === "ickletots");
  console.log("Ickletots items:", ickletots.length);
  ickletots.forEach((p, i) => {
    console.log(`\nItem ${i}:`);
    console.log(`ID: ${p.id}`);
    console.log(`Slug: ${p.slug}`);
    console.log(`Title: ${p.title}`);
  });
}

main().catch(console.error);
