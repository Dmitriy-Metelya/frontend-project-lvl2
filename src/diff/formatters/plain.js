const formatAddedRow = ({ path, value }) => `Property '${path}' was added with value: ${value}`;

const formatRemovedRow = ({ path }) => `Property '${path}' was removed`;

const formatUpdatedRow = ({ initialValue, path, updatedValue }) =>
  `Property '${path}' was updated. From ${initialValue} to ${updatedValue}`;

const formatValueForOutput = (type, value) => {
  if (type !== 'terminal') {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const formatItemPlain = (diffRepresenter) => {
  const diffItemsWithChanges = diffRepresenter.filter(
    ({ diffStatus, type }) => type !== 'closing' && diffStatus !== 'equal',
  );

  const formattedItems = diffItemsWithChanges.reduce(
    (acc, { depth, diffStatus, key, path, type, value: notFormattedValue }) => {
      const value = formatValueForOutput(type, notFormattedValue);

      const formattedItemWithExistingKey = acc.find(
        ({ depth: itemDepth, key: itemKey }) => itemDepth === depth && itemKey === key,
      );

      if (formattedItemWithExistingKey) {
        return acc;
      }

      const notFormattedItemWithExistingKey = diffItemsWithChanges.find(
        ({ depth: itemDepth, diffStatus: itemDiffStatus, key: itemKey }) =>
          itemDepth === depth && itemKey === key && itemDiffStatus !== diffStatus,
      );

      if (notFormattedItemWithExistingKey) {
        const { type: updatedValueType, value: updatedValue } = notFormattedItemWithExistingKey;

        const updatedItem = {
          depth,
          diffStatus: 'updated',
          initialValue: value,
          key,
          path,
          updatedValue: formatValueForOutput(updatedValueType, updatedValue),
        };

        return [...acc, updatedItem];
      }

      const formattedItem = {
        depth,
        diffStatus: diffStatus === 'added' ? 'added' : 'removed',
        key,
        value,
        path,
      };

      return [...acc, formattedItem];
    },
    [],
  );

  const mappingByDiffType = {
    added: formatAddedRow,
    removed: formatRemovedRow,
    updated: formatUpdatedRow,
  };

  const formattedRows = formattedItems.map((formattedItem) =>
    mappingByDiffType[formattedItem.diffStatus](formattedItem),
  );

  return formattedRows.join('\n');
};

export default formatItemPlain;
