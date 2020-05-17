"use strict";

// Settings
const opts = {
    clean: true,        // Clean the dist/ directory before compiling.
    pug: true,          // Compile pug files.
    sass: true          // Compile sass files.
}

const gulpdist = 'dist/'

const dirs = {
    in: {
        pug: 'src/pug/*.pug',
        sass: 'src/sass/*.sass'
    },
    out: {
        pug: gulpdist,
        sass: gulpdist
    }
}

// Requires
const del = require('del');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

sass.compiler = require('node-sass')


// Functions
function build_sass(done){
    if (!opts.sass) return done();

    return gulp.src(dirs.in.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(dirs.out.sass))
}

function build_pug(done){
    if (!opts.pug) return done();

    return gulp.src(dirs.in.pug)
        .pipe(pug({
            // Pug opts
        }))
        .pipe(gulp.dest(dirs.out.pug))
}

function clean(){
    return del([gulpdist + '*'])
}

// Exports
const build = gulp.series(clean, build_sass, build_pug);

exports.default = build;
exports.build = build;