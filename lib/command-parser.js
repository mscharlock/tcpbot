'use strict';

module.exports = function(client, data, ee) {
  let cmd = data.toString().trim().split('', 1)[0];

  // console.log('hello! I am the groverbot!');

  switch(cmd) {
  case 'camera':
    ee.emit('No cameras available', client);
    break;

  case '@all':
    ee.emit('@all', client, data.toString());
    break;
  default:
    ee.emit('default', client, data.toString());
    break;
  }
};
