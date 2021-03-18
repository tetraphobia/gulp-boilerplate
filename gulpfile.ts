import {src, dest, series, watch} from 'gulp'
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import {init, stream, reload} from 'browser-sync';

// Initialize config.
import Config from './config'
const {outDir, htmlGlob, sassGlob, tsGlob, jsBundle, cssBundle, bsOpts} = Config

// Initialize Typescript project.
import {createProject} from 'gulp-typescript'
const TypeScript = createProject('tsconfig.json')

// Gulp tasks.
const compileTS = () =>
    TypeScript.src()
        .pipe(TypeScript())
        .js
        .pipe(concat(jsBundle))
        .pipe(dest(outDir))
        .pipe(stream())

const compileHTML = () =>
    src(htmlGlob)
        .pipe(dest(outDir))
        .pipe(stream())

const compileSASS = () =>
    src(sassGlob)
        .pipe(sass())
        .pipe(concat(cssBundle))
        .pipe(dest(outDir))
        .pipe(stream())

exports.srv = (callback: () => any) => {
    exports.build()
    init(bsOpts)

    watch(htmlGlob, compileHTML)
    watch(sassGlob, compileSASS)
    watch(tsGlob, compileTS)
    callback()
}

exports.build = series(compileSASS, compileTS, compileHTML)
exports.default = exports.build