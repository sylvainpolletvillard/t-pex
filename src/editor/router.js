const routes = {
	files: "files",
	labels: "labels",
	config: "config"
}

riot.route(function(page, id, action) {

	console.log("route", page, id, action);
	var tag = routes[page];
	if(typeof tag !== "string"){
		tag = tag[id];
	}
	if(typeof tag !== "string"){
		tag = tag[action];
	}
	if(typeof tag !== "string"){
		tag = "home-page";
	}
	riot.compile('tags/' + tag + '.tag', () => riot.mount('main', tag, { id, action }))


})