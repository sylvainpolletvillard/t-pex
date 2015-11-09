const Config = require('./models/config');
const Project = require('./models/project');
const Lang = require('./models/lang');
const App = require('./models/app');

var ipc = require('ipc');



require('./router')

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
		config: config,
		labels: []
	})

	app.langs = app.config.langs.map(Lang.getByCode)

	ipc.on("results", results => {
		app.labels = results;
		riot.update();
	})

	ipc.send("scan");

	riot.mount('*', app);
	riot.route.start()
	riot.route.exec()

	window.app = app;
})
