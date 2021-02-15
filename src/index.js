import { readFileSync, existsSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import process from 'process';

const stringify = (diffs) => diffs.join('\n');

const genDiff = (filepath1, filepath2) => {
  const currentDirectoryName = process.cwd();
  const fullFilepath1 = path.resolve(currentDirectoryName, filepath1);
  const fullFilepath2 = path.resolve(currentDirectoryName, filepath2);
  const file1Content = readFileSync(existsSync(fullFilepath1) ? fullFilepath1 : filepath1, 'utf-8');
  const file1Object = JSON.parse(file1Content);
  const file2Content = readFileSync(existsSync(fullFilepath2) ? fullFilepath2 : filepath2, 'utf-8');
  const file2Object = JSON.parse(file2Content);
  const leftMergedObject = { ...file2Object, ...file1Object };
  const leftMergedEntries = Object.entries(leftMergedObject);
  const leftMergedEntriesSorted = _.sortBy(leftMergedEntries, ([key]) => key);
  const diffs = leftMergedEntriesSorted.reduce((acc, [key, value]) => {
    const newAcc = [...acc];

    if (file1Object[key]) {
      if (file2Object[key]) {
        if (value === file2Object[key]) {
          newAcc.push(`  ${key}: ${value}`);
        } else {
          newAcc.push(`- ${key}: ${value}`);
          newAcc.push(`+ ${key}: ${file2Object[key]}`);
        }
      } else {
        newAcc.push(`- ${key}: ${value}`);
      }
    } else {
      newAcc.push(`+ ${key}: ${file2Object[key]}`);
    }

    return newAcc;
  }, []);

  return stringify(diffs);
};

export default genDiff;
