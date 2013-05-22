var brofist  = require('brofist')
var reporter = require('brofist-minimal')
var specs    = require('./specs')

brofist.run(specs, reporter()).then(function(results) {
  if (results.failed.length)  process.exit(1)
})