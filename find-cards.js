const fs = require('fs');
const c = fs.readFileSync('C:/Users/xlilc/.openclaw/workspace/brogroup/css/styles.css', 'utf8');
const matches = c.match(/\.contact-info-card[^}]+/g);
console.log(matches ? matches.join('\n\n') : 'none');
