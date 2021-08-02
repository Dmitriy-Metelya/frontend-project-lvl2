import _ from 'lodash';

const { has, keys, sortBy, toPairs, union } = _;

const getValueType = (value) => {
  if (typeof value !== 'object') {
    return 'terminal';
  }

  const objectType = Array.isArray(value) ? 'array' : 'object';

  return objectType;
};

const buildDiffForTerminal = (key, value, diffStatus, depth) => ({
  depth,
  diffStatus,
  key,
  type: 'terminal',
  value,
});

const buildDiffForArray = (arrayKey, array, diffStatus, depth) => {
  const mappingDiffBuilderByType = {
    array: buildDiffForArray,
    object: buildDiffForObjectWithoutNestedDiffs,
    terminal: buildDiffForTerminal,
  };

  const arrayChildren = array.map((arrayItem) => {
    const childType = getValueType(arrayItem);

    return mappingDiffBuilderByType[childType]([], arrayItem, 'equal', depth + 1);
  });

  return {
    depth,
    diffStatus,
    key: arrayKey,
    type: 'array',
    children: arrayChildren,
  };
};

const buildDiffForObjectWithoutNestedDiffs = (objectKey, objectValue, diffStatus, depth) => {
  const mappingDiffBuilderByType = {
    array: buildDiffForArray,
    object: buildDiffForObjectWithoutNestedDiffs,
    terminal: buildDiffForTerminal,
  };

  const objectChildren = toPairs(objectValue).map(([key, value]) => {
    const childType = getValueType(value);

    return mappingDiffBuilderByType[childType](key, value, 'equal', depth + 1);
  });

  return {
    depth,
    diffStatus,
    key: objectKey,
    type: 'object',
    children: objectChildren,
  };
};

const mappingDiffBuilderByType = {
  array: buildDiffForArray,
  object: buildDiffForObjectWithoutNestedDiffs,
  terminal: buildDiffForTerminal,
};

const buildDiffForObjectWithNestedDiffs = (objectKey, file1Object, file2Object, depth) => {
  const children = buildDiffTree(file1Object, file2Object, depth + 1);

  return {
    depth,
    diffStatus: 'equal',
    key: objectKey,
    type: 'object',
    children,
  };
};

const buildDiffTree = (file1Object, file2Object, depth = 1) => {
  const file1ObjectKeys = keys(file1Object);
  const file2ObjectKeys = keys(file2Object);
  const allKeys = union(file1ObjectKeys, file2ObjectKeys);

  const buildDiffForKey = (key, file1Value, file2Value) => {
    if (file1Value === file2Value) {
      return [buildDiffForTerminal(key, file1Value, 'equal', depth)];
    }

    const value1Type = getValueType(file1Value);
    const value2Type = getValueType(file2Value);

    if (value1Type === 'object' && value2Type === 'object') {
      return [buildDiffForObjectWithNestedDiffs(key, file1Value, file2Value, depth)];
    }

    const entry1Diff =
      file1Value !== undefined &&
      mappingDiffBuilderByType[value1Type](key, file1Value, 'missing', depth);

    const entry2Diff =
      file2Value !== undefined &&
      mappingDiffBuilderByType[value2Type](key, file2Value, 'added', depth);

    const diffs = [];

    entry1Diff && diffs.push(entry1Diff);
    entry2Diff && diffs.push(entry2Diff);

    return diffs;
  };

  const diffs = allKeys
    .map((key) => buildDiffForKey(key, file1Object[key], file2Object[key]))
    .flat();

  const sortedDiffs = sortBy(diffs, ({ key }) => key);

  return sortedDiffs;
};

const flattenDiffTree = (diffTree) => {
  let diffTreeNodes = [];

  diffTree.forEach((node) => {
    diffTreeNodes.push(node);

    const nodeHasChildren = has(node, 'children');

    if (nodeHasChildren) {
      const { children } = node;

      diffTreeNodes = [...diffTreeNodes, ...flattenDiffTree(children)];
    }

    return diffTreeNodes;
  });

  return diffTreeNodes;
};

const representDiff = (file1Object, file2Object) => {
  const diffTree = buildDiffTree(file1Object, file2Object);
  const diffTreeNodes = flattenDiffTree(diffTree);

  return diffTreeNodes;
};

export default representDiff;
