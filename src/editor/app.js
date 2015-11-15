const
	Config = require('./models/config'),
	Project = require('./models/project'),
	Lang = require('./models/lang'),
	App = require('./models/app'),
	ipc = require('ipc'),

	Less = require("less"),
	LessAutoPrefixPlugin = require('less-plugin-autoprefix'),
	lessAutoPrefixPlugin = new LessAutoPrefixPlugin({ browsers: ["last 2 versions"] });

riot.parsers.css.less = function(tagName, lessInput) {
	var css;
	Less.render(lessInput, {
		sync: true,
		plugins: [lessAutoPrefixPlugin],
		sourceMap: { sourceMapURL: tagName+".tag" }
	}, function (err, result) {
		if (err) throw err;
		css = result.css;
	});
	return css;
}

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
		labels: [],
		langs: config.langs.map(Lang.getByCode),
		currentLang: Lang.getByCode(config.langs[0])
	})

	ipc.on("results", results => {
		app.labels = results;
		riot.update();
	})

	ipc.on("translations", translations => {
		config.langs.forEach(code => {
			Lang.getByCode(code).translations = translations[code] || {}
		})
		app.currentLang = Lang.getByCode(app.currentLang.code);
		riot.update();
	})

	ipc.send('loadTranslations', config);
	ipc.send("scan");

	riot.mount('*', app);
	riot.route.start()
	riot.route.exec()

	window.app = app;
})
