var Menu = require("menu");

var template = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New Project'
			},
			{
				label: 'Open Project',
				accelerator: 'CmdOrCtrl+O'
			},
			{
				type: 'separator'
			},
			{
				label: 'Close',
				accelerator: 'Alt+F4',
				role: 'close'
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo'
			},
			{
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo'
			}
		]
	},
	{
		label: 'View',
		submenu: [
			{
				label: 'Full Screen',
				accelerator: (function() {
					if (process.platform == 'darwin')
						return 'Ctrl+Command+F';
					else
						return 'F11';
				})(),
				click: function(item, focusedWindow) {
					if (focusedWindow)
						focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
				}
			}
		]
	},
	{
		label: 'Help',
		role: 'help',
		submenu: [
			{
				label: 'Documentation',
				accelerator: 'CmdOrCtrl+H',
				click: function(item, focusedWindow) { focusedWindow.loadUrl('file://' + __dirname + '/docs.html') }
			},
			{
				label: 'View on Github',
				click: function() { require('shell').openExternal('http://github.com/sylvainpolletvillard/') }
			},
			{
				label: 'Report a bug',
				click: function() { require('shell').openExternal('http://github.com/sylvainpolletvillard/t-pex/issues') }
			},
			{
				type: 'separator'
			},
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click: function(item, focusedWindow) {
					if (focusedWindow)
						focusedWindow.reload();
				}
			},
			{
				label: 'Developer tools',
				accelerator: (function() {
					if (process.platform == 'darwin')
						return 'Alt+Command+I';
					else
						return 'Ctrl+Shift+I';
				})(),
				click: function(item, focusedWindow) {
					if (focusedWindow)
						focusedWindow.toggleDevTools();
				}
			}
		]
	}
];

if (process.platform == 'darwin') {
	var name = require('app').getName();
	template.unshift({
		label: name,
		submenu: [
			{
				label: 'About ' + name,
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				label: 'Services',
				role: 'services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				label: 'Hide ' + name,
				accelerator: 'Command+H',
				role: 'hide'
			},
			{
				label: 'Hide Others',
				accelerator: 'Command+Shift+H',
				role: 'hideothers'
			},
			{
				label: 'Show All',
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				label: 'Quit',
				accelerator: 'Command+Q',
				click: function() { app.quit(); }
			}
		]
	});
	// Window menu.
	template[3].submenu.push(
		{
			type: 'separator'
		},
		{
			label: 'Bring All to Front',
			role: 'front'
		}
	);
};

var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports = menu;