/* eslint-disable no-undef */

import { resolve } from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const flat3ToFlat4Diff = '  author: Dmitriy Metelya\n- description: my first project\n- license: ISC\n  main: bin/brain-games.js\n+ model: first\n  name: @hexlet/code\n  type: module\n- version: 5.0.1\n+ version: 0.4.0';
const flat4ToFlat5Diff = '- author: Dmitriy Metelya\n  main: bin/brain-games.js\n- model: first\n  name: @hexlet/code\n+ root: nothing\n- type: module\n  version: 0.4.0';
const flat3ToEmptyDiff = '- author: Dmitriy Metelya\n- description: my first project\n- license: ISC\n- main: bin/brain-games.js\n- name: @hexlet/code\n- type: module\n- version: 5.0.1';
const emptyToSelfDiff = '';
const flat4ToSelfDiff = '  author: Dmitriy Metelya\n  main: bin/brain-games.js\n  model: first\n  name: @hexlet/code\n  type: module\n  version: 0.4.0';

test('common test', () => {
  expect(genDiff(getFixturePath('flat3.json'), getFixturePath('flat4.json'))).toEqual(
    flat3ToFlat4Diff,
  );
  expect(genDiff(getFixturePath('flat4.json'), getFixturePath('flat5.json'))).toEqual(
    flat4ToFlat5Diff,
  );
  expect(genDiff(getFixturePath('flat3.json'), getFixturePath('empty.json'))).toEqual(
    flat3ToEmptyDiff,
  );
});

test('extremes test', () => {
  expect(genDiff(getFixturePath('empty.json'), getFixturePath('empty.json'))).toEqual(
    emptyToSelfDiff,
  );
  expect(genDiff(getFixturePath('flat4.json'), getFixturePath('flat4.json'))).toEqual(
    flat4ToSelfDiff,
  );
});
