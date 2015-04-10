var cheerio = require('cheerio');
var child_process = require('child_process');
var fs = require('fs');
var gulp = require('gulp');


var presentation = 'gulp';


gulp.src(['!**/reveal.js/node_modules/**', '!**/reveal.js/test/**', 'node_modules/reveal.js/**'])
	.pipe(gulp.dest('present/reveal.js'));




function compile(done) {
	var output = 'present/'+presentation+'.html';
	child_process.exec('pandoc -t revealjs -s '+presentation+'.md -o '+output+' --css custom-night.css --slide-level 2', function(){
		var $ = cheerio.load(fs.readFileSync(output));

		// Because we're getting reveal from npm, we don't have .min.
		$('script[src]').each(function(){
			var src = $(this).attr('src');
			$(this).attr('src', src.replace('reveal.min.js', 'reveal.js'));
		});
		$('link[rel=stylesheet]').each(function(){
			var href = $(this).attr('href');
			$(this).attr('href', href.replace('reveal.min.css', 'reveal.css'));
		});

		// Magic speaker notes.
		$('blockquote > blockquote').each(function(){
			var content = $(this).html();
			var $note = $('<aside class="notes">').html(content);
			$(this).parent().replaceWith($note);
		});

		fs.writeFileSync(output, $.html());
		done();
	});
}

gulp.task('css', function(){
	return gulp.src('css/custom-night.css').pipe(gulp.dest('present'));
});

gulp.task('default', ['css'], compile);

gulp.task('watch', function(){
	gulp.watch('*.md', ['default']);
	gulp.watch('css/*', ['css'])
});
