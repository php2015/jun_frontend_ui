const path=require("path")
const merge=require("webpack-merge");
const webpackBaseConfig=require("./webpack.base.js");

const {servers}=require("../EasyConfig.js");
const {host,port}=servers.get("development");

module.exports=merge(webpackBaseConfig,{
	mode:"development",
	devtool:"source-map",
    devServer:{
        open:true,
        port:port,
        host:host,
        inline:true,
        disableHostCheck:false,
        historyApiFallback:true,
    }
})