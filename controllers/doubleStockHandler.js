
const dataFetch = require('../controllers/dataFetch.js')
const StocksDB = require('../models/stocks')
const UsersDB = require('../models/users')

module.exports = async (stocks, ip, like) => {

  const stockFetch = function(i) {
    let res = dataFetch(stocks[i])
    return res
  }

  const [ stockA, stockB ] = await Promise.all([stockFetch(0), stockFetch(1)])
  console.log(stockA, stockB)

  if (like) {
    //
  } else {
    //
  }
}