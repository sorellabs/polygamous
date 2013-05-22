Polygamous [![Build Status](https://travis-ci.org/killdream/polygamous.png)](https://travis-ci.org/killdream/polygamous) ![Dependencies Status](https://david-dm.org/killdream/polygamous.png)
==========

Polygamous is a library that implements [Clojure][]-style run-time polymorphism
through multi-methods. Methods dispatch on a single argument, based on pattern
matching over the different branches of a method after running the value
through a dispatch function — which is identity by default.

[Clojure]: http://clojure.org/multimethods


## Example

```js
var method = require('polygamous')
var fib = method()
            .when(0, function(n){ return 0 })
            .when(1, function(n){ return 1 })
            .default(function(n){ return fib(n - 1) + fib(n - 2) })
            
fib(8) // => 21
```


## Installing

The easiest way is to grab it from NPM (use [Browserify][] if you're on a
browser):

    $ npm install polygamous
    
If you **really** want to continue suffering with old and terrible module
systems (or use no module system at all), you can run `make bundle` yourself:

    $ git clone git://github.com/killdream/polygamous
    $ cd polygamous
    $ npm install
    $ make bundle
    # Then use `dist/polygamous.umd.js` wherever you want.
    
[browserify]: https://github.com/substack/node-browserify


## Platform support

This library assumes an ES5 environment, but can be easily supported in ES3
platforms by the use of shims. Just include [es5-shim][] :3

[es5-shim]: https://github.com/kriskowal/es5-shim

[![browser support](https://ci.testling.com/killdream/polygamous.png)](http://ci.testling.com/killdream/polygamous)


## Tests

For node:

    $ npm test
    
For the browser:

    $ npm install -g brofist-browser
    $ make test
    $ brofist-browser serve build/test/specs
    # Then point your browsers to the URL on yer console.


## API

### `polygamous(f)`

Constructs a new multi-method, optionally using the given dispatch function.

```hs
polygamous: (A... -> B) -> method
```

The dispatch function will be given the arguments that were passed to the
multi-method, and should return a new value that'll be used to select the
proper method branch.

We check the dispatch value using deep equality, rather than the less
expressive strict equality comparison. This means that `[1, 2]` will happily
match any branch that defines `[1, 2]` as its dispatch predicate.

By default, the dispatch is done on the identity of the first argument. That
is, the default dispatch function is: `function(a){ return a }`.


### `method:when(a, f)`

Adds a new branch to the method, which is executed only when the dispatch value
matches `a`.

```hs
when: @method => A, (B... -> C) -> method
```

### `method:default(f)`

Adds a baseline branch for the method, which is executed if all other branches
fail to match the dispatch value.

```hs
default: @method => (A... -> B) -> method
```

### `method:remove(a)`

Removes the branch that has `a` as its evaluation condition.

```hs
remove: @method => A -> method
```

### `method:prefer(a, b)`

Makes the method consider `b` for all values of `a`, when there's a conflict.

```hs
prefer: @method => A, B -> method
```



## Licence

MIT/X11. i.e.: Do whatever you fucking want, bro.
