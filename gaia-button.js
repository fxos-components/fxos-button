/* globals define */
(function(define){'use strict';define(function(require,exports,module){

/**
 * Dependencies
 */

var component = require('gaia-component');

/**
 * Exports
 */

module.exports = component.register('gaia-button', {
  extends: HTMLButtonElement.prototype,

  created: function() {
    this.setupShadowRoot();
    // offload the initiate operation to save loadtime
    setTimeout(() => {
      this.makeAccessible();
    });
  },

  makeAccessible: function() {
    this.setAttribute('role', 'button');

    // Make tabable
    this.tabIndex = 0;

    // let screen reader read the button is disabled
    if (this.hasAttribute('disabled')) {
      this.setAttribute('aria-disabled', true);
    }
    // let screen reader read the button text and ignore the icon text
    // when both icon and text existed
    if (this.childElementCount > 1 && this.getElementsByTagName('i')) {
      var items = this.getElementsByTagName('i');
      for (var i = 0, len = items.length; i < len; i++) {
        items[i].setAttribute('aria-hidden', true);
      }
    }
  },

  attrs: {
    circular: {
      get: function() { return this.getAttribute('circular'); },
      set: function(value) {
        value = !!(value === '' || value);
        if (value) {
          this.setAttribute('circular', '');
        } else {
          this.removeAttribute('circular');
        }
      }
    },

    disabled: {
      get: function() { return this.getAttribute('disabled'); },
      set: function(value) {
        value = !!(value === '' || value);
        if (value) {
          this.setAttribute('disabled', '');
          this.setAttribute('aria-disabled', true);
        } else {
          this.removeAttribute('disabled');
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
      margin: var(--base-m, 18px) 0;
      outline: 0;
      font-style: italic;
      font-size: 17px;
      cursor: pointer;
      -moz-user-select: none;
      line-height: 1;

      background:
        var(--button-background,
        var(--input-background,
        var(--background-plus,
        #fff)));

      color:
        var(--button-color,
        var(--text-color,
        inherit));

      box-shadow:
        var(--button-box-shadow,
        var(--box-shadow,
        none));

      transition: color 0ms 300ms;
    }

    @media(min-width:500px) {
      :host { min-width: 140px; }
    }

    /**
     * Pressed
     */

    :host(:active) {
      color: var(--button-color-active, #fff);
      box-shadow: var(--button-box-shadow-active, none);
      transition: none;
    }

    /**
     * [circular]
     */

    :host([circular]) {
      width: 50px;
      min-width: 0;
      border-radius: 50%;
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
    }

    /** Inner
     ---------------------------------------------------------*/

    .inner {
      position: relative;
      height: 100%;
    }

    /** Background
     ---------------------------------------------------------*/

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
        var(--button-background-active,
        var(--highlight-color,
        #333));
    }

    :active .background {
      transition: none;
      opacity: 1;
    }



    /** Content
     ---------------------------------------------------------*/

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

    [circular] .content {
      padding: 0;
    }

    i:before {
      font-size: 26px;
    }

    ::content i {
      margin-left: -2px;
      margin-right: -2px;
    }

    ::content i + span,
    ::content span + i {
      -moz-margin-start: 8px;
    }

    </style>`
});

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('gaia-button',this));
