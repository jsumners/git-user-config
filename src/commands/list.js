'use strict'

module.exports = list

const colorize = require('json-colorizer')
const config = require('../config')

function list () {
  console.log('Saved records:')
  const json = JSON.stringify(config.get(), null, 2)
  console.log(colorize(json))
}
