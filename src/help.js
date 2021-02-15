import { readFileSync } from 'fs';

const showHelp = () => {
  const helpText = readFileSync('./src/help', 'utf-8');
  console.log(helpText);
};

export default showHelp;
