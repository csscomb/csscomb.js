rm -rf lib-cov && jscoverage lib lib-cov && TEST_COV=true node test/mocha > ./test/test-coverage.html
