'use strict'

module.exports = function () {
  const os = require('os')
  const path = require('path')
  const filePath = path.join(os.homedir(), '.git-user-config.json')
  console.debug('config file path: %s', filePath)
  return filePath
}
