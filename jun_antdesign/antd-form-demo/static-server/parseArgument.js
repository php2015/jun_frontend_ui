const {ArgumentParser}=require("argparse");
const parser=new ArgumentParser({
  	addHelp:true,
  	version:"0.0.1",
  	description:"生成webpack配置"
});
//本次配置的端口
parser.addArgument(["-p","--port"],{
	type:"string",
	defaultValue:"5000"
});
//本次配置的环境变量
parser.addArgument(["-e","--env"],{
	type:"string",
	defaultValue:"production"
});

exports.parserResult=parser.parseArgs()