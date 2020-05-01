const io				=	require('socket.io')(8124);
const clientCommands	=	require('./commands.js');
const Client			=	require('./client.js');

const clients = {}; //`Client` object for each clients[socket.id] upon connecting.

io.on('connection', (socket) => {

	//emit(event, data) //to an event.
	//on(event, data) //from an event.

	clients[socket.id] = new Client();
	console.log(`[DEBUG] socket (${socket.id}) has joined!`);

	socket.on('onClientText', (msg) => {

		onClientText(socket, msg);
	});
	socket.on('onClientCommand', (cmd, params) => {

		onClientCommand(socket, cmd, params)
	});
	socket.on('disconnect', () => {

		delete clients[socket.id];
		console.log(`[DEBUG] socket (${socket.id}) has disconnected!`);
		/*
			rooms are left upon disconnecting when I tested
			but until further assured, let it be here.
		*/
		socket.leave('chat-room');
	});
});

function onClientText(socket, msg) {

	if(typeof clients[socket.id].clientName !== 'string') {

		socket.emit('server-message', 'ERROR : Message not sent. You must join the chat first! (/join)');
		return;
	} else {

		socket.broadcast.to('chat-room').emit('chat-message', 
			{name: clients[socket.id].clientName, color: 'green', bgCol: 'black'}, msg);
	}
}

function onClientCommand(socket, cmd, params) {

	//params === null if no parameters were given.
	console.log(`[DEBUG] Command : ${cmd} Parameters : ${params}`);

	if(cmd in clientCommands) {

		//client object of corresponding socket.id is sent as arg along with socket and cmd parameters.
		clientCommands[cmd](clients[socket.id], socket, params); //invoke command imported from commands.js
	} else {

		socket.emit('server-message', 'ERROR : This command does not exist.');
	}
}
