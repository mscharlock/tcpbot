'use strict'

module.exports = function(client, data, ee) {
  let cmd = data.toString().trim().split(' ', 1)[0]
  // console.log(cmd)

  switch (cmd) {
    case '@nick':
      ee.emit('@nick', client, data.toString().split(' ')[1].trim())
      break;

    case 'wearables':
      ee.emit('wearables', client, data.toString())
      break;

    case '@dm':
      ee.emit('@dm', client, data.toString())
      break;

    case '@quit':
      ee.emit('@quit', client)
      break;

    default:
      ee.emit('default', client, data.toString())
      break;
  }
}
