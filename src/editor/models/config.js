const
	find = require("findit"),
	Project = require("./project")

var Config = Model.Object({
	langs: Model.Array(String), // list of language codes used

	paths: {
		src: String, // path where to scan for source files
		dest: String, // path to copy translated sources
		translations: String // path where to store translations mapping
	},

	html: Model.Array(String), // HTML files to scan
	css: Model.Array(String), // CSS files to scan
	js: Model.Array(String), // JavaScript files to scan
	ignore: Model.Array(String), // // List of files to ignore

	logFile: String, // filepath where to log ; can be null for standard console output only
	logLevel: ["error", "warning", "info", "debug"] // level of log

})

Config.findAndLoadConfigFile = Model.Function(Project)
(project => new Promise((resolve, reject) => {
	var finder = find(project.rootPath)
	finder.on("file", filepath => {
		var fileName = filepath.split(/[\\\/]/).pop();
		console.log(fileName);
		if(fileName === "tpex-config.js"){
			finder.stop();
			resolve(require(filepath));
		}
	}).on("error", reject)
}));

module.exports = Config;