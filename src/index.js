import parseFile from './diff/parsers.js';
import representDiff from './diff/representer.js';
import formatDiff from './diff/formatters/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const file1Object = parseFile(filepath1);
  const file2Object = parseFile(filepath2);

  const diffRepresenter = representDiff(file1Object, file2Object);
  const diffView = formatDiff(diffRepresenter, formatName);

  return diffView;
};

export default genDiff;
