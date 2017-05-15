# seconds

[![Build Status](https://travis-ci.org/makenova/seconds.svg?branch=master)](https://travis-ci.org/makenova/seconds)

Use this package to easily convert various time formats to seconds.
This package was forked from [zeit/ms](https://github.com/zeit/ms)

## Examples

```js
seconds('2 days')  // 172800
seconds('1d')      // 86400
seconds('10h')     // 36000
seconds('2.5 hrs') // 9000
seconds('2h')      // 7200
seconds('1m')      // 60
seconds('5s')      // 5
seconds('1y')      // 31557600
seconds('100')     // 100
```

### Convert from milliseconds

```js
seconds(60)                   // "1m"
seconds(2 * 60)               // "2m"
seconds(seconds('10 hours'))  // "10h"
```

### Time format written-out

```js
seconds(60, { long: true })                   // "1 minute"
seconds(2 * 60, { long: true })               // "2 minutes"
seconds(seconds('10 hours'), { long: true })  // "10 hours"
```

## Features

- Works both in [node](https://nodejs.org) and in the browser.
- If a number is supplied to `seconds`, a string with a unit is returned.
- If a string that contains the number is supplied, it returns it as a number (e.g.: it returns `100` for `'100'`).
- If you pass a string with a number and a valid unit, the number of equivalent seconds is returned.

## Caught a bug?

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Within the module you want to test your local development instance of seconds, just link it to the dependencies: `npm link @makenova/seconds`. Instead of the default one from npm, node will now use your clone of seconds!

As always, you can run the tests using: `npm test`
