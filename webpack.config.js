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
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
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
