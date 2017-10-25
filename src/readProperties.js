'use strict'

const read = require('read')

module.exports = function readProperties (cb) {
  const record = {}
  loop()
  function loop () {
    console.debug('prompting for property name')
    read({prompt: 'Property name (none to end):'}, (err, prop) => {
      if (err) return cb(err)
      console.debug('user entered property name: `%s`', prop)
      if (prop.trim().length === 0) return cb(null, record)
      console.debug('prompting for property value')
      read({prompt: 'Value:'}, (err, val) => {
        if (err) return cb(err)
        console.debug('user entered property value: `%s`', val)
        record[prop] = val
        loop()
      })
    })
  }
}
