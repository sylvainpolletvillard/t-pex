const
	postcss = require('postcss'),
	promisify = require("promisify-node"),
	fs = promisify("fs-extra"),
	config = require("../../example-project/t-pex-config"),
	log = require("../logger")

module.exports = function parseCSS(filepaths, p){
	var tStyles = [],
		p = p || { translate: null, write: null },
		translate = p.translate,
		write = p.write

	return Promise.all(filepaths.map(file => fs.readFile(file).then(data => {

		var root = postcss.parse(data);
		return Promise.all(config.langs.map( (lang, l) => {
			var translatedCSS = root.clone()

			translatedCSS.walkDecls(decl => {
				if (decl.prop.match(/^t-/)) {
					if(l === 0) tStyles.push({ prop: decl.prop, value: decl.value, file })
					if (translate) {
						decl.parent.insertBefore(decl, decl.clone({
							prop: decl.prop.slice(2),
							value: translate(decl.value, lang)
						}))
						decl.remove()
					}
				}
			})
			if (write) {
				return write({lang, file, result: translatedCSS.toResult().css})
			}
		}))

	}))).then(() => {
		log.debug("CSS parsing done")
		return { // deduplicated
			styleProps: tStyles.filter((p,i) => tStyles.findIndex(q=>q.value === p.value && q.prop === p.prop) === i)
		}
	}).catch(log.error)
}