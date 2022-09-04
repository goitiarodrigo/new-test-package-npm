const path = require('path')

module.exports = {
  entry: './src/Calendar.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'calendar.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      // {
      //   test: /\.(ts|js)?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "ts-loader",
      //   },
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|build)/,
        use: ['style-loader', 'css-loader', "sass-loader"],
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
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'styled-components': path.resolve(
        __dirname,
        './node_modules/styled-components'
      ),
    },
  },
}