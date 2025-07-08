const path = require('path');

// Absolute path to your package
const packagePath =
    '/Users/muqeem.ahmad/Documents/Projects/ReactProjects/my-react-native-library/example/ExampleApp';

module.exports = {
  resolver: {
    nodeModulesPaths: [packagePath],
  },
  watchFolders: [packagePath],
};
