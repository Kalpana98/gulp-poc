const Gulp = require('gulp');
const GulpSass = require('gulp-sass')(require('sass'));
const GulpUglify = require('gulp-uglify');
const GulpConcat = require('gulp-concat');

paths = {
	html: {
		src: 'src/*.html',
		dest: 'dist/',
	},
	styles: {
		src: 'src/styles/**/*.scss',
		dest: 'dist/styles/',
	},
	scripts: {
		src: 'src/scripts/**/*.js',
		dest: 'dist/scripts/',
	},
};

// Message to inform Gulp is running
function run(done) {
	console.log('Gulp is running...');
	done();
}

// Copy Html files to dist/
function buildHtml() {
	return Gulp.src(paths.html.src).pipe(Gulp.dest(paths.html.dest));
}

// Minify .scss files to .css and move to dist/
function buildCss() {
	return Gulp.src(paths.styles.src)
		.pipe(GulpSass().on('error', GulpSass.logError))
		.pipe(Gulp.dest(paths.styles.dest));
}

// Concatenate all Js files in a single main.js, minify, and move to dist/
function bundleJs() {
	return Gulp.src(paths.scripts.src, { sourcemaps: true })
		.pipe(GulpUglify())
		.pipe(GulpConcat('main.js'))
		.pipe(Gulp.dest(paths.scripts.dest));
}

// Watch mode
function watch() {
	Gulp.watch(paths.html.src, buildHtml);
	Gulp.watch(paths.styles.src, buildCss);
	Gulp.watch(paths.scripts.src, bundleJs);
}

// Mocking a bundler
const build = Gulp.series(run, Gulp.parallel(buildHtml, buildCss, bundleJs));

exports.watch = watch;
exports.default = build;
