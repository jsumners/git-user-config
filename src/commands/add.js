'use strict'

module.exports = add

const config = require('../config')
const read = require('read')
const readProperties = require('../readProperties')

function add () {
  console.log('Add new user record\n')
  read({prompt: 'Identifier:'}, (err, id) => {
    if (err) return handleError(err)
    console.log('\nEnter property names like `user.email`')
    readProperties((err, record) => {
      if (err) return handleError(err)
      config.add(id, record)
      config.save()
        .then(confirm)
        .catch(handleError)
    })
  })
}

function confirm () {
  console.log('\nrecord saved')
}

function handleError (error) {
  console.error('\n' + error.message)
}
