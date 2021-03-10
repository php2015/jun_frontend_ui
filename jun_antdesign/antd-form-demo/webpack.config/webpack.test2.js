const path=require("path");
const merge=require("webpack-merge");
const webpackBaseConfig=require("./webpack.base.js");
const cleanWebpackPlugin=require("clean-webpack-plugin");


module.exports=merge(webpackBaseConfig,{
	output:{
		path:path.resolve(__dirname,"../static-server/test2/")
	},
	plugins:[
		new cleanWebpackPlugin(["*"],{
			root:path.resolve(__dirname,"../static-server/test2/")
		})
	]
})
