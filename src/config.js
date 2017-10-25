'use strict'

const fs = require('fs')
const colorize = require('json-colorizer')
const configPath = require('./configPath')
const loadConfig = require('./loadConfig')

module.exports = {
  get: get,
  save,
  add,
  update,
  remove
}

const config = loadConfig()

function get () {
  return config
}

function save () {
  console.debug('saving config to file')
  return new Promise((resolve, reject) => {
    fs.writeFile(configPath(), JSON.stringify(config), (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

function add (id, record) {
  console.debug('adding record: %s', id)
  console.debug('record: %s', colorize(JSON.stringify(record)))
  if (config[id]) throw new Error(`Record "${id}" already exists.`)
  update(id, record)
}

function update (id, record) {
  console.debug('updating record: %s', id)
  console.debug('record: %s', colorize(JSON.stringify(record)))
  const _record = Object.assign({}, record)
  if (_record.id) delete _record.id
  config[id] = _record
}

function remove (id) {
  console.debug('removing record: %s', id)
  if (!config[id]) throw new Error(`Record "${id}" does not exist.`)
  delete config[id]
}
