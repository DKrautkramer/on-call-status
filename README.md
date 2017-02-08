# On Call Status SPA with Admin Features

Working [demo](https://dkrautkramer.github.io/on-call-status/)

## What is Does

This is a demo of an on-call SPA that does the following: 
- shows a list of active on call users
- shows a list of all users and allows toggling on call status
- allows editing, adding, removing users
- shows a list of departments
- allows adding and removing of departments

The demo uses local storage to get/set any changes to users or departments mainly for demo & local build purposes. 
A default data set will be assigned if no local storage exists.

## How it works

This SPA is using Vue.js.  
- vue-router to handling routing/component loading 
- vuex is used for state management 
- Webpack is used for running dev build with hot reloading as well as building minified production output files.
- ES6 is used because awesome

## Local Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

