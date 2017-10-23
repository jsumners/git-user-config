#!/usr/bin/env node

'use strict'

var printUsage = require('./src/printUsage')
var cli = require('./src/commandLineOptions')

let options
try {
  options = cli()
} catch (error) {
  console.error(error.message, '\n')
  printUsage()
}

command()(options)

function command () {
  if (!options) return () => {}
  if (options.add) return require('./src/commands/add')
  if (options.list) return require('./src/commands/list')
  if (options.update) return require('./src/commands/update')
  if (options.remove) return require('./src/commands/remove')
  if (options.set) return require('./src/commands/set')
}
