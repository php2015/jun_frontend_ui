const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const cssModuleConfig=require("./cssModule.config.js")
const lessLoaderConfig=require("./lessLoaderConfig.js")
const postCssConfig=require("./postCss.config.js")
const babelConfig=require("./babelConfig.js")
const bundleLoaderConfig=require("./bundleLoaderConfig.js")

module.exports={
    rules:[{
        test:/\.css$/,
        use:[{loader:MiniCssExtractPlugin.loader},{loader:"css-loader"}],
        //exclude:/(node_modules)/,
    },{
        test:/\.global\.scss$/,
        use:[{loader:MiniCssExtractPlugin.loader},{loader:"css-loader"},{loader:"sass-loader"}],
        exclude:/(node_modules)/,
    },{
        test:/\.module\.scss$/,
        use:[{loader:MiniCssExtractPlugin.loader},cssModuleConfig,{loader:"sass-loader"}],
        exclude:/(node_modules)/,
    },{
        test:/\.less$/,
        use:[{loader:MiniCssExtractPlugin.loader},{loader:"css-loader"},lessLoaderConfig],
        include:/(node_modules)/
    },{
        test:/\.(js|jsx)$/,
        use:[babelConfig],
        exclude:/(node_modules)/,
    },{
        test:/\.(png|jpg|jpeg|gif)$/,
        use:[{
            loader:"file-loader",
            options:{
                outputPath:"images",
                name:"[name]-[hash].[ext]" 
            }
        }],
        exclude:/(node_modules)/,
    }]
}