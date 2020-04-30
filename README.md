# chat-app-nodejs
Work in progress of a chat app using Node.js and socket.io.

## Description
A real-time browser based chat app that's currently being developed using Node.js and socket.io. The aim of this project is to learn and explore more of JavaScript, Node.js and any other stuffs that may come along.

## Installation
1. Clone this repository using `git`:
```bash
git clone https://github.com/AkshayMohan/chat-app-nodejs.git
```

2. Navigate to the repository using `cd chat-app-nodejs`

3. Run `npm install`
- Install any dependencies that may be asked to. I will update `package.json` in near future to automatically install other libraries.

4. Start the application by starting server.js using `npm start`

### Running in dev-mode
- To run in dev-mode, you'll need to have [nodemon](https://www.npmjs.com/package/nodemon) installed.
- Use `npm run devStart` to start the application in dev-mode. Changes to any file with js, mjs or json extension will automatically restart the server.

## Using
- Once the back-end is up and running, run `src/client/index.html` on a browser to run the client-side. Multiple tabs can be spawned to test it's working.
