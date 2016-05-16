module.exports = {
    entry: './name-manager.jsx',
    output: {
        filename: './site/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
                , query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    },
    devtool: 'source-map'
}