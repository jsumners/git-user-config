'use strict'

module.exports = remove
const config = require('../config')

function remove (options) {
  try {
    config.remove(options.remove)
    config.save()
      .then(confirm, handleError)
  } catch (e) {
    console.error(e.message)
  }
}

function confirm () {
  console.log('\nrecord removed\n')
}

function handleError (error) {
  console.error(error.message)
}
