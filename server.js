const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const uuidv1 = require('uuid/v1');
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '0.0.0.0', (err, result) => {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });

// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({
  server
});

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let users = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  users++;
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(userNum));
    }
  });
  const userColour = getRandomColor();
  userNum = {
    type: 'incommingCount',
    users: users,
    colour: userColour
  }
  ws.send(JSON.stringify(userNum));
  console.log(users);
  ws.on('message', function incoming(data) {
    let id = uuidv1();
    data = JSON.parse(data);
    switch (data.type) {
      case "postMessage":
        dataT = {
          id: id,
          type: 'incomingMessage',
          username: data.username,
          content: data.content
        }
        break;
      case "postNotification":
        dataT = {
          id: id,
          type: 'incomingNotification',
          usernameOld: data.usernameOld,
          username: data.username,
          content: data.content,
          notification: ''
        }
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }

    ws.send(JSON.stringify(dataT));
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(dataT));
      }
    });
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  });
  ws.on('close', () => {
    users--;
    userNum = {
      type: 'incommingCount',
      users: users
    }
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(userNum));
      }
    });
    console.log(users);
    console.log('Client disconnected')
  });
});