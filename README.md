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

### With icon

Button Can show with icon (need import `gaia-icons`) at left

```html
<gaia-button><i data-icon="back-light" aria-hidden="true"></i><span>Back</span></gaia-button>
```

or right

```html
<gaia-button><span>Forward</span><i data-icon="forward-light" aria-hidden="true"></i></gaia-button>
```

Remember to add `aria-hidden="true"` when both icon and text existed for **Accessibility**. So the screen reader will read the button text and ignore the icon text.

### Circular

Add `circular` attribute to turn button into circular form.

```html
<gaia-button circular><i data-icon="camera"></i></gaia-button>
```

## Tests

1. Ensure Firefox Nightly is installed on your machine.
2. `$ npm install`
3. `$ npm test`

If your would like tests to run on file change use:

`$ npm run test-dev`

## Lint check

Run lint check with command:

`$ npm run lint`
