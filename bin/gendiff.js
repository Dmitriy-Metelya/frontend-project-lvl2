#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
import showHelp from '../src/help.js';

const packageJson = readFileSync('package.json');
const version = JSON.parse(packageJson);

program.version(version.version);
program.option('-h, --help', 'output usage information');
program.parse();

const options = program.opts();

if (options.help) {
  showHelp();
}
