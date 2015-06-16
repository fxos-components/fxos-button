/* globals define, KeyEvent */
(function(define){'use strict';define(function(require,exports,module){

/**
 * Dependencies
 */

var component = require('gaia-component');

/**
 * Simple logger
 * @type {Function}
 */
var debug = 0 ? console.log.bind(console) : function() {};

/**
 * Exports
 */

module.exports = component.register('gaia-button', {
  extends: HTMLButtonElement.prototype,

  created: function() {
    this.setupShadowRoot();
    this.setAttribute('role', 'button');
    this.tabIndex = 0;
    if (this.keyboardEnabled) {
      this.addEventListener('keydown', this._handleKeyEvent.bind(this));
      this.addEventListener('keyup', this._handleKeyEvent.bind(this));
    }

    if (this.deviceType === 'tv') {
      this.addEventListener('transitionend',
                            this._handleTransitionEnd.bind(this));
    }
  },

  _handleKeyEvent: function(e) {
    if (e.keyCode !== KeyEvent.DOM_VK_RETURN) {
      return;
    }

    if (e.type === 'keydown') {
      this.toggled = true;
    } else if (e.type === 'keyup') {
      this.toggled = false;
      this.setAttribute('released', '');
      this.click();
    }
  },

  _handleTransitionEnd: function(e) {
    if (this.hasAttribute('released')) {
      this.removeAttribute('released');
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
      get: function() { return this._disabled; },
      set: function(value) {
        value = !!(value || value === '');
        if (this._disabled === value) { return; }
        debug('set disabled', value);
        this._disabled = value;
        if (value) {
          this.setAttr('disabled', '');
        } else {
          this.removeAttr('disabled');
        }
      }
    },

    keyboardEnabled: {
      get: function() { return this.hasAttribute('keyboardEnabled'); },
      set: function(value) {
        value = !!(value === '' || value);

        if (value === true) {
          this.setAttr('keyboardEnabled', '');
          this.addEventListener('keydown', this._handleKeyEvent.bind(this));
          this.addEventListener('keyup', this._handleKeyEvent.bind(this));
        } else {
          this.removeAttr('keyboardEnabled');
          this.removeEventListener('keydown', this._handleKeyEvent.bind(this));
          this.removeEventListener('keyup', this._handleKeyEvent.bind(this));
        }
      }
    },

    toggled: {
      get: function() { return this.hasAttribute('toggled'); },
      set: function(value) {
        value = !!(value === '' || value);

        if (value === this.toggled) {
          return;
        }

        if (value === true) {
          this.setAttr('toggled', '');
        } else {
          this.removeAttr('toggled');
        }
      }
    },

    deviceType: {
      get: function() { return this.getAttribute('deviceType'); },
      set: function(value) {
        if (value === 'tv') {
          this.setAttr('deviceType', 'tv');
        } else {
          this.removeAttr('deviceType');
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

    /** TV buttons
     ---------------------------------------------------------*/

    /** base visual */
    :host([deviceType='tv']) {
      display: inline-block;
      width: 8rem;
      height: 8rem;
      /* we need to set border to none to remove the button border */
      border: none;
      /* the radius is still make button as round even if we don't have
         border */
      border-radius: 50%;
      /* 50% is not a real circle because of rounding, we have to use a value
         larger than 50% */
      -moz-outline-radius: 60%;
      outline: transparent 0 solid;
      background-color: rgba(0, 0, 0, 0.5);
      background-repeat: no-repeat;
      background-size: 5.4rem auto;
      background-position: center center;
      font-style: italic;

      transition-property: background-color, transform, outline;
      transition-timing-function: cubic-bezier(0.25, 0, 0, 1.0);
      transition-delay: 0ms;
      transition-duration: 0.42s;
    }

    :host([deviceType='tv']:focus) {
      outline: 0;
      background-color: #ffffff;
      transform: scale(1.2);
      transition-duration: 0.42s;
    }

    :host([deviceType='tv'][released]) {
      transition-duration: 0.16s;
    }

    :host([deviceType='tv']:active),
    :host([deviceType='tv'][toggled]) {
      background-color: #00caf2;
      transform: scale(0.8);
      transition-duration: 0.06s;
    }

    :host([deviceType='tv'][disabled]) {
      background-color: rgba(0, 0, 0, 0.5);
    }

    :host([deviceType='tv'][data-icon]:before) {
      font-size: 5.4rem;
      line-height: 8rem;
      text-align: center;
      color: #ffffff;
      white-space: normal;
      transition-property: color;
      transition-timing-function: cubic-bezier(0.25, 0, 0, 1.0);
      transition-delay: 0ms;
    }

    :host([deviceType='tv'][data-icon]:focus:before) {
      color: #2d2d2d;
    }

    :host([deviceType='tv'][data-icon]:active:before),
    :host([deviceType='tv'][data-icon][toggled]:before) {
      color: #ffffff;
    }

    :host([deviceType='tv'][data-icon][disabled]:before) {
      color: #ffffff;
      opacity: 0.3;
    }
    </style>`
});

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('gaia-button',this));
