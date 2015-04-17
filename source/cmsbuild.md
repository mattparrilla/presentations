% cmsbuild
% A web asset management tool for Dealer.com's CMS, with an unfortunate name
% Michael Hellein


# Problems

## Many requests

Connection and header overhead slows page loads

## Separation of concerns

When a widget.js is 2018 lines it's not maintainable

## Unhealthy test culture

We don't write or maintain tests for the front-end.


# Approach

## Src -> Dest

Map of source assets -> Destination files

## Opinionated

The opinions of how to process files are baked in, but granular control of which files to process is in the hands of the developer.

## Example

`cmsbuild.js`

```js
module.exports = {
    module_name: 'payment-dealertrack',
    js: {
        'widget.min.js': ['app/app.js', 'app/**/*.js', 'templates.js']
    },
    html: {
        'templates.js': ['templates/*.html']
    }
};
```

# History

## Brunch

```coffee
exports.config =
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
    templates:
      joinTo: 'javascripts/app.js'
```

<http://brunch.io/>

## Toxie

<https://github.dev.dealertrack.com/DT-UX-Team/toxie>

## Kia Canada Build and Price

Angular app, faced the separation of concerns problem.


# Configuration

## Gulp

cmsbuild was built for Grunt, and was ported to Gulp with the rest of cms-web

The code lives in cms-web: `htdocs/v9/build/lib/cmsbuild/`

## Registry

`htdocs/v9/build/lib/cmsbuild/registry.js`

```js
module.exports = [
    '../widgets/build-and-price/default/v1',
    '../widgets/calculator/payment-dealertrack/v2'
];
```

## Concatenation

-> `widget.min.js`

```js
    js: {
        'widget.min.js': ['app/app.js', 'app/**/*.js']
    }
```

## Templates

-> `templates.js`

```js
    html: {
        'templates.js': ['templates/*.html']
    }
```

Currently only populates the Angular `$templateCache`.

## Karma

```js
    karma: [
       // Load our application js as configured.
       '@js',
       // Load mocks and the tests.
       './test/mock/*.js',
       './test/**/*Spec.js',
    ]
```

<http://karma-runner.github.io/0.12/index.html>

## Yuidoc

```js
    doc: [
        // Use our application js as configured, without html templates.
        '@js', '-html'
    ]
```

**Currently not in package.json because of its prohibitive size!**

<http://yui.github.io/yuidoc/>


# Usage

## Build

`cms-web-build build -p widgets/calculator/payment-dealertrack/v2`

```
[13:59:41] Using gulpfile ~/git/cms-web/htdocs/v9/build/gulpfile.js
[13:59:41] Starting 'cmsbuild-html:widgets/calculator/payment-dealertrack/v2'...
[13:59:41] Wrote html to ../../dist/v9/widgets/calculator/payment-dealertrack/v2/dist/templates.js
[13:59:41] Wrote html to 1 items
[13:59:41] Finished 'cmsbuild-html:widgets/calculator/payment-dealertrack/v2' after 49 ms
[13:59:41] Starting 'cmsbuild-js:widgets/calculator/payment-dealertrack/v2'...
[13:59:41] Wrote js to ../../dist/v9/widgets/calculator/payment-dealertrack/v2/dist/widget.min.js
[13:59:41] Wrote js to 1 items
...
```

## Watch

`cms-web-build watch -p widgets/calculator/payment-dealertrack/v2`

```
...
[14:01:05] cmsbuild widgets/calculator/payment-dealertrack/v2 watch running
[15:09:16] Detected /Users/ddcmichaelhellein/git/cms-web/htdocs/v9/widgets/calculator/payment-dealertrack/v2/app/EventService.js change
[15:09:16] Starting 'cmsbuild-html:widgets/calculator/payment-dealertrack/v2'...
[15:09:16] Finished 'cmsbuild-html:widgets/calculator/payment-dealertrack/v2' after 4.62 ms
[15:09:16] Starting 'cmsbuild-js:widgets/calculator/payment-dealertrack/v2'...
[15:09:16] Wrote js to ../../dist/v9/widgets/calculator/payment-dealertrack/v2/dist/widget.min.js
[15:09:16] Wrote js to 1 items
...
```

# Future

## Refactor

The code is ugly and hard to follow after the port from Grunt to Gulp.

## Improve

Determine what we want from Karma and Yuidoc (or its successor).

## Feedback

Use it and find out what needs work.

# Thanks!
