const showHelp = () => {
  const helpText = `Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -h, --help           output usage information
  -f, --format [type]  output format`;
  console.log(helpText);
};

export default showHelp;
