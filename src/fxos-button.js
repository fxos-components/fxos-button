'use strict';

/**
 * Dependencies
 */

var component = require('fxos-component');

/**
 * Simple logger
 * @type {Function}
 */
var debug = 0 ? console.log.bind(console, '[fxos-button]') : () => {};

/**
 * Exports
 */

module.exports = component.register('fxos-button', {
  extends: HTMLButtonElement.prototype,

  created: function() {
    this.setupShadowRoot();

    // Configure
    this.disabled = this.getAttribute('disabled');

    // process everything that doesn't affect user interaction
    // after the component is created
    setTimeout(() => this.makeAccessible());
  },

  /**
   * Accessibility enhancements.
   * Read fxos-button as button.
   * make it tabable
   * read its disabled state
   */
  makeAccessible: function() {
    this.setAttribute('role', 'button');

    // Make tabable
    this.tabIndex = 0;

    if (this.disabled) {
      this.setAttribute('aria-disabled', true);
    }
  },

  attrs: {
    circular: {
      get: function() { return this.getAttribute('circular'); },
      set: function(value) {
        value = !!(value === '' || value);
        if (value) this.setAttribute('circular', '');
        else this.removeAttribute('circular');
      }
    },

    disabled: {
      get: function() { return this._disabled; },
      set: function(value) {
        value = !!(value || value === '');
        if (this._disabled === value) { return; }
        debug('set disabled', value);
        this._disabled = value;
        if (value) {
          this.setAttr('disabled', '');
          this.setAttribute('aria-disabled', true);
        } else {
          this.removeAttr('disabled');
          this.removeAttribute('aria-disabled');
        }
      }
    }
  },

  template: `
    <div class="inner">
      <div class="background"></div>
      <div class="content"><content></content></div>
    </div>
    <style>
      :host {
        display: block;
        box-sizing: border-box;
        overflow: hidden;
        height: 50px;
        min-width: 50%;
        border-radius: 50px;
        margin: 18px 0;
        outline: 0;

        font-size: 17px;
        font-weight: 300;
        font-style: italic;
        transition: color 0ms 300ms;
        -moz-user-select: none;
        cursor: pointer;
        line-height: 1;

        --default-box-shadow: inset 0 -1px 0 #d8d8d8, inset 0 1px 0 #eee;

        box-shadow:
          var(--fxos-button-box-shadow,
          var(--default-box-shadow));
        background:
          var(--fxos-button-background,
          var(--fxos-background));
        color:
          var(--fxos-button-color,
          var(--fxos-color));
      }

      @media(min-width:500px) {
        :host { min-width: 140px; }
      }

      :host(:active) {
        color: var(--fxos-button-color-active, #fff);
        transition: none;
      }

      :host([circular]) {
        width: 50px;
        min-width: 0;
        max-width: 50px;
        border-radius: 50%;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      .inner {
        position: relative;
        height: 100%;
      }

      .background {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;

        transition: opacity 500ms 200ms;
        background:
          var(--fxos-button-background-active,
          var(--fxos-brand-color));
      }

      :active .background {
        transition: none;
        opacity: 1;
      }

      /**
       * 1. In some cases events seems to be getting
       *    swallowed by text-nodes. Ignoring pointer-
       *    events means we can listen on parent nodes
       *    instead.
       */

      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 2;
        height: 100%;
        padding: 0 18px;
        pointer-events: none; /* 1 */
      }

      [circular] .content { padding: 0 }

      ::content i {
        margin-left: -2px;
        margin-right: -2px;
      }

      ::content i:before { font-size: 22px }

      ::content i + span,
      ::content span + i {
        -moz-margin-start: 8px;
      }
    </style>`
});
