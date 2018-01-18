'use strict';

//Giant object that's the data for Grover items: probably would be better to have a database of this information and make it relational to a user profile obj
const groverData = {
  'phones & tablets': {
    'item1': {
      'name': 'iPhone 7 128GB',
      'brand': 'Apple',
      'price': 44.99
    },
    'item2': {
      'name': 'iPhone 7 32GB',
      'brand': 'Apple',
      'price': 39.99
    },
    'item3': {
      'name': 'iPhone 7 Plus 32GB',
      'brand': 'Apple',
      'price': 49.99
    },
    'item4': {
      'name': 'Galaxy S8 64GB',
      'brand': 'Samsung',
      'price': 49.99
    },
  },
  'drones': {
    'item5': {
      'name': 'Drone BEBOP',
      'brand': 'Parrot',
      'price': 49.99
    },
    'item6': {
      'name': 'Drone BEBOP 2',
      'brand': 'Parrot',
      'price': 59.99
    },
  },
  'gaming & VR': {
    'item8': {
      'name': 'Vive',
      'brand': 'HTC',
      'price': 59.99,
    },
    'item9': {
      'name': 'Virtual Reality Glasses Rift VR',
      'brand': 'Occulus',
      'price': 59.99,
    },
  },
  'computing': {
    'item10': {
      'name': 'MacBook 12" M-5Y31, 8GB RAM, 516GB',
      'brand': 'Apple',
      'price': 59.99,
    },
    'item11': {
      'name': 'MacBook Air 11" i7 2.2, 8GB RAM, 512GB',
      'brand': 'Apple',
      'price': 64.99,
    },
    'item12': {
      'name': 'MacBook Air 13" i5-5250U, 4GB RAM, 128GB',
      'brand': 'Apple',
      'price': 69.99,
    },
    'item13': {
      'name': 'MacBook Pro 13" i5-3210M, 4GB RAM, 500GB',
      'brand': 'Apple',
      'price': 74.99,
    },
    'item14': {
      'name': 'Convertible Laptop Surface Book 512GB SSD Intel Core i7 16GB RAM dGPU',
      'brand': 'Microsoft',
      'price': 59.99,
    },
    'item15': {
      'name': 'Convertible Laptop YOGA 300-11IBR 80M1004KGE',
      'brand': 'Lenovo',
      'price': 59.99,
    },
  },
  'wearables':{
    'item16': {
      'name': 'Watch 38mm',
      'brand': 'Apple',
      'price': 39.99,
    },
    'item17': {
      'name': 'Watch 42mm',
      'brand': 'Apple',
      'price': 44.99,
    },
    'item18': {
      'name': 'Watch Ambit 3',
      'brand': 'Suunto',
      'price': 39.99,
    },
    'item19': {
      'name': 'Watch V800',
      'brand': 'Polar',
      'price': 39.99,
    },
    'item20': {
      'name': 'Watch WI503Q-1LDBR0001',
      'brand': 'Asus',
      'price': 44.99,
    },
  },
  'smart home': {
    'item21': {
      'name': 'Alexa Dot',
      'brand': 'Amazon',
      'price': 44.99,
    },
    'item22': {
      'name': 'Alexa Echo',
      'brand': 'Amazon',
      'price': 49.99,
    },
    'item23': {
      'name': 'Qbo Milk Master',
      'brand': 'Tchibo',
      'price': 29.99,
    },
    'item24': {
      'name': 'Robotic Vacuum Cleaner POWERbot VR20J9020UR/EG',
      'brand': 'Samsung',
      'price': 39.99,
    },
    'item25': {
      'name': 'Robotic Vacuum Cleaner POWERbot VR20J9259U/EG',
      'brand': 'Samsung',
      'price': 39.99,
    },
  }
};

//-------------------------------------------------------------------
//BUILDING THE ACTUAL SERVER//

//requiring in what we need
const EE = require('events').EventEmitter;
const ee = new EE();
const Client = require('./model/client');
const cmdParser  = require('./lib/command-parser');
const PORT = process.env.PORT || 3000;
const app = require('express')();
const http = require('http').Server(app);

app.get('/', function(req, res) {
  res.send('Hello world!'); //Print hello world to the HTML file to begin with
});

http.listen(3000, function() {
  console.log('We are listening on port 3000'); //Log a successful connection in the terminal
});

//Make a pool - not sure if I need this though, if it's only one client at a time
const pool = [];

//Event emitters for our commands
ee.on('wearables', (client, string) => pool.forEach(c =>  c.socket.write(
  'Great, here are some options we offer:' `+ ${groverData.wearables.item16.name} `)));
//
//TO DO: NEED TO INSERT METHODS FOR THE REST OF THEM TOO
// ee.on('drones', (client, string) => pool.forEach(c => c.socket.write(`${mockData.wearables.item9.type}`)));


ee.on('quit', (client) => {
  pool.forEach(c => c.socket.write('Goodbye!'));
  client.socket.emit('close', client);
});

server.on('connection', socket => {
  let client = new Client(socket);
  pool.push(client);
  pool.forEach(c => c.socket.write(`Hello, I am groverbot. What can I help you find today? Type in one of the following options:
    1. phones & tablets
    2. drones
    3. gaming & VR
    4. computing
    5. wearables
    6. smart home
    \n`));

  socket.on('data', data => cmdParser(client, data, ee));
  socket.on('close', () => {
    let idx = pool.indexOf(client);
    client.socket.end();
    delete pool[idx];
  });
  socket.on('error', console.error);
});

//Console that server is listening
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
