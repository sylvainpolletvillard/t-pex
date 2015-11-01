const Config = require('./models/config');
const Project = require('./models/project');
const Lang = require('./models/lang');
const App = require('./models/app');

var lastProject = Project({
	name: "example-project",
	rootPath: __dirname+"/../../example-project"
})

Config.findAndLoadConfigFile(lastProject).then(function(config){
	var app = App({
		projects: [{
			name: "Test",
			rootPath: "C:/test/"
		}],
		config: config
	})

	app.langs = app.config.langs.map(Lang.getByCode);

	riot.mount('*', app);
	window.app = app;
})
