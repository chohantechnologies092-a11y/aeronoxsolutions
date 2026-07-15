const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '..', 'src', 'app', 'admin'),
  path.join(__dirname, '..', 'src', 'components', 'admin')
];

const replacements = {
  'text-emerald-400': 'text-emerald-600 dark:text-emerald-400',
  'text-blue-400': 'text-blue-600 dark:text-blue-400',
  'text-red-400': 'text-red-600 dark:text-red-400',
  'text-[#00c2ff]': 'text-cyan-600 dark:text-[#00c2ff]',
  'text-purple-400': 'text-purple-600 dark:text-purple-400',
  'text-green-400': 'text-green-600 dark:text-green-400',
  'hover:text-blue-300': 'hover:text-blue-700 dark:hover:text-blue-300',
  'hover:text-red-300': 'hover:text-red-700 dark:hover:text-red-300',
  'bg-emerald-500/10': 'bg-emerald-500/20 dark:bg-emerald-500/10',
  'bg-[#00c2ff]/10': 'bg-cyan-500/20 dark:bg-[#00c2ff]/10',
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
          // Avoid double replacements if we already ran it
          if (!content.includes(replace)) {
             content = content.split(search).join(replace);
             changed = true;
          }
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

directories.forEach(processDirectory);
console.log('Third pass theme replacement complete.');
