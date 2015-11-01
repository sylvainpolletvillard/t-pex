const
	parser = require("../src/parser"),
	config = require("../example-project/t-pex-config.js"),
	log = require("../src/logger"),
	promisify = require("promisify-node"),
	fs = promisify("fs-extra"),
	languageNames = require("../language-codes.json")


var t = Date.now(),
	baseDir = __dirname + "/../",
	paths = {},
	translations = {},
	newTranslations = {},
	obsoleteTranslations = {}

// ensure directories from config file
Promise.all([
	fs.ensureDir(baseDir + config.paths.src),
	fs.ensureDir(baseDir + config.paths.dest.substr(0, config.paths.dest.indexOf("{lang}"))),
	fs.ensureDir(baseDir + config.paths.translations.substr(0, config.paths.translations.indexOf("{lang}")))
])
.then(() => {
	paths.src = fs.realpathSync(baseDir + config.paths.src)
	paths.dest = lang => baseDir + config.paths.dest.replace("{lang}", lang)
	paths.translation = lang => baseDir + config.paths.translations.replace("{lang}", lang)

	return Promise.all(config.langs.map(lang => {
		log.debug("Generating files for %s (%s)", languageNames[lang] || "unknown lang", lang)
		newTranslations[lang] = {}; // list of labels not yet existing

		fs.ensureDirSync(paths.dest(lang));

		return Promise.all([
			(path => {
				log.debug("Copying all the sources to " + path) //then overwrite with translated files
				return fs.emptydir(path).then(() => fs.copy(paths.src, path));
			})(fs.realpathSync(paths.dest(lang))),

			(path => {
				log.debug("Reading translation file or creating a new one: " + path)
				return fs.ensureFile(path)
					.then(() => fs.readJSON(path))
					.then(json => {
						translations[lang] = json
						obsoleteTranslations[lang] = JSON.parse(JSON.stringify(json)) // clone object ; translated texts will be deleted during parsing
						return true;
					})
					.catch(error =>{ // empty or invalid JSON
						log.error(error);
						translations[lang] = {}
						obsoleteTranslations[lang] = {}
					})
			})(fs.realpathSync(paths.translation(lang)))
		])
	}))
})
.then(() => parser({
	translate: (text, lang) => {
		delete obsoleteTranslations[lang][text]
		if(translations[lang].hasOwnProperty(text)){
			return translations[lang][text]
		}
		translations[lang][text] = newTranslations[lang][text] = text;
		return text
	},
	write: current => {
		var destPath = fs.realpathSync(current.file).replace(paths.src, fs.realpathSync(paths.dest(current.lang)))
		log.debug("Writing to", destPath)
		return fs.writeFile(destPath, current.result)
	}
}))
.then( results => {

	log.info("Translated in %d langs in %d ms", config.langs.length, Date.now() - t)

	var langsWithNewTexts = config.langs.filter(lang => Object.keys(newTranslations[lang]).length > 0)
	log.info("New texts to translate:", langsWithNewTexts.map(lang => '\n' + lang + ":" + log.keys(newTranslations[lang])).join('') || "none")

	var langsWithObsoleteTexts = config.langs.filter(lang => Object.keys(obsoleteTranslations[lang]).length > 0)
	log.info("Obsolete texts to delete:", langsWithObsoleteTexts.map(lang => '\n' + lang + ":" + log.keys(obsoleteTranslations[lang])).join('') || "none")

})
.then( () => {

	log.debug("Completing translation files with new labels") // and cleaning obsolete ? //TODO: ask user at command prompt
	return Promise.all(config.langs.map(lang => {
		return fs.writeJSON(paths.translation(lang), translations[lang])
	}))
})
.catch(log.error);
