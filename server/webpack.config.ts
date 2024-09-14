const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: /MyClass|AnotherClass/ // Replace this with your class names or use `true` to keep all classnames
        }
      }),
    ],
  },
};
