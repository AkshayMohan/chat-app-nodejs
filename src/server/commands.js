const clientCommands = {

	//command:				command function to be invoked.
	'/join':				cmd_join
}

function cmd_join(client, socket, params) {

	if(typeof client.clientName === 'string') {

		socket.emit('server-message', 'ERROR : You are already joined with a nickname!');
		return 1;
	}
	if(params === null) {

		socket.emit('server-message', 'USAGE : /join [nickname]');
		return 1;
	} else {

		client.clientName = params;
		socket.join('chat-room');

		socket.emit('server-message', 'Your nickname is now ' + params);

		//Broadcast messages are sent to everyone except the client.
		socket.broadcast.to('chat-room').emit('server-message', params + ' has joined the chat!');
		return 0;
	}
}
module.exports = clientCommands;