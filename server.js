'use strict';

//requiring in what we need
const net = require('net');
const EE = require('events').EventEmitter;
const ee = new EE();
const Client = require('./model/client');
const cmdParser  = require('./lib/command-parser');
const PORT = process.env.PORT || 3000;

//Dummy data for Grover items
const mockData = {
  'wearables': {
    'item9': {
      'type': 'Apple',
      'thing': 'Watch',
    }
  }
};

//Make a server
const server = module.exports = net.createServer();

//Make a pool - not sure if I need this though
const pool = [];

// ee.on('default', (client, string) => client.socket.write(`Invalid command: ${string.trim().split(' ', 1)}\n`))
ee.on('wearables', (client, string) => pool.forEach(c => c.socket.write(`${mockData.wearables.item9.type}`)));

ee.on('@quit', (client) => {
  pool.forEach(c => c.socket.write(`${client.nick} has left the channel\n`))
  client.socket.emit('close', client)
})

server.on('connection', socket => {
  let client = new Client(socket)
  pool.push(client)
  pool.forEach(c => c.socket.write(`Hello, I am groverbot. What can I help you find today? Type in one of the following options:
    1. wearables
    2. another thing
    \n`))

  socket.on('data', data => cmdParser(client, data, ee))
  socket.on('close', () => {
    let idx = pool.indexOf(client)
    client.socket.end() // differs from .destroy()
    delete pool[idx]
  })
  socket.on('error', console.error)
})


//Console that server is listening
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
