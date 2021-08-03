const formatItemSimple = (diffRepresenter) => {};

const formatItemStylish = (diffRepresenter) => {
  const getDiffPrefix = (depth, diffStatus) => {
    const mappingByDiffStatus = {
      added: '+',
      equal: ' ',
      missing: '-',
    };

    const upperLayersIndention = '    '.repeat(depth - 1);
    const diffStatusSign = mappingByDiffStatus[diffStatus];

    const prefix = `${upperLayersIndention}  ${diffStatusSign} `;

    return prefix;
  };

  const getDiffKeyPart = (key, structureType) => {
    if (key === undefined) {
      return structureType === 'object' ? '}' : ']';
    }

    return `${key}: `;
  };

  const getDiffValuePart = (type, value) => {
    const mappingByType = {
      array: '[',
      closing: '',
      object: '{',
      terminal: value,
    };

    return mappingByType[type];
  };

  const diffViewItems = diffRepresenter.map((diffNode) => {
    const { depth, diffStatus, key, structureType, type, value } = diffNode;

    const diffPrefix = getDiffPrefix(depth, diffStatus);
    const diffKeyPart = getDiffKeyPart(key, structureType);
    const diffValuePart = getDiffValuePart(type, value);

    return `${diffPrefix}${diffKeyPart}${diffValuePart}`;
  });

  const diffIsEmpty = !diffViewItems.length;

  return diffIsEmpty ? '{}' : `{\n${diffViewItems.join('\n')}\n}`;
};

const formatDiff = (diffRepresenter, formatter = 'stylish') => {
  const mappingByFormatterType = {
    simple: formatItemSimple,
    stylish: formatItemStylish,
  };

  return mappingByFormatterType[formatter](diffRepresenter);
};

export default formatDiff;
