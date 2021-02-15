#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
import showHelp from '../src/help.js';

const packageJson = readFileSync('package.json');
const version = JSON.parse(packageJson);

program
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .version(version.version)
  .parse();

const options = program.opts();

if (options.help) {
  showHelp();
}
if (options.format) {
  // do something with options.format
}
