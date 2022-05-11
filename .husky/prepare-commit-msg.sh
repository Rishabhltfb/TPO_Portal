#!/bin/sh

if [ "$LEFTHOOK" = "0" ]; then
  exit 0
fi

if [ -t 1 ] ; then
  exec < /dev/tty ; # <- enables interactive shell
fi

dir="$(git rev-parse --show-toplevel)"

call_lefthook()
{
  if lefthook -h >/dev/null 2>&1
  then
    eval lefthook $@
  elif test -f "$dir/node_modules/@arkweid/lefthook/bin/lefthook"
  then
    eval "$dir/node_modules/@arkweid/lefthook/bin/lefthook $@"
  elif bundle exec lefthook -h >/dev/null 2>&1
  then
    bundle exec lefthook $@
  elif npx @arkweid/lefthook -h >/dev/null 2>&1
  then
    npx @arkweid/lefthook $@
  elif yarn lefthook -h >/dev/null 2>&1
  then
    yarn lefthook $@
  else
    echo "Can't find lefthook in PATH"
  fi
}

# lefthook_version: a25d332481a8bb43fe436eb390e6e4c1

call_lefthook "install"

call_lefthook "run prepare-commit-msg $@"
