const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const proxyUrl = process.env.PROXY_URL ? process.env.PROXY_URL : 'http://localhost:9080';

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        historyApiFallback: true,
        host: '127.0.0.1',
        port: 9081,
        proxy: {
            '/api': { target: proxyUrl }
        },
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
    },
});
