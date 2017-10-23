'use strict'

module.exports = update

const config = require('../config')
const readProperties = require('../readProperties')

function update (options) {
  console.log('Updating record\n')
  const id = options.update
  const record = config.get()[id]
  console.log(JSON.stringify(record, null, 2))

  console.log('\nEnter property names like `user.email`. Set to `~del~` to remove.')
  readProperties((err, newRecord) => {
    if (err) return handleError(err)
    const _newRecord = Object.assign({}, record, newRecord)
    Object.keys(_newRecord).forEach((key) => {
      if (_newRecord[key] === '~del~') delete _newRecord[key]
    })
    config.update(id, _newRecord)
    config.save()
      .then(confirm)
      .then(() => console.log(JSON.stringify(_newRecord, null, 2)))
      .catch(handleError)
  })
}

function confirm () {
  console.log('\nrecord updated')
}

function handleError (error) {
  console.error('\n' + error.message)
}
