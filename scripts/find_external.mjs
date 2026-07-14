import * as https from "https";

const caseStudies = [
  "seo-for-ducting-delivered",
  "seo-for-ducting-supplies",
  "seo-for-blue-cloud-tech",
  "smm-for-blue-cloud-tech",
  "smm-for-pinnacle-builder",
  "smm-for-luxora-haus"
];

async function fetchLinks(slug) {
  return new Promise((resolve) => {
    https.get(`https://aeronoxsolutions.com/${slug}/`, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        const linkRegex = /href=["'](https?:\/\/[^"']+)["']/gis;
        let match;
        const links = new Set();
        while ((match = linkRegex.exec(data)) !== null) {
          if (!match[1].includes('aeronoxsolutions.com') && !match[1].includes('wp-') && !match[1].includes('elementor')) {
            links.add(match[1]);
          }
        }
        console.log(`\nExternal links for ${slug}:`);
        console.log([...links].join("\n"));
        resolve();
      });
    }).on("error", resolve);
  });
}

async function run() {
  for (const slug of caseStudies) {
    await fetchLinks(slug);
  }
}

run();
