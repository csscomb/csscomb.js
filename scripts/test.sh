#!/bin/bash

EXIT_CODE=0

function test {
    "$@"
    if [ $? -ne 0 ]; then
        EXIT_CODE=1
    fi
}

# Run linters
printf "\n\
----------------\n\
 Running JSHint\n\
----------------\n\n"
test ./node_modules/.bin/jshint ./src

printf "\n\
--------------\n\
 Running JSCS\n\
--------------\n\n"
test ./node_modules/.bin/jscs ./src

# Run tests
printf "\n\
---------------\n\
 Running Mocha\n\
---------------\n\n"
test ./node_modules/.bin/babel-node ./test/mocha

if [ $EXIT_CODE -ne 0 ]; then
printf "\n\
----------------------------------------------------\n\
 Please, fix errors shown above and run tests again\n\
----------------------------------------------------\n"
else
printf "\n\
------------------------\n\
 Everything looks fine!\n\
------------------------\n"
fi

exit $EXIT_CODE
