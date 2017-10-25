'use strict'

module.exports = commandLineOptions

function commandLineOptions () {
  const argv = require('minimist')(process.argv.slice(2), {
    alias: {
      list: ['l'],
      add: ['a'],
      update: ['u'],
      remove: ['r'],
      set: ['s'],
      global: ['g'],
      debug: ['d']
    },
    default: {
      list: false,
      add: false,
      update: undefined,
      remote: undefined,
      set: undefined,
      global: false,
      debug: false
    }
  })

  requireOptionSanity(argv)

  return argv
}

function requireOptionSanity (config) {
  requireExactlyOneCommandSet(config)
  requireIdForOption(config, 'update')
  requireIdForOption(config, 'remove')
  requireIdForOption(config, 'set')
}

function requireExactlyOneCommandSet (config) {
  let commandFound = false
  const commands = [
    'list',
    'add',
    'update',
    'remove',
    'set'
  ]

  commands.forEach((command) => {
    if (commandFound && config[command]) throw new Error('Please specify only one command')
    if (config[command]) commandFound = true
  })

  if (!commandFound) throw new Error('No command specified!')
}

function requireIdForOption (config, command) {
  if (config[command] && config[command] === true) throw new Error(`command ${command} requires an id`)
}
