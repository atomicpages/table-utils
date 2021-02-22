const __DEV__ = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src/index.ts',
    mode: __DEV__ ? 'development' : 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
            },
        ],
    },
};
