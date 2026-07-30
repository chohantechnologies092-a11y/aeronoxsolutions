import { getProjects, getProjectById } from "./src/lib/data";
import { updateProject } from "./src/lib/actions";
import { db } from "./src/lib/firebase-admin";

async function run() {
  console.log("Fetching initial projects...");
  let projects = await getProjects();
  console.log("Initial count:", projects.length);
  
  // Pick a hardcoded project
  const targetId = "furnico-living";
  const project = await getProjectById(targetId);
  console.log("Fetched target project by ID:", project?.id, project?.title);
  
  // Fake a FormData submission for edit
  const formData = new FormData();
  formData.append("title", "Furnico Living V2");
  formData.append("description", project.description);
  formData.append("content", project.content);
  formData.append("serviceCategory", project.serviceCategory);
  formData.append("client", project.client);
  formData.append("tags", project.tags);
  
  console.log("Updating project...");
  // updateProject will call redirect, so we need to catch it or mock redirect
  try {
    await updateProject(targetId, formData);
  } catch(e: any) {
    if (e.message !== "NEXT_REDIRECT") {
      console.error(e);
    }
  }
  
  console.log("Fetching projects after edit...");
  projects = await getProjects();
  console.log("New count:", projects.length);
  
  // Find all projects with id or slug containing 'furnico'
  const furnicoProjects = projects.filter(p => p.id.includes("furnico") || (p.slug && p.slug.includes("furnico")));
  console.log("Furnico projects:");
  furnicoProjects.forEach(p => console.log(p.id, p.slug, p.title));
}

// mock removed

run();
