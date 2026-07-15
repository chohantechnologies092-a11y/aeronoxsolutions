const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'src', 'app', 'admin');
const componentsPath = path.join(__dirname, '..', 'src', 'components', 'admin');

const replacements = {
  'text-gray-300': 'text-admin-muted',
  'text-gray-400': 'text-admin-muted',
  'text-gray-500': 'text-admin-muted',
  'bg-gray-500/10': 'bg-admin-border/50',
  'border-gray-500/20': 'border-admin-border',
};

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [search, replace] of Object.entries(replacements)) {
        if (content.includes(search)) {
          // simple string replacement across the file
          content = content.split(search).join(replace);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryPath);
processDirectory(componentsPath);
console.log('Second pass theme replacement complete.');
