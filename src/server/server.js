const io = require('socket.io')(8124);

io.on('connection', (socket) => {

	//emit(event, data) //to an event.
	socket.emit('server-event', 'Server says hello!'); //This msg is sent when a new client connects.

	//on(event, data) //from an event.
	socket.on('onClientText', (msg) => {

		console.log('Message : ' + msg);
	});
	socket.on('onClientCommand', onClientCommand);
});

function onClientCommand(cmd, params) {

	//params === null if no parameters were given.
	console.log('Command : ' + cmd + ' Parameters : ' + params);
}