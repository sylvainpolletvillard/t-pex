const Config = require('./config');
const Project = require('./project');

module.exports = Model({
	config: Config,
	projects: Model.Array(Project)
});