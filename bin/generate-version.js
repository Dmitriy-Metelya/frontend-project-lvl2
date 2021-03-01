#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const packageJson = readFileSync('./package.json');
const { version } = JSON.parse(packageJson);
writeFileSync('./src/version.js', `export default '${version}';\n`, 'utf-8');
