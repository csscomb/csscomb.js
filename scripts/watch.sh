#!/bin/bash

printf "\n\
-----------------------\n\
 Watching source files\n\
-----------------------\n\n"

./node_modules/.bin/babel --loose all --watch src --out-dir lib
