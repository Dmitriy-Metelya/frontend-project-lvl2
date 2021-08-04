import formatItemPlain from './plain.js';
import formatItemStylish from './stylish.js';

const formatDiff = (diffRepresenter, formatter = 'stylish') => {
  const mappingByFormatterType = {
    plain: formatItemPlain,
    stylish: formatItemStylish,
  };

  return mappingByFormatterType[formatter](diffRepresenter);
};

export default formatDiff;
