#!/usr/bin/env node

import { program } from 'commander';
import showHelp from '../src/help.js';

program.version('0.0.1');
program.option('-h, --help', 'output usage information');
program.parse();

const options = program.opts();

if (options.help) {
  showHelp();
}
