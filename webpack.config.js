module.exports = {
  entry: './src/fxos-button.js',
  output: {
    filename: 'fxos-button.js',
    library: 'FXOSButton',
    libraryTarget: 'umd'
  },

  externals: {
    "fxos-component": "fxosComponent"
  }
}
