'use strict';
module.exports = function(config) {
  config.set({
    basePath: '..',
    browsers: ['firefox_latest'],
    frameworks: [
      'mocha',
      'sinon-chai'
    ],

    client: {
      captureConsole: true,
      mocha: {'ui': 'tdd'}
    },

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: {'dom.webcomponents.enabled': true}
      }
    },

    files: [
      'node_modules/fxos-component/fxos-component.js',
      'fxos-button.js',
      'test/test-unit.js'
    ]
  });
};
