const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const config = {
    entry: [
        './src/scripts/index.js',
        './src/styles/main.styl'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        inline: true,
        contentBase: './static',
        outputPath: path.join(__dirname, 'build')
    },
    resolve: {
        root: '',
        modulesDirectories: ['node_modules'],
        alias: {
            TweenMax: __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/templates/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new CopyWebpackPlugin(
            [{
                from: 'static'
            }],
            {
                ignore: ['.DS_Store']
            }
        ),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
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
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss!stylus'
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            }
        ]
    },
    postcss: () => {
        return [
            precss,
            autoprefixer({
                add: true,
                remove: false
            })
        ];
    }
};

module.exports = config;
