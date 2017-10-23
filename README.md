Do you use different user names and/or email for your github projects, work
projects, private personal projects?

Then you use ``git config`` a lot.

With ``git-user-config`` you can save these different users globally and
configure a new repo with a single command using record identifiers.
No more misspelled email addresses and user names...

# Install

`npm install -g git-user-config`

# Add User record for later use

`git-user-config --add`

Then follow instructions

```sh
Add new user record

Identifier: personal

Enter property names like `user.email`
Property name (none to end): user.name
Value: Joe Schmo
Property name (none to end): user.email
Value: joe@example.com
Property name (none to end):

record saved
```

# Configure git repo to use user record

`git-user-config --set user1`

This will call `git config --local` for each property of the `user1`
configuration.

````
$ git config -l | grep user
user.name=user 1
user.email=user_1@domain.com
````

# List all user records

    git-user-config --list

````
{
  "user1": {
    "user.name": "user 1",
    "user.email": "user_1@domain.com"
  },
  "user2": {
    "user.name": "user 2",
    "user.email": "user_2@domain.com"
  }
}
````

# Update a user record

`git-user-config --update user1`

This will interactively allow updating of the `user1` record. The process
works the same as `--add user1`. Any existing properties specified will be
overwritten, or removed if the new value is `~del~`, and new properties will
be merged in.

# Remove a user record

`git-user-config --remove user1`
