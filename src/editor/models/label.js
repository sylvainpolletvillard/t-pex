const Label = Model.Object({
	type: ["function call", "element", "attribute", "style property"],
	text: String,
	file: String
})

module.exports = Label