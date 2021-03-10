const path=require("path");
const EasyConfig=require("../../EasyConfig.js")

module.exports={
	alias:Object.assign({
		lib:path.resolve(__dirname,"../../resources/myLibrary/"),
		fonts:path.resolve(__dirname,"../../resources/fonts/"),
		icons:path.resolve(__dirname,"../../resources/icons/"),
		images:path.resolve(__dirname,"../../resources/images/"),
		components:path.resolve(__dirname,"../../resources/myComponents/")
	},EasyConfig.alias)
}