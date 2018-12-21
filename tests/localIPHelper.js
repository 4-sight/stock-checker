
const os = require('os')

const localAddresses = os.networkInterfaces()
const IPv4 = localAddresses['Loopback Pseudo-Interface 1']
  .filter(add => add.family == 'IPv4')

module.exports = IPv4[0].address
