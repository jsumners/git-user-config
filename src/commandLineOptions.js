'use strict'

module.exports = commandLineOptions

function commandLineOptions () {
  const argv = require('minimist')(process.argv.slice(2))

  const config = {
    list: argv.l || argv.list,
    add: argv.a || argv.add,
    update: argv.u || argv.update,
    remove: argv.r || argv.remove,
    set: argv.s || argv.set,
    global: argv.g || argv.global
  }

  requireOptionSanity(config)

  return config
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
