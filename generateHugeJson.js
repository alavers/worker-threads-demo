'use strict';

const fs = require('fs');

const image = fs.readFileSync('./base64Image');
const root = {
    nested: {}
}
let nestedNode = root.nested;

for(let i = 0; i<100; i++) {
    nestedNode.nested = {
        image,
        nested: {}
    }
    nestedNode = nestedNode.nested;
}

fs.writeFileSync('huge.json', JSON.stringify(root));
