#!/usr/bin/env node

'use strict'

require('consoleplusplus')
console.disableTimestamp()
console.setLevel(console.LEVELS.INFO)

const colorize = require('json-colorizer')
const printUsage = require('./src/printUsage')
const cli = require('./src/commandLineOptions')

try {
  const options = cli()
  if (options.debug) console.setLevel(console.LEVELS.DEBUG)
  console.debug('cli options: %s', colorize(JSON.stringify(options)))
  command(options)(options)
} catch (error) {
  console.error(error.message)
  printUsage()
}

function command (options) {
  if (!options) return () => {}
  if (options.add) return require('./src/commands/add')
  if (options.list) return require('./src/commands/list')
  if (options.update) return require('./src/commands/update')
  if (options.remove) return require('./src/commands/remove')
  if (options.set) return require('./src/commands/set')
}
