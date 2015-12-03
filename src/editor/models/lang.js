const languageCodes = require('../../../language-codes.json'),
      _langs = {}

var Lang = Model.Object({
	code: String,
	name: String,
	translations: [Object]
});

Lang.getByCode = code => {
	if(!(code in languageCodes)){
		throw new Error("Unknown language code: "+code);
	}
	if(!(code in _langs)){
		_langs[code] = new Lang({
			code: code,
			name: languageCodes[code]
		})
	}
	return _langs[code]
}

Lang.all = Object.keys(languageCodes).map(Lang.getByCode);

module.exports = Lang;