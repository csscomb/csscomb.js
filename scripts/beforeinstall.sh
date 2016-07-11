git clone https://github.com/tonyganch/gonzales-pe.git
cd gonzales-pe && git checkout dev && npm i && npm run build && npm link && cd ..
git clone https://github.com/csscomb/core.git csscomb-core
cd csscomb-core && git checkout dev && npm link gonzales-pe && npm i && npm run build && npm link && cd ..
npm link gonzales-pe
npm link csscomb-core
