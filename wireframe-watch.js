const fs = require('fs');
const path = require('path');
const { Server: WebSocketServer } = require('uws');
const config = require('./config.js');

const port = config.port;
const watchPath = config.watchPath;
console.log(watchPath);

const wss = new WebSocketServer({ port }, () => {
	console.log(`watcher listening on port ${port}`);	
});

wss.on('connection', (request) => {
	console.log(`received connection`);
});

const watchTypes = ["css", "html"];
const debounce = {};

function addWatch(extension, watchPath) {
	fs.watch(watchPath, (event, filename) => {
		if (event === 'change' && filename.endsWith(`.${extension}`) && debounce[extension]) {
			debounce[extension] = true;
			console.log(`sending change on ${filename}`);
			wss.broadcast(JSON.stringify({ 
				type: extension, 
				href: path.join(watchPath, filename)
			}));
			setTimeout(() => debounce[extension] = false, 200);
		}
	});
}

addWatch("css", watchPath);
addWatch("html", './');
