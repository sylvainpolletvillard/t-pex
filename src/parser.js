const
	promisify = require("promisify-node"),
	readdir = promisify('recursive-readdir'),
	match = require("minimatch"),

	options = require("../example-project/t-pex-config"),
	log = require("./logger"),
	parseHTML = require("./parsers/html"),
	parseCSS = require("./parsers/css"),
	parseJS = require("./parsers/javascript")

module.exports = function(params){

	log.debug("Scanning files in " + options.paths.src);

	return readdir(options.paths.src).then(filepaths => {
		filepaths = filepaths.filter(filepath => !options.ignore.some(pattern => match(filepath, pattern)))
		var htmls = filepaths.filter(filepath => options.html.some(pattern => match(filepath, pattern))),
			styles = filepaths.filter(filepath => options.css.some(pattern => match(filepath, pattern))),
			scripts = filepaths.filter(filepath => options.js.some(pattern => match(filepath, pattern)))

		log.debug('\n',
			"HTML files found: " + htmls.length, log.array(htmls),
			"CSS files found: " + styles.length, log.array(styles),
			"JS files found: " + scripts.length, log.array(scripts)
		)

		return Promise.all([
			parseHTML(htmls, params),
			parseCSS(styles, params),
			parseJS(scripts, params)
		]).catch(log.error)

	}).then( results => {
		log.debug("All parsers done");
		return {
			elements:   results[0].elements,
			attributes: results[0].attributes,
			styleProps: results[1].styleProps,
			fnCalls:    results[2].fnCalls
		}
	})
}
