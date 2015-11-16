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

  suite('accessibility', function() {
    test('gaia-button attributes are correctly set', function(done) {
      // Timeout required as accessibility attributes are added in the next
      // turn of the event loop
      setTimeout(function() {
        assert.equal(this.el.getAttribute('role'), 'button',
          'Role is correctly set to button');
        assert.equal(this.el.getAttribute('tabindex'), '0',
          'Tab index is correctly set to 0');
        assert.equal(this.el.getAttribute('aria-disabled'), null);

        this.el.disabled = true;
        assert.equal(this.el.getAttribute('aria-disabled'), 'true');

        this.el.disabled = false;
        assert.equal(this.el.getAttribute('aria-disabled'), null);

        this.el.disabled = 'foo';
        assert.equal(this.el.getAttribute('aria-disabled'), 'true');

        this.el.disabled = false;
        this.el.setAttribute('disabled', true);
        assert.equal(this.el.getAttribute('aria-disabled'), 'true');

        this.dom.innerHTML = '<gaia-button disabled></gaia-button>';
        var el = this.dom.firstElementChild;
        // Timeout required as accessibility attributes are added in the next
        // turn of the event loop
        setTimeout(function() {
          assert.equal(el.getAttribute('aria-disabled'), 'true');
          done();
        });
      }.bind(this));
    });
  });
});
