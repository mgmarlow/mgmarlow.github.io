#!/bin/usr/env bash
ng build --prod
cp ./docs/index.html ./docs/404.html
