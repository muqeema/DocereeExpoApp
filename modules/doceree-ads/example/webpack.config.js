const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      // Check if this alias is causing issues
      'assets': path.resolve(__dirname, 'src/assets/'),
    },
  },
  module: {
    rules: [
      // Add rules for asset files if needed
    ],
  },
};
