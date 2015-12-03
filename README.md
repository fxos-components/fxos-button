# &lt;fxos-button&gt; [![](https://travis-ci.org/fxos-components/fxos-button.svg)](https://travis-ci.org/fxos-components/fxos-button)

## Installation

```bash
$ npm install fxos-button
```

## Examples

- [Example](http://fxos-components.github.io/fxos-button/)

## Usage

```html
<fxos-button>normal button<fxos-button>
```

### disable

Add `disabled` attribute to disable the button.

```html
<fxos-button disabled>button disabled</fxos-button>
```

### With icon

Button be used in conjunction with [fxos-icons](https://github.com/fxos-components/fxos-icons).

```html
<fxos-button><i data-icon="back-light" aria-hidden="true"></i><span>Back</span></fxos-button>
```

```html
<fxos-button><span>Forward</span><i data-icon="forward-light" aria-hidden="true"></i></fxos-button>
```

Remember to add `aria-hidden="true"` when both icon and text existed for **Accessibility**. So the screen reader will read the button text and ignore the icon text.

### Circular

Add `circular` attribute to turn button into circular form.

```html
<fxos-button circular><i data-icon="camera"></i></fxos-button>
```

## Readiness

- [x] Accessibility ([@yzen](https://github.com/yzen))
- [ ] Test Coverage
- [ ] Performance
- [ ] Visual/UX
- [ ] RTL

## Developing locally

1. `git clone https://github.com/fxos-components/fxos-button.git`
2. `cd fxos-button`
3. `npm install` (NPM3)
4. `npm start`

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
