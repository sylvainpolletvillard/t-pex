const
		app = require('app'),  // Module to control application life.
		BrowserWindow = require('browser-window'),  // Module to create native browser window.
		ipc = require('ipc'),
		Parser = require('../parser')

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
		app.quit();
	}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		"auto-hide-menu-bar": true
	});

	require('./menu');
	//mainWindow.setMenu(null);


	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + __dirname + '/index.html');
	mainWindow.openDevTools();

	app.window = mainWindow.webContents;

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});


});

ipc.on("scan", function(event, arg){
	Parser().then( results => {

		results.elements.forEach(l => l.type = "element" );
		results.attributes.forEach(l => l.type = "attribute");
		results.styleProps.forEach(l => l.type = "style");
		results.fnCalls.forEach(l => l.type = "function");

		event.sender.send('results', [].concat(results.elements, results.attributes, results.styleProps, results.fnCalls))

	}).catch(errors => { throw errors })
})

