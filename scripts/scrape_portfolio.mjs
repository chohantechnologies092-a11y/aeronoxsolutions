import * as https from "https";

https.get("https://aeronoxsolutions.com/web-design-development/", (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis;
    let match;
    const links = [];
    while ((match = linkRegex.exec(data)) !== null) {
      links.push({
        href: match[1],
        text: match[2].replace(/<[^>]+>/g, '').trim()
      });
    }
    const uniqueLinks = [...new Map(links.map(item => [item.href, item])).values()];
    console.log(JSON.stringify(uniqueLinks.filter(l => l.text.length > 0 && !l.href.includes('wp-')), null, 2));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
