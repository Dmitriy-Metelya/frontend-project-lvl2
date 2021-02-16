import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const flat3ToFlat4Diff =
  '  author: Dmitriy Metelya\n- description: my first project\n- license: ISC\n  main: bin/brain-games.js\n+ model: first\n  name: @hexlet/code\n  type: module\n- version: 5.0.1\n+ version: 0.4.0';
const flat4ToFlat5Diff =
  '- author: Dmitriy Metelya\n  main: bin/brain-games.js\n- model: first\n  name: @hexlet/code\n+ root: nothing\n- type: module\n  version: 0.4.0';
const flat3ToEmptyDiff =
  '- author: Dmitriy Metelya\n- description: my first project\n- license: ISC\n- main: bin/brain-games.js\n- name: @hexlet/code\n- type: module\n- version: 5.0.1';
const emptyToSelfDiff = '';
const flat4ToSelfDiff =
  '  author: Dmitriy Metelya\n  main: bin/brain-games.js\n  model: first\n  name: @hexlet/code\n  type: module\n  version: 0.4.0';

test('common test', () => {
  expect(genDiff(getFixturePath('flat3.json', 'flat4.json'))).toEqual(flat3ToFlat4Diff);
  expect(genDiff('flat4.json', 'flat5.json')).toEqual(flat4ToFlat5Diff);
  expect(genDiff('flat3.json', 'empty.json')).toEqual(flat3ToEmptyDiff);
});

test('extremes test', () => {
  expect(genDiff('empty.json', 'empty.json')).toEqual(emptyToSelfDiff);
  expect(genDiff('flat4.json', 'flat4.json')).toEqual(flat4ToSelfDiff);
});
