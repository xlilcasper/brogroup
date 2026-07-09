const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\xlilc\\.openclaw\\workspace\\brogroup';
const files = ['index.html', 'resources.html', 'for-professionals.html', 'contact.html'];

// Common encoding corruption patterns → fix
const fixes = [
    ['\u00e2\u20ac\u201d', '\u2014'],   // â€"  → —
    ['\u00e2\u20ac\u201c', '\u201c'],   // â€œ  → "
    ['\u00e2\u20ac\u2019', '\u2019'],   // â€™  → '
    ['\u00e2\u84a2', '\u2122'],          // â„¢  → ™
    ['\u00c2\u00a9', '\u00a9'],          // Â©  → ©
    ['\u00c2', ''],                      // Â   → (strip)
    ['\u00a0', ' '],                     // nbsp → regular space
];

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    for (const [from, to] of fixes) {
        content = content.split(from).join(to);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', file);
    } else {
        console.log('Clean: ', file);
    }
}
