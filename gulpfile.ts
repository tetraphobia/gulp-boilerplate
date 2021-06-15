import {
    parallel,
    series,
    src,
    dest,
    watch,
} from 'gulp';

import {createProject} from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
import * as sass from 'gulp-dart-sass';
import * as babel from 'gulp-babel';
import * as uglify from 'gulp-uglify';
import * as htmlmin from 'gulp-htmlmin';
import * as browsersync from 'browser-sync'
import concat from 'gulp-concat';

// HTML functions
const htmlCopy = () =>
    src('src/html/**/*.html')
        .pipe(dest('./dist/'))

const htmlMinify = () =>
    src('src/html/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('./dist/'))

// Typescript functions
const proj = createProject('tsconfig.json')
const tsBuild= () =>
    proj.src()
        .pipe(sourcemaps.init())
        .pipe(proj())
        .js
        .pipe(concat('bundle.js'))
        .pipe(dest('./dist/'))

const tsMinify = () =>
    proj.src()
        .pipe(sourcemaps.init())
        .pipe(proj())
        .js
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(dest('./dist/'))

// Sass functions
const sassBuild = () =>
    src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(dest('./dist/'))

// Browsersync server
const bs = browsersync.create()
const devServer = () => {
    bs.init({
        server: {
            baseDir: 'dist/'
        }
    })
    watch('src/sass/**/*.scss', sassBuild)
    watch('src/html/**/*.html', htmlCopy).on('change', bs.reload)
    watch('src/ts/**/*.ts', tsBuild).on('change', bs.reload)

}

exports.default = series(htmlCopy, tsBuild, sassBuild, devServer)

exports.build = parallel(htmlMinify, tsMinify, sassBuild)
