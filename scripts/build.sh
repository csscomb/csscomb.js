#!/bin/bash

printf "\n\
-----------------------\n\
 Building source files\n\
-----------------------\n\n"
./node_modules/.bin/babel --plugins @babel/plugin-transform-destructuring --loose all src --out-dir lib
