const
	find = require("findit"),
	Project = require("./project")

var Config = Model.Object({
	langs: Model.Array(String), // list of language codes used

	filepath: [String], // path of config file

	paths: {
		src: String, // path where to scan for source files
		dest: String, // path to copy translated sources
		translations: String // path where to store translations mapping
	},

	files: {
		html: Model.Array(String), // HTML files to scan
		css: Model.Array(String), // CSS files to scan
		js: Model.Array(String), // JavaScript files to scan
		ignore: Model.Array(String) // // List of files to ignore
	},

	log: {
		file: String, // filepath where to log ; can be null for standard console output only
		level: ["error", "warning", "info", "debug"] // level of log
	}

})

Config.findAndLoadConfigFile = Model.Function(Project)
(project => new Promise((resolve, reject) => {
	var finder = find(project.rootPath)
	finder.on("file", filepath => {
		var fileName = filepath.split(/[\\\/]/).pop();
		console.log(fileName);
		if(fileName === "t-pex-config.js"){
			finder.stop();
			var config = Config(require(filepath));
			config.filepath = filepath;
			resolve(config, filepath);
		}
	}).on("error", reject)
}));

module.exports = Config;