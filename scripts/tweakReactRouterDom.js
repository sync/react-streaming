import { readFileSync, writeFileSync } from 'fs';

const path = './node_modules/react-router-dom/package.json';

const data = readFileSync(path);
const config = JSON.parse(data);

config.exports = {
  '.': {
    deno: './index.js',
    worker: './index.js',
    browser: './index.js',
    default: './main.js',
  },
  './server': {
    deno: './server.mjs',
    worker: './server.mjs',
    browser: './server.mjs',
    default: './server.js',
  },
  './package.json': './package.json',
};

try {
  writeFileSync(path, JSON.stringify(config, null, 2), 'utf8');
  console.log('Successfully modified react-router-dom package.json');
} catch (error) {
  console.log(
    'An error has occurred when modifying react-router-dom package.json',
    error,
  );
}
