'use strict'

const EventEmmitter = require('events')

const test = require('tap').test
const clear = require('clear-require')
const mockquire = require('mock-require')
const configModulePath = require.resolve('../../src/config')
const setModulePath = require.resolve('../../src/commands/set')

console.log = () => {}
console.error = console.log

test('issues `git config --local` commands for config', (t) => {
  t.plan(2)

  clear(configModulePath)
  clear(setModulePath)
  mockquire(configModulePath, {
    get () {
      return {
        foo: {
          'user.email': 'foo@example.com',
          'user.name': 'foo bar'
        }
      }
    }
  })

  let counter = 0
  const expectedCommands = [
    `git config --local user.email 'foo@example.com'`,
    `git config --local user.name 'foo bar'`
  ]

  const childProcess = Object.create(EventEmmitter.prototype)
  childProcess.exec = function (command) {
    t.is(expectedCommands.includes(command), true)
    counter += 1
    if (counter >= 1) childProcess.emit('close', 0)
    return childProcess
  }
  mockquire('child_process', childProcess)

  const set = require('../../src/commands/set')
  set({set: 'foo'})

  mockquire.stopAll()
})

test('issues `git config --global` commands for config', (t) => {
  t.plan(2)

  clear(configModulePath)
  clear(setModulePath)
  mockquire(configModulePath, {
    get () {
      return {
        foo: {
          'user.email': 'foo@example.com',
          'user.name': 'foo bar'
        }
      }
    }
  })

  let counter = 0
  const expectedCommands = [
    `git config --global user.email 'foo@example.com'`,
    `git config --global user.name 'foo bar'`
  ]

  const childProcess = Object.create(EventEmmitter.prototype)
  childProcess.exec = function (command) {
    t.is(expectedCommands.includes(command), true)
    counter += 1
    if (counter >= 1) childProcess.emit('close', 0)
    return childProcess
  }
  mockquire('child_process', childProcess)

  const set = require('../../src/commands/set')
  set({set: 'foo', global: true})

  mockquire.stopAll()
})
