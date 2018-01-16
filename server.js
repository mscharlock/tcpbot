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


server.on('connection', socket => {
  let client = new Client(socket);

})


//Console that server is listening
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
