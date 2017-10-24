'use strict'

const path = require('path')
const test = require('tap').test
const configModulePath = require.resolve('../src/config')
const clear = require('clear-require')
const mockquire = require('mock-require')

test('loads config', (t) => {
  t.plan(2)

  clear(configModulePath)
  mockquire('../src/configPath', () => path.join(__dirname, 'fixtures', 'sample-config.json'))

  const config = require(configModulePath)
  t.ok(config.get().foo)
  t.deepEqual(config.get().foo, {name: 'foo', email: 'foo@example.com'})

  mockquire.stopAll()
})

test('adds new record', (t) => {
  t.plan(4)

  clear(configModulePath)
  mockquire('../src/configPath', () => '')
  mockquire('../src/loadConfig', () => { return {} })

  const config = require(configModulePath)
  t.deepEqual(config.get(), {})

  config.add('foo', {bar: 'bar'})
  t.ok(config.get().foo)
  t.ok(config.get().foo.bar)
  t.is(config.get().foo.bar, 'bar')

  mockquire.stopAll()
})

test('add rejects existing id', (t) => {
  t.plan(1)

  clear(configModulePath)
  mockquire('../src/configPath', () => '')
  mockquire('../src/loadConfig', () => { return {foo: {bar: 'bar'}} })

  const config = require(configModulePath)
  t.throws(() => config.add('foo', {baz: 'baz'}), /already exists/)

  mockquire.stopAll()
})

test('removes records', (t) => {
  t.plan(2)

  clear(configModulePath)
  mockquire('../src/configPath', () => '')
  mockquire('../src/loadConfig', () => { return {foo: {bar: 'bar'}} })

  const config = require(configModulePath)
  t.deepEqual(config.get(), {foo: {bar: 'bar'}})

  config.remove('foo')
  t.deepEqual(config.get(), {})

  mockquire.stopAll()
})

test('rejects removing unknown records', (t) => {
  t.plan(1)

  clear(configModulePath)
  mockquire('../src/configPath', () => '')
  mockquire('../src/loadConfig', () => { return {} })

  const config = require(configModulePath)
  t.throws(() => config.remove('foo'), /does not exist/)

  mockquire.stopAll()
})

test('save serializes to JSON', (t) => {
  t.plan(1)

  clear(configModulePath)
  mockquire('../src/configPath', () => '')
  mockquire('../src/loadConfig', () => { return {} })
  mockquire('fs', {writeFile: (dest, data, cb) => {
    t.is(data, '{"foo":{"bar":"bar"}}')
  }})

  const config = require(configModulePath)
  config.add('foo', {bar: 'bar'})
  config.save()

  setImmediate(() => mockquire.stopAll())
})
