export default {
    // Directory that everything ends up in.
    outDir: './dist/',

    // Globs
    htmlGlob: './src/html/**/*.html',
    sassGlob: './src/sass/**/*.sass',
    tsGlob: "./src/ts/**/*.ts", // Change this in tsconfig.json as well

    // What the bundles should be called.
    jsBundle: 'bundle.js',
    cssBundle: 'bundle.css',

    // Browsersync opts
    bsOpts: {
        server: {
            baseDir: './dist/'
        }
    },
}