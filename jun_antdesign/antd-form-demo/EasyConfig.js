const path = require("path");


module.exports = {
	servers: new Map([
		["development", {
			port: "9090",
			host: "127.0.0.1",
		}],
		["test2", {
			port: "6001",
			host: "127.0.0.1",
		}]
	]),
	alias: {
		"@": path.resolve(__dirname, "./development")
	}
}