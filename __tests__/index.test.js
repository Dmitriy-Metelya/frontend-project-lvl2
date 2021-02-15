import genDiff from '../src/index.js';

const resultRel = genDiff('__fixtures__/flat1.json', '__fixtures__/flat2.json');

console.log(`Test 'relative path':\n${resultRel}\n`);

const resultAbs = genDiff(
  '/home/metelya/coding/frontend-project-lvl2/__fixtures__/flat1.json',
  '/home/metelya/coding/frontend-project-lvl2/__fixtures__/flat2.json',
);

console.log(`Test 'abolute path':\n${resultAbs}`);
