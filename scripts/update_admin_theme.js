const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'src', 'app', 'admin');
const componentsPath = path.join(__dirname, '..', 'src', 'components', 'admin');

const replacements = {
  'bg-[#1b1223]': 'bg-admin-bg',
  'bg-[#24182e]': 'bg-admin-card',
  'text-[#dcd7e3]/60': 'text-admin-muted',
  'text-[#dcd7e3]/70': 'text-admin-muted',
  'text-[#dcd7e3]/50': 'text-admin-muted',
  'text-[#dcd7e3]/40': 'text-admin-muted',
  'text-[#dcd7e3]': 'text-admin-text',
  'border-white/10': 'border-admin-border',
  'border-white/8': 'border-admin-border',
  'border-white/5': 'border-admin-border',
  'text-white': 'text-admin-text',
  'bg-black/20': 'bg-black/10 dark:bg-black/20',
  'bg-white/5': 'bg-black/5 dark:bg-white/5',
  'bg-white/10': 'bg-black/10 dark:bg-white/10',
  'text-white/50': 'text-admin-text/50',
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
console.log('Theme replacement complete.');
