const { ModuleFederationPlugin } = require('webpack').container;
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

module.exports = {
  output: {
    uniqueName: 'angularContainer',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...mf.sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'angularContainer', // Name of the container app
      remotes: {
        reactApp: 'reactApp@http://localhost:3000/remoteEntry.js', // Path to the remote React app
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // Additional shared libraries here
      },
    }),
    mf.sharedMappings.getPlugin(),
  ],
};
