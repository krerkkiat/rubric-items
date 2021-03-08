#!/usr/bin/env bash
set -euo pipefail

cp src-client/*.html dist/
cp appsscript.json dist/
cp .claspignore dist/
cp .clasp.json dist/
sed -i -e '/marker-replace-with-compiled-js/r ./dist/ClientCode.js' ./dist/JavaScript.html
sed -i 's/marker-replace-with-compiled-js//' ./dist/JavaScript.html
