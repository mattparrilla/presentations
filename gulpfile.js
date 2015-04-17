var cheerio = require('cheerio');
var child_process = require('child_process');
var debug = require('gulp-debug');
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var through = require('through2');


var presentation = 'gulp';


gulp.src(['!**/reveal.js/node_modules/**', '!**/reveal.js/test/**', 'node_modules/reveal.js/**'])
	.pipe(gulp.dest('present/reveal.js'));


function pandoc(file, enc, cb) {
	child_process.exec('pandoc -t revealjs -s '+file.path+' --css custom-night.css --slide-level 2', function(error, stdout, stderr){
		var $ = cheerio.load(stdout);

		// Because we're getting reveal from npm, we don't have .min.
		$('script[src]').each(function(){
			var src = $(this).attr('src');
			$(this)
				.attr('src', src.replace('reveal.min.js', 'reveal.js'))
				.after('<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/highlight.min.js"></script><script>hljs.initHighlightingOnLoad();</script>');
		});
		$('link[rel=stylesheet]').each(function(){
			var href = $(this).attr('href');
			$(this)
				.attr('href', href.replace('reveal.min.css', 'reveal.css'))
				.after('<link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/styles/railscasts.min.css" rel="stylesheet" />');
		});

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
		.pipe(gulp.dest('present'))
		.pipe(debug({title: 'Compiled'}));
}

gulp.task('css', function(){
	return gulp.src('css/*').pipe(gulp.dest('present'));
});

gulp.task('images', function(){
	return gulp.src('source/*.(png|jpg|gif)').pipe(gulp.dest('present'));
});

gulp.task('default', ['css', 'images'], compile);

gulp.task('watch', function(){
	gulp.watch('source/*.md', ['default']);
	gulp.watch('css/*', ['css'])
});
