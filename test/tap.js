var brofist  = require('brofist')
var reporter = require('brofist-tap')
var specs    = require('./specs')

brofist.run(specs, reporter())