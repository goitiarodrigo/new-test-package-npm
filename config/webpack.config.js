const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|build)/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'styled-components': path.resolve(
        __dirname,
        './node_modules/styled-components'
      ),
    },
  },
}