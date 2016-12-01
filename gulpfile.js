/**
 * Created by Dennis Espinoza on 10/04/16.
 */


var gulp       = require('gulp');
var gutil       = require('gulp-util');
var chalk       = require('chalk');
var fs         = require('fs');
var browserify = require('browserify');
var watchify   = require('watchify');
var source     = require("vinyl-source-stream");
var babelify    = require('babelify');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var babel       = require("gulp-babel");
var buffer      = require('vinyl-buffer'); // Vinyl stream support
var rename      = require('gulp-rename'); // Rename sources
var notify      = require('gulp-notify'); // Provides notification to both the console and Growel


gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    })
});


var files = [
    {
        input      : ['./app/js/UsersForms.js'],
        output     : 'UsersFormsBuilt.js',
        destination: './app/js/dist'
    }
];

var Defer = function(max, callback) {
    this.max = max;
    this.count = 0;
    this.callback = callback;

    this.exec = function() {
        if (this.max === ++this.count) {
            this.callback();
        }
    };
};

function mapError(err) {
    if (err.fileName) {
        gutil.log(chalk.red(err.name)
            + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
            + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
            + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
            + ': ' + chalk.blue(err.description));
    } else {
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.message));
    }

}

var bundle = function(bundler, options) {
    startTime = new Date().getTime();
    return bundler.bundle()
        .on('error', mapError)
        .pipe(source('main.jsx'))
        .pipe(buffer())
        .pipe(rename(options.output))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(options.destination))
        .pipe(notify({
            message: 'Generated file: <%= file.relative %>'
        }))
        .pipe(browserSync.stream())
        .on('end', function () {
            time = (new Date().getTime() - startTime) / 1000;
            console.log(options.output + ' was browserified: ' + time + 's');
        });
};

var createBundleProp = function(b, options) {
    var bundler = b;

    var i = 0;
    for (i; i < options.input.length; i++) {
        if (options.require) {
            bundler.require(options.input[i].require, {
                expose: options.input[i].expose
            });
        } else {
            bundler.add(options.input[i]);
        }
    };

    return bundler;
};

var createBundle = function(options, d) {
    var bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: false,
        debug: true
    })
    .transform(babelify, {presets: ['es2015', 'react'], plugins :  ["transform-object-rest-spread"]});

    bundler = createBundleProp(bundler, options);
    bundler = watchify(bundler);
    bundler.on('update', function () {
        bundle(bundler, options);
    });

    return bundle(bundler, options);
};

gulp.task("babel", function () {
    return gulp.src("app/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', function (err) {
            gutil.log(gutil.colors.red(err.message));
            browserSync.notify("Babel Error!");
            this.emit('end');
        })
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

var createBundles = function(bundles, defer) {
    bundles.forEach(function (bundle) {
        createBundle(bundle).on('end', function () {
            defer.exec();
        });
    });
};

// copy styles of each component to dist
gulp.task('copy-styles', function () {
    return gulp.src(['src/**/*.*css'], {base: './src/'})
        .pipe(gulp.dest('scss/'))
        .pipe(browserSync.stream());
});

// configure the sass task
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync'], function () {
    // gulp.watch('src/**/*.*css', ['copy-styles']);
    gulp.watch(['app/scss/**/*.scss'], ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('browserify', function (done) {
    var d = new Defer(files.length, done);
    createBundles(files, d);
});


gulp.task('default', ['watch', 'browser-sync'/*, 'babel', 'copy-styles'*/, 'sass', 'browserify']);