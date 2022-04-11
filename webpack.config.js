const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    // 开发模式
    mode: 'development',

    // 入口文件
    entry: {
        main: './src/main.js'
    },

    // 输出
    output: {
        // 输出到dist 文件夹
        path: path.resolve(__dirname, './dist'),

        // js 文件
        filename: 'js/chunk-[contenthash].js',

        // 每次打包前自动清除旧的dist
        clean: true,
    },

    // plugin插件
    plugins: [
        new htmlWebpackPlugin({
            // 选择模板 public/index.html
            template: './public/index.html',

            // 打包后的名字
            filename: 'index.html',

            // js 文件插入到 body 里
            inject: 'body',
        }),

        new miniCssExtractPlugin({
            // 将css代码输出到dist/styles 文件夹下
            filename: 'styles/chunk-[contenthash].css',
            ignoreOrder: true,
        }),

        new VueLoaderPlugin(),
    ],

    module: {
        rules: [
            // CSS
            {
                // 匹配文件后缀的规则
                test: /\.(css|s[cs]ss)$/,
                use: [
                    // loader 执行顺序是从右到左
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },

            // Image
            {
               // 匹配文件后缀规则
               test: /\.(png|jpe?g|gif|svg|webp)$/,
               type: 'asset',
               parser: {
                   // 转base64的条件
                   dataUrlCondition: {
                       maxSize: 25 * 1024, // 25kb
                   }
               },
               generator: {
                   // 打包到dist/image 文件夹下
                   filename: 'images/chunk-[contenthash][ext][query]',
               }
            },

            
            // JS
            {
                // 匹配js后缀文件
                test: /\.js$/,
                // 排除node_modules 中的js
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ],
            },

            // Vue
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
        ],
    },

    resolve: {
        // 路径别名
        alias: {
            '@': path.resolve('./src'),
            assets: '~/assets',
            tools: '~tools'
        },
        // 医用文件时省略后缀
        extensions: ['.js', '.ts', '.less', '.vue'],
    },

    devServer: {
        // 自定义端口
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}