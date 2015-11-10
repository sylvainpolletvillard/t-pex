const Label = Model.Object({
	type: ["function", "element", "attribute", "style"],
	text: String,
	file: String
})

module.exports = Label