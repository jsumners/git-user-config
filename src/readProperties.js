'use strict'

const read = require('read')

module.exports = function readProperties (cb) {
  const record = {}
  loop()
  function loop () {
    read({prompt: 'Property name (none to end):'}, (err, prop) => {
      if (err) return cb(err)
      if (prop.trim().length === 0) return cb(null, record)
      read({prompt: 'Value:'}, (err, val) => {
        if (err) return cb(err)
        record[prop] = val
        loop()
      })
    })
  }
}
