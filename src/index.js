import { readFileSync } from 'fs';

const stringify = (diffs) => diffs.join('\n');

const genDiff = (filepath1, filepath2) => {
  const file1Content = readFileSync(filepath1, 'utf-8');
  const file1Object = JSON.parse(file1Content);
  const file2Content = readFileSync(filepath2, 'utf-8');
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
