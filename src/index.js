import { has, sortBy } from 'lodash';
import parseFile from './diff/parsers.js';

const stringify = (diffs) => diffs.join('\n');

const genDiff = (filepath1, filepath2) => {
  const file1Object = parseFile(filepath1);
  const file2Object = parseFile(filepath2);
  const leftMergedObject = { ...file2Object, ...file1Object };
  const leftMergedEntries = Object.entries(leftMergedObject);
  const leftMergedEntriesSorted = sortBy(leftMergedEntries, ([key]) => key);
  const diffs = leftMergedEntriesSorted.reduce((acc, [key, value]) => {
    const newAcc = [...acc];

    if (has(file1Object, key)) {
      if (has(file2Object, key)) {
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
