# github-ratings

<div style='text-align:center'>
    <img src='https://img.shields.io/github/issues/GeorgianStan/github-ratings' alt='issues'>
    <img src='https://img.shields.io/github/forks/GeorgianStan/github-ratings' alt='forks'>
    <img src='https://img.shields.io/github/stars/GeorgianStan/github-ratings' alt='stars'>
    <img src='https://img.shields.io/github/license/GeorgianStan/github-ratings' alt='license'>
    <img src='https://img.shields.io/github/package-json/v/GeorgianStan/github-ratings?color=%237146f9&logo=javascript' alt='version'>
    <a href="https://david-dm.org/georgianstan/github-ratings" title="dependencies status"><img src="https://status.david-dm.org/gh/georgianstan/github-ratings.svg"/></a>
</div>

`github-ratings` is a module for both NodeJS and the Browser, which can be used to obtain various information about users and repositories.

## Installation

_This package is Typescript ready_

```bash
npm i github-ratings
```

## How to use it

### Browser

To use it browser, you need to use the code from `browser.js` file.

```html
<script src="path-to-local-library/browser.js"></script>
```

or via CDN

```html
<script src="https://unpkg.com/github-ratings@X.Y.Z/browser.js"></script>
```

Where `X.Y.Z` represents the library version.

In this scenario, the library will be bound to the global window object with the property `GithubRatings`.

`window.GithubRatings` or simple `GithubRatings` can be used to access the library.

If you have a toolchain available you can use an `import` statement.

```ts
import GithubRatings from 'github-ratings/browser';
```

```js
const GithubRatings = require('github-ratings/browser');
```

---

### Node

The library is a default export.

For `NodeJS` environment, just replace `browser` with `node`.

```ts
import GithubRatings from 'github-ratings/node';
```

_Because is a default export, here you can import it with what name you want._

## Methods
