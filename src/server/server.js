const io = require('socket.io')(8124);

const client_names = {}

io.on('connection', (socket) => {

	//emit(event, data) //to an event.
	//on(event, data) //from an event.

	socket.on('onClientText', (msg) => {

		onClientText(socket, msg);
	});
	socket.on('onClientCommand', (cmd, params) => {

		onClientCommand(socket, cmd, params)
	});
});

function onClientText(socket, msg) {

	if(typeof client_names[socket.id] !== 'string') {

		socket.emit('server-message', 'ERROR : Message not sent. You must join the chat first! (/join)');
		return;
	} else {
		//#TODO : Broadcast chats only to 'joined' clients.
		socket.broadcast.emit('server-message', `${client_names[socket.id]}: ${msg}`);
	}
}

function onClientCommand(socket, cmd, params) {

	//params === null if no parameters were given.
	console.log(`[DEBUG] Command : ${cmd} Parameters : ${params}`);

	//#TODO : commands.js.

	if(cmd === '/join') {
		if(typeof client_names[socket.id] === 'string') {

			socket.emit('server-message', 'ERROR : You are already joined with a nickname!');
			return;
		}
		if(params === null) {

			socket.emit('server-message', 'USAGE : /join [nickname]');
		} else {

			client_names[socket.id] = params;
			socket.emit('server-message', 'Your nickname is now ' + params);
			socket.broadcast.emit('server-message', params + ' has joined the chat!');
		}
	}
}
