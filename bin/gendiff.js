#!/usr/bin/env node

import { program } from 'commander';
import { resolve } from 'path';
import showHelp from '../src/options/help.js';
import genDiff from '../src/index.js';
// eslint-disable-next-line import/no-unresolved
import version from '../src/options/version.js';

const getFullPath = (filepath) => resolve(filepath);

program
  .version(version)
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .parse();

const options = program.opts();

if (options.help) {
  showHelp();
} else {
  const { format = 'stylish' } = options;

  program
    .arguments('<file1> <file2>')
    .description('compare files')
    .action((file1, file2) => {
      const filepath1 = getFullPath(file1);
      const filepath2 = getFullPath(file2);
      console.log(genDiff(filepath1, filepath2, format));
    })
    .parse();
}
