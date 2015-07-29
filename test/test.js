/* jshint maxlen: 100 */
/*global sinon, assert, suite, setup, teardown, test, KeyEvent */
'use strict';
suite('GaiaButton', function() {
  setup(function() {
    this.sinon = sinon.sandbox.create();
    // DOM container to put test cases
    this.dom = document.createElement('div');
    this.dom.innerHTML = '<gaia-button></gaia-button>';
    this.el = this.dom.firstElementChild;
    document.body.appendChild(this.dom);
  });

  teardown(function() {
    this.sinon.restore();
    document.body.removeChild(this.dom);
    this.dom = null;
  });

  function dispatchKeyEvent(el, type, keyCode) {
    var eventObj = document.createEvent('KeyboardEvent');
    eventObj.initKeyEvent(type, true, true, null, false, false, false, false,
                          keyCode, 0);
    el.dispatchEvent(eventObj);
  }

  test('It can be disabled via attribute or property', function() {
    this.el.disabled = true;
    assert.equal(this.el.getAttribute('disabled'), '');

    this.el.disabled = false;
    assert.equal(this.el.getAttribute('disabled'), null);

    this.el.disabled = 'foo';
    assert.equal(this.el.getAttribute('disabled'), '');

    this.el.setAttribute('disabled', true);
    assert.equal(this.el.getAttribute('disabled'), 'true');
    assert.equal(this.el.disabled, true);
  });

  test('It can be toggled via attribute or property', function() {
    this.el.toggled = true;
    assert.equal(this.el.getAttribute('toggled'), '');

    this.el.toggled = false;
    assert.equal(this.el.getAttribute('toggled'), null);

    this.el.toggled = 'foo';
    assert.equal(this.el.getAttribute('toggled'), '');

    this.el.setAttribute('toggled', true);
    assert.equal(this.el.getAttribute('toggled'), 'true');
    assert.equal(this.el.toggled, true);
  });

  test('It applies the initial `disabled` value on creation', function() {
    this.dom.innerHTML = '<gaia-button disabled></gaia-button>';
    var el = this.dom.firstElementChild;
    assert.ok(el.hasAttribute('disabled'));
  });

  test('click should be fired on key events', function() {
    this.dom.innerHTML = '<gaia-button></gaia-button>';
    var el = this.dom.firstElementChild;

    var clicked = false;
    // register event listener for testing keyboard to click event
    el.onclick = function() {
      clicked = true;
    };

    // send keydown
    dispatchKeyEvent(el, 'keydown', KeyEvent.DOM_VK_RETURN);
    assert.equal(el.toggled, true);

    // send keyup
    dispatchKeyEvent(el, 'keyup', KeyEvent.DOM_VK_RETURN);
    assert.equal(this.el.toggled, false);

    // check if click is fired
    assert.equal(clicked, true);
  });
});
