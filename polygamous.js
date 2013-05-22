// # Module polygamous
//
// Clojure-style multi-methods for JavaScript.
//
//
// :licence: MIT
//   Copyright (c) 2013 Quildreen Motta
//
//   Permission is hereby granted, free of charge, to any person
//   obtaining a copy of this software and associated documentation files
//   (the "Software"), to deal in the Software without restriction,
//   including without limitation the rights to use, copy, modify, merge,
//   publish, distribute, sublicense, and/or sell copies of the Software,
//   and to permit persons to whom the Software is furnished to do so,
//   subject to the following conditions:
//
//   The above copyright notice and this permission notice shall be
//   included in all copies or substantial portions of the Software.
//
//   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//   NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//   LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//   OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
//   WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// -- Dependencies -----------------------------------------------------
var equal = require('deep-equal')


// -- Helpers ----------------------------------------------------------

function identity(a) { return a }

function noBranchFor(a) {
  var e = new Error('No branch responds to "' + a + '"')
  e.name = 'no-branch-error'
  return e
}

function findBranch(value, as, baseline) {
  var i = as.length
  while (i--)
    if (equal(value, as[i].condition)) return as[i].code

  return baseline
}


// -- Core implementation ----------------------------------------------

function method(dispatch) {
  var branches = []
  var baseline = function(a){ throw noBranchFor(a) }

  dispatch = dispatch || identity

  return makeMethod(function() {
    var value  = dispatch.apply(null, arguments)
    var branch = findBranch(value, branches, baseline)

    return branch.apply(null, arguments)
  })


  function makeMethod(f) {
    f.when    = when
    f.default = _default
    f.remove  = remove
    f.prefer  = prefer

    return f
  }

  function when(condition, f) {
    branches.push({ condition: condition, code: f })
    return this
  }

  function _default(f) {
    baseline = f
    return this
  }

  function remove(condition) {
    branches = branches.filter(function(a) {
                                 return !equal(condition, a.condition)
                               })
    return this
  }

  function prefer(condition, b) {

  }
}

// -- Exports ----------------------------------------------------------
module.exports = method