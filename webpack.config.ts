import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssoWebpackPlugin from 'csso-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
const {NODE_ENV, STORYBOOK} = process.env;
const isProduction = NODE_ENV === 'production';
const isStorybook = !!STORYBOOK;
const isWebpackAnalyze = !!process.env.WEBPACK_ANALIZE;

const styleLoaders = [
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            localIdentName: '[local]',
            modules: true
        }
    },
    'postcss-loader'
];

const clientPath = path.resolve(__dirname, 'src');

const webpackConfig: webpack.Configuration = {
    mode: isProduction ? 'production' : 'development',
    target: 'web',
    entry: [
        'promise-polyfill', 'promise.prototype.finally', path.resolve(clientPath, 'boot.tsx')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: isProduction ? 'assets/app.[hash].js' : 'assets/app.bundle.js',
        publicPath: '/'
    },
    devtool: false,
    resolve: {
        modules: [clientPath, 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            /**
             * react-router-dom и react требуют разные мажорные версии. Но они совместимы между собой.
             * Делаем это, чтобы в бандл не попадали две разные версии
            */
            warning: path.resolve(__dirname, 'node_modules/warning')
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    },
    node: {
        console: false,
        global: true,
        process: false,
        __filename: false,
        __dirname: false,
        Buffer: false,
        setImmediate: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.pcss$/,
                use: styleLoaders
            },
            {
                test: /\.(png|gif|jpeg|jpg|cur|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[hash].[ext]',
                        publicPath(url: string): string {
                            return `/${url}`;
                        }
                    }
                }]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader'
                    }
                ].concat(
                    isProduction
                    ?
                    {
                        loader: 'svgo-loader'
                    }
                    :
                    []
                )
            }
        ]
    },
    optimization: {
        minimizer: [
            (new TerserWebpackPlugin({
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    ecma: 5,
                    toplevel: true,
                    keep_classnames: isStorybook,
                    compress: {
                        drop_console: true,
                        arguments: true,
                        passes: 2
                    }
                }
            }) as any),
            new CssoWebpackPlugin()
        ]
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        quiet: false,
        noInfo: false,
        stats: 'minimal'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isProduction ? 'assets/app.[hash].css' : 'assets/app.style.css'
        })
    ]
};

webpackConfig.plugins = webpackConfig.plugins || [];

if (isWebpackAnalyze) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin({
        openAnalyzer: false
    }));
}

if (!isStorybook && !isWebpackAnalyze) {
    webpackConfig.plugins.push(
        new HtmlWebpackPlugin({
            template: path.resolve(clientPath, 'index.html'),
            inject: 'head',
            minify: {
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeRedundantAttributes: true
            }
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new DuplicatePackageCheckerPlugin({
            // Also show module that is requiring each duplicate package (default: false)
            verbose: true,
            // Emit errors instead of warnings (default: false)
            emitError: false,
            // Show help message if duplicate packages are found (default: true)
            showHelp: false,
            // Warn also if major versions differ (default: true)
            strict: true
        })
    );
}

export default webpackConfig;
