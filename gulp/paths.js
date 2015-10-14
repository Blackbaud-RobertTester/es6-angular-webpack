module.exports = {
    vendor: 'dist/vendor/',
    html: './src/**/*.html',
    theme: './node_modules/ui-theme/dist/**/*.*',
    coverage: './build/coverage/PhantomJS*/index.html',
    styles: './src/**/*.{scss,sass}',
    scripts: './src/**/*.js',
    build: {
        theme: './',
        main: './dist',
        watchPath: 'build/**/*.*',
        server: './build/server.js',
        content: './build/content/**/*',
        templates: './dist/themes',
        public: {
            main: './build/public',
            css: 'public/css'
        }
    },
    tests: {
        unit: '**/*.test.js'
    },
    webpack: {
        config: './webpack.config.js'
    },
    temp: './tmp'
};
