const
	tracer = require('tracer'),
	promisify = require("promisify-node"),
	fs = promisify("fs-extra"),
	extend = Object.assign.bind(Object, {}),

	config = require('../example-project/t-pex-config')

const loggerConfig = {
	format : [
		"{{timestamp}} [{{title}}] {{message}}", //default format
		{
			error : "{{timestamp}} <{{title}}> {{message}} (from {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
		}
	],
	dateformat : "HH:MM:ss",
	level: config.logLevel,
	preprocess :  function(data){
		data.title = data.title.toUpperCase();
	}
}


if(config.logFile){
	fs.writeFileSync(config.logFile, ''); // clear previous logs
}

var consoleLogger = tracer.colorConsole(loggerConfig)
var logger = tracer.console(extend(loggerConfig, {
	transport: function(data){
		if(config.logFile){
			fs.createWriteStream(config.logFile, {
				flags: "a",
				encoding: "utf8",
				mode: 666
			}).write(data.output+"\n");
		}
		consoleLogger[data.title.toLowerCase()](...data.args)
	}
}));

logger.array = arr => arr.length ? "\n\t"+arr.join("\n\t")+"\n" : "[]\n"
logger.keys = obj => logger.array(Object.keys(obj))
logger.set = set => logger.array(Array.from(set))

module.exports = logger;