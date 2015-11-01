const
	htmlParser = require('htmlparser2'),
	promisify = require("promisify-node"),
	fs = promisify("fs-extra"),
	config = require("../../example-project/tpex-config"),
	log = require("../logger")

module.exports = function parseHTML(filepaths, p){
	p = p || { translate: null, write: null }

	var tElements = [],
		tAttributes = [],
		translate = p.translate,
		write = p.write

	return Promise.all(filepaths.map(file => fs.readFile(file).then(fileContent => {

		var currentFile = { buffer: null, tElements: [], tAttributes: [] }

		const parser = new htmlParser.Parser({
			onopentag: (tagname, attrs) => {
				if(tagname === "t"){
					currentFile.buffer = ""
				}
				Object.keys(attrs).filter(attr => attr.startsWith("t-")).forEach(attr => {
					currentFile.tAttributes.push({ attr, value: attrs[attr], file })
				})
			},
			ontext: (text) => {
				if(currentFile.buffer != null){
					currentFile.buffer += text
				}
			},
			onclosetag: (tagname) => {
				if(tagname === "t"){
					currentFile.tElements.push({ text: currentFile.buffer.toString(), file })
					currentFile.buffer = null
				}
			}
		})

		parser.write(fileContent)
		parser.end()

		tAttributes.push(...currentFile.tAttributes)
		tElements.push(...currentFile.tElements)

		return Promise.all(config.langs.map(lang => {
			var result = fileContent.toString()

			if(translate){
				currentFile.tElements.forEach(e => {
					result = result.replace("<t>"+e.text+"</t>", translate(e.text, lang))
				})
				currentFile.tAttributes.forEach(a => {
					var regex = new RegExp(a.attr + "\s*=\s*(?:(?:\"([^\"]*)\")|(?:'([^']*)'))", 'g')
					result = result.replace(regex, (match, doubleQuotes, simpleQuotes) => {
						var quote = doubleQuotes ? '"' : "'"
						return a.attr.slice(2) + "=" + quote + translate(a.value, lang) + quote
					})
				})
			}

			result = result.replace(/\n?\s*<script .*?tpex\.client.*?\/script>/, '') // remove tpex client

			if (write) {
				return write({ lang, file, result })
			}
		}))

	}))).then(() => {
		log.debug("HTML parsing done")
		return { // deduplicated
			elements: tElements.filter((a,i) => tElements.findIndex(b => a.text === b.text) === i),
			attributes: tAttributes.filter((a,i) => tAttributes.findIndex(b => a.attr === b.attr && a.value === b.value) === i)
		}
	}).catch(log.error)

}