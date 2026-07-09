const fs = require('fs');
const path = require('path');

const base = path.join(__dirname);

// ── Fix 1: Replace garbled sequences with HTML entities across all HTML files ──
const htmlFiles = ['index.html', 'resources.html', 'for-professionals.html', 'contact.html'];
const replacements = [
    // UTF-8 BOM chars and common garbles
    ['\u00e2\u20ac\u201c', '&ldquo;'],   // â€"
    ['\u00e2\u20ac\u201d', '&rdquo;'],   // â€"
    ['\u00e2\u20ac\u2019', '&rsquo;'],   // â€™
    ['\u00e2\u20ac\u201c', '&ldquo;'],   // â€"
    ['\u00e2\u20ac\u201d', '&rdquo;'],   // â€"
    ['\u00e2\u20ac\u2122', '&trade;'],   // â€¢
    ['\u00c2\u00a9', '&copy;'],           // Â©
    ['\u00c2\u00a0', ' '],               // Â + nbsp
    ['\u00c2', ''],                       // leftover Â
    // Unicode chars directly
    ['\u2022', '&bull;'],                 // •
    ['\u2014', '&mdash;'],                // —
    ['\u2013', '&ndash;'],                // –
    ['\u2018', '&lsquo;'],                // '
    ['\u2019', '&rsquo;'],                // '
    ['\u201c', '&ldquo;'],                // "
    ['\u201d', '&rdquo;'],                // "
];

for (const file of htmlFiles) {
    const filePath = path.join(base, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [from, to] of replacements) {
        const next = content.split(from).join(to);
        if (next !== content) {
            content = next;
            changed = true;
        }
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(changed ? `Fixed: ${file}` : `Clean:  ${file}`);
}

// ── Fix 2: Update location text in index.html ──
const indexPath = path.join(base, 'index.html');
let index = fs.readFileSync(indexPath, 'utf8');
const oldLoc = 'Contact us to be notified when the first meeting date and location are confirmed';
const newLoc = 'Specific location will be announced once the first meeting is scheduled.';
if (index.includes(oldLoc)) {
    index = index.split(oldLoc).join(newLoc);
    fs.writeFileSync(indexPath, index, 'utf8');
    console.log('Fixed location text in index.html');
} else {
    console.log('Location text not found in index.html');
}

// ── Fix 3: Update favicon to use actual BRO logo design (no text) ──
const faviconPath = path.join(base, 'favicon.svg');
const faviconContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <rect width="120" height="120" rx="24" fill="#121212"/>
  <circle cx="60" cy="28" r="14" fill="#E2B04A" opacity="0.9"/>
  <polygon points="10,100 45,40 60,55 75,38 110,100" fill="#4C647A" opacity="0.7"/>
  <polygon points="25,100 55,55 68,65 80,50 110,100" fill="#4C647A" opacity="0.9"/>
  <ellipse cx="42" cy="82" rx="7" ry="9" fill="#E2B04A"/>
  <rect x="36" y="89" width="12" height="20" rx="3" fill="#E2B04A"/>
  <ellipse cx="60" cy="78" rx="7" ry="9" fill="#E2B04A"/>
  <rect x="54" y="85" width="12" height="24" rx="3" fill="#E2B04A"/>
  <ellipse cx="78" cy="82" rx="7" ry="9" fill="#E2B04A"/>
  <rect x="72" y="89" width="12" height="20" rx="3" fill="#E2B04A"/>
</svg>`;
fs.writeFileSync(faviconPath, faviconContent, 'utf8');
console.log('Fixed favicon.svg');
