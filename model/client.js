'use strict';

const uuid = require('uuid/v4');

module.exports = function(socket) {
  this.socket = socket,
  this._id = uuid();
};
