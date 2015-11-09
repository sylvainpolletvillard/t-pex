const Config = require('./config');
const Project = require('./project');
const Label = require('./label');

module.exports = Model({
	config: Config,
	projects: Model.Array(Project),

	labels: Model.Array(Label)
});