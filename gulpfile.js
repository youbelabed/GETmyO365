const Gulp = require('gulp');
const Sass = require('gulp-sass');
const PostCSS = require('gulp-postcss');
const CSSNext = require('postcss-cssnext');
const CleanCSS = require('gulp-clean-css');
const Concat = require('gulp-concat');
const Uglify = require('gulp-uglify');
const BrowserSync = require('browser-sync').create();

Gulp.task('sass', () => Gulp.src('./scss/main.scss')
  .pipe(Sass().on('error', Sass.logError))
  .pipe(PostCSS([ CSSNext() ]))
  .pipe(Concat('style.css'))
  .pipe(CleanCSS({ compatibility: 'ie10' }))
  .pipe(Gulp.dest('./public'))
  .pipe(BrowserSync.stream())
);

Gulp.task('js', () => Gulp.src([
  // Example to add dependencies from npm:
  // require.resolve('lodash'),
  require.resolve('jquery'),
  './js/**/*.js',
])
  .pipe(Concat('bundle.js'))
  .pipe(Uglify())
  .pipe(Gulp.dest('./public'))
  .pipe(BrowserSync.stream())
);

Gulp.task('browser-sync', () => BrowserSync.init({
  server: { baseDir: 'public' },
  ghostMode: false
}));

Gulp.task('noop', () => undefined);

Gulp.task('default', ['js', 'sass', 'browser-sync'], () => {
  Gulp.watch('./scss/**/*.scss', ['sass']);
  Gulp.watch('./public/**/*.html', ['noop']).on('change', BrowserSync.reload);
  Gulp.watch('./js/**/*.js', ['js']);
});
