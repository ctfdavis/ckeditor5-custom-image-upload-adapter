const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'build', 'index.ts'),
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'src')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
