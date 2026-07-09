const fs = require('fs');
const path = require('path');

const files = ['index.html', 'resources.html', 'for-professionals.html', 'contact.html'];
const closeBtn = '<button class="nav-close" id="nav-close" aria-label="Close menu">&times;</button>\n      ';

for (const file of files) {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    content = content.replace(
        '<nav class="main-nav" id="main-nav" aria-label="Main navigation">',
        '<nav class="main-nav" id="main-nav" aria-label="Main navigation">\n' + closeBtn
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Added close button to:', file);
    } else {
        console.log('No change:', file);
    }
}
