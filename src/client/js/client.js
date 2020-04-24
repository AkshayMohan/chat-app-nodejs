const socket		=	io('localhost:8124');
const sendForm		=	document.getElementById('send-form');
const inputMsg		=	document.getElementById('input-msg');
const MsgContainer	=	document.getElementById('msg-container');


function messageClient(message, fromUser = null) {

	const messageSpan = document.createElement('span');
	if(fromUser !== null) {

		const clientNameSpan			=	document.createElement('span');
		clientNameSpan.style.color		=	fromUser.color;
		clientNameSpan.style.background	=	fromUser.bgCol;
		clientNameSpan.textContent		=	fromUser.name + ':';

		messageSpan.appendChild(clientNameSpan);
	}
	messageSpan.innerHTML += ' ' + message;
	MsgContainer.appendChild(messageSpan);
	MsgContainer.scrollTop = MsgContainer.scrollHeight; //So that user doesn't have to scroll down manually.
	//#TODO : Do not scroll down automatically from previous messages if client is reading previous messages.
}

socket.on('chat-message', (fromUser, msg) => {

	messageClient(msg, fromUser);
});

socket.on('server-message', (msg) => {

	messageClient(msg);
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

		messageClient(message, {name: 'You', color: 'orange', bgCol: 'black'});
		socket.emit('onClientText', message);
	}
	inputMsg.value = ''; //So that the textfield is cleared after pressing 'Send'.
});

inputMsg.focus(); //Set focus to input field whenever the page is loaded.
