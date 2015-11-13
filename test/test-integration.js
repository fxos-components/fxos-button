/* global marionette, setup, test */

'use strict';

var assert = require('chai').assert;
marionette.plugin('helper', require('marionette-helper'));

marionette('gaia-button', function() {
  var client = marionette.client({
    profile: {
      prefs: {
        // Disable first time run UI
        'browser.feeds.showFirstRunUI': false,
        // Disable default browser check
        'browser.shell.checkDefaultBrowser': false,
        // Disable UI tutorial
        'browser.uitour.enabled': false,
        // Enable chrome debugging
        'devtools.chrome.enabled': true,
        'devtools.debugger.remote-enabled': true,

        // Load integration test page on startup
        'startup.homepage_welcome_url': __dirname + '/test-integration.html',

        // Allow loading test resources oudside of test/ directory
        // (e.g. bower-components)
        'security.fileuri.strict_origin_policy': false,

        // Enable web components
        'dom.webcomponents.enabled': true,
        // Enable touch events
        'dom.w3c_touch_events.enabled': 1
      }
    },
    desiredCapabilities: {
      raisesAccessibilityExceptions: true
    }
  });

  var components = [
    { selector: '#button-0', enabled: true },
    { selector: '#button-1', enabled: false },
    { selector: '#button-2', enabled: true },
    { selector: '#button-3', enabled: true },
    { selector: '#button-4', enabled: true },
    { selector: '#button-5', enabled: true },
    { selector: '#button-6', enabled: false },
    { selector: '#button-7', enabled: true },
    { selector: '#button-8', enabled: false },
    { selector: '#button-9', enabled: true }
  ];

  /**
   * Perform a marionette operation and assert if an error is thrown.
   * @param  {Function} testFn operation to perform
   * @param  {String} message error message for the assert statement
   */
  function failOnA11yError(testFn, message) {
    try {
      testFn();
    } catch (err) {
      // Marionette raises an ElementNotAccessibleError exception when
      // raisesAccessibilityExceptions is set to true.
      assert(false, [message, err.message].join(' '));
    }
  }

  setup(function() {
    components.forEach(function(aComponent) {
      aComponent.element = client.findElement(aComponent.selector);
    });
  });

  test('gaia-buttons are present, have a correct state and are visible to ' +
    'the assistive technology', function() {
      components.forEach(function(aComponent) {
        // Element is found
        assert.ok(aComponent.element, aComponent.selector);
        // Element is visible to all (inlcuding assistive technology)
        failOnA11yError(function() {
          assert.isTrue(aComponent.element.displayed());
        }, 'gaia-button element should be visible both normally and to ' +
          'assistive technology.');
        // NOTE: selenium checks for isEnabled does not support custom elements
        // and will always return true.
        // See: https://code.google.com/p/selenium/source/browse/javascript/
        //              atoms/dom.js#324
        if (aComponent.enabled) {
          assert.equal(aComponent.element.enabled(), aComponent.enabled,
            aComponent.selector);
        }
      });
  });

  test('gaia-button is accessible (no error thrown when clicking and tapping)',
    function() {
      ['click', 'tap'].forEach(function(action) {
        components.forEach(function(aComponent) {
          // The following checks for an element will be performed on tap/click:
          // * visible to the assistive technology
          // * enabled to the assistive technology
          // * not obstructed via pointer-events set to none
          // * focusable by the assistive technology
          // * named/labelled for the assistive technology
          // * support user actions (click/tap/etc) performed via assistive
          //   technology
          if (aComponent.enabled) {
            failOnA11yError(function() {
              aComponent.element[action]();
            }, 'gaia-button should be clickable and tappable including via ' +
              'the assistive technology.');
          } else {
            try {
              aComponent.element[action]();
            } catch (err) {
              assert.equal(err.type, 'ElementNotAccessibleError', 'disabled ' +
                'gaia-button is not clickable or tappable and clicking/' +
                'tapping will result in an ElementNotAccessibleError.');
            }
          }
        });
      });
    });
});
