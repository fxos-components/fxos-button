/* jshint maxlen: 100 */
/*global sinon, assert, suite, setup, teardown, test */
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

  test('It applies the initial `disabled` value on creation', function() {
    this.dom.innerHTML = '<gaia-button disabled></gaia-button>';
    var el = this.dom.firstElementChild;
    assert.ok(el.hasAttribute('disabled'));
  });
});
