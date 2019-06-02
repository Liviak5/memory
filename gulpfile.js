const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const panini = require('panini');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
/**
 * https://www.npmjs.com/package/gulp-clean
 */
gulp.task('cleanDist', () => gulp.src('dist', {read: false})
  .pipe(clean())
);

gulp.task('images', () => gulp.src('src/assets/img/**/*.*')
  .pipe(gulp.dest('dist/assets/img'))
  .pipe(browserSync.reload({stream: true}))
);

/**
 * www.npmjs.com/package/gulp-babel
 */
gulp.task('babelDev', () => gulp.src(['./src/assets/js/*.js'])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(browserSync.reload({stream: true}))
);

/**
 * www.npmjs.com/package/gulp-babel
 */
gulp.task('babelBuild', () => gulp.src(['./src/assets/js/*.js'])
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(concat('main.js'))
  .pipe(minify())
  .pipe(gulp.dest('dist/assets/js'))
);

/**
 * https://www.npmjs.com/package/gulp-sass
 * https://www.npmjs.com/package/gulp-sourcemaps
 * https://www.npmjs.com/package/gulp-autoprefixer
 */
gulp.task('sassDev', () => gulp.src('./src/assets/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20'],
    grid: true,
    cascade: false
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/assets/css'))
  .pipe(browserSync.reload({stream: true}))
)
;

gulp.task('sassBuild', () => gulp.src('./src/assets/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20'],
    grid: true,
    cascade: false
  }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('./dist/assets/css'))
);

/**
 * https://github.com/zurb/panini
 */
gulp.task('pagesDev', () => gulp.src('./src/pages/**/*.{html,hbs,handlebars}')
  .pipe(panini({
    root: 'src/pages/',
    layouts: 'src/layouts/',
    partials: 'src/partials/',
    data: 'src/data/',
    helpers: 'src/helpers/'
  }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({stream: true}))
);

/**
 * https://github.com/zurb/panini
 */
gulp.task('pagesBuild', () => gulp.src('./src/pages/**/*.{html,hbs,handlebars}')
  .pipe(panini({
    root: 'src/pages/',
    layouts: 'src/layouts/',
    partials: 'src/partials/',
    data: 'src/data/',
    helpers: 'src/helpers/'
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist'))
);

// Load updated HTML templates and partials into Panini
function resetPages (done) {
  panini.refresh();
  done();
}

/**
 * https://browsersync.io/docs/gulp
 */
gulp.task('browserSync', (done) => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  });
  done();
});

gulp.task('watch', () => {
  gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sassDev'));
  gulp.watch('./src/assets/img/**/*.*', gulp.series('images'));
  gulp.watch('./src/**/*.{html,hbs,handlebars}').on('all', gulp.series(resetPages, 'pagesDev'));
  gulp.watch('./src/assets/js/*.js', gulp.series('babelDev'));
});

gulp.task('build', gulp.series('cleanDist', 'images', 'sassBuild', 'babelBuild', 'pagesBuild'));

gulp.task('dev', gulp.series('cleanDist', 'images', 'sassDev', 'babelDev', 'pagesDev', 'browserSync', 'watch'));
