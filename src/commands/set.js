'use strict'

const config = require('../config')
const exec = require('child_process').exec

module.exports = set

function set (options) {
  const id = options.set
  const obj = config.get()[id]
  if (!obj) throw Error(`Config for ${id} not specified`)

  Object.keys(obj).forEach((key) => {
    setValue(key, obj[key], options.global)
      .then(() => {})
      .catch(handleError)
  })
  confirm(obj)
}

function setValue (prop, val, setGlobal) {
  return new Promise((resolve, reject) => {
    const cmd = `git config ${setGlobal ? '--global' : '--local'} ${prop} '${val}'`
    const proc = exec(cmd)
    let stderr = ''
    proc.stderr.on('data', (d) => { stderr += d.toString() })
    proc.on('error', (err) => reject(err))
    proc.on('close', (code) => {
      if (code !== 0) return reject(Error(`Invalid result code (${code}):\n${stderr}`))
      resolve()
    })
  })
}

function confirm (configuration) {
  console.log('configuration applied:')
  console.log(JSON.stringify(configuration, null, 2))
}

function handleError (error) {
  console.error('\n' + error.message)
}
