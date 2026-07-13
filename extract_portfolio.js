const fs = require('fs');

const content = fs.readFileSync('C:/Users/hp/.gemini/antigravity-ide/brain/475b258a-8beb-4705-839e-ea41263790f7/.system_generated/steps/336/content.md', 'utf8');

// Looking at the actual HTML from the site to find the post blocks
const matches = content.match(/<article[\s\S]*?<\/article>/g) || content.match(/<div class="elementor-post__card"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) || [];

console.log('Found ' + matches.length + ' items');

const items = matches.map(m => {
  const titleMatch = m.match(/<h[23][^>]*>[\s\S]*?<a[^>]*>(.*?)<\/a>[\s\S]*?<\/h[23]>/);
  const imgMatch = m.match(/<img[^>]*src="([^"]*)"[^>]*>/);
  const descMatch = m.match(/<div[^>]*class="[^"]*excerpt[^"]*"[^>]*>[\s\S]*?<p>(.*?)<\/p>/) || m.match(/<p>(.*?)<\/p>/);
  
  return {
    title: titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : '',
    image: imgMatch ? imgMatch[1] : '',
    description: descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : ''
  };
});

console.log(JSON.stringify(items, null, 2));
