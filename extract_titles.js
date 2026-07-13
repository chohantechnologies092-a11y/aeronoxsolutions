const fs = require('fs');

const content = fs.readFileSync('C:/Users/hp/.gemini/antigravity-ide/brain/475b258a-8beb-4705-839e-ea41263790f7/.system_generated/steps/336/content.md', 'utf8');

// Looking for all the elementor heading titles with links
const titleRegex = /<h2 class="elementor-heading-title elementor-size-default"><a href="[^"]+">([^<]+)<\/a><\/h2>/g;
let match;
const titles = [];

while ((match = titleRegex.exec(content)) !== null) {
  titles.push(match[1].trim());
}

console.log("Found " + titles.length + " portfolio titles:");
console.log(titles.join('\n'));

// Now let's try to group them by category by looking at the structure
const lines = content.split('\n');
let currentCategory = "";
const portfolio = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Look for category headers
  const catMatch = line.match(/<h2 class="elementor-heading-title elementor-size-default">([^<]+)<\/h2>/);
  if (catMatch && !line.includes('<a href')) {
    currentCategory = catMatch[1].trim();
  }
  
  // Look for portfolio items
  const itemMatch = line.match(/<h2 class="elementor-heading-title elementor-size-default"><a href="[^"]+">([^<]+)<\/a><\/h2>/);
  if (itemMatch) {
    portfolio.push({
      title: itemMatch[1].trim(),
      category: currentCategory
    });
  }
}

console.log("\nStructured Data:");
console.log(JSON.stringify(portfolio, null, 2));

// Generate mock images and descriptions for these to populate our database
const firestoreData = portfolio.map(item => ({
  title: item.title,
  slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  category: item.category || 'Portfolio',
  client: item.title,
  shortDescription: `A successful ${item.category.toLowerCase() || 'digital'} project delivered for ${item.title}.`,
  challenge: "The client needed a modern, high-performing solution to stand out in a competitive market.",
  solution: "We implemented a custom strategy using the latest technologies and design patterns.",
  results: [
    "Increased user engagement by 40%",
    "Improved conversion rates",
    "Enhanced brand visibility"
  ],
  image: "/images/portfolio/placeholder.jpg",
  color: "#3b82f6" // Default blue
}));

fs.writeFileSync('portfolio_data.json', JSON.stringify(firestoreData, null, 2));
console.log("Wrote data to portfolio_data.json");
