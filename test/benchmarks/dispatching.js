var Benchmark = require('benchmark')
var suite     = new Benchmark.Suite
var method    = require('../../polygamous')

var x
var items = ['foo', 'bar', 'baz', 'qux'].sort(function(){
              return Math.random() - 0.5
            })

function nextItem() {
  return items[nextIndex()] }

function nextIndex() {
  return ~~(Math.random() * items.length) }

// -- Baseline
function baseline(a) {
  return a === 'foo'?     'bar'
  :      a === 'bar'?     'baz'
  :      a === 'baz'?     'qux'
  :      a === 'qux'?     'foo'
  :      /* otherwise */  null }

suite.add('Baseline', function() {
  x = baseline(nextItem())
})

// -- Method (String)
var m1 = method(function(a){ return a })

m1.when('foo', function(){ return 'bar' })
m1.when('bar', function(){ return 'baz' })
m1.when('baz', function(){ return 'qux' })
m1.when('qux', function(){ return 'foo' })

suite.add('Method (String)', function() {
  x = m1(nextItem())
})


// -- Method (Number)
var m2 = method(function(a){ return a })

m2.when(0, function(){ return 'bar' })
m2.when(1, function(){ return 'baz' })
m2.when(2, function(){ return 'qux' })
m2.when(3, function(){ return 'foo' })

suite.add('Method (Number)', function() {
  x = m2(nextIndex())
})


// -- Method (Mixed)
var m3 = method(function(a){ return a })

m3.when('foo', function(){ return 'bar' })
m3.when('bar', function(){ return 'baz' })
m3.when('baz', function(){ return 'qux' })
m3.when('qux', function(){ return 'foo' })
m3.when([''], function(){ })

suite.add('Method (Mixed)', function() {
  x = m3(nextItem())
})



// =====================================================================
module.exports = { name: 'Dispatching', code: suite }