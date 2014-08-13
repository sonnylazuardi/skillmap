var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.sass = require('gulp-ruby-sass');
plugins.ngAnnotate = require('gulp-ng-annotate');

var runSequence = require('run-sequence');
// var browserSync = require('browser-sync');


// VARIABLES ======================================================
var isDist = plugins.util.env.type === 'dist';
var outputFolder = isDist ? 'dist' : 'build';

var globs = {
    css: 'src/style/**/*.css',
    sass: 'src/style/**/*.scss',
    templates: 'src/templates/**/*.html',
    assets: 'src/assets/**/*.*',
    app: 'src/app/**/*.js',
    appWithDefinitions: 'src/**/*.js',
    integration: 'src/tests/integration/**/*.js',
    index: 'src/index.html'
};

var destinations = {
    css: "" + outputFolder + "/style",
    js: "" + outputFolder + "/src",
    libs: "" + outputFolder + "/vendor",
    assets: "" + outputFolder + "/assets",
    index: "" + outputFolder,
    laravelIndex: "../app/views"
};

// When adding a 3rd party we want to insert in the html, add it to
// vendoredLibs, order matters
// Find out why uglifying angular doesn't work
var vendoredLibs = [
    'vendor/jquery.js',
    'vendor/angular.js',
    'vendor/ui-router.js',
    'vendor/lodash.js',
    'vendor/restangular.js',
    'vendor/angular-resource.js',
    'vendor/angular-sanitize.js',
];

var injectLibsPaths = [];

vendoredLibs.forEach(function(lib) {
    injectLibsPaths.push(destinations.libs + '/' + lib.split('/')[1]);
});

var injectPaths = injectLibsPaths.concat([
    isDist? destinations.js + '/app.js' : destinations.js + "/app/**/*.js",
    destinations.js + "/templates.js",
    destinations.css + "/*.css"
]);

// var karma = require('gulp-karma')({
//     configFile: 'karma.conf.js'
// });

// TASKS ===========================================================

gulp.task('css', function () {
    return gulp.src(globs.css)
        .pipe(gulp.dest(destinations.css));
});

gulp.task('sass', function () {
    return gulp.src(globs.sass)
        .pipe(plugins.sass({style: isDist ? 'compressed' : 'nested'}))
        .pipe(gulp.dest(destinations.css));
});

gulp.task('laravel-index', function () {
    var target = gulp.src(globs.index);
    return target.pipe(
        plugins.inject(gulp.src(injectPaths, {read: false}), {
            // ignorePath: outputFolder,
            addRootSlash: false
        })
    ).pipe(plugins.rename("index.php"))
    .pipe(gulp.dest(destinations.laravelIndex));
});

gulp.task('js-hint', function () {
    return gulp.src(globs.app)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

// var tsProject = plugins.type.createProject({
//     declarationFiles: true,
//     noExternalResolve: true
// });

gulp.task('js-compile', function () {
    // var tsResult = gulp.src(globs.appWithDefinitions)
    //     .pipe(plugins.type(tsProject));

    // return tsResult.js.pipe(isDist ? plugins.concat('app.js') : plugins.util.noop())
    //     .pipe(plugins.ngAnnotate())
    //     .pipe(isDist ? plugins.uglify() : plugins.util.noop())
    //     // .pipe(plugins.wrap({ src: './iife.txt'}))
    //     .pipe(gulp.dest(destinations.js));
    var target = gulp.src(globs.appWithDefinitions);
    return target.pipe(isDist ? plugins.concat('app.js') : plugins.util.noop())
        .pipe(plugins.ngAnnotate())
        .pipe(isDist ? plugins.uglify() : plugins.util.noop())
        .pipe(gulp.dest(destinations.js));
});

gulp.task('templates', function () {
    return gulp.src(globs.templates)
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.ngHtml2js({moduleName: 'templates'}))
        .pipe(plugins.concat('templates.js'))
        .pipe(isDist ? plugins.uglify() : plugins.util.noop())
        .pipe(gulp.dest(destinations.js));
});

gulp.task('clean', function () {
    return gulp.src(['dist/', 'build/'], {read: false})
        .pipe(plugins.rimraf());
});

// gulp.task('karma-once', function () {
//     return karma.once();
// });

// gulp.task('karma-watch', function () {
//     return karma.start({autoWatch: true});
// });

// gulp.task('webdriver_update', plugins.protractor.webdriver_update);

// gulp.task('protractor', ['webdriver_update'], function () {
//     return gulp.src(globs.integration)
//         .pipe(plugins.protractor.protractor({configFile: 'protractor.conf.js'}));
// });

// gulp.task('browser-sync', function () {
//   return browserSync.init(null, {
//     open: false,
//     server: {
//       baseDir: "./build"
//     },
//     watchOptions: {
//       debounceDelay: 1000
//     }
//   });
// });

gulp.task('copy-vendor', function () {
    return gulp.src(vendoredLibs)
        .pipe(isDist ? plugins.uglify() : plugins.util.noop())
        .pipe(gulp.dest(destinations.libs));
});

gulp.task('copy-assets', function () {
    return gulp.src(globs.assets)
        .pipe(gulp.dest(destinations.assets));
});

gulp.task('index', function () {
    var target = gulp.src(globs.index);
    return target.pipe(
        plugins.inject(gulp.src(injectPaths, {read: false}), {
            ignorePath: outputFolder,
            addRootSlash: false
        })
    ).pipe(gulp.dest(destinations.index));
});

// gulp.task('watch', ['browser-sync'], function () {
gulp.task('watch', function () {
    gulp.watch(globs.sass, ['sass']);
    gulp.watch(globs.css, ['css']);
    gulp.watch(globs.appWithDefinitions, ['js-hint', 'js-compile']);
    gulp.watch(globs.app, ['js-hint', 'js-compile']);
    gulp.watch(globs.templates, ['templates']);
    gulp.watch(globs.index, ['index', 'laravel-index']);
    gulp.watch(globs.assets, ['copy-assets']);

    // gulp.watch('build/**/*', function(file) {
    //   if (file.type === "changed") {
    //     return browserSync.reload(file.path);
    //   }
    // });
});

gulp.task('build', function () {
    return runSequence(
        'clean',
        ['sass', 'css', 'copy-assets', 'js-compile', 'templates', 'copy-vendor'],
        ['index', 'laravel-index']
    );
});

gulp.task('default', ['build'], function () {
    return runSequence('watch');
    // return runSequence(['watch', 'karma-watch']);
});
