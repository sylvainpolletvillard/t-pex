module.exports ={

	langs: ["fr","en_GB","en_US"], // list of language codes used

	paths: {
		src: "example-project/", // path where to scan for source files
		dest: "example-project-dist/{lang}/", // path to copy translated sources
		translations: "example-project/translations/{lang}.json" // path where to store translations mapping
	},

	html: ['**/*.html'], // HTML files to scan
	css: ['**/*.css'], // CSS files to scan
	js: ['**/js/*.js'], // JavaScript files to scan
	ignore: [], // // List of files to ignore

	logFile: "t-pex.log", // filepath where to log ; can be null for standard console output only
	logLevel: "debug" // level of log (error, warning, info or debug)

}