% Mithril and Webpack
% Michael Hellein


# Why are we here?


## Some Context

We want to create modular and performant client-side applications, with a maximum of "just plain JavaScript" and a minimum of boilerplate.

## Webpack

Webpack is an opinionated module bundler for front-end assets. Like Browserify, it lets us treat local files as modules, concatenating intelligently.

```js
var something = require('./something.js');
```

## Mithril

Mithril is a lightweight client-side MVC framework. Like React, it has one-way data flows and a virtual DOM diffing.

```js
var m = require('mithril');
m.mount(document.body, { 
  view: function() { return m('p', 'Hello, world.') } 
});
```

## They Taste Great Together

Mithril does not have a module registry, because JavaScript already does: **require/import**. Webpack provides that until we're able to adopt ES2015 and HTTP/2.0.


# Webpack

## The Concept

![Modules -> Assets](http://webpack.github.io/assets/what-is-webpack.png)

## Ok, but we have a lot of ways to do this!

[Grunt](http://gruntjs.com/) / [Gulp](http://gulpjs.com/) / [Brunch](http://brunch.io/) / [RequireJS](http://requirejs.org/) / [Browserify](http://browserify.org/)

## We're Not Unique

> [If you need a cabin, why start
with a mere pile of logs?](https://medium.com/@housecor/browserify-vs-webpack-b3d7ca08a0a9) - Cory House

Convention > Configuration.

## ♥ tools that do the right thing

Webpack is like the best of Brunch (lightweight configuration) plus the best of Browserify (fluent dependency resolution).

## Let's get started

webpack.config.js
```js
module.exports = {
    entry: "./index",
    output: {
        path: __dirname,
        filename: "[name].bundle.js"
    }
};
```

## Install

```bash
npm install -g webpack webpack-dev-server
```

## Run it

```bash
webpack-dev-server
```

The dev server is one of the nice things webpack gives us - a server running on <http://localhost:8080/> that rebuilds bundles and live-reloads connected browsers.

## Terminology

**bundle**
: destination asset

**chunk**
: the content of the bundle

**loader**
: plugin responsible for processing files based on match patterns

> > Loaders are like what React calls "transforms".

## A tiny example

index.js
```js
require('./a');
```

a.js
```js
console.log('a here');
```

---

index.html
```html
<!doctype html>
<body>
    <script type="text/javascript" src="main.bundle.js"></script>
</body>
```

---

main.bundle.js
```js
/******/ (function(modules) { // webpackBootstrap
... ~243B min ...
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {
    __webpack_require__(1);
/***/ },
/* 1 */
/***/ function(module, exports) {
    console.log('a here');
/***/ }
/******/ ]);
```

## Require a node module

```bash
npm install immutable
```

```js
var Immutable = require('immutable');
```

Yep, just like Browserify...


## Let's use a loader

```bash
npm install raw-loader style-loader
```

webpack.config.js
```js
module.exports = {
    entry: "./index",
    output: {
        path: __dirname,
        filename: "[name].bundle.js"
    }
};
```

---

Now when we `require('./something.css');` we'll get those styles inlined into our JavaScript bundle.

---

### Loaders work with node modules too

```bash
npm install purecss
```

```js
require('purecss');
```

Because purecss has a CSS file as `main` in its `package.json`.

## Commons Chunk

added to webpack.config.js:
```js
var webpack = require('webpack');
...
   plugins: [new webpack.optimize.CommonsChunkPlugin('common.js');]
```

added to index.html:
```
  <script src="common.js"></script>
```

## Async bundle loading

```js
if (window.location.pathname === '/feed') {
  // this syntax is weird but it works
  require.ensure([], function() { 
    // this module is now synchronously available.
    require('./feed').show(); 
  });
}
```

> From Pete Hunt's [webpack-howto](https://github.com/petehunt/webpack-howto).

## Webpack helps us be modular


# Background Concepts

## Functional Programming

Functions don't have side effects. They return new values, leaving passed values unchanged.

## Immutable Data

Helps us be functional. Operations on immutable data structures don't have side effects, they return new structures.

## Virtual DOM

A data structure that mirrors the state of the actual DOM, so a renderer can quickly know what needs to be redrawn.

## One-way Data Flow

Don't listen for changes to values from the UI. Let the UI make updates to the Virtual DOM, which will be used to redraw the UI.

## Efficient Redraws

Updating the DOM is expensive! Batch operations that would change the DOM, at minimum within one animation frame.

## The Paradigm

React, Mithril, Om, and others use these concepts to make snappy applications that are easy to reason around.


# Mithril

## Let's Get Started

```bash
npm install mithril
```

index.js:
```js
var m = require('mithril');
```

## 



# References

##

<http://webpack.github.io/docs/>
<http://lhorie.github.io/mithril/index.html>
