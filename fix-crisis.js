const fs = require('fs');
const path = require('path');

const contactPath = path.join(__dirname, 'contact.html');
let content = fs.readFileSync(contactPath, 'utf8');

// Replace all garbled 1"2 with 1–2
const garbled = '1&ldquo;2';
const clean   = '1&ndash;2';
let count = 0;
while (content.includes(garbled)) {
    content = content.split(garbled).join(clean);
    count++;
}
console.log(`Replaced ${count} occurrences of garbled dash`);

fs.writeFileSync(contactPath, content, 'utf8');
console.log('Written contact.html');
