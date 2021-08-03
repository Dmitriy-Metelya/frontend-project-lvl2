/* eslint-disable no-undef */

import { resolve } from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => {
  const format = filename.slice(-4);

  return resolve(__dirname, '..', '__fixtures__', format, filename);
};

const flat3ToFlat4Diff = `{
    author: Dmitriy Metelya
  - description: my first project
  - license: ISC
    main: bin/brain-games.js
  + model: first
    name: @hexlet/code
    type: module
  - version: 5.0.1
  + version: 0.4.0
}`;

const flat4ToFlat5Diff = `{
  - author: Dmitriy Metelya
    main: bin/brain-games.js
  - model: first
    name: @hexlet/code
  + root: nothing
  - type: module
    version: 0.4.0
}`;

const flat3ToEmptyDiff = `{
  - author: Dmitriy Metelya
  - description: my first project
  - license: ISC
  - main: bin/brain-games.js
  - name: @hexlet/code
  - type: module
  - version: 5.0.1
}`;

const emptyToSelfDiff = '{}';

const flat4ToSelfDiff = `{
    author: Dmitriy Metelya
    main: bin/brain-games.js
    model: first
    name: @hexlet/code
    type: module
    version: 0.4.0
}`;

const flat7ToFlat9Diff = `{
  - name: Test with Jest
  + name: Linter
  - on: npm
    runs-on: ubuntu-latest
  - steps: Checkout code
  + uses: actions/checkout@v2
}`;

const flat9ToFlat10Diff = `{
  - name: Linter
  + name: Test coverage with Codeclimate
  + on: push
  - runs-on: ubuntu-latest
  + steps: Install package
    uses: actions/checkout@v2
}`;

const flat7ToEmptyDiff = `{
  - name: Test with Jest
  - on: npm
  - runs-on: ubuntu-latest
  - steps: Checkout code
}`;

const flat7ToSelfDiff = `{
    name: Test with Jest
    on: npm
    runs-on: ubuntu-latest
    steps: Checkout code
}`;

const flat1ToFlat6Diff = `{
  - author: Dmitriy Metelya
    model: first
  - name: @hexlet/code
  + name: Linter
  + runs-on: ubuntu-latest
  - type: module
  + uses: actions/checkout@v2
}`;

const flat8ToFlat2Diff = `{
  + main: bin/brain-games.js
  - name: Test coverage with Codeclimate
  + name: @hexlet/code
    on: push
  + root: nothing
  - steps: Install package
  - uses: actions/checkout@v2
}`;

const flat1ToEmptyDiff = `{
  - author: Dmitriy Metelya
  - model: first
  - name: @hexlet/code
  - type: module
}`;

const flat2ToEqualDiff = `{
    main: bin/brain-games.js
    name: @hexlet/code
    on: push
    root: nothing
}`;

const flat3ToFalsyDiff = `{
  - author: Dmitriy Metelya
  - description: my first project
  + description: undefined
  - license: ISC
  - main: bin/brain-games.js
  + main: 
  - name: @hexlet/code
  + name: null
  - type: module
  - version: 5.0.1
  + version: 0
}`;

const FalsyToSelfDiff = `{
    description: undefined
    main: 
    name: null
    version: 0
}`;

const EmptyToFalsyDiff = `{
  + description: undefined
  + main: 
  + name: null
  + version: 0
}`;

const nestedJsonDiff = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const nestedYamlDiff = `{
    jobs: {
        build: {
            runs-on: ubuntu-latest
          - steps: [
                0: {
                    uses: actions/checkout@v2
                }
                1: {
                    name: Hexlet project check
                    uses: hexlet/project-action@release
                    with: {
                        hexlet-id: hexlet-id
                    }
                }
            ]
          + steps: [
                0: {
                    name: Checkout code
                    uses: actions/checkout@v2
                }
                1: {
                    name: Install package
                    run: make install
                }
                2: {
                    name: Check test coverage
                    env: {
                        CC_TEST_REPORTER_ID: \${{ secrets.CC_TEST_REPORTER_ID }}
                    }
                    run: ./cc-test-reporter before-build
                }
            ]
        }
    }
  - name: hexlet-check
  - on: {
        push: {
            branches: [
                0: **
            ]
            tags: [
                0: **
            ]
        }
    }
  + on: [
        0: push
        1: pull_request
    ]
}`;

describe('flat file structures', () => {
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
});

describe('nested file structures', () => {
  test('json to json test', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(
      nestedJsonDiff,
    );
  });

  test('yaml to yaml test', () => {
    expect(genDiff(getFixturePath('nested1.yaml'), getFixturePath('nested2.yaml'))).toEqual(
      nestedYamlDiff,
    );
  });
});
