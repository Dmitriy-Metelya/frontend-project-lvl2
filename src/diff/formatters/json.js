import _ from 'lodash';

const { cloneDeep, has, set } = _;

const formatValueForOutput = (type, value) => {
  if (type !== 'terminal') {
    return '[complex value]';
  }

  return value;
};

const formatItemJson = (diffRepresenter) => {
  const diffItemsWithChanges = diffRepresenter.filter(
    ({ diffStatus, type }) => type !== 'closing' && diffStatus !== 'equal',
  );

  const resultingObject = diffItemsWithChanges.reduce(
    (acc, { diffStatus, path, type, value: notFormattedValue }) => {
      const newAcc = cloneDeep(acc);
      const value = formatValueForOutput(type, notFormattedValue);

      const formattedItemWithExistingKey = has(acc, path);

      if (formattedItemWithExistingKey) {
        return acc;
      }

      const notFormattedItemWithExistingKey = diffItemsWithChanges.find(
        ({ path: itemPath, diffStatus: itemDiffStatus }) =>
          itemPath === path && itemDiffStatus !== diffStatus,
      );

      if (notFormattedItemWithExistingKey) {
        const { type: updatedValueType, value: updatedValue } = notFormattedItemWithExistingKey;

        const updatedItem = {
          diffStatus: 'updated',
          initialValue: value,
          updatedValue: formatValueForOutput(updatedValueType, updatedValue),
        };

        set(newAcc, path, updatedItem);

        return newAcc;
      }

      const formattedItem = {
        diffStatus: diffStatus === 'added' ? 'added' : 'removed',
        value,
      };

      set(newAcc, path, formattedItem);

      return newAcc;
    },
    {},
  );

  return JSON.stringify(resultingObject, null, 2);
};

export default formatItemJson;
