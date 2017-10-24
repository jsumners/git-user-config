'use strict'

module.exports = printUsage

function printUsage () {
  console.log(
        `git-user-config <command> [id]

commands:
  -l --list         list all user records
  -a --add          add a new user record for later use
  -u --update=<id>  update an existing record
  -r --remove=<id>  remove a user record from storage
  -s --set=<id>     configure current git repo with the given user record
  -g --global       set in global config instead of local (only effective with -s)`
    )
}
