import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const parseJson = (fileContent) => JSON.parse(fileContent);

const parseYaml = (fileContent) => yaml.load(fileContent) || {};

const getParseFunction = (format) => {
  const formats = {
    json: parseJson,
    yaml: parseYaml,
  };
  return formats[format];
};

const parseFile = (filepath) => {
  const fileFormat = filepath.slice(-4);
  const parseFunction = getParseFunction(fileFormat);
  const fileContent = readFileSync(filepath, 'utf-8');

  return parseFunction(fileContent);
};

export default parseFile;
