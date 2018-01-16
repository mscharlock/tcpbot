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

ee.on('default', (client, string) => client.socket.write(`Invalid command: ${string.trim().split(' ', 1)}\n`));

//Just trying something with all
ee.on('@all', (client, string) => pool.forEach(client => client.socket.write('helloooo' )));



server.on('connection', socket => {
  let client = new Client(socket);

  socket.on('data', data => cmdParser(client, data, ee));
  socket.on('close', () => {
    client.socket.end();
  });

  socket.on('error', console.error);
});


//Console that server is listening
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
