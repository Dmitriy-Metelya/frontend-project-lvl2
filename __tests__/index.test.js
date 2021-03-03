/* eslint-disable no-undef */

import { resolve } from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => {
  const format = filename.slice(-4);

  return resolve(__dirname, '..', '__fixtures__', format, filename);
};
const flat3ToFlat4Diff = '  author: Dmitriy Metelya\n- description: my first project\n- license: ISC\n  main: bin/brain-games.js\n+ model: first\n  name: @hexlet/code\n  type: module\n- version: 5.0.1\n+ version: 0.4.0';
const flat4ToFlat5Diff = '- author: Dmitriy Metelya\n  main: bin/brain-games.js\n- model: first\n  name: @hexlet/code\n+ root: nothing\n- type: module\n  version: 0.4.0';
const flat3ToEmptyDiff = '- author: Dmitriy Metelya\n- description: my first project\n- license: ISC\n- main: bin/brain-games.js\n- name: @hexlet/code\n- type: module\n- version: 5.0.1';
const emptyToSelfDiff = '';
const flat4ToSelfDiff = '  author: Dmitriy Metelya\n  main: bin/brain-games.js\n  model: first\n  name: @hexlet/code\n  type: module\n  version: 0.4.0';
const flat7ToFlat9Diff = '- name: Test with Jest\n+ name: Linter\n- on: npm\n  runs-on: ubuntu-latest\n- steps: Checkout code\n+ uses: actions/checkout@v2';
const flat9ToFlat10Diff = '- name: Linter\n+ name: Test coverage with Codeclimate\n+ on: push\n- runs-on: ubuntu-latest\n+ steps: Install package\n  uses: actions/checkout@v2';
const flat7ToEmptyDiff = '- name: Test with Jest\n- on: npm\n- runs-on: ubuntu-latest\n- steps: Checkout code';
const flat7ToSelfDiff = '  name: Test with Jest\n  on: npm\n  runs-on: ubuntu-latest\n  steps: Checkout code';
const flat1ToFlat6Diff = '- author: Dmitriy Metelya\n  model: first\n- name: @hexlet/code\n+ name: Linter\n+ runs-on: ubuntu-latest\n- type: module\n+ uses: actions/checkout@v2';
const flat8ToFlat2Diff = '+ main: bin/brain-games.js\n- name: Test coverage with Codeclimate\n+ name: @hexlet/code\n  on: push\n+ root: nothing\n- steps: Install package\n- uses: actions/checkout@v2';
const flat1ToEmptyDiff = '- author: Dmitriy Metelya\n- model: first\n- name: @hexlet/code\n- type: module';
const flat2ToEqualDiff = '  main: bin/brain-games.js\n  name: @hexlet/code\n  on: push\n  root: nothing';
const flat3ToFalsyDiff = '- author: Dmitriy Metelya\n- description: my first project\n+ description: undefined\n- license: ISC\n- main: bin/brain-games.js\n+ main: \n- name: @hexlet/code\n+ name: null\n- type: module\n- version: 5.0.1\n+ version: 0';
const FalsyToSelfDiff = '  description: undefined\n  main: \n  name: null\n  version: 0';
const EmptyToFalsyDiff = '+ description: undefined\n+ main: \n+ name: null\n+ version: 0';

test('common json to json test', () => {
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

test('extremes json to json test', () => {
  expect(genDiff(getFixturePath('empty.json'), getFixturePath('empty.json'))).toEqual(
    emptyToSelfDiff,
  );
  expect(genDiff(getFixturePath('flat4.json'), getFixturePath('flat4.json'))).toEqual(
    flat4ToSelfDiff,
  );
});

test('common yaml to yaml test', () => {
  expect(genDiff(getFixturePath('flat7.yaml'), getFixturePath('flat9.yaml'))).toEqual(
    flat7ToFlat9Diff,
  );
  expect(genDiff(getFixturePath('flat9.yaml'), getFixturePath('flat10.yaml'))).toEqual(
    flat9ToFlat10Diff,
  );
  expect(genDiff(getFixturePath('flat7.yaml'), getFixturePath('empty.yaml'))).toEqual(
    flat7ToEmptyDiff,
  );
});

test('extremes yaml to yaml test', () => {
  expect(genDiff(getFixturePath('empty.yaml'), getFixturePath('empty.yaml'))).toEqual(
    emptyToSelfDiff,
  );
  expect(genDiff(getFixturePath('flat7.yaml'), getFixturePath('flat7.yaml'))).toEqual(
    flat7ToSelfDiff,
  );
});

test('common json/yaml test', () => {
  expect(genDiff(getFixturePath('flat1.json'), getFixturePath('flat6.yaml'))).toEqual(
    flat1ToFlat6Diff,
  );
  expect(genDiff(getFixturePath('flat8.yaml'), getFixturePath('flat2.json'))).toEqual(
    flat8ToFlat2Diff,
  );
  expect(genDiff(getFixturePath('flat1.json'), getFixturePath('empty.yaml'))).toEqual(
    flat1ToEmptyDiff,
  );
});

test('extremes json/yaml test', () => {
  expect(genDiff(getFixturePath('empty.json'), getFixturePath('empty.yaml'))).toEqual(
    emptyToSelfDiff,
  );
  expect(genDiff(getFixturePath('flat2.json'), getFixturePath('flat2.yaml'))).toEqual(
    flat2ToEqualDiff,
  );
});

test('falsy values test', () => {
  expect(genDiff(getFixturePath('flat3.json'), getFixturePath('falsy.json'))).toEqual(
    flat3ToFalsyDiff,
  );
  expect(genDiff(getFixturePath('falsy.json'), getFixturePath('falsy.json'))).toEqual(
    FalsyToSelfDiff,
  );
  expect(genDiff(getFixturePath('empty.json'), getFixturePath('falsy.json'))).toEqual(
    EmptyToFalsyDiff,
  );
});
