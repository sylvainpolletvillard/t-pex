const
	falafel = require('falafel'),
	promisify = require("promisify-node"),
	fs = promisify("fs-extra"),
	config = require("../../example-project/tpex-config"),
	log = require("../logger")

module.exports = function parseJS(filepaths, p){

	p = p || { translate: null, write: null };

	var tCalls = [],
		translate = p.translate,
		write = p.write;

	return Promise.all(filepaths.map(file => fs.readFile(file).then(fileContent => {

		return Promise.all(config.langs.map( (lang,l) => {

			var result = falafel(fileContent.toString(), function(node){
				if(node.type === "Identifier" && node.name === "t" && node.parent.type === "CallExpression"){
					var text = node.parent.arguments[0].value;
					if(l === 0) tCalls.push({ text, file });
					if (translate) {
						node.parent.update('"' + translate(text, lang).replace(/"/g, '\\"') + '"');
					}
				}
			});

			if (write) {
				return write({lang, file, result})
			}
		}))

	}))).then(() => {
		log.debug("JS parsing done")
		return { // deduplicated
			fnCalls: tCalls.filter((a,i) => tCalls.findIndex(b => a.text === b.text) === i)
		}
	}).catch(log.error)
}