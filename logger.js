const EventEmitter = require('events');

var url = 'https://google.com';

class Logger extends EventEmitter {
  log(message) {
    //log is a method
    console.log(message);
    this.emit('messageLogged', { id: 1, url: 'http://something' });
  }
}

module.exports = Logger;
// module.exports.httpsRequest = url;
