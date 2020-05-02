const clientCommands = {

	'/join': {

		execute:		cmd_join,
		syntax:			'/join [nickname]',
		description:	'Joins user to the chat using the nickname provided.'
	},
	'/help': {

		execute:		cmd_help,
		syntax:			'/help [cmd]',
		description:	'Displays description of an existing command.'
	}
}

//#TODO : Return codes.
function cmd_join(client, socket, params) {

	if(typeof client.clientName === 'string') {

		socket.emit('server-message', 'ERROR : You are already joined with a nickname!');
		return 1;
	}
	if(params === null) {

		socket.emit('server-message', 'USAGE : ' + clientCommands['/join'].syntax);
		return 1;
	}
	client.clientName = params;
	socket.join('chat-room');

	socket.emit('server-message', 'Your nickname is now ' + params);

	//Broadcast messages are sent to everyone except the client.
	socket.broadcast.to('chat-room').emit('server-message', params + ' has joined the chat!');
	return 0;
}

function cmd_help(client, socket, params) {

	if(params === null) {

		socket.emit('server-message', 'USAGE : ' + clientCommands['/help'].syntax);
		return 1;
	}
	if(!(params in clientCommands)) {

		socket.emit('server-message', 'This command does not exist.');
	} else {

		socket.emit('server-message', `
			USAGE : ${clientCommands[params].syntax}\n\
			<br/>\n\
			${clientCommands[params].description}\n`);
	}
	return 0;
}
module.exports = clientCommands;