const socket		=	io('localhost:8124');
const sendForm		=	document.getElementById('send-form');
const inputMsg		=	document.getElementById('input-msg');



socket.on('server-event', (data) => { //Message from server.

	console.log(data);
});

sendForm.addEventListener('submit', (event) => {

	const message = inputMsg.value;
	event.preventDefault(); //By default, submit refreshes and that must be avoided.
	if(message.charAt(0) == '/') {

		/*
			Client has entered a command.
			Split the message to 2 parts - cmd and params.
			cmd - the command as a string.
			params - array of parameters.
		*/
		const cmdData = message.split(/ (.+)/);
		socket.emit('onClientCommand', cmdData[0], cmdData[1]);
	} else {

		socket.emit('onClientText', message);
	}
	inputMsg.value = ''; //So that the textfield is cleared after pressing 'Send'.
});