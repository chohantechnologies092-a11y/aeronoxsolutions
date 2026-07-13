const fs = require('fs');

const content = fs.readFileSync('C:/Users/hp/.gemini/antigravity-ide/brain/475b258a-8beb-4705-839e-ea41263790f7/.system_generated/steps/336/content.md', 'utf8');

const titleRegex = /<h2 class="elementor-heading-title elementor-size-default"><a href="[^"]+">([^<]+)<\/a><\/h2>/g;
let match;
const titles = [];

while ((match = titleRegex.exec(content)) !== null) {
  titles.push(match[1].trim());
}

// console.log("Found " + titles.length + " portfolio titles:");

// Now let's try to find images
// Look for post cards
const cards = content.match(/<article[\s\S]*?<\/article>/g) || content.match(/<div class="elementor-post__card"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) || [];
// console.log(cards.length);
