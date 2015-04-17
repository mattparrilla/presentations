% A Sip O' Gulp
% ![](https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png)
% Michael Hellein


## What is Gulp?

A Node.js build system based on streams.


>> Test speaker note.


# Do we need another build system?

## Make

    jshint:
        jshint **.js

=>

    $ make jshint

## npm run-script

    "dependencies": {
        "jshint": "2.6.3"
    }
    "scripts": {
        "jshint": "jshint **.js"
    }

=>

    $ npm run-script jshint

## Grunt

    grunt.initConfig({
      jshint: {
        all: ['**.js']
      }
    });

=>

    $ grunt jshint

## Gulp

    gulp.task('jshint', function() {
      return gulp.src('**.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    });

=>

    $ gulp jshint

# Does the complexity pay off?

## Reasons for Gulp

> * functionality
> * extensibility
> * speed
> * code over configuration


# Basics

---

<script async class="speakerdeck-embed" data-slide="84" data-id="14273d704a650132ee711257f47f663a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<https://speakerdeck.com/addyosmani/front-end-tooling-workflows?slide=84>


## Flow

    var gulp = require('gulp');
    var debug = require('debug');

    gulp.task('css', function(){
        return gulp.src('./src/*.css')
            .pipe(debug())
            .pipe(gulp.dest('./dist/'));
    });

=>

    $ gulp css


# Gulp Parts

## How Gulp Works

> - Filesystem matcher (glob)
> - Virtual file objects (vinyl / vinyl-fs)
> - Readable stream (node streams)
> - Task sequencing (orchestrator)

See <https://medium.com/@contrahacks/gulp-3828e8126466>

## glob

![Match files with shell-like glob patterns.](https://github.com/isaacs/node-glob/raw/master/oh-my-glob.gif)

<https://github.com/isaacs/node-glob>

## vinyl

<https://github.com/wearefractal/vinyl>

## Node.js streams

<https://nodejs.org/api/stream.html>

## orchestrator

"A module for sequencing and executing tasks and dependencies in maximum concurrency"

<https://github.com/orchestrator/orchestrator>

## Then, plugins

Gulp is realtively simple. The work is done by the plugins that transform the objects in the stream.


# Cheat Sheet

---

![](https://raw.githubusercontent.com/osscafe/gulp-cheatsheet/master/images/en-js-p1.png)

<https://github.com/osscafe/gulp-cheatsheet>

---

![](https://raw.githubusercontent.com/osscafe/gulp-cheatsheet/master/images/en-js-p2.png)

<https://github.com/osscafe/gulp-cheatsheet>

## Just Node.js streams

Because gulp.src() returns a Node.js transform stream, so ordinary stream utilities don't need to be customized "for Gulp".


# Extensions

## gulp-changed

Incremental builds by passing through only files with newer modified times

<https://github.com/sindresorhus/gulp-changed>

---

    var gulp = require('gulp');
    var changed = require('gulp-changed');
    var uglify = require('gulp-uglify');

    gulp.task('js', function(){
        return gulp.src('./src/*.js')
            .pipe(changed('./dist/'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/'));
    });


## Changes in dependencies


## Multiple destinations

Concatenation: N destinations with N * M sources

---

    var concat = require('gulp-concat');
    var merge = require('merge-stream');
    ...

    var files = {'a.js': 'a/*.js', 'b.js': 'b/*.js'};
    var streams = _.map(files, function (sources, dest) {
        return gulp.src(sources)
            .pipe(concat(dest));
    });

    merge.apply(this, streams)
        .pipe(minify())
        .pipe(gulp.dest('./dist/'));


## chokidar

 - gulp.watch over a lot of files used the processor heavily and didn't prove reliable. 
 - chokidar uses native fsevents in OSX.
 - downside: can't just specify a task name to exectute

<https://github.com/paulmillr/chokidar>

---

    var watch = chokidar.watch('**.js')
    .on('ready', function(){
        watch.on('all', function(event, path){
            // Do stuff.
        });
    });


# Frustrations

## Documentation

Because gulp is a wrapper around other libraries, it's sometimes hard to know where to look for documentation.

## My way -> Highway

Once you're off the happy path, you can be totally in the weeds.

## Other Streams

Mixing in other streams (like a simple transform stream from [through2](https://github.com/rvagg/through2)) seemed like a good idea, until it didn't produce the events Gulp expected.

We ended up using `gulp.src([])` as an empty stream that would still fire 'end' events, allowing subsequent tasks to execute.

## Not simpler

We expected code over configuration to make our build easier to reason around, but it didn't.

On the other hand, parallel task processing has made the build faster.

## Gulp 2.0

Fundamental changes are planned in Gulp 2.0. 

It looks like Gulp will be better as a result, but there'll be some pain in the transition.


# Conclusions from cms-web

## ♥ JavaScript

Gulp brought more build logic into JavaScript and out of the object literals of Grunt configuration.

The just-JavaScript philosphical bias of Gulp, supported by its statelessness, encouraged us to organize our code in modules with clear separation of concerns.

## Complexity

The added complexity has increased control and performance.

If we'd designed a completely new system, we could have kept the complexity down a lot. Much of our complexity is an artifact of keeping parity with the pre-existing Grunt build.

## Vote: Yes

---

This presentation was made with Gulp.

_Plus Markdown, Pandoc, Reveal.js, and GitHub Pages_
