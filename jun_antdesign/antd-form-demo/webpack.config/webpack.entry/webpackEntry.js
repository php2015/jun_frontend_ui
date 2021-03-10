const path=require("path");


module.exports=function(entryArray){
	const publicEntry=[
		"@babel/polyfill",
		"whatwg-fetch",
	]
	return publicEntry.concat(entryArray)
}