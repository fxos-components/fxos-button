# &lt;gaia-button&gt; [![](https://travis-ci.org/fxos-components/gaia-button.svg)](https://travis-ci.org/fxos-components/gaia-button)

## Installation

```bash
$ bower install fxos-components/gaia-button
```

## Examples

- [Example](http://fxos-components.github.io/gaia-button/)

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

## Readiness

- [x] Accessibility ([@yzen](https://github.com/yzen))
- [ ] Test Coverage
- [ ] Performance
- [ ] Visual/UX
- [ ] RTL

## Tests

1. Ensure Firefox Nightly is installed on your machine.
2. To run unit tests you need npm >= 3 installed.
3. `$ npm install`
4. `$ npm run test-unit`

If your would like tests to run on file change use:

`$ npm run test-unit-dev`

If your would like run integration tests, use:
`$ export FIREFOX_NIGHTLY_BIN=/absolute/path/to/nightly/firefox-bin`
`$ npm run test-integration`

## Lint check

Run lint check with command:

`$ npm run test-lint`
