const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __DEV__ = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.tsx',
    mode: __DEV__ ? 'development' : 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
        alias: {
            '@table-utils/jsx-table$': path.resolve(__dirname, '../../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules(?!\/@table-utils\/jsx-table)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-typescript',
                                {
                                    jsxPragma: 'h',
                                },
                            ],
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                {
                                    pragma: 'h',
                                    pragmaFrag: 'Fragment',
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, './public/index.html') })],
    devServer: {
        hot: true,
    },
    optimization: {
        minimize: false,
    },
    devtool: 'source-map',
};
