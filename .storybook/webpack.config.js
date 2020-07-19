module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
}