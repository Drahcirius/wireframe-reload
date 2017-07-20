if (_wireframeReloadConfig) {
	const { port, path } = _wireframeReloadConfig;
	const socket = new WebSocket(`${path}:${port}`);

	socket.onmessage = (message) => {
		const data = JSON.parse(message.data);
		if (data.type === 'css') {
			console.log(`attempting to reload ${data.href}`);
			const element = document.querySelector(`[href^="${data.href}"]`);
			if (element) element.href = `${data.href}?t=${+new Date()}`;
		} else if (data.type === 'page') {
			if (location.href.includes(data.href)) {
				console.log(`attempting to reload current page`);
				location.reload();
			}
		}
	};

} else {
	console.log('Config for wireframe-reload not found');
}
