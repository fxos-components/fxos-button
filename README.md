# &lt;gaia-button&gt; [![](https://travis-ci.org/gaia-components/gaia-button.svg)](https://travis-ci.org/gaia-components/gaia-button) [![devDependency Status](https://david-dm.org/gaia-components/gaia-header/dev-status.svg)](https://david-dm.org/gaia-components/gaia-button#info=devDependencies)

## Installation

```bash
$ bower install gaia-components/gaia-button
```

Then include folowing files in HTML

```html
<link href="bower_components/gaia-icons/gaia-icons.css"></link>
<script src="bower_components/gaia-list/gaia-button.js"></script>
```

You don't have to include `gaia-icon.css` if you do not use icon in your button.


## Examples

- [Example](http://gaia-components.github.io/gaia-button/)


## Usage

Button that contain text need to include `data-l10n-id` attribute for localization.

```html
<gaia-button><span data-l10n-id="normal_button"/><gaia-button>
```

### With icon

* {Start icon} button text

Button can show with icon at left

```
<gaia-button><span data-icon="back-light" data-l10n-id="back"/></gaia-button>
```

* button text {End icon}

Button can show with icon at right

```
<gaia-button><span data-icon-end="forward-light" data-l10n-id="forward"/></gaia-button>
```

* {Start icon} button text {End icon}

Button can show with icon on both side

```
<gaia-button><span data-icon="back-light" data-icon-end="forward-light" data-l10n-id="quote">Quote</span></gaia-button>
```

### disable

Add `disabled` attribute to disable the button.

```html
<gaia-button disabled><span data-l10n-id="disable">button disabled</span></gaia-button>
```

### Circular

Add `circular` attribute to turn button into circular form.

```html
<gaia-button circular>
  <span data-icon="camera" data-l10n-id="camera"/>
</gaia-button>
```


## RTL

`gaia-button` is RTL ready. The icon and text position will be changed base on RTL settings.


## Accessibility

`aria-disabled="true"` is added automatically when button comes with `disabled` attribute. So the screen reader will read the button text and note it was disabled.

* standalone icon butotn:

```html
<gaia-button>
  <span data-l10n-id=""/>
<gaia-button>
```

When the button only contains an icon, adding `data-l10n-id` to the element with `data-icon` that points to `{property}.ariaLabel` in the properties file (that will add an `aria-label` attribute to the same element and will not touch inner HTML).

* {Start icon} {End icon}

Screen reader can not read anything. Like above case, You can add `data-l10n-id` in gaia-button and add `{property}.ariaLabel` in the properties file.

* {Meaningful icon} button text

Meaningful icon is where the icon complements text in a meaningful way, ex: `♥ location`. You can add `data-l10n-id` in gaia-button and add `{property}.ariaLabel` in the properties file to make Screen reader read proper text.

## Tests

1. Ensure Firefox Nightly is installed on your machine.
2. `$ npm install`
3. `$ npm test`

If your would like tests to run on file change use:

`$ npm run test-dev`

## Lint check

Run lint check with command:

`$ npm run lint`
