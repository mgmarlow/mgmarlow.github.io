#!/bin/usr/env bash
ng build --prod --base-href docs/
mv ./docs/index.html index.html
cp ./index.html ./404.html

