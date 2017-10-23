'use strict'

const test = require('tap').test
const mockquire = require('mock-require')
const updateModulePath = require.resolve('../../src/commands/update')

test('updates properties to config object', (t) => {
  t.plan(1)
  console.log = () => {}
  console.error = () => {}
  const config = {
    id: {
      foo: 'foo_val',
      bar: 'bar_val'
    }
  }
  const mockConfig = {
    get () {
      return config
    },

    update (id, val) {
      config[id] = val
    },

    save () {
      return Promise.resolve()
    }
  }

  delete require.cache[updateModulePath]
  let counter = 0
  mockquire('read', (config, cb) => {
    counter += 1
    switch (counter) {
      case 1: // prop name
        cb(null, 'foo')
        break
      case 2: // prop val
        cb(null, 'new_foo')
        break
      case 3: // prop name
        cb(null, 'bar')
        break
      case 4: // prop val
        cb(null, '~del~')
        break
      case 5:
        cb(null, '')
    }
  })
  mockquire('../../src/config', mockConfig)

  const update = require(updateModulePath)
  update({update: 'id'})
  t.is(JSON.stringify(config), '{"id":{"foo":"new_foo"}}')
})
