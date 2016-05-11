class-lists
===========

[![Version](http://img.shields.io/npm/v/class-lists.svg)](https://www.npmjs.org/package/class-lists)
[![travis-ci](https://travis-ci.org/joaomilho/class-lists.svg)](https://travis-ci.org/joaomilho/class-lists)

A simple javascript utility for conditionally joining class names together, inspired by [classNames](https://github.com/JedWatson/classnames) but with a twist.

###### Install with npm

```sh
npm install class-lists
```

Use with node.js, browserify or webpack:

```js
// es5
var classLists = require('class-lists');

// es6
import classLists from 'class-lists';
```

Alternatively, you can simply include `index.js` on your page with a standalone `<script>` tag and it will export a global `classLists` method (useful if you're doing Rails), or define the module if you are using RequireJS.

## Usage

The `classLists` function takes [ideally] any number of arguments which can be either a string or a tuple. Since tuples are not first class citizens in JS, they are represented by regular arrays (with 2 or 3 items).

```js
var visible = true,
    open = false

// strings
classLists('header', 'is-visible'); // => 'header is-visible'

// strings + lists
classLists('header',
  [visible, 'is-visible'],
  [open, 'is-open'],
); // => 'header is-visible'

// booleans
classLists('header',
  [visible, 'is-visible', 'is-hidden'],
  [open, 'is-open', 'is-closed']
 ); // => 'header is-visible is-closed'

// with css modules
var styles = {
  'is-visible': 'is-visible-fn38j',
  'is-open': 'is-open-g3oiw'
} // this is a mock! :D

classLists(styles, 'header',
  [visible, 'is-visible'],
  [open, 'is-open']
 ); // => 'header is-visible-fn38j'
```

### Main difference from classnames:

###### Difference #1

Since it doesn't rely on objects you don't need to use the special es6 syntax for dynamic keys:

```
var state = 'open'

// classNames version es5
var opts = {}
opts['is-' + state] = state
classNames(opts) // => 'is-open'

// classLists version es5
classLists([state, 'is-' + state']) // => 'is-open'

// classNames version es6
classNames({[‘is-${state}‘]: state}) // => 'is-open'

// classLists version es6
classLists([state, ‘is-${state}‘]) // => 'is-open'
```

###### Differece #2

Using tuples instead of objects gives you the ability to have classes defined based on a boolean for both true and false scenarios:

```
// classNames version
var open = true

classNames({
  'is-open': open,
  'is-closed': !open
})

// classLists version
classLists([
  open, ['is-open', 'is-closed]
])
```

###### Differece #3

Doesn't require to call bind when you use css modules:

```
var styles = require('./styles.css')

// classNames
var classNames = require('classnames/bind')
classNames.bind(styles)
classNames({open: true})

// classLists
var classLists = require('class-lists') // same module
classNames(styles, [true, 'open'])
```

###### Differece #4

If you're a performance freak, the fact it doesn't deal with objects makes classLists a little faster. Take a look at the [benchmark](http://jsperf.com/classnames-vs-classpairs) online (current versions, may change in the future).

Here are my local benchmarks:

| Project | Params | Results |
|---|---|---|
|classNames|strings|6.1M ops/sec|
|classLists|strings|6.5M ops/sec **+6%**|
|classNames| object |2.1M ops/sec|
|classLists| lists |6.0M ops/sec **+280%**|
|classNames|strings & objects|2.2M ops/sec|
|classLists|strings & lists|5.5M ops/sec **+250%**|
|classNames|mix|1.5M ops/sec|
|classLists|mix|4.0M ops/sec **+266%**|
|classNames|css-modules|0.6M ops/sec|
|classLists|css-modules|3.8M ops/sec **+633%**|

## License

[MIT](LICENSE)

## Contributing

* Send PR with tests passing (`npm test`). It will also ensure that the code has good standards with `standard`. Make sure your changes do not degrade performance considerable, preferably not at all. Do not bump version in your PR.
* Once the PR is ok, then update the version according to SemVer and I'll realease it.

That's all.

