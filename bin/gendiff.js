#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'fs';
import showHelp from '../src/help.js';
import genDiff from '../src/index.js';

const packageJson = readFileSync('package.json');
const version = JSON.parse(packageJson);

program
  .version(version.version)
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .parse();

const options = program.opts();

if (options.help) {
  showHelp();
} else if (options.format) {
  console.log(options.format);
} else {
  program
    .arguments('<file1> <file2>')
    .description('compare files')
    .action((file1, file2) => {
      console.log(genDiff(file1, file2));
    })
    .parse();
}
