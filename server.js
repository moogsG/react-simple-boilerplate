const express = require('express');
const uuidv1 = require('uuid/v1');
let users = 0;

/*Webpack
 *********
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

/*WebSocket
 ***********
 */
const SocketServer = require('ws').Server;
const WebSocket = require('ws');

const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

/*Create WebSocket Server
 *************************
 */
const wss = new WebSocket.Server({
  server
});

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

/*Broadcast WS
 **************
 */
wss.broadcast = broadcast = (data) => {
  wss.clients.forEach(each = (client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

/*On connection do...
 *********************
 *Sends number of users to all client
 *Watches for new posts and sends them to all clients
 */
wss.on('connection', (ws, req) => {
  console.log('Client connected');
  users++;
  userNum = {
    type: 'incommingCount',
    users: users
  }
  wss.clients.forEach(each = (client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(userNum));
    }
  });
  ws.send(JSON.stringify(userNum));
  ws.on('message', incoming = (data) => {
    let id = uuidv1();
    data = JSON.parse(data);
    console.log(data);
    switch (data.type) {
      case "postImg":
        let content = data.content.split(' ');
        dataT = {
          id: id,
          type: 'incommingImg',
          username: data.username || 'Anonymous',
          img: content[1]
        }
        break;
      case "postMessage":
        dataT = {
          id: id,
          type: 'incomingMessage',
          username: data.username || 'Anonymous',
          content: data.content
        }
        break;
      case "postNotification":
        dataT = {
          id: id,
          type: 'incomingNotification',
          usernameOld: data.usernameOld || 'Anonymous',
          username: data.username || 'Anonymous',
          content: data.content,
          notification: ''
        }
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
    wss.broadcast(JSON.stringify(dataT));
    //ws.send(JSON.stringify(dataT));
  });
  ws.on('close', () => {
    users--;
    userNum = {
      type: 'incommingCount',
      users: users
    }
    wss.clients.forEach(each = (client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(userNum));
      }
    });
    console.log('Client disconnected')
  });
});