const path = require('path');
const { argv } = require('process');
module.exports = {
    mode:'development',
    entry: './src/app.ts',
    output: {
        filename:'bundle.js',
        path: path.resolve(__dirname,'dist'),
        publicPath:'dist'
    },
    devtool:'inline-source-map',
    module:{
        rules:[
            {
                test:/\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve :{
        extensions: ['.ts','.js']
    },
    devServer: {
        open:true,
        watchContentBase:true,
        contentBase:'.',
        publicPath:'/dist/',
        hot:false,
        liveReload:true,
    }

};