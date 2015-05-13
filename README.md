# &lt;gaia-button&gt; [![](https://travis-ci.org/gaia-components/gaia-button.svg)](https://travis-ci.org/gaia-components/gaia-button) [![devDependency Status](https://david-dm.org/gaia-components/gaia-header/dev-status.svg)](https://david-dm.org/gaia-components/gaia-button#info=devDependencies)

## Installation

```bash
$ bower install gaia-components/gaia-button
```


## Examples

- [Example](http://gaia-components.github.io/gaia-button/)


## Usage

```html
<gaia-button>normal button<gaia-button>
```

### disable

Add `disabled` attribute to disable the button.

```html
<gaia-button disabled>button disabled</gaia-button>
```

### Circular

Add `circular` attribute to turn button into circular form.

```html
<gaia-button circular><i data-icon="camera"></i></gaia-button>
```

### With icon

Button Can show with icon (need import `gaia-icons`) at left

```html
<gaia-button><i data-icon="back-light"></i><span>Back</span></gaia-button>
```

or right

```html
<gaia-button><span>Forward</span><i data-icon="forward-light"></i></gaia-button>
```


## RTL

`gaia-button` is RTL ready. The icon and text position will be changed base on RTL settings.


## Accessibility

`aria-disabled="true"` is added automatically when button comes with `disabled` attribute. So the screen reader will read the button text and note it was disabled.

`aria-hidden="true"` is added automatically when both icon and text existed for **Accessibility**. So the screen reader will read the button text and ignore the icon text.


## Lint check

Run lint check with command:

`$ npm run lint`
