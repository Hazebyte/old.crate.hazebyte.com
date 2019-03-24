const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const deploy      = require('gulp-gh-pages');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()))

// Move the javascript files into our /src/js folder
gulp.task('js', () => gulp.src(['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream()))

gulp.task('html', () => gulp.src(['src/**.html'])
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream()))

gulp.task('asset', () => gulp.src(['src/assets/*'])
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.stream()))

// Static Server + watching scss/html files
gulp.task('serve', ['html', 'asset', 'sass'], () => {
    browserSync.init({
        server: './dist'
    })

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass'])
    gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('deploy', ['html', 'asset', 'sass'], () => gulp.src("./dist/**/*")
    .pipe(deploy())
)

gulp.task('default', ['js', 'serve'])
