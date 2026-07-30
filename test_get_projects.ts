import { getProjects } from "./src/lib/data";

async function test() {
  const projects = await getProjects();
  console.log("Total projects:", projects.length);
  projects.forEach((p, i) => {
    console.log(`[${i}] ID: ${p.id} | Slug: ${p.slug} | Title: ${p.title}`);
  });
}

test();
