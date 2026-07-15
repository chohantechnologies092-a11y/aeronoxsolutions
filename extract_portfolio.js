const fs = require('fs');

const content = fs.readFileSync('C:/Users/hp/.gemini/antigravity-ide/brain/475b258a-8beb-4705-839e-ea41263790f7/.system_generated/steps/336/content.md', 'utf8');

const items = [];
const imgRegex = /<a href="([^"]+)">(?:\s|<[^>]+>)*<img[^>]*src="([^"]+)"/g;
let match;

while ((match = imgRegex.exec(content)) !== null) {
  const link = match[1];
  const image = match[2];
  
  // Find corresponding title
  const titleRegex = new RegExp(`<h2 class="elementor-heading-title[^>]*><a href="${link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">(.*?)</a></h2>`);
  const titleMatch = content.match(titleRegex);
  
  let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : link.split('/').filter(Boolean).pop();
  
  // Ignore home link (logo) or "click here" text
  if (link === 'https://aeronoxsolutions.com/' || title.toLowerCase().includes('click here')) {
    continue;
  }
  
  items.push({
    title: title,
    image: image,
    link: link,
    description: ''
  });
}

// Remove duplicates based on link
const uniqueItems = Array.from(new Map(items.map(item => [item.link, item])).values());

console.log('Found ' + uniqueItems.length + ' items');
console.log(JSON.stringify(uniqueItems, null, 2));
