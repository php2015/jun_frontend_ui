const path=require("path");
const webpack=require("webpack");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const MomentLocalesPlugin=require("moment-locales-webpack-plugin");

module.exports=[
	new MomentLocalesPlugin(),
	new webpack.DefinePlugin({
		"process.env.NODE_ENV":JSON.stringify(process.env.NODE_ENV)
	}),
    //根据css优先级进行排序    
    new MiniCssExtractPlugin({
        filename:"style/[name]-[hash:8].css",
    }),
	//加载html
	new HtmlWebpackPlugin({
		cache:false,
		filename:"index.html",
		template:path.resolve(__dirname,"../../development/Application/template.html")
	}),
	//定义全局变量
	//雪碧图插件
];