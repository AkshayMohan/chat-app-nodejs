const io = require('socket.io')(8124);

const clientNames = {}

io.on('connection', (socket) => {

	//emit(event, data) //to an event.
	//on(event, data) //from an event.

	socket.on('onClientText', (msg) => {

		onClientText(socket, msg);
	});
	socket.on('onClientCommand', (cmd, params) => {

		onClientCommand(socket, cmd, params)
	});
	socket.on('disconnect', () => {

		console.log('[DEBUG] Client has been disconnected!');
		/*
			rooms are left upon disconnection when I tested
			but until further assured, let it be here.
		*/
		socket.leave('chat-room');
	});
});

function onClientText(socket, msg) {

	if(typeof clientNames[socket.id] !== 'string') {

		socket.emit('server-message', 'ERROR : Message not sent. You must join the chat first! (/join)');
		return;
	} else {

		socket.broadcast.to('chat-room').emit('chat-message', 
			{name: clientNames[socket.id], color: 'green', bgCol: 'black'}, msg);
	}
}

function onClientCommand(socket, cmd, params) {

	//params === null if no parameters were given.
	console.log(`[DEBUG] Command : ${cmd} Parameters : ${params}`);

	//#TODO : commands.js.

	if(cmd === '/join') {
		
		if(typeof clientNames[socket.id] === 'string') {

			socket.emit('server-message', 'ERROR : You are already joined with a nickname!');
			return;
		}
		if(params === null) {

			socket.emit('server-message', 'USAGE : /join [nickname]');
		} else {

			clientNames[socket.id] = params;
			socket.join('chat-room');

			socket.emit('server-message', 'Your nickname is now ' + params);

			//Broadcast messages are sent to everyone except the client.
			socket.broadcast.to('chat-room').emit('server-message', params + ' has joined the chat!');
		}
	}
}
