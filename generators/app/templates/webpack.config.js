const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = (env = { type: 'dev' }) => {
    let plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: <% if(templateEngine) { %>'dev/index.pug'<% } else { %>'dev/index.html'<% } %>,
            alwaysWriteToDisk: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(env.type == 'prod')
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ];
    
    let entry = [
        './dev/polyfills.ts',
        './dev/vendor.ts',
        './dev/main.ts'
    ];

    return {
        
        devServer: {
            contentBase: __dirname  + '/',
            proxy: {
                '/': 'http://localhost:7777'
            },
            hot: true,
            publicPath: '/'
        },
        
        entry: env.type == 'dev' ? entry.concat([
            'webpack/hot/only-dev-server',
        ]) : entry,

        resolve: {
            extensions: ['*', '.ts', '.js', <% if(cssPreprocessor == 'Stylus') { %>'.styl'<% } %><% if(cssPreprocessor == 'Less') { %>'.less'<% } %><% if(cssPreprocessor == 'Sass') { %>'.scss'<% } %>]
        },

        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }, {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
                },<% if(templateEngine == true) { %>
                {
                    test: /\.(jade|pug)$/,
                    loader: 'pug-loader'
                }<% } else { %>
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }<% } %>,
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader?name=img/[name].[ext]'
                }, {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },<% if(cssPreprocessor == 'Stylus') { %>
                {
                    test: /\.styl$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!stylus-loader' })
                }<% } %><% if(cssPreprocessor == 'Less') { %>
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
                }<% } %><% if(cssPreprocessor == 'Sass') { %>
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
                }<% } %>
            ]
        },
        
        devtool: 'source-map',

        output: {
            path: __dirname + '/public/',
            publicPath: '/',
            filename: '[name].[hash].js',
            chunkFilename: '[id].chunk.js'
        },
        
        plugins: env.type == 'dev' ? plugins.concat([
            new webpack.NamedModulesPlugin()
        ]) : plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                mangle: {
                    keep_fnames: true
                }
            })
        ]),
        
        watch: (env.type == 'dev')
    };    
};
