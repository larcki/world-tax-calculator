const webpack = require('webpack')
const BabiliPlugin = require("babili-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './js/app.js',
    output: {
        path: __dirname + '/build',
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    plugins: [
        new BabiliPlugin(),
        new CopyWebpackPlugin([
            {from: 'css', to: 'css'},
            {from: 'fonts', to: 'fonts'},
            {from: 'icons', to: 'icons'},
            {from: 'page.html', to: 'index.html'},
            {from: 'js/jquery-2.2.2.min.js', to: 'js/jquery-2.2.2.min.js'},
            {from: 'js/vue.min.js', to: 'js/vue.min.js'},
            {from: 'js/materialize.min.js', to: 'js/materialize.min.js'},

        ])
    ]
}
