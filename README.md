# &lt;gaia-button&gt; [![devDependency Status](https://david-dm.org/gaia-components/gaia-header/dev-status.svg)](https://david-dm.org/gaia-components/gaia-button#info=devDependencies)

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

Button Can show with icon (need import `gaia-icons`)

```html
<gaia-button><i data-icon="back-light"></i><span>Back</span></gaia-button>
```

### Circular

Add `circular` attribute to turn button into circular form.

```html
<gaia-button circular><i data-icon="camera"></i></gaia-button>
```

## Lint check

Run lint check with command:

`$ npm run lint`
