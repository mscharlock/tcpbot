'use strict'

module.exports = function(client, data, ee) {
  let cmd = data.toString().trim().split(' ', 1)[0];
  // console.log(cmd)

  switch (cmd) {
  case 'phones & tablets' || 'phones' || 'tablets' || 'han dy' || 'mobile':
    ee.emit('phones', client, data.toString().split(' ')[1].trim());
    break;

  case 'drones' || 'drone':
    ee.emit('drones', client, data.toString());
    break;

  case 'gaming' || 'games' || 'gaming & vr' || 'gaming & VR':
    ee.emit('vrs', client, data.toString());
    break;

  case 'computing' || 'macbook' || 'MacBook' || 'computers':
    ee.emit('compys', client, data.toString());
    break;

  case 'wearables' || 'watch' || 'wear':
    ee.emit('wears', client, data.toString());
    break;

  case 'smart home' || 'smarthome' || 'vacuum' || 'alexa':
    ee.emit('homes', client, data.toString());
    break;

  case 'quit':
    ee.emit('quit', client);
    break;

  default:
    ee.emit('default', client, data.toString());
    break;
  }
};
