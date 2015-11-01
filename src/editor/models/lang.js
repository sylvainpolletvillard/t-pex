const languageCodes = require('../../../language-codes.json')

var Lang = Model.Object({
	code: String,
	name: String
});

Lang.getByCode = code => {
	if(!(code in languageCodes)){
		throw new Error("Unknown language code: "+code);
	}
	return new Lang({
		code: code,
		name: languageCodes[code]
	})
}

module.exports = Lang;