var spec   = require('brofist')()
var assert = require('assert')

var poly = require('../../')

module.exports = [spec('polygamous()', function(it, spec) {

  it('Should create a new method.', function() {
    var m = poly()
    assert(typeof m == 'function')
    assert(typeof m.when == 'function')
    assert(typeof m.fallback == 'function')
    assert(typeof m.remove == 'function')
  })

  it('Given no function, should treat dispatch as identity.', function() {
    var m = poly()
    m.when('boo', function(){ return 1 })

    assert(m('boo') == 1)
  })

  it('Given a function, should use that for dispatching.', function() {
    var m = poly(function(a){ return a.toUpperCase() })
    m.when('BOO', function(){ return 1 })
    assert(m('boo') == 1)
  })

  it('Should do a deep equality comparison.', function() {
    var m = poly(function(a){ return a.kind })
    m.when(['exp'], function(exp){ return exp.value })

    assert(m({ kind: ['exp'], value: 1 }) == 1)
  })

  it('With no baseline, should error.', function() {
    var m = poly()
    m.when(1, function(){ })

    assert.throws(function() { m(2) }, /no-branch-error/)
  })

  spec('when(a, f)', function(it) {
    it('Should add a new branch to the method.', function() {
      var m = poly()
      m.when(1, function(){ return 1 })
      m.when(2, function(){ return 2 })

      assert(m(1) == 1)
      assert(m(2) == 2)
    })

    it('If a branch exists for a condition, should throw an error.', function() {
      var m = poly()
      m.when(1, function(){ return 1 })

      assert.throws(function(){ m.when(1, m) }, /ambiguous-branch-error/)
    })
  })

  spec('default(f)', function(it) {
    it('Should add a baseline to the method.', function() {
      var m = poly()
      m.when(1, function(){ return 1 })
      m.fallback(function(){ return 0 })

      assert(m(1) == 1)
      assert(m(2) == 0)
    })
  })

  spec('remove(a)', function(it) {
    it('Should remove a previous branch.', function() {
      var m = poly()

      m.when(1, function(){ return 1 })
      assert(m(1) == 1)

      m.when(2, function(){ return 2 })
      m.remove(1)
      assert.throws(function(){ m(1) }, /no-branch-error/)
      assert(m(2) == 2)
    })
  })

})]