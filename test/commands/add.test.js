'use strict'

const test = require('tap').test
const clear = require('clear-require')
const mockquire = require('mock-require')
const addModulePath = require.resolve('../../src/commands/add')

test('adds properties to config object', (t) => {
  t.plan(1)
  console.log = () => {}
  console.error = () => {}
  const config = {}
  const mockConfig = {
    add (id, val) {
      config[id] = val
    },

    save () {
      return Promise.resolve()
    }
  }

  clear(addModulePath)
  let counter = 0
  mockquire('read', (config, cb) => {
    counter += 1
    switch (counter) {
      case 1: // identifier
        cb(null, 'id')
        break
      case 2: // prop name
        cb(null, 'foo')
        break
      case 3: // prop val
        cb(null, 'foo_val')
        break
      case 4: // prop name
        cb(null, 'bar')
        break
      case 5: // prop val
        cb(null, 'bar_val')
        break
      case 6:
        cb(null, '')
    }
  })
  mockquire('../../src/config', mockConfig)

  const add = require(addModulePath)
  add()
  t.is(JSON.stringify(config), '{"id":{"foo":"foo_val","bar":"bar_val"}}')
})
