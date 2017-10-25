'use strict'

const configPath = require('./configPath')
module.exports = function () {
  try {
    console.debug('loading config file')
    return require(configPath())
  } catch (e) {
    console.error('failed to load config file: %s', e.message)
    return {}
  }
}
