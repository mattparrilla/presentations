% Gulp
% ![](https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png)
% Scott Douglas and Michael Hellein


- cheat sheet

- https://speakerdeck.com/addyosmani/front-end-tooling-workflows

- frustrations
-- happy path or totally obfuscated
-- streaming end
-- documentation
-- didn't make things simpler

- warning: gulp 2.0

- addy osmani grunt vs gulp
-- configuration vs code


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

