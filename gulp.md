% Gulp
% ![](https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png)
% Scott Douglas and Michael Hellein


## What is Gulp?

A nodejs build system based on streams.

<div class="speaker-notes">
Test speaker note.
</div>


# Do we need another build system?

## Make

    jshint:
        jshint **.js

    $ make jshint

## npm run-script

    "dependencies": {
        "jshint": "2.6.3"
    }
    "scripts": {
        "jshint": "jshint **.js"
    }

    $ npm run-script jshint

## Grunt

    grunt.initConfig({
      jshint: {
        all: ['**.js']
      }
    });

    $ grunt jshint

## Gulp

    gulp.task('jshint', function() {
      return gulp.src('**.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    });

    $ gulp jshint

# Sometimes you need more

## Things

* extensibility
* functionality
* speed


# Gulp Parts

## How Gulp Works

> - Filesystem matcher (glob)
> - Virtual file objects (vinyl / vinylfs)
> - Readable stream (node streams)
> - Task sequencing (orchestrator)

See <https://medium.com/@contrahacks/gulp-3828e8126466>

## glob

![Match files with shell-like glob patterns.](https://github.com/isaacs/node-glob/raw/master/oh-my-glob.gif)

<https://github.com/isaacs/node-glob>

## vinyl

<https://github.com/wearefractal/vinyl>

## node streams

<https://nodejs.org/api/stream.html>

## orchestrator

"A module for sequencing and executing tasks and dependencies in maximum concurrency"

<https://github.com/orchestrator/orchestrator>


# Concepts

---

<script async class="speakerdeck-embed" data-slide="84" data-id="14273d704a650132ee711257f47f663a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<https://speakerdeck.com/addyosmani/front-end-tooling-workflows?slide=84>


# Cheat Sheet

---

![](https://raw.githubusercontent.com/osscafe/gulp-cheatsheet/master/images/en-js-p1.png)

<https://github.com/osscafe/gulp-cheatsheet>

---

![](https://raw.githubusercontent.com/osscafe/gulp-cheatsheet/master/images/en-js-p2.png)

<https://github.com/osscafe/gulp-cheatsheet>

# Extensions

## gulp-changed

Incremental builds

## Multiple dest concatenation



## chokidar

 - gulp.watch over a lot of files used the processor heavily and didn't prove reliable. 
 - chokidar uses native fsevents in OSX.

<https://github.com/paulmillr/chokidar>

---

    var watch = chokidar.watch('**.js')
    .on('ready', function(){
        watch.on('all', function(event, path){
            // Do stuff.
        });
    });


# Frustrations

## happy path or totally obfuscated
## streaming end (changed/concat)
## documentation
## didn't make things simpler

# Warning: Gulp 2.0