import parseFile from './diff/parsers.js';
import representDiff from './diff/representer.js';
import formatDiff from './diff/formatter.js';

const genDiff = (filepath1, filepath2) => {
  const file1Object = parseFile(filepath1);
  const file2Object = parseFile(filepath2);

  const diffRepresenter = representDiff(file1Object, file2Object);
  const diffView = formatDiff(diffRepresenter);

  return diffView;
};

export default genDiff;
