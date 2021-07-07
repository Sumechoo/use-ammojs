
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./use-ammojs.cjs.production.min.js')
} else {
  module.exports = require('./use-ammojs.cjs.development.js')
}
