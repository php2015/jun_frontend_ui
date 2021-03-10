
module.exports={
	loader:"babel-loader",
	options:{
		presets:[
			["@babel/preset-env"],
			["@babel/preset-react"]
		],
		plugins:[
			["@babel/plugin-transform-runtime"],
			//装饰器配置使用旧版的stage0
		    ["@babel/plugin-proposal-decorators",{"legacy":true}],
		    //当装饰器配置为legacy:true时需要松散模式
		    ["@babel/plugin-proposal-class-properties",{"loose":true}],
		    //动态按需加载的时候需要使用这个插件
		    //["@babel/plugin-syntax-dynamic-import"],
		    ["import",{
		    	//antd按需加载
		      	"libraryName":"antd",
		      	"libraryDirectory":"es",
		      	"style":true// `style: true` 会加载 less 文件
		    }]
	    ]
	}
}
