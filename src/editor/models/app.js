const
	Config = require('./config'),
	Project = require('./project'),
	Label = require('./label'),
	Lang = require('./lang')

const App = Model({
	config: Config,
	projects: Model.Array(Project),
	labels: Array /*Model.Array(Label)*/,
	langs: Model.Array(Lang),
	currentLang: Lang
});

App.prototype.selectLang = Model.Function(String)(function(code){
	console.log("selected lang", code)
	this.currentLang = Lang.getByCode(code)
	riot.update()
})

module.exports = App