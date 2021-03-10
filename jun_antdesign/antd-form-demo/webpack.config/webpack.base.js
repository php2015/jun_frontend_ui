const path=require("path");
const webpackEntry=require("./webpack.entry/webpackEntry.js");
const webpackModule=require("./webpack.module/webpack.module.js");
const webpackPlugins=require("./webpack.plugins/webpackPlugins.js");
const webpackOptimization=require("./webpack.optimization/webpack.optimization.js");
const webpackResolve=require("./webpack.resolve/webpack.resolve.js");

module.exports={	
	entry:webpackEntry([
		path.resolve(__dirname,"../development/application/entry.js")
	]),
	output:{
		publicPath:"/",
		filename:"bundle-[name]-[hash:8].js",
		path:path.resolve(__dirname,"../production/")
	},
	module:webpackModule,
    optimization:webpackOptimization,
	plugins:webpackPlugins,
	resolve:webpackResolve
}