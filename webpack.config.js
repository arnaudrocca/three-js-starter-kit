module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: './static/js',
        filename: 'bundle.js',
        publicPath: '/js'
    },
    devServer: {
        inline: true,
        contentBase: './static'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        root: '',
        alias: {
            TweenMax: __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['add-module-exports']
                }
            },
            {
               test: /node_modules/,
               loader: 'ify'
             },
             {
               test: /\.(glsl|frag|vert)$/,
               exclude: /node_modules/,
               loader: 'raw!glslify'
             }
        ]
    }
};
