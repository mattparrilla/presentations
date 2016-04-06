var cheerio = require('cheerio');
var child_process = require('child_process');
var debug = require('gulp-debug');
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var through = require('through2');


var presentation = 'gulp';


function pandoc(file, enc, cb) {
    child_process.exec('pandoc -t revealjs -s '+file.path+' --css css/custom-night.css --slide-level 2', function(error, stdout, stderr){
        // Override dependencies. Gross!
        stdout = stdout.replace(/dependencies: \[[^\]]+\]/, "dependencies: [{ src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.17/socket.io.js', async: true }, { src: 'reveal.js/plugin/notes-server/client.js', async: true }]");

        // Use CDN for reveal.js.
        stdout = stdout.replace(new RegExp('reveal.js/', 'g'), 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.0.0/');

        var $ = cheerio.load(stdout);

        // Add highlight.js.
        $('script[src]')
            .last()
            .after('<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/highlight.min.js"></script><script>hljs.initHighlightingOnLoad();</script>');
        $('link[rel=stylesheet]')
            .last()
            .after('<link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/styles/railscasts.min.css" rel="stylesheet" />');


        // super brittle grossness, just making it work
        var filename = file.history[0].split('source/')[1].split('.md')[0];
        $('body').addClass(filename);

        // Magic speaker notes.
        $('blockquote > blockquote').each(function(){
            var content = $(this).html();
            var $note = $('<aside class="notes">').html(content);
            $(this).parent().replaceWith($note);
        });

        file.contents = new Buffer($.html());
        cb(null, file);
    });
}

function compile(done) {
    return gulp.src('source/*.md')
        .pipe(through.obj(pandoc))
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest('./'))
        .pipe(debug({title: 'Compiled'}));
}

gulp.task('css', function(){
    return gulp.src('css/*').pipe(gulp.dest('present/css'));
});

gulp.task('images', function(){
    return gulp.src('source/**/*.png').pipe(gulp.dest('present'));
});

gulp.task('default', ['css', 'images'], compile);

gulp.task('watch', function(){
    gulp.watch('source/*.md', ['default']);
    gulp.watch('css/*', ['css'])
});
