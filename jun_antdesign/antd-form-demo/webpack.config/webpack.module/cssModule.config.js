

/*options={
	url:true, =>默认url会被webpack自动解析和替换,如果将其设置为false得到的效果就是写的是什么字符串就是什么字符串,
}*/
module.exports={
    loader:"css-loader",
    options:{
        modules:true,
        localIdentName:"[local]-[hash:base64]"
    }    
}