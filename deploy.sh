#!/bin/bash

# PRODUCTION
chmod a+x deploy.sh
git checkout master
git reset --hard
git pull origin master
npm i
pm2 start process.config.js --env production

# DEVELOPMENT
# pm2 start process.config.js --env development


