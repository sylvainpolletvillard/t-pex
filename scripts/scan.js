const
	parser = require("../src/parser"),
	log = require("../src/logger")

var t = Date.now()

parser().then( results => {

	log.debug('\n',
		"<t> elements found: " + results.elements.length, log.array(results.elements.map(e => e.text)),
		"t-attributes found: " + results.attributes.length, log.array(results.attributes.map(a=>a.attr+" = "+a.value)),
		"t-style properties found: " + results.styleProps.length, log.array(results.styleProps.map(p=>p.prop+": "+p.value)),
		"t() script calls found: " + results.fnCalls.length, log.array(results.fnCalls.map(c => c.text))
	)

}).catch(errors => { throw errors })

log.info("Scan done in: " + (Date.now() - t) + " ms")